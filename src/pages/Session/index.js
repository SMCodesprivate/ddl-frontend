import React, { useState, useEffect } from 'react';
import './style.css';
import api from '../../services/api';
import getColor from '../getColor';
import base_url from '../infos';

// navigation: history
export default function Register({ history }) {
    useEffect(() => {
        var info = localStorage.getItem("user_infos");
        if(info || info !== null) return window.location.href = base_url+'/dashboard';
        var ainfo = localStorage.getItem("retornado", true);
        if(ainfo || ainfo !== null) {
            alert("Você não pode acessar uma área restrita sem registrar.");
            localStorage.removeItem("retornado");
        }
    }, []);
    var [ username, setUsername ] = useState('');
    var [ senha, setSenha ] = useState('');
    var corpo = document.querySelector("#corpo");
    function trocarColor() {
        var color = getColor();
        var menu = document.querySelector("#menuCadastro");
        menu.style.border = "4px solid #"+color;
    }
    corpo.onload = function() {
        var aspiposfiasd = document.querySelector("#tituloTeste");
        aspiposfiasd.innerHTML = "Session - "+aspiposfiasd.innerHTML;
        setInterval(() => {
            trocarColor();
        }, 900)
    }
    async function activeSubmit(event) {
        event.preventDefault();
        if(!username || username === '') return alert("Digite algum username se registrar.");
        if(!senha || senha === '') return alert("Digite uma senha se registrar.");
        var verification = await api.post("/is", { username: username });
        if(verification.data.error === true) {
            verification = await api.post("/register", { username: username, password: senha });
            localStorage.setItem("user_infos", JSON.stringify({ username: verification.username, user_id: verification._id, password: verification.password }));
            window.location.href = base_url+'/dashboard';
            return;
        } else {
            var teste = await api.post("/verificar", { username, password: senha });
            if(teste.data.state !== true) return alert("Você digitou a senha errada dessa conta.");
            localStorage.setItem("user_infos", JSON.stringify({ username: verification.data.returno.username, user_id: verification.data.returno._id, password: verification.data.returno.password }));
            window.location.href = base_url+'/dashboard';
        }
        // window.location.href = base_url+'/dashboard';
    }
    return (
        <div id="blockCorp">
            <div id="menuCadastro">
                <p id="cadastroTitle">
                    Acessar conteúdo
                </p>
                <form onSubmit={activeSubmit} id="formularioCadastro">
                    <p id="textEmail">Name <strong className="importante">*</strong>:</p>
                    <input
                        type="text"
                        name="username"
                        id="inputEmail"
                        placeholder="Digite seu username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <br/>
                    <br/>
                    <p id="textSenha">Senha <strong className="importante">*</strong>:</p>
                    <input
                        type="password"
                        name="senha"
                        id="inputSenha"
                        placeholder="Digite uma senha que você lembre"
                        value={senha}
                        onChange={event => setSenha(event.target.value)}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button
                        type="submit"
                        id="inputBotton"
                    >
                        Acessar
                    </button>
                </form>
            </div>
        </div>
    );
}