"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromTop } from "@/lib/motion";

export const Encryption = () => {
  const [fontSize, setFontSize] = useState("25px");

  

  // Adjust font size based on window width
  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth <= 320 ? "15px" : "25px");
    };

    // Initial check and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full -z-20">
      {/* Header Text */}
      <div className="absolute w-auto h-auto top-0 z-[5]">
        <motion.div
          variants={slideInFromTop}
          className="text-[32px] md:text-[40px] font-medium text-center text-gray-200 px-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Performance{" "}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
            Quality{" "} & {" "}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">
            Reliability.
          </span>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="flex flex-col items-center justify-center absolute z-[20] w-auto h-auto translate-y-[50px] md:translate-y-[-50px]">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          <Image
            src="/lock-main.gif"
            alt="Lock main"
            width={300}
            height={300}
            className="z-10 md:w-[360px] md:h-[360px] mb-8"
          />
        </div>

        {/* Welcome Box */}
        <div
          className="Welcome-box"
          style={{
            position: "relative",
            display: "inline-block",
            padding: "15px",
            border: "2px solid rgba(112, 66, 248, 0.55)",
            opacity: 0.9,
            
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "0%",
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          ></span>
          <h1
            className="Welcome-text"
            style={{
              position: "relative",
              zIndex: 1,
              fontSize, // Dynamically controlled font size
            }}
          >
            Enhanced with the power of AI
          </h1>
        </div>
      </div>

      {/* Background Video */}
      <div className="w-full flex items-start justify-center absolute">
        <video
          loop
          autoPlay
          playsInline
          preload="true"
          className="w-full h-auto"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
        
      </div>      
    </div>
  );
};
