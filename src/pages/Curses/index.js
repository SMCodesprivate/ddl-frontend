import React from 'react';
import './style.css';
import base_url from '../infos';
import Menu from '../menu';
import api from '../../services/api';

export default function Curses() {
    var corpo = document.querySelector('#corpo');
    corpo.onload = function () {
        var aspiposfiasd = document.querySelector("#tituloTeste");
        aspiposfiasd.innerHTML = "Curses - "+aspiposfiasd.innerHTML;
    }
    async function init() {
        var teste = localStorage.getItem("user_infos");
        if(!teste || teste === null) {
            localStorage.setItem("retornado", true);
            window.location.href = base_url+"/register";
            return;
        }

        var curses = await api.get("/iscurse");
        console.log(curses.data.information.length);
        if(curses.data.information.length === 0) {
            console.log("Teste");
            var itens = document.querySelector("#itens");
            var create = document.createElement("div");
            create.setAttribute("class", "criado");
            var p = document.createElement("p");
            var text = document.createTextNode("Não achamos nenhum curso disponível");
            p.appendChild(text);
            create.appendChild(p);
            itens.appendChild(create);
            return;
        }
        curses = curses.data.information;
        curses.map(async curse => {
            console.log(curse);

            // ITEM
            var itens = document.querySelector("#itens");
            var item = document.createElement("div");
            item.setAttribute("class", "item");


            // NAME
            var nameDiv = document.createElement("div");
            nameDiv.setAttribute("class", "name");
            var name = document.createElement("p");
            var nameText = document.createTextNode(`${curse.name}`);
            var content = document.createElement("div");
            content.setAttribute("class", "conteudo");

            // IMAGE PREVIEW
            var fundImg = document.createElement("div");
            fundImg.setAttribute("class", "fundoImg");
            var image = document.createElement("img");
            image.setAttribute("src", curse.image);
            image.setAttribute("alt", `Curso de ${curse.name}`);
            image.setAttribute("title", `Curso de ${curse.name}`);
            
            
            // UL, LI
            var list = document.createElement("div");
            list.setAttribute("class", "information");
            var ul = document.createElement("ul");
            var user = await api.post("/searchuser", { user_id: curse.professor_id });
            var lis = [
                {
                    name: "Aulas disponíveis » ",
                    var: curse.aulas
                },
                {
                    name: "Aulas desejáveis » ",
                    var: curse.required
                },
                {
                    name: "Professor » ",
                    var: user.data.username
                },
                {
                    name: "Suportes » ",
                    var: "["+curse.suports+"]"
                },
                {
                    name: "Lançamento » ",
                    var: `${curse.date.day}/${curse.date.month}/${curse.date.year}`
                },
                {
                    name: "Alunos » ",
                    var: curse.alunos
                },
            ];
            lis.map(li => {
                var d = document.createElement("li");
                var dText = document.createTextNode(`${li.name}${li.var}`);
                d.appendChild(dText);
                ul.appendChild(d);
            });


            // SET

            name.appendChild(nameText);
            nameDiv.appendChild(name);
            item.appendChild(nameDiv);

            fundImg.appendChild(image);
            content.appendChild(fundImg);

            list.appendChild(ul);
            content.appendChild(list);
            
            item.appendChild(content);
            itens.appendChild(item);
        });
    }
    init();
    return (
        <div>
            <div>
                <Menu />
            </div>
            <div id="itens">
            </div>
        </div>
    );
}