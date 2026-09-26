export interface IDatabaseDriver {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  getOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  run(sql: string, params?: any[]): Promise<{ lastID?: number; changes: number }>;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
