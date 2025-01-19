'use client';
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { slideInFromTop, slideInFromRight } from "@/lib/motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      imagePath: "/test-man.gif",
      name: "Amit Kumar",
      text: "Supernova has been a success factor in the rise of Happy People AI. I loved the level of professionalism of Supernova.",
      rating: 5,
    },
    {
      id: 2,
      imagePath: "/test-man-2.gif",
      name: "Utkarsh Chaturvedi",
      text: "I have been working with Supernova since a long time and every time I have got more than my expectations. I absolutely love it!",
      rating: 5,
    },
    {
      id: 3,
      imagePath: "/test-man-3.gif",
      name: "Kaushik G.",
      text: "A seamless experience from start to finish. Helped me fetch the highest marks in college. Absolute lifesaver. Best in terms of affordablility.",
      rating: 4,
    },
    {
      id: 4,
      imagePath: "/test-woman.gif",
      name: "Subhiksha Gupta",
      text: "The team has done an amazing job. Highly recommended. I got a fabulous new website that helped me crack my placements. Best wishes and luck!",
      rating: 5,
    },
    {
      id: 5,
      imagePath: "/test-woman-2.gif",
      name: "Ananya Ghosh",
      text: "Feature rich and polite. The best one can get for the price. Helped me start my business and improve client interactions. Blessed!",
      rating: 5,
    },
  ];

  // Duplicate items for seamless sliding
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="w-full bg-transparent relative overflow-hidden">
      {/* Section Title */}
      <motion.div
        variants={slideInFromTop}
        className="text-[28px] sm:text-[32px] md:text-[40px] font-medium text-center text-gray-200 m-6"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
          Testimonials
        </span>
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="cursive text-[18px] sm:text-[24px] md:text-[30px] text-gray-200 mb-6 mt-[6px] text-center"
      >
        Find out what people say about us
      </motion.div>

      {/* Sliding Testimonial Cards */}
      <div
        className="flex animate-scroll"
        style={{
          animation: "scroll 20s linear infinite",
          width: `${duplicatedTestimonials.length * 280}px`, // Adjusted for smaller card widths
        }}
      >
        {duplicatedTestimonials.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 p-3 w-[240px] sm:w-[300px] md:w-[400px] h-[150px] sm:h-[180px] md:h-[200px] border border-gray-400 rounded-lg bg-transparent mx-3"
          >
            {/* Card Content */}
            <div className="flex items-center h-full">
              {/* User Image */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex-shrink-0 mr-4">
                <Image
                  src={item.imagePath}
                  alt={item.name}
                  fill
                  className="object-cover rounded-full"
                  priority
                />
              </div>
              {/* Testimonial Text */}
              <div className="text-white">
                {/* Rating Stars */}
                <div className="flex mb-1">
                  {[...Array(5)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-gold ${
                        idx < item.rating ? "text-yellow-400" : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-[12px] sm:text-[14px] md:text-lg">{item.name}</h3>
                <p className="text-[10px] sm:text-[12px] md:text-sm">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Styles for Animation */}
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
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
