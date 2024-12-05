import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { ServerContext, StoreContext } from '../../../App';
import { StartGameButton, Button } from '../..';
import { TLobbies, TLobby, TUser } from "../../../services/server/types";
import { EStatus } from '../Lobby';

interface ILobbyItem {
    lobby: TLobby;
    status: EStatus;
}

const LobbyItem: React.FC<ILobbyItem> = ({ lobby, status }: ILobbyItem) => {
    const server = useContext(ServerContext);

    const joinToLobbyHandler = async () => {
        switch (status) {
            case EStatus.creator:
                await server.deleteGroup();
                break;
            case EStatus.member:
                await server.leaveGroup();
                break;
        }
        server.joinToGroup(lobby.id);
    }

    return <div>
        <span>{lobby.name} </span>
        <Button onClick={joinToLobbyHandler} text="Присоединиться" />
    </div>;
}

export default LobbyItem;