export interface RoadData {
    road: string;
    dataTimestamp: number;
    primaryDirection: string;
    secondaryDirection: string;
    primaryDirectionSections: (Junction | Section)[];
    secondaryDirectionSections: (Junction | Section)[];
    circularRoad: boolean;
};

export interface Junction {
    interface: 'JUNCTION';
    payload: {
        name: string;
        destination: string;
    };
}

export interface Section {
    interface: 'SECTION';
    payload: {
        id: number;
        subsections: number[];
        speed: number;
        length: number;
        speedLimits: number[];
        data: (Event | CCTV | VMSGroup)[];
    };
}

export interface Event {
    interface: 'EVENT';
    payload: {
        id: string;
        type: string;
        severity: string;
        lat: number;
        long: number;
        startTimestamp: number;
        endTimestamp: number;
        lanes: {
            laneName: string;
            laneStatus: string;
        }[];
        reason: string | null;
    };
}

export interface CCTV {
    interface: 'CCTV';
    payload: {
        id: number;
        description: string;
        lat: number;
        long: number;
        linkId: number;
        chainage: number;
        url: string;
        image: string;
        available: boolean;
    };
}

export interface VMSGroup {
    interface: 'VMS';
    payload: {
        id: null;
        address: string;
        lat: number;
        long: number;
        linkId: number;
        chainage: number;
        vms: VMS | null;
        sig: SIG[];
    };
}

export interface VMS {
    address: string;
    lat: number;
    long: number;
    rows: number;
    cols: number;
    code: string;
    message: string;
}

export interface SIG {
    address: string;
    lat: number;
    long: number;
    code: string;
    type: string;
    slip: boolean;
}