import { log } from './logger.ts';

export interface MessageType {
    type?: string;
    message?: string;
    property?: string;
    payload?: object | string;
    moduleName?: string;
    source?: string;
}

export const subscribeToExtensionMessages = (
    handler: (message: MessageType) => void,
    moduleName: string
) => {
    chrome.runtime.onMessage.addListener(handler);
    log({
        logType: 'SUBSCRIBED TO EXTENSION MESSAGES',
        moduleName,
    });
    return handler;
};

export const subscribeToWindowMessages = (
    eventHandler: (event: MessageEvent<MessageType>) => void
) => {
    window.addEventListener('message', eventHandler);
};

export const sendMessageToBackgroundAndPopup = (message: MessageType): void => {
    chrome.runtime.sendMessage(message);
    log({
        logType: 'MESSAGE SENT',
        moduleName: message.moduleName,
        payload: message,
    });
};

export const sendMessageToContent = (message: MessageType): void => {
    // todo - send to all inactive tabs?
    // todo - or just manage settings in background and shuttle everywhere?
    // check url match - might need to provide array of diff monster domains
    // add monsterboard
    // add query e.g. {url: '*://*.monster.co.uk/*'}
    // chrome.tabs.query({url: "*://*.example.com/*"}, function(tabs) {
    chrome.tabs.query(
        {
            url: [
                '*://*.monster.com/*',
                '*://*.monster.de/*',
                // todo
            ],
        },
        function (tabs) {
            tabs.forEach((tab) => {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, message);
                }
            });
        }
    );

    log({
        logType: 'MESSAGE SENT',
        payload: message,
        moduleName: message.moduleName,
    });
};
