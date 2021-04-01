import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = {
            form: []
        };
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
            alert('Mensaje enviado');
            // limpiamos nuestro formulario llamando la funcion resetform
            this.resetForm();
        } else {
            // En caso de no llenar los elementos necesario despliega un mensaje de alerta
            alert('Llene bien todos los datos', 'danger');
        };
  }

  render() {
    return (
          <div className='container' style={{ padding: `40px 0px` }}>
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
}
