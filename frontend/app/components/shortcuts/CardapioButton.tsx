import Link from "next/link";

export default function ShortcutButton () {
    return (
        <div id="container-cardapio-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">

            <Link id="cardapio-link" href={"/pdf/cardapio.pdf"} target="_blank">
              <p id="cardapio-text" className='truncate'>Cardápio</p>
            </Link>
        </div>
    )
}
