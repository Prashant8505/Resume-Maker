import React from 'react';
import logo from "../../static/images/resume.png";
import { NavLink } from "react-router-dom";
const Lp = () => {
  return (

    <div className="container  lp-page center">
      <div className="section">
        <h1>Make Resume the quick And easy way</h1>
        <p >Highlight your skills and attract Recruiters, land your dream job </p>
        <br></br>
        <div >
          <NavLink to="/getting-started" className="btn hvr-float-shadow"><span>Lets Make it</span>
          </NavLink>

        </div>
        <img src={logo} className="lp-resume" alt="logo" />
      </div>
    </div>

  );
}

export default Lp;