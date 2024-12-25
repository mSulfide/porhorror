import React, { useContext } from 'react';
import { ServerContext } from '../../../App';
import { Button } from '../..';
import { EMemberStatus, TLobby } from "../../../services/server/types";

interface ILobbyItem {
    lobby: TLobby;
    status: EMemberStatus;
}

const LobbyItem: React.FC<ILobbyItem> = ({ lobby, status }: ILobbyItem) => {
    const server = useContext(ServerContext);

    const joinToLobbyHandler = async () => {
        switch (status) {
            case EMemberStatus.creator:
                await server.deleteGroup();
                break;
            case EMemberStatus.member:
                await server.leaveGroup();
                break;
        }
        server.joinToGroup(lobby.id);
    }

    return <div>
        <span>{lobby.name} </span>
        <span>{`Количество человек: ${lobby.members.length}`}</span>
        <Button onClick={joinToLobbyHandler} text="Присоединиться" />
    </div>;
}

export default LobbyItem;