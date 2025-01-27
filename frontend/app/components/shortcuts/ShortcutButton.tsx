import { Grip } from "lucide-react";

export default function ShortcutButton () {
    return (
        <div id="container-shortcut-button" className="flex px-8 py-2 ml-12 items-center hover:bg-blue-300 transition duration-200 rounded-full cursor-pointer absolute left-0">

          <div id="container-shortcut-icon" className="mr-4">
            <Grip />
          </div>

          <div id="shortcut-title">
            <p className='truncate'>Acesso rápido</p>
          </div>
        </div>
    )
}
