import Link from "next/link";

export default function BonoGeralButton () {
    return (
        <Link id="bono-sede-link" href={"https://www.com7dn.mb/bono"} target="_blank">
            <div id="container-bono-sede-button" className="hover:bg-blue-300 px-8 py-2 transition duration-200 rounded-full cursor-pointer">
              <p id="bono-sede-text" className='truncate'>Bono Sede</p>
            </div>
        </Link>
    )
}
