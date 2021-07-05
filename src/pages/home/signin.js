import "./home.scss";
import pug from 'pug';
import { inputComponent } from '../../components/input';

const inputsBox = document.querySelector( '.js-inputs-box' );
const dataInputs = [
    {
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

const createInputs = ( inputs ) => {
    let temp = '';
    inputs.forEach(input => {
        temp += `${pug.render(inputComponent(input))}`
    })
    return temp;
}

inputsBox.innerHTML = pug.render(createInputs( dataInputs ));
