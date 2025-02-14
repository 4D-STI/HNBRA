const ORGANOGRAMA = 'ORGANOGRAMA.PDF'
const CARTA_SERVICO = 'CARTA-SERVICO-25ABR2024.PDF'
const RELACAO_USUARIO_ZIMBRA = 'RELACAO_ZIMBRA_ATUAL_DEZ_2024_0.PDF'
const ACOES_PROGRAMAS = 'ACOES-E-PROGRAMAS-SERVICO-SOCIAL-HOSPITALAR_SAS-H_AGO2024.PDF'
const RAMAIS = 'LISTA_RAMAIS_HNBRA-03DEZ_0.PDF'
// const tomadaDeContaTCE = 'CIRC-8-2022-TCE-057.ZIP'
const REGIMENTO_INTERNO = 'REGIMENTOINTERNO.PDF'
const LGPD_PDF = 'LGPD.PDF'
const autoridadeNacionalDeProtecaoDeDados = 'AUTORIDADE_NACIONAL_DE_PROTECAO_DE_DADOS.PDF'
// const cartaDaTerra = 'CARTADATERRA.pdf'
const PGRSS_PDF = 'PGRSS.PDF'
const INVESTIGACAO_DE_PERFIS_FALSOS = 'CARTILHA_DE_CONDUTAS_DA_VITIMA_PF.PDF'
// const MANUAIS_INFO = 'BACKUP_EMAILS_ZIMBRA.PDF'
const SERVICO_ODONTOLOGICO = 'MANUAL_DE_SAUDE_BUCAL_HNBRA_-_2024.PDF'
const PADRONIZACAO_DIETAS = 'PADRONIZACAO_DE_DIETAS_PREGAO_2024.PDF'
// const sedime = 'MEDICAMENTOS_SEDIME_052024.PDF'
const FORMULARIO_SOLICITACAO_ANTIMICROBIANOS = 'FORMULARIO_DE_SOLICITACAO_DE_ANTIMICROBIANOS.PDF'
//ACOES_E_PROGRAMAS
//MODELOS(SEÇÃO) -> LISTA MODELOS (SUBÇÕES)
//ORDENS_INTERNAS
//REGULAMENTO
//LICITACOES_E_CONTRATOS
//CREDENCIAMENTO
//EXECUCAO_FINANCEIRA
//PORTARIAS
//GESTORIA_PATRIMONIAL
//TRANSPARENCIA_E_PRESTAÇÃO_DE_CONTAS(Seção) -> LISTA SUB SEÇÃO DE DOCUMENTOS
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
  { name: 'Organograma', title: 'Menu Principal', href: `https://www.hnbra.mb:3002/files/${ORGANOGRAMA}/view` },
  { name: 'Diretores', title: 'Menu Principal', href: '/dashboard/diretores' },
  { name: 'Carta de Serviços ao Usuário', title: 'Menu Principal', href: `https://www.hnbra.mb:3002/files/${CARTA_SERVICO}/view` },
  { name: 'Heráldica', title: 'Menu Principal', href: '/dashboard/heraldica' },
  { name: 'Alterar Senha do Zimbra', title: 'Menu Principal', href: 'https://kc.score.ctim.mb/realms/score2-dev/protocol/openid-connect/auth?client_id=score2-frontend&amp;redirect_uri=https%3A%2F%2Fapp.score.ctim.mb%2F&amp;state=32a5be6b-a3e5-45c9-ac4a-db91ad3f86e0&amp;response_mode=fragment&amp;response_type=code&amp;scope=openid&amp;nonce=00abb' },
  { name: 'Relação Usuários Zimbra', title: 'Menu Principal', href: `https://www.hnbra.mb:3002/files/${RELACAO_USUARIO_ZIMBRA}/view` },
  { name: 'Ações e Programas', title: 'Menu Principal', href: `https://www.hnbra.mb:3002/files/${ACOES_PROGRAMAS}/view` },
  { name: 'Ramais HNBra', title: 'Menu Principal', href: `https://www.hnbra.mb:3002/files/${RAMAIS}/view` },
]

const internalUse = [
  { name: 'Modelos', title: 'Uso Interno', href: '/dashboard/listSubSessionSession?item=11&subsession_name=Modelos' }, //ITEM = ID
  { name: 'Tomada de Contas Especial (TCE)', title: 'Uso Interno', href: `/dashboard/subSessionFileList?SubSessionFileList_name=Tomada%20de%20Contas%20Especial%20(TCE)` }, //ALTERAR, PENSAR DE QUE FORMA IRA FAZER? TALVEZ OUTRO ENDPOIN
  { name: 'Ordens Internas', title: 'Uso Interno', href: '/dashboard/listSubSessionSession?item=10&subsession_name=ORDENS%20INTERNAS' },
  { name: 'Regimento Interno', title: 'Uso Interno', href: `https://www.hnbra.mb:3002/files/${REGIMENTO_INTERNO}/view` },
  { name: 'Regulamento', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=REGULAMENTO HNBRA' },
  { name: 'Licitações e Contratos', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=LICITACOES_E_CONTRATOS' },
  { name: 'Credenciamento', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_id=105' },
  { name: 'Execução Financeira', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=EXECUCAO_FINANCEIRA' },
  { name: 'Portarias', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=PORTARIAS' },
  { name: 'Gestoria Patrimonial', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=GESTORIA_PATRIMONIAL' },
  { name: 'Plano de Aplicação de Recursos (PAR)', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=PLANO_DE_APLICACAO_DE_RECURSOS' },
  { name: 'Transparência e Prestação de Contas', title: 'Uso Interno', href: '/dashboard/listSubSessionSession?item=12&subsession_name=TRANSPARENCIA_E_PRESTAÇÃO_DE_CONTAS' }, //ITEM = ID
  { name: 'Publicações', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=PUBLICACOES' },
  { name: 'Relação Nominal', title: 'Uso Interno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=RELACAO_NOMINAL' },
]

const netunoProgram = [
  { name: 'Boas Praticas', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=BOAS_PRATICAS' },
  { name: 'Exemplo de Mapeamento de Processo', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=EXEMPLO_DE_MAPEAMENTO_DE_PROCESSO' },
  { name: 'Planejamento Estratégico', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=PLANEJAMENTO_ESTRATEGICO' },
  { name: 'Plano de Gerenciamento de Riscos', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=PLANEJAMENTO_DE_GERENCIAMENTO_DE_RISCOS' },
  { name: 'Plano de Melhoria da Gestão', title: 'Programa Netuno', href: '/dashboard/subSessionFileList?SubSessionFileList_name=PLANEJAMENTO_DE_MELHORIA_DE_GESTAO' },
]

const internalControl = [
  { name: 'Plano de Integridade da MB', title: 'Controle Interno', href: '/dashboard/planoIntegridadeMB' },
]

const lgpd = [
  { name: 'Lei Nº 13.709 de 2018', title: 'LGPD', href: `https://www.hnbra.mb:3002/files/${LGPD_PDF}/view` },
  { name: 'Autoridade Nacional de Proteção de Dados', title: 'LGPD', href: `https://www.hnbra.mb:3002/files/${autoridadeNacionalDeProtecaoDeDados}/view` },
]

const sustainability = [
  { name: 'Carta da Terra', title: 'Sustentabilidade', href: 'https://www.marinha.mil.br/hnbra/node/91' }, //marinha.mill
  { name: 'Cartilha de Educação Ambiental da DPC', title: 'Sustentabilidade', href: 'https://www.marinha.mil.br/hnbra/node/87' },//marinha.mill
  { name: 'Lei Nº 9605/1998 - dos Crimes Ambientais', title: 'Sustentabilidade', href: 'https://www.marinha.mil.br/hnbra/node/88' },//marinha.mill
  { name: 'Livro Defesa e Meio Ambiente - MD', title: 'Sustentabilidade', href: 'https://www.marinha.mil.br/hnbra/node/86' },//marinha.mill
  { name: 'PGRSS - Plano de Gerenciamento dos Resíduos de Serviços de Saúde', title: 'Sustentabilidade', href: `https://www.hnbra.mb:3002/files/${PGRSS_PDF}/view` },
]

const itSection = [
  { name: 'Autoridade Certificadora', title: 'Seção de Informática', href: 'http://download.ca/' },
  { name: 'Investigação de Perfis Falsos', title: 'Seção de Informática', href: `https://www.hnbra.mb:3002/files/${INVESTIGACAO_DE_PERFIS_FALSOS}/view` },
  { name: 'Manuais', title: 'Seção de Informática', href: '/dashboard/listSubSessionSession?item=2&subsession_name=MANUAIS%20INFORMÁTICA' },
  { name: 'Portal MB', title: 'Seção de Informática', href: 'https://internet.ctim.mb/score/login.php' },
]

const healthSupportService = [
  { name: 'Serviço Social Hospitalar', title: 'Serviços de Apoio a Saúde', href: '/dashboard/ServicoSocialHospitalar' },
  { name: 'Serviço de Fonoaudiologia', title: 'Serviços de Apoio a Saúde', href: '/dashboard/ServicoDeFonoaudiologo' },
  { name: 'Serviço de Medicina Física e Reabilitação', title: 'Serviços de Apoio a Saúde', href: '/dashboard/ServicodeMedicinaFisicaReabilitacao' },
  { name: 'Serviço de Nutrição e Dietética', title: 'Serviços de Apoio a Saúde', href: '/dashboard/ServicoNutricaoDietetica' },
  { name: 'Serviço de Psicologia', title: 'Serviços de Apoio a Saúde', href: '/dashboard/ServicoPsicologia' },
  { name: 'Serviço Odontológicos', title: 'Serviços de Apoio a Saúde', href: `https://www.hnbra.mb:3002/files/${SERVICO_ODONTOLOGICO}/view` },
  { name: 'Padronização das Dietas Enterais do HNBra 2024', title: 'Serviços de Apoio a Saúde', href: `https://www.hnbra.mb:3002/files/${PADRONIZACAO_DIETAS}/view` },
]

const pharmacyLaboratoryDivision = [
  { name: 'Serviço de Análises Clínicas', title: 'Divisão de Farmácia e Laboratório', href: '/dashboard/ServicoAnalisesClinicas' },
  { name: 'Serviço de Farmácia Hospitalar', title: 'Divisão de Farmácia e Laboratório', href: '/dashboard/subSessionFileList?SubSessionFileList_name=SERVICO_DE_FARMACIA_HOSPITALAR' },
  {
    name: 'Setor de Dispensação de Medicamentos (SeDiMe)', title: 'Divisão de Farmácia e Laboratório', href: `/dashboard/subSessionFileList?SubSessionFileList_id=167`
  },
]

const CCIH = [
  { name: 'Formulário de Solicitação de Antimicrobianos', title: 'CCIH', href: `https://www.hnbra.mb:3002/files/${FORMULARIO_SOLICITACAO_ANTIMICROBIANOS}/view` },
  { name: 'Protocolos', title: 'CCIH', href: `/dashboard/subSessionFileList?SubSessionFileList_id=163` },
  { name: 'Comissão de Óbito', title: 'CCIH', href: '/dashboard/subSessionFileList?SubSessionFileList_name=COMISSAO_DE_OBITO' },
  { name: 'NSP', title: 'CCIH', href: '/dashboard/subSessionFileList?SubSessionFileList_name=NSP' },
]

const menuTitles = [
  { name: 'Menu Principal', ref: mainMenu },
  { name: 'Uso Interno', ref: internalUse },
  { name: 'Programa Netuno', ref: netunoProgram },
  { name: 'Controle Interno', ref: internalControl },
  { name: 'LGPD', ref: lgpd },
  { name: 'Sustentabilidade', ref: sustainability },
  { name: 'Seção de Informática', ref: itSection },
  { name: 'Serviços de Apoio a Saúde', ref: healthSupportService },
  { name: 'Divisão de Farmácia e Laboratório', ref: pharmacyLaboratoryDivision },
  { name: 'CCIH', ref: CCIH }
]


export {
  menuTitles,
  mainMenu,
  internalUse,
  netunoProgram,
  internalControl,
  lgpd,
  sustainability,
  itSection,
  healthSupportService,
  pharmacyLaboratoryDivision,
  CCIH
}
