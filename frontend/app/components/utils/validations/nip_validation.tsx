export default function NipValidation(nip_: string): string[] {
    const errors: string[] = [];

    const nip = nip_.trim();
    
    if (nip.length === 0) {
        errors.splice(0, errors.length)
    }
    
    if (nip.length !== 8) {
        errors.push("Nip inválido.");
    }


    return errors;
}
