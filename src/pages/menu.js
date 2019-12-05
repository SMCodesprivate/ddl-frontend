import React from 'react';
import teste from './avatar.png';
import './menu.css';
import { verify_staff, verify_login } from '../all/functions';
import base_url from './infos';

export default function Menu() {
    async function loads() {
        var x = await verify_login();
        if(x === false) return window.location.href = base_url+"/session";
        var y = await verify_staff();
        if(y > 0) {
            var menu_staff = document.querySelector("#trocarMenu");
            menu_staff.setAttribute('id', 'active');
        }
    }
    loads();
    function verification() {
        var teste = JSON.parse(localStorage.getItem("user_infos"));
        var comentar = teste.username;
        return comentar;
    }
    var comentario = "Avatar de "+verification();
    return (
        <div id="menu">
            <div id="trocarMenu">
                <ul>
                    <a href="../newcurse">
                        <li>
                            New Curse
                        </li>
                    </a>
                </ul>
            </div>
            <img src={teste} alt={comentario} title={comentario} />
            <div id="listMenu">
                <ul>
                    <a href="/">
                        <li id="mainMenu">
                            Main
                        </li>
                    </a>
                    <a href="/dashboard">
                        <li id="dashboardMenu">
                            Dashboard
                        </li>
                    </a>
                    <a href="/perfil">
                        <li id="perfilMenu">
                            Perfil
                        </li>
                    </a>
                    <a href="/curses">
                        <li id="cursosMenu">
                            Cursos
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    );
}
