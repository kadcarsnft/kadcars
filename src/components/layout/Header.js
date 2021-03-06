import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { DISCORD_URL, MEDIUM_URL, TWITTER_URL } from '../../utils/Constants';
import { KadcarGameContext } from '../kadcarcomponents/KadcarGameContextProvider';
import { AiFillMediumCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import LOGO from './../../assets/images/logo-nobackground-1000.png';

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const { setCurrentScreen } = useContext(KadcarGameContext);
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  return (
    <header
      {...props}
      className={classes}
      style={{marginTop: '20px', width: '100%'}}
    >
      <div /*className="container"*/ >
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo image={LOGO} width={225} height={225} url={'home'} onClick={() => setCurrentScreen(null)}/>
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner" style={{marginRight:'2%'}}>
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    {/* <li>
                      <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '30px' }}>Follow us:</span>
                    </li> */}
                    <li>
                      <a href={MEDIUM_URL} target="_blank">
                        {/* <FaDiscord size={25} color={'#7289DA'}/> */}
                        <AiFillMediumCircle size={40} color={'#ffff'}/>
                      </a>
                    </li>
                    <li>
                      <a href={TWITTER_URL} target="_blank">
                        {/* <FaTwitter size={25} color='#00acee'/> */}
                        <AiFillTwitterCircle size={40} color='#00acee'/>
                      </a>
                    </li>
                    <li>
                      <a href={DISCORD_URL} target="_blank">
                        {/* <FaDiscord size={25} color={'#7289DA'}/> */}
                        <BsDiscord size={35} color={'#7289DA'}/>
                      </a>
                    </li>
                  </ul>
                  {/* {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li>
                        <Link to="#0" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Sign up</Link>
                      </li>
                    </ul>} */}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;