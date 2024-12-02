export interface IUser {
    nome: string;
    nip: string;
    departamento: string;
    secao: string;
    status: string;
    permissoes: string[];
};

const users: IUser[] = [
    {
        nome: "Manoel Barbosa de Sena Neto",
        nip: "098675654",
        departamento: "Administração",
        secao: "Seção de Informática",
        status: "Ativo",
        permissoes: ["read", "delete", "download"],
    },
    {
        nome: "Maria da Silva",
        nip: "123456789",
        departamento: "Saúde",
        secao: "Serviço de medicina operativa",
        status: "Ativo",
        permissoes: ["read", "add"],
    },
    {
        nome: "João Oliveira",
        nip: "987654321",
        departamento: "Diretoria",
        secao: "Conselho Técnico",
        status: "Inativo",
        permissoes: ["read", "delete"],
    },
    {
        nome: "Ana Clara",
        nip: "456123789",
        departamento: "Administração",
        secao: "Seção de esportes",
        status: "Ativo",
        permissoes: ["read", "add", "download", "delete"],
    },
];

export default users;
