export default function passwordValidation(pass: string): string[] {
    const errors: string[] = [];
  
    if (!/(?=.*[A-Z])/.test(pass)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula");
    }
    if (!/(?=.*\d)/.test(pass)) {
      errors.push("A senha deve conter pelo menos um numero");
    }
    if (!/(?=.*[!@#$%^&()_+{}\[\]:;<>,.?\/\\-])/.test(pass)) {
      errors.push("A senha deve conter pelo menos um caracter especial");
    }
    if (/(.)\1{2}/.test(pass)) {
      errors.push("A senha não pode conter o mesmo caractere três vezes consecutivas.");
    }
    if (pass.length < 6 || pass.length > 8) {
      errors.push("A senha deve conter entre 6 e 8 caractere");
    }
  
    return errors;
  }
  





