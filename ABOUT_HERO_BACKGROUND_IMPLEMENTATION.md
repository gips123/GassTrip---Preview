# 🖼️ **ABOUT HERO BACKGROUND IMAGE IMPLEMENTATION**

## ✅ **SOLUTION COMPLETED:**

### **1. Updated Models Based on Strapi Response:**
```typescript
// Raw Strapi model - sesuai dengan response
export interface AboutHero {
  id: number;
  Title: string;
  Description: string;
  Background?: StrapiMedia[];  // ✅ Background array di dalam AboutHero
}

// Transformed model
export interface AboutHeroTransformed {
  id: number;
  title: string;
  description: string;
  backgroundImage?: {  // ✅ Transformed ke backgroundImage
    url: string;
    alt: string;
  };
}
```

### **2. Updated Zod Schemas:**
```typescript
// Raw schema - sesuai dengan Strapi structure
export const AboutHeroSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Background: z.array(StrapiMediaSchema).optional(),  // ✅ Background array
});

// Transformed schema
export const AboutHeroTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  backgroundImage: z.object({  // ✅ Transformed ke backgroundImage
    url: z.string(),
    alt: z.string(),
  }).optional(),
});
```

### **3. Enhanced Service Transform:**
```typescript
private transformHero(hero: any): AboutHeroTransformed {
  // ✅ Transform background image from AboutHero.Background
  let backgroundImage = undefined;
  if (hero.Background && hero.Background.length > 0) {
    const background = hero.Background[0];
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const imageUrl = background.url.startsWith('http') ? background.url : `${baseUrl}${background.url}`;
    
    backgroundImage = {
      url: imageUrl,
      alt: background.alternativeText || background.name || 'Background image'
    };
  }
  
  return {
    id: hero.id,
    title: hero.Title,
    description: hero.Description,
    backgroundImage
  };
}
```

### **4. Updated AboutHeroSection:**
```typescript
const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({ hero, logo, background }) => {
  // ✅ Use background image from hero or fallback to background prop
  const backgroundImage = hero.backgroundImage?.url || background.url;
  const backgroundAlt = hero.backgroundImage?.alt || background.alt;

  return (
    <section 
      className="relative h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,  // ✅ Dynamic background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
```

---

## 🎯 **Strapi Response Structure:**

### **API Endpoint:**
```
GET http://localhost:1337/api/about?populate[AboutHero][populate]=*
```

### **Response Structure:**
```json
{
  "data": {
    "AboutHero": {
      "id": 8,
      "Title": "Tentang Kami",
      "Description": "Bersama kami, jelajahi keindahan alam, budaya, dan pesona destinasi pilihan...",
      "Background": [  // ✅ Background array di dalam AboutHero
        {
          "id": 2,
          "name": "bali.jpg",
          "url": "/uploads/bali_c14571b9ac.jpg",
          "alternativeText": null,
          "formats": {
            "thumbnail": { "url": "/uploads/thumbnail_bali_c14571b9ac.jpg" },
            "medium": { "url": "/uploads/medium_bali_c14571b9ac.jpg" },
            "large": { "url": "/uploads/large_bali_c14571b9ac.jpg" }
          }
        }
      ]
    }
  }
}
```

---

## 🚀 **How It Works:**

### **1. Data Flow:**
```
Strapi API → Service Transform → Component → Dynamic Background
```

### **2. Background Selection:**
- ✅ **Primary**: Use first image from `AboutHero.Background` array
- ✅ **Fallback**: Use background prop jika tidak ada hero background
- ✅ **URL Prefix**: Add Strapi base URL prefix

### **3. Priority System:**
```typescript
// Priority 1: Hero background image
const backgroundImage = hero.backgroundImage?.url || background.url;

// Priority 2: Fallback background prop
const backgroundAlt = hero.backgroundImage?.alt || background.alt;
```

---

## 📊 **Expected Behavior:**

### **1. With Strapi Background:**
**Input:**
```json
{
  "AboutHero": {
    "Background": [
      {
        "url": "/uploads/bali_c14571b9ac.jpg",
        "alternativeText": null,
        "name": "bali.jpg"
      }
    ]
  }
}
```

**Output:**
```typescript
backgroundImage: {
  url: "http://localhost:1337/uploads/bali_c14571b9ac.jpg",
  alt: "bali.jpg"
}
```

**Result**: Component uses Bali background image

### **2. Without Strapi Background:**
**Result**: Component uses fallback background prop

### **3. With Dummy Data:**
**Result**: Component uses `/about.jpg` from dummy data

---

## 🎨 **Visual Design:**

### **1. Background Image:**
- ✅ **Dynamic Source**: Background dari Strapi atau fallback
- ✅ **Full Coverage**: `background-size: cover`
- ✅ **Center Position**: `background-position: center`
- ✅ **No Repeat**: `background-repeat: no-repeat`

### **2. Overlay:**
- ✅ **Dark Overlay**: `bg-black/40` untuk text contrast
- ✅ **Content Visibility**: Text tetap readable dengan overlay

### **3. Responsive:**
- ✅ **Height**: `h-[70vh]` untuk consistent height
- ✅ **Overflow**: `overflow-hidden` untuk clean edges

---

## 🔧 **Strapi Configuration:**

### **Content Type Structure:**
```
About
└── AboutHero (Component)
    ├── Title (Text)
    ├── Description (Text)
    └── Background (Media - Multiple)
```

### **API Query:**
```javascript
// Include hero background in populate
const response = await strapiClient.get('/about?populate[AboutHero][populate]=*');
```

---

## 🎯 **Key Benefits:**

1. ✅ **Accurate Data Mapping**: Background dari AboutHero.Background
2. ✅ **Priority System**: Hero background > Fallback background
3. ✅ **URL Handling**: Proper Strapi base URL prefix
4. ✅ **Fallback Support**: Graceful fallback jika tidak ada background
5. ✅ **Type Safety**: Full TypeScript support
6. ✅ **Validation**: Zod validation untuk background data
7. ✅ **Flexibility**: Support untuk multiple background images
8. ✅ **Performance**: Optimized image loading

---

## 📈 **Testing Scenarios:**

### **1. With Strapi Background:**
- ✅ **Expected**: Uses `/uploads/bali_c14571b9ac.jpg`
- ✅ **Console**: `[AboutPageService] Response has data/meta structure`
- ✅ **Network**: `GET http://localhost:1337/uploads/bali_c14571b9ac.jpg 200 OK`

### **2. Without Strapi Background:**
- ✅ **Expected**: Uses fallback background prop
- ✅ **Console**: No background image from hero
- ✅ **Network**: Uses fallback image

### **3. With Dummy Data:**
- ✅ **Expected**: Uses `/about.jpg`
- ✅ **Console**: Using dummy data
- ✅ **Network**: Uses dummy background

**About Hero background image sekarang menggunakan data dari Strapi API dengan priority system yang elegant!** 🎯
