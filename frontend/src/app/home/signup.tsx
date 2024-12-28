import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

import { useSignupMutation } from "../../services/authApi";
import { SignUpForm } from "../../interfaces/signup.interface";

const MySwal = withReactContent(Swal);

interface SignUpProps {
  onClose: () => void;
}

export default function SignUp({ onClose }: SignUpProps) {
  const [signupMutation, { isLoading, error }] = useSignupMutation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "Debe tener al menos 3 caracteres"),
    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .required("La clave es obligatoria")
      .min(6, "Debe tener al menos 6 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Las claves deben coincidir")
      .required("Debe confirmar la clave"),
  });

  const handleSubmit = async (values: SignUpForm) => {
    try {
      await signupMutation(values).unwrap();
      await MySwal.fire({
        title: "¡Registro Exitoso!",
        text: "Tu cuenta ha sido creada correctamente.",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      onClose(); // Cierra el modal
    } catch (err) {
      console.error("Error al registrarse:", err);
      MySwal.fire({
        title: "Error",
        text: "No se pudo completar el registro. Inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Crear Cuenta</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium">
                Nombre
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Tu nombre"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">
                Correo
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Tu correo"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium">
                Clave
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Tu clave"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-medium">
                Confirmar Clave
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirma tu clave"
                className="w-full px-3 py-2 border rounded-lg"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
            {error && (
              <div className="text-red-500 text-sm mt-2">
                Error al registrarse. Por favor, intente nuevamente.
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}
