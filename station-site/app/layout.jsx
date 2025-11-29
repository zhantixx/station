import { AuthProvider } from '../lib/AuthContext'; 
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const metadata = {
  title: "My Next App",
  description: "Simple website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="UTF-8"> 
      <body> 
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}