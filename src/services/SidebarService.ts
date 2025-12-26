import axios from "axios";
import api from "./Api";
import { BaseService } from "./BaseService";

const URL = "api/example";

export class SidebarService extends BaseService {
  async list(): Promise<any[]> {
        try {
            return this.handleResponse(await axios.get(`/mock/menuSidebar.json`));
        } catch (e: any) {
            return this.catchHandler(e);
        }
    }
}
