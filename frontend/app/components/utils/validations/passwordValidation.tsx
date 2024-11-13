export default function passwordValidation(pass: string): string[] {
  const errors: string[] = [];

  if (!/(?=.*[A-Z])/.test(pass)) {
    errors.push("Senha inválida");
    return errors; 
  }

  if (!/(?=.*\d)/.test(pass)) {
    errors.push("Senha inválida");
    return errors; 
  }

  if (!/(?=.*[!@#$%^&()_+{}\[\]:;<>,.?\/\\-])/.test(pass)) {
    errors.push("Senha inválida");
    return errors; 
  }

  if (/(.)\1{2}/.test(pass)) {
    errors.push("Senha inválida");
    return errors; 
  }

  if (pass.length < 6 || pass.length > 8) {
    errors.push("Senha inválida");
    return errors; 
  }

  return errors;
}
