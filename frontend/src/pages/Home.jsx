import {
  ArrowRight, Code2, Download, Sparkles, Zap, Globe,
  Smartphone, Wand2, Rocket, Play, X, CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

// ── Animated code preview data ──────────────────────────────────────────────
const CODE_LINES = [
  { text: '<section class="hero">', color: "#7dd3fc" },
  { text: '  <nav class="navbar">', color: "#7dd3fc" },
  { text: '    <h1>PowerFit Gym</h1>', color: "#86efac" },
  { text: '    <button>Join Now</button>', color: "#86efac" },
  { text: "  </nav>", color: "#7dd3fc" },
  { text: '  <div class="hero-content">', color: "#7dd3fc" },
  { text: '    <h2>Transform Your Body</h2>', color: "#fde68a" },
  { text: '    <p>Expert trainers · Modern equipment</p>', color: "#d1d5db" },
  { text: '    <a href="/membership">Get Started</a>', color: "#c4b5fd" },
  { text: "  </div>", color: "#7dd3fc" },
  { text: "</section>", color: "#7dd3fc" },
  { text: "", color: "" },
  { text: '<section class="features">', color: "#7dd3fc" },
  { text: '  <div class="grid-3">', color: "#7dd3fc" },
  { text: '    <div class="card">', color: "#7dd3fc" },
  { text: '      <h3>Personal Training</h3>', color: "#86efac" },
  { text: "    </div>", color: "#7dd3fc" },
  { text: "  </div>", color: "#7dd3fc" },
  { text: "</section>", color: "#7dd3fc" },
];

const PROMPT = "Build a modern gym website with memberships, trainers and online registration.";

// ── Demo steps shown in modal ─────────────────────────────────────────────
const DEMO_STEPS = [
  { icon: "✍️", title: "Write your prompt", desc: "Describe what kind of website you want in plain English." },
  { icon: "🤖", title: "AI generates code", desc: "Our AI writes complete HTML, CSS and React code in seconds." },
  { icon: "👁️", title: "Live preview", desc: "See your website instantly in the built-in live editor." },
  { icon: "✏️", title: "Edit & refine", desc: "Ask AI to change colors, sections, text or layout." },
  { icon: "🚀", title: "Deploy in one click", desc: "Publish your site to the web or download the source code." },
];

// ── 6 Feature cards ───────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Sparkles,
    title: "Prompt to Website",
    desc: "Describe your idea and generate a complete website instantly.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Code2,
    title: "Clean React Code",
    desc: "Export reusable components, hooks and Tailwind styles.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Smartphone,
    title: "Responsive by Default",
    desc: "Every website looks perfect on mobile, tablet and desktop.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Wand2,
    title: "Modern UI Design",
    desc: "Beautiful layouts inspired by top SaaS products worldwide.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Download,
    title: "One Click Export",
    desc: "Download your project and deploy it anywhere you want.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Rocket,
    title: "Instant Deploy",
    desc: "Publish live websites in seconds, straight from the editor.",
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────
function TypingPrompt() {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < PROMPT.length) { setDisplayed(PROMPT.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <span>
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-white ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

function CodePreview() {
  const [visibleLines, setVisibleLines] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setVisibleLines((p) => {
          if (p >= CODE_LINES.length) { clearInterval(iv); return p; }
          return p + 1;
        });
      }, 120);
      return () => clearInterval(iv);
    }, 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="font-mono text-xs leading-6 overflow-hidden max-h-52">
      {CODE_LINES.slice(0, visibleLines).map((line, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }} className="flex gap-3">
          <span className="text-zinc-600 w-4 shrink-0 select-none text-right">{i + 1}</span>
          <span style={{ color: line.color || "#d1d5db" }}>{line.text}</span>
        </motion.div>
      ))}
      {visibleLines > 0 && visibleLines < CODE_LINES.length && (
        <div className="flex gap-3">
          <span className="text-zinc-600 w-4 shrink-0 text-right">{visibleLines + 1}</span>
          <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse" />
        </div>
      )}
    </div>
  );
}

// ── Demo Modal ────────────────────────────────────────────────────────────
function DemoModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 24, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.2)] flex flex-col max-h-[90vh]"
        >
          {/* Sticky Header — always visible, never scrolls away */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0d0d0d] rounded-t-3xl shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Play size={14} className="text-purple-400 ml-0.5" />
              </div>
              <div>
                <h2 className="font-bold text-white text-base">How Mohit AI Works</h2>
                <p className="text-xs text-zinc-500">5-step process from idea to live website</p>
              </div>
            </div>
            {/* Close / Back button — always visible on mobile */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition text-zinc-400 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Steps */}
          <div className="overflow-y-auto flex-1 p-6 space-y-4">
            {DEMO_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/20 transition group"
              >
                {/* Step number + icon */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                    {step.icon}
                  </div>
                  {i < DEMO_STEPS.length - 1 && (
                    <div className="w-px h-4 bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-purple-400 font-mono">0{i + 1}</span>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </div>

                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-2 opacity-0 group-hover:opacity-100 transition ml-auto" />
              </motion.div>
            ))}
          </div>

          {/* Sticky CTA at bottom */}
          <div className="px-6 pb-6 pt-3 shrink-0 border-t border-white/10 bg-[#0d0d0d]">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:opacity-90 transition text-sm"
            >
              Got it — Let's Build! 🚀
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>

  );
}

// ── Main Component ────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const handleStartBuilding = () => {
    if (userData) {
      navigate("/generate");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <Navbar />

      {/* Demo Modal */}
      {showDemo && <DemoModal onClose={() => setShowDemo(false)} />}

      {/* Login Modal */}
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

      <main className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden">

        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-700/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-700/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

          {/* ── HERO ── */}
          <section className="pt-28 sm:pt-32 pb-20 sm:pb-24">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-purple-500/30 bg-purple-500/10 rounded-full text-xs text-purple-300 mb-8"
            >
              <Sparkles size={12} />
              AI WEBSITE BUILDER
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                >
                  Turn ideas into
                  <br />
                  <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                    React websites.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 sm:mt-8 text-zinc-400 text-base sm:text-lg max-w-xl"
                >
                  Describe your business, generate a complete website, and
                  export production-ready React code in seconds.
                </motion.p>

                <div className="flex flex-wrap gap-4 mt-8 sm:mt-10">
                  <button
                    onClick={handleStartBuilding}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl font-medium flex items-center gap-2 hover:opacity-90 transition shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                  >
                    Start Building
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => setShowDemo(true)}
                    className="px-6 py-3 border border-zinc-700 rounded-xl hover:bg-white/5 hover:border-purple-500/40 transition flex items-center gap-2 text-zinc-300"
                  >
                    <Play size={15} className="text-purple-400" />
                    View Demo
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-5 mt-10 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5"><Zap size={12} className="text-yellow-400" /> AI Powered</span>
                  <span className="flex items-center gap-1.5"><Globe size={12} className="text-blue-400" /> Instant Deploy</span>
                  <span className="flex items-center gap-1.5"><Code2 size={12} className="text-purple-400" /> Clean React Code</span>
                </div>
              </div>

              {/* Right — Animated Code Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-[#0d0d0d] shadow-[0_0_80px_rgba(139,92,246,0.08)]">

                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-[#111]">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <div className="ml-3 flex-1 bg-zinc-900 rounded-md px-3 py-1 text-xs text-zinc-500 font-mono">
                      mohit-ai.app/generate
                    </div>
                  </div>

                  {/* Prompt input */}
                  <div className="px-5 py-4 border-b border-zinc-800/60 bg-[#0a0a0a]">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Your Prompt</div>
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-300 min-h-[48px]">
                      <TypingPrompt />
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-purple-500/5 border-b border-zinc-800/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">AI Generating Code...</span>
                    <span className="ml-auto text-[10px] text-zinc-600 font-mono">index.html</span>
                  </div>

                  {/* Code output */}
                  <div className="p-5 bg-[#0d0d0d]">
                    <CodePreview />
                  </div>

                  {/* Bottom */}
                  <div className="px-5 py-3 border-t border-zinc-800/60 bg-[#111] flex items-center justify-between">
                    <span className="text-xs text-zinc-600">19 lines generated</span>
                    <span className="text-[10px] px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      Ready to Deploy
                    </span>
                  </div>

                </div>
              </motion.div>

            </div>
          </section>

          {/* ── 6 FEATURE CARDS ── */}
          <section className="py-20 sm:py-24 border-t border-zinc-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs uppercase tracking-widest mb-4">
                <Sparkles size={11} />
                What you get
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                Everything to{" "}
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                  build faster
                </span>
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
                Powerful features packed into one tool — no design skills required.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-xl p-6 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(139,92,246,0.06)] transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${f.bg}`}>
                      <Icon size={22} className={f.color} />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="py-20 sm:py-24 border-t border-zinc-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
              {[
                { num: "01", title: "Describe", desc: "Tell AI what type of website you need.", color: "text-purple-400" },
                { num: "02", title: "Generate", desc: "AI creates layouts, sections and styling.", color: "text-blue-400" },
                { num: "03", title: "Export", desc: "Download React code and deploy anywhere.", color: "text-emerald-400" },
              ].map(({ num, title, desc, color }) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <span className={`text-4xl font-bold ${color} opacity-40`}>{num}</span>
                  <h3 className="text-xl font-semibold mt-3">{title}</h3>
                  <p className="text-zinc-500 mt-2 text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CTA BANNER ── */}
          <section className="py-12 sm:py-16 border-t border-zinc-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/5 p-10 sm:p-14 text-center"
            >
              <h2 className="text-2xl sm:text-4xl font-bold mb-4">
                Ready to build your{" "}
                <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                  first AI website?
                </span>
              </h2>
              <p className="text-zinc-400 mb-8 text-sm sm:text-base max-w-xl mx-auto">
                Join thousands of creators and developers using Mohit AI to ship faster.
              </p>
              <button
                onClick={handleStartBuilding}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:opacity-90 transition shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                Start Building for Free 🚀
              </button>
            </motion.div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
            © 2026 MOHIT AI Builder · Built with ❤️ and AI
          </footer>

        </div>
      </main>
    </>
  );
};

export default Home;