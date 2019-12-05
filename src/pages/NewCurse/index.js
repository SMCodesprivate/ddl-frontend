import React, { useState, useMemo } from 'react';
import './style.css';
import base_url from '../infos';
import camera from './camera.svg';
import api from '../../services/api';
import Menu from '../menu';

export default function NewCurse() {
    const [name, setName] = useState('');
    const [aulas, setAulas] = useState('');
    const [suport, setSuport] = useState('');
    const [professor, setProfessor] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState('');

    function changeName(name) {
        setProfessor(name);
    }

    const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail]);
    var corpo = document.querySelector('#corpo');
    corpo.onload = function () {
        var aspiposfiasd = document.querySelector("#tituloTeste");
        aspiposfiasd.innerHTML = "NewCurse - "+aspiposfiasd.innerHTML;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('required', aulas);
        data.append('proff', professor);
        data.append('image', thumbnail);
        data.append('description', description);
        await api.post("/createcurse", data);
        alert(`O curso ${name} foi criado`);
        window.location.href = base_url+"/dashboard";
    }
    async function changeSearch(event) {
        event.persist();
        setTimeout(async () => {
            var teste = await api.post("/beta", { filter: event.target.value });
            var location = 0;
            var fundo = document.querySelector("#autoComplete");
            fundo.innerHTML = "";
            teste.data.map(te => {
                if(te.level >= 2) {
                    var create = document.createElement("div");
                    create.setAttribute("class", "autoComplete");
                    var createText = document.createElement("p");
                    var createTextNode = document.createTextNode(te.name);
                    createText.appendChild(createTextNode);
                    create.appendChild(createText);
                    create.onmousedown = () => {
                        changeName(te.name)
                    }
                    create.style.marginTop = location+"px";
                    fundo.appendChild(create);
                    location += 64;
                }
            });
        }, 1);
    }
    async function changeSearchSuport(event) {
        event.persist();
        setTimeout(async () => {
            var teste = await api.post("/beta", { filter: event.target.value });
            var location = 0;
            var fundo = document.querySelector("#autoCompleteSuports");
            fundo.innerHTML = "";
            teste.data.map(te => {
                if(te.level < 1) return;
                var create = document.createElement("div");
                create.setAttribute("class", "autoComplete");
                var createText = document.createElement("p");
                var createTextNode = document.createTextNode(te.name);
                createText.appendChild(createTextNode);
                create.appendChild(createText);
                create.style.marginTop = location+"px";
                create.onmousedown = () => {
                    console.log("Foi");
                }
                fundo.appendChild(create);
                location += 64;
            });
        }, 1);
    }
    async function remove() {
        setTimeout(() => {
            var fundo = document.querySelector("#autoComplete");
            fundo.innerHTML = "";
        }, 100);
    }
    async function removeSuports() {
        setTimeout(() => {
            var fundo = document.querySelector("#autoCompleteSuports");
            fundo.innerHTML = "";
        }, 100);
    }
    return (
        <>
            <div>
                <Menu />
            </div>
            <br/>
            <br/>
            <div id="men">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <label
                        id="thumbnail"
                    >
                        <input type="file" id="file" onChange={event => setThumbnail(event.target.files[0])} required/>
                        <img
                            src={camera}
                            alt="Selecionar Imagem"
                            id={thumbnail ? 'sumir' : 'thumbnailImage'}
                        />
                        <img
                            src={preview}
                            alt="Image thumbnail"
                            id={thumbnail ? 'aparecer' : 'sumir'}
                        />
                    </label>
                    <br/>
                    <input
                        type="text"
                        className="input"
                        id="curseName"
                        placeholder="Nome do novo curso."
                        required
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <br/>
                    <textarea
                        id="curseDescription"
                        placeholder="Description from curse"
                        required
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    >
                    </textarea>
                    <br/>
                    <input
                        type="text"
                        className="input"
                        id="curseAulas"
                        placeholder="Aulas desejáveis."
                        required
                        value={aulas}
                        onChange={event => setAulas(event.target.value)}
                    />
                    <br/>
                    <input
                        type="text"
                        className="input"
                        id="curseSuporte"
                        placeholder="Suportes"
                        required
                        value={suport}
                        onChange={event => setSuport(event.target.value)}
                        autoComplete="off"
                        onBlur={removeSuports}
                        onKeyPress={event => changeSearchSuport(event)}
                    />
                    <div id="autoCompleteSuports">
                    </div>
                    <br/>
                    <input
                        type="text"
                        className="input"
                        id="curseProfessor"
                        placeholder="Professor"
                        autoComplete="off"
                        required
                        onBlur={remove}
                        onKeyPress={event => changeSearch(event)}
                        value={professor}
                        onChange={event => setProfessor(event.target.value)}
                    />
                    <div id="autoComplete">
                    </div>
                    <br/>
                    <input
                        type="submit"
                        className="inputButton"
                        value="Cadastrar new curse"
                    />
                </form>
            </div>
        </>
    );
}