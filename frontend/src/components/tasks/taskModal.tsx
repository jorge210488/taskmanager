import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { TaskModalProps } from "../../interfaces/taskModal.interface";
import AnimationLottie from "../../helpers/animationLottie";
import addTaskAnimation from "../../assets/addTask.json";

export default function TaskModal({
  isOpen,
  onClose,
  children,
}: TaskModalProps) {
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
        className="bg-white w-[60%] max-w-sm sm:max-w-3xl rounded-lg shadow-lg flex flex-col sm:flex-row relative overflow-hidden animate-fade-in p-3 sm:p-6"
        style={{
          top: "-10%",
        }}
      >
        {/* Sección de animación */}
        <div className="w-full sm:w-1/2 flex justify-center items-center p-0 sm:p-4">
          <AnimationLottie animationData={addTaskAnimation} />
        </div>

        {/* Sección del formulario */}
        <div className="w-full sm:w-1/2 p-0 sm:p-6">
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
