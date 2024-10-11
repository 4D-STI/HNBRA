import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/components/Footer"
import Header from "./components/Header";

const Rawline = localFont({
  src: "./fonts/rawline-300.ttf",
  variable: "--font-rawline",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HNBRA",
  description: "Hospítal Naval de Brasília",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${Rawline.variable} antialiased`}>
        <Header />
        <main className="flex-grow">{children}</main> 
        <Footer/>
      </body>
    </html>
  );
}