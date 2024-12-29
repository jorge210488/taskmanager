"use client";

import Lottie from "lottie-react";
import { AnimationLottieProps } from "../interfaces/animationLottieProps.interface";

const AnimationLottie: React.FC<AnimationLottieProps> = ({ animationData }) => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: "95%" }}
    />
  );
};

export default AnimationLottie;
