import { useContext } from "react";
import { ServerContext } from "../../../App";
import { TMember } from "../../../services/server/types"
import { EStatus } from "../Lobby";
import Button from "../../Button/Button";

interface ILobbyMember {
    status: EStatus;
    member: TMember;
}

const LobbyMember: React.FC<ILobbyMember> = ({ member, status }: ILobbyMember) => {
    const server = useContext(ServerContext);

    const dropFromLobbyHandler = () => server.dropFromGroup(member.id);

    return <div>
        {member.creator && <span>Создатель </span>}
        <span>{member.name}</span>
        {!member.creator && status === EStatus.creator && <Button onClick={dropFromLobbyHandler} text="Выгнать" />}
    </div>
}

export default LobbyMember;