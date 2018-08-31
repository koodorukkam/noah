import React from 'react'

export default () => (
<section className="bg-primary" id="about">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h2 className="section-heading text-white">Who are We?</h2>
          <hr className="light my-4" />
          <p className="text-faded mb-4 text-justify">
          We are a group of volunteers who have come together for a cause -to help the people affected by the floods. We aim at helping them get back to their normal lives is a better, stronger way. 
          <br/><br/>
          We believe in the power of what people can achieve when they come together. We are joined by many like minded organisations like G-Tech and NASSCOM, all with one purpose - to come together and help.
          <br/><br/>
          For any other queries, contact - <a style={{color: "white"}} href="mailto:koodorukkam@gmail.com">koodorukkam@gmail.com</a>
          </p>
          <a className="btn btn-light btn-xl sr-button" href="#donate">Donate Now!</a>
        </div>
      </div>
    </div>
</section>
)