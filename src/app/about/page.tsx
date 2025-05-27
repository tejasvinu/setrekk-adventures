"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import TeamCard from "@/components/TeamCard";

export default function About() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex items-center justify-center bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-about bg-cover bg-center transform scale-110 origin-center parallax-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/30" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 md:px-6 z-20 text-white text-center"
        >
           <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 leading-tight">
            Our <span className="text-emerald-400">Story</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300">
            Discover the passion and dedication behind our treks.
          </p>
          <Link
            href="/trips"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Treks
          </Link>
        </motion.div>
      </section>

      {/* About Content Section */}
      <motion.section 
        className="py-12 md:py-20 bg-slate-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-800"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
            >
              Who We Are
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-700 mb-4"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
            >
              We are a team of passionate adventurers dedicated to providing authentic and unforgettable trekking experiences. With certified guides and meticulously curated routes, your journey with us is designed for safety, exploration, and discovery.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-700"
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
            >
              Our journey began with a deep love for the mountains and a desire to share their mystique with the world. Today, our treks connect cultures, challenge limits, and create lifelong memories.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <TeamCard />
    </div>
  );
}
