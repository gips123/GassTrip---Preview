# 🎯 **VISION MISSION SECTION - STRAPI DATA INTEGRATION**

## ✅ **SOLUTION COMPLETED:**

### **1. Updated Models Based on Strapi Response:**
```typescript
// Raw Strapi model - sesuai dengan response
export interface AboutVisionMission {
  id: number;
  Title: string;
  Vission: string;
  Mission?: {  // ✅ Field name sesuai dengan Strapi: "Mission" (bukan "Missions")
    id: number;
    Title: string;
    Description: string;
  }[];
}

// Transformed model
export interface AboutVisionMissionTransformed {
  id: number;
  title: string;
  vision: string;
  missions?: {  // ✅ Transformed ke "missions" untuk frontend
    id: number;
    title: string;
    description: string;
  }[];
}
```

### **2. Updated Zod Schemas:**
```typescript
// Raw schema - sesuai dengan Strapi structure
export const AboutVisionMissionSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Vission: z.string(),
  Mission: z.array(z.object({  // ✅ Field name: "Mission"
    id: z.number(),
    Title: z.string(),
    Description: z.string(),
  })).optional(),
});

// Transformed schema
export const AboutVisionMissionTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  vision: z.string(),
  missions: z.array(z.object({  // ✅ Transformed ke "missions"
    id: z.number(),
    title: z.string(),
    description: z.string(),
  })).optional(),
});
```

### **3. Enhanced Service Transform:**
```typescript
private transformVisionMission(visionMission: any): AboutVisionMissionTransformed {
  return {
    id: visionMission.id,
    title: visionMission.Title,
    vision: visionMission.Vission,
    missions: visionMission.Mission ? visionMission.Mission.map((mission: any) => ({  // ✅ Transform "Mission" ke "missions"
      id: mission.id,
      title: mission.Title,
      description: mission.Description
    })) : undefined
  };
}
```

### **4. VisionMissionSection with FeatureCard:**
```typescript
const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ visionMission }) => {
  // ✅ Icon mapping berdasarkan index
  const getIconForMission = (index: number) => {
    const icons = [Users, Star, Handshake, Heart];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-8 h-8" />;
  };

  // ✅ Default missions fallback
  const defaultMissions = [
    {
      id: 1,
      title: "Pelayanan Prima",
      description: "Memberikan pelayanan yang profesional, ramah, cepat, dan responsif..."
    },
    // ... more missions
  ];

  // ✅ Use Strapi data atau fallback
  const missions = visionMission.missions && visionMission.missions.length > 0 
    ? visionMission.missions 
    : defaultMissions;

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Vision Section */}
      <div className="bg-white lg:col-span-1 flex justify-center items-center shadow-2xl p-8 border border-gray-100 rounded-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Visi</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {visionMission.vision}
          </p>
        </div>
      </div>

      {/* Mission Section with FeatureCard */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Misi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map((mission, index) => (
            <FeatureCard
              key={mission.id}
              icon={getIconForMission(index)}
              title={mission.title}
              description={mission.description}
              className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl"
              iconBgColor={index % 2 === 0 ? "bg-blue-600" : "bg-orange-500"}
              iconSize="w-12 h-12"
              titleSize="text-lg"
              descriptionSize="text-sm text-gray-600"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
```

---

## 🎯 **Strapi Response Structure:**

### **API Endpoint:**
```
GET http://localhost:1337/api/about?populate[VissionMission][populate]=*
```

### **Response Structure:**
```json
{
  "data": {
    "VissionMission": {
      "id": 5,
      "Title": "Visi & Misi",
      "Vission": "Menjadi perusahaan tour & travel terdepan, terpercaya, dan unggul di Indonesia...",
      "Mission": [  // ✅ Field name: "Mission" (array)
        {
          "id": 36,
          "Title": "Pelayanan Prima",
          "Description": "Memberikan pelayanan yang profesional, ramah, cepat, dan responsif..."
        },
        {
          "id": 37,
          "Title": "Kualitas & Inovasi",
          "Description": "Menyediakan paket perjalanan berkualitas dan terus berinovasi..."
        },
        {
          "id": 38,
          "Title": "Kemitraan Strategis",
          "Description": "Membangun hubungan baik dengan mitra bisnis untuk memastikan..."
        },
        {
          "id": 39,
          "Title": "Tanggung Jawab Sosial",
          "Description": "Mendukung pariwisata berkelanjutan dengan menghargai budaya lokal..."
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
Strapi API → Service Transform → Component → FeatureCard Rendering
```

### **2. Field Mapping:**
```typescript
// Strapi Response
"Mission": [
  {
    "Title": "Pelayanan Prima",
    "Description": "Memberikan pelayanan yang profesional..."
  }
]

// Transformed Data
missions: [
  {
    title: "Pelayanan Prima",
    description: "Memberikan pelayanan yang profesional..."
  }
]
```

### **3. Icon Assignment:**
```typescript
// Index-based icon assignment
index 0 → Users icon (Pelayanan Prima)
index 1 → Star icon (Kualitas & Inovasi)
index 2 → Handshake icon (Kemitraan Strategis)
index 3 → Heart icon (Tanggung Jawab Sosial)
```

---

## 📊 **Expected Behavior:**

### **1. With Strapi Data:**
- ✅ **Dynamic Missions**: 4 missions dari Strapi API
- ✅ **Real Content**: Title dan description dari Strapi
- ✅ **Icon Assignment**: Icons berdasarkan index (Users, Star, Handshake, Heart)
- ✅ **Alternating Colors**: Blue dan Orange untuk icon backgrounds

### **2. Without Strapi Data:**
- ✅ **Fallback Missions**: 4 default missions
- ✅ **Default Content**: Default title dan description
- ✅ **Same Icons**: Same icon assignment system
- ✅ **Consistent Design**: Same visual design

---

## 🎨 **Visual Design:**

### **1. Layout Structure:**
- ✅ **Left Side**: Vision section dengan shadow dan rounded corners
- ✅ **Right Side**: Missions grid dengan FeatureCard components
- ✅ **Responsive**: Stack vertically pada mobile

### **2. FeatureCard Styling:**
- ✅ **Alternating Colors**: 
  - Index 0, 2: Blue background (`bg-blue-600`)
  - Index 1, 3: Orange background (`bg-orange-500`)
- ✅ **Hover Effects**: Shadow dan scale effects
- ✅ **Consistent Spacing**: Proper padding dan margins

### **3. Icon System:**
- ✅ **Users**: Pelayanan Prima (index 0)
- ✅ **Star**: Kualitas & Inovasi (index 1)
- ✅ **Handshake**: Kemitraan Strategis (index 2)
- ✅ **Heart**: Tanggung Jawab Sosial (index 3)

---

## 🔧 **Strapi Configuration:**

### **Content Type Structure:**
```
About
└── VissionMission (Component)
    ├── Title (Text)
    ├── Vission (Text)
    └── Mission (Repeatable Component)
        ├── Title (Text)
        └── Description (Text)
```

### **API Query:**
```javascript
// Include missions in populate
const response = await strapiClient.get('/about?populate[VissionMission][populate]=*');
```

---

## 🎯 **Key Benefits:**

1. ✅ **Accurate Data Mapping**: Field names sesuai dengan Strapi response
2. ✅ **FeatureCard Integration**: Menggunakan reusable FeatureCard component
3. ✅ **Dynamic Content**: Missions bisa diubah dari Strapi admin
4. ✅ **Icon System**: Index-based icon assignment
5. ✅ **Fallback Support**: Default missions jika tidak ada data
6. ✅ **Responsive Design**: Mobile-friendly grid layout
7. ✅ **Type Safety**: Full TypeScript support
8. ✅ **Consistent Design**: Design yang konsisten dengan section lain

**Vision Mission section sekarang menggunakan data dari Strapi API dengan FeatureCard!** 🎯
