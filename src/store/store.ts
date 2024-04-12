import { create } from 'zustand';
import { includeChromeStore } from 'zustand-chrome-local-storage';
import zukeeper from 'zukeeper';
import { v4 as uuid } from 'uuid';

// import { subscribeWithSelector } from 'zustand/middleware';

export interface CommonInfo {
    id: string;
    version: number;
    createdAt: number;
    updatedAt: number;
    title: string;
    description: string;
}

export interface UrlInfo {
    url: string;
    originalTitle: string;
    originalDescription: string;
}

export interface MarkInfo {
    domain: string;
    originalDomain: string;
    favIconUrl: string;
    imageUrl: string;
    bgColor: string;
}

export interface List {
    list: Array<string>;
}

export class Mark {
    id: string;
    url: string;
    originalTitle: string;
    originalDescription: string;

    constructor(urlInfo: UrlInfo) {
        this.id = uuid();
        this.url = urlInfo.url;
        this.originalTitle = urlInfo.originalTitle;
        this.originalDescription = urlInfo.originalDescription;
    }
}

export interface Collection {
    id: string;
}

export interface Folder {
    id: string;
}

export interface MarksMap {
    [key: string]: Mark;
}

export interface CollectionsMap {
    [key: string]: Collection;
}

export interface FoldersMap {
    [key: string]: Folder;
}

export type MarksList = Array<string>;

export type CollectionsList = Array<string>;

export type FoldersList = Array<string>;

export interface Data {}

interface State {
    bears: number;
    increase: (by: number) => void;

    results: string[];
    updateResults: (add: string) => void;

    marksList: MarksList;
    marksMap: MarksMap;
    addMark: (add: UrlInfo) => void;
    removeMark: (id: string) => void;

    collectionsList: CollectionsList;
    collectionsMap: CollectionsMap;
    addCollections: (add: Collection) => void;

    foldersList: FoldersList;
    foldersMap: FoldersMap;
    addFolders: (add: Folder) => void;
}

export const useStore = create<State>()(
    // subscribeWithSelector(
    includeChromeStore(
        // todo - config for devtools
        // @ts-expect-error any
        zukeeper((set) => ({
            bears: 0,
            increase: (by: number) =>
                set((state: { bears: number }) => ({
                    bears: state.bears + by,
                })),

            results: [],
            updateResults: (add: string) => {
                set((state: { results: string[] }) => ({
                    results: [...state.results, add],
                }));
            },

            marksList: [],
            marksMap: {},
            // todo - check for uuid collision first
            addMark: (add: UrlInfo) => {
                const mark = new Mark(add);
                set((state: { marksList: string[]; marksMap: MarksMap }) => ({
                    marksList: [...state.marksList, mark.id],
                    marksMap: {
                        ...state.marksMap,
                        [mark.id]: mark,
                    },
                }));
            },
            removeMark: (id: string) => {
                set((state: { marksList: string[]; marksMap: MarksMap }) => {
                    if (!state.marksMap[id]) {
                        return state;
                    } else {
                        const i = state.marksList.indexOf(id);
                        const list = [...state.marksList];
                        if (i > -1) {
                            list.splice(i, 1);
                        }
                        const map = { ...state.marksMap };
                        delete map[id];
                        return {
                            marksList: list,
                            marksMap: map,
                        };
                    }
                });
            },
        }))
    )
    // )
);

// todo - config for devtools
// note this is not exposed in top frame - need to select extension frame in order
// to access this in devtools
// @ts-expect-error global property
window.store = useStore;
