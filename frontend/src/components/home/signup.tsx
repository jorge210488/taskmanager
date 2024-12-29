import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { useSignupMutation } from "../../services/authApi";
import { SignUpForm } from "../../interfaces/signup.interface";
import { SignUpProps } from "../../interfaces/signupProps.interface";

const MySwal = withReactContent(Swal);

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
      onClose();
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
      <Form className="space-y-1 sm:space-y-4 text-sm sm:text-xl">
        <div>
          <label htmlFor="name">Nombre</label>
          <Field
            name="name"
            type="text"
            className="w-full px-3 py-1 sm:py-2 r border rounded-lg"
            placeholder="Tu nombre"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="email">Correo</label>
          <Field
            name="email"
            type="email"
            className="w-full px-3 py-1 sm:py-2 border rounded-lg"
            placeholder="Tu correo"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="password">Clave</label>
          <Field
            name="password"
            type="password"
            className="w-full px-3 py-1 sm:py-2 border rounded-lg"
            placeholder="Tu clave"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirmar Clave</label>
          <Field
            name="confirmPassword"
            type="password"
            className="w-full px-3 py-1 sm:py-2 pborder rounded-lg"
            placeholder="Confirma tu clave"
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
          className="w-full py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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
  );
}