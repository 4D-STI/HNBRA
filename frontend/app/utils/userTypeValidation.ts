import { UserType } from '@/app/contracts/types/UserType'

export const userTypeValidation = (userType: UserType) => {
    if (userType === UserType.MILITARY) return {
        placeholder: "Insira o NIP (8 dígitos)",
        length: 8
    }

    if (userType === UserType.CIVIL_SERVANT) return {
        placeholder: "Insira o CPF (11 dígitos)",
        length: 11
    }
}
