import logoImg from 'assets/images/logo.svg';
import Button from 'components/Button'
import 'styles/room.scss'
import RoomCode from 'components/RoomCode'
import Question from 'components/Question'
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from 'hooks/useRoom';
import deleteImg from 'assets/images/delete.svg'
import { database } from 'services/firebase';

type RoomParmas = {
    id: string
}

function AdminRoom() {
    const params = useParams<RoomParmas>();
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);
    const history = useHistory();

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
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
                        <Question key={question.id} content={question.content} author={question.author}>
                            <button 
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="delete" />
                            </button>
                        </Question>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default AdminRoom
