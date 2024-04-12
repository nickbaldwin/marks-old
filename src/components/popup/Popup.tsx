import { useState } from 'react';

import { useStore } from '../../store/store.ts';

import { parseUrl } from '../../helpers/domain.ts';
import './Popup.css';

const Popup = (): JSX.Element => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // const [mark, setMark] = useState<Mark | null>(null);

    const addMark = useStore((state) => state.addMark);

    const addTab = async (): Promise<void> => {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        const { url = '', title = '', favIconUrl = '' } = tab;

        // todo - deal with url errors
        const domain = parseUrl(url) || '';
        if (!domain) {
            setIsError(true);
            setErrorMessage('Invalid URL');
            return;
        }
        console.log(url, title, favIconUrl, domain);

        addMark({
            url,
            originalDescription: title,
            originalTitle: title,
        });
    };

    return (
        <>
            <h2>Marks - the useful bookmark manager</h2>
            <button onClick={addTab}>Add this tab to bookmarks</button>
            <div className="container">
                {isError ? 'error!' : ''}
                {isError ? errorMessage : ''}
            </div>
        </>
    );
};

export default Popup;
