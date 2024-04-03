export const ResultRow = ({ result, pos }: { result: string; pos: number }) => (
    <div key={result}>
        <p>
            {pos} - {result}
        </p>
    </div>
);
