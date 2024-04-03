import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from '../components/popup/Popup.tsx';
import { log } from '../utils/logger.ts';

const moduleName = 'popup script';
log({ logType: 'info', moduleName, message: 'loaded' });

const root: HTMLElement | null = document.getElementById('popup-root');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <Popup />
        </React.StrictMode>
    );
}
