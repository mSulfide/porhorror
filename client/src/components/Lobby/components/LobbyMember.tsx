import { useContext } from "react";
import { ServerContext } from "../../../App";
import { EMemberStatus, TMember } from "../../../services/server/types"
import Button from "../../Button/Button";

interface ILobbyMember {
    status: EMemberStatus;
    member: TMember;
}

const LobbyMember: React.FC<ILobbyMember> = ({ member, status }: ILobbyMember) => {
    const server = useContext(ServerContext);

    const dropFromLobbyHandler = () => server.dropFromGroup(member.id);

    return <div>
        {member.status === EMemberStatus.creator && <span>Создатель: </span>}
        <span>{member.name}</span>
        {member.status !== EMemberStatus.creator && status === EMemberStatus.creator && <Button onClick={dropFromLobbyHandler} text="Выгнать" />}
    </div>
}

export default LobbyMember;