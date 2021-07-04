import './input.scss'

export const inputComponent = ({ label, placeholder, name, type, value, disabled, error }) => {
    return `.input-component 
               input(name="${ name }" type="${ type }" placeholder="${ placeholder }" value="${ value }" ${disabled ? 'disabled' : ''}).input-component__input 
               label.input-component__label ${ label } 
               span.input-component__message.hide ${ error }`
}
