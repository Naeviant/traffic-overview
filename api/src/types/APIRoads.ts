export interface APIJunctionSection {
    id: number,
    order: number | null,
    direction: string | null,
    roadName: string | null,
    downStreamJunctionId: number | null,
    downStreamJunctionApproachRoad: string | null,
    downStreamJunctionApproachDirection: string | null,
    downStreamJunctionDescription: string | null,
    downStreamJunctionDestination: string | null,
    upStreamJunctionId: number | null,
    upStreamJunctionApproachRoad: string | null,
    upStreamJunctionApproachDirection: string | null,
    upStreamJunctionDescription: string | null,
    upStreamJunctionDestination: string | null,
    links: {
        id: number,
        roadId: number,
        length: number,
        sectionId: number,
        sectionOrder: number,
        direction: string,
        linkName: string,
        roadName: string,
        m6TollPromoLink: boolean,
        speedLimit: number,
        speed: unknown,
        flow: unknown,
        journeyTime: unknown,
        lastUpdated: unknown,
        latitude: unknown,
        longitude: unknown
    }[] | null,
    avgSpeed: number
}

export interface APIRoads {
    [key: string]: {
        [key: string]: {
            junctionName: string;
            roadName: string;
            primaryDirection: string;
            secondaryDirection: string;
            primaryUpstreamJunctionSection: APIJunctionSection;
            primaryDownstreamJunctionSection: APIJunctionSection;
            secondaryUpstreamJunctionSection: APIJunctionSection;
            secondaryDownstreamJunctionSection: APIJunctionSection;
            primaryDirectionDescription: string;
            secondaryDirectionDescription: string;
            availableInPrimaryDirection: boolean;
            availableInSecondaryDirection: boolean;
            circularRoad: false;
        }
    };
}
