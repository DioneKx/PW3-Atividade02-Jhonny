import * as React from 'react'
import { IMaskInput } from 'react-imask';
import './style.css';
import axios from 'axios'

function CreateUser() {

    const [nome, setNome] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [rg, setRg] = React.useState("")
    const [cpf, setCpf] = React.useState("")
    const [telAluno, setTelAluno] = React.useState("")
    const [telResp, setTelResp] = React.useState("")
    const [dataNasc, setDataNasc] = React.useState("")

    function userCreate(e) {
        e.preventDefault();

        let masked = [rg, cpf, telAluno, telResp]
        let unmasked = []

        masked.forEach(e => {
            let temp = []

            try {
                if (temp.length < 1) {
                    temp = e.replaceAll(".", "")
                }
            } catch { console.log("Skip") }

            try {
                if (temp.length < 1) {
                    temp = e.replaceAll("-", "")
                } else {
                    temp = temp.replaceAll("-", "")
                }
            } catch { console.log("Skip") }

            try {
                if (temp.length < 1) {
                    temp = e.replaceAll(" ", "")
                } else {
                    temp = temp.replaceAll(" ", "")
                }
            } catch { console.log("Skip") }

            try {
                if (temp.length < 1) {
                    temp = e.replaceAll("(", "")
                } else {
                    temp = temp.replaceAll("(", "")
                }
            } catch { console.log("Skip") }

            try {
                if (temp.length < 1) {
                    temp = e.replaceAll(")", "")
                } else {
                    temp = temp.replaceAll(")", "")
                }
            } catch { console.log("Skip") }

            unmasked.push(temp)
        });

        const user = {
            nome: nome,
            email: email,
            rg: unmasked[0],
            cpf: unmasked[1],
            telAluno: unmasked[2],
            telResp: unmasked[3],
            dataNasc: dataNasc
        }


        axios.post('https://reqres.in/api/users', user)
            .then((response) => {
                alert("Ussuário criado com sucesso.\nVerifique o CONSOLE")
                console.log(response.data)
            }).catch((error) => { console.log(error) })

    }

    return (
        <div className="CreateUser-container">
            <h3>Formulário de Cadastro</h3>

            <form className="CreateUser-form" onSubmit={userCreate}> {/* o nome da função com "()" a ativa automaticamente (apenas com o form?) */}

                <div className='CreateUser-content-inputs'>
                    <input
                        type='text'
                        required
                        placeholder='Digite o seu nome...'
                        value={nome}
                        maxLength={100}
                        className='CreateUser-input'
                        onChange={(e) => { setNome(e.target.value) }}
                    />
                    <input
                        type='email'
                        placeholder='Digite o seu email...'
                        value={email}
                        maxLength={100}
                        className='CreateUser-input'
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        type='text'
                        required
                        placeholder="Digite o seu RG"
                        value={rg}
                        maxLength={9}
                        minLength={9}
                        className='CreateUser-input'
                        onChange={(e) => { setRg(e.target.value) }}
                    />

                    <IMaskInput
                        type='text'
                        mask="000.000.000-00"
                        required
                        placeholder="Digite o seu CPF"
                        value={cpf}
                        maxLength={14}
                        minLength={14}
                        className='CreateUser-input'
                        onChange={(e) => { setCpf(e.target.value) }}
                    />
                    <IMaskInput
                        type='text'
                        mask='(00) 0 0000-0000'
                        placeholder='Digite o telefone do aluno..'
                        value={telAluno}
                        maxLength={16}
                        minLength={16}
                        className='CreateUser-input'
                        onChange={(e) => { setTelAluno(e.target.value) }}
                    />
                    <IMaskInput
                        type='text'
                        mask='(00) 0 0000-0000'
                        placeholder='Digite o telefone do responsável...'
                        value={telResp}
                        maxLength={16}
                        minLength={16}
                        className='CreateUser-input'
                        onChange={(e) => { setTelResp(e.target.value) }}
                    />
                    <input
                        type='date'
                        required
                        placeholder='Digite sua data de nascimento...'
                        value={dataNasc}
                        maxLength={11}
                        className='CreateUser-input'
                        onChange={(e) => { setDataNasc(e.target.value) }}
                    />
                </div>

                <div className='CreateUser-content-btn'>
                    <button type='submit' className='CreateUser-button'>
                        Cadastrar
                    </button>
                </div>
            </form >
        </div>
    );
}

export default CreateUser;
