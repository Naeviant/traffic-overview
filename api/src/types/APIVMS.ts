export interface APIVMS {
    id: number,
    guid: string,
    cols: number,
    rows: number,
    description: string,
    linkId: number,
    latitude: number,
    longitude: number,
    message: string,
    chainage: number,
    code: string | null,
    direction: string,
    road: string,
    type: string,
    genericType: string | null,
    geogAddr: string;
}

export interface APIVMSGroup {
    vmsList: APIVMS[];
}