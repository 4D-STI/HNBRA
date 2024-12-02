export interface IUser {
    nip: string;
    patent: string;
    warName: string;
    contactNumber: string;
    departament: string;
    emailMb: string;
    emailPersonal: string;
    firstName: string;
    lastName: string;
    role: string;
    division: boolean;
    section: boolean;
    status: boolean;
    permission: string[];
};

const users: IUser[] = [
    {
        firstName: "Manoel",
        lastName: " Barbosa de Sena Neto",
        nip: "098675654",
        departament: "Administração",
        section: true,
        status: true,
        permission: ["read", "delete", "download"],
        contactNumber: "6199887766",
        division: false,
        emailMb: "email@mb.mil.br",
        emailPersonal: "email@email.com",
        patent: "civil",
        role: "admin",
        warName: "devManoel"

    },
    {
        firstName: "Manoel",
        lastName: " Barbosa de Sena Neto",
        nip: "098675654",
        departament: "Administração",
        section: true,
        status: true,
        permission: ["read", "delete", "download"],
        contactNumber: "6199887766",
        division: false,
        emailMb: "email@mb.mil.br",
        emailPersonal: "email@email.com",
        patent: "civil",
        role: "admin",
        warName: "devManoel"

    },
    {
        firstName: "Manoel",
        lastName: " Barbosa de Sena Neto",
        nip: "098675654",
        departament: "Administração",
        section: true,
        status: true,
        permission: ["read", "delete", "download"],
        contactNumber: "6199887766",
        division: false,
        emailMb: "email@mb.mil.br",
        emailPersonal: "email@email.com",
        patent: "civil",
        role: "admin",
        warName: "devManoel"

    },
    {
        firstName: "Manoel",
        lastName: " Barbosa de Sena Neto",
        nip: "098675654",
        departament: "Administração",
        section: true,
        status: true,
        permission: ["read", "delete", "download"],
        contactNumber: "6199887766",
        division: false,
        emailMb: "email@mb.mil.br",
        emailPersonal: "email@email.com",
        patent: "civil",
        role: "admin",
        warName: "devManoel"

    },
];

export default users;
