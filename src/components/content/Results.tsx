import { useStore } from '../../store/store.ts';
import { ResultsTable } from './ResultsTable.tsx';

export const Results = () => {
    const resultsSize = useStore((state) => state.resultsSize);
    const results = useStore((state) => state.results);
    const bears = useStore((state) => state.bears);
    const inc = useStore((state) => state.increase);

    return (
        <>
            <p>There are {resultsSize} results</p>
            <p>But there are {bears} bears!</p>
            <button onClick={() => inc(1)}>add a bear</button>
            <ResultsTable results={results} />
        </>
    );
};
