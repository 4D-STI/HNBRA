import Link from "next/link";

export default function BonoGeralButton () {
    return (
        <Link id="clinicas-credenciadas-link" href={"https://www.hnbra.mb:3002/files/140/viewLast"} target="_blank">
            <div id="container-clinicas-credenciadas-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">
              <p id="clinicas-credenciadas-texto" className='truncate'>Clínicas Credenciadas</p>
            </div>
        </Link>
    )
}
