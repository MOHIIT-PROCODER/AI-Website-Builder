import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const LoginModal = ({ open, onClose, onSuccess, message }) => {
    const dispatch = useDispatch()
    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(import.meta.env.VITE_SERVER_URL);
            const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`, {
                name: result.user.displayName,
                email: result.user.email,
                avatar: result.user.photoURL
            }, { withCredentials: true })
            dispatch(setUserData(data))
            onClose()
            if (onSuccess) onSuccess(data)
        } catch (error) {
            console.log(error)
        }
    }

return ( <AnimatePresence>
{open && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
onClick={onClose}
className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
>
<motion.div
initial={{ opacity: 0, y: 20, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 20, scale: 0.98 }}
transition={{ duration: 0.2 }}
onClick={(e) => e.stopPropagation()}
className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0A0A0A] shadow-2xl"
> <div className="relative p-8">


          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-500 hover:text-white transition"
          >
            <X size={18} />
          </button>

          {/* Logo */}
          <div className="mb-8">

            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="logo"
                className="w-9 h-9 rounded-full object-cover"
              />

              <span className="text-white font-semibold text-lg">
                Mohit AI
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-white">
              Sign in
            </h2>

            <p className="mt-3 text-zinc-500">
              {message || "Continue to generate websites and export production-ready React code."}
            </p>

          </div>

          {/* Google Login */}
          <motion.button
            onClick={handleGoogleAuth}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-12 rounded-xl bg-white text-black font-medium flex items-center justify-center gap-3 hover:opacity-90 transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              className="w-5 h-5"
            />

            Continue with Google
          </motion.button>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">

            <div className="flex-1 h-px bg-zinc-800" />

            <span className="text-xs text-zinc-500">
              Secure Authentication
            </span>

            <div className="flex-1 h-px bg-zinc-800" />

          </div>

          {/* Features */}
          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-400" />

              <p className="text-sm text-zinc-400">
                Generate complete websites from prompts
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-400" />

              <p className="text-sm text-zinc-400">
                Export production-ready React code
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-zinc-400" />

              <p className="text-sm text-zinc-400">
                Access future AI website generations
              </p>
            </div>

          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-zinc-500 leading-relaxed">
            By continuing, you agree to our Terms of Service
            and Privacy Policy.
          </p>

        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


);
};

export default LoginModal;
