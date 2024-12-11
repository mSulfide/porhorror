import React, { useContext, useEffect, useState, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { Button } from '..';
import { TLobbies, TLobbiesResponse, TLobby } from "../../services/server/types";
import LobbyItem from './components/LobbyItem';
import LobbyInfo from './components/LobbyInfo';

export enum EStatus {
    none,
    member,
    creator
}

export interface ILobby {
    setGamePage: () => void;
}

const Lobby: React.FC<ILobby> = ({ setGamePage }: ILobby) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [lobbies, setLobbies] = useState<TLobbies>([]);
    const [_, setHash] = useState<string>('');

    const nameGroupRef = useRef<HTMLInputElement>(null!);

    const user = store.getUser();

    useEffect(() => {
        const updateLobbyListHandler = ({ hash, lobbies, gameId }: TLobbiesResponse) => {
            if (gameId) {
                (async () => await server.connect(gameId) && setGamePage())();
            }
            setLobbies(lobbies);
            setHash(hash);
        }

        if (user) {
            server.startLobbyList(updateLobbyListHandler);
        }

        return () => {
            server.stopLobbyList();
        }
    });

    const createLobbyHandler = () => {
        if (nameGroupRef.current && user) {
            server.createGroup(nameGroupRef.current.value || "Новая группа");
        }
    }

    if (!user) return <></>;

    const currentLobby = lobbies.find(lobby => lobby.members.findIndex(member => member.id === user.id) > -1);
    const status: EStatus = !currentLobby ?
        EStatus.none :
        currentLobby.members.find(member => member.id === user.id)?.creator ?
            EStatus.creator :
            EStatus.member;

    return <div>
        {currentLobby && <LobbyInfo lobby={currentLobby} status={status} />}
        {lobbies.map((lobby: TLobby, index: number) => lobby !== currentLobby && <LobbyItem key={index} lobby={lobby} status={status} />)}
        {!currentLobby && (<div>
            <input ref={nameGroupRef} placeholder='Название группы' />
            <Button onClick={createLobbyHandler} text='Создать группу' />
        </div>)}
    </div>;
}

export default Lobby;