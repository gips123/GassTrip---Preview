# 🏗️ **ARSITEKTUR API YANG BENAR**

## 🎯 **MASALAH SEBELUMNYA:**

### **❌ Arsitektur Salah:**
```
lib/core/api/
├── strapi.client.ts     # HTTP client wrapper saja
├── external.client.ts   # HTTP client wrapper saja
└── index.ts            # Export clients

app/about/core/services/
└── about-page.service.ts  # ❌ Multiple API calls langsung
```

**Masalah:**
- ❌ **Business logic** tersebar di setiap page service
- ❌ **API calls** dilakukan langsung di page service
- ❌ **Tidak ada abstraction layer** untuk API methods
- ❌ **Code duplication** untuk API calls yang sama

---

## ✅ **ARSITEKTUR YANG BENAR:**

### **✅ Arsitektur Baru:**
```
lib/core/api/
├── strapi.client.ts     # HTTP client wrapper
├── strapi.service.ts    # ✅ Business logic layer
├── external.client.ts   # HTTP client wrapper
└── index.ts            # Export clients + services

app/about/core/services/
└── about-page.service.ts  # ✅ Menggunakan service dari lib
```

**Benefits:**
- ✅ **Centralized API Logic**: Semua API calls di `lib/core/api/`
- ✅ **Reusable Methods**: Service methods bisa digunakan di mana saja
- ✅ **Clean Separation**: HTTP client vs Business logic
- ✅ **Easy Maintenance**: Update API logic di satu tempat

---

## 🔧 **IMPLEMENTASI:**

### **1. lib/core/api/strapi.service.ts:**
```typescript
export class StrapiService {
  
  // About Page API Methods
  static async getAboutPageData() {
    try {
      // Multiple API calls for Strapi v5
      const [aboutHeroResponse, logoResponse, featuredResponse, visionMissionResponse] = await Promise.all([
        strapiClient.get<any>('/about?populate[AboutHero][populate]=*'),
        strapiClient.get<any>('/about?populate[Logo][populate]=*'),
        strapiClient.get<any>('/about?populate[Featured][populate]=*'),
        strapiClient.get<any>('/about?populate[VissionMission][populate]=*')
      ]);

      // Merge responses
      const mergedData = {
        id: aboutHeroResponse.data.id,
        AboutHero: aboutHeroResponse.data.AboutHero,
        Logo: logoResponse.data.Logo,
        Featured: featuredResponse.data.Featured,
        VissionMission: visionMissionResponse.data.VissionMission
      };

      return mergedData;
    } catch (error) {
      throw new Error(`Failed to fetch about page data: ${error}`);
    }
  }

  // Other page methods...
  static async getHomePageData() { ... }
  static async getContactPageData() { ... }
  static async getTourPackages() { ... }
}
```

### **2. app/about/core/services/about-page.service.ts:**
```typescript
import { StrapiService } from '@/lib/core/api';

export class AboutPageService {
  
  async getAboutPage(): Promise<AboutPageTransformed> {
    try {
      // ✅ Use service method from lib
      const mergedData = await StrapiService.getAboutPageData();
      
      // Transform data for frontend
      const validatedData = DirectDataSchema.parse(mergedData);
      const transformedData = this.transformAboutPageData(validatedData);
      return AboutPageTransformedSchema.parse(transformedData);
      
    } catch (error) {
      throw new Error(`Failed to fetch about page data: ${error}`);
    }
  }
  
  // Only transformation logic here
  private transformAboutPageData(data: AboutPageData): AboutPageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.AboutHero),
      logo: this.transformLogo(data.Logo),
      featured: data.Featured.map(item => this.transformFeatured(item)),
      visionMission: this.transformVisionMission(data.VissionMission),
      background: this.transformBackgroundFromHero(data.AboutHero)
    };
  }
}
```

---

## 📊 **LAYER SEPARATION:**

### **1. HTTP Client Layer (`strapi.client.ts`):**
```typescript
// Pure HTTP operations
class StrapiClient {
  async get<T>(endpoint: string): Promise<T> { ... }
  async post<T>(endpoint: string, data: any): Promise<T> { ... }
  async put<T>(endpoint: string, data: any): Promise<T> { ... }
  async delete<T>(endpoint: string): Promise<T> { ... }
}
```

### **2. Business Logic Layer (`strapi.service.ts`):**
```typescript
// API business logic
class StrapiService {
  static async getAboutPageData() { ... }  // Multiple API calls + merge
  static async getHomePageData() { ... }   // Single API call
  static async getTourPackages() { ... }   // Complex query logic
}
```

### **3. Page Service Layer (`about-page.service.ts`):**
```typescript
// Data transformation + validation
class AboutPageService {
  async getAboutPage() { ... }           // Use StrapiService + transform
  private transformHero() { ... }        // Transform raw data
  private transformLogo() { ... }        // Transform raw data
}
```

---

## 🎯 **BENEFITS:**

### **1. Centralized API Logic:**
- ✅ **Single Source**: Semua API calls di `lib/core/api/`
- ✅ **Reusable**: Service methods bisa digunakan di page lain
- ✅ **Consistent**: API logic yang sama di seluruh aplikasi

### **2. Clean Architecture:**
- ✅ **Separation of Concerns**: HTTP vs Business vs Transformation
- ✅ **Easy Testing**: Mock service methods dengan mudah
- ✅ **Maintainable**: Update API logic di satu tempat

### **3. Scalability:**
- ✅ **Easy Extension**: Tambah service methods baru dengan mudah
- ✅ **Page Independence**: Page service fokus pada transformation
- ✅ **API Versioning**: Handle API changes di service layer

---

## 🚀 **USAGE PATTERN:**

### **Before (❌ Wrong):**
```typescript
// In about-page.service.ts
const [response1, response2, response3, response4] = await Promise.all([
  strapiClient.get('/about?populate[AboutHero][populate]=*'),
  strapiClient.get('/about?populate[Logo][populate]=*'),
  strapiClient.get('/about?populate[Featured][populate]=*'),
  strapiClient.get('/about?populate[VissionMission][populate]=*')
]);
// Merge logic here...
```

### **After (✅ Correct):**
```typescript
// In about-page.service.ts
const mergedData = await StrapiService.getAboutPageData();
// Transform data for frontend
```

---

## 📈 **FUTURE IMPROVEMENTS:**

### **1. Add More Service Methods:**
```typescript
// lib/core/api/strapi.service.ts
class StrapiService {
  static async getAboutPageData() { ... }
  static async getHomePageData() { ... }
  static async getContactPageData() { ... }
  static async getTourPackages() { ... }
  static async getTourPackageDetail(id: string) { ... }
  static async getTestimonials() { ... }
  static async getBlogPosts() { ... }
}
```

### **2. Add Caching Layer:**
```typescript
class StrapiService {
  private static cache = new Map();
  
  static async getAboutPageData() {
    const cacheKey = 'about-page';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const data = await this.fetchAboutPageData();
    this.cache.set(cacheKey, data);
    return data;
  }
}
```

### **3. Add Error Handling:**
```typescript
class StrapiService {
  static async getAboutPageData() {
    try {
      return await this.fetchAboutPageData();
    } catch (error) {
      console.error('[StrapiService] About page fetch failed:', error);
      throw new StrapiServiceError('About page data unavailable', error);
    }
  }
}
```

---

## 🎯 **SUMMARY:**

**Arsitektur API telah diperbaiki dengan benar!**

- ✅ **lib/core/api/strapi.service.ts**: Business logic layer
- ✅ **app/about/core/services/about-page.service.ts**: Data transformation layer
- ✅ **Clean Separation**: HTTP client vs Business logic vs Transformation
- ✅ **Reusable Methods**: Service methods bisa digunakan di page lain
- ✅ **Centralized Logic**: Semua API calls di satu tempat

**Sekarang API dipanggil sekali di lib, dan page service hanya melakukan transformasi data!** 🎯
