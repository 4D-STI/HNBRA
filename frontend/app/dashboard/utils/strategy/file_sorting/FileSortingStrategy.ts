import { File } from '@/app/types/file'
import { ISortingStrategy } from './ISortingStrategy'
import { DayPlanSortingStrategy } from './DayPlanSortingStrategy'
import { DefaultSortingStrategy } from './DefaultSortingStrategy'

// Contexto da estratégia de ordenação
export class FileSortingStrategy {
  private sortType: ISortingStrategy
  private subSessionID: number | null

  constructor(data: File[]) {
    this.subSessionID = data && data.length > 0 ? data[0].idSubSession : null
    this.sortType = this.selectStrategy()
  }

  public setStrategy(sortType: ISortingStrategy) {
    this.sortType = sortType
  }

  public sortFiles(files: File[]): File[] {
    return this.sortType.sort(files)
  }

  private selectStrategy(): ISortingStrategy {
    switch (this.subSessionID) {
      case 6:
        return new DayPlanSortingStrategy()
      default:
        return new DefaultSortingStrategy()
    }
  }
}
