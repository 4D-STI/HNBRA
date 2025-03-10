export default function SEDIME_Description() {
  return (
    <div className="">
        <p 
          id="decription-tittle"
          className="font-bold mb-2 text-center">
            SETOR DE DISPENSAÇÃO DE MEDICAMENTOS (SeDiMe) 
        </p>
        
        <span
          id="description-content"
          className="flex flex-col indent-8 text-justify mb-2">
          
          <p className="mb-2">
            O SeDiMe é o setor do HNBra destinado à dispensação dos medicamentos padronizados pelo SisDiMe, aos usuários do Sistema de Saúde da Marinha (SSM) e servidores civis da Marinha, mediante prescrição médica e indenização. Para aquisição, o paciente necessita apresentar documento de identidade oficial com foto e prescrição médica. 
          </p>

          <p className="mb-2">
            Ressalta-se que a indenização é realizada por meio de consignação em BP mas caso o usuário não possua margem consignável, será disponibilizada como alternativa a indenização via PagTesouro (PIX) ou GRU.
          </p>

          <p className="mb-2">
            A lista completa de medicamentos padronizados pela DSM, bem como aqueles que podem comprar sem prescrição estão disponíveis no site do HNBra (<a href="https://www.marinha.mil.br/hnbra" target="_blank" className="text-blue-600 hover:underline">www.marinha.mil.br/hnbra</a>) e na página da intranet.
          </p>

          <p className="mb-2">
            {`Adicionalmente, participo que a DSM estabeleceu como estratégia para o gerenciamento e prevenção de doenças crônicas, e suas complicações decorrentes, o fornecimento gratuito de determinados medicamentos aos usuários do SisDiMe através do Projeto "Saúde ao seu Alcance" (SSA). Atualmente, está disponível no SSA o medicamento para hipertensão arterial padronizado no SisDiMe. A critério da DSM, o Projeto poderá ser ampliado a outros Programas de Saúde. Para ter acesso ao benefício de receber os medicamentos de forma gratuita, o usuário deverá estar cadastrado em Programa de Saúde que esteja vinculado ao Projeto, conforme preconizado na DSM-2006, possibilitando o acompanhamento pela equipe de enfermagem da evolução do paciente e, se necessário, encaminhá-lo para reavaliação pelo atendimento ambulatorial. Uma vez cadastrado no SSA, o paciente poderá se dirigir ao SeDiMe para adquirir seus medicamentos gratuitamente. Para tanto, deverá apresentar ao atendente, receituário médico prescrito com quantidade estabelecida para até noventa dias. A lista dos medicamentos contemplados no SSA está disponível na página da DSM e Saúde Naval na internet/intranet.`} 
          </p>

          <p className="">
            <strong>Funcionamento: de segunda a sexta-feira, das 7h00 às 13h00.</strong>
          </p>
          
        </span>
    </div>
  );
}
