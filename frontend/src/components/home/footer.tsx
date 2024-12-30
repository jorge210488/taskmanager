import { ArrowUp } from "react-feather";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full text-white py-6 px-10 flex justify-between items-center bg-transparent z-50 mt-auto">
      <>
        <p className="text-xs sm:text-sm">
          © 2024 Diseño de Jorge Martínez. Todos los derechos reservados.
        </p>
        <button
          onClick={handleScrollToTop}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-[#9575CD] text-xs sm:text-sm"
        >
          <ArrowUp size={16} />
          Arriba
        </button>
      </>
    </footer>
  );
}
