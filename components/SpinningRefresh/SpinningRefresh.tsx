import React from 'react';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SpinningRefresh.module.css';

function SpinningRefresh() {
  return (
    <div>
      <FontAwesomeIcon
        icon={faRotateRight}
        color="whitesmoke"
        height="18px"
        width="18px"
        cursor="pointer"
        className={styles.spinRefresh}
      />
    </div>
  );
}

export default SpinningRefresh;
