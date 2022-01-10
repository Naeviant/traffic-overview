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
    data: (Event | CCTV | VMSGroup)[];
}

export interface Event {
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
    reason: string;
}

export interface CCTV {
    id: number;
    description: string;
    lat: number;
    long: number;
    url: string;
    available: boolean;
}

export interface VMSGroup {
    id: null;
    address: string;
    lat: number;
    long: number;
    vms: VMS | null;
    sig: SIG[];
}

export interface VMS {
    address: string;
    lat: number;
    long: number;
    rows: number;
    cols: number;
    message: string;
}

export interface SIG {
    address: string;
    lat: number;
    long: number;
    code: string;
    slip: boolean;
}

export enum SIGCode {
   BLANK,
   UNUSED_CODE_1,
   NATIONAL_SPEED_LIMIT,
   END_OF_RESTRICTIONS,
   LANE_CLOSED,
   SPEED_LIMIT_20,
   SPEED_LIMIT_30,
   SPEED_LIMIT_40,
   SPEED_LIMIT_50,
   SPEED_LIMIT_60,
   SPEED_LIMIT_70,
   SPEED_LIMIT_80,
   SPEED_LIMIT_100,
   SPEED_LIMIT_120,
   MOVE_RIGHT,
   DO_NOT_USE_HARDSHOULDER,
   MOVE_LEFT,
   LEAVE_AT_NEXT_EXIT_ON_LEFT,
   UNUSED_CODE_18,
   UNUSED_CODE_19,
   UNUSED_CODE_20,
   LANE_1_OPEN_LANE_2_CLOSED,
   LANE_1_CLOSED_LANE_2_OPEN,
   LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_OPEN,
   LANE_1_CLOSED_LANE_2_OPEN_LANE_3_OPEN,
   LANE_1_OPEN_LANE_2_CLOSED_LANE_3_CLOSED,
   LANE_1_OPEN_LANE_2_OPEN_LANE_3_CLOSED,
   LANE_OPEN_WHITE,
   LEAVE_AT_NEXT_EXIT_ON_RIGHT,
   FOG,
   QUEUE,
   LANE_1_OPEN_LANE_2_OPEN_LANE_3_OPEN_LANE_4_CLOSED,
   LANE_1_OPEN_LANE_2_OPEN_LANE_3_CLOSED_LANE_4_CLOSED,
   LANE_1_OPEN_LANE_2_CLOSED_LANE_3_CLOSED_LANE_4_CLOSED,
   LANE_1_CLOSED_LANE_2_OPEN_LANE_3_OPEN_LANE_4_OPEN,
   LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_OPEN_LANE_4_OPEN,
   LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_CLOSED_LANE_4_OPEN,
   SMART_SPEED_LIMIT_20,
   SMART_SPEED_LIMIT_30,
   SMART_SPEED_LIMIT_40,
   SMART_SPEED_LIMIT_50,
   SMART_SPEED_LIMIT_60,
   SMART_SPEED_LIMIT_70,
   SMART_SPEED_LIMIT_80,
   SMART_SPEED_LIMIT_100,
   SMART_SPEED_LIMIT_120,
   TEST_1,
   TEST_2,
   TEST_3,
   UNUSED_CODE_49,
   UNUSED_CODE_50,
   UNUSED_CODE_51,
   UNUSED_CODE_52,
   UNUSED_CODE_53,
   UNUSED_CODE_54,
   LANE_1_CLOSED,
   LANE_1_CLOSED_LANE_2_CLOSED,
   LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_CLOSED,
   LANE_1_CLOSED_LANE_2_CLOSED_LANE_3_CLOSED_LANE_4_CLOSED,
   UNUSED_CODE_59,
   LANE_OPEN_GREEN,
}