import { ArrowRight, Code2, Download, LogOutIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <LoginModal />

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

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          {/* HERO */}
          <section className="pt-32 pb-24">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-800 rounded-full text-sm text-zinc-400 mb-8"
            >
              <Sparkles size={14} />
              AI WEBSITE BUILDER
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* Left */}
              <div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                >
                  Turn ideas into
                  <br />
                  React websites.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 text-zinc-400 text-lg max-w-xl"
                >
                  Describe your business, generate a complete website,
                  and export production-ready React code in seconds.
                </motion.p>

                <div className="flex flex-wrap gap-4 mt-10">

                  <button
                    onClick={() => navigate("/generate")}
                    className="px-6 py-3 bg-white text-black rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition"
                  >
                    Start Building
                    <ArrowRight size={18} />
                  </button>

                  <button className="px-6 py-3 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition">
                    View Demo
                  </button>

                </div>

              </div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >

                <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-[#111111]">

                  {/* Browser Top */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">

                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                    <div className="w-3 h-3 rounded-full bg-zinc-600" />

                  </div>

                  {/* Prompt */}
                  <div className="p-5 border-b border-zinc-800">

                    <div className="bg-black rounded-lg p-4 text-zinc-400">
                      Build a modern gym website with memberships,
                      trainers and online registration.
                    </div>

                  </div>

                  {/* Preview */}
                  <div className="p-5">

                    <img
                      src="/preview.png"
                      alt="Website Preview"
                      className="rounded-xl border border-zinc-800"
                    />

                  </div>

                </div>

              </motion.div>

            </div>

          </section>

          {/* FEATURES */}
          <section className="py-24 border-t border-zinc-900">

            <div className="grid md:grid-cols-3 gap-16">

              <div>
                <Sparkles className="mb-4 text-zinc-300" />

                <h3 className="text-xl font-semibold mb-3">
                  Prompt to Website
                </h3>

                <p className="text-zinc-500">
                  Simply describe your idea and generate
                  a complete website instantly.
                </p>
              </div>

              <div>
                <Code2 className="mb-4 text-zinc-300" />

                <h3 className="text-xl font-semibold mb-3">
                  Clean React Code
                </h3>

                <p className="text-zinc-500">
                  Export reusable React components and
                  continue development locally.
                </p>
              </div>

              <div>
                <Download className="mb-4 text-zinc-300" />

                <h3 className="text-xl font-semibold mb-3">
                  One Click Export
                </h3>

                <p className="text-zinc-500">
                  Download your project and deploy it
                  anywhere you want.
                </p>
              </div>

            </div>

          </section>

          {/* HOW IT WORKS */}
          <section className="py-24 border-t border-zinc-900">

            <h2 className="text-4xl font-bold text-center mb-16">
              How it works
            </h2>

            <div className="grid md:grid-cols-3 gap-12">

              <div>
                <span className="text-zinc-500">01</span>

                <h3 className="text-xl font-semibold mt-3">
                  Describe
                </h3>

                <p className="text-zinc-500 mt-2">
                  Tell AI what type of website you need.
                </p>
              </div>

              <div>
                <span className="text-zinc-500">02</span>

                <h3 className="text-xl font-semibold mt-3">
                  Generate
                </h3>

                <p className="text-zinc-500 mt-2">
                  AI creates layouts, sections and styling.
                </p>
              </div>

              <div>
                <span className="text-zinc-500">03</span>

                <h3 className="text-xl font-semibold mt-3">
                  Export
                </h3>

                <p className="text-zinc-500 mt-2">
                  Download React code and deploy.
                </p>
              </div>

            </div>

          </section>

          {/* FOOTER */}
          <footer className="border-t border-zinc-900 py-8 text-center text-zinc-500">
            © 2026 MOHIT AI Builder
          </footer>

        </div>

      </main>
    </>
  );
};

export default Home;