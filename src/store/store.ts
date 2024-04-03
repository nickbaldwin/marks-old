import { create } from 'zustand';
import zukeeper from 'zukeeper';
import { DisplayJob, transformJobs } from '../schema/transform';

interface ResultsData {
    timestamp: string;
    size: number;
    jobIds: string[];
}

interface State {
    bears: number;
    increase: (by: number) => void;

    resultsSize: number;
    results: DisplayJob[];
    resultsLast: ResultsData | null;
    resultsHistory: ResultsData[];
    updateResults: (add: ResultsData) => void;

    url: string;
    urlHistory: string[];
    updateUrl: (to: string) => void;
}

export const useStore = create<State>()(
    // todo - config for devtools
    // @ts-expect-error any
    zukeeper((set) => ({
        bears: 0,

        results: [],
        resultsSize: 0,
        resultsLast: null,
        resultsHistory: [],

        url: '',
        urlHistory: [],

        increase: (by: number) =>
            set((state: { bears: number }) => ({ bears: state.bears + by })),
        updateResults: (payload: object) => {
            const results = {
                timestamp: new Date().toISOString(), // todo send in
                // @ts-expect-error todo typing
                size: payload?.jobResults?.length || 0,
                jobIds:
                    // @ts-expect-error todo typing
                    payload?.jobResults?.map(
                        (j: { jobId: string }) => j.jobId
                    ) || [],
            };
            console.log(results);

            // @ts-expect-error ugh
            const displayJobs = transformJobs(payload?.jobResults || []);
            console.log(displayJobs);
            set((state: { resultsHistory: ResultsData[] }) => ({
                results: displayJobs,
                resultsHistory: [...state.resultsHistory, results],
                resultsSize: results.size,
                resultsLast: results,
            }));
        },
    }))
);

// todo - config for devtools
// note this is not exposed in top frame - need to select extension frame in order
// to access this in devtools
// @ts-expect-error global property
window.store = useStore;
