import { AxiosResponse } from "axios";

export class BaseService {
  handleResponse = (response: AxiosResponse) => {
    try {
      return [response.data, undefined, response.status || 200];
    } catch (error) {
      return [undefined, error];
    }
  };
  catchHandler = (err: any) => {
    return [
      err?.response?.data,
      err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Um erro inesperado ocorreu, tente novamente mais tarde.",
      err?.response?.status,
      err?.response?.data?.errors,
    ];
  };
}
