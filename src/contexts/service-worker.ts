import { log } from '../utils/logger.ts';

const moduleName = 'service-worker script';
log({ logType: 'info', moduleName, message: 'loaded' });

chrome.action.onClicked.addListener((tab) => {
    console.log('clicked', tab.url);
    chrome.tabs.create(
        { url: chrome.runtime.getURL('src/contexts/popup.html') },
        function (tab) {
            console.log('tab opened', tab.id);
        }
    );
});
