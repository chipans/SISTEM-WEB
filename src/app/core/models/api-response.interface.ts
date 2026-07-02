export interface ApiResponseInterface<T> {
  isSuccess: boolean;
  data: T | null;
  errors?: string[];
}
