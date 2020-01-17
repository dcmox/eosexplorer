import React from 'react'
import styles from '../App.module.scss'
import logo from './../img/eos-block-explorer.png';

export const Header = () => {
    return (
        <div className={styles.container}>
          <div id={styles.logo}>
            <a href="/" title="EOS Block Explorer">
              <img src={logo} alt="EOS Block Explorer" />
            </a>
          </div>
        </div>
    )
}

export default Header