export default function UserValidation(nip_: string): string[] {
    const errors: string[] = [];

    const nip = nip_.trim();

    if (nip.length !== 8) {
        errors.push("O NIP deve ter 8 caracteres.");
    }

    return errors;
}