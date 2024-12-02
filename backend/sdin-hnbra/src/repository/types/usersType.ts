export type UserType = {
    nip: string,
    idPatent: number,
    warName?: string,
    firstName: string,
    lastName: string,
    role: string,
    status: string,
    permission: string,
    password: string,
    emailPersonal?: string,
    emailMb?: string,
    contactNumber?: string,
    createdAt: Date,
    updatedAt: Date
}
