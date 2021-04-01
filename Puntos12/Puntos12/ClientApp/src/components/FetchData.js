import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }
    resetForm() {
        this.refs.contactForm.reset();
    }


    sendMessage(e) {

        const params = {
            name: this.inputName.value,
            email: this.inputEmail.value,
            subject: this.inputPhone.value,
            message: this.textAreaMessage.value
        };

        alert(params.name);
        if (params.name && params.email && params.subject && params.message) {

            fetch("contacto", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) { // exito
                        alert('Mensaje enviado');
                    }
                    else {
                        alert('No se pudo enviar el mensaje');
                    }
                });
            // limpiamos nuestro formulario llamando la funcion resetform
            this.resetForm();
        }
        else
        {
            // En caso de no llenar los elementos necesario despliega un mensaje de alerta
            alert('Llene bien todos los datos', 'danger');
        }
    }
    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            
            <div className='container' style={{ padding: `40px 0px` }}>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
              <div className='row'>
                  <div className='col-sm-4'>
                      <h2>Contact Us</h2>
                      <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >
                          <div className='form-group'>
                              <label htmlFor='name'>Your Name:</label>
                              <input type='text' className='form-control' id='name'
                                  placeholder='Name' ref={name => this.inputName = name}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='exampleInputEmail1'>Email:</label>
                              <input type='email' className='form-control' id='email'
                                  placeholder='Email' ref={email => this.inputEmail = email}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='phone'>Subject:</label>
                              <input type='text' className='form-control' id='phone'
                                  placeholder='Subject' ref={phone => this.inputPhone = phone}
                              />
                          </div>
                          <div className='form-group'>
                              <label htmlFor='message'>Message</label>
                              <textarea className='form-control' id='message'
                                  rows='3' ref={message => this.textAreaMessage = message}>
                              </textarea>
                          </div>
                        <button type='submit' className='btn btn-primary bi bi-envelope'>Send Message</button>
                      </form>
                  </div>
              </div>
          </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
