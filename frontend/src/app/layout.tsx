
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContet";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
          <AuthProvider>
       <Navbar/>
     
        {children}
        <ToastContainer position="top-right" autoClose={3000}/>
        </AuthProvider>
        <Footer/>
      </body>
    </html>
  );
}

