import { motion } from "motion/react";
import { memo } from "react";

export const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0f1115]">
      {/* Base Image Layer - Static, no re-renders. Using pre-blurred image from Unsplash */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop&blur=100')`,
          // Use transform translateZ(0) to force GPU layer
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115]/90 via-[#0f1115]/80 to-[#0f1115]/90" />
      
      {/* Floating Elements - Optimized animations with radial gradients instead of blur() */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)]"
        animate={{
          transform: ["translate(0px, 0px) scale(1)", "translate(50px, -30px) scale(1.1)", "translate(0px, 0px) scale(1)"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear" // Linear is cheaper than easeInOut
        }}
        style={{ willChange: 'transform' }} // Hint to browser
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)]"
        animate={{
          transform: ["translate(0px, 0px) scale(1)", "translate(-40px, 40px) scale(1.2)", "translate(0px, 0px) scale(1)"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        style={{ willChange: 'transform' }}
      />

      {/* Grid Lines Overlay - Static CSS */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
    </div>
  );
});
