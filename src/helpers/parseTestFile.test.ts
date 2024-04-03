import { expect, test } from 'vitest';
import { parseTestFile, getDataFromSample } from './parseTestFile.ts';

test('convert csv to object', () => {
    const csv = 'isbillable,revenue\n' + 'TRUE, 1.99';
    expect(parseTestFile(csv).data).toEqual([
        {
            isbillable: true,
            revenue: 1.99,
        },
    ]);
});
test('convert csv to data object', () => {
    const csv =
        'Dec_Timestamp,DecisionId,JobId,Dec_Timestamp_1,DecisionId_1,AuctionCountry,AuctionType,AuctionEngine,AuctionPricing,TargetingType,PlacementName,AdProvider,PlacementChannel,PlacementType,PlacementProperty,PlacementLocation,PlacementView,DistributionProvider,SearchPhrase,SearchLocation,UserId,SelectionsRequested,TotalBids,Winners,JobId_1,Campaign_Name,SelectionType,Adrank,Imp_Timestamp,ImpressionId,Cli_Timestamp,ClickId,cpc,ecpm,RelevancyScore,rankscore,isbillable,revenue\n' +
        '2024-02-17 00:06:41.381000 UTC,6e84615bf7464f138e44304b4cde0457,6b4d0227-1f08-4ac3-85ad-4035826a02dd,2024-02-17 00:06:41.381000 UTC,6e84615bf7464f138e44304b4cde0457,US,AAAS,Kevel,1,GCTS,MOBILE:JOB_SEARCH,GCTS_ADQUERY,MOBILE,JOB_SEARCH,monster.com,JobSearchPage,CARD,,Remote,,z2ada79cd321d5df7f421aa93ae321fe3,50,42,39,6b4d0227-1f08-4ac3-85ad-4035826a02dd,Automotive Painter,WINNER,5,2024-02-17 00:06:42.310000 UTC,fc01af7557324ae3b3dd7dc9fdc268c7,,,2.35,47.283703,500,23641,,';
    expect(parseTestFile(csv).data).toEqual([
        {
            AdProvider: 'GCTS_ADQUERY',
            Adrank: 5,
            AuctionCountry: 'US',
            AuctionEngine: 'Kevel',
            AuctionPricing: 1,
            AuctionType: 'AAAS',
            Campaign_Name: 'Automotive Painter',
            Cli_Timestamp: null,
            ClickId: null,
            Dec_Timestamp: '2024-02-17 00:06:41.381000 UTC',
            Dec_Timestamp_1: '2024-02-17 00:06:41.381000 UTC',
            DecisionId: '6e84615bf7464f138e44304b4cde0457',
            DecisionId_1: '6e84615bf7464f138e44304b4cde0457',
            DistributionProvider: null,
            Imp_Timestamp: '2024-02-17 00:06:42.310000 UTC',
            ImpressionId: 'fc01af7557324ae3b3dd7dc9fdc268c7',
            JobId: '6b4d0227-1f08-4ac3-85ad-4035826a02dd',
            JobId_1: '6b4d0227-1f08-4ac3-85ad-4035826a02dd',
            PlacementChannel: 'MOBILE',
            PlacementLocation: 'JobSearchPage',
            PlacementName: 'MOBILE:JOB_SEARCH',
            PlacementProperty: 'monster.com',
            PlacementType: 'JOB_SEARCH',
            PlacementView: 'CARD',
            RelevancyScore: 500,
            SearchLocation: null,
            SearchPhrase: 'Remote',
            SelectionType: 'WINNER',
            SelectionsRequested: 50,
            TargetingType: 'GCTS',
            TotalBids: 42,
            UserId: 'z2ada79cd321d5df7f421aa93ae321fe3',
            Winners: 39,
            cpc: 2.35,
            ecpm: 47.283703,
            isbillable: null,
            rankscore: 23641,
            revenue: null,
        },
    ]);
});

test('convert sample data', () => {
    const csv =
        'Dec_Timestamp,DecisionId,JobId,Dec_Timestamp_1,DecisionId_1,AuctionCountry,AuctionType,AuctionEngine,AuctionPricing,TargetingType,PlacementName,AdProvider,PlacementChannel,PlacementType,PlacementProperty,PlacementLocation,PlacementView,DistributionProvider,SearchPhrase,SearchLocation,UserId,SelectionsRequested,TotalBids,Winners,JobId_1,Campaign_Name,SelectionType,Adrank,Imp_Timestamp,ImpressionId,Cli_Timestamp,ClickId,cpc,ecpm,RelevancyScore,rankscore,isbillable,revenue\n' +
        '2024-02-17 00:06:41.381000 UTC,6e84615bf7464f138e44304b4cde0457,6b4d0227-1f08-4ac3-85ad-4035826a02dd,2024-02-17 00:06:41.381000 UTC,6e84615bf7464f138e44304b4cde0457,US,AAAS,Kevel,1,GCTS,MOBILE:JOB_SEARCH,GCTS_ADQUERY,MOBILE,JOB_SEARCH,monster.com,JobSearchPage,CARD,,Remote,,z2ada79cd321d5df7f421aa93ae321fe3,50,42,39,6b4d0227-1f08-4ac3-85ad-4035826a02dd,Automotive Painter,WINNER,5,2024-02-17 00:06:42.310000 UTC,fc01af7557324ae3b3dd7dc9fdc268c7,,,2.35,47.283703,500,23641,,';
    expect(getDataFromSample(csv)).toEqual({
        AdProvider: 'GCTS_ADQUERY',
        Adrank: 5,
        AuctionCountry: 'US',
        AuctionEngine: 'Kevel',
        AuctionPricing: 1,
        AuctionType: 'AAAS',
        Campaign_Name: 'Automotive Painter',
        Cli_Timestamp: null,
        ClickId: null,
        Dec_Timestamp: '2024-02-17 00:06:41.381000 UTC',
        Dec_Timestamp_1: '2024-02-17 00:06:41.381000 UTC',
        DecisionId: '6e84615bf7464f138e44304b4cde0457',
        DecisionId_1: '6e84615bf7464f138e44304b4cde0457',
        DistributionProvider: null,
        Imp_Timestamp: '2024-02-17 00:06:42.310000 UTC',
        ImpressionId: 'fc01af7557324ae3b3dd7dc9fdc268c7',
        JobId: '6b4d0227-1f08-4ac3-85ad-4035826a02dd',
        JobId_1: '6b4d0227-1f08-4ac3-85ad-4035826a02dd',
        PlacementChannel: 'MOBILE',
        PlacementLocation: 'JobSearchPage',
        PlacementName: 'MOBILE:JOB_SEARCH',
        PlacementProperty: 'monster.com',
        PlacementType: 'JOB_SEARCH',
        PlacementView: 'CARD',
        RelevancyScore: 500,
        SearchLocation: null,
        SearchPhrase: 'Remote',
        SelectionType: 'WINNER',
        SelectionsRequested: 50,
        TargetingType: 'GCTS',
        TotalBids: 42,
        UserId: 'z2ada79cd321d5df7f421aa93ae321fe3',
        Winners: 39,
        cpc: 2.35,
        ecpm: 47.283703,
        isbillable: null,
        rankscore: 23641,
        revenue: null,

        No: 0,
    });
});

test('convert partial data... ', () => {
    const csv =
        'Dec_Timestamp,DecisionId,JobId\n' +
        '2024-02-17 00:06:41.381000 UTC,6e84615bf7464f138e44304b4cde0457,6b4d0227-1f08-4ac3-85ad-4035826a02dd';
    expect(getDataFromSample(csv)).toEqual({
        Dec_Timestamp: '2024-02-17 00:06:41.381000 UTC',
        DecisionId: '6e84615bf7464f138e44304b4cde0457',
        JobId: '6b4d0227-1f08-4ac3-85ad-4035826a02dd',

        No: 0,
    });
});
