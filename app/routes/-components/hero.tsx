import { Button } from "~/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-xl mb-4"
        >
          Simple. Practical. Complete.
        </motion.h2>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-6xl font-bold mb-8"
        >
          Master React from scratch.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          React Mastery is a comprehensive video course by WebDevCody. Learn
          everything you need to confidently build modern React applications.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="/api/login/google">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Buy Now
            </Button>
          </a>
          <Link to="/learn">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8"
            >
              Start Learning ▶
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
