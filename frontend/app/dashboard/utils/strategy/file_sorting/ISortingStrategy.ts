import { File } from '@/app/types/file'

export interface ISortingStrategy {
  sort(files: File[]): File[]
}
