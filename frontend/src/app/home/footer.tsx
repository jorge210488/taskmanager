import { ArrowUp } from "react-feather";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full text-white py-4 px-6 flex justify-between items-center fixed bottom-0 left-0 bg-transparent z-50">
      <p className="text-xs sm:text-sm">
        © 2024 Diseño de Jorge Martínez. Todos los derechos reservados.
      </p>
      <button
        onClick={handleScrollToTop}
        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm"
      >
        <ArrowUp size={16} />
        Ir Arriba
      </button>
    </footer>
  );
}
