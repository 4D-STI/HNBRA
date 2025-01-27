import Link from "next/link";

export default function PlanoDoDiaButton () {
    return (
        <div id="container-plano-do-dia-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">

          <Link id="plano-do-dia-link" href={"/pdf/plano_do_dia.pdf"} target="_blank">
              <p id="plano-do-dia-text" className='truncate'>Plano do Dia</p>
          </Link>
        </div>
    )
}
