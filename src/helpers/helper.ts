export const removeItemFromArray = <T>(
    array: Array<T>,
    pos: number
): Array<T> => [...array.slice(0, pos), ...array.slice(pos + 1)];
