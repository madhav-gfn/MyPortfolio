// src/App.jsx
import { Link as RouterLink, Routes, Route, useLocation } from 'react-router-dom';
import {
  Box, Container, Flex, HStack, IconButton, Link, Spacer, useColorMode,
  useColorModeValue, useDisclosure, Collapse, Button, Text
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';
import Homepage from './pages/hmp.jsx';
import Projects from './pages/prj.jsx';
import Blogs from './pages/Blogs.jsx';
import ContactMe from './pages/contactme.jsx';

const MotionBox = motion(Box);

const NavLink = ({ to, children, onClick }) => (
  <Link as={RouterLink} to={to} onClick={onClick}
    px={3} py={2} rounded="md"
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.100', 'gray.700') }}>
    {children}
  </Link>
);

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.900');
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();

  return (
    <Flex direction="column" minH="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Box as="header" position="sticky" top={0} zIndex={1000} bg={bg} boxShadow="sm">
        <Container maxW="7xl" py={2}>
          <Flex align="center">
            <HStack spacing={3}>
              <RouterLink to="/"><Text fontWeight="semibold">Portfolio</Text></RouterLink>
            </HStack>
            <Spacer />
            <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/blogs">Blogs</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <IconButton aria-label="Toggle color mode" onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} />
            </HStack>
            <HStack display={{ base: 'flex', md: 'none' }}>
              <IconButton aria-label="Toggle Menu" onClick={onToggle} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} />
            </HStack>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Flex direction="column" gap={2} py={2} display={{ md: 'none' }}>
              <NavLink to="/" onClick={onToggle}>Home</NavLink>
              <NavLink to="/projects" onClick={onToggle}>Projects</NavLink>
              <NavLink to="/blogs" onClick={onToggle}>Blogs</NavLink>
              <NavLink to="/contact" onClick={onToggle}>Contact</NavLink>
              <Button onClick={toggleColorMode} leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}>Theme</Button>
            </Flex>
          </Collapse>
        </Container>
      </Box>

      <Container as="main" maxW="7xl" flex="1 1 auto" py={{ base: 6, md: 10 }}>
        <AnimatePresence mode="wait">
          <MotionBox
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<ContactMe />} />
            </Routes>
          </MotionBox>
        </AnimatePresence>
      </Container>

      <Box as="footer" py={6} bg={bg} boxShadow="inner">
        <Container maxW="7xl">
          <Flex justify="space-between" align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
            <Text fontSize="sm">© {new Date().getFullYear()} Portfolio</Text>
            <HStack spacing={4}>
              <Link href="https://github.com" isExternal>GitHub</Link>
              <Link href="https://linkedin.com" isExternal>LinkedIn</Link>
              <Link href="mailto:hello@example.com">Email</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}
