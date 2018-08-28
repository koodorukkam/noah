import React from 'react'

export default () => (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand js-scroll-trigger" href="#page-top">Koodorukkam</a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#donate">Donate</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#request">Request</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href="#help">How Can I Help?</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
)