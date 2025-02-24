export default function NipValidation(nip_: string): string[] {
    const errors: string[] = [];

    const nip = nip_.trim();

    if (nip.length < 8 || nip.length > 11) {
        errors.push("O nip deve ter 8 caracteres.");
        return errors;
    }
    if (nip.length > 8) {
        errors.push("");
        return errors;
    }

    return errors;

}