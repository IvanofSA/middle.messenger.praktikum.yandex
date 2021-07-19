import "./home.scss";
import { createInputs } from "../../utils/createInputs";

const inputsBox = document.querySelector( '.js-inputs-box' );
const dataInputs = [
    {
        theme: 'login',
        label: 'Логин',
        id: 'email',
        placeholder: 'Введите email',
        name: 'email',
        type: 'email',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        theme: 'login',
        label: 'Пароль',
        id: 'password',
        placeholder: 'Введите пароль',
        name: 'password',
        type: 'password',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
];

inputsBox.innerHTML = createInputs( dataInputs );
