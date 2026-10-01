import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    /* 75 is the default for photos; 90 is for illustrations with fine glow
       lines and gradients (e.g. the AI Chatbot image), which blur at 75. */
    qualities: [75, 90],
  },
};

export default nextConfig;
