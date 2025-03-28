// src/utils/passwordValidation.ts
export const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('A senha deve ter no mínimo 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('A senha deve conter pelo menos uma letra maiúscula');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('A senha deve conter pelo menos uma letra minúscula');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('A senha deve conter pelo menos um número');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('A senha deve conter pelo menos um caractere especial');
    }

    return errors;
};
