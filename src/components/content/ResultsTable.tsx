import { ResultRow } from './ResultsRow.tsx';

export const ResultsTable = ({ results }: { results: string[] }) => {
    return results.map((r: string, pos: number) => {
        return <ResultRow pos={pos} result={r} />;
    });
};
