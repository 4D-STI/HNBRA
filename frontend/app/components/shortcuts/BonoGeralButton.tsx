import Link from "next/link";

export default function BonoGeralButton () {
    return (
        <Link id="bono-geral-link" href={"https://bono.marinha.mil.br/bono"} target='_blank'>
            <div id="container-bono-geral" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">
              <p id="bono-geral-text" className='truncate'>Bono Geral</p>
            </div>
        </Link>
    )
}
