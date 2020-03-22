export const userService = {
    login,
    getUserId
}

function login(username) {

}

function setUserId(id) {
    localStorage.setItem('aidremind_id', id);
}

function getUserId() {
    return localStorage.getItem('aidremind_id')
}