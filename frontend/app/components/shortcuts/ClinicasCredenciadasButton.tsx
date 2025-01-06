import Link from "next/link";

export default function BonoGeralButton () {
    return (
        <div id="container-clinicas-credenciadas-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">

          <Link id="clinicas-credenciadas-link" href={"/pdf/clinicas_credenciadas.pdf"} target="_blank">
              <p id="clinicas-credenciadas-texto" className='truncate'>Clínicas Credenciadas</p>
          </Link>
        </div>
    )
}
