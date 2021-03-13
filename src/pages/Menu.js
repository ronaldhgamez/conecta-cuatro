import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();
let tamSelected = ""; // the variable saves the selected size

class Menu extends Component {

/*     constructor(props){
        super(props);
        this.state={
            size:8
        }
        
    } */

    

    signOff=()=>{
        cookies.remove('name', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    //Security
    componentDidMount() {
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }

    startGame=() => { // **INCOMPLETE**
        
        var size = 7;

        switch (tamSelected) { // define selected matriz size
            case "tam4":
                size=4;
                break;
            case "tam5":
                size=5;
                break;
            case "tam6":
                size=6;
                break;
            case "tam7":
                size=7;
                break;
            case "tam8":
                size=8;
                break;
            case "tam9":
                size=9;
                break;
            case "tam10":
                size=10;
                break;
            default:
                size=7;
                break;
        }
        cookies.set('size',size,{path: "/"});
        window.location.href='/game'
    }


    render() {
        return (
            <div className= "MenuMainContainer">
                <div className="MenuSecondaryContainer">
                    <div className="MenuMainLabel">
                        Menu Principal
                    </div>
                    <br/>
                    <div className= "MenuComboBox">
                    {/*Create the combobox of sizes*/}
                    <select
                        onChange={(e) => {
                            tamSelected = e.target.value;
                        }}
                    >
                        <option value="menu">Seleccione el tamaño del tablero...</option>
                        <option value="tam4">4x4</option>
                        <option value="tam5">5x5</option>
                        <option value="tam6">6x6</option>
                        <option value="tam7">7x7</option>
                        <option value="tam8">8x8</option>
                        <option value="tam9">9x9</option>
                        <option value="tam10">10x10</option>

                    </select>
                    </div>
                    <br/>
                    <div className= "MenuBtns">
                        <button className="btnSignOff" onClick={()=>this.signOff()}>Cerrar Sesión</button>
                        <button className="btnStartGame" onClick={()=>this.startGame()}>Start Game</button>
                    </div>
                </div>
            </div>
        );

    }

}
export default Menu;