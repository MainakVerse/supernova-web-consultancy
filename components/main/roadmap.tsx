'use client'
import React from "react";
import OrbitalTechStack from "./orbitalTechs";
import Bell from "./bigbang";

export const Roadmap = () => {
  return (
    <section
      id="roadmap"
      className="flex flex-col items-center justify-center py-10 md:py-4 lg:py-0"
    >
      <h1 className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10 md:py-16 lg:py-20">
        Project Roadmap
      </h1>
      <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-8 lg:gap-4 px-4 md:px-6 lg:px-10 -my-20">
        <div className="w-full lg:w-6/12">
          <Bell />
        </div>
        <div className="w-full lg:w-6/12">
          <OrbitalTechStack />
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

