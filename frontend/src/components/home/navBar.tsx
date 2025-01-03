import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Home, List, LogOut } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import ProfilePic from "../../assets/profile.png";
import useClickOutside from "../../hooks/useClickOutside";
import HomeModal from "./homeModal";
import SignUp from "./signup";
import SignIn from "./signin";
import { RootState } from "../../redux/store";
import { logout, login } from "../../redux/authSlice";
import { clearTasks } from "../../redux/tasksSlice";

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalType, setModalType] = useState<"signup" | "signin" | undefined>(
    undefined
  );
  const dropRef = useClickOutside(() => setShowDropdown(false));

  const { isAuthenticated, name, email } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearTasks());
    dispatch(logout());
    setShowDropdown(false);
    navigate("/");
  };

  const handleLogin = (userData: {
    name: string;
    email: string;
    token: string;
    userId: string;
  }) => {
    dispatch(login(userData));
    setModalType(undefined);
    navigate("/tasks");
  };

  const handleOpenModal = (type: "signup" | "signin") => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(undefined);
  };

  const navigateTo = location.pathname === "/" ? "/tasks" : "/";
  const navigateLabel = location.pathname === "/" ? "Tareas" : "Inicio";

  return (
    <nav
      className="fixed top-0 left-0 w-full flex items-center justify-end px-4 py-2 z-50"
      style={{ background: "transparent" }}
    >
      {!isAuthenticated ? (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => handleOpenModal("signin")}
          >
            Iniciar Sesión
          </button>
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            onClick={() => handleOpenModal("signup")}
          >
            Registrarse
          </button>
        </div>
      ) : (
        <div className="relative w-fit" ref={dropRef}>
          <button
            className="flex gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-[#9575CD] text-white font-medium"
            onClick={() => setShowDropdown((curr) => !curr)}
          >
            Menu
          </button>
          {showDropdown && (
            <ul className="min-w-max absolute right-0 mt-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-800 divide-y divide-gray-100 rounded-lg shadow overflow-hidden">
              <li className="flex gap-3 items-center px-4 py-2 text-gray-800 hover:bg-gray-50">
                <img
                  src={ProfilePic}
                  className="w-12 rounded-full"
                  alt="Profile"
                />
                <div className="py-2">
                  <p className="font-medium">{name || "Usuario"}</p>
                  <a className="text-sm font-medium text-gray-500">
                    {email || "Correo no disponible"}
                  </a>
                </div>
              </li>
              <li
                className="flex gap-3 items-center px-4 py-2 text-gray-800 hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(navigateTo)}
              >
                {location.pathname === "/" ? (
                  <List size={20} />
                ) : (
                  <Home size={20} />
                )}
                {navigateLabel}
              </li>
              <li
                className="flex gap-3 items-center px-4 py-2 text-gray-800 hover:bg-gray-50 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut size={20} /> Logout
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Modal reutilizable */}
      <HomeModal
        isOpen={!!modalType}
        onClose={handleCloseModal}
        type={modalType}
      >
        {modalType === "signup" && <SignUp onClose={handleCloseModal} />}
        {modalType === "signin" && <SignIn onLogin={handleLogin} />}
      </HomeModal>
    </nav>
  );
}
