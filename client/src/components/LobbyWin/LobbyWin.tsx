import { useContext, useEffect, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import Lobby from "./Lobby/Lobby";
import LobbyList from "./LobbyList/LobbyList";
import { TLobby } from "../../services/server/types";

const LobbyWin: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [_, setHash] = useState('');
    const lobby = store.getLobby();
    const lobbies = store.getLobbies();

    useEffect(() => {
        server.startLobby(setHash);
        return () => server.stopLobby();
    });

    if (lobby) {
        return <Lobby lobby={lobby}/>
    }

    return <div>
        <LobbyList lobbies={lobbies} connectToLobby={server.joinToLobby} />
    </div>;
}

export default LobbyWin;