import { ESprite } from "../../game/resources";

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
    image: ESprite;
    status: 'pocket' | 'inventory';
};

export type TInventory = {
    slots: TItem[];
}

export enum EMemberStatus {
    none = 'none',
    member = 'member',
    creator = 'creator'
}
export type TMember = Omit<TUser, 'token'> & {
    status: EMemberStatus;
}

export enum ELobbyStatus {
    open = 'open',
    startGame = 'start game'
}
export type TLobby = {
    id: number;
    name: string;
    status: ELobbyStatus;
    members: TMember[];
}

export type TLobbies = TLobby[];
export type TLobbiesResponse = {
    lobbies: TLobbies;
    hash: string;
}

type TPoint = {
    x: number,
    y: number
}
export type TGameObject = {
    id: number,
    image: ESprite,
    position: TPoint,
    velocity: TPoint,
    radius: number,
    angle: number
}

export type TUpdateSceneResponse = {
    scene: TGameObject[];
    hash: string;
}