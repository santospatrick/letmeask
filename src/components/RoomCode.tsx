import copyImg from 'assets/images/copy.svg';
import 'styles/room-code.scss'

type Props = {
    code: string;
}

function RoomCode({ code }: Props) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(code)
    }

    return (
        <button onClick={copyRoomCodeToClipboard} type="button" className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{code}</span>
        </button>
    )
}

export default RoomCode
