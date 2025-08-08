import React, { useEffect, forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AuroraBackground = forwardRef((props, ref) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // This builds the radial gradient that animates through your COLORS_TOP
  const backgroundImage = useMotionTemplate`
    radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})
  `;

  return (
    <motion.div
      ref={ref}
      style={{ backgroundImage }}
      className="aurora-background"
    >
      <Canvas className="aurora-canvas">
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Canvas>
    </motion.div>
  );
});

AuroraBackground.displayName = 'AuroraBackground';

export default AuroraBackground; 