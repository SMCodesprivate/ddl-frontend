import api from '../../services/api';
async function teste() {
    var x = false;
    var enviate = await api.get("/iscurse");
    if(enviate.data.information.length === 0) {
        var dddslide = document.querySelector("#fundo");
        var found = document.querySelector("#slide");
        var text = document.createTextNode("Não encontramos nenhum curso no momento");
        var created = document.createElement("p");
        dddslide.style.display = "none";
        created.style.textAlign = "center";
        created.style.color = "#FFFFFF";
        created.style.fontSize = "34px";
        created.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        created.style.fontWeight = "900";
        created.style.position = "relative";
        created.style.top = "35%";
        created.appendChild(text);
        found.appendChild(created);
        x = true;
    }
    return x;
}
async function onSlideChange(position) {
}
export default ({
    onSlideChange,
    teste
});