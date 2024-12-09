import SupportSvg from '@/public/images/support_img_svg.svg'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer id="footer-layout-default" className="flex fixed bottom-0 left-0 right-0 bg-blue-800 h-24 text-white content-center">
            <address id="footer-text-container" className="flex-col not-italic text-sm my-2 ml-8">
                <h1 className="">Hospital Naval de Brasília</h1>
                <p className="">SEPS Q 711/911 - Asa Sul, Brasília - DF, 73390-115</p>
                <p className="">(61) 3445-7303</p>
                <p className="">CNPJ: 00.394.502/0060-02
                </p>
            </address>

            <Image
            alt='logomarca do governo do Brasil'
            src={SupportSvg}
            width={50}
            className=''
            />
        </footer>
             )
        
 }
