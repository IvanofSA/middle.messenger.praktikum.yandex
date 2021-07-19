import pug from "pug";
import { inputComponent } from "../components/input";

export function createInputs( inputs ) {
    let temp = '';
    inputs.forEach(input => {
        temp += `${ pug.render( inputComponent( input ))}`
    });
    return temp;
}
