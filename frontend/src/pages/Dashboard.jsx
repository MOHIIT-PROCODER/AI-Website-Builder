
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Rocket,
  Share2,
  Check,
  Globe,
  Plus,
  Search,
  X,
  Menu,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const handleDeploy = async (id) => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/website/deploy/${id}`,
        { withCredentials: true }
      );

      window.open(result.data.url, "_blank");

      setWebsites((prev) =>
        prev.map((w) =>
          w._id === id
            ? {
                ...w,
                deployed: true,
                deployUrl: result.data.url,
              }
            : w
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getWebsites = async () => {
      try {
        setLoading(true);

        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/website/getall`,
          {
            withCredentials: true,
          }
        );

        setWebsites(result.data);
      } catch (error) {
        setError(
          error?.response?.data?.message || "Failed to load websites"
        );
      } finally {
        setLoading(false);
      }
    };

    getWebsites();
  }, []);

  const handleCopy = async (site) => {
    try {
      await navigator.clipboard.writeText(site.deployUrl);
      setCopiedId(site._id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredWebsites = websites.filter((site) =>
    site.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] lg:w-[900px] h-[300px] sm:h-[400px] bg-purple-600/10 blur-[140px]" />

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/70 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Left — hamburger + back + title */}
            <div className="flex items-center gap-2">
              {/* Hamburger — mobile only, now on the LEFT */}
              <button
                className="sm:hidden p-2 rounded-xl hover:bg-white/10 transition"
                onClick={() => setMobileMenu(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

              {/* Back arrow — desktop only */}
              <button
                onClick={() => navigate("/")}
                className="hidden sm:flex p-2 rounded-xl hover:bg-white/10 transition"
                aria-label="Go home"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} className="text-purple-400" />
                <h1 className="font-semibold text-base sm:text-lg">Dashboard</h1>
              </div>
            </div>

            {/* Right — New Website button */}
            <button
              onClick={() => navigate("/generate")}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white text-black font-medium hover:opacity-90 transition text-sm"
            >
              <Plus size={16} />
              <span className="hidden xs:inline">New Website</span>
              <span className="xs:hidden">New</span>
            </button>
          </div>
        </header>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileMenu && (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 z-50"
                onClick={() => setMobileMenu(false)}
              />

              {/* Drawer — slides from LEFT */}
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="fixed top-0 left-0 w-72 h-screen bg-[#0f0f0f] border-r border-white/10 z-50 p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-10">
                  <button
                    onClick={() => setMobileMenu(false)}
                    className="p-2 rounded-xl hover:bg-white/10 transition"
                    aria-label="Back"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="font-bold text-xl">Menu</h2>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  {[
                    { label: "Home", path: "/" },
                    { label: "Features", path: "/features" },
                    { label: "Pricing", path: "/pricing" },
                    { label: "Contact", path: "/contact" },
                  ].map(({ label, path }) => (
                    <button
                      key={path}
                      onClick={() => {
                        navigate(path);
                        setMobileMenu(false);
                      }}
                      className="text-left text-white/80 hover:text-white py-2 border-b border-white/5 transition"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    navigate("/generate");
                    setMobileMenu(false);
                  }}
                  className="mt-6 flex items-center justify-center gap-2 bg-white text-black px-4 py-3 rounded-xl font-medium"
                >
                  <Plus size={16} />
                  New Website
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Main ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-10"
          >
            <p className="text-zinc-500 uppercase tracking-[0.25em] text-xs mb-2">
              Welcome Back
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight truncate">
              {userData?.name}
            </h1>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
            {[
              { label: "Total Websites", value: websites.length },
              {
                label: "Deployed",
                value: websites.filter((w) => w.deployed).length,
              },
              { label: "Account", value: "Pro Creator", isText: true },
            ].map(({ label, value, isText }) => (
              <div
                key={label}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 sm:p-6"
              >
                <p className="text-zinc-400 text-xs sm:text-sm truncate">{label}</p>
                <h2
                  className={`font-bold mt-1 sm:mt-2 ${
                    isText
                      ? "text-sm sm:text-xl"
                      : "text-2xl sm:text-3xl"
                  }`}
                >
                  {value}
                </h2>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <Search size={18} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Search websites..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-24 text-zinc-400">
              Loading websites...
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-24 text-red-400">{error}</div>
          )}

          {/* Empty */}
          {!loading && !error && filteredWebsites.length === 0 && (
            <div className="text-center py-16 sm:py-24">
              <Globe size={40} className="mx-auto text-zinc-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                No websites found
              </h3>
              <p className="text-zinc-500 text-sm sm:text-base mb-6">
                Create your first AI website.
              </p>
              <button
                onClick={() => navigate("/generate")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition text-sm"
              >
                <Plus size={16} />
                New Website
              </button>
            </div>
          )}

          {/* Website Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredWebsites.map((website, index) => {
              const copied = copiedId === website._id;

              return (
                <motion.div
                  key={website._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/editor/${website._id}`)}
                  className="group rounded-2xl sm:rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden cursor-pointer hover:border-white/20 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-300"
                >
                  {/* Preview */}
                  <div className="relative h-44 sm:h-52 bg-[#0a0a0a] overflow-hidden">
                    <iframe
                      srcDoc={website.latestCode}
                      title={website.title}
                      className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold line-clamp-2">
                        {website.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                        Updated{" "}
                        {new Date(website.updatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      {website.deployed ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-orange-500/10 border border-orange-500/20 text-orange-400">
                          Draft
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    {!website.deployed ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeploy(website._id);
                        }}
                        className="mt-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition text-sm"
                      >
                        <Rocket size={15} />
                        Deploy Website
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(website);
                        }}
                        className={`mt-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl font-medium border transition-all text-sm ${
                          copied
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check size={15} />
                            Link Copied
                          </>
                        ) : (
                          <>
                            <Share2 size={15} />
                            Share Link
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
