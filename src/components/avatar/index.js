import './avatar.scss'

export const avatarComponent = ({ src, name = null}) => {
    const nameTag = name ? `.avatar-component__name ${name}` : '';
    return `.avatar-component
                .avatar-component__img
                    img(src="${src}")
                ${nameTag}`
}
