import { Routes, Route } from "react-router-dom";
import Home from "../components/home/home";
import Tasks from "../components/tasks/task";
import PrivateRoute from "./privateRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
