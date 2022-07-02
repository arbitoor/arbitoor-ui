import React from 'react';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SpinningRefresh.module.css';
import { Button } from '@chakra-ui/react';

interface Props {
  fetchRoutes: () => void;
}

function SpinningRefresh({ fetchRoutes }: Props) {
  return (
    <div>
      <Button
        bg="transparent"
        _hover={{ background: '#de8f1761' }}
        onClick={fetchRoutes}
      >
        <FontAwesomeIcon
          icon={faRotateRight}
          color="whitesmoke"
          height="20px"
          width="20px"
          cursor="pointer"
          className={styles.spinRefresh}
        />
      </Button>
    </div>
  );
}

export default SpinningRefresh;
