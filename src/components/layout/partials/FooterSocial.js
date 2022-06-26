import React, { Children } from 'react';
import classNames from 'classnames';
import { DISCORD_URL, MEDIUM_URL, TWITTER_URL } from '../../../utils/Constants';
import { AiFillMediumCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';

const SocialLink = ({ children, name, size, url }) => {

  return (
    <li>
      <a href={ url } target="_blank">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg">
          <title>{ name }</title>
          { children }
        </svg>
      </a>
    </li>
  );
}

const FooterSocial = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-social',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <SocialLink url={ MEDIUM_URL } name={"Medium"} size={"30"}>
          <AiFillMediumCircle size={30}/>
        </SocialLink>
        <SocialLink url={ TWITTER_URL } name={"Twitter"} size={"30"}>
          <AiFillTwitterCircle size={30}/>
        </SocialLink>
        <SocialLink url={ DISCORD_URL } name={"Discord"} size={"27"}>
          <BsDiscord size={27}/>
        </SocialLink>
      </ul>
    </div>
  );
}

export default FooterSocial;