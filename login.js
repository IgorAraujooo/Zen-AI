'use strict'

const username = document.getElementById('user');
const password = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const errorMessage = document.getElementById('error-message');

let users;

const getUsers = async () => {
    const url = 'https://back-login.vercel.app/usuarios';
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const loginValidation = () => {
    let validation = false;

    users.forEach((user) => {
        if (
            username.value.toUpperCase() === user.nome.toUpperCase() &&
            password.value.toUpperCase() === user.senha.toUpperCase()
        ) {
            localStorage.setItem('user', user.nome);
            validation = true;
        }
    });

    return validation;
};

const login = (event) => {
    event.preventDefault(); 

    const validation = loginValidation();

    if (validation) {
        window.location = './home.html';
    } else {
        errorMessage.textContent = 'Usuário ou senha inválidos';
        errorMessage.style.display = 'block';
    }
};

loginButton.addEventListener('click', login);
username.addEventListener('keypress', (e) => { if (e.key === 'Enter') { login(e); } });
password.addEventListener('keypress', (e) => { if (e.key === 'Enter') { login(e); } });

window.addEventListener('load', async () => {
    users = await getUsers();
});
