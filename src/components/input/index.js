import './input.scss'

export const inputComponent = ({theme = 'login', label, placeholder, name, type, id, value, disabled, error }) => {
    const themeClass = `.input-component_${theme}`;
    const errorTag = error ? `span.input-component__message.hide ${ error }`: '';
    return `.input-component${themeClass} 
               input(id="${id}" name="${ name }" type="${ type }" placeholder="${ placeholder }" value="${ value }" ${disabled ? 'disabled' : ''}).input-component__input 
               label(for="${id}").input-component__label ${ label } 
               ${errorTag}`
}
