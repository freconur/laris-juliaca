
import axios from "axios"
const URL = `https://facturacion.apisperu.com/api/v1`


// export function newCompany(payload) {
  // export const  newCompany = (userApisPeru:UserApisPeru) => {
  export function newCompany(userApisPeru:UserApisPeru) {
  // return async function (dispatch) {
    // console.log(`${URL}/auth/login`)
    // console.log('userApisPeru',userApisPeru)

    fetch(`${URL}/auth/login`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(userApisPeru)
    })
    .then(response => console.log(response))
  //   return async function () {
  //   console.log('entrando funcion')

  //   try {
  //     const response = await axios.post(
  //       `${URL}/auth/login`,
  //       userApisPeru
  //     );
  //     console.log('response',response)
  //     // return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}