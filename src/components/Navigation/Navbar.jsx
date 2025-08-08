import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { logo } from "../../assets/images";
import './Navbar.css'

const Navbar = ({ children }) => {
  return (
    <>
      <GlassNavigation />
      {children}
    </>
  );
};

const GlassNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for smooth reveal
  const navVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: -10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.nav 
      className={`glass-navigation ${isScrolled ? 'scrolled' : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="nav-container">
        <motion.div variants={itemVariants}>
          <LeftLinks />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Logo />
        </motion.div>

        <motion.div variants={itemVariants}>
          <RightButtons setMenuOpen={setMenuOpen} />
        </motion.div>
      </div>

      <MobileMenu menuOpen={menuOpen} />
    </motion.nav>
  );
};



const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <img 
      src={logo}
      alt="SIA Mosque Logo"
      onClick={scrollToTop}
      className="logo"
    />
  );
};

const LeftLinks = () => (
  <div className="nav-links">
    <GlassLink text="Prayer" />
    <GlassLink text="Services" />
    <GlassLink text="Events" />
  </div>
);

const RightButtons = ({ setMenuOpen }) => (
  <div className="nav-buttons">
    <div className="right-links">
      <GlassLink text="About" />
      <GlassLink text="Contact" />
      <DonateButton />
    </div>

    <button
      onClick={() => setMenuOpen((pv) => !pv)}
      className="mobile-menu-btn"
    >
      <FiMenu />
    </button>
  </div>
);

const GlassLink = ({ text }) => {
  return (
    <a
      href="#"
      className="glass-link"
    >
      <span className="glass-link-text">
        {text}
      </span>
      <span className="glass-link-bg" />
    </a>
  );
};

const DonateButton = () => {
  return (
    <button className="donate-button">
      Donate
    </button>
  );
};

const TextLink = ({ text }) => {
  return (
    <a href="#" className="text-link">
      {text}
    </a>
  );
};

const MobileMenu = ({ menuOpen }) => {
  const [ref, { height }] = useMeasure();
  return (
    <motion.div
      initial={false}
      animate={{
        height: menuOpen ? height : "0px",
      }}
      className="mobile-menu"
    >
      <div ref={ref} className="mobile-menu-content">
        <div className="mobile-links">
          <TextLink text="Prayer" />
          <TextLink text="Services" />
          <TextLink text="Events" />
          <TextLink text="About" />
          <TextLink text="Contact" />
        </div>
        <DonateButton />
      </div>
    </motion.div>
  );
};

export default Navbar 