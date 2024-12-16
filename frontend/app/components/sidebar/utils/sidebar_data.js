  const mainMenu = [
    {name: 'Dashboard',title: 'Menu Principal',href: '/dashboard'},
    {name: 'Organograma', title: 'Menu Principal', href: '/pdf/organograma.pdf'},
    {name: 'Diretores', title: 'Menu Principal', href: '#'},
    {name: 'Carta de Serviços ao Usuário', title: 'Menu Principal', href: '#'},
    {name: 'Diretores', title: 'Menu Principal', href: '#'},
    {name: 'Heráldica', title: 'Menu Principal', href: '#'},
    {name: 'Alterar Senha do Zimbra', title: 'Menu Principal', href: '#'},
    {name: 'Relação Usuários Zimbra', title: 'Menu Principal', href: '#'},
    {name: 'Ações e Programas', title: 'Menu Principal', href: '#'},
    {name: 'Ramais HNBra', title: 'Menu Principal', href: '#'},
  ]
  
  const internalUse = [
    {name: 'Modelos', title: 'Uso Interno', href: '#'},
    {name: 'Tomada de Contas Especial (TCE)', title: 'Uso Interno', href: '#'},
    {name: 'Ordens Internas', title: 'Uso Interno', href: '#'},
    {name: 'Regimento Interno', title: 'Uso Interno', href: '#'},
    {name: 'Regulamento', title: 'Uso Interno', href: '#'},
    {name: 'Licitações e Contratos', title: 'Uso Interno', href: '#'},
    {name: 'Credenciamento', title: 'Uso Interno', href: '#'},
    {name: 'Execução Financeira', title: 'Uso Interno', href: '#'},
    {name: 'Portarias', title: 'Uso Interno', href: '#'},
    {name: 'Gestoria Patrimonial', title: 'Uso Interno', href: '#'},
    {name: 'Plano de Aplicação de Recursos (PAR)', title: 'Uso Interno', href: '#'},
    {name: 'Transparência e Prestação de Contas', title: 'Uso Interno', href: '#'},
    {name: 'Publicações', title: 'Uso Interno', href: '#'},
    {name: 'Relação Nominal', title: 'Uso Interno', href: '#'},
  ]

  const neturnProgram = [
    {name: 'Boas Praticas', title: 'Programa Netuno', href: '#'},
    {name: 'Exemplo de Mapeamento de Processo', title: 'Programa Netuno', href: '#'},
    {name: 'Planejamento Estratégico', title: 'Programa Netuno', href: '#'},
    {name: 'Plano de Gerenciamento de Riscos', title: 'Programa Netuno', href: '#'},
    {name: 'Plano de Melhoria da Gestão', title: 'Programa Netuno', href: '#'},
  ]

  const internalControl = [
    {name: 'Plano de Integridade da MB', title: 'Controle Interno', href: '#'},
  ]

  const LGPD = [
    {name: 'Lei Nº 13.709 de 2018', title: 'LGPD', href: '#'},
    {name: 'Autoridade Nacional de Proteção de Dados', title: 'LGPD', href: '#'},
  ]

  const sustainability = [
    {name: 'Carta da Terra', title: 'Sustentabilidade', href: '#'},
    {name: 'Cartilha de Educação Ambiental da DPC', title: 'Sustentabilidade', href: '#'},
    {name: 'Lei Nº 9605/1998 - dos Crimes Ambientais', title: 'Sustentabilidade', href: '#'},
    {name: 'Livro Defesa e Meio Ambiente - MD', title: 'Sustentabilidade', href: '#'},
    {name: 'PGRSS - Plano de Gerenciamento dos Resíduos de Serviços de Saúde', title: 'Sustentabilidade', href: '#'},
  ]

  const itSection = [
    {name: 'Autoridade Certificadora', title: 'Sessão de Informática', href: '#'},
    {name: 'Investigação de Perfis Falsos', title: 'Sessão de Informática', href: '#'},
    {name: 'Manuais', title: 'Sessão de Informática', href: '#'},
    {name: 'Portal MB', title: 'Sessão de Informática', href: '#'},
  ]

  const healthSupportService = [
    {name: 'Serviço Social Hospitalar', title: 'Serviços de Apoio a Saúde', href: '#'},
    {name: 'Serviço de Fonoaudiologia', title: 'Serviços de Apoio a Saúde', href: '#'},
    {name: 'Serviço de Medicina Física e Reabilitação', title: 'Serviços de Apoio a Saúde', href: '#'},
    {name: 'Serviço de Nutrição e Dietética', title: 'Serviços de Apoio a Saúde', href: '#'},
    {name: 'Serviço de Psicologia', title: 'Serviços de Apoio a Saúde', href: '#'},
    {name: 'Serviço Odontológicos', title: 'Serviços de Apoio a Saúde', href: '#'},
    {name: 'Padronização das Dietas Enterais do HNBra 2024', title: 'Serviços de Apoio a Saúde', href: '#'},
  ]

  const pharmacyLaboratoryDivision = [
    {name: 'Serviço de Análises Clínicas', title: 'Divisão de Farmácia e Laboratório', href: '#'},
    {name: 'Serviço de Farmácia Hospitalar', title: 'Divisão de Farmácia e Laboratório', href: '#'},
    {name: 'Setor de Dispersação de Medicamentos (SeDiMe)', title: 'Divisão de Farmácia e Laboratório', href: '#'},
    {name: 'Programa de Medicamentos Especiais (PME)', title: 'Divisão de Farmácia e Laboratório', href: '#'},
  ]

  const CCIH = [
    {name: 'Formulário de Solicitação de Antimicrobianos', title: 'CCIH', href: '#'},
    {name: 'Protocolos', title: 'CCIH', href: '#'},
    {name: 'Comissão de Óbito', title: 'CCIH', href: '#'},
    {name: 'NSP', title: 'CCIH', href: '#'},
  ]

  const menuTitles = [
    { name: 'Menu Principal', ref: mainMenu},
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
