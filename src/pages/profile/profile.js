import "./profile.scss";
import pug from 'pug';
import { avatarComponent } from '../../components/avatar';
import { createInputs } from "../../utils/createInputs";

const avatarContainer = document.querySelector( '.js-avatar-container' );
const avatarSettings = {
    id: '1',
    src: 'https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg',
    name: 'Ivanov Sergey'
}
const inputsBox = document.querySelector( '.js-inputs-box' );
const dataInputs = [
    {
        theme: 'profile',
        label: 'Почта',
        id: 'email',
        placeholder: 'Введите email',
        name: 'email',
        type: 'email',
        value: 'email@email.com',
        disabled: true,
        error: false
    },
    {
        theme: 'profile',
        label: 'Логин',
        id: 'login',
        placeholder: 'Введите логин',
        name: 'login',
        type: 'text',
        value: 'login',
        disabled: true,
        error: false
    },
    {
        theme: 'profile',
        label: 'Имя',
        id: 'name',
        placeholder: 'Введите Имя',
        name: 'name',
        type: 'text',
        value: 'Имя',
        disabled: true,
        error: false
    },
    {
        theme: 'profile',
        label: 'Фамилия',
        id: 'secondName',
        placeholder: 'Введите Фамилия',
        name: 'secondName',
        type: 'text',
        value: 'Фамилия',
        disabled: true,
        error: false
    },
    {
        theme: 'profile',
        label: 'Телефон',
        id: 'phone',
        placeholder: 'Введите Телефон',
        name: 'phone',
        type: 'tel',
        value: 'Телефон',
        disabled: true,
        error: false
    },
];

inputsBox.innerHTML = createInputs( dataInputs );
avatarContainer.innerHTML = pug.render( avatarComponent( avatarSettings ) );
