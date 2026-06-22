
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Globe, Rocket, AlertCircle } from "lucide-react";
import { useParams } from "react-router-dom";

const LiveSite = () => {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/website/getbyslug/${id}`,
          {
            withCredentials: true,
          }
        );

        setHtml(res.data.latestCode);
      } catch (error) {
        console.log(error);

        setError(
          error?.response?.data?.message ||
            "Website not found"
        );
      } finally {
        setLoading(false);
      }
    };

    handleGetWebsite();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-500/10 blur-[120px]" />

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-white animate-spin mx-auto mb-6" />

          <h1 className="text-2xl font-bold mb-2">
            Loading Website
          </h1>

          <p className="text-zinc-500">
            Preparing deployment preview...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative z-10 text-center max-w-md">
          <AlertCircle
            size={60}
            className="mx-auto mb-5 text-red-500"
          />

          <h1 className="text-3xl font-bold mb-3">
            Deployment Error
          </h1>

          <p className="text-zinc-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Rocket size={18} />
          <span className="font-semibold">
            MOHIT Deploy
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-emerald-400">
          <Globe size={14} />
          Live Preview
        </div>
      </div>

      {/* Website Preview */}
      <iframe
        title="Live Website"
        srcDoc={html}
        className="w-full h-[calc(100vh-56px)] border-none bg-white"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default LiveSite;

