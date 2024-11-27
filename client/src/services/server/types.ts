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
export type TUsers = TUser[];

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
};

export type TInventory = {
    inventory: TItem[];
    equipment: TItem[];
}

export type TLobby = {
    id: number;
    name: string;
    creator: string;
}

export type TLobbyResponse = {
    users: TUsers;
    hash: string;
}

export type TLobbies = TLobby[];
export type TLobbiesResponse = {
    lobbies: TLobbies;
    hash: string;
}

export type TGroup = TLobby & {users: TUsers};
export type TGroupParams = {
    id?: number;
    name?: string;
    creator?: string;
    users?: TUsers;
}