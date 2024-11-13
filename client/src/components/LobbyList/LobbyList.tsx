import { useContext, useEffect, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import { TLobbies, TLobby } from "../../services/server/types";
import Button from "../Button/Button";

const LobbyList: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [lobbies, setLobbies] = useState<TLobbies>([]);
    const [_, setHash] = useState<string>('');
    const user = store.getUser();

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
        console.log(`Подклчение к лобби ${id}`);
    }

    return <>
        <h1>Лобби</h1>
        {lobbies.map((lobby: TLobby, index: number) => (<div key={index}>
            <span>{lobby.name} </span>
            <span>{lobby.creator} </span>
            <Button onClick={() => connectToLobby(lobby.id)} text="Присоединиться" />
        </div>))}
    </>;
}

export default LobbyList;