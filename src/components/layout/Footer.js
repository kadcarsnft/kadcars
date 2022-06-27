import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Logo from './partials/Logo';
import FooterNav from './partials/FooterNav';
import FooterSocial from './partials/FooterSocial';
import { FLUX_LABS_URL, MUSTANG_KNIGHTS_URL } from '../../utils/Constants';
import POWEREDBYFLUXLABS from './../../assets/images/Powered_by_Flux-02.png';
import FLUXLABS from './../../assets/images/fluxlabs-5.png';
import MUSTANGS from './../../assets/images/mustangs_clean.png';

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool
}

const defaultProps = {
  topOuterDivider: false,
  topDivider: false
}

const Footer = ({
  className,
  topOuterDivider,
  topDivider,
  ...props
}) => {

  const classes = classNames(
    'site-footer center-content-mobile',
    topOuterDivider && 'has-top-divider',
    className
  );

  return (
    <footer
      {...props}
      className={classes}
      style={{ width: '100%' }}
    >
      <div className="container">
        <div className={
          classNames(
            'site-footer-inner',
            topDivider && 'has-top-divider'
          )}>
          <h3 className="mt-0 mb-12">
            Partners:
          </h3>
          <div className="footer-top space-between text-xxs" style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', width: '75%', justifyContent:'space-between'}}>
                <Logo image={FLUXLABS} width={180} height={180} url={FLUX_LABS_URL}/>
                <Logo image={MUSTANGS} width={120} height={120} url={MUSTANG_KNIGHTS_URL}/>
                <Logo image={POWEREDBYFLUXLABS} width={180} height={180} url={FLUX_LABS_URL}/>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width:'25%', paddingRight: '10px' }}>
              <FooterSocial />
            </div>
          </div>
          <div className="footer-bottom space-between text-xxs invert-order-desktop">
            {/* <FooterNav /> */}
            {/* <div className="footer-copyright">Official partners of <a href={FLUX_LABS_URL}>Flux Labs</a>. All right reserved</div> */}
          </div>
        </div>
      </div>
    </footer >
  );
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;