
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Code2,
  Rocket,
  Smartphone,
  Wand2,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Sparkles,
    title: "AI Website Generation",
    description: "Simply describe your idea and let AI generate a complete website in seconds.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Code2,
    title: "Clean Production Code",
    description: "Get well-structured React and Tailwind code that's easy to edit and deploy.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Smartphone,
    title: "Responsive by Default",
    description: "Every website automatically looks great on mobile, tablet, and desktop.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Wand2,
    title: "Modern UI Design",
    description: "Generate beautiful layouts and sections inspired by modern SaaS products.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Download,
    title: "Download Source Code",
    description: "Own your project completely and export the generated code anytime.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Rocket,
    title: "Build Faster",
    description: "Turn ideas into working websites without spending weeks designing and coding.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Purple Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[700px] h-[400px] bg-purple-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 px-4 sm:px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-14 sm:mb-16"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 uppercase tracking-widest text-xs mb-6">
            <Sparkles size={12} />
            Features
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
            Everything you need
            <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              to build faster
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Powerful AI tools that help developers, startups, freelancers, and
            creators build stunning websites effortlessly.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.06)] transition-all"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center mb-5 sm:mb-6 ${feature.bg}`}>
                  <Icon size={24} className={feature.color} />
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-20 sm:mt-24 text-center"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 sm:p-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready to build your{" "}
              <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                next website?
              </span>
            </h2>
            <p className="text-zinc-500 mb-8 text-sm sm:text-base">
              Start creating beautiful AI-powered websites today.
            </p>
            <button
              onClick={() => navigate("/generate")}
              className="px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-zinc-200 transition"
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
