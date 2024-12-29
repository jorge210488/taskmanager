import { ReactNode } from "react";
import NavBar from "./components/home/navBar";
import Footer from "./components/home/footer";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <NavBar />
      <main className="flex-grow overflow-auto relative">{children}</main>
      <Footer />
    </div>
  );
}
