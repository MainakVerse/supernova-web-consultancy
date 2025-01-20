"use client";

import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
} from "@/lib/motion";

const strings = ["Genesis of Curiosity", "Edifice of Possibilities", "Solstice of Creativity"];

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-4 md:px-12 lg:px-20 mt-40 w-full z-[20] pt-20 md:pt-0"
    >
      {/* Dark Overlay for Mobile Only */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 md:hidden" />
      
      {/* Left Content */}
      <div className="h-full w-full flex flex-col gap-4 md:gap-5 justify-center m-auto text-center md:text-start z-10">
        {/* Hero Heading */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 md:gap-6 mt-4 md:mt-6 text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-[600px] w-auto h-auto mx-auto md:mx-0"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Welcome, to the{" "}
          </span>
          <div className="h-[120px] md:h-auto"> {/* Fixed height container for typewriter */}
            <Typewriter
              options={{
                strings: strings,
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-400 my-3 md:my-5 max-w-[600px] px-4 md:px-0"
        >
          Onboard the World&apos;s best Project Development Agency with
          a whopping experience of 5000+ client hours.
        </motion.p>

        {/* Visitor Count */}
        <motion.p className="text-base md:text-lg text-white max-w-[600px] px-4 md:px-0">
          With that, we are glad to count you in, as our visitor:
          <img
            src="https://profile-counter.glitch.me/MainakVerse/count.svg"
            alt="visitor count"
            height="10"
            className="mx-auto md:mx-0 mt-2"
          />
        </motion.p>

        
      </div>

      {/* Right Content */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-8 md:mt-0 z-10"
      >
        <Image
          src="/hero-bg.gif"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none w-[300px] md:w-[500px] lg:w-[650px] h-auto"
        />
      </motion.div>
    </motion.div>
  );
};