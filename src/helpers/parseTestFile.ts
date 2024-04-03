import Papa from 'papaparse';

const options = {
    header: true,
    dynamicTyping: true,
    complete: function (results: any) {
        return results;
    },
};

export const parseTestFile = (csvString: string) => {
    return Papa.parse(csvString, options);
};

export const getDataFromSample = (csvString: string) => {
    let result = parseTestFile(csvString);
    if (result?.data?.length) {
        let data = result.data[0];
        // @ts-ignore
        if (!data.No) {
            // @ts-ignore
            data.No = 0;
        }
        return data;
    }
    return null;
};
