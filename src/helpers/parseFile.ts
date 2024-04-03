import Papa from 'papaparse';
import {
    Data,
    displayCampaignHeaders,
    displayCampaignRecord,
    fold,
    transformData,
} from './processDecision.ts';

let count = 0;
let arr: Data[] = [];
const options = {
    header: true,
    dynamicTyping: true,
    step: function (results: { data: Data; errors: any }) {
        console.log('Row:', results.data);
        count++;
        arr.push(results.data);
    },
    complete: function () {
        console.log('complete');
        console.log(count);
        console.log(arr);
    },
};

export const parseFile = (file: any) => {
    console.log('parsing');
    return Papa.parse(file, options);
};

export async function processCsv(file: any) {
    const csvData = await new Promise((resolve) => {
        let count = 0;
        let dates = [];
        let currentDate = '';
        let currentDay = 0;
        let days = {};
        let total = null;

        let clickTimes = [];
        let decisionClickTimes = [];
        let cpc = 0;

        let data = [];
        let processedData = [];
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            step: function (result) {
                if (result.errors.length) {
                    return;
                }
                const resultDate = result.data.Dec_Timestamp.split(' ')[0];
                count++;
                if (resultDate !== currentDate) {
                    currentDate = resultDate;
                    dates.push(currentDate);
                    currentDay++;
                }
                data.push(result.data);
                if (result.data.cpc && result.data.cpc !== 0) {
                    cpc = result.data.cpc;
                }
                const processed = {
                    ...transformData({ data: result.data }),
                    day: currentDay,
                };
                processedData.push({ ...processed });

                if (!days[currentDay]) {
                    days[currentDay] = { ...processed };
                } else {
                    days[currentDay] = fold(days[currentDay], processed);
                }
                if (!total) {
                    total = {
                        ...processed,
                    };
                } else {
                    total = {
                        ...fold(total, processed),
                        cpc,
                    };
                }

                if (result.data.isbillable) {
                    clickTimes.push(result.data.Cli_Timestamp);
                    decisionClickTimes.push(result.data.Dec_Timestamp);
                }
            },
            complete: function (results, file) {
                const formattedDays = [];
                Object.values(days).forEach((day) => {
                    formattedDays.push(displayCampaignRecord(day));
                });
                resolve({
                    count,
                    data,
                    processedData,
                    days,
                    total,
                    formattedTotal: displayCampaignRecord(total),
                    formattedDays,
                    headers: displayCampaignHeaders(),

                    clickTimes,
                    decisionClickTimes,
                });
            },
        });
    });
    return csvData;
}
