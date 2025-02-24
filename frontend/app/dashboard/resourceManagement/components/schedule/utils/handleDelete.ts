export const handleDelete = async (nip: number, token: string) => {
    try {
        const response = await fetch(`http://localhost:3002/scheduling/${nip}`,
            {
                method: 'DELETE',
                cache: 'no-store',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
        if (response.ok) return true
    } catch (error) {
        console.error('Erro ao excluir: ', error);
        return false
    }
}
