import md5 from 'md5';
import CONFIG from "../../config";
import Store from "../store/Store";
import { TAnswer, TError, TMessagesResponse, TUser, TInventory, TLobbiesResponse, TUpdateSceneResponse, 
    TUpdateExchangerResponse,
    TItem,  } from "./types";

const { GAME_TIMESTAMP, LOBBY_LIST_TIMESTAMP, CHAT_TIMESTAMP, EXCHANGER_TIMESTAMP, HOST } = CONFIG;

class Server {
    HOST = HOST;
    store: Store;
    chatInterval: NodeJS.Timer | null = null;
    lobbyInterval: NodeJS.Timer | null = null;
    gameInterval: NodeJS.Timer | null = null;
    exchangerInterval: NodeJS.Timer | null = null;
    showErrorCb: (error: TError) => void = () => { };

    constructor(store: Store) {
        this.store = store;
    }

    // посылает запрос и обрабатывает ответ
    private async request<T>(method: string, params: { [key: string]: string } = {}): Promise<T | null> {
        try {
            const startTime = Date.now();
            params.method = method;
            const token = this.store.getToken();
            if (token) {
                params.token = token;
            }
            const response = await fetch(`${this.HOST}/?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`);
            const endTime = Date.now();
            this.store.setResponseTime(endTime - startTime);

            const answer: TAnswer<T> = await response.json();
            if (answer.result === 'ok' && answer.data) {
                return answer.data;
            }
            answer.error && this.setError(answer.error);
            return null;
        } catch (e) {
            console.log(e);
            this.setError({
                code: 9000,
                text: 'Unknown error',
            });
            return null;
        }
    }

    private setError(error: TError): void {
        this.showErrorCb(error);
    }

    showError(cb: (error: TError) => void) {
        this.showErrorCb = cb;
    }

    async autoLogin(): Promise<boolean> {
        if (this.store.getToken()) {
            const user = await this.request<TUser>('autoLogin');
            if (user) {
                this.store.setUser(user);
                return true;
            }
        }
        return false;
    }

    async login(login: string, password: string): Promise<boolean> {
        const rnd = Math.round(Math.random() * 100000);
        const hash = md5(`${md5(`${login}${password}`)}${rnd}`);
        const user = await this.request<TUser>('login', { login, hash, rnd: `${rnd}` });
        if (user) {
            this.store.setUser(user);
            return true;
        }
        return false;
    }

    async logout(): Promise<boolean> {
        const result = await this.request<boolean>('logout');
        if (result) {
            this.store.clearUser();
            return true;
        }
        return false;
    }

    async registration(login: string, password: string, name: string): Promise<boolean | null> {
        const hash = md5(`${login}${password}`);
        const user = await this.request<TUser>('registration', { login, hash, name });
        if (user) {
            this.store.setUser(user);
            return true;
        }
        return false;
    }

    sendMessage(message: string): void {
        this.request<boolean>('sendMessage', { message });
    }

    async getMessages(): Promise<TMessagesResponse | null> {
        const hash = this.store.getChatHash();
        const result = await this.request<TMessagesResponse>('getMessages', { hash });
        if (result) {
            this.store.setChatHash(result.hash);
            return result;
        }
        return null;
    }

    startChatMessages(cb: (hash: string) => void): void {
        this.chatInterval = setInterval(async () => {
            const result = await this.getMessages();
            if (result) {
                const { messages, hash } = result;
                this.store.addMessages(messages);
                cb(hash);
            }
        }, CHAT_TIMESTAMP);

    }

    stopChatMessages(): void {
        if (this.chatInterval) {
            clearInterval(this.chatInterval);
            this.chatInterval = null;
            this.store.clearMessages();
        }
    }

    async getInventory(): Promise<boolean> {
        const result = await this.request<TInventory>('getInventory');
        if (result) {
            this.store.setInventory(result);
        }
        return !!result;
    }

    async changeInventory(itemId: number, toEquip: boolean): Promise<void> {
        await this.request('changeInventory', { itemId: `${itemId}`, toEquip: `${toEquip}`});
    }

    startGame(): void {
        this.request('startGame');
    }

    createGroup(name: string): void {
        this.request('createGroup', { name });
    }

    async deleteGroup(): Promise<boolean | null> {
        return this.request<boolean>('deleteGroup');
    }

    async leaveGroup(): Promise<boolean | null> {
        return this.request<boolean>('leaveGroup');
    }

    joinToGroup(lobbyId: number): void {
        this.request('joinToGroup', { lobbyId: `${lobbyId}` });
    }

    dropFromGroup(userId: number): void {
        this.request('dropFromGroup', { userId: `${userId}` });
    }

    async updateGroups(): Promise<TLobbiesResponse | null> {
        const hash = this.store.getLobbyHash();
        const result = await this.request<TLobbiesResponse>('updateGroups', { hash });
        if (result) {
            this.store.setLobbyHash(result.hash);
            return result;
        }
        return null;
    }

    startLobbyList(cb: (result: TLobbiesResponse) => void): void {
        this.lobbyInterval = setInterval(async () => {
            const result = await this.updateGroups();
            if (result?.lobbies) {
                cb(result);
            }
        }, LOBBY_LIST_TIMESTAMP);
    }

    stopLobbyList(): void {
        if (this.lobbyInterval) {
            clearInterval(this.lobbyInterval);
            this.lobbyInterval = null;
        }
    }

    async updateScene(): Promise<TUpdateSceneResponse | null> {
        const hash = this.store.getGameHash();
        const result = await this.request<TUpdateSceneResponse>('updateScene', { hash });
        if (result) {
            return result;
        }
        return null;
    }

    startSceneUpdate(cb: (result: TUpdateSceneResponse) => void): void {
        this.gameInterval = setInterval(async () => {
            const result = await this.updateScene();
            if (result?.scene) {
                this.store.setGameHash(result.hash);
                cb(result);
            }
        }, GAME_TIMESTAMP);
    }

    stopSceneUpdate(): void {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }

    move(axisX: number, axisY: number): void {
        this.request('move', { axisX:`${axisX}`, axisY:`${axisY}` });
    }

    action(): void {
        this.request('action');
    }

    //обменник

    async updateExchanger(): Promise<TUpdateExchangerResponse | null> {
        const hash = this.store.getExchangerHash();
        const result = await this.request<TUpdateExchangerResponse>('updateExchanger', { hash});
        if (result) {
            return result;
        }
        return null;
    }

    startExchagerUpdate(cb: (result: TUpdateExchangerResponse) => void): void {
        this.exchangerInterval = setInterval(async () => {
            const result = await this.updateExchanger();
            if (result) {
                this.store.setExchangerHash(result.hash);
                cb(result);
            }
        }, EXCHANGER_TIMESTAMP);
    }

    stopExchangerUpdate(): void {
        if (this.exchangerInterval) {
            clearInterval(this.exchangerInterval);
            this.exchangerInterval = null;
        }
    }

    createLot(sellItemId: number, needItemId: number): void {
        const result = this.request('createLot', {"sellItemId": `${sellItemId}`, "needItemId": `${needItemId}`});
    }
    
    deleteLot(lotId: number): void {
        this.request('deleteLot', {"lotId": `${lotId}`});
    }
    
    addLotItem(): void {
        this.request('addLotItem');
    }
    
    removeLotItem(): void {
        this.request('removeLotItem');
    }
    
    provideConsent(): void {
        this.request('provideConsent');
    }
    
    removeConsent(): void {
        this.request('removeConsent');
    }
    
    addLotComment(): void {
        this.request('addLotComment');
    }
    
    updateLots(): void {
        this.request('updateLots');
    }

    async getItemsList(): Promise<TItem[]> {
        const result = await this.request<TItem[]>('getItemsList');
        if (result) {
            this.store.setItemsList(result);
            return result;
        }
        return [];
    }

}

export default Server;