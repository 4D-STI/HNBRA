import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/components/Footer"
import Header from "./components/Header";
import { Suspense } from "react";

const Rawline = localFont({
  src: "./fonts/rawline-300.ttf",
  variable: "--font-rawline",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "www.hnbra.mb",
  description: "Hospital Naval de Brasília",
  authors: [
    {name: "devHB - Helber Brito", url: "https://www.linkedin.com/in/devhb/",},
    {name: "devBreno - Breno Marcio", url: "https://www.linkedin.com/in/breno-marcio-medeiros/"}
    ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${Rawline.variable} antialiased flex flex-col min-h-screen`}>
        
        <header id="layout-default-header-container" className="">
          {/* header padrao */}
          <Header />
        </header>
        
        {/* body dinamico */}
        <main
          id="layout-default-main-content"
          className="flex-grow flex-shrink overflow-y-auto bg-blue-100 w-screen">
          <Suspense>
            {children}
          </Suspense>
        </main>
        
        <footer id="layout-default-footer-container" className="">
          {/* footer padrão */}
          <Footer/>
        </footer>

      </body>
    </html>
  );
}
