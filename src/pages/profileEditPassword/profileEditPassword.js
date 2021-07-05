import "../profile/profile.scss";
import pug from 'pug';
import { avatarComponent } from '../../components/avatar';
const avatarContainer = document.querySelector('.js-avatar-container');
const avatarSettings = {
    src: 'https://i.pinimg.com/originals/9a/23/45/9a2345280c836c94a056f96459a52b0c.jpg',
    name: 'Ivanov Sergey'
}

avatarContainer.innerHTML = pug.render(avatarComponent( avatarSettings ));
