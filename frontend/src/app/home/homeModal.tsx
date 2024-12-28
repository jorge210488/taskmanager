import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { HomeModalProps } from "../../interfaces/homeModal.interface";

export default function HomeModal({
  isOpen,
  onClose,
  children,
  animation,
}: HomeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(onClose, [modalRef]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-3xl rounded-lg shadow-lg flex relative overflow-hidden animate-fade-in"
      >
        {/* Sección de animación */}
        {animation && (
          <div className="w-1/2 bg-gray-100 flex justify-center items-center">
            {animation}
          </div>
        )}

        {/* Sección del formulario */}
        <div className={`p-6 ${animation ? "w-1/2" : "w-full"}`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
