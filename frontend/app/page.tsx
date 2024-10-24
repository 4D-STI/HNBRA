// import Image from "next/image";
import { Grip } from 'lucide-react';
// import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div id="container-buttons-pages" className=" flex max-w-screen-lg p-4 items-center mx-auto">
      <div id="container-button-acesso" className="flex p-2 hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer">
          <Grip/>
      </div>
      <div id="acesso-rapido-titlle">
        <p>Acesso rápido</p>
      </div>
    </div>
     
  );
}
