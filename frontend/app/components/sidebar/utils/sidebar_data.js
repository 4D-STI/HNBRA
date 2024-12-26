const organograma = 'ORGANOGRAMA.PDF'
const cartaServico = 'CARTA-SERVICO-25ABR202.PDF'
const ramais = 'LISTA_RAMAIS_HNBRA-03DEZ.PDF'
const tomadaDeContaTCE = 'CIRC-8-2022-TCE-057.ZIP'
const regimetoInterno = 'REGIMENTOINTERNO.pdf'
const lgpd = 'LGPD.pdf'
const autoridadeNacionalDeProtecaoDeDados = 'autoridadeNacionalDeProtecaoDeDados.pdf'
const cartaDaTerra = 'CARTADATERRA.pdf'
const pgrss = 'pgrss.pdf'
const investifacaoDePerfisFalsos = 'CARTILHA_DE_CONDUTAS_DA_VITIMA_PF.PDF'
const manuaisInfo = 'BACKUP_EMAILS_ZIMBRA.PDF'
const servicoOdontologico = 'MANUAL_DE_SAUDE_BUCAL_HNBRA_-_2024.PDF'
const padronizacaoDasDietas = 'PADRONIZACAO_DE_DIETAS_PREGAO_2024.PDF'
const sedime = 'MEDICAMENTO_SEDIME_052024.PDF'
const formularioDeSolicitacaoDeAntimicrobianos = 'FORMULARIO_DE_SOLICITACAO_DE_ANTIMICROBIANOS.PDF'
//ACOES_E_PROGRAMAS
//MODELOS(SEÇÃO) -> LISTA MODELOS (SUBÇÕES)
//ORDENS_INTERNAS
//REGULAMENTO
//LICITACOES_E_CONTRATOS
//CREDENCIAMENTO
//EXECUCAO_FINANCEIRA
//PORTARIAS
//GESTORIA_PATRIMONIAL
//TRANSPARENCIA_E_PRESTAÇÃO_DE_CONTAS(SESSÃO) -> LISTA SUB SEÇÃO DE DOCUMENTOS
//PUBLICACOES
//RELACAO_NOMINAL
//BOAS_PRATICAS
//EXEMPLO_DE_MAPEAMENTO_DE_PROCESSO
//PLANEJAMENTO_ESTRATEGICO
//PLANEJAMENTO_DE_GERENCIAMENTO_DE_RISCOS
//PLANEJAMENTO_DE_MELHORIA_DE_GESTAO
//SERVICO_DE_FARMACIA_HOSPITALAR
//COMISSAO_DE_OBITO
//NSP

const mainMenu = [
  { name: 'Dashboard', title: 'Menu Principal', href: '/dashboard' },
  { name: 'Organograma', title: 'Menu Principal', href: `/api/files/${organograma}/view` },
  { name: 'Diretores', title: 'Menu Principal', href: '#' },
  { name: 'Carta de Serviços ao Usuário', title: 'Menu Principal', href: `/api/files/${cartaServico}/view` },
  { name: 'Diretores', title: 'Menu Principal', href: '#' },
  { name: 'Heráldica', title: 'Menu Principal', href: '#' },
  { name: 'Alterar Senha do Zimbra', title: 'Menu Principal', href: '#' },
  { name: 'Relação Usuários Zimbra', title: 'Menu Principal', href: '#' },
  { name: 'Ações e Programas', title: 'Menu Principal', href: '/dashboard/subSessionFileList?item=ACOES_E_PROGRAMAS' },
  { name: 'Ramais HNBra', title: 'Menu Principal', href: `/api/files/${ramais}/view` },
]

const internalUse = [
  { name: 'Modelos', title: 'Uso Interno', href: '/dashboard/listSubSessionSession?item=11&teste=Modelos' }, //ITEM = ID
  { name: 'Tomada de Contas Especial (TCE)', title: 'Uso Interno', href: `/api/files/${tomadaDeContaTCE}/view` }, //ALTERAR, PENSAR DE QUE FORMA IRA FAZER? TALVEZ OUTRO ENDPOIN
  { name: 'Ordens Internas', title: 'Uso Interno', href: '/dashboard/listSubSessionSession?item=10&teste=ORDEM%20INTERENAS' },
  { name: 'Regimento Interno', title: 'Uso Interno', href: `/api/files/${regimetoInterno}/view` },
  { name: 'Regulamento', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=REGULAMENTO' },
  { name: 'Licitações e Contratos', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=LICITACOES_E_CONTRATOS' },
  { name: 'Credenciamento', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=CREDENCIAMENTO' },
  { name: 'Execução Financeira', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=EXECUCAO_FINANCEIRA' },
  { name: 'Portarias', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=PORTARIAS' },
  { name: 'Gestoria Patrimonial', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=GESTORIA_PATRIMONIAL' },
  { name: 'Plano de Aplicação de Recursos (PAR)', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=PLANO_DE_APLICACAO_DE_RECURSOS' },
  { name: 'Transparência e Prestação de Contas', title: 'Uso Interno', href: '/dashboard/listSubSessionSession?item=12&teste=TRANSPARENCIA_E_PRESTAÇÃO_DE_CONTAS' }, //ITEM = ID
  { name: 'Publicações', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=PUBLICACOES' },
  { name: 'Relação Nominal', title: 'Uso Interno', href: '/dashboard/subSessionFileList?item=RELACAO_NOMINAL' },
]

const neturnProgram = [
  { name: 'Boas Praticas', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?item=BOAS_PRATICAS' },
  { name: 'Exemplo de Mapeamento de Processo', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?item=EXEMPLO_DE_MAPEAMENTO_DE_PROCESSO' },
  { name: 'Planejamento Estratégico', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?item=PLANEJAMENTO_ESTRATEGICO' },
  { name: 'Plano de Gerenciamento de Riscos', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?item=PLANEJAMENTO_DE_GERENCIAMENTO_DE_RISCOS' },
  { name: 'Plano de Melhoria da Gestão', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?item=PLANEJAMENTO_DE_MELHORIA_DE_GESTAO' },
]

const internalControl = [
  { name: 'Plano de Integridade da MB', title: 'Controle Interno', href: '#' }, //REVISAR,
]

const LGPD = [
  { name: 'Lei Nº 13.709 de 2018', title: 'LGPD', href: `/api/files/${lgpd}/view` },
  { name: 'Autoridade Nacional de Proteção de Dados', title: 'LGPD', href: `/api/files/${autoridadeNacionalDeProtecaoDeDados}/view` },
]

const sustainability = [
  { name: 'Carta da Terra', title: 'Sustentabilidade', href: '#' }, //marinha.mill
  { name: 'Cartilha de Educação Ambiental da DPC', title: 'Sustentabilidade', href: '#' },//marinha.mill
  { name: 'Lei Nº 9605/1998 - dos Crimes Ambientais', title: 'Sustentabilidade', href: '#' },//marinha.mill
  { name: 'Livro Defesa e Meio Ambiente - MD', title: 'Sustentabilidade', href: '#' },//marinha.mill
  { name: 'PGRSS - Plano de Gerenciamento dos Resíduos de Serviços de Saúde', title: 'Sustentabilidade', href: `/api/files/${pgrss}/view` },
]

const itSection = [
  { name: 'Autoridade Certificadora', title: 'Sessão de Informática', href: '#' },
  { name: 'Investigação de Perfis Falsos', title: 'Sessão de Informática', href: `/api/files/${investifacaoDePerfisFalsos}/view` },
  { name: 'Manuais', title: 'Sessão de Informática', href: `/api/files/${manuaisInfo}/view` },
  { name: 'Portal MB', title: 'Sessão de Informática', href: '#' },
]

const healthSupportService = [
  { name: 'Serviço Social Hospitalar', title: 'Serviços de Apoio a Saúde', href: '#' },
  { name: 'Serviço de Fonoaudiologia', title: 'Serviços de Apoio a Saúde', href: '#' },
  { name: 'Serviço de Medicina Física e Reabilitação', title: 'Serviços de Apoio a Saúde', href: '#' },
  { name: 'Serviço de Nutrição e Dietética', title: 'Serviços de Apoio a Saúde', href: '#' },
  { name: 'Serviço de Psicologia', title: 'Serviços de Apoio a Saúde', href: '#' },
  { name: 'Serviço Odontológicos', title: 'Serviços de Apoio a Saúde', href: `/api/files/${servicoOdontologico}/view` },
  { name: 'Padronização das Dietas Enterais do HNBra 2024', title: 'Serviços de Apoio a Saúde', href: `/api/files/${padronizacaoDasDietas}/view` },
]

const pharmacyLaboratoryDivision = [
  { name: 'Serviço de Análises Clínicas', title: 'Divisão de Farmácia e Laboratório', href: '#' },
  { name: 'Serviço de Farmácia Hospitalar', title: 'Divisão de Farmácia e Laboratório', href: '/dashboard/subSessionFileList?item=SERVICO_DE_FARMACIA_HOSPITALAR' },
  {
    name: 'Setor de Dispersação de Medicamentos (SeDiMe)', title: 'Divisão de Farmácia e Laboratório', href: `/api/files/${sedime}/view`
  },
  { name: 'Programa de Medicamentos Especiais (PME)', title: 'Divisão de Farmácia e Laboratório', href: '#' }, //APAGAR

]

const CCIH = [
  { name: 'Formulário de Solicitação de Antimicrobianos', title: 'CCIH', href: `/api/files/${formularioDeSolicitacaoDeAntimicrobianos}/view` },
  { name: 'Protocolos', title: 'CCIH', href: '#' }, //VIZUALIZAR NOVAMENTE
  { name: 'Comissão de Óbito', title: 'CCIH', href: '/dashboard/subSessionFileList?item=COMISSAO_DE_OBITO' },
  { name: 'NSP', title: 'CCIH', href: '/dashboard/subSessionFileList?item=NSP' },
]

const menuTitles = [
  { name: 'Menu Principal', ref: mainMenu },
  { name: 'Uso Interno', ref: internalUse },
  { name: 'Programa Netuno', ref: neturnProgram },
  { name: 'Controle Interno', ref: internalControl },
  { name: 'LGPD', ref: LGPD },
  { name: 'Sustentabilidade', ref: sustainability },
  { name: 'Sessão de Informática', ref: itSection },
  { name: 'Serviços de Apoio a Saúde', ref: healthSupportService },
  { name: 'Divisão de Farmácia e Laboratório', ref: pharmacyLaboratoryDivision },
  { name: 'CCIH', ref: CCIH }
]


export {
  menuTitles,
  mainMenu,
  internalUse,
  neturnProgram,
  internalControl,
  LGPD,
  sustainability,
  itSection,
  healthSupportService,
  pharmacyLaboratoryDivision,
  CCIH
}
