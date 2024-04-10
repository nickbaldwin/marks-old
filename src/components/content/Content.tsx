import { Dispatch, SetStateAction } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';

import './Popup.css';

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

    const addTab = async () => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', title = '', favIconUrl = '' } = tab;
        const domain = new URL(url).hostname;
        console.log(url, title, favIconUrl, domain);

        setMarks((marks) => [...marks, { url, title, favIconUrl, domain }]);
        if (error) {
            console.log('error', error, url);
        }
        console.log(
            'marks',
            marks,
            isPersistent,
            error,
            isInitialStateResolved
        );
    };

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

            <button onClick={addTab}>Add this tab to bookmarks</button>
            <div className="container">
                <p>Bookmarks</p>
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
