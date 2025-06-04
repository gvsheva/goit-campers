export interface GalleryImage {
    thumb: string;
    original: string;
}

export interface CamperReview {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export const allCamperTypes = [
    "alcove",
    "fullyIntegrated",
    "panelTruck",
] as const;
export type CamperType = (typeof allCamperTypes)[number];

export const allCamperTransmissions = ["automatic", "manual"] as const;
export type CamperTransmission = (typeof allCamperTransmissions)[number];

export const allCamperEngines = ["diesel", "hybrid", "petrol"] as const;
export type CamperEngine = (typeof allCamperEngines)[number];

export const allCamperFeatures = [
    "AC",
    "bathroom",
    "kitchen",
    "TV",
    "radio",
    "refrigerator",
    "microwave",
    "gas",
    "water",
] as const;
export type CamperFeature = (typeof allCamperFeatures)[number];

export interface Camper extends Record<CamperFeature, boolean> {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: CamperType;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: CamperTransmission;
    engine: CamperEngine;

    gallery: GalleryImage[];
    reviews: CamperReview[];
}
