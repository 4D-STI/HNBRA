"use client";

import Image from 'next/image';
import LogoHnbra from "@/public/images/heraldica3.jpg";

export default function ServicoDeFonoaudiologo() {
  return (
    <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg" property="content:encoded">
      <Image
        src={LogoHnbra}
        alt="HNBRA"
        width={800}
        height={250}
        style={{ objectFit: 'cover' }}
      />
      <p>O Distintivo para o Hospital Naval de Brasília foi aprovado pelo Exmº. Sr. Ministro de Estado da Marinha em 16 de outubro de 1969 (publicado no boletim nº 5, de 30 de janeiro de 1970).</p>
      <p>EXPLICAÇÃO<br></br>
        A cruz ancorada de verde, carregada do símbolo de Esculápio de ouro, em campo de prata, simboliza os serviços hospitalares na Marinha do Brasil, como vem ocorrendo com os distintivos dos demais estabelecimentos congêneres da Marinha; em bordadura de verde, as quatro colunas arquitetônicas de prata, típicas de Brasília, aludem a esta cidade e a evocam como sede do Hospital em apreço.</p>
      <p>DESCRIÇÃO<br></br>
        Num escudo boleado, encimado pela coroa naval e envolto por uma elipse feita de um cabo de ouro terminado em nó direito, em campo de prata uma cruz ancorada de verde e carregada do símbolo de Esculápio de ouro, posto em pala. Bordadura de verde com quatro colunas arquitetônicas típicas de Brasília, de prata e dispostas em cruz.</p>
    </div>
  );
}
