export const handleDelete = async (nip: number, token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/scheduling/${nip}`,
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
