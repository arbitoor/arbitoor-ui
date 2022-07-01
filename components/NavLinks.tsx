import React from 'react';
import NextLink from 'next/link';
import { Flex, Text, LinkProps, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { links } from '../utils/navLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  styleClass?: string;
}

const activeLinkStyles: LinkProps = {
  color: '#de8f17',
  opacity: '1',
};

export default function NavLinks({ styleClass }: Props) {
  const { asPath } = useRouter();
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
          opacity="0.75"
          _hover={{ color: '#de8f17', opacity: '1' }}
          sx={asPath === link.url ? activeLinkStyles : undefined}
        >
          <FontAwesomeIcon icon={link.icon} height="18px" width="18px" />
          <NextLink href={`${link.url}`}>
            <Link
              fontSize="md"
              ml="6px"
              _hover={{ textDecoration: 'none' }}
              href={`${link.url}`}
              isExternal={link.external}
              _focus={{ border: 'none' }}
            >
              {link.text}
            </Link>
          </NextLink>
        </Flex>
      ))}
    </Flex>
  );
}
