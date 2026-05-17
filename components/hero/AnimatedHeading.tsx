"use client";

import { motion, type Variants } from "motion/react";

interface AnimatedHeadingProps {
  lines: { text: string; accent?: boolean }[];
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
};

const charVariant: Variants = {
  hidden: { opacity: 0, y: "100%", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export function AnimatedHeading({ lines }: AnimatedHeadingProps) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-semibold leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl xl:text-[6.5rem]"
    >
      {lines.map((line, lineIdx) => {
        const words = line.text.split(" ");
        return (
          <span key={lineIdx} className="block overflow-hidden">
            {words.map((word, wIdx) => (
              <span key={`${lineIdx}-w-${wIdx}`} className="inline-block whitespace-nowrap">
                {Array.from(word).map((ch, i) => (
                  <motion.span
                    key={`${lineIdx}-${wIdx}-${i}`}
                    variants={charVariant}
                    className={`inline-block ${line.accent ? "text-gradient-neon" : ""}`}
                  >
                    {ch}
                  </motion.span>
                ))}
                {wIdx < words.length - 1 && (
                  <motion.span variants={charVariant} className="inline-block">
                    &nbsp;
                  </motion.span>
                )}
              </span>
            ))}
          </span>
        );
      })}
    </motion.h1>
  );
}
