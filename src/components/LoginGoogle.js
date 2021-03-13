import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import swal from "sweetalert";

const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();

class LoginGoogle extends React.Component{

    //Check the user is on Google and the user is in the data base
    check(username, name, password){
        axios.get(baseUrl,{params: {username:username}})
            .then(response=>{
                return response.data;})
            .then(response=>{
                //The user is on the database and Google
                if(response.length>0){
                    {/* Session variables are saved*/}
                    var respuesta=response[0];
                    cookies.set('name', respuesta.name, {path: "/"});
                    cookies.set('username', respuesta.username, {path: "/"});
                    alert(`Bienvenido ${respuesta.name}`);
                    {/*It is redirected to the menu */}
                    window.location.href="./menu";}
                else {
                    //The user is on Google but he or she is not sign up
                    swal({
                        title: "¡Este usuario no se encuentra registrado!",
                        text: "¿Desea registrarse?",
                        icon: "info",
                        buttons: ["Rechazar","Aceptar"]})
                        .then(respuesta=>{
                            {/* If the user want to sign up */}
                            if(respuesta){
                                axios.post(baseUrl, { name:name, username:username,
                                    password: md5(password)})
                                    .then((response) => {
                                        console.log(response);},
                                        (error) => {console.log(error);});
                                window.location.href="./menu";
                                swal({text: "¡Se han registrado sus datos con éxito!", icon:"success"})}
                            //{/* If the user do not want to sign up */}
                            else {
                                swal({text: "¡Sus datos no se encuentran registrados!", icon:"error"})}
                        });
                }
            });
    }

    render(){
        const respuestaGoogleSuccess=(respuesta)=>{
            this.check(respuesta.profileObj.email,respuesta.profileObj.givenName,respuesta.profileObj.googleId)
        }

        const respuestaGoogleFail = (respuesta) =>{
            alert("Login Failed");
        }

        return (
            <div className= "btn loginGoogle">
                <GoogleLogin
                clientId="555720526754-bekoeapd6rp3mh76rs49n88pd50k6ns1.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={respuestaGoogleSuccess} // if the login is successful
                onFailure={respuestaGoogleFail}    // or the login is wrong
                cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default LoginGoogle;