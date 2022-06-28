import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';

const Logo = ({
  className,
  image,
  width,
  height,
  url,
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
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <h1 className="m-0">
        {
          url === "home" ?
            <Link to="/">
              <img
                src={image}
                alt="Open"
                width={width}
                height={height} />
            </Link>
            :
            <a href={url} target="_blank">
              <img
                src={image}
                alt="Open"
                width={width}
                height={height} />
            </a>
        }
      </h1>
    </div>
  );
}

export default Logo;