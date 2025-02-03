const loginNip = async (nip: string, password: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nip, password }),
        });
        console.log(JSON.stringify({ nip, password }))
        if (!response.ok) {
            throw new Error('Erro ao fazer login. Verifique suas credenciais.');
        }

        const data = await response.json();
        // console.log('dsaljçdalsçkndaslkndalkn', data.access_token)
        const token = data.access_token;

        // Armazenar o token no Local Storage (ou Session Storage)
        localStorage.setItem('token', token);

        return token;
    } catch (error) {
        alert(`${error}`);
        throw error; // Propaga o erro para tratamento adicional
    }
};

export default loginNip;
