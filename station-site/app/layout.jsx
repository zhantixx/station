import { AuthProvider } from '../lib/AuthContext'; 
import './globals.css';

export const metadata = {
  title: "My Next App",
  description: "Simple website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru"> 
      <body> 
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}