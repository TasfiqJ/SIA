import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import './Hero.css'
import { prayerTimes } from '../../data/prayerTimes'
import { mosqueInfo } from '../../data/navigationData'
import PrayerTimes from '../PrayerTimes/PrayerTimes'
import EventsNews from '../EventsNews/EventsNews'
import AuroraBackground from './AuroraBackground'

const Hero = () => {
  const heroRef = useRef(null)
  const animatedIconsRef = useRef(null)
  const heroHeaderRef = useRef(null)
  const prayerTimesRef = useRef(null)
  const eventsNewsRef = useRef(null)
  const auroraRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
      wheelMultiplier: 0.8,
      normalizeWheel: true,
    })
    
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(250, 20)

    const animatedIcons = animatedIconsRef.current
    const iconElements = document.querySelectorAll('.animated-icon')
    const regularPlaceholders = document.querySelectorAll('.prayer-icon-placeholder:not(.jummah-icon-placeholder)')
    const jummahPlaceholder = document.querySelector('.jummah-icon-placeholder')
    const allPlaceholders = [...regularPlaceholders, jummahPlaceholder].filter(Boolean)
    const heroHeader = heroHeaderRef.current
    const heroSection = heroRef.current

    const isMobile = window.innerWidth <= 1000
    const headerIconSize = isMobile ? 30 : 60
    const currentIconSize = iconElements[0]?.getBoundingClientRect().width || 100
    const exactScale = headerIconSize / currentIconSize

    // Different scroll distances for mobile vs desktop
    const scrollDistance = isMobile ? window.innerHeight * 1.2 : window.innerHeight * 1.4

    const st = ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: `+=${scrollDistance}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1.5,
      onUpdate: (self) => {
        const progress = self.progress

        // Only hide elements initially if we're at the start of the animation
        if (progress === 0) {
          const allPrayerElements = document.querySelectorAll('.prayer-time-item')
          const islamicDate = document.querySelector('.islamic-date')
          const locationToggle = document.querySelector('.location-toggle')
          
          allPrayerElements.forEach((prayer) => {
            gsap.set(prayer, { opacity: 0 })
          })
          
          if (islamicDate) {
            gsap.set(islamicDate, { opacity: 0 })
          }

          if (locationToggle) {
            gsap.set(locationToggle, { opacity: 0 })
          }

          // Only hide events container on desktop (not mobile)
          if (!isMobile) {
            const eventsContainer = document.querySelector('.events-news-container')
            const eventCards = document.querySelectorAll('.event-card')
            
            if (eventsContainer) {
              gsap.set(eventsContainer, { opacity: 0 })
            }

            eventCards.forEach((card) => {
              gsap.set(card, { opacity: 0 })
            })
          }
        }

        // Hide all icons initially before scroll begins
        if (progress === 0) {
          iconElements.forEach((icon) => {
            gsap.set(icon, { opacity: 0 })
          })
        }

        if (progress <= 0.3) {
          const moveProgress = progress / 0.3
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress

          // Keep aurora background visible during initial phase with smooth transition
          gsap.to(auroraRef.current, { 
            opacity: 1, 
            duration: 0.2, 
            ease: "power2.out" 
          })

          if (progress <= 0.15) {
            const headerProgress = progress / 0.15
            const headerMoveY = -50 * headerProgress
            const headerOpacity = 1 - headerProgress

            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            })
          } else {
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            })
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate)
              }
            })
            window.duplicateIcons = null
          }

          gsap.set(animatedIcons, {
            x: 0,
            y: containerMoveY,
            scale: 1,
            opacity: 1,
          })

          iconElements.forEach((icon, index) => {
            const staggerDelay = index * 0.1
            const iconStart = staggerDelay
            const iconEnd = staggerDelay + 0.5

            const iconProgress = gsap.utils.mapRange(
              iconStart,
              iconEnd,
              0,
              1,
              moveProgress
            )
            const clampedProgress = Math.max(0, Math.min(1, iconProgress))

            const startOffset = -containerMoveY
            const individualY = startOffset * (1 - clampedProgress)

            // Smooth opacity fade-in with staggered effect
            const opacityStart = index * 0.05 // Stagger opacity by index
            const opacityEnd = opacityStart + 0.3
            const opacityProgress = gsap.utils.mapRange(
              opacityStart,
              opacityEnd,
              0,
              1,
              progress
            )
            const iconOpacity = Math.max(0, Math.min(1, opacityProgress))

            gsap.set(icon, {
              x: 0,
              y: individualY,
              opacity: iconOpacity,
            })
          })
        } else if (progress <= 0.6) {
          const scaleProgress = (progress - 0.3) / 0.3

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          })

          // Smooth background color transition
          const bgColorProgress = Math.max(0, Math.min(1, (scaleProgress - 0.3) / 0.4))
          const darkColor = { r: 20, g: 20, b: 20 } // #141414
          const lightColor = { r: 227, g: 227, b: 219 } // #e3e3db
          
          const currentR = Math.round(darkColor.r + (lightColor.r - darkColor.r) * bgColorProgress)
          const currentG = Math.round(darkColor.g + (lightColor.g - darkColor.g) * bgColorProgress)
          const currentB = Math.round(darkColor.b + (lightColor.b - darkColor.b) * bgColorProgress)
          
          heroSection.style.backgroundColor = `rgb(${currentR}, ${currentG}, ${currentB})`
          
          // Smooth aurora fade out starting earlier for better transition
          const auroraFadeProgress = Math.max(0, Math.min(1, (scaleProgress - 0.2) / 0.5))
          gsap.to(auroraRef.current, { 
            opacity: 1 - auroraFadeProgress, 
            duration: 0.1, 
            ease: "power2.out" 
          })

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) {
                duplicate.parentNode.removeChild(duplicate)
              }
            })
            window.duplicateIcons = null
          }

          const targetCenterY = window.innerHeight / 2
          const targetCenterX = window.innerWidth / 2
          const containerRect = animatedIcons.getBoundingClientRect()
          const currentCenterX = containerRect.left + containerRect.width / 2
          const currentCenterY = containerRect.top + containerRect.height / 2
          const deltaX = (targetCenterX - currentCenterX) * scaleProgress
          const deltaY = (targetCenterY - currentCenterY) * scaleProgress
          const baseY = -window.innerHeight * 0.3
          const currentScale = 1 + (exactScale - 1) * scaleProgress

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: currentScale,
            opacity: 1,
          })

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0, opacity: 1 })
          })
        } else if (progress <= 0.75) {
          const moveProgress = (progress - 0.6) / 0.15

          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          })

          heroSection.style.backgroundColor = '#e3e3db'
          // Keep aurora background hidden during light theme with smooth transition
          gsap.to(auroraRef.current, { 
            opacity: 0, 
            duration: 0.3, 
            ease: "power2.out" 
          })

          const targetCenterY = window.innerHeight / 2
          const targetCenterX = window.innerWidth / 2
          const containerRect = animatedIcons.getBoundingClientRect()
          const currentCenterX = containerRect.left + containerRect.width / 2
          const currentCenterY = containerRect.top + containerRect.height / 2
          const deltaX = targetCenterX - currentCenterX
          const deltaY = targetCenterY - currentCenterY
          const baseY = -window.innerHeight * 0.3

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: exactScale,
            opacity: 0,
          })

          iconElements.forEach((icon) => {
            gsap.set(icon, { x: 0, y: 0, opacity: 0 })
          })

          if (!window.duplicateIcons) {
            window.duplicateIcons = []

            iconElements.forEach((icon, index) => {
              const duplicate = icon.cloneNode(true)
              duplicate.className = 'duplicate-icon'
              duplicate.style.position = 'absolute'
              duplicate.style.width = headerIconSize + 'px'
              duplicate.style.height = headerIconSize + 'px'
              duplicate.style.left = '0px'
              duplicate.style.top = '0px'

              document.body.appendChild(duplicate)
              window.duplicateIcons.push(duplicate)
            })
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < allPlaceholders.length) {
                const iconRect = iconElements[index].getBoundingClientRect()
                const startCenterX = iconRect.left + iconRect.width / 2
                const startCenterY = iconRect.top + iconRect.height / 2
                const startPageX = startCenterX + window.pageXOffset
                const startPageY = startCenterY + window.pageYOffset

                const targetRect = allPlaceholders[index].getBoundingClientRect()
                const targetCenterX = targetRect.left + targetRect.width / 2
                const targetCenterY = targetRect.top + targetRect.height / 2
                const targetPageX = targetCenterX + window.pageXOffset
                const targetPageY = targetCenterY + window.pageYOffset

                const moveX = targetPageX - startPageX
                const moveY = targetPageY - startPageY

                let currentX = 0
                let currentY = 0

                if (moveProgress <= 0.5) {
                  const verticalProgress = moveProgress / 0.5
                  currentY = moveY * verticalProgress
                } else {
                  const horizontalProgress = (moveProgress - 0.5) / 0.5
                  currentY = moveY
                  currentX = moveX * horizontalProgress
                }

                const finalPageX = startPageX + currentX
                const finalPageY = startPageY + currentY

                gsap.set(duplicate, {
                  x: finalPageX - headerIconSize / 2,
                  y: finalPageY - headerIconSize / 2,
                  opacity: 1,
                  display: 'flex',
                  force3D: true,
                  ease: "power2.out",
                })
              }
            })
          }
        } else {
          gsap.set(heroHeader, {
            transform: `translate(-50%, calc(-50% + -100px))`,
            opacity: 0,
          })

          heroSection.style.backgroundColor = '#e3e3db'
          // Keep aurora background hidden during prayer times display with smooth transition
          gsap.to(auroraRef.current, { 
            opacity: 0, 
            duration: 0.2, 
            ease: "power2.out" 
          })

          gsap.set(animatedIcons, { opacity: 0 })

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, index) => {
              if (index < allPlaceholders.length) {
                const targetRect = allPlaceholders[index].getBoundingClientRect()
                const targetCenterX = targetRect.left + targetRect.width / 2
                const targetCenterY = targetRect.top + targetRect.height / 2
                const targetPageX = targetCenterX + window.pageXOffset
                const targetPageY = targetCenterY + window.pageYOffset

                gsap.set(duplicate, {
                  x: targetPageX - headerIconSize / 2,
                  y: targetPageY - headerIconSize / 2,
                  opacity: 1,
                  display: 'flex',
                  force3D: true,
                  ease: "power2.out",
                })
              }
            })
          }

          if (isMobile) {
            // Mobile: Only show prayer times, no events manipulation
            // Animate Islamic date appearing
            const islamicDate = document.querySelector('.islamic-date')
            if (islamicDate) {
              const dateStart = 0.75
              const dateEnd = 0.78
              const dateProgress = gsap.utils.mapRange(dateStart, dateEnd, 0, 1, progress)
              const clampedDateProgress = Math.max(0, Math.min(1, dateProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedDateProgress)
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= dateEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${8 * (1 - easedProgress)}px) scale(${0.98 + (0.02 * easedProgress)})`
              
              gsap.set(islamicDate, { 
                opacity: finalOpacity,
                transform: finalTransform
              })
            }

            // Animate location toggle appearing
            const locationToggle = document.querySelector('.location-toggle')
            if (locationToggle) {
              const toggleStart = 0.78
              const toggleEnd = 0.82
              const toggleProgress = gsap.utils.mapRange(toggleStart, toggleEnd, 0, 1, progress)
              const clampedToggleProgress = Math.max(0, Math.min(1, toggleProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedToggleProgress)
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= toggleEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${8 * (1 - easedProgress)}px) scale(${0.98 + (0.02 * easedProgress)})`
              
              gsap.set(locationToggle, { 
                opacity: finalOpacity,
                transform: finalTransform
              })
            }

            // Animate prayer times appearing (regular prayers only)
            const regularPrayerElements = document.querySelectorAll('.regular-prayers .prayer-time-item')
            regularPrayerElements.forEach((prayer, index) => {
              // Border appears first
              const borderStart = 0.82 + index * 0.025;
              const borderEnd = borderStart + 0.025;
              const borderProgress = gsap.utils.mapRange(borderStart, borderEnd, 0, 1, progress);
              const clampedBorderProgress = Math.max(0, Math.min(1, borderProgress));
              const easedBorderProgress = gsap.utils.wrap(0, 1, clampedBorderProgress);

              // Text appears after border with smoother transition
              const textStart = borderStart + 0.015;
              const textEnd = textStart + 0.035;
              const textProgress = gsap.utils.mapRange(textStart, textEnd, 0, 1, progress);
              const clampedTextProgress = Math.max(0, Math.min(1, textProgress));
              const easedTextProgress = gsap.utils.wrap(0, 1, clampedTextProgress);

              // --- FIX: Once revealed, keep visible ---
              const fullyRevealed = progress >= textEnd;
              const finalOpacity = fullyRevealed ? 1 : easedTextProgress;
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${12 * (1 - easedTextProgress)}px) scale(${0.99 + (0.01 * easedTextProgress)})`;

              // Apply text opacity with smoother easing
              const prayerInfo = prayer.querySelector('.prayer-info');
              if (prayerInfo) {
                gsap.set(prayerInfo, { 
                  opacity: finalOpacity,
                  transform: finalTransform,
                  transition: 'opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)'
                });
              }

              // Overall prayer item opacity with smooth transition - INCLUDING BORDERS
              const finalBorderOpacity = fullyRevealed ? 0.25 : (0.25 * easedBorderProgress)
              const finalBgOpacity = fullyRevealed ? 0.02 : (0.02 * easedBorderProgress)
              const finalScale = fullyRevealed ? 1 : (0.98 + (0.02 * easedBorderProgress))
              
              gsap.set(prayer, { 
                borderColor: `rgba(139, 69, 19, ${finalBorderOpacity})`,
                backgroundColor: `rgba(255, 255, 255, ${finalBgOpacity})`,
                scale: finalScale,
                opacity: finalOpacity,
                transform: finalTransform
              });
            })

            // Animate Jummah times appearing
            const jummahContainer = document.querySelector('.jummah-container')
            if (jummahContainer) {
              const jummahStart = 0.92 // Start earlier for better visibility
              const jummahEnd = jummahStart + 0.08
              const jummahProgress = gsap.utils.mapRange(jummahStart, jummahEnd, 0, 1, progress)
              const clampedJummahProgress = Math.max(0, Math.min(1, jummahProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedJummahProgress)

              // Text appears after border
              const jummahInfo = jummahContainer.querySelector('.prayer-info')
              if (jummahInfo) {
                const textStart = jummahStart + 0.025
                const textEnd = textStart + 0.04
                const textProgress = gsap.utils.mapRange(textStart, textEnd, 0, 1, progress)
                const clampedTextProgress = Math.max(0, Math.min(1, textProgress))
                const easedTextProgress = gsap.utils.wrap(0, 1, clampedTextProgress)
                
                // FIX: Once revealed, keep visible
                const fullyRevealed = progress >= textEnd
                const finalOpacity = fullyRevealed ? 1 : easedTextProgress
                const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${10 * (1 - easedTextProgress)}px) scale(${0.99 + (0.01 * easedTextProgress)})`
                
                gsap.set(jummahInfo, { 
                  opacity: finalOpacity,
                  transform: finalTransform
                })
              }
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= jummahEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translateY(0px)' : `translateY(${5 * (1 - easedProgress)}px)`
              
              // Border appears first for jummah
              const finalBorderOpacity = fullyRevealed ? 0.25 : (0.25 * easedProgress)
              const finalBgOpacity = fullyRevealed ? 0.02 : (0.02 * easedProgress)
              const finalScale = fullyRevealed ? 1 : (0.98 + (0.02 * easedProgress))
              
              // Force full opacity when fully revealed
              const actualOpacity = fullyRevealed ? 1 : Math.max(easedProgress, 0.1)
              
              gsap.set(jummahContainer, { 
                borderColor: `rgba(139, 69, 19, ${finalBorderOpacity})`,
                backgroundColor: `rgba(255, 255, 255, ${finalBgOpacity})`,
                scale: finalScale,
                opacity: actualOpacity,
                transform: finalTransform
              })
              

            }

          } else {
            // Desktop: Original animation timeline
            // Animate prayer times appearing (regular prayers only)
            const regularPrayerElements = document.querySelectorAll('.regular-prayers .prayer-time-item')
            regularPrayerElements.forEach((prayer, index) => {
              // Border appears first
              const borderStart = 0.75 + index * 0.035
              const borderEnd = borderStart + 0.025
              const borderProgress = gsap.utils.mapRange(borderStart, borderEnd, 0, 1, progress)
              const clampedBorderProgress = Math.max(0, Math.min(1, borderProgress))
              const easedBorderProgress = gsap.utils.wrap(0, 1, clampedBorderProgress)
              
              // Text appears after border with smoother transition
              const textStart = borderStart + 0.015
              const textEnd = textStart + 0.04
              const textProgress = gsap.utils.mapRange(textStart, textEnd, 0, 1, progress)
              const clampedTextProgress = Math.max(0, Math.min(1, textProgress))
              const easedTextProgress = gsap.utils.wrap(0, 1, clampedTextProgress)
              
              // --- FIX: Once revealed, keep visible ---
              const fullyRevealed = progress >= textEnd
              const finalOpacity = fullyRevealed ? 1 : easedTextProgress
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${12 * (1 - easedTextProgress)}px) scale(${0.99 + (0.01 * easedTextProgress)})`
              
              // Apply text opacity with smoother easing
              const prayerInfo = prayer.querySelector('.prayer-info')
              if (prayerInfo) {
                gsap.set(prayerInfo, { 
                  opacity: finalOpacity,
                  transform: finalTransform
                })
              }
              
              // Overall prayer item opacity with smooth transition - INCLUDING BORDERS
              const finalBorderOpacity = fullyRevealed ? 0.25 : (0.25 * easedBorderProgress)
              const finalBgOpacity = fullyRevealed ? 0.02 : (0.02 * easedBorderProgress)
              const finalScale = fullyRevealed ? 1 : (0.98 + (0.02 * easedBorderProgress))
              
              gsap.set(prayer, { 
                borderColor: `rgba(139, 69, 19, ${finalBorderOpacity})`,
                backgroundColor: `rgba(255, 255, 255, ${finalBgOpacity})`,
                scale: finalScale,
                opacity: finalOpacity,
                transform: finalTransform
              })
            })

            // Animate Islamic date appearing (earlier timing)
            const islamicDate = document.querySelector('.islamic-date')
            if (islamicDate) {
              const dateStart = 0.73
              const dateEnd = 0.76
              const dateProgress = gsap.utils.mapRange(dateStart, dateEnd, 0, 1, progress)
              const clampedDateProgress = Math.max(0, Math.min(1, dateProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedDateProgress)
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= dateEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${8 * (1 - easedProgress)}px) scale(${0.98 + (0.02 * easedProgress)})`
              
              gsap.set(islamicDate, { 
                opacity: finalOpacity,
                transform: finalTransform
              })
            }

            // Animate location toggle appearing
            const locationToggle = document.querySelector('.location-toggle')
            if (locationToggle) {
              const toggleStart = 0.76
              const toggleEnd = 0.78
              const toggleProgress = gsap.utils.mapRange(toggleStart, toggleEnd, 0, 1, progress)
              const clampedToggleProgress = Math.max(0, Math.min(1, toggleProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedToggleProgress)
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= toggleEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${8 * (1 - easedProgress)}px) scale(${0.98 + (0.02 * easedProgress)})`
              
              gsap.set(locationToggle, { 
                opacity: finalOpacity,
                transform: finalTransform
              })
            }

            // Animate Events & News appearing (after Asr is revealed - index 2)
            const eventsContainer = document.querySelector('.events-news-container')
            if (eventsContainer) {
              const eventsStart = 0.84 // After Asr (index 2) is revealed
              const eventsEnd = eventsStart + 0.04
              const eventsProgress = gsap.utils.mapRange(eventsStart, eventsEnd, 0, 1, progress)
              const clampedEventsProgress = Math.max(0, Math.min(1, eventsProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedEventsProgress)
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= eventsEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translate(-50%, -50%) scale(1)' : `translate(-50%, -50%) scale(${0.96 + 0.04 * easedProgress})`
              
              // Border appears first for events container
              const finalBorderOpacity = fullyRevealed ? 0.25 : (0.25 * easedProgress)
              const finalBgOpacity = fullyRevealed ? 0.02 : (0.02 * easedProgress)
              
              gsap.set(eventsContainer, { 
                borderColor: `rgba(139, 69, 19, ${finalBorderOpacity})`,
                backgroundColor: `rgba(255, 255, 255, ${finalBgOpacity})`,
                opacity: finalOpacity,
                transform: finalTransform
              })
            }

            // Animate individual event cards appearing (staggered after events container)
            const eventCards = document.querySelectorAll('.event-card')
            eventCards.forEach((card, index) => {
              const cardStart = 0.86 + index * 0.02
              const cardEnd = cardStart + 0.03
              const cardProgress = gsap.utils.mapRange(cardStart, cardEnd, 0, 1, progress)
              const clampedCardProgress = Math.max(0, Math.min(1, cardProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedCardProgress)
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= cardEnd
              const finalOpacity = fullyRevealed ? 1 : easedProgress
              const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${15 * (1 - easedProgress)}px) scale(${0.96 + 0.04 * easedProgress})`
              
              gsap.set(card, { 
                opacity: finalOpacity,
                transform: finalTransform
              })
            })

            // Animate Jummah times appearing (after Isha is revealed - index 4)
            const jummahContainer = document.querySelector('.jummah-container')
            if (jummahContainer) {
              const jummahStart = 0.93 // After Isha (index 4) finishes at 0.93
              const jummahEnd = jummahStart + 0.04
              const jummahProgress = gsap.utils.mapRange(jummahStart, jummahEnd, 0, 1, progress)
              const clampedJummahProgress = Math.max(0, Math.min(1, jummahProgress))
              const easedProgress = gsap.utils.wrap(0, 1, clampedJummahProgress)

              // Text appears after border
              const jummahInfo = jummahContainer.querySelector('.prayer-info')
              if (jummahInfo) {
                const textStart = jummahStart + 0.015
                const textEnd = textStart + 0.035
                const textProgress = gsap.utils.mapRange(textStart, textEnd, 0, 1, progress)
                const clampedTextProgress = Math.max(0, Math.min(1, textProgress))
                const easedTextProgress = gsap.utils.wrap(0, 1, clampedTextProgress)
                
                // FIX: Once revealed, keep visible
                const fullyRevealed = progress >= textEnd
                const finalOpacity = fullyRevealed ? 1 : easedTextProgress
                const finalTransform = fullyRevealed ? 'translateY(0px) scale(1)' : `translateY(${10 * (1 - easedTextProgress)}px) scale(${0.99 + (0.01 * easedTextProgress)})`
                
                gsap.set(jummahInfo, { 
                  opacity: finalOpacity,
                  transform: finalTransform
                })
              }
              
              // FIX: Once revealed, keep visible
              const fullyRevealed = progress >= jummahEnd
              const finalOpacity = fullyRevealed ? 1 : Math.max(easedProgress * 0.6, 0.3)
              const finalTransform = fullyRevealed ? 'translateY(0px)' : `translateY(${5 * (1 - easedProgress)}px)`
              
              // Border appears first for jummah
              const finalBorderOpacity = fullyRevealed ? 0.25 : (0.25 * easedProgress)
              const finalBgOpacity = fullyRevealed ? 0.02 : (0.02 * easedProgress)
              const finalScale = fullyRevealed ? 1 : (0.98 + (0.02 * easedProgress))
              
              gsap.set(jummahContainer, { 
                borderColor: `rgba(139, 69, 19, ${finalBorderOpacity})`,
                backgroundColor: `rgba(255, 255, 255, ${finalBgOpacity})`,
                scale: finalScale,
                opacity: finalOpacity,
                transform: finalTransform
              })
            }
          }
        }
      },
    })

    return () => {
      st.kill()
      lenis.destroy()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <AuroraBackground ref={auroraRef} />
      
      <div className="hero-header" ref={heroHeaderRef}>
        <p className="hero-address">{mosqueInfo.address}</p>
        <h1>{mosqueInfo.name}</h1>
        <div className="hero-ayat">
          <blockquote className="ayat-text">
            "Indeed, humankind is in loss – except for those who have believed and done righteous deeds, and advised each other to truth, and advised each other to patience."
          </blockquote>
          <cite className="ayat-citation">– Surah Al-'Asr (103:2–3)</cite>
        </div>
      </div>

      <div className="animated-icons" ref={animatedIconsRef}>
        {prayerTimes.filter(prayer => prayer.icon).map((prayer, index) => (
          <div key={index} className={`animated-icon icon-${index + 1}`}>
            <img src={prayer.icon} alt={prayer.name} />
          </div>
        ))}
      </div>

      <PrayerTimes ref={prayerTimesRef} />
      {/* Only show EventsNews on desktop */}
      {window.innerWidth > 1000 && <EventsNews ref={eventsNewsRef} />}
    </section>
  )
}

export default Hero 