export interface ICRUDModelReader<T> {
  findById(id: number): Promise<T | null>;
}

export type ICRUDModel<T> = ICRUDModelReader<T>;
