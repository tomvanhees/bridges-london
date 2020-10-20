import http from "@/http";
import { AxiosPromise } from "axios";

export class APIConnection {
  static getNews(): AxiosPromise {
    return http.get("/news");
  }

  static getConnections(): AxiosPromise {
    return http.get("/connections");
  }

  static findConnection(id: number): AxiosPromise {
    return http.get(`/connections/${id}`);
  }

  static getStates(): AxiosPromise {
    return http.get("/states");
  }

  static getSettings(): AxiosPromise {
    return http.get("/settings");
  }
}
