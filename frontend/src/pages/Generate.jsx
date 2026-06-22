
import { ArrowLeft, Sparkles, Zap, Coins } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const PHASES = [
  "Analyzing your prompt...",
  "Planning website structure...",
  "Generating beautiful UI...",
  "Adding animations...",
  "Optimizing experience...",
];

const SUGGESTIONS = [
  "A modern SaaS landing page for an AI startup with pricing, testimonials and dark theme",
  "A gym website with hero, membership plans, trainer profiles and contact form",
  "A portfolio website for a freelance designer with projects and contact section",
  "An e-commerce product page for a premium headphone brand with reviews",
];

const Generate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [error, setError] = useState("");

  const { userData } = useSelector((state) => state.user);

  // Redirect to home if not logged in
  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleGenerateWebsite = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/website/generate`,
        { prompt },
        { withCredentials: true }
      );

      setProgress(100);

      dispatch(
        setUserData({
          ...userData,
          credits: res.data.remainingCredits,
        })
      );

      navigate(`/editor/${res.data.websiteId}`);
    } catch (error) {
      setError(
        error?.response?.data?.message || "Failed to generate website"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setPhaseIndex(0);
      return;
    }

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 4;
      if (value > 94) value = 94;
      setProgress(Math.floor(value));
      const phase = Math.min(
        Math.floor((value / 100) * PHASES.length),
        PHASES.length - 1
      );
      setPhaseIndex(phase);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[700px] h-[400px] bg-purple-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-xl hover:bg-white/10 transition"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-purple-400" />
                <h1 className="font-semibold text-sm sm:text-base">
                  MOHIT AI Builder
                </h1>
              </div>
            </div>

            {/* Credits */}
            <div
              onClick={() => navigate("/pricing")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:bg-white/8 transition"
            >
              <Coins size={14} className="text-yellow-400" />
              <span className="text-white text-sm font-medium">
                {userData?.credits || 0}
              </span>
              <span className="text-zinc-400 text-xs hidden sm:inline">Credits</span>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-6">
              <Sparkles size={14} />
              <span className="text-sm">AI Website Generator</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Build websites
              <br />
              <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                from a single prompt
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-zinc-400 text-base sm:text-lg">
              Describe your idea and AI will generate a modern responsive
              website with beautiful UI, animations and professional design.
            </p>
          </motion.div>

          {/* Prompt Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 hover:border-purple-500/20 transition-colors"
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Create a modern SaaS landing page for an AI startup with pricing, testimonials and dark theme..."
              className="w-full h-48 sm:h-64 bg-transparent resize-none outline-none text-base sm:text-lg placeholder:text-zinc-600"
            />

            {error && (
              <p className="text-red-400 text-sm mt-2 px-1">{error}</p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 sm:mt-6">
              <p className="text-zinc-500 text-sm">
                The more detailed your prompt, the better the website.
              </p>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!prompt.trim() || loading}
                onClick={handleGenerateWebsite}
                className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition text-sm sm:text-base ${
                  prompt.trim() && !loading
                    ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-90"
                    : "bg-white/10 text-zinc-500 cursor-not-allowed"
                }`}
              >
                <Zap size={18} />
                Generate Website
              </motion.button>
            </div>
          </motion.div>

          {/* Quick suggestions */}
          {!loading && !prompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">
                Try these examples
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(s)}
                    className="text-left text-xs sm:text-sm text-zinc-400 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:text-white hover:border-purple-500/20 transition-all line-clamp-2"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading Progress */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10"
            >
              <div className="flex justify-between mb-3 text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  {PHASES[phaseIndex]}
                </span>
                <span className="text-purple-300 font-medium">{progress}%</span>
              </div>

              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full"
                />
              </div>

              <div className="mt-4 text-center text-zinc-400 text-sm">
                Estimated time:{" "}
                <span className="text-white font-medium">1 – 3 minutes</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
