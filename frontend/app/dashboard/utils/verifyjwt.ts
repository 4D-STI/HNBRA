import { decodeJWT } from "./decoderjwt";

export async function verifyJwt(setToken: (value: boolean) => void, idPermission: string) {
    const storedToken = localStorage.getItem("token") || ""; // Valor padrão vazio

    if (!storedToken) return;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/auth/verifyJwt`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ jwt: storedToken }),
        });

        if (!response.ok) {
            throw new Error("JWT Inválido ou Expirado!");
        }
        if (response.ok) {
            const result = await decodeJWT();
            console.log("DECODE: ", result);

            const resultpermission = result.permissionUsers;

            if (resultpermission.includes(parseInt(idPermission))) {
                await response.json();
                setToken(true);
            }
        }

    } catch (error) {
        setToken(false);
        localStorage.removeItem("token");
        alert("Login inválido!" + error);
        window.location.href = "/";
    }
}
