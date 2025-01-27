import Link from "next/link";

export default function ShortcutButton () {
    return (
        <Link id="cardapio-link" href={"https://www.hnbra.mb:3002/files/7/viewLast"} target="_blank">
            <div id="container-cardapio-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">
              <p id="cardapio-text" className='truncate'>Cardápio</p>
            </div>
        </Link>
    )
}
