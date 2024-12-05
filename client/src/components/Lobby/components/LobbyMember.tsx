import { TMember } from "../../../services/server/types"

interface ILobbyMember {
    member: TMember;
}

const LobbyMember: React.FC<ILobbyMember> = ({ member }: ILobbyMember) => {
    return <div>
        {member.creator && <span>Создатель </span>}
        <span>{member.name}</span>
    </div>
}

export default LobbyMember;