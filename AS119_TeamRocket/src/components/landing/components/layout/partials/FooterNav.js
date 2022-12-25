import React from 'react';
import classNames from 'classnames';
// import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>About us</a>
        </li>
        <li>
          <a>FAQ's</a>
        </li>
        <li>
          <a>Support</a>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;