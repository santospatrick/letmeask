import logoImg from 'assets/images/logo.svg';
import Button from 'components/Button'
import 'styles/room.scss'
import RoomCode from 'components/RoomCode'
import Question from 'components/Question'
import { useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';
import { useRoom } from 'hooks/useRoom';

type RoomParmas = {
    id: string
}

function Room() {
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
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length && <span>{questions.length} perguntas</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        onChange={event => setNewQuestion(event.target.value)} 
                        value={newQuestion}
                        placeholder="O que você quer perguntas?" 
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button type="button">faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="question-list">
                    {questions.map(question => (
                        <Question key={question.id} content={question.content} author={question.author} />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Room
