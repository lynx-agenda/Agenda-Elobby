import { useCallback } from "react";
import Swal from "sweetalert2";
import postElement from "../services/postElement";
import postReview from "../services/postReviews";
import useUser from "./useUser"


export default function useModal()  {
    const {jwt} = useUser();

    const ViewModalReview = useCallback(async ({idApi, type}) => { 
        const { value: formValues } = await Swal.fire({
            title: 'Crear review',
            showCancelButton: true,
            html:
                `<div class="container">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Escribe tu review aqui..." id="swal-input1" style="height: 200px; resize: none;"></textarea>
                        <label for="swal-input1">Review</label>
                    </div>
                    <div class="mt-2">
                        <label for="swal-input2" class="form-label">Nota</label>
                        <input type="number" class="form-control" id="swal-input2" placeholder="0-10" min=0 max=10>
                    </div>
                </div>`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        },[type])
        if (formValues!==undefined) {
            let values = formValues;
            values[1] = parseInt(values[1]) 
        
            if (values[1]>=0 && values[1]<=10 && values[0]!=="") {
                let note = values[1];
                let text = values[0];
                await postReview({idApi, note, text, type, jwt});
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha crcedo la review',
                    text: 'Se ha añadido la review al elemento'
                }).then(() => window.location.reload());
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Datos no validos',
                    text: 'La review no puede estar vacia y la nota tiene que se entre 0 y 10'
                })
            }
        }
    },[jwt])

    const ViewModalState = useCallback(async ({idApi, type, newElement}) => {
        let addDeleteCheck = '';
        // if(!newElement) {
        //     addDeleteCheck = `<div class="form-check mt-3">
        //                         <input class="form-check-input" type="radio" name="state" id="swal-radio5" value="delete">
        //                         <label class="form-check-label" for="swal-radio5">
        //                             Eliminar
        //                         </label>
        //                     </div>`}
        const { value: formValues } = await Swal.fire({
            title: 'Añadir a...',
            showCancelButton: true,
            html:
                `<div class="container">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="state" id="swal-radio1" value="watching">
                        <label class="form-check-label" for="swal-radio1">
                            ${type === "game" ? 'Jugando' : 'Viendo'}
                        </label>
                    </div> 
                    <div class="form-check mt-3">
                        <input class="form-check-input" type="radio" name="state" id="swal-radio2" value="completed">
                        <label class="form-check-label" for="swal-radio2">
                            Terminado
                        </label>
                    </div>
                    <div class="form-check mt-3">
                        <input class="form-check-input" type="radio" name="state" id="swal-radio3" value="pending">
                        <label class="form-check-label" for="swal-radio3">
                            Pendiente
                        </label>
                    </div>
                    <div class="form-check mt-3">
                        <input class="form-check-input" type="radio" name="state" id="swal-radio4" value="dropped">
                        <label class="form-check-label" for="swal-radio4">
                            Descartado
                        </label>
                    </div>
                    ${addDeleteCheck}
                </div>`,
            focusConfirm: false,
            preConfirm: () => {
                let option =  [
                    {ckecked: document.getElementById('swal-radio1').checked, type: document.getElementById('swal-radio1').value},
                    {ckecked: document.getElementById('swal-radio2').checked, type: document.getElementById('swal-radio2').value},
                    {ckecked: document.getElementById('swal-radio3').checked, type: document.getElementById('swal-radio3').value},
                    {ckecked: document.getElementById('swal-radio4').checked, type: document.getElementById('swal-radio4').value},
                ]
                if(!newElement){
                    // option.push({ckecked: document.getElementById('swal-radio5').checked, type: document.getElementById('swal-radio5').value})
                }
                return option
            }
        })
        if (formValues!==undefined){
            
            const select = formValues.find(element => element.ckecked);
            if(select!==undefined){
            const status = select.type;
            await postElement({idApi, status, type, jwt});
                if(status !== "delete"){
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha añadido',
                        text: '¡Ya podras ver el elemento en tu agenda!'
                    }).then(() => window.location.reload());
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha eliminado',
                        text: '¡Ya no tendrás el elemento en tu agenda!'
                    }).then(() => window.location.reload());
                }
            }
        }
    },[jwt])

    return{
        ViewModalReview,
        ViewModalState
    }
}