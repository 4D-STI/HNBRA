import { UserType } from "../types/UserType";

export interface IUserRegistrationData {
    firstName: string;
    lastName: string;
    warName: string;
    nip: string;
    userType: UserType;
    emailMb: string;
    contactNumber: string;
    patent: number | null;
    password: string;
}
