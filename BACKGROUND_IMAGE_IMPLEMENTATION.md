# 🖼️ **BACKGROUND IMAGE IMPLEMENTATION**

## ✅ **SOLUTION COMPLETED:**

### **1. Updated Models:**
```typescript
// Raw Strapi model
export interface AboutPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  AboutHero: AboutHero;
  Logo: StrapiMedia;
  Featured: AboutFeatured[];
  VissionMission: AboutVisionMission;
  Background: StrapiMedia[];  // ✅ Added Background array
}

// Transformed model
export interface AboutPageTransformed {
  id: number;
  hero: AboutHeroTransformed;
  logo: AboutLogoTransformed;
  featured: AboutFeaturedTransformed[];
  visionMission: AboutVisionMissionTransformed;
  background: {  // ✅ Added background object
    url: string;
    alt: string;
  };
}
```

### **2. Updated Zod Schemas:**
```typescript
// Raw schema
export const AboutPageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  AboutHero: AboutHeroSchema,
  Logo: StrapiMediaSchema,
  Featured: z.array(AboutFeaturedSchema),
  VissionMission: AboutVisionMissionSchema,
  Background: z.array(StrapiMediaSchema),  // ✅ Added Background array
});

// Transformed schema
export const AboutPageTransformedSchema = z.object({
  id: z.number(),
  hero: AboutHeroTransformedSchema,
  logo: AboutLogoTransformedSchema,
  featured: z.array(AboutFeaturedTransformedSchema),
  visionMission: AboutVisionMissionTransformedSchema,
  background: z.object({  // ✅ Added background schema
    url: z.string(),
    alt: z.string(),
  }),
});
```

### **3. Enhanced Service Transform:**
```typescript
// Transform main data
private transformAboutPageData(data: AboutPageData): AboutPageTransformed {
  return {
    id: data.id,
    hero: this.transformHero(data.AboutHero),
    logo: this.transformLogo(data.Logo),
    featured: data.Featured.map(item => this.transformFeatured(item)),
    visionMission: this.transformVisionMission(data.VissionMission),
    background: this.transformBackground(data.Background)  // ✅ Added background transform
  };
}

// Transform background images
private transformBackground(backgrounds: any[]): { url: string; alt: string } {
  // Use first background image or fallback
  const background = backgrounds && backgrounds.length > 0 ? backgrounds[0] : null;
  
  if (background) {
    return {
      url: background.url,
      alt: background.alternativeText || background.name || 'Background image'
    };
  }
  
  // Fallback to default
  return {
    url: '/bali.jpg',
    alt: 'Default background image'
  };
}
```

### **4. Updated Component:**
```typescript
interface AboutHeroSectionProps {
  hero: AboutHeroTransformed;
  logo: AboutLogoTransformed;
  background: {  // ✅ Added background prop
    url: string;
    alt: string;
  };
}

const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({ hero, logo, background }) => {
  return (
    <section 
      className="relative h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url('${background.url}')`,  // ✅ Dynamic background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
```

### **5. Updated Page Component:**
```typescript
<AboutHeroSection 
  hero={aboutPage.hero} 
  logo={aboutPage.logo} 
  background={aboutPage.background}  // ✅ Pass background prop
/>
```

---

## 🎯 **How It Works:**

### **1. Data Flow:**
```
Strapi API → Service Transform → Component → Dynamic Background
```

### **2. Background Selection:**
- ✅ **Primary**: Use first image from `Background` array
- ✅ **Fallback**: Use `/bali.jpg` if no background images
- ✅ **Alt Text**: Use Strapi alt text or image name

### **3. Strapi Response Handling:**
```json
{
  "data": {
    "Background": [
      {
        "id": 3,
        "name": "bromo.jpg",
        "url": "/uploads/bromo_2eeb397d23.jpg",
        "alternativeText": null,
        "formats": {
          "thumbnail": { "url": "/uploads/thumbnail_bromo_2eeb397d23.jpg" },
          "medium": { "url": "/uploads/medium_bromo_2eeb397d23.jpg" },
          "large": { "url": "/uploads/large_bromo_2eeb397d23.jpg" }
        }
      }
    ]
  }
}
```

**Transform Result:**
```typescript
background: {
  url: "/uploads/bromo_2eeb397d23.jpg",
  alt: "bromo.jpg"
}
```

---

## 🚀 **Testing:**

### **1. With Strapi Background:**
**Expected Result**: Component uses `/uploads/bromo_2eeb397d23.jpg`

### **2. Without Strapi Background:**
**Expected Result**: Component uses fallback `/bali.jpg`

### **3. With Dummy Data:**
**Expected Result**: Component uses `/about.jpg`

---

## 📊 **Expected Console Output:**

```javascript
[AboutPageService] Raw response: {data: {Background: [...]}}
[AboutPageService] Response has data/meta structure
// Background will be: "/uploads/bromo_2eeb397d23.jpg"
```

---

## 🎯 **Key Benefits:**

1. ✅ **Dynamic Background**: Background image dari Strapi API
2. ✅ **Array Support**: Handle multiple background images
3. ✅ **Smart Selection**: Use first image from array
4. ✅ **Fallback Support**: Graceful fallback ke default image
5. ✅ **Type Safety**: Full TypeScript support
6. ✅ **Validation**: Zod validation untuk background data
7. ✅ **Accessibility**: Proper alt text untuk background images

**Background image sekarang dinamis dan menggunakan data dari Strapi API!** 🎯
