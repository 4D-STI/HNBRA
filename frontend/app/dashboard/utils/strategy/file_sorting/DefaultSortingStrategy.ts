import { File } from '@/app/types/file'
import { ISortingStrategy } from './ISortingStrategy'

// Ordenação padrão
// 1º - Nomes menores
// 2º - ordem alfabética
export class DefaultSortingStrategy implements ISortingStrategy {
  sort(files: File[]): File[] {

    return files.sort((a, b) => {
      // tamanho do nome do arquivo
      if (a.nameFile.length > b.nameFile.length) return 1
      if (a.nameFile.length < b.nameFile.length) return -1
      // ordem de letrinhas
      return a.nameFile.localeCompare(b.nameFile, undefined, { sensitivity: 'base' });
    });
  }
}
