import { Dispatch, SetStateAction } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';

import './Content.css';

const Content = (): JSX.Element => {
    interface Mark {
        title: string;
        url: string;
        favIconUrl: string;
        domain: string;
    }

    const [marks, setMarks, isPersistent, error, isInitialStateResolved]: [
        marks: Mark[],
        setMarks: Dispatch<SetStateAction<Mark[]>>,
        isPersistent: boolean,
        error: string,
        isInitialStateResolved: boolean,
    ] = useChromeStorageLocal('marksv1', [] as Mark[]);

    const removeTab = async (pos: number) => {
        const mark = marks[pos];
        console.log('to remove: ', mark);

        setMarks((marks) => [...marks.slice(0, pos), ...marks.slice(pos + 1)]);
        if (error) {
            console.log('error', error);
        }
        console.log(
            'marks',
            marks,
            isPersistent,
            error,
            isInitialStateResolved
        );
    };

    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <div className="container">
                {marks.map((mark, _i) => (
                    <div key={_i} className="card">
                        {mark.title}
                        <br />
                        &nbsp;
                        <br />
                        <a href={mark.url}>{mark.domain}</a>
                        <br />
                        <button onClick={() => removeTab(_i)}>remove</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Content;
