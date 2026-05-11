const products = [
  { id: 1, name: "StreetCore Oversized Hoodie", price: 65, category: "Hoodies", rating: 4.3, stock: 12, inStock: true, description: "Heavy oversized hoodie with soft streetwear cotton blend." },
  { id: 2, name: "UrbanFlex Cargo Pants", price: 55, category: "Pants", rating: 4.1, stock: 0, inStock: false, description: "Slim cargo pants with utility pockets." },
  { id: 3, name: "NeoWave Graphic Tee", price: 25, category: "T-Shirts", rating: 4.5, stock: 34, inStock: true, description: "Futuristic neon graphic cotton tee." },
  { id: 4, name: "CloudStep Joggers", price: 50, category: "Pants", rating: 4.2, stock: 7, inStock: true, description: "Ultra-soft joggers for daily comfort." },
  { id: 5, name: "Midnight Drift Jacket", price: 90, category: "Jackets", rating: 4.6, stock: 5, inStock: true, description: "Dark matte wind-resistant jacket." },

  { id: 6, name: "EchoLine Basic Tee", price: 20, category: "T-Shirts", rating: 4.0, stock: 50, inStock: true, description: "Simple essential everyday tee." },
  { id: 7, name: "DriftStreet Denim Jeans", price: 70, category: "Jeans", rating: 4.4, stock: 18, inStock: true, description: "Slim-fit streetwear denim jeans." },
  { id: 8, name: "AeroFit Sports Hoodie", price: 60, category: "Hoodies", rating: 4.3, stock: 0, inStock: false, description: "Light hoodie for training sessions." },
  { id: 9, name: "Vanta Black Cargo Shorts", price: 35, category: "Shorts", rating: 4.2, stock: 22, inStock: true, description: "All-black utility cargo shorts." },
  { id: 10, name: "SolarFade Overshirt", price: 45, category: "Shirts", rating: 4.1, stock: 14, inStock: true, description: "Light faded overshirt for layering." },

  { id: 11, name: "LunarMesh Tank Top", price: 22, category: "Tops", rating: 4.0, stock: 40, inStock: true, description: "Breathable mesh summer tank." },
  { id: 12, name: "UrbanPulse Windbreaker", price: 85, category: "Jackets", rating: 4.7, stock: 9, inStock: true, description: "Reflective lightweight windbreaker." },
  { id: 13, name: "FlexCore Sweatpants", price: 48, category: "Pants", rating: 4.3, stock: 0, inStock: false, description: "Tapered athletic sweatpants." },
  { id: 14, name: "ShadowDrip Long Sleeve", price: 30, category: "T-Shirts", rating: 4.2, stock: 27, inStock: true, description: "Dark aesthetic long sleeve shirt." },
  { id: 15, name: "StreetNova Bomber Jacket", price: 95, category: "Jackets", rating: 4.6, stock: 6, inStock: true, description: "Modern street bomber jacket." },

  { id: 16, name: "HyperLoop Track Pants", price: 52, category: "Pants", rating: 4.1, stock: 19, inStock: true, description: "Smooth sporty track pants." },
  { id: 17, name: "CoreThread Plain Tee", price: 18, category: "T-Shirts", rating: 4.0, stock: 60, inStock: true, description: "Minimal everyday plain tee." },
  { id: 18, name: "IronWave Denim Jacket", price: 88, category: "Jackets", rating: 4.5, stock: 3, inStock: true, description: "Vintage heavy denim jacket." },
  { id: 19, name: "NeoStreet Cargo Shorts", price: 40, category: "Shorts", rating: 4.3, stock: 25, inStock: true, description: "Urban cargo shorts design." },
  { id: 20, name: "Skyline Knit Sweater", price: 60, category: "Sweaters", rating: 4.6, stock: 11, inStock: true, description: "Soft knitted winter sweater." },

  { id: 21, name: "PulseFit Compression Tee", price: 28, category: "T-Shirts", rating: 4.2, stock: 30, inStock: true, description: "Athletic compression training tee." },
  { id: 22, name: "UrbanShade Hoodie Zip", price: 68, category: "Hoodies", rating: 4.4, stock: 8, inStock: true, description: "Zip hoodie with urban fit." },
  { id: 23, name: "DriftCore Slim Jeans", price: 75, category: "Jeans", rating: 4.5, stock: 0, inStock: false, description: "Slim modern faded jeans." },
  { id: 24, name: "NightFlow Track Jacket", price: 82, category: "Jackets", rating: 4.6, stock: 10, inStock: true, description: "Dark sporty track jacket." },
  { id: 25, name: "AstraWear Basic Tank", price: 19, category: "Tops", rating: 4.0, stock: 45, inStock: true, description: "Simple lightweight tank top." },

  { id: 26, name: "Zenith Street Hoodie", price: 66, category: "Hoodies", rating: 4.3, stock: 13, inStock: true, description: "Clean streetwear hoodie." },
  { id: 27, name: "VibeLine Sweatshirt", price: 58, category: "Sweatshirts", rating: 4.4, stock: 9, inStock: true, description: "Comfortable everyday sweatshirt." },
  { id: 28, name: "MonoFlex Joggers", price: 49, category: "Pants", rating: 4.2, stock: 20, inStock: true, description: "Minimal jogger pants design." },
  { id: 29, name: "SkyDrift Oversized Tee", price: 24, category: "T-Shirts", rating: 4.5, stock: 33, inStock: true, description: "Loose fit street oversized tee." },
  { id: 30, name: "IronPulse Cargo Pants", price: 62, category: "Pants", rating: 4.3, stock: 15, inStock: true, description: "Heavy-duty cargo pants." },

  { id: 31, name: "NovaStreet Hoodie Blackout", price: 70, category: "Hoodies", rating: 4.6, stock: 6, inStock: true, description: "All-black premium hoodie." },
  { id: 32, name: "LumaCore Running Shorts", price: 33, category: "Shorts", rating: 4.1, stock: 21, inStock: true, description: "Light athletic running shorts." },
  { id: 33, name: "EdgeWave Denim Shorts", price: 38, category: "Shorts", rating: 4.2, stock: 17, inStock: true, description: "Washed denim summer shorts." },
  { id: 34, name: "StormFit Wind Hoodie", price: 72, category: "Hoodies", rating: 4.5, stock: 0, inStock: false, description: "Windproof lightweight hoodie." },
  { id: 35, name: "UrbanFade Cotton Tee", price: 21, category: "T-Shirts", rating: 4.0, stock: 55, inStock: true, description: "Soft cotton faded tee." },

  { id: 36, name: "NightPulse Cargo Joggers", price: 57, category: "Pants", rating: 4.4, stock: 12, inStock: true, description: "Cargo-style jogger pants." },
  { id: 37, name: "CoreNova Zip Jacket", price: 89, category: "Jackets", rating: 4.7, stock: 4, inStock: true, description: "Premium zip-up jacket." },
  { id: 38, name: "StreetGlow Overshirt", price: 47, category: "Shirts", rating: 4.3, stock: 18, inStock: true, description: "Stylish layered overshirt." },
  { id: 39, name: "FlexStreet Training Tee", price: 26, category: "T-Shirts", rating: 4.2, stock: 26, inStock: true, description: "Workout performance tee." },
  { id: 40, name: "AeroStreet Cargo Shorts", price: 36, category: "Shorts", rating: 4.1, stock: 23, inStock: true, description: "Light cargo shorts street style." },

  { id: 41, name: "MonoDrift Hoodie Grey", price: 64, category: "Hoodies", rating: 4.3, stock: 14, inStock: true, description: "Grey minimalist hoodie." },
  { id: 42, name: "UrbanMotion Sweatpants", price: 53, category: "Pants", rating: 4.2, stock: 16, inStock: true, description: "Soft motion-fit sweatpants." },
  { id: 43, name: "NeoFlex Sport Jacket", price: 92, category: "Jackets", rating: 4.6, stock: 7, inStock: true, description: "Sport-inspired modern jacket." },
  { id: 44, name: "ShadowCore Basic Tee", price: 20, category: "T-Shirts", rating: 4.0, stock: 48, inStock: true, description: "Dark minimal essential tee." },
  { id: 45, name: "DriftLine Denim Cargo Pants", price: 78, category: "Pants", rating: 4.5, stock: 10, inStock: true, description: "Hybrid denim cargo pants." },

  { id: 46, name: "SkyPulse Hoodie Blue", price: 67, category: "Hoodies", rating: 4.4, stock: 11, inStock: true, description: "Blue soft street hoodie." },
  { id: 47, name: "UrbanFlex Mesh Tank", price: 23, category: "Tops", rating: 4.1, stock: 37, inStock: true, description: "Breathable mesh tank top." },
  { id: 48, name: "StreetNova Shorts V2", price: 39, category: "Shorts", rating: 4.2, stock: 19, inStock: true, description: "Updated street cargo shorts." },
  { id: 49, name: "CoreDrift Heavy Tee", price: 27, category: "T-Shirts", rating: 4.3, stock: 28, inStock: true, description: "Thick premium cotton tee." },
  { id: 50, name: "NightCore Street Jacket", price: 94, category: "Jackets", rating: 4.7, stock: 5, inStock: true, description: "High-end streetwear jacket." },
  
];
export default products;