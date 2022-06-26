import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  image,
  ...props
}) => {
  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-0">
        <Link to="/">
          <img
            src={image}
            alt="Open"
            width={225}
            height={225}/>
        </Link>
      </h1>
    </div>
  );
}

export default Logo;