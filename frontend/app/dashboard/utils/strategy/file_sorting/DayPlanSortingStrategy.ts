import { File } from '@/app/types/file'
import { ISortingStrategy } from './ISortingStrategy'

// Ordenação na página do pano do dia
// Ordenação pelo ID do arquivo
// FIFO = maior ID é o primeiro da lista
export class DayPlanSortingStrategy implements ISortingStrategy {
  sort(files: File[]): File[] { return files.sort((a, b) => b.idFile - a.idFile) }
}
