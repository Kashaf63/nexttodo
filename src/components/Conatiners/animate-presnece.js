"use client";

import { AnimatePresence as FramerAnimatePresence } from "framer-motion";

export default function AnimatePresence({ children }) {
  return <FramerAnimatePresence>{children}</FramerAnimatePresence>;
}
