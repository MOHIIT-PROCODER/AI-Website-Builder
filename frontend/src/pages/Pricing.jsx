import React from "react";
import { ArrowLeft, Check, Coins, Sparkles, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect to explore Mohit AI",
    features: [
      "AI Website Generation",
      "Responsive HTML Output",
      "Basic Animations",
    ],
    popular: false,
    button: "Get Started",
    accent: "border-white/10 bg-white/[0.02]",
    glow: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹499",
    credits: 500,
    description: "For creators and freelancers",
    features: [
      "Everything in Free",
      "Faster Generations",
      "Edit & Regenerate",
      "Download Source Code",
    ],
    popular: true,
    button: "Upgrade to Pro",
    accent: "border-purple-500/40 bg-purple-500/[0.06]",
    glow: "shadow-[0_0_60px_rgba(139,92,246,0.15)]",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹1499",
    credits: 1000,
    description: "For teams and agencies",
    features: [
      "Unlimited Iterations",
      "Highest Priority",
      "Team Collaboration",
      "Dedicated Support",
    ],
    popular: false,
    button: "Contact Sales",
    accent: "border-white/10 bg-white/[0.02]",
    glow: "",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async (plan) => {
    if (plan.id === "free") {
      navigate("/dashboard");
      return;
    }

    try {
      const amount = plan.id === "enterprise" ? 1499 : 499;

      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/payment/order`,
        { planId: plan.id, amount, credits: plan.credits },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "Mohit AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          try {
            const verify = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/api/payment/verify`,
              response,
              { withCredentials: true }
            );
            dispatch(setUserData(verify.data.user));
            navigate("/dashboard");
          } catch (error) {
            console.log(error);
          }
        },

        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-700/8 blur-[120px] pointer-events-none" />

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 uppercase tracking-widest text-xs mb-6">
            <Zap size={12} />
            Pricing
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight">
            Build websites
            <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Generate beautiful websites instantly. Choose a plan and start
            building today.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl border backdrop-blur-xl p-6 sm:p-8 transition-all ${plan.accent} ${plan.glow}`}
            >
              {plan.popular && (
                <div className="absolute right-5 top-5 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-zinc-500 mb-6 sm:mb-8 text-sm">{plan.description}</p>

              <div className="flex items-end gap-2 mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold">{plan.price}</span>
                <span className="text-zinc-500 mb-2 text-sm">one-time</span>
              </div>

              <div className="flex items-center gap-2 mb-6 sm:mb-8 px-3 py-2 rounded-xl bg-white/5 w-fit">
                <Coins size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">{plan.credits} Credits</span>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-emerald-400" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePayment(plan)}
                className={`w-full py-3 rounded-xl font-medium transition text-sm sm:text-base ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-90"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                {plan.button}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 sm:mt-24 text-center">
          <div className="inline-flex items-center gap-2 text-zinc-500 text-sm">
            <Sparkles size={14} className="text-purple-400" />
            Trusted by developers, startups and creators worldwide.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;