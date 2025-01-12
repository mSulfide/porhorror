import Resources from "../../game/resources/Resources";
import { TInventory, TItem, TLobby, TMessages, TUser } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    messages: TMessages = [];
    chatHash: string = 'empty chat hash';
    lobbyHash: string = 'empty lobby hash';
    gameHash: string = 'empty game hash';
    inventory: TItem[] = [];
    responseTime: number = 0;
    resources: Resources = new Resources();

    loadResources(onload: () => void) {
        this.resources.load(onload);
    }

    setResponseTime(responseTime: number) {
        this.responseTime = Math.floor((this.responseTime + responseTime) / 2);
    }

    setToken(token: string): void {
        localStorage.setItem(TOKEN, token);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN);
    }

    setUser(user: TUser): void {
        const { token } = user;
        this.setToken(token);
        this.user = user;
    }

    getUser(): TUser | null {
        return this.user;
    }

    clearUser(): void {
        this.user = null;
        this.setToken('');
    }

    addMessages(messages: TMessages): void {
        // TODO сделать, чтобы работало вот так
        //this.messages.concat(messages);
        // а вот это - плохой код!
        if (messages?.length) {
            this.messages = messages;
        }
    }

    getMessages(): TMessages {
        return this.messages;
    }

    clearMessages(): void {
        this.messages = [];
    }

    getChatHash(): string {
        return this.chatHash;
    }

    setChatHash(hash: string): void {
        this.chatHash = hash;
    }

    getLobbyHash(): string {
        return this.lobbyHash;
    }

    setLobbyHash(hash: string): void {
        this.lobbyHash = hash;
    }

    getGameHash(): string {
        return this.gameHash;
    }

    setGameHash(hash: string): void {
        this.gameHash = hash;
    }

    setInventory(inventory: TInventory): void {
        this.inventory = inventory.slots;
    }

    getInventory(): TItem[] {
        return this.inventory;
    }
}

export default Store;