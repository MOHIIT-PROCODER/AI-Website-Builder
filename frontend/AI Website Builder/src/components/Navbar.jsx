import { motion, AnimatePresence } from "framer-motion";
import { Menu, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

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

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />

            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">
                Mohit AI
              </h1>

              <p className="text-xs text-zinc-500 hidden sm:block">
                Build websites with AI
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-zinc-400 hover:text-white transition"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/features")}
              className="text-zinc-400 hover:text-white transition"
            >
              Features
            </button>

            <button
              onClick={() => navigate("/pricing")}
              className="text-zinc-400 hover:text-white transition"
            >
              Pricing
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="text-zinc-400 hover:text-white transition"
            >
              Contact
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {userData && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/pricing")}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer"
              >
                <Coins size={14} className="text-yellow-400" />

                <span className="text-white">
                  {userData.credits || 0}
                </span>

                <span className="text-zinc-300">Credits</span>
              </motion.div>
            )}

            {userData ? (
              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                >
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
                        <p className="text-white font-medium">
                          {userData.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {userData.email}
                        </p>
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
                className="hidden md:block px-5 py-2.5 bg-white text-black rounded-full font-medium hover:scale-105 transition"
              >
                Get Started
              </button>
            )}

            <button className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <LoginModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      />
    </>
  );
};

export default Navbar;