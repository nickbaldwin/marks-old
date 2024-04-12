import { MarksList, MarksMap, useStore } from '../../store/store.ts';

import './Content.css';

const Content = (): JSX.Element => {
    const marksList: MarksList = useStore((state) => state.marksList);

    const marks: MarksMap = useStore((state) => state.marksMap);
    const addMark = useStore((state) => state.addMark);
    const removeMark = useStore((state) => state.removeMark);

    const bears = useStore((state) => state.bears);
    const inc = useStore((state) => state.increase);

    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <div className="container">
                {marksList.map((id: string, _i: number) => (
                    <div key={_i} className="card">
                        {marks[id].id}
                        <br />
                        {marks[id].originalTitle}
                        <br />
                        &nbsp;
                        <br />
                        <a href={marks[id].url}>{marks[id].url}</a>
                        <br />
                        <button onClick={() => removeMark(id)}>remove</button>
                    </div>
                ))}
                <button
                    onClick={() =>
                        addMark({
                            originalTitle: 'Google',
                            originalDescription: 'Search engine',
                            url: 'https://www.google.com',
                        })
                    }
                >
                    add mark
                </button>
            </div>
            <p>bears: {bears}</p>
            <button onClick={() => inc(1)}>increase</button>
        </>
    );
};

export default Content;
