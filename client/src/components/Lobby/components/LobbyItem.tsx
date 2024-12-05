import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { ServerContext, StoreContext } from '../../../App';
import { StartGameButton, Button } from '../..';
import { TLobbies, TLobby, TUser } from "../../../services/server/types";

interface ILobbyItem {
    user: TUser
    lobby: TLobby;
}

const LobbyItem: React.FC<ILobbyItem> = ({ lobby, user }: ILobbyItem) => {
    const server = useContext(ServerContext);
    const isCreator = lobby.members.findIndex(
        member => member.id === user.id && member.creator
    ) > -1;

    const deleteLobbyHandler = () => server.deleteGroup();
    const joinToLobbyHandler = () => server.joinToGroup(lobby.id);

    return <div>
        <span>{lobby.name} </span>
        {isCreator ? 
            <Button onClick={deleteLobbyHandler} text="Удалить группу" /> : 
            <Button onClick={joinToLobbyHandler} text="Присоединиться" />
        }
        
    </div>;
}

export default LobbyItem;