export type TError = {
    code: number;
    text: string;
}

export type TAnswer<T> = {
    result: 'ok' | 'error';
    data?: T;
    error?: TError;
}

export type TUser = {
    id: number;
    token: string;
    name: string;
}

export type TMessage = {
    message: string;
    author: string;
    created: string;
}

export type TMessages = TMessage[];
export type TMessagesResponse = {
    messages: TMessages;
    hash: string;
}

export type TItem = {
    id: number;
    name: string;
    status: 'pocket' | 'inventory';
};

export type TInventory = TItem[];

export type TMember = Omit<TUser, 'token'> & {
    creator: boolean;
}

export type TLobby = {
    id: number;
    name: string;
    members: TMember[];
}

export type TLobbies = TLobby[];
export type TLobbiesResponse = {
    lobbies: TLobbies;
    hash: string;
}