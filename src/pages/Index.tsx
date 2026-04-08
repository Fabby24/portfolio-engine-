import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import GitHubSection from "@/components/sections/GitHub";
import Thinking from "@/components/sections/Thinking";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background"
        >
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <GitHubSection />
          <Thinking />
          <Certifications />
          <Contact />
          <Footer />
          <ChatBot />
        </motion.div>
      )}
    </>
  );
};

export default Index;
