import React from "react";
import { motion } from "framer-motion";
import { 
  FiArrowRight, 
  FiHeart,
  FiUsers,
  FiBookOpen,
  FiStar,
  FiUserPlus,
  FiMessageCircle,
  FiTarget
} from "react-icons/fi";
import './MosqueServices.css';

export const MosqueServices = () => {
  console.log('MosqueServices component rendering');
  
  // Enhanced animation variants for smoother staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const blockVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="mosque-services-container">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Discover the various programs and services we offer to our community</p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-100px" }}
        className="services-grid">
        {/* Row 1 */}
        <ActiveProjectsBlock variants={blockVariants} hoverVariants={hoverVariants} />
        
        {/* Row 2 */}
        <CommunityServicesBlock variants={blockVariants} hoverVariants={hoverVariants} />
        <IslamicSchoolBlock variants={blockVariants} hoverVariants={hoverVariants} />
        <SistersBlock variants={blockVariants} hoverVariants={hoverVariants} />

        {/* Row 3 */}
        <DonateBlock variants={blockVariants} hoverVariants={hoverVariants} />
        <VolunteerBlock variants={blockVariants} hoverVariants={hoverVariants} />
        <SuggestionsBlock variants={blockVariants} hoverVariants={hoverVariants} />
      </motion.div>
    </div>
  );
};

const Block = ({ className, children, variants, hoverVariants, ...rest }) => {
  return (
    <motion.div
      variants={variants}
      whileHover="hover"
      className={`service-block ${className}`}
      {...rest}>
      {children}
    </motion.div>
  );
};

const ActiveProjectsBlock = ({ variants, hoverVariants }) => {
    const expansionProject = { raised: 300000, goal: 500000 };
    const youthCenterProject = { raised: 75000, goal: 250000 };

    return (
        <Block className="large-block theme-projects col-span-12" variants={variants} hoverVariants={hoverVariants}>
            <div className="header-content">
                <div className="icon-wrapper"><FiTarget /></div>
                <div>
                    <h2>Active Projects</h2>
                    <p className="subtitle">Building for the future of our community</p>
                </div>
            </div>
            <div className="projects-container">
                <div className="project-item">
                    <h3>Masjid Expansion</h3>
                    <p>Expanding our prayer hall to accommodate our growing community.</p>
                    <div className="fundraising-fraction">
                        <span className="raised-fraction" style={{color: '#87CEEB'}}>${expansionProject.raised.toLocaleString()}</span>
                        <span className="divider-fraction">/</span>
                        <span className="goal-fraction">${expansionProject.goal.toLocaleString()}</span>
                    </div>
                </div>
                <div className="project-item">
                    <h3>Youth Center</h3>
                    <p>Creating a dedicated space for youth activities and programs.</p>
                     <div className="fundraising-fraction">
                        <span className="raised-fraction" style={{color: '#ffca28'}}>${youthCenterProject.raised.toLocaleString()}</span>
                        <span className="divider-fraction">/</span>
                        <span className="goal-fraction">${youthCenterProject.goal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Block>
    );
};

const CommunityServicesBlock = ({ variants, hoverVariants }) => (
    <Block className="medium-block theme-community col-span-12 sm-col-span-6 lg-col-span-4" variants={variants} hoverVariants={hoverVariants}>
        <FiHeart />
        <h3>Community Services</h3>
        <p>Marriage, counseling, and community support programs.</p>
        <a href="#" className="learn-more-btn">Learn More →</a>
    </Block>
);

const IslamicSchoolBlock = ({ variants, hoverVariants }) => (
  <Block className="medium-block theme-school col-span-12 sm-col-span-6 lg-col-span-4" variants={variants} hoverVariants={hoverVariants}>
    <FiBookOpen />
    <h3>Islamic School</h3>
    <p>Weekend classes, Quran studies, and educational programs for all ages.</p>
    <a href="#">View Programs →</a>
  </Block>
);

const SistersBlock = ({ variants, hoverVariants }) => (
    <Block className="medium-block theme-sisters col-span-12 sm-col-span-6 lg-col-span-4" variants={variants} hoverVariants={hoverVariants}>
        <FiStar />
        <h3>SIA Sisters</h3>
        <p>Fostering sisterhood through workshops, social, and spiritual activities.</p>
        <a href="#">Join Events →</a>
    </Block>
);

const DonateBlock = ({ variants, hoverVariants }) => (
    <Block className="small-block theme-donate col-span-12 sm-col-span-6 lg-col-span-4" variants={variants} hoverVariants={hoverVariants}>
        <FiHeart />
        <h3>Donate & Support</h3>
        <a href="#" className="donate-btn">Donate Now</a>
    </Block>
);

const VolunteerBlock = ({ variants, hoverVariants }) => (
    <Block className="small-block theme-volunteer col-span-12 sm-col-span-6 lg-col-span-4" variants={variants} hoverVariants={hoverVariants}>
        <FiUserPlus />
        <h3>Volunteer With Us</h3>
        <a href="#" className="volunteer-btn">Sign Up</a>
    </Block>
);

const SuggestionsBlock = ({ variants, hoverVariants }) => (
    <Block className="small-block theme-suggestions col-span-12 sm-col-span-6 lg-col-span-4" variants={variants} hoverVariants={hoverVariants}>
        <FiMessageCircle />
        <h3>Submit Suggestions</h3>
        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#0a1a06'}}>Share your ideas to help improve our community.</p>
        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#0a1a06', fontWeight: '600'}}>admin@subhanislamicassociation.org</p>
    </Block>
); 