import "./home.scss";
import pug from 'pug';
import { inputComponent } from '../../components/input';

const inputsBox = document.querySelector( '.js-inputsbox' );
const dataInputs = [
    {
        label: 'Логин',
        placeholder: 'Введите email',
        name: 'email',
        type: 'email',
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
];

const createInputs = ( inputs ) => {
    let temp = '';
    inputs.forEach(input => {
        temp += `${pug.render(inputComponent(input))}`
    })
    return temp;
}

inputsBox.innerHTML = pug.render(createInputs( dataInputs ));
