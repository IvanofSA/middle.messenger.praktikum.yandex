import './avatar.scss'

export const avatarComponent = ({ id, src, name = null}) => {
    const nameTag = name ? `.avatar-component__name ${name}` : '';
    return `.avatar-component#${id}
                .avatar-component__img
                    img(src="${src}")
                ${nameTag}`
}
