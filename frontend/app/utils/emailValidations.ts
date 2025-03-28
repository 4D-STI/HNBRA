export const validateEmail = (email: string): string[] => {
    const errors: string[] = [];

    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email is empty
    if (!email.trim()) {
        errors.push('Email é obrigatório');
        return errors;
    }

    // Check email format
    if (!emailRegex.test(email)) {
        errors.push('Formato de email inválido');
    }

    // Check specific domain restrictions (optional)
    const allowedDomains = ['mb.mil.br', 'marinha.mil.br', 'gmail.com', 'hotmail.com', 'outlook.com', 'terra.com.br', 'yahoo.com.br', 'uol.com.br'];
    const domain = email.split('@')[1];

    if (domain && !allowedDomains.includes(domain)) {
        errors.push(`Domínio de email não permitido. Domínios aceitos: ${allowedDomains.join(', ')}`);
    }

    return errors;
};
