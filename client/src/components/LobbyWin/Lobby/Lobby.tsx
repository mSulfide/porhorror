import { useContext, useEffect } from "react";
import { TLobby, TUser } from "../../../services/server/types";
import { ServerContext, StoreContext } from "../../../App";

export type TLobbyProps = {
    lobby: TLobby;
}

const Lobby: React.FC<TLobbyProps> = (props) => {
    const { lobby } = props;
    const users = lobby.users || [];
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    return <div>
        <span>{lobby.name}</span>
        {users.map((user: TUser, index: number) => <div key={index}>
            <span>{user.name}</span>
        </div>)}
    </div>;
}

export default Lobby;