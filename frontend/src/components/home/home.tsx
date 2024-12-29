import AnimationLottie from "../../helpers/animationLottie";
import lottieHome from "../../assets/homeLottie.json";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen m-0 p-0">
      {/* Texto de Headline */}
      <div className="w-full md:w-1/2 text-center text-white px-4 md:px-8 mt-4 md:mt-0">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">
          Bienvenido a <span className="text-yellow-300">TaskManager</span>
        </h1>
        <p className="mt-2 md:mt-4 text-base md:text-lg font-light">
          Tu solución perfecta para la productividad y organización.
        </p>
      </div>

      {/* Animación Lottie */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-4 md:px-8 mb-4 md:mb-0">
        <AnimationLottie animationData={lottieHome} />
      </div>
    </div>
  );
}
