"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[14px] sm:text-[22px]">
          Imagine above and beyond the fusion
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        We build the best modern UI / UX.
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="cursive text-[30px] text-gray-200 mb-10 mt-[10px] text-center"
      >
        Because, the first impression is the last impression
      </motion.div>
    </div>
  );
};
