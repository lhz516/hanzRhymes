import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Layout = (props) => (
  <div>
    <div className="">
      <div className="ui menu">
        <div className="ui page container">
          <Link className="item" activeClassName="active" to="/">HanzRhymes</Link>
          <Link className="item" activeClassName="active" to="/about">关于</Link>
        </div>
      </div>
    </div>
    <div className="ui grid container">
      {props.children}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
