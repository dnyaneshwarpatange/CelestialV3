'use client';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-[#0F072C] dark:via-[#1E0F3F] dark:to-[#2D185D] text-gray-900 dark:text-white relative">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Your Universe of Cloud Storage
              <span className="block mt-4 text-3xl md:text-4xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Where Stars Meet Storage
              </span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              CelestialBox transforms file management into an interstellar experience. 
              Safeguard your digital cosmos with military-grade encryption, 
              intergalactic accessibility, and stellar collaboration tools — 
              all wrapped in a universe of infinite possibilities.
            </motion.p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/dashboard">
                <Button className="group space-x-3 px-8 py-6 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 text-white">
                  <span>Launch Your Storage Journey</span>
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Video Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse" />
            <video 
              autoPlay 
              loop 
              muted 
              className="relative rounded-3xl border border-purple-400/40 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/20 transition-shadow duration-300 transform hover:scale-[1.02]"
            >
              <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>

        {/* Floating Stars Animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-black dark:bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
