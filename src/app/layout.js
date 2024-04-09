import { Inter } from "next/font/google";
import "./globals.css";



export const metadata = {
  title: "Code Share",
  description: "Code Sharing Becoming Easier !!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
