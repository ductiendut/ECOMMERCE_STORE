import { createContext } from "react";
import { CATEGORIES } from "../config/constants";

// Map categories into featured entries with placeholder images (update with real assets later)
export const FeatureCategoryContext = createContext([
    {
        name: 'Gunpla (Gundam)',
        image: '/assets/categories/gunpla.png',
        url: '/category/gunpla',
        id: 1
    },
    {
        name: 'Action Figures',
        image: '/assets/categories/figure.png',
        url: '/category/figure',
        id: 2
    },
    {
        name: 'Model Kits',
        image: '/assets/categories/modelkit.png',
        url: '/category/modelkit',
        id: 3
    },
    {
        name: 'Phụ kiện',
        image: '/assets/categories/accessory.png',
        url: '/category/accessory',
        id: 4
    }
])
