import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import LoginGoogle from '../components/LoginGoogle'; // import googlelogin button component to display on login screen
import swal from 'sweetalert';

const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
    //saves the information that the user types in the entries
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    signUp=async ()=>{
        await axios.post(baseUrl, {
            name: this.state.form.username,
            username: this.state.form.username,
            password: md5(this.state.form.password)
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    login=async()=>{
        {/* The data is obtained to check against the database */}
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
            .then(response=>{
                return response.data;
            })
            .then(response=>{
                {/* If the user and password are rigth: */}
                if(response.length>0){
                    {/* Session variables are saved*/}
                    var respuesta=response[0];
                    cookies.set('name', respuesta.name, {path: "/"});
                    cookies.set('username', respuesta.username, {path: "/"});
                    alert(`Bienvenido ${respuesta.name}`);
                    {/*It is redirected to the menu */}
                    window.location.href="./menu";
                }
                else{
                    axios.get(baseUrl, {params: {username: this.state.form.username}})
                        .then(response=>{
                            return response.data;}).
                        then(response=>{
                            {/* If the user is rigth and the password is wrong: */}
                            if(response.length>0){
                                swal({text: "¡Su contraseña es incorrecta!", icon:"error"});
                                return response.data;}
                            else {
                                {/* If the user and password are wrong: */}
                                swal({
                                    title: "¡Este usuario no se encuentra registrado!",
                                    text: "¿Desea registrarse?",
                                    icon: "info",
                                    buttons: ["Rechazar","Aceptar"]}).
                                        then(respuesta=>{
                                            {/* If the user want to sign up */}
                                            if(respuesta){
                                                this.signUp();
                                                swal({text: "¡Se han registrado sus datos con éxito!",
                                                    icon:"success"})}
                                            //{/* If the user want to sign up */}
                                            else {
                                                swal({text: "¡Sus datos no se encuentran registrados!",
                                                    icon:"error"})}
                                        });

                            }
                        }).catch(error=>{console.log(error);})
                }}).catch(error=>{console.log(error);})
    }

    //Security
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./menu";
        }
    }

    render() {
        return (
            <div className="containerPrincipal">    {/*Refers to the css for the page style */}
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={()=> this.login()}>Iniciar Sesión</button>
                        <br />
                        <LoginGoogle /> {/* Display google login button */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;