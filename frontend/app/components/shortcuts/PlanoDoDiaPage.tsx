import Link from "next/link";

export default function PlanoDoDiaPage () {
    return (
        <Link id="plano-do-dia-link" href={"/plano_do_dia"} target="">
            <div id="container-plano-do-dia-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">
              <p id="plano-do-dia-text" className='truncate'>Plano do Dia</p>
            </div>
        </Link>
    )
}
