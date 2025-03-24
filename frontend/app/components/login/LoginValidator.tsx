interface ILoginData {
    nip: string,
    password: string,
}

const loginNip = async (loginData: ILoginData) => {
    const nip = loginData.nip
    const password = loginData.password
    try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nip, password }),
        });
        
        if (!response.ok) {
            // return 'Senha ou nip invalido'
            // throw new Error('Erro ao fazer login. Verifique suas credenciais.');
            throw new Error('Login inválido!');
        }

        const data = await response.json();
        // console.log('TOKEN DE ACESSO ->', data.access_token)
        const token = data.access_token;

        // Armazenar o token no Local Storage (ou Session Storage)
        localStorage?.setItem('token', token);

        return token;
    } catch (error) {
        alert(`${error}`);
        throw error; // Propaga o erro para tratamento adicional
    }
};

export default loginNip;
