import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { ServerContext, StoreContext } from '../../App';
import { Button } from '..';
import { TLobbies, TLobbiesResponse, TLobby } from "../../services/server/types";
import LobbyItem from './components/LobbyItem';
import LobbyInfo from './components/LobbyInfo';


const Lobby: React.FC = () => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const [lobbies, setLobbies] = useState<TLobbies>([]);
    const [_, setHash] = useState<string>('');

    const nameGroupRef = useRef<HTMLInputElement>(null!);

    const user = store.getUser();
    
    useEffect(() => {
        const updateLobbyListHandler = ({ hash, lobbies }: TLobbiesResponse) => {
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

    const lobby = lobbies.find(lobby => lobby.members.findIndex(member => member.id === user.id) > -1);

    return <>
        {lobby && <LobbyInfo lobby={lobby} />}
        <div>
            <input ref={nameGroupRef} placeholder='Название группы' />
            <Button onClick={createLobbyHandler} text='Создать группу' />
        </div>
        {lobbies.map((lobby: TLobby, index: number) => <LobbyItem key={index} user={user} lobby={lobby} />)}
    </>;
}

export default Lobby;