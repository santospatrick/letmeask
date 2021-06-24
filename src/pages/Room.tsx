import logoImg from 'assets/images/logo.svg';
import Button from 'components/Button'
import 'styles/room.scss'
import RoomCode from 'components/RoomCode'
import { useParams } from 'react-router-dom';

type RoomParmas = {
    id: string
}

function Room() {
    const params = useParams<RoomParmas>();

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
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea placeholder="O que você quer perguntas?" />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button type="button">faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Room