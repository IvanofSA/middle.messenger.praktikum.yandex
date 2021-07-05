import './input.scss'

export const inputComponent = ({ label, placeholder, name, type, id, value, disabled, error }) => {
    return `.input-component 
               input(id="${id}" name="${ name }" type="${ type }" placeholder="${ placeholder }" value="${ value }" ${disabled ? 'disabled' : ''}).input-component__input 
               label(for="${id}").input-component__label ${ label } 
               span.input-component__message.hide ${ error }`
}
