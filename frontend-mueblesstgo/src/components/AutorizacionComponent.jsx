import React, { Component } from "react";
import NavbarComponent3 from "./NavbarComponent3";
import styled from "styled-components";
import AutorizacionService from "../services/AutorizacionService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import { createGlobalStyle } from 'styled-components'

class AutorizacionComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rut: "",
          fecha: ""
        };
        this.changeRutHandler = this.changeRutHandler.bind(this);
        this.changeFechaHandler = this.changeFechaHandler.bind(this);
    }

    changeFechaHandler = (event) => {
        this.setState({ fecha: event.target.value });
        console.log(this.state.fecha);
    };

    changeRutHandler = (event) => {
        this.setState({ rut: event.target.value });
        console.log(this.state.rut);
    };
    
    ingresarAutorizacion = (e) => {
        e.preventDefault();
        swal({
            title: "¿Está seguro de que desea enviar la autorización?",
            text: "Una vez enviada, no podrá ser modificada. El empleado quedará AUTORIZADO para trabajar horas extras en la FECHA indicada.",
            icon: "warning",
            buttons: ["Cancelar", "Enviar"],
            dangerMode: true
        }).then(respuesta=>{
            if(respuesta){
                swal("Autorización enviada correctamente!", {icon: "success", timer: "3000"});
                let autorizacion = { rut: this.state.rut, fecha: this.state.fecha};
                console.log("justificativo => " + JSON.stringify(autorizacion));
                AutorizacionService.IngresarAutorizacion(autorizacion).then(
                    (res) => {
                    }
                  );
                }
            else{
                swal({text: "Autorización no enviada.", icon: "error"});
            }
        });
    };

    
    render(){
        return(
            <Styles>
            <div className="home">
                <NavbarComponent3 />
                    <div className="mainclass">
                        <div className="form1">
                            <h1 className="text-center"><b>Autorizaciones</b></h1>
                            <div className="formcontainer">
                                <hr></hr>
                                <div className="container">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="rut" onChange={this.changeRutHandler}>
                                            <Form.Label>Rut del empleado</Form.Label>
                                            <Form.Control type="rut" placeholder="Rut del empleado en formato xx.xxx.xxx-x" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="fecha" onChange={this.changeFechaHandler}>
                                            <Form.Label>Fecha de la autorización</Form.Label>
                                            <Form.Control type="fecha" placeholder="Fecha en formato AAAA/MM/DD" />
                                        </Form.Group>
                                    </Form>
                                </div>
                                <Button className="boton" onClick={this.ingresarAutorizacion}>Registrar Autorización</Button>
                            </div>
                        </div>
                    </div>
            </div>
            </Styles>
        )
    }
}

export default AutorizacionComponent;


const Styles = styled.div`

.text-center {
    text-align: center;
    justify-content: center;
    padding-top: 8px;
    font-family: "Arial Black", Gadget, sans-serif;
    font-size: 30px;
    letter-spacing: 0px;
    word-spacing: 2px;
    color: #000000;
    font-weight: 700;
    text-decoration: none solid rgb(68, 68, 68);
    font-style: normal;
    font-variant: normal;
    text-transform: uppercase;
}

.home{
    background-color: #006992;
    margin: 0;
    padding: 0;
}

.mainclass{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    font-family: Roboto, Arial, sans-serif;
    font-size: 15px;
}

.form1{
    border: 9px solid #CED0CE;
    background-color: #DADDD8;
    width: 50%;
    padding: 36px;
}

input[type=rut], input[type=fecha] {
    width: 100%;
    padding: 16px 8px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

Button {
    background-color: #42bfbb;
    color: white;
    padding: 14px 0;
    margin: 10px 0;
    border: none;
    cursor: grabbing;
    width: 100%;
}

Button:hover {
    opacity: 0.8;
}

.formcontainer {
    text-align: left;
    margin: 24px 100px 9px;
}

.container {
    padding: 24px 0;
    text-align:left;
}

span.psw {
    float: right;
    padding-top: 0;
    padding-right: 15px;
}
`