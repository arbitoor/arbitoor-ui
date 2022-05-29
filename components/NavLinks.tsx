import React from 'react';
import Link from 'next/link';
import { Flex, Text } from '@chakra-ui/react';
import { links } from '../utils/navLinks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  styleClass?: string;
}

export default function NavLinks({ styleClass }: Props) {
  return (
    <Flex
      flex="0.5"
      justifyContent="space-around"
      className={`page-links ${styleClass ? styleClass : ''}`}
      display={['none', 'none', 'none', 'flex']}
    >
      {links.map((link) => (
        <Flex
          key={link.id}
          alignItems="center"
          cursor="pointer"
          color="whitesmoke"
          opacity="0.6"
          _hover={{ color: '#de8f17', opacity: '1' }}
        >
          <FontAwesomeIcon icon={link.icon} height="18px" width="18px" />
          <Link href={`${link.url}`}>
            <Text fontSize="md" ml="6px">
              {link.text}
            </Text>
          </Link>
        </Flex>
      ))}
    </Flex>
  );
}
