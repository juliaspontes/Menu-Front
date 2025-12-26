import api from "../Api";
import { BaseService } from "../BaseService";

const URL = "api/Paper";

export class PaperService extends BaseService {
  async list(params: any): Promise<any[]> {
    try {
      return this.handleResponse(await api.post(`${URL}/list`, params));
    } catch (e: any) {
      return this.catchHandler(e);
    }
  }

  async save(payload: any): Promise<any> {
    try {
      return this.handleResponse(await api.put(`${URL}/save`, payload));
    } catch (e: any) {
      return this.catchHandler(e);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      return this.handleResponse(
        await api.delete(`${URL}/delete`, { data: { id } })
      );
    } catch (e: any) {
      return this.catchHandler(e);
    }
  }
}
