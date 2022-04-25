import React from "react";
import "./../../css/Instalaciones.css";
import Project2 from './../../assets/img/imgFacilities/img2.jpg';
import Project1 from './../../assets/img/imgFacilities/img1.jpg';
import Project3 from './../../assets/img/imgFacilities/img3.jpg';
import Project4 from './../../assets/img/imgFacilities/img4.jpg';
import Project5 from './../../assets/img/imgFacilities/img5.jpg';
import Project6 from './../../assets/img/imgFacilities/img6.jpg';

function Project() {
  return (
    <div className="project component__space" id="Instalaciones">
      <div className="heading">
        <h1 className="heading">Instalaciones</h1>
        <p className="heading p__color">
          
        </p>
      </div>
       <div className="container">
           <div className="row">
             
             <div className="col__3">
                 <div className="project__box pointer relative">
                     <div className="project__box__img pointer relative">
                         <div className="project__img__box">
                             <img src={Project1} alt="" className="project__img" />
                         </div>
                         <div className="mask__effect"></div>
                     </div>
                     <div className="project__meta absolute">
                     <h5 className="project__text">Bonita</h5>
                     <h4 className="project__text">Sala de ejercicio</h4>
                     </div>
                 </div>
             </div>


             <div className="col__3">
                 <div className="project__box pointer relative">
                     <div className="project__box__img pointer relative">
                         <div className="project__img__box">
                             <img src={Project2} alt="" className="project__img" />
                         </div>
                         <div className="mask__effect"></div>
                     </div>
                     <div className="project__meta absolute">
                     <h5 className="project__text">Bonita</h5>
                     <h4 className="project__text">Sala de ejercicio</h4>
                     </div>
                 </div>
             </div>


             <div className="col__3">
                 <div className="project__box pointer relative">
                     <div className="project__box__img pointer relative">
                         <div className="project__img__box">
                             <img src={Project3} alt="" className="project__img" />
                         </div>
                         <div className="mask__effect"></div>
                     </div>
                     <div className="project__meta absolute">
                     <h5 className="project__text">Bonita</h5>
                     <h4 className="project__text">Sala de ejercicio</h4>
                     </div>
                 </div>
             </div>


             <div className="col__3">
                 <div className="project__box pointer relative">
                     <div className="project__box__img pointer relative">
                         <div className="project__img__box">
                             <img src={Project4} alt="" className="project__img" />
                         </div>
                         <div className="mask__effect"></div>
                     </div>
                     <div className="project__meta absolute">
                     <h5 className="project__text">Bonita</h5>
                     <h4 className="project__text">Sala de ejercicio</h4>
                     </div>
                 </div>
             </div>


             <div className="col__3">
                 <div className="project__box pointer relative">
                     <div className="project__box__img pointer relative">
                         <div className="project__img__box">
                             <img src={Project5} alt="" className="project__img" />
                         </div>
                         <div className="mask__effect"></div>
                     </div>
                     <div className="project__meta absolute">
                     <h5 className="project__text">Bonita</h5>
                     <h4 className="project__text">Sala de ejercicio</h4>
                     </div>
                 </div>
             </div>


             <div className="col__3">
                 <div className="project__box pointer relative">
                     <div className="project__box__img pointer relative">
                         <div className="project__img__box">
                             <img src={Project6} alt="" className="project__img" />
                         </div>
                         <div className="mask__effect"></div>
                     </div>
                     <div className="project__meta absolute">
                     <h5 className="project__text">Bonita</h5>
                     <h4 className="project__text">Baños del gym</h4>
                     </div>
                 </div>
             </div>
             

           </div>
       </div>
    </div>
  );
}

export default Project;
