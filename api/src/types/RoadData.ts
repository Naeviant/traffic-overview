export interface RoadData {
    road: string;
    primaryDirection: string;
    secondaryDirection: string;
    primaryDirectionSections: (Junction | Section)[];
    secondaryDirectionSections: (Junction | Section)[];
    circularRoad: boolean;
};

export interface Junction {
    name: string;
    destination: string;
}

export interface Section {
    id: number;
    subsections: number[];
    speed: number;
    length: number;
    speedLimits: number[];
    data: [];
}