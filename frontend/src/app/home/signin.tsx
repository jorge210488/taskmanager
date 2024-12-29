import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { useSigninMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { SignInForm } from "../../interfaces/signin.interface";
import { AuthProps } from "../../interfaces/authProps.interface";
import { SignInProps } from "../../interfaces/signinProps";

const MySwal = withReactContent(Swal);

export default function SignIn({ onLogin }: SignInProps) {
  const [loginMutation, { isLoading, error }] = useSigninMutation();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    password: Yup.string().required("La clave es obligatoria"),
  });

  const handleSubmit = async (values: SignInForm) => {
    try {
      const response: AuthProps = await loginMutation(values).unwrap();
      console.log("Respuesta del backend:", response);

      dispatch(
        login({
          name: response.name,
          email: response.email,
          token: response.token,
        })
      );

      if (onLogin) {
        onLogin({
          name: response.name,
          email: response.email,
          token: response.token,
        });
      }

      await MySwal.fire({
        title: "¡Inicio de sesión exitoso!",
        text: `Bienvenido, ${response.name}!`,
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);

      MySwal.fire({
        title: "Error",
        text: "No se pudo iniciar sesión. Verifica tus credenciales.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-1 sm:space-y-4 text-sm sm:text-xl">
        <div>
          <label>Correo</label>
          <Field
            name="email"
            className="w-full px-3 py-1 sm:py-2 border rounded-lg"
            placeholder="Correo electrónico"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div>
          <label>Clave</label>
          <Field
            name="password"
            type="password"
            className="w-full px-3 py-1 sm:py-2 border rounded-lg"
            placeholder="Clave"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-1 sm:py-2 bg-blue-600 text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            Error al iniciar sesión. Verifica tus credenciales.
          </div>
        )}
      </Form>
    </Formik>
  );
}
