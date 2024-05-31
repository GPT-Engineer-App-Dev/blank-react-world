import { Box, Flex, Link, Spacer, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box bg={bg} px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={NavLink} to="/" px={2} py={1} rounded={"md"} _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}>
            Home
          </Link>
          <Link as={NavLink} to="/events" px={2} py={1} rounded={"md"} _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}>
            Events
          </Link>
        </Box>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default Navbar;