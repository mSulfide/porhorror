import { TInventory, TItem, TLobby, TMessages, TUser } from "../server/types";

const TOKEN = 'token';

class Store {
    user: TUser | null = null;
    lobby: TLobby | null = null;
    messages: TMessages = [];
    chatHash: string = 'empty chat hash';
    lobbyHash: string = 'empty lobby hash';
    inventory: TItem[] = [];
    equipment: TItem[] = [];

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

    setLobby(lobby: TLobby): void {
        this.lobby = lobby;
    }

    getLobby(): TLobby | null {
        return this.lobby;
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

    setInventory({ inventory, equipment }: TInventory): void {
        this.inventory = inventory;
        this.equipment = equipment;
    }

    getInventory(): TItem[] {
        return this.inventory;
    }
    getEquipment(): TItem[] {
        return this.equipment;
    }
}

export default Store;