import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../../App";
import { TLobbies, TLobby } from "../../../services/server/types";
import Button from "../../Button/Button";

export type TLobbyList = {
    lobbies: TLobbies;
    connectToLobby: (id: number) => void;
}

const LobbyList: React.FC<TLobbyList> = (props) => {
    const { lobbies, connectToLobby } = props;

    return <>
        <h1>Список Лобби</h1>
        {lobbies.map((lobby: TLobby, index: number) => (<div key={index}>
            <span>{lobby.name} </span>
            <span>{lobby.creator} </span>
            <Button onClick={() => connectToLobby(lobby.id)} text="Присоединиться" />
        </div>))}
    </>;
}

export default LobbyList;