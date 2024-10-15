export default function UserValidation(nip_: string): string[] {
    const errors: string[] = [];

    const nip = nip_.trim();

    if (nip.length !== 8) {
        errors.push("Nip inválido.");
    }

    return errors;
}