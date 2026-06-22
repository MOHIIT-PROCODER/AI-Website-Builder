import { motion, AnimatePresence } from "framer-motion";
import { Menu, Coins, X, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        { withCredentials: true }
      );
      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Left side */}
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only, LEFT side */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo + Name — hidden on mobile, visible on desktop */}
            <div
              onClick={() => navigate("/")}
              className="hidden md:flex items-center gap-3 cursor-pointer"
            >
              <img src="/logo.png" alt="logo" className="w-8 h-8 object-cover rounded-full" />
              <div>
                <h1 className="text-white font-bold text-lg tracking-tight">Mohit AI</h1>
                <p className="text-xs text-zinc-500">Build websites with AI</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="text-zinc-400 hover:text-white transition font-medium"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Credits — desktop only */}
            {userData && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/pricing")}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer"
              >
                <Coins size={14} className="text-yellow-400" />
                <span className="text-white">{userData.credits || 0}</span>
                <span className="text-zinc-300">Credits</span>
              </motion.div>
            )}

            {/* Profile / Get Started */}
            {userData ? (
              <div className="relative">
                <button onClick={() => setOpenProfile(!openProfile)}>
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userData.name || "User"
                      )}`
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full border border-white/20"
                  />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-60 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-medium">{userData.name}</p>
                        <p className="text-xs text-zinc-500">{userData.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setOpenProfile(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-white/5 text-white"
                      >
                        Dashboard
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/5"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setOpenLogin(true)}
                className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white text-black rounded-full font-medium hover:scale-105 transition text-sm"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[60]"
              onClick={() => setMobileOpen(false)}
            />

            {/* Side Drawer — slides from LEFT */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="fixed top-0 left-0 h-full w-72 bg-[#0d0d0d] border-r border-white/10 z-[70] flex flex-col"
            >
              {/* Drawer Header with Back button */}
              <div className="flex items-center gap-3 px-4 h-16 border-b border-white/10">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition text-white"
                  aria-label="Back"
                >
                  <ArrowLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="logo" className="w-7 h-7 object-cover rounded-full" />
                  <span className="font-bold text-white">Mohit AI</span>
                </div>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col gap-1 px-4 py-6 flex-1">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.button
                    key={path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => goTo(path)}
                    className="flex items-center w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/8 transition font-medium"
                  >
                    {label}
                  </motion.button>
                ))}

                {/* Dashboard shortcut if logged in */}
                {userData && (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_LINKS.length * 0.06 }}
                    onClick={() => goTo("/dashboard")}
                    className="flex items-center w-full text-left px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/8 transition font-medium"
                  >
                    Dashboard
                  </motion.button>
                )}
              </div>

              {/* Bottom CTA */}
              <div className="px-6 pb-8 flex flex-col gap-3">
                {userData ? (
                  <>
                    {/* Credits */}
                    <div
                      onClick={() => goTo("/pricing")}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
                    >
                      <Coins size={16} className="text-yellow-400" />
                      <span className="text-white font-medium">{userData.credits || 0}</span>
                      <span className="text-zinc-400 text-sm">Credits</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenLogin(true);
                    }}
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
};

export default Navbar;