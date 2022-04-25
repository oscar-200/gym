import React from "react";
import "./../../css/About.css";
import aboutImg from "./../../assets/img/imgAbout2.jpg";

import {IconButton} from '@material-ui/core'
import Menu from '@material-ui/icons/Menu';


function About() {
  /*
  //  Up To Top Btn
  window.addEventListener("scroll", function () {
    const upToTop = document.querySelector("a.bottom__to__top");
    upToTop.classList.toggle("active", window.scrollY > 0)
  });
  */

  return (
    <div className="about component__space" id="About">
      <div className="container">
        <div className="row">
          <div className="col__2">
            <img src={aboutImg} alt="" className="about__img" />
          </div>
          <div className="col__2">
            <h1 className="about__heading">Sobre nosotros</h1>
            <div className="about__meta">
              <p className="about__text p__color">
                Lorem
              </p>
              <p className="about__text p__color">
                Ut saepe error ex dicta quia aut voluptatum dignissimos.
                Et tempora cumque qui eius quod non dignissimos
                exercitationem qui culpa internos et suscipit dolores
                est dolorem culpa et voluptas eaque. Sed harum magnam
                quo deserunt quod et voluptatem minus.

                Ut saepe error ex dicta quia aut voluptatum dignissimos.
                Et tempora cumque qui eius quod non dignissimos
                exercitationem qui culpa internos et suscipit dolores
                est dolorem culpa et voluptas eaque. Sed harum magnam
                quo deserunt quod et voluptatem minus.
              </p>
              <p className="about__text p__color">
                Ut saepe error ex dicta quia aut voluptatum dignissimos.
                Et tempora cumque qui eius quod non dignissimos
                exercitationem qui culpa internos et suscipit dolores
                est dolorem culpa et voluptas eaque. Sed harum magnam
                quo deserunt quod et voluptatem minus.

                Ut saepe error ex dicta quia aut voluptatum dignissimos.
                Et tempora cumque qui eius quod non dignissimos
                exercitationem qui culpa internos et suscipit dolores
                est dolorem culpa et voluptas eaque. Sed harum magnam
                quo deserunt quod et voluptatem minus.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* UP TO TOP BTN */}
      <div className="up__to__top__btn">
        <a href="#" className="bottom__to__top">


        </a>
      </div>
    </div>
  );
}

export default About;
