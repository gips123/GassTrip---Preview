import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ExternalClient {
  private client: AxiosInstance;
  
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_TOUR_API_URL || 'https://api.tour-provider.com';
    const apiKey = process.env.NEXT_PUBLIC_TOUR_API_KEY || '';
    
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(endpoint: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get(endpoint, { 
        params, 
        ...config 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const externalClient = new ExternalClient();
