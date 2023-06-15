export interface ICRUDModelFinder<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export type ICRUDModel<T> = ICRUDModelFinder<T>;
