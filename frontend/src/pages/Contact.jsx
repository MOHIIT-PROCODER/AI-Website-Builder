
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      setStatus("loading");
      setErrorMsg("");

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/contact/send`,
        form,
        { withCredentials: true }
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMsg(
        error?.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    }
  };

  const INFO_CARDS = [
    {
      icon: Mail,
      title: "Email",
      desc: "mohitmohanta1144@gmail.com",
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Clock,
      title: "Response Time",
      desc: "Usually within 24 hours.",
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: MessageSquare,
      title: "Support",
      desc: "Pricing, AI generation, downloads, or feature requests.",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/20",
    },
  ];

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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 uppercase tracking-widest text-xs mb-6">
            <Sparkles size={12} />
            Contact
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
            Let's{" "}
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              talk
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Have questions, feedback, or need help with your AI-generated
            website? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-8">
              Get in touch
            </h2>

            <div className="space-y-5">
              {INFO_CARDS.map(({ icon: Icon, title, desc, color, bg }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition"
                >
                  <div className={`w-10 h-10 shrink-0 rounded-xl border flex items-center justify-center ${bg}`}>
                    <Icon size={18} className={color} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-sm">{title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative gradient card */}
            <div className="mt-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/5 p-5">
              <p className="text-sm text-zinc-400 leading-relaxed">
                💡 <span className="text-white font-medium">Pro tip:</span> Include your website URL or describe what you're building for a faster, more helpful response.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-xl"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-8">
              Send a message
            </h2>

            {/* Success State */}
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-14 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold">Message Sent!</h3>
                <p className="text-zinc-400 max-w-xs text-sm">
                  Thanks for reaching out. We'll get back to you within 24
                  hours. Check your inbox for a confirmation.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-6 py-2.5 rounded-xl border border-white/20 text-sm hover:bg-white/5 transition"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm text-zinc-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 transition placeholder-zinc-600 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 transition placeholder-zinc-600 text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-2 text-sm text-zinc-400">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none resize-none focus:border-purple-500/50 transition placeholder-zinc-600 text-sm"
                  />
                </div>

                {/* Error */}
                {status === "error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <AlertCircle size={15} />
                    {errorMsg}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium hover:opacity-90 transition disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "How does the AI Website Builder work?",
                a: "Simply describe your website idea and our AI generates a modern website layout with clean code.",
              },
              {
                q: "Can I download the source code?",
                a: "Yes. Paid plans allow you to download and own the generated source code.",
              },
              {
                q: "Do credits expire?",
                a: "No. Once purchased, your credits remain available for future website generations.",
              },
            ].map(({ q, a }, i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-white/10 rounded-2xl p-5 sm:p-6 bg-white/[0.02] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all"
              >
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
