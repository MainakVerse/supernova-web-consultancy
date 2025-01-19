"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromRight } from "@/lib/motion";
import CountUp from 'react-countup';
import IndustriesChart from "./IndustriesChart";
import ImpactChart from "./ImpactChart";
import Testimonials from "./testimonials";


// AnimatedText component for gradual text loading
const AnimatedText = ({ children, delay = 0 }) => {
  const words = React.Children.map(children, child => {
    if (typeof child === 'string') {
      return child.split(' ').map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + (index * 0.015), // 15ms delay between each word
            ease: "easeOut"
          }}
        >
          {word}{' '}
        </motion.span>
      ));
    }
    if (React.isValidElement(child)) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      );
    }
    return child;
  });

  return <>{words}</>;
};

export const About = () => {
  return (
    <section
      id="about"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
        About Us
      </h1>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="cursive text-[30px] text-white mb-10 mt-[10px] text-center"
      >
        Here is some information about what we are.
      </motion.div>
      
      <div className="w-full px-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 rounded-xl p-6 min-h-[300px] border border-white shadow-white transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <Image
              src="/about.gif"
              alt="About Us"
              className="w-full h-full object-cover rounded-lg"
              width={400}
              height={400}
            />
          </div>
          
          <div className="md:col-span-8 rounded-xl p-6 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.7)]">
            <AnimatedText delay={0.2}>
              <p className="text-white leading-relaxed">
                At Supernova, innovation isn&apos;t just a buzzword — it&apos;s our foundation. Our story began with a bold vision: to craft cutting-edge solutions that don&apos;t just meet expectations but redefine them. Guided by a passion for excellence and a thirst for creativity, we&apos;ve forged a path where affordability meets high performance, and reliability partners seamlessly with breathtaking visuals.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.4}>
              <p className="text-white leading-relaxed mt-4">
                From the moment we set out, our mission has been clear—turning challenges into opportunities and ideas into impactful realities. Every project we deliver is a testament to our commitment to pushing boundaries, questioning norms, and exploring the untapped potential of technology. In a world of endless possibilities, we&apos;re not just keeping up; we&apos;re leading the charge, redefining what&apos;s achievable with every solution. Supernova is more than a name — it&apos;s a promise of brilliance, innovation, and unwavering dedication to shaping a brighter, smarter future for our clients and beyond.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.6}>
              <p className="text-white leading-relaxed mt-4">
                Mainak Chaudhuri, <br />
                Founder & CEO - Supernova
              </p>
            </AnimatedText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 rounded-xl p-6 border border-yellow-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <h2 className="text-xl font-bold mb-4 text-yellow-500">Mission</h2>
            <ul className="text-white leading-relaxed list-disc pl-5 space-y-3">
              <AnimatedText delay={5.5}>
                <li>Deliver cutting-edge, affordable solutions that blend high performance, stunning visuals, and unmatched reliability.</li>
              </AnimatedText>
              <AnimatedText delay={6}>
                <li>Push boundaries to create impactful, technology-driven solutions that redefine possibilities.</li>
              </AnimatedText>
              <AnimatedText delay={6.5}>
                <li>Commit to innovation and creativity, shaping a smarter, brighter future for our clients and communities.</li>
              </AnimatedText>
            </ul>
          </div>

          <div className="md:col-span-4 rounded-xl p-6 border border-green-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.7)]">
            <h2 className="text-xl font-bold mb-4 text-green-500">Vision</h2>
            <ul className="text-white leading-relaxed list-disc pl-5 space-y-3">
              <AnimatedText delay={7}>
                <li>Transforming bold ideas into affordable, high-tech solutions that make a difference.</li>
              </AnimatedText>
              <AnimatedText delay={7.5}>
                <li>Delivering reliable performance and stunning visuals that exceed expectations.</li>
              </AnimatedText>
              <AnimatedText delay={8}>
                <li>Continuously exploring new possibilities to push boundaries and redefine success.</li>
              </AnimatedText>
              <AnimatedText delay={8.5}>
                <li>Establishing a trust based on business ethics and morals.</li>
              </AnimatedText>
            </ul>
          </div>

          <div className="md:col-span-4 rounded-xl p-6 border border-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <h2 className="text-xl font-bold mb-4 text-pink-500">Values</h2>
            <ul className="text-white leading-relaxed list-disc pl-5 space-y-3">
              <AnimatedText delay={9}>
                <li>We continuously push boundaries to deliver cutting-edge, impactful solutions that inspire and elevate.</li>
              </AnimatedText>
              <AnimatedText delay={9.5}>
                <li>Combining high performance with reliability, we ensure every project exceeds expectations with stunning visuals and flawless delivery.</li>
              </AnimatedText>
              <AnimatedText delay={10}>
                <li>Delivering top-tier technology solutions at accessible rates, proving that brilliance doesn&apos;t have to come at a premium.</li>
              </AnimatedText>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-3 rounded-xl p-6 border border-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]">
            <h2 className="text-xl font-bold mb-4 text-blue-500">Projects Completed</h2>
            <span className="text-blue-200 text-4xl items-center">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={500}/>+
    </div>
    </span>

    <h2 className="text-xl font-bold mb-4 text-blue-500">Success Rate</h2>
            <span className="text-blue-200 text-4xl items-center">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={100}/>%
    </div>
    </span>

    <h2 className="text-xl font-bold mb-4 text-blue-500">Techs Used</h2>
            <span className="text-blue-200 text-4xl items-center">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={30}/>+
    </div>
            </span>


            <h2 className="text-xl font-bold mb-4 text-blue-500">Industries Served</h2>
            <span className="text-blue-200 text-4xl items-center">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={15}/>+
    </div>
            </span>      
          </div>




          <div className="md:col-span-3 rounded-xl p-6 border border-red-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.7)]">
            <h2 className="text-xl font-bold mb-4 text-red-500">Happy Clients</h2>
            <span className="text-red-200 text-4xl">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={1000}/>+
    </div>   
            </span>
            <h2 className="text-xl font-bold mb-4 text-red-500">Client Hours</h2>
            <span className="text-red-200 text-4xl">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={12000}/>+
    </div>   
            </span>

            <h2 className="text-xl font-bold mb-4 text-red-500">Support Hours</h2>
            <span className="text-red-200 text-4xl">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={7000}/>+
    </div>   
            </span>
            <h2 className="text-xl font-bold mb-4 text-red-500">Open-Source Contributions</h2>
            <span className="text-red-200 text-4xl">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f929/512.gif"
        alt="😀"
        width={60}
        height={60}
      />
      <CountUp end={15000}/>+
    </div>   
    </span>

      </div>
          <IndustriesChart />
            <ImpactChart />
      </div>
      </div>
      <Testimonials />
    </section>
  );
};

export default About;