import React from 'react';
import './../../css/Contact.css';
import contactImg from "./../../assets/img/imgContact.jpg"
function Contact() {
    return (
        <div className="contact component__space" id="Contact">
            <div className="row">
                <div className="col__2">
                    <div className="contact__box">
                        <div className="contact__meta">
                            <h1 className="hire__text">Contactanos</h1>
                            <p className="hire__text white">Puedes conumicarte via telefono o correo:</p>
                           <p className="hire__text white"><strong>+3333333333</strong> o correo <strong>admin@example.com</strong></p>
                        </div>
                        <div className="input__box">
                           <input type="text" className="contact name" placeholder="Tu nombre *" />
                           <input type="text" className="contact email" placeholder="Tu correo *" />
                           <input type="text" className="contact subject" placeholder="Escribe tu tema" />
                           <textarea name="message" id="message" placeholder="Escribe tu emnsaje"></textarea>
                           <button className="btn contact pointer" type="submit">Enviar</button>
                        </div>
                    </div>
                </div>
                <div className="col__2">
                    <img src={contactImg} alt="" className="contact__img" />
                </div>
            </div>
        </div>
    )
}

export default Contact
