"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FOOTER_DATA } from "@/constants";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/lib/motion";

export const Footer = () => {
  useEffect(() => {
    const container = document.querySelector(".group");
    const torch = document.querySelector(".torchlight");

    if (!container || !torch) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      torch.style.backgroundPosition = `${x}px ${y}px`;
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full bg-black text-gray-200 shadow-lg p-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left half - Text with animation */}
        <div className="col-span-12 md:col-span-8 flex flex-col items-center justify-center text-center relative group">
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-4 relative z-10"
            variants={slideInFromTop}
            initial="hidden"
            animate="visible"
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 group-hover:from-orange-500 group-hover:to-red-500 transition-all duration-300"
            >
              If it&apos;s Supernova,
            </span>
            <br />
            It&apos;s Possible
          </motion.h1>

          <div
            className="torchlight absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
              opacity: 1,
              transition: "opacity 0.3s ease",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        {/* Right half - Footer data split into 2 columns */}
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOOTER_DATA &&
            FOOTER_DATA.map((column) => (
              <div key={column.title} className="flex flex-col justify-start">
                <h3 className="font-bold text-[14px] md:text-[16px] pb-4">{column.title}</h3>
                {column.data.map(({ icon: Icon, name, link }) => (
                  <Link
                    key={`${column.title}-${name}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex my-2"
                  >
                    {Icon && <Icon className="mr-2" />}
                    <span className="text-[12px] md:text-[13px]">{name}</span>
                  </Link>
                ))}
              </div>
            ))}
        </div>
      </div>

      {/* Bottom copyright text */}
      <div
  className="text-center m-4 text-[14px] md:text-[16px] relative group"
  style={{ position: "relative", overflow: "hidden" }}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.3), transparent)`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundImage = "none";
  }}
>
  &copy; Supernova {new Date().getFullYear()} Inc. All rights reserved.
</div>

    </div>
  );
};
