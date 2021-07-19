import "../profile/profile.scss";
import pug from 'pug';
import { avatarComponent } from '../../components/avatar';
import { createInputs } from "../../utils/createInputs";

const avatarContainer = document.querySelector( '.js-avatar-container' );
const inputsBox = document.querySelector( '.js-inputs-box' );
const avatarSettings = {
    id: '1',
    src: 'https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg',
    name: 'Ivanov Sergey'
}
const dataInputs = [
    {
        theme: 'profile',
        label: 'Старый пароль',
        id: 'oldpassword',
        placeholder: '',
        name: 'oldpassword',
        type: 'password',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        theme: 'profile',
        label: 'Новый пароль',
        id: 'password',
        placeholder: '',
        name: 'password',
        type: 'password',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
    {
        theme: 'profile',
        label: 'Повторите новый пароль',
        id: 'repassword',
        placeholder: '',
        name: 'repassword',
        type: 'password',
        value: '',
        disabled: false,
        error: 'Ошибка'
    },
];

inputsBox.innerHTML = createInputs( dataInputs );
avatarContainer.innerHTML = pug.render( avatarComponent( avatarSettings ) );
