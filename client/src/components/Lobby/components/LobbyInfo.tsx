import { TLobby } from "../../../services/server/types";
import LobbyMember from "./LobbyMember";

interface ILobbyInfo {
    lobby: TLobby;
}

const LobbyInfo: React.FC<ILobbyInfo> = ({ lobby }: ILobbyInfo) => {
    return <>
        <span>{lobby.name}</span>
        {lobby.members.map((member, index) => <LobbyMember key={index} member={member} />)}
    </>;
}

export default LobbyInfo;