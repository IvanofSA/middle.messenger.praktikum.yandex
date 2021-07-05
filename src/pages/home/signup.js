import "./home.scss";
import pug from 'pug';
import { inputComponent } from '../../components/input';

const inputsBox = document.querySelector( '.js-inputs-box' );
const dataInputs = [
    {
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

const createInputs = ( inputs ) => {
    let temp = '';
    inputs.forEach(input => {
        temp += `${pug.render(inputComponent(input))}`
    })
    return temp;
}

inputsBox.innerHTML = pug.render(createInputs( dataInputs ));
