import logoImg from 'assets/images/logo.svg';
import Button from 'components/Button'
import 'styles/room.scss'
import RoomCode from 'components/RoomCode'
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { database } from 'services/firebase';

type RoomParmas = {
    id: string
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean
}>

type Question = {
    id: string
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean
}

function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParmas>();
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${params.id}`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()
            const firebaseQuestions = databaseRoom.questions as FirebaseQuestions ?? {};

            const parsedQuestions = Object
                .entries(firebaseQuestions)
                .map(([key,value]) => ({
                    id: key, 
                    content: value.content, 
                    author: value.author, 
                    isHighlighted: value.isHighlighted, 
                    isAnswered: value.isAnswered
                }))

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [params.id])

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

        await database.ref(`rooms/${params.id}/questions`).push(question)

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={params.id} />
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

                <pre>{JSON.stringify(questions, null, 2)}</pre>
            </main>
        </div>
    )
}

export default Room
