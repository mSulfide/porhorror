import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import { TLobbies, TLobby } from "../../services/server/types";
import Button from "../Button/Button";

const LobbyList: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [lobbies, setLobbies] = useState<TLobbies>([]);
    const [_, setHash] = useState<string>('');
    const user = store.getUser();
    const lobbyName = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const newLobbies = (hash: string) => {
            const lobbies = store.getLobbies();
            if (lobbies?.length) {
                setLobbies(lobbies);
                setHash(hash);
            }
        }

        if (user) {
            server.startLobbyList(newLobbies);
        }

        return () => {
            server.stopLobbyList();
        }
    });

    const connectToLobby = (id: number): void => {
        server.joinToLobby(id);
    }

    const createLobby = () => {
        server.createLobby(lobbyName.current?.value || 'Новая группа');
    }

    return <>
        <h1>Список Лобби</h1>
        {lobbies.map((lobby: TLobby, index: number) => (<div key={index}>
            <span>{lobby.name} </span>
            <span>{lobby.creator} </span>
            <Button onClick={() => connectToLobby(lobby.id)} text="Присоединиться" />
        </div>))}
        <div>
            <input ref={lobbyName} placeholder="имя группы" />
            <Button onClick={createLobby} text="+" />
        </div>
    </>;
}

export default LobbyList;