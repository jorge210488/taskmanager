import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useGetTasksQuery } from "./services/taskApi";
import { fetchTasksSuccess } from "./redux/tasksSlice";
import NavBar from "./components/home/navBar";
import Footer from "./components/home/footer";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: tasks } = useGetTasksQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated && tasks) {
      dispatch(fetchTasksSuccess(tasks));
    }
  }, [isAuthenticated, tasks, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <main className="flex-grow overflow-auto relative">{children}</main>
      <Footer />
    </div>
  );
}
