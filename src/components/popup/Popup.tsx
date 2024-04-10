import { Dispatch, SetStateAction, useState } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';

import './Popup.css';

const Popup = (): JSX.Element => {
    interface Mark {
        title: string;
        url: string;
        favIconUrl: string;
        domain: string;
    }

    const [isError, setIsError] = useState(false);
    const [mark, setMark] = useState<Mark | null>(null);
    const [marks, setMarks, isPersistent, error, isInitialStateResolved]: [
        marks: Mark[],
        setMarks: Dispatch<SetStateAction<Mark[]>>,
        isPersistent: boolean,
        error: string,
        isInitialStateResolved: boolean,
    ] = useChromeStorageLocal('marksv1', [] as Mark[]);

    const addTab = async (): Promise<void> => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', title = '', favIconUrl = '' } = tab;
        const domain = new URL(url).hostname;
        console.log(url, title, favIconUrl, domain);

        setMarks((marks) => [...marks, { url, title, favIconUrl, domain }]);

        console.log(
            'marks',
            marks,
            isPersistent,
            error,
            isInitialStateResolved
        );

        if (error) {
            console.log('error', error, url);
            setIsError(true);
        } else setMark({ url, title, favIconUrl, domain });
        setIsError(false);
    };

    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <button onClick={addTab}>Add this tab to bookmarks</button>
            <div className="container">
                {mark ? 'Success!' : ''}
                {isError || error ? 'error!' : ''}
            </div>
        </>
    );
};

export default Popup;
