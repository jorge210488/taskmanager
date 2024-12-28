import { ReactNode } from "react";
import NavBar from "./app/home/navBar";
import type { Metadata } from "next";
interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "TaskManager",
  description: "Taskmanager",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
