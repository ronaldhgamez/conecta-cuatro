import React, {Component} from 'react';
import Tablero from '../components/Tablero';
import '../css/Game.css';


class Game extends Component{

    constructor(props){
        super(props);
        this.state ={
            player1 : " ",
            player2 : " ",
            winner : " ",
            minutes : 0,
            seconds : 0
        };
        this.counter = null; // timer
        this.iniciarContador= this.startTimer.bind(this); //timer
    }

    startTimer(){ //It changes the state of the timer and updates it on screen
        this.counter = setInterval(() => {
            if(this.state.seconds==59){
              this.setState({minutes: this.state.minutes + 1})
              this.setState({seconds: 0})
            }
            else  
            this.setState({ seconds: this.state.seconds + 1 });
          }, 1200);
    }
    componentDidMount(){ // It is executed when components are displayed for the first time
        this.startTimer();
    }

    render(){

        return(
            <div className= "GameMainContainer">
                <div className="GameSecondaryContainer">
                    <Tablero className="tablero" size={this.state.size} />
                </div>
                <div className="GameTimerContainer">
                    <h2 className= "lbltiempo">Tiempo</h2>
                    <h2>{this.state.minutes + " : " + this.state.seconds}</h2>
                </div> 
                
            </div>
        );
        
    }
    
}

export default Game;