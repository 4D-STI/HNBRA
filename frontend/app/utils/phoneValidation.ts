// src/utils/phoneValidation.ts
export const validatePhoneNumber = (phoneNumber: string): string[] => {
    const errors: string[] = [];

    // Remove all non-digit characters
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Validate total length (DDD + 8 digits)
    if (cleanedNumber.length !== 10) {
        errors.push('Número de telefone deve conter 10 dígitos (DDD + 8 dígitos)');
    }

    // Validate DDD range (typical Brazilian DDDs)
    const ddd = cleanedNumber.slice(0, 2);
    const validDDDs = [
        '11', '12', '13', '14', '15', '16', '17', '18', '19', // São Paulo
        '21', '22', '24', '27', '28', // Rio de Janeiro
        '31', '32', '33', '34', '35', '37', '38', // Minas Gerais
        '41', '42', '43', '44', '45', '46', // Paraná
        '51', '53', '54', '55', // Rio Grande do Sul
        '61', '62', '63', '64', '65', '66', '67', '68', '69', // Centro-Oeste
        '71', '73', '74', '75', '77', '79', // Bahia
        '81', '82', '83', '84', '85', '86', '87', '88', '89', // Nordeste
        '91', '92', '93', '94', '95', '96', '97', '98', '99' // Norte
    ];

    if (!validDDDs.includes(ddd)) {
        errors.push('DDD inválido');
    }

    return errors;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-digit characters
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Format: (DDD) XXXX-XXXX
    if (cleanedNumber.length === 10) {
        return `(${cleanedNumber.slice(0, 2)}) ${cleanedNumber.slice(2, 6)}-${cleanedNumber.slice(6)}`;
    }

    return phoneNumber;
};

export const getCleanPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-digit characters for submission
    return phoneNumber.replace(/\D/g, '');
};
