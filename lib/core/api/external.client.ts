// Global External API Client

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
    
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[External API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[External API] Request Error:', error);
        return Promise.reject(error);
      }
    );
    
    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[External API] Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[External API] Response Error:', error.response?.status, error.message);
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
      console.error(`[External API] GET ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`[External API] POST ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`[External API] PUT ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`[External API] DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }
}

// Singleton instance
export const externalClient = new ExternalClient();
