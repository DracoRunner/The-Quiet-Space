"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type React from "react";

interface LottieAnimationProps {
  src: string;
  className?: string;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  className,
}) => {
  return (
    <div className={className}>
      <DotLottieReact src={src} loop autoplay />
    </div>
  );
};

export default LottieAnimation;
