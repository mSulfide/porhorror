import { useContext } from "react";
import { ServerContext } from "../../../App";
import { ELobbyStatus, TLobby } from "../../../services/server/types";
import Button from "../../Button/Button";
import LobbyMember from "./LobbyMember";
import { EStatus } from "../Lobby";

interface ILobbyInfo {
    lobby: TLobby;
    status: EStatus;
}

const LobbyInfo: React.FC<ILobbyInfo> = ({ lobby, status }: ILobbyInfo) => {
    const server = useContext(ServerContext);
    const deleteLobbyHandler = () => server.deleteGroup();
    const leaveLobbyHandler = () => server.leaveGroup();
    const startGameHandler = () => server.startGame();
    return <>
        <span>{`Лобби ${lobby.name}`}</span>
        {lobby.members.map((member, index) => <LobbyMember key={index} member={member} status={status} />)}
        {lobby.status === ELobbyStatus.open && (status === EStatus.creator ?
            <Button onClick={deleteLobbyHandler} text="Удалить группу" /> :
            <Button onClick={leaveLobbyHandler} text="Покинуть группу" />
        )}
        {lobby.status === ELobbyStatus.open && status === EStatus.creator && <Button onClick={startGameHandler} text="Запустить игру" />}
    </>;
}

export default LobbyInfo;