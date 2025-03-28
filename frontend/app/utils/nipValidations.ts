// src/utils/nipValidation.ts

import { UserType } from "../contracts/types/UserType";

export const validateNip = (nip: string, userType: UserType): string[] => {
    const errors: string[] = [];

    // Remove any non-digit characters
    const cleanedNip = nip.replace(/\D/g, '');

    switch (userType) {
        case UserType.MILITARY:
            if (cleanedNip.length !== 8) {
                errors.push('NIP para militares deve conter exatamente 8 dígitos numéricos');
            }
            break;

        case UserType.CIVIL_SERVANT:
            if (cleanedNip.length !== 11) {
                errors.push('CPF para servidores civis ou terceirizados deve conter exatamente 11 dígitos numéricos');
            }
            break;
    }

    return errors;
};
