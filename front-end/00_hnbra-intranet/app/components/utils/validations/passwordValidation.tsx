export default function passwordValidation(pass: string): string[] {
  const errors: string[] = [];

  if (!/(?=.*[A-Z])/.test(pass)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula");
    return errors; 
  }


  if (!/(?=.*\d)/.test(pass)) {
    errors.push("A senha deve conter pelo menos um número");
    return errors; 
  }

  if (!/(?=.*[!@#$%^&()_+{}\[\]:;<>,.?\/\\-])/.test(pass)) {
    errors.push("A senha deve conter pelo menos um caractere especial");
    return errors; 
  }

  if (/(.)\1{2}/.test(pass)) {
    errors.push("A senha não pode conter o mesmo caractere três vezes consecutivas.");
    return errors; 
  }

  if (pass.length < 6 || pass.length > 8) {
    errors.push("A senha deve conter entre 6 e 8 caracteres");
    return errors; 
  }

  return errors;
}

  





