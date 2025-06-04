export interface GalleryImage {
    thumb: string;
    original: string;
}

export interface CamperReview {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
}

export type CamperType = "alcove" | "fullyIntegrated" | "panelTruck";
export type CamperTransmission = "automatic" | "manual";
export type CamperEngine = "diesel" | "hybrid" | "petrol";
export type CamperFeature =
    | "AC"
    | "bathroom"
    | "kitchen"
    | "TV"
    | "radio"
    | "refrigerator"
    | "microwave"
    | "gas"
    | "water";

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
