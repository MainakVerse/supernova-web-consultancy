'use client'
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromTop, slideInFromRight } from "@/lib/motion";


const Companies = () => {
  const items = [
    { id: 1, imagePath: "/company1.png", alt: "Company 1" },
    { id: 2, imagePath: "/company2.png", alt: "Company 2" },
    { id: 3, imagePath: "/company3.png", alt: "Company 3" },
    { id: 4, imagePath: "/company4.png", alt: "Company 4" },
    { id: 5, imagePath: "/company5.png", alt: "Company 5" },
    { id: 6, imagePath: "/company6.png", alt: "Company 6" },
    { id: 7, imagePath: "/company7.png", alt: "Company 7" },
    { id: 8, imagePath: "/company8.png", alt: "Company 8" },

  ];

  // Duplicate the items for seamless looping
  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-transparent relative">
      <motion.div
          variants={slideInFromTop}
          className="text-[32px] md:text-[40px] font-medium text-center text-gray-200 m-8"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-white">
            Our Clients
          </span>
          
        </motion.div>
        <motion.div
                variants={slideInFromRight(0.8)}
                className="cursive text-[30px] text-gray-200 mb-10 mt-[10px] text-center"
              >
                People who count on us
              </motion.div>
      <div 
        className="flex animate-scroll"
        style={{
          animation: 'scroll 20s linear infinite',
          width: `${duplicatedItems.length * 200}px` // Adjust width based on item size
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 p-4 w-48 h-24"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.imagePath}
                alt={item.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 10s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Companies;
