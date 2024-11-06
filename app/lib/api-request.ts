/* eslint-disable @typescript-eslint/no-explicit-any */
// 定义 Content-Type 枚举
export enum ContentType {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
  URL_ENCODED = 'application/x-www-form-urlencoded',
  TEXT = 'text/plain'
}

// 定义请求配置接口
export interface RequestConfig extends RequestInit {
  headers?: HeadersInit;
  params?: Record<string, string>;
  data?: any;
}

// 定义响应接口
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
}

// Token 管理器接口
interface TokenManager {
  getToken(): string | Promise<string>;
  getTokenType(): string;
}

// 默认 Token 管理器实现
class DefaultTokenManager implements TokenManager {
  private token: string;
  private tokenType: string;

  constructor(token: string = '', tokenType: string = 'Bearer') {
    this.token = token;
    this.tokenType = tokenType;
  }

  getToken(): string {
    return this.token;
  }

  getTokenType(): string {
    return this.tokenType;
  }

  setToken(token: string): void {
    this.token = token;
  }
}

// 自定义 Token 管理器实现示例
class CustomTokenManager implements TokenManager {
  private getTokenFn: () => string | Promise<string>;
  private tokenType: string;

  constructor(getTokenFn: () => string | Promise<string>, tokenType: string = 'Bearer') {
    this.getTokenFn = getTokenFn;
    this.tokenType = tokenType;
  }

  getToken(): string | Promise<string> {
    return this.getTokenFn();
  }

  getTokenType(): string {
    return this.tokenType;
  }
}


export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any,
    public headers?: Headers
  ) {
    super(`HTTP Error: ${status}`);
    this.name = 'ApiError';
  }
}

// API请求类
class ApiRequest {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private tokenManager: TokenManager;

  constructor(
    baseUrl: string = '',
    tokenManager?: TokenManager,
    defaultHeaders: HeadersInit = {}
  ) {
    this.baseUrl = baseUrl;
    this.tokenManager = tokenManager || new DefaultTokenManager();
    this.defaultHeaders = {
      'Content-Type': ContentType.JSON,
      ...defaultHeaders
    };
  }

  // 设置 Token 管理器
  setTokenManager(tokenManager: TokenManager): void {
    this.tokenManager = tokenManager;
  }

  // 设置全局headers
  setDefaultHeaders(headers: HeadersInit): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      ...headers
    };
  }

  // 获取认证 header
  private async getAuthHeader(): Promise<HeadersInit> {
    const token = await Promise.resolve(this.tokenManager.getToken());
    if (!token) return {};

    return {
      'Authorization': `${this.tokenManager.getTokenType()} ${token}`
    };
  }

  // 处理URL参数
  private formatUrl(url: string, params?: Record<string, string>): string {
    const fullUrl = this.baseUrl + url;
    if (!params) return fullUrl;

    const queryString = new URLSearchParams(params).toString();
    return `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryString}`;
  }

  // 处理响应
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    let responseData: any;

    if (!response.ok) {
      const json = (await response.json())
      const errorMsg = json?.error ?? ''
      throw new ApiError(
        response.status,
        errorMsg ?? response.statusText,
        responseData,
        response.headers
      );
    }

    try {
      responseData = await response.json();
    } catch (e) {
      console.log({ e })
      responseData = null;
    }


    return {
      data: responseData,
      status: response.status,
      headers: response.headers
    };
  }

  // 通用请求方法
  private async request<T>(url: string, config: RequestConfig): Promise<ApiResponse<T>> {
    const { params, headers, data, ...restConfig } = config;
    const finalUrl = this.formatUrl(url, params);
    // 合并认证头和其他头信息
    const authHeader = await this.getAuthHeader();
    const finalHeaders = {
      ...this.defaultHeaders,
      ...authHeader,
      ...headers
    };

    if (data && (finalHeaders as any)['Content-Type'] === ContentType.JSON) {
      restConfig.body = JSON.stringify(data);
    }

    const response = await fetch(finalUrl, {
      ...restConfig,
      headers: finalHeaders
    });

    return this.handleResponse<T>(response);
  }

  // GET请求
  async get<T>(url: string, config: Omit<RequestConfig, 'body' | 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'GET'
    });
  }

  // POST请求
  async post<T>(url: string, data?: any, config: Omit<RequestConfig, 'body' | 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      data
    });
  }

  // PUT请求
  async put<T>(url: string, data?: any, config: Omit<RequestConfig, 'body' | 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      data
    });
  }

  // DELETE请求
  async delete<T>(url: string, config: Omit<RequestConfig, 'body' | 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...config,
      method: 'DELETE'
    });
  }
}

export { ApiRequest, type TokenManager, DefaultTokenManager, CustomTokenManager };

export const apiRequest = new ApiRequest()
