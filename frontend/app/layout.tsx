import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/components/Footer"
import Header from "./components/Header";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={`${Rawline.variable} antialiased flex flex-col min-h-screen bg-blue-100`}>
        
        <header id="layout-default-header-container" className="">
          {/* header padrao */}
          <Header />
        </header>
        
        {/* body dinamico */}
        <main
          id="layout-default-main-content"
          className="flex-grow flex-shrink overflow-y-auto w-screen mb-4">
          <Suspense>
            {children}
          </Suspense>
        </main>

        <Toaster />
        
        <footer id="layout-default-footer-container" className="">
          {/* footer padrão */}
          <Footer/>
        </footer>

      </body>
    </html>
  );
}
