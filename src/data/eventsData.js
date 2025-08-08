import { kidsSummerFun, seniorProgram, calligraphyWorkshop } from '../assets/images/events-images'

export const eventsData = [
  {
    id: 1,
    title: "Kids Summer Fun Program",
    image: kidsSummerFun,
    imageAlt: "Kids Summer Fun Poster",
    date: "2025-07-19",
    publishedDate: "July 19, 2025",
    excerpt: "As'salam Alaikum Parents! We're hosting a fun-filled afternoon for kids at Masjid Subhan — come join us for games, activities, and learning in a safe and welcoming environment.",
    slug: "kids-summer-fun-program",
    category: "Youth",
    featured: true,
    status: "published"
  },
  {
    id: 2,
    title: "Sisters Calligraphy Workshop",
    image: calligraphyWorkshop,
    imageAlt: "Sisters Calligraphy Workshop Poster",
    date: "2025-07-22",
    publishedDate: "July 22, 2025",
    excerpt: "Join our sisters for a beautiful calligraphy workshop where you'll learn traditional Islamic art techniques and create your own masterpieces in a supportive environment.",
    slug: "sisters-calligraphy-workshop",
    category: "Education",
    featured: true,
    status: "published"
  },
  {
    id: 3,
    title: "Senior Program & Budgeting Workshop",
    image: seniorProgram,
    imageAlt: "Senior Program Budgeting Workshop Poster",
    date: "2025-07-25",
    publishedDate: "July 25, 2025",
    excerpt: "A comprehensive program designed for our senior community members, featuring financial planning workshops, health seminars, and social activities to enhance quality of life.",
    slug: "senior-program-budgeting-workshop",
    category: "Community",
    featured: true,
    status: "published"
  }
]

// Helper functions for CMS integration
export const getFeaturedEvents = () => eventsData.filter(event => event.featured)
export const getEventBySlug = (slug) => eventsData.find(event => event.slug === slug)
export const getEventsByCategory = (category) => eventsData.filter(event => event.category === category) 