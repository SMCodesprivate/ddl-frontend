import api from '../services/api.js';
async function verify_login() {
    var x = true;
    var user = JSON.parse(localStorage.getItem('user_infos'));
    if(user === null) {
        x = false;
    } else {
        var infos = await api.post("/is", { username: user.username });
        if(infos.data.error === true) {
            localStorage.clear();
            x = false;
        } else {
            var test = await api.post("/veriencripty", { username: user.username, password: user.password });
            if(test.data.result === false) {
                localStorage.clear();
                x = false;
            }
        }
    }
    return x;
}
async function verify_staff() {
    var user = JSON.parse(localStorage.getItem("user_infos"));
    var staff = await api.post("/is", { username: user.username });
    return staff.data.returno.level;
}
export { verify_staff, verify_login };