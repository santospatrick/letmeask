import logoImg from 'assets/images/logo.svg';
import Button from 'components/Button'
import 'styles/room.scss'
import RoomCode from 'components/RoomCode'
import Question from 'components/Question'
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';
import { useRoom } from 'hooks/useRoom';

type RoomParmas = {
    id: string
}

function AdminRoom() {
    const { user } = useAuth();
    const params = useParams<RoomParmas>();
    const [newQuestion, setNewQuestion] = useState('')
    const roomId = params.id;
    const { questions, title } = useRoom(roomId);
    
    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in.')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }

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
                    {questions.length && <span>{questions.length} perguntas</span>}
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
