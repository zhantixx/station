export const metadata = {
  title: "My Next App",
  description: "Simple website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
