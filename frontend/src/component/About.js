import React from "react";

const About = () => {
  return <div className=" ms-md-4 ps-md-5">
<main>
    <section className="about-section text-center pb-5">
      <div className="container">
        <h1 className="display-4">About Us</h1>

        <div className="row">
          <div className="col-md-6">
            <h2>My Story</h2>
            <p>During my studies, I’ve developed a strong foundation in MERN-STACK, and I’ve worked on various projects that have allowed me to gain hands-on experience in CRUD Operation.</p>
          </div>
          <div className="col-md-6">
            <h2>My Mission</h2>
            <p>Start with something simple and small, then expand over time and gain more knowledge everything and everytime.</p>
          </div>
        </div>

        <h2 className="mt-5">Meet To Me</h2>
        <div >
          <div className=" team-member text-center">
            <img src={require('../static/RahulGupta.png')} alt="Team Member 1" className=" image-healing-animation"/>
            <h4>Rahul Gupta</h4>
            <p>Software Developer</p>
          </div>
          
          
        </div>

        <h2 className="mt-5">Contact Us</h2>
        <p>If you have any questions or would like to get in touch with us, please email us at <a href="mailto:rahulguptahotmail@gmail.com">rahulguptahotmail@gmail.com</a>.</p>
      </div>
    </section>
  </main>


  </div>;
};

export default About;
