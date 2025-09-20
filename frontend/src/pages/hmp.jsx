// src/pages/Homepage.jsx
import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Homepage() {
  return (
    <Container maxW="7xl">
      <Stack direction={{ base: 'column', md: 'row' }} align="center" spacing={8}>
        <MotionBox
          flex="1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <Heading as="h1" size="2xl" mb={4}>
            Full Stack Developer
          </Heading>
          <Text fontSize="lg" color="gray.500" mb={6}>
            Building scalable apps and delightful interfaces with modern web technologies.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Button as={RouterLink} to="/projects" colorScheme="teal" size="lg">
              View Projects
            </Button>
            <Button as={RouterLink} to="/contact" variant="outline" size="lg">
              Contact Me
            </Button>
          </Stack>
        </MotionBox>

        <MotionBox
          flex="1"
          bgGradient="linear(to-br, teal.400, purple.500)"
          minH="260px"
          borderRadius="xl"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          boxShadow="xl"
        />
      </Stack>
    </Container>
  );
}
