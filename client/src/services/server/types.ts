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
    exchange_lot_id: number | null;
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

export enum EItemStatus {
    pocket = 'pocket',
    inventory = 'inventory',
    exchange = 'exchange'
}

export type TItem = {
    id: number;
    name: string;
    image: ESprite;
    status: EItemStatus;
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

export type TLot = {
    id: number;
    sellerId: number;
    sellerName: string;
    sellItem: Omit<TItem, 'status'>
    needItem: Omit<TItem, 'status'>
}

export type TUpdateExchangerResponse = {
    lots: TLot[];
    hash: string;
}

export enum EItemAction{
    equip = "equip",
    unequip = "unequip",
    exchange = "exchange"
}