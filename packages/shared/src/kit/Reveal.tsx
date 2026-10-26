"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: "10%" },
  visible: { opacity: 1, transition: { duration: 1 }, y: 0 },
};

/** Same fade-up reveal the original cci-web sections use. */
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}
