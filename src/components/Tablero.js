import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import fichaRoja from '../Images/fichaRoja.png';
import fichaAmarilla from '../Images/fichaAmarilla.png';
import fichaVacia from '../Images/fichaVacia.png';
import '../css/Tablero.css';
import { Fragment } from 'react';
import menu from '../pages/Menu';


const cookies = new Cookies();

class Tablero extends Component{

    constructor(props) {
        super(props);
        this.state={
            matrix: [],
            size : 7
        }
        this.createMatrix= this.createMatrix.bind(this);
        this.clickHandler=this.clickHandler.bind(this);
    }

    
    componentDidMount(){
        console.log("mount");
        this.createMatrix(cookies.get('size'));
    }


    createMatrix(n){  //creates an empty matriz according to the size selected by the user *INCOMPLETE*
        this.setState({size:n})
        const mat = []; //new empty matrix
        for (let index = 0; index < n**2; index++) { // fill it with 0's
            mat.push(0);
        }
        this.setState({matrix:mat}); // replace default matrix
    }

    buscarFondo(index) {
        var n = parseInt(this.state.size);
        var total = (n * n) - 1; // total number of index
        
        // validate if current position is not used
        if (this.state.matrix[index] == 0) {
            while (this.state.matrix[index] == 0) {
                // validate if it's the last row
                if(index+n > total) {
                    break;
                }
                // Validates if there is a file bellow
                if (this.state.matrix[index + n] != 0) {
                    break;
                }
                index += n; // Goes dowm in the matrix
            }
        } else {
            while (this.state.matrix[index] != 0) {
                // validate if it's the first row
                if((index - n) < 0) {
                    break;
                }
                // Validates if there is not a file above
                if ((this.state.matrix[(parseInt(index) - n)] == 0)) {
                    return (index - n);
                }
                index -= n; // Goes dowm in the matrix
            }
        }
        if(this.state.matrix[index] != 0) {
            return -1; // The column is full
        }
        return index;
    }
    
    clickHandler = function (click) {  //function to get id of a clicked token
        var index = parseInt(click.target.getAttribute("id"));
        var fondo = this.buscarFondo(index);
        this.posicionarFicha(fondo, 2);
    }

    posicionarFicha(index, color) {
        // Does not change the player turn, the colunm is full
        if (index == -1) {
            return;
        } else {
            // change the state of the matrix
            this.state.matrix[index] = color;
        }
    }

    render(){
        return(
            this.state.matrix.map((image,index) =>{
                if(image===0){
                    if((index+1)%this.state.size==0){
                        return (
                            <Fragment>
                                <img  key={index} id= {index}src={fichaVacia}  className= "fichaVacia" onClick={this.clickHandler} alt=" "/>
                                <br key= {1000+index}/>
                            </Fragment>
                        )
                    }return <img  key={index} id= {index}src={fichaVacia}  className= "fichaVacia" onClick={this.clickHandler} alt=" "/>
                }
                else if (image===1){
                    if((index+1)%this.state.size==0){
                    return (
                        <Fragment> 
                            <img key={index} id= {index} src={fichaRoja}  className= "fichaRoja" onClick= {this.clickHandler} alt=" "/> 
                            <br key={1000+index} />
                        </Fragment>
                    )
                    }return <img key={index} id= {index} src={fichaRoja}  className= "fichaRoja" onClick= {this.clickHandler} alt=" "/> 

                }else if (image===2){
                    if((index+1)%this.state.size==0){
                    return(
                        <Fragment>
                            <img key={index} id= {index} src={fichaAmarilla}  className= "fichaAmarilla" onClick= {this.clickHandler} alt=" "/>
                            <br key={1000+index} />
                        </Fragment>
                        )
                    }return <img key={index} id= {index} src={fichaAmarilla}  className= "fichaAmarilla" onClick= {this.clickHandler} alt=" "/>}
                },
            )
        );
}}

export default Tablero;