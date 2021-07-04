import "./home.scss";
import pug from 'pug';
import { inputComponent } from '../../components/input';

const inputsBox = document.querySelector( '.js-inputsbox' );
const dataInputs = [
    {
        label: 'Почта',
        placeholder: 'Введите email',
        name: 'email',
        type: 'email',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        label: 'Логин',
        placeholder: 'Введите логин',
        name: 'login',
        type: 'text',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        label: 'Имя',
        placeholder: 'Введите Имя',
        name: 'name',
        type: 'text',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        label: 'Фамилия',
        placeholder: 'Введите Фамилия',
        name: 'secondName',
        type: 'text',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        label: 'Телефон',
        placeholder: 'Введите Телефон',
        name: 'phone',
        type: 'tel',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        label: 'Пароль',
        placeholder: 'Введите пароль',
        name: 'password',
        type: 'password',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        label: 'Пароль (ещё раз)',
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
