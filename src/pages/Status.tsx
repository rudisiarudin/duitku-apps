import React from "react";
import { motion } from "framer-motion";

const Status = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
    <motion.h1
      className="text-4xl font-extrabold mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      Status
    </motion.h1>
    <motion.p
      className="text-2xl font-semibold"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [1, 0.7, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      Coming Soon 🚧
    </motion.p>
  </div>
);

export default Status;
