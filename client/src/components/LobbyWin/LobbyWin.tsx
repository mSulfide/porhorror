import { useContext, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import Lobby from "./Lobby/Lobby";
import LobbyList from "./LobbyList/LobbyList";
import { TLobby } from "../../services/server/types";

const LobbyWin: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [lobby, setLobby] = useState<TLobby | null>(null);

    if (lobby) {
        return <Lobby lobby={lobby}/>
    }
    return <div>
        <LobbyList lobbies={[]} connectToLobby={server.joinToLobby} />
    </div>;
}

export default LobbyWin;