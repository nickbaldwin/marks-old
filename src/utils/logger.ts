const appName = 'MJSE';
export const isLog: boolean = true;

export interface Log {
    logType: string;
    moduleName?: string;
    fn?: string;
    message?: string;
    payload?: object;
    error?: object | string;
}

export const log = (log: Log): void => {
    if (isLog) {
        const t = new Date();
        console.group(appName + ': ' + log.logType);
        console.log(
            log.moduleName +
                (log.fn ? ': ' + log.fn : '') +
                ' @ ' +
                t.toLocaleTimeString() +
                t.getMilliseconds()
        );
        if (log.message) {
            console.log(log.message);
        }
        if (log.payload) {
            console.log(log.payload);
        }
        if (log.error) {
            console.log(log.error);
        }
        console.groupEnd();
    }
};

export const print = (message: string): void => {
    console.log(` ==> ${message}\n\n`);
};
