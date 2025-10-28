// Global Strapi API Client

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class StrapiClient {
  private client: AxiosInstance;
  
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    this.client = axios.create({
      baseURL: `${baseURL}/api`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[Strapi API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[Strapi API] Request Error:', error);
        return Promise.reject(error);
      }
    );
    
    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[Strapi API] Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('[Strapi API] Response Error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }
  
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.get(endpoint, config);
      console.log(`[Strapi API] Raw response for ${endpoint}:`, response.data);
      
      // Return the full response data (including data and meta)
      return response.data;
    } catch (error) {
      console.error(`[Strapi API] GET ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`[Strapi API] POST ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      console.error(`[Strapi API] PUT ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      console.error(`[Strapi API] DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }
}

// Singleton instance
export const strapiClient = new StrapiClient();
