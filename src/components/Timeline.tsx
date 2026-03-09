import { useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import { ScheduleItem } from '../data/schedule';
import { cn } from '../lib/utils';

interface TimelineProps {
  items: ScheduleItem[];
  activeItemId: string | null;
}

export const Timeline = memo(function Timeline({ items, activeItemId }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active item
  useEffect(() => {
    if (activeItemRef.current) {
      // Use a timeout to ensure the element is fully rendered and layout is stable
      const timer = setTimeout(() => {
        activeItemRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [activeItemId]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto scrollbar-hide py-[50vh] px-4 md:px-6 relative"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="space-y-6 relative">
        {/* Vertical Line - Aligned with the dots (Time 4rem + Gap 1.5rem + Half Dot 0.5rem = 6rem) */}
        {/* On mobile (if gap is smaller) we might need adjustment, but let's stick to md layout for desktop optimization */}
        <div className="absolute left-[6rem] top-0 bottom-0 w-px bg-white/5 hidden md:block" />

        {items.map((item) => {
          const isActive = item.id === activeItemId;

          return (
            <motion.div
              layout
              key={item.id}
              ref={isActive ? activeItemRef : null}
              animate={{
                opacity: isActive ? 1 : 0.5,
                scale: isActive ? 1.05 : 1,
              }}
              transition={{
                layout: { duration: 0.4, type: "spring", bounce: 0.2 },
                scale: { duration: 0.4, type: "spring", bounce: 0.2 },
                opacity: { duration: 0.4 }
              }}
              className={cn(
                "flex items-center gap-6 group w-full cursor-default",
                isActive ? "text-white" : "text-slate-400"
              )}
            >
              {/* Time */}
              <div className="w-16 text-right font-mono text-sm tracking-wider shrink-0">
                {item.startTime}
              </div>

              {/* Dot */}
              <div className="relative flex items-center justify-center w-4 shrink-0">
                <motion.div 
                  layout
                  className={cn(
                    "w-3 h-3 rounded-full border-2 transition-colors duration-500 z-10",
                    isActive 
                      ? "bg-purple-500 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" 
                      : "bg-[#0f1115] border-slate-700 group-hover:border-slate-500"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-dot-glow"
                      className="absolute inset-0 rounded-full bg-purple-500"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content Card */}
              <motion.div 
                layout
                className={cn(
                  "flex-1 p-4 rounded-xl border transition-all duration-500 min-w-0", 
                  isActive 
                    ? "bg-white/5 border-purple-500/30 shadow-lg shadow-purple-900/10" 
                    : "bg-transparent border-transparent group-hover:bg-white/5 group-hover:border-white/5"
                )}
              >
                <motion.h3 
                  layout="position"
                  className={cn(
                    "font-medium transition-all duration-300 break-words", 
                    isActive ? "text-lg text-purple-100" : "text-base"
                  )}
                >
                  {item.title}
                </motion.h3>
                
                <div 
                    className={cn(
                        "grid transition-all duration-500 ease-in-out overflow-hidden",
                        isActive ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 mt-0"
                    )}
                >
                    <div className="min-h-0">
                        <p className="text-sm text-slate-400 break-words">
                            {item.description}
                        </p>
                    </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});
