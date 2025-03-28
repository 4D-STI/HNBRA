export async function decodeJWT() {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
        return null;
    }
    const tokenParts = storedToken.split('.');
    if (tokenParts.length !== 3) {
        console.error('Token inválido. Deve ter 3 partes.');
        return null;
    }

    try {
        // Pega a segunda parte (payload) e decodifica
        const payloadBase64 = tokenParts[1];
        const payloadDecoded = atob(payloadBase64);
        return JSON.parse(payloadDecoded);
    } catch (error) {
        console.error("Erro ao decodificar JWT:", error);
        return null;
    }
}
