import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Link,
  Image,
  Flex,
  Text,
  MenuItem,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { socials } from '../../utils/navLinks';

function SocialsDrawer() {
  return (
    <Menu>
      <MenuButton
        css={{
          '&:hover > span > div': { color: '#de8f17 !important', opacity: '1' },
        }}
      >
        <Flex
          alignItems="center"
          cursor="pointer"
          color="whitesmoke"
          opacity="0.75"
        >
          <FontAwesomeIcon icon={faBullhorn} height="18px" width="18px" />

          <Text fontSize="md" ml="6px">
            Socials
          </Text>
          <FontAwesomeIcon icon={faCaretDown} height="18px" width="18px" />
        </Flex>
      </MenuButton>
      <MenuList
        backgroundColor="#101010"
        color="whitesmoke"
        border="none"
        minW="10rem"
        borderRadius="12px"
      >
        {socials.map((listItem: any) => {
          return (
            <MenuItem
              key={listItem.id}
              _hover={{ bg: '#de8f1761' }}
              _focus={{ bg: 'none' }}
              justifyContent="center"
              alignItems="center"
              padding="4px 16px"
            >
              <Link
                fontSize="md"
                href={`${listItem.url}`}
                isExternal={listItem.external}
                _hover={{ textDecoration: 'none' }}
                _focus={{ border: 'none' }}
                fontWeight="normal"
                w="100%"
              >
                <Flex alignItems="center">
                  <Image
                    src={listItem.icon}
                    height="18px"
                    width="18px"
                    alt="twitter"
                    color="#fff"
                    fill="#fff"
                  />
                  <Text ml="12px">{listItem.text}</Text>
                </Flex>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default SocialsDrawer;
