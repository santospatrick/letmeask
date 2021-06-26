import logoImg from 'assets/images/logo.svg';
import Button from 'components/Button'
import 'styles/room.scss'
import RoomCode from 'components/RoomCode'
import Question from 'components/Question'
import { useParams } from 'react-router-dom';
import { useRoom } from 'hooks/useRoom';

type RoomParmas = {
    id: string
}

function AdminRoom() {
    const params = useParams<RoomParmas>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => (
                        <Question key={question.id} content={question.content} author={question.author} />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default AdminRoom
