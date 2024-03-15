import * as React from 'react'
import './style.css';
import axios from 'axios'

function CardUser() {
    const [users, setUsers] = React.useState([]);
    const [card, setCard] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2')
            .then((response) => {  // then e catch funciona igual a try e catch
                setUsers(response.data.data)
                console.log(response)
            })
            .catch((error) => { alert(error) })
    }, [])

    React.useEffect(() => {
        setCard(users.map((user) => (
            <div className='CardUser-card'>

                <div className="CardUser-content-img">
                    <img src={user.avatar} alt={`Imagem do perfil ${user.id}`} className='CardUser-img' />
                </div>

                <div className="CardUser-content-info">
                    <h4>Nome: {user.first_name + " " + user.last_name}</h4>
                    <p>Email: {user.email}</p>
                </div>

            </div>
        )))
    }, [users])

    return (
        <div className="CardUser-container">
            {card}
        </div >
    );
}

export default CardUser;
