import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../services/taskApi";
import { Task } from "../../interfaces/task.interface";
import { TaskFormProps } from "../../interfaces/taskFormProps.interface";

const MySwal = withReactContent(Swal);

export default function TaskForm({ task, onClose }: TaskFormProps) {
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const isUpdate = !!task;

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string(),
    completed: Yup.boolean(),
  });

  const handleSubmit = async (values: Partial<Task>) => {
    try {
      if (isUpdate) {
        await updateTask({ id: task!._id, task: values }).unwrap();
        await MySwal.fire({
          title: "¡Tarea actualizada!",
          text: "La tarea se actualizó correctamente.",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      } else {
        await createTask(values).unwrap();
        await MySwal.fire({
          title: "¡Tarea creada!",
          text: "La tarea se creó correctamente.",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      MySwal.fire({
        title: "Error",
        text: "Hubo un problema al procesar la tarea. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        title: task?.title || "",
        description: task?.description || "",
        completed: task?.completed || false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4 relative">
        {/* Mostrar fechas solo en actualización */}
        {isUpdate && (
          <div className="absolute top-2 right-2 text-sm text-gray-500">
            <p>Creado: {new Date(task!.createdAt).toLocaleString()}</p>
            <p>Actualizado: {new Date(task!.updatedAt).toLocaleString()}</p>
          </div>
        )}

        {/* Campo de título */}
        <div>
          <label htmlFor="title">Título</label>
          <Field
            name="title"
            type="text"
            placeholder="Título de la tarea"
            className="w-full border rounded-lg px-3 py-2"
          />
          <ErrorMessage name="title" component="div" className="text-red-500" />
        </div>

        {/* Campo de descripción */}
        <div>
          <label htmlFor="description">Descripción</label>
          <Field
            name="description"
            as="textarea"
            placeholder="Descripción de la tarea"
            className="w-full border rounded-lg px-3 py-2"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500"
          />
        </div>

        {/* Campo de completado, solo en actualización */}
        {isUpdate && (
          <div className="flex items-center gap-2">
            <Field
              name="completed"
              type="checkbox"
              className="rounded-lg border-gray-300"
            />
            <label htmlFor="completed">
              {task!.completed ? "Completado" : "Pendiente"}
            </label>
          </div>
        )}

        {/* Botón de enviar */}
        <button
          type="submit"
          className={`w-full ${
            isUpdate ? "bg-green-600" : "bg-blue-600"
          } text-white rounded-lg py-2`}
        >
          {isUpdate ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </Form>
    </Formik>
  );
}