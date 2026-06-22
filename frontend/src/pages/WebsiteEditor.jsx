import axios from "axios";
import {
  Code2,
  MessageSquare,
  Monitor,
  Rocket,
  Send,
  X,
  Sparkles,
  Globe,
} from "lucide-react";

import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

const WebsiteEditor = () => {
  const { id } = useParams();

  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");

  const [updateLoading, setUpdateLoading] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);

  const [showCode, setShowCode] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const iframeRef = useRef(null);

  const thinkingSteps = [
    "Understanding your request...",
    "Planning layout improvements...",
    "Optimizing responsiveness...",
    "Adding interactions...",
    "Finalizing website update...",
  ];

  const handleDeploy = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/website/deploy/${website._id}`,
        {
          withCredentials: true,
        },
      );

      window.open(result.data.url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!prompt.trim()) return;

    const currentPrompt = prompt;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentPrompt,
      },
    ]);

    setPrompt("");
    setUpdateLoading(true);

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/website/update/${id}`,
        {
          prompt: currentPrompt,
        },
        {
          withCredentials: true,
        },
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: result.data.message,
        },
      ]);

      setCode(result.data.code);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    if (!updateLoading) return;

    const intervalId = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % thinkingSteps.length);
    }, 1400);

    return () => clearInterval(intervalId);
  }, [updateLoading]);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/website/getbyid/${id}`,
          {
            withCredentials: true,
          },
        );

        setWebsite(result.data);
        setCode(result.data.latestCode);
        setMessages(result.data.conversation || []);
      } catch (error) {
        setError(error?.response?.data?.message || "Failed to load website");
      }
    };

    fetchWebsite();
  }, [id]);

  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const blob = new Blob([code], {
      type: "text/html",
    });

    const url = URL.createObjectURL(blob);

    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <X className="text-red-400" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Failed to load website</h2>

          <p className="text-zinc-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/10 blur-[140px]" />

        <div className="relative z-10 text-center">
          <div className="w-14 h-14 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto mb-5" />

          <h2 className="text-xl font-semibold">Loading Website</h2>

          <p className="text-zinc-500 mt-2">Preparing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-purple-500/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[140px]" />

      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-[420px] flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl">
          <Header />

          <div className="px-5 py-4 border-b border-white/10">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={18} className="text-purple-400" />

                <h3 className="font-medium">AI Website Assistant</h3>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Describe any change and AI will instantly update your website
                design, layout and content.
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] ${
                  message.role === "user" ? "ml-auto" : "mr-auto"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-3xl text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg"
                      : "bg-white/[0.03] backdrop-blur-xl border border-white/10 text-zinc-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {updateLoading && (
              <div className="max-w-[85%] mr-auto">
                <div className="px-4 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  {thinkingSteps[thinkingIndex]}
                </div>
              </div>
            )}
          </div>

          {/* Prompt Box */}
          <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-xl">
            <div className="flex gap-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={2}
                placeholder="Describe changes to your website..."
                className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/[0.03] border border-white/10 outline-none focus:border-purple-500/40 text-sm"
              />

              <button
                disabled={updateLoading}
                onClick={handleUpdate}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white hover:scale-105 transition disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <div className="flex-1 flex flex-col">
          <div className="h-14 px-6 flex justify-between items-center border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

              <span className="text-sm text-zinc-300">Live Preview</span>
            </div>

            <div className="flex items-center gap-2">
              {!website.deployed && (
                <button
                  onClick={handleDeploy}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white text-sm font-medium hover:scale-105 transition shadow-lg"
                >
                  <Rocket size={14} />
                  Deploy
                </button>
              )}

              <button
                onClick={() => setShowChat(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition lg:hidden"
              >
                <MessageSquare size={18} />
              </button>

              <button
                onClick={() => setShowCode(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <Code2 size={18} />
              </button>

              <button
                onClick={() => setShowFullPreview(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <Monitor size={18} />
              </button>
            </div>
          </div>

          <iframe
            ref={iframeRef}
            className="flex-1 w-full bg-white rounded-t-2xl"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

        {/* Mobile Chat */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex flex-col bg-black"
            >
              <Header />

              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] ${
                      message.role === "user" ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div
                      className={`px-4 py-3 rounded-3xl text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white"
                          : "bg-white/[0.03] border border-white/10"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {updateLoading && (
                  <div className="max-w-[85%]">
                    <div className="px-4 py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      {thinkingSteps[thinkingIndex]}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-3">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={2}
                    placeholder="Describe changes..."
                    className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/[0.03] border border-white/10 outline-none"
                  />

                  <button
                    disabled={updateLoading}
                    onClick={handleUpdate}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code Drawer */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 right-0 w-full lg:w-[50%] z-[9999] flex flex-col bg-[#0a0a0a] border-l border-white/10"
            >
              <div className="h-14 px-5 flex items-center justify-between border-b border-white/10 bg-black">
                <div className="flex items-center gap-3">
                  <Code2 size={18} />
                  <span className="font-medium">index.html</span>
                </div>

                <button
                  onClick={() => setShowCode(false)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              <Editor
                theme="vs-dark"
                value={code}
                language="html"
                onChange={(value) => setCode(value || "")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Preview */}
        <AnimatePresence>
          {showFullPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[9999]"
            >
              <iframe
                srcDoc={code}
                className="w-full h-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms"
                title="Fullscreen Preview"
              />

              <button
                onClick={() => setShowFullPreview(false)}
                className="absolute top-5 right-5 p-3 rounded-xl bg-black/70 border border-white/10 hover:bg-black"
              >
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  function Header() {
    return (
      <div className="h-14 px-5 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

          <div>
            <h2 className="font-semibold truncate max-w-[250px]">
              {website?.title}
            </h2>

            <p className="text-xs text-zinc-500">AI Website Builder</p>
          </div>
        </div>

        <button
          onClick={() => setShowChat(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10"
        >
          <X size={18} />
        </button>
      </div>
    );
  }
};

export default WebsiteEditor;
