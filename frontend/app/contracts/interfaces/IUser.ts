export interface IUser {
    nip: string,
    email: string,
    firstName: string,
    lastName: string,
    patent: number,
    warName: string,
    permission: string,
    permissionUsers: number[],
    iat: number,
    exp: number
}
