import { IMAGES } from "../assets";

export const CATEGORY_DATA = [
    { id: 1, label: 'DIY', value: 'diy', icon: IMAGES.ic_hammer_wrench },
    { id: 2, label: 'Gardening', value: 'gardening', icon: IMAGES.ic_hammer_wrench },
    { id: 3, label: 'Moving', value: 'moving', icon: IMAGES.ic_hammer_wrench },
    { id: 4, label: 'Housekeeping', value: 'housekeeping', icon: IMAGES.ic_hammer_wrench },
    { id: 5, label: 'Childcare', value: 'childcare', icon: IMAGES.ic_hammer_wrench },
    { id: 6, label: 'Pets', value: 'pets', icon: IMAGES.ic_hammer_wrench },
    { id: 7, label: 'IT', value: 'it', icon: IMAGES.ic_hammer_wrench },
    { id: 8, label: 'Homecare', value: 'homecare', icon: IMAGES.ic_hammer_wrench },
];

export const ASSITANCEDATA = [
    { id: 1, label: 'DIY', value: 'diy', icon: IMAGES.ic_hammer_wrench },
    { id: 2, label: 'Gardening', value: 'gardening', icon: IMAGES.ic_hammer_wrench },
    { id: 3, label: 'Housekeeping', value: 'Housekeeping', icon: IMAGES.ic_hammer_wrench },
    { id: 5, label: 'Childcare', value: 'childcare', icon: IMAGES.ic_hammer_wrench },
    { id: 6, label: 'Pets', value: 'pets', icon: IMAGES.ic_hammer_wrench },
    { id: 8, label: 'Homecare', value: 'homecare', icon: IMAGES.ic_hammer_wrench },
];

export const SERVICES_DATA = [
    { id: 1, name: 'Furniture Assembly' },
    { id: 2, name: 'Interior Painting' },
    { id: 3, name: 'Interior Painting' },
    { id: 4, name: 'Interior Painting' },
    { id: 5, name: 'Interior Painting' },
    { id: 6, name: 'Interior Painting' },
    { id: 7, name: 'Interior Painting' },
    { id: 8, name: 'Interior Painting' }
];

export const formatDecimalInput = (text: string, decimalLimit: number = 2): string => {
    // Allow digits and dot only
    let cleaned = text.replace(/[^0-9.]/g, '');

    // Prevent dot as first character
    if (cleaned.startsWith('.')) {
        cleaned = cleaned.substring(1);
    }

    // Allow only one dot
    const parts = cleaned.split('.');
    if (parts.length > 2) {
        cleaned = parts[0] + '.' + parts[1];
    }

    // Limit decimal places
    if (parts[1]?.length > decimalLimit) {
        cleaned = parts[0] + '.' + parts[1].slice(0, decimalLimit);
    }

    return cleaned;
};