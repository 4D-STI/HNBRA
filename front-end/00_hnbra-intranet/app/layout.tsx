import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/components/Footer"

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="pt-br">
      <body
        className={`${Rawline.variable} ${Rawline.variable} antialiased`}
      >
        {children}
      </body>
      <Footer/>

    </html>
  );
}
