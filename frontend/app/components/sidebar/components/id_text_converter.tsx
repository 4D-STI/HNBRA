export default function idTextConverter(texto: string): string {
    // Remove todos os acentos e caracteres especiais (opcional)
    const textoSemAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    // Substitui todos os espaços por hífens e converte para minúsculo
    return textoSemAcento.toLowerCase().replace(/\s+/g, '-');
}
