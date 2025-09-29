import { Product } from "@/types/products";

export const products: Product[] = [
  {
    "id": "prod_001",
    "name": "Voopoo Drag X Pod Mod",
    "slug": "voopoo-drag-x-pod-mod",
    "description": "The Voopoo Drag X is a powerful pod mod device featuring adjustable wattage up to 80W, powered by a single 18650 battery. Designed with an ergonomic grip and fast firing technology for a premium vaping experience.",
    "images": [
      "/1.png",
      "/2.png",
      "/3.png",
      "/4.png"
    ],
    "price": 65.00,
    "discountPrice": 55.00,
    "isOnSale": true,
    "shortDescription": "Compact 80W pod mod with advanced airflow control and ergonomic design.",
    "specifications": [
      "Power Output: 5-80W",
      "Battery: Single 18650 (not included)",
      "Tank Capacity: 4.5ml",
      "Charging: Type-C Fast Charging"
    ],
    "faqs": [
      {
        "question": "Does it come with a battery?",
        "answer": "No, the battery is sold separately."
      },
      {
        "question": "Is it suitable for beginners?",
        "answer": "Yes, the device has adjustable wattage and simple controls."
      }
    ],
    "colors": ["Black", "Silver", "Carbon Fiber", "Blue"],
    "options": ["Standard Kit", "Deluxe Kit"],
    "category": {
      "slug": "vape-devices"
    }
  },
  {
    "id": "prod_002",
    "name": "Dinner Lady Lemon Tart E-Liquid 60ml",
    "slug": "dinner-lady-lemon-tart-eliquid",
    "description": "A zesty lemon curd layered with gooey meringue and buttery pastry. This e-liquid is a favorite among dessert vape lovers.",
    "images": [
      "/colorful-disposable-vape-devices-in-different-colo.jpg",
      "/6.png",
      "/7.png",
      "/8.png"
    ],
    "price": 20.00,
    "discountPrice": null,
    "isOnSale": false,
    "shortDescription": "Famous dessert e-liquid with a lemon tart flavor.",
    "specifications": [
      "Bottle Size: 60ml",
      "VG/PG Ratio: 70/30",
      "Nicotine Strength: 0mg, 3mg, 6mg"
    ],
    "faqs": [
      {
        "question": "Is this available in nicotine salt?",
        "answer": "No, this product is only available as a freebase e-liquid."
      },
      {
        "question": "What devices work best with this liquid?",
        "answer": "Best used with sub-ohm tanks or pod mods supporting high VG liquids."
      }
    ],
    "flavors": ["Lemon Tart"],
    "options": ["0mg", "3mg", "6mg"],
    "category": {
      "slug": "e-liquids"
    }
  },
  {
    "id": "prod_003",
    "name": "Elf Bar BC5000 Disposable Vape",
    "slug": "elf-bar-bc5000-disposable",
    "description": "A compact and long-lasting disposable vape with 5000 puffs, featuring a rechargeable battery and various flavor options.",
    "images": [
      "/colorful-disposable-vape-devices-in-different-colo.jpg",
      "/disposable-vape-device-red-variant.jpg",
      "/3.png",
      "/4.png"
    ],
    "price": 18.00,
    "discountPrice": 15.00,
    "isOnSale": true,
    "shortDescription": "Rechargeable disposable vape with up to 5000 puffs.",
    "specifications": [
      "Puff Count: 5000",
      "Battery: 650mAh Rechargeable",
      "E-liquid Capacity: 13ml",
      "Nicotine Strength: 5%"
    ],
    "faqs": [
      {
        "question": "Can I refill the Elf Bar?",
        "answer": "No, the Elf Bar is designed for single-use and cannot be refilled."
      },
      {
        "question": "Does it come with a charging cable?",
        "answer": "No, but it uses a standard USB-C charger."
      }
    ],
    "flavors": ["Watermelon Ice", "Mango Peach", "Blue Razz", "Strawberry Kiwi"],
    "colors": ["Gradient Red", "Gradient Blue", "Black"],
    "category": {
      "slug": "disposable-vapes"
    }
  },
  {
    "id": "prod_004",
    "name": "GeekVape Zeus Sub-Ohm Tank",
    "slug": "geekvape-zeus-subohm-tank",
    "description": "Leakproof top airflow design and mesh coil system for massive clouds and intense flavor.",
    "images": [
      "/colorful-disposable-vape-devices-in-different-colo.jpg",
      "/disposable-vape-device-red-variant.jpg",
      "/3.png",
      "/4.png"
    ],
    "price": 32.00,
    "discountPrice": null,
    "isOnSale": false,
    "shortDescription": "Top airflow sub-ohm tank with mesh coil technology.",
    "specifications": [
      "Tank Capacity: 5ml",
      "Airflow: Top Adjustable",
      "Coil Compatibility: Z Series Coils"
    ],
    "faqs": [
      {
        "question": "Is it compatible with other coils?",
        "answer": "The Zeus Tank only works with GeekVape Z-series coils."
      }
    ],
    "colors": ["Stainless Steel", "Gunmetal", "Rainbow"],
    "category": {
      "slug": "tanks-atomizers"
    }
  },
  {
    "id": "prod_005",
    "name": "Nitecore Intellicharger i2",
    "slug": "nitecore-intellicharger-i2",
    "description": "Universal smart charger for vape batteries with automatic voltage detection and multiple safety features.",
    "images": [
      "/colorful-disposable-vape-devices-in-different-colo.jpg",
      "/disposable-vape-device-red-variant.jpg",
      "/3.png",
      "/4.png"
    ],
    "price": 25.00,
    "discountPrice": null,
    "isOnSale": false,
    "shortDescription": "Dual slot charger compatible with multiple battery types.",
    "specifications": [
      "Slots: 2",
      "Input: AC 100–240V 50/60Hz",
      "Compatibility: 18650, 20700, 21700, AA, AAA, and more"
    ],
    "faqs": [
      {
        "question": "Can it charge different battery sizes simultaneously?",
        "answer": "Yes, each slot charges independently with optimized current."
      }
    ],
    "options": ["Standard Edition", "EU Plug", "US Plug"],
    "category": {
      "slug": "batteries-chargers"
    }
  }
]
