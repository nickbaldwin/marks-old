export interface Data {
    No?: number;
    Dec_Timestamp: string;
    DecisionId?: string;
    JobId?: string;
    Dec_Timestamp_1?: string;
    DecisionId_1: string;
    AuctionCountry: string;
    AuctionType: string;
    AuctionEngine: string;
    AuctionPricing?: number;
    TargetingType: string;
    PlacementName: string;
    AdProvider: string;
    PlacementChannel: string;
    PlacementType: string;
    PlacementProperty: string;
    PlacementLocation: string;
    PlacementView: string;
    DistributionProvider: string;
    SearchPhrase: string;
    SearchLocation: string;
    JobId_1: string;
    Campaign_Name: string;
    SelectionType: string;
    Adrank: number;
    Imp_Timestamp: string;
    ImpressionId: string;
    Cli_Timestamp: string;
    ClickId: string;
    cpc: number;
    ecpm: number;
    RelevancyScore: number;
    rankscore: number;
    isbillable: string;
    revenue: number;
}

export interface CampaignDay {
    day: number;
    date: string;
    cpc: number;
    searches: number;
    selections: number;
    impressions: number;
    billableClicks: number;
    spend: number;
    jobSearches: number;
    otherPlatform: number;
    email: number;
    distribution: number;
    monsterClicks: number;
    noTitleSearches: number;
    nationwideSearches: number;
    defaultCountry: number;
    countrySpecified: number;
    remote: number;
    stateSpecified: number;
    locationSpecified: number;
}

export const getNewDay = ({
    date = '',
    day = 0,
}: { date?: string; day?: number } = {}): CampaignDay => ({
    day: day || 0,
    date: date || '',
    cpc: 0,
    searches: 0,
    selections: 0,
    impressions: 0,
    billableClicks: 0,
    spend: 0,
    jobSearches: 0,
    otherPlatform: 0,
    email: 0,
    distribution: 0,
    monsterClicks: 0,
    nationwideSearches: 0,
    defaultCountry: 0,
    countrySpecified: 0,
    remote: 0,
    stateSpecified: 0,
    locationSpecified: 0,
    noTitleSearches: 0,
});

export interface Info {
    decisions: number;
    firstTimeStamp: string;
    lastTimeStamp: string;
    days: string[];
    firstDay: string;
    lastDay: string;
    name: string;
}

export interface Campaign {
    days: Record<number, CampaignDay> | null;
    total: CampaignDay | null;
    info: Info;
}

export const getNewCampaign = () => ({
    days: null,
    total: null,
    info: {
        name: 'new',
        decisions: 0,
        firstTimeStamp: '',
        lastTimeStamp: '',
        days: [],
        firstDay: '',
        lastDay: '',
    },
});

export const getTimes = (timeStamp: string) => {
    const day = timeStamp.split(' ')[0];
    return { timeStamp: day + ':' + timeStamp.split(' ')[1], day };
};

export const addDataToDay = ({
    data,
    day,
}: {
    data: Data;
    day: CampaignDay;
}) => {
    day.searches++;
    if (data.SelectionType === 'WINNER') {
        day.selections++;
    }
    if (data.ImpressionId) {
        day.impressions++;
    }
    day.cpc = (day.cpc * (day.searches - 1) + data.cpc) / day.searches;
    data.isbillable ? day.billableClicks++ : undefined;
    day.spend += data.revenue;
    if (data.PlacementType === 'JOB_SEARCH') {
        day.jobSearches++;
    } else if (data.PlacementType === 'OTHER_PLATFORM') {
        day.otherPlatform++;
    } else if (data.PlacementType === 'EMAIL') {
        day.email++;
    } else if (data.PlacementType === 'DISTRIBUTION') {
        day.distribution++;
    }
    if (data.isbillable && data.PlacementType !== 'DISTRIBUTION') {
        day.monsterClicks++;
    }
    // todo add variations
    if (data.SearchLocation === 'United States') {
        day.countrySpecified++;
        day.nationwideSearches++;
    }
    if (data.SearchLocation === 'US') {
        day.defaultCountry++;
        day.nationwideSearches++;
    }

    if (data.SearchLocation === 'Remote') {
        day.remote++;
    }

    // todo no titles

    return day;
};

export const processDecision = ({
    campaign,
    decision,
}: {
    campaign: Campaign;
    decision: Data;
}) => {
    const { timeStamp, day } = getTimes(decision.Dec_Timestamp);
    // check for new campaign
    if (campaign.info.firstTimeStamp === '' || campaign.days === null) {
        campaign.info.firstTimeStamp = timeStamp;
        campaign.info.firstDay = day;
        campaign.info.days.push(day);
        campaign.days = {
            1: addDataToDay({
                data: decision,
                day: getNewDay({ date: day, day: 1 }),
            }),
        };
        campaign.total = addDataToDay({
            data: decision,
            day: getNewDay({ date: day, day: 1 }),
        });
    }
    campaign.info.decisions++;
    campaign.info.lastTimeStamp = timeStamp;
    campaign.info.lastDay = day;

    // check for new day
    if (!campaign.info.days.includes(day)) {
        campaign.info.days.push(day);
        const duration = campaign.info.days.length;
        // @ts-ignore
        campaign.days[duration + 1] = addDataToDay({
            data: decision,
            day: getNewDay({ date: day, day: duration + 1 }),
        });
        campaign.total = addDataToDay({
            data: decision,
            day: getNewDay({ date: day, day: duration + 1 }),
        });
    }

    // todo existing day

    return campaign;
};

/*


Info.searches++;

const timeStamp = results.data.Dec_Timestamp;
const day = timeStamp.split(' ')[0]
if (!Info.firstTimeStamp) {
    Info.firstTimeStamp = timeStamp;
    Info.firstDay = day;
}
Info.lastTimeStamp = timeStamp;
Info.lastDay = day;

if (!Info.days[day]) {
    Info.days[day] = [];
}
Info.days[day].push(results.data);



if (results.data.SelectionType === 'WINNER') {
    Info.selections++;
}

if (results.data.ImpressionId) {
    Info.impressions++;
}

results.data.isbillable ? Info.billableClicks++ : undefined;

if (!Info.adProvider[results.data.AdProvider]) {
    Info.adProvider[results.data.AdProvider] = 1;
} else {
    Info.adProvider[results.data.AdProvider]++;
}

if (!Info.placement[results.data.PlacementType]) {
    Info.placement[results.data.PlacementType] = 1;
} else {
    Info.placement[results.data.PlacementType]++;
}

// todo remove quotes
if (!Info.searchPhrase[results.data.SearchPhrase]) {
    Info.searchPhrase[results.data.SearchPhrase] = 1;
} else {
    Info.searchPhrase[results.data.SearchPhrase]++;
}

if (!Info.searchLocation[results.data.SearchLocation]) {
    Info.searchLocation[results.data.SearchLocation] = 1;
} else {
    Info.searchLocation[results.data.SearchLocation]++;
}


}

 */

export const transformData = ({ data }: { data: Data }): CampaignDay => {
    // todo pass in date
    let day = getNewDay();
    day.date = data.Dec_Timestamp.split(' ')[0];
    day.searches = 1;

    if (data.SelectionType === 'WINNER') {
        day.selections++;
    }
    if (data.ImpressionId) {
        day.impressions++;
    }
    day.cpc = data.cpc;
    data.isbillable ? day.billableClicks++ : undefined;
    day.spend += data.revenue;
    if (data.PlacementType === 'JOB_SEARCH') {
        day.jobSearches++;
    } else if (data.PlacementType === 'OTHER_PLATFORM') {
        day.otherPlatform++;
    } else if (data.PlacementType === 'EMAIL') {
        day.email++;
    } else if (data.PlacementType?.match(/dist/i)) {
        day.distribution++;
    }
    if (data.isbillable && !data.PlacementType?.match(/dist/i)) {
        day.monsterClicks++;
    }
    // todo add variations
    const usa = [
        'United States',
        'united states',
        'unitedstates',
        'usa',
        'USA',
        'any',
        'all',
        'anywhere',
        'us',
    ];
    if (usa.includes(data.SearchLocation)) {
        day.countrySpecified++;
        day.nationwideSearches++;
    }
    if (data.SearchLocation === 'US') {
        day.defaultCountry++;
        day.nationwideSearches++;
    }

    const remoteOnly = /^(remote|wfh|work from home|home office|any|anywhere|all) *$/i;

    const remote = / *(remote|wfh|work from home|home office|any|anywhere|all) */i;

    console.log('remote?', data.SearchPhrase, data.SearchLocation);
    if (
        // in case of zipcodes!
        ("" + data.SearchLocation)?.match(remote) ||
        data.SearchPhrase?.match(remote)
    ) {
        day.remote = 1;
    }

    if (
        !data.SearchPhrase ||
        data.SearchPhrase === '' ||
        data.SearchPhrase?.match(remoteOnly)

    ) {
        day.noTitleSearches = 1;
    }

// there are no titles or locations recorded for distribution, so don't count those
    if (data.PlacementType?.match(/distr/i)) {
        day.noTitleSearches = 0;
    }

    return day;
};

export const fold = (day1: CampaignDay, day2: CampaignDay): CampaignDay => {
    // todo pass in date
    let day = getNewDay();
    day.date = day2.date;
    day.day = day2.day;
    day.selections = day1.selections + day2.selections;
    day.cpc = day2.cpc;
    day.searches = day1.searches + day2.searches;
    day.selections = day1.selections + day2.selections;
    day.impressions = day1.impressions + day2.impressions;
    day.billableClicks = day1.billableClicks + day2.billableClicks;
    day.spend = day1.spend + day2.spend;
    day.jobSearches = day1.jobSearches + day2.jobSearches;
    day.otherPlatform = day1.otherPlatform + day2.otherPlatform;
    day.email = day1.email + day2.email;
    day.distribution = day1.distribution + day2.distribution;
    day.monsterClicks = day1.monsterClicks + day2.monsterClicks;
    day.noTitleSearches = day1.noTitleSearches + day2.noTitleSearches;
    day.nationwideSearches = day1.nationwideSearches + day2.nationwideSearches;
    day.defaultCountry = day1.defaultCountry + day2.defaultCountry;
    day.countrySpecified = day1.countrySpecified + day2.countrySpecified;
    day.remote = day1.remote + day2.remote;
    day.stateSpecified = day1.stateSpecified + day2.stateSpecified;
    day.locationSpecified = day1.locationSpecified + day2.locationSpecified;

    return day;
};

export const displayCampaignRecord = (day: CampaignDay) => [
    day.day,
    day.date,

    day.searches,
    day.selections,
    day.impressions,
    day.billableClicks,

    day.cpc,
    day.spend,

    day.jobSearches,
    day.otherPlatform,
    day.email,
    day.distribution,
    day.monsterClicks,

    day.noTitleSearches,
    day.nationwideSearches,
    day.defaultCountry,
    day.countrySpecified,
    day.remote,
    day.stateSpecified,
    day.locationSpecified,
];

export const displayCampaignHeaders = () => [
    'day',
    'date',
    'searches',
    'selections',
    'impressions',
    'b clicks',

    'cpc',
    'spend',

    'jobSearches',
    'otherPlatform',
    'email',
    'distribution',
    'monsterClicks',

    'noTitleSearches',
    'nationwideSearches',
    'defaultCountry',
    'countrySpecified',
    'remote',
    'stateSpecified',
    'locationSpecified',
];
