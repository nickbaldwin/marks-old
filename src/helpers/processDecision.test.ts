import { expect, test } from 'vitest';
import {
    getNewCampaign,
    getTimes,
    processDecision,
    addDataToDay,
    getNewDay,
} from './processDecision.ts';
import {
    decision,
    convertedDecision,
    anotherDecision,
    anotherConvertedDecision,
} from './sampleData.ts';
test('new campaign correct', () => {
    const newCampaign = getNewCampaign();
    expect(newCampaign).toEqual({
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
});

test('new day correct', () => {
    const newDay = getNewDay({ day: 101, date: '12 Feb' });
    expect(newDay).toEqual({
        day: 101,
        date: '12 Feb',
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
});
test('get times correct', () => {
    const { timeStamp, day } = getTimes(decision.Dec_Timestamp);
    expect(timeStamp).toEqual('2024-03-08:16:38:26.095000');
    expect(day).toEqual('2024-03-08');
});

test('addDataToDay', () => {
    const newDay = getNewDay({ day: 1, date: '2024-03-08' });
    const campaign = addDataToDay({
        day: newDay,
        data: decision,
    });
    expect(campaign).toEqual({
        ...convertedDecision,
    });
});

test('addDataToAnotherDay', () => {
    const newDay = getNewDay({ day: 3, date: '2024-03-10' });
    const campaign = addDataToDay({
        day: newDay,
        data: anotherDecision,
    });
    expect(campaign).toEqual({
        ...anotherConvertedDecision,
    });
});

test('addDataToDay twice', () => {
    const newDay = getNewDay({ day: 1, date: '2024-03-08' });
    const campaign = addDataToDay({
        day: newDay,
        data: decision,
    });
    const updatedCampaign = addDataToDay({
        day: campaign,
        data: decision,
    });
    expect(updatedCampaign).toEqual({
        day: 1,
        date: '2024-03-08',
        cpc: 1.99,
        searches: 2,
        selections: 2,
        impressions: 2,
        billableClicks: 2,
        spend: 3.98,
        jobSearches: 2,
        otherPlatform: 0,
        email: 0,
        distribution: 0,
        monsterClicks: 2,
        nationwideSearches: 2,
        defaultCountry: 0,
        countrySpecified: 2,
        remote: 0,
        stateSpecified: 0,
        locationSpecified: 0,
        noTitleSearches: 0,
    });
});

test('processDecision', () => {
    const newCampaign = getNewCampaign();
    const campaign = processDecision({ campaign: newCampaign, decision });
    expect(campaign).toEqual({
        days: {
            1: {
                ...convertedDecision,
            },
        },
        total: {
            ...convertedDecision,
        },
        info: {
            name: 'new',
            decisions: 1,
            firstTimeStamp: '2024-03-08:16:38:26.095000',
            lastTimeStamp: '2024-03-08:16:38:26.095000',
            days: ['2024-03-08'],
            firstDay: '2024-03-08',
            lastDay: '2024-03-08',
        },
    });
});

test('processDecision 1 x 2, 3 x 1', () => {
    const newCampaign = getNewCampaign();
    const campaign = processDecision({ campaign: newCampaign, decision });
    const updatedCampaign = processDecision({ campaign, decision });
    const finalCampaign = processDecision({
        campaign: updatedCampaign,
        decision: anotherDecision,
    });
    expect(finalCampaign).toEqual({
        days: {
            1: {
                // todo: fix this!
                ...convertedDecision,
            },
            // todo: fix this!
            3: {
                ...anotherConvertedDecision,
            },
        },
        total: {
            // todo: fix this!
            ...anotherConvertedDecision,
        },
        info: {
            name: 'new',
            decisions: 3,
            firstTimeStamp: '2024-03-08:16:38:26.095000',
            lastTimeStamp: '2024-03-10:16:38:26.095000',
            // todo: fix this!
            days: ['2024-03-08', '2024-03-10'],
            firstDay: '2024-03-08',
            lastDay: '2024-03-10',
        },
    });
});
