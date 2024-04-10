import React from 'react';
import ReactDOM from 'react-dom/client';

import Content from '../components/content/Content.tsx';
import { log } from '../utils/logger.ts';

const moduleName = 'popup script';
log({ logType: 'info', moduleName, message: 'loaded' });

const root: HTMLElement | null = document.getElementById('content-root');
if (root) {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <Content />
        </React.StrictMode>
    );
}
