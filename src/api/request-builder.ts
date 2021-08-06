import { AxiosRequestConfig } from "axios";
import request from "@/utils/request";
import { UserModule } from "@/store/modules/user";
import qs from "qs";

export class RequestBuilder<T> {
  private _url = "";
  private _config: AxiosRequestConfig = {};
  private _data: any = null;

  // public static build<T>(): RequestBuilder<T> {
  //   return new RequestBuilder<T>()
  // }

  public url(url: string): RequestBuilder<T> {
    this._url = url;
    return this;
  }

  public data(data: any): RequestBuilder<T> {
    this._data = data;
    return this;
  }

  public config(config: AxiosRequestConfig): RequestBuilder<T> {
    this._config = config;
    return this;
  }

  private initConfig() {
    this._config.baseURL = process.env.VUE_APP_BASE_SERVICE_API;
    console.log(this._config.baseURL)
    // this._config.headers = {
    //   Authorization: `Bearer ${UserModule.token}`
    // }
    this._config.paramsSerializer = params => {
      return qs.stringify(params, {
        arrayFormat: "repeat"
      });
    };
  }

  delete(): Promise<any> {
    this.initConfig();
    return request.delete(this._url, this._config);
  }

  findAll(): Promise<T[]> {
    this.initConfig();
    return request
      .get(this._url, this._config)
      .then(response => response.data as T[]);
  }

  findOne(): Promise<T> {
    this.initConfig();
    return request.get(this._url || "", this._config).then(response => {
      // console.log(JSON.stringify(response))
      return response.data as T;
    });
  }

  get() {
    this.initConfig();
    return request.get(this._url || "", this._config).then(response => {
      return response.data as T;
    });
  }

  post(): Promise<T> {
    this.initConfig();
    return request.post(this._url, this._data, this._config).then(response => {
      return response.data as T;
    });
  }

  put(): Promise<T> {
    this.initConfig();
    return request.put(this._url, this._data, this._config).then(response => {
      return response.data as T;
    });
  }
}
