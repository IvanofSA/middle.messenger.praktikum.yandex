import "./home.scss";
import { createInputs } from "../../utils/createInputs";

const inputsBox = document.querySelector( '.js-inputs-box' );
const dataInputs = [
    {
        theme: 'login',
        label: 'Почта',
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
        label: 'Логин',
        id: 'login',
        placeholder: 'Введите логин',
        name: 'login',
        type: 'text',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        theme: 'login',
        label: 'Имя',
        id: 'name',
        placeholder: 'Введите Имя',
        name: 'name',
        type: 'text',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        theme: 'login',
        label: 'Фамилия',
        id: 'secondName',
        placeholder: 'Введите Фамилия',
        name: 'secondName',
        type: 'text',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        theme: 'login',
        label: 'Телефон',
        id: 'phone',
        placeholder: 'Введите Телефон',
        name: 'phone',
        type: 'tel',
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
    {
        theme: 'login',
        label: 'Пароль (ещё раз)',
        id: 'repassword',
        placeholder: 'Введите пароль',
        name: 'repassword',
        type: 'password',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
];

inputsBox.innerHTML = createInputs( dataInputs );
