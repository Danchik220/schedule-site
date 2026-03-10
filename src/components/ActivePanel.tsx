import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleItem } from '../data/schedule';
import { differenceInSeconds, parse } from 'date-fns';
import { Play, SkipForward, CheckCircle2 } from 'lucide-react';

interface ActivePanelProps {
  activeItem: ScheduleItem | null;
  nextItem: ScheduleItem | null;
  currentTime: Date;
  onSkip: () => void;
}

export function ActivePanel({ activeItem, nextItem, currentTime, onSkip }: ActivePanelProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activeItem) return;

    const calculateTime = () => {
      const now = currentTime;
      // Parse times relative to today
      let start = parse(activeItem.startTime, 'HH:mm', now);
      let end = parse(activeItem.endTime, 'HH:mm', now);
      
      // Handle overnight tasks
      if (end < start) {
        // Task crosses midnight (e.g. 22:00 to 06:00)
        // If now is early morning (e.g. 01:00), start was yesterday
        if (now < start) {
          start.setDate(start.getDate() - 1);
        } else {
          // If now is late night (e.g. 23:00), end is tomorrow
          end.setDate(end.getDate() + 1);
        }
      }

      const totalDuration = differenceInSeconds(end, start);
      const elapsed = differenceInSeconds(now, start);
      const remaining = differenceInSeconds(end, now);

      if (remaining <= 0) {
        setTimeLeft('00:00:00');
        setProgress(100);
        return;
      }

      const hours = Math.floor(remaining / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );

      const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
      setProgress(progressPercent);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [activeItem, currentTime]);

  if (!activeItem) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <p>Нет активных задач.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image Transition - Covers entire panel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeItem.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
            style={{ backgroundImage: `url(${activeItem.image})` }}
          />
          {/* Gradient Mask for smooth fade into page */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container - Aligned Left */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 w-full max-w-4xl">
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium uppercase tracking-wider border border-purple-500/20">
                Сейчас
              </span>
              <span className="text-slate-500 text-sm font-mono">
                {activeItem.startTime} — {activeItem.endTime}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              {activeItem.title}
            </h1>
            
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              {activeItem.description}
            </p>
          </div>

          {/* Subtasks */}
          {activeItem.subtasks && activeItem.subtasks.length > 0 && (
            <div className="space-y-3 pt-4">
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Подзадачи</h4>
              <div className="grid gap-3">
                {activeItem.subtasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300 group">
                    <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-purple-500/50 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-purple-500 transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timer & Progress */}
          <div className="pt-8 space-y-6">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Осталось времени</span>
                <div className="text-4xl font-mono font-light text-white tabular-nums">
                  {timeLeft}
                </div>
              </div>
              <div className="text-right">
                 <span className="text-sm font-medium text-purple-400">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button 
              onClick={onSkip}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all active:scale-95"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Завершить</span>
            </button>
            
            <button 
              onClick={onSkip}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-transparent hover:bg-white/5 text-slate-400 hover:text-white transition-all active:scale-95"
            >
              <SkipForward className="w-5 h-5" />
              <span>Далее</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
