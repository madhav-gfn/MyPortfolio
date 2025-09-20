// src/pages/Blogs.jsx
import {
  Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Heading,
  SimpleGrid, Skeleton, Stack, Tag, Text, useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

async function fetchBlogs() {
  const res = await axios.get(`${API_BASE}/blogs`);
  return res.data;
}

export default function Blogs() {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['blogs'], queryFn: fetchBlogs });
  const [active, setActive] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container maxW="7xl">
      <Stack spacing={6}>
        <Heading size="xl">Blogs</Heading>

        {isLoading && (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} rounded="xl" p={0}>
                <Skeleton h="160px" />
                <CardBody>
                  <Skeleton height="24px" mb={3} />
                  <Skeleton height="16px" />
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}

        {isError && <Box color="red.400">Failed to load blogs: {error?.message}</Box>}

        {!isLoading && !isError && (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {(data || []).map((b) => (
              <Card key={b._id} rounded="xl" _hover={{ transform: 'translateY(-4px)' }} transition="all 0.2s">
                <CardHeader>
                  <Heading size="md" noOfLines={2}>{b.title}</Heading>
                  <Text fontSize="sm" color="gray.500">
                    By {b.author} • {dayjs(b.createdAt).format('MMM D, YYYY')}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text color="gray.600" noOfLines={4}>{b.content}</Text>
                  <Stack direction="row" wrap="wrap" mt={4}>
                    {(b.tags || []).map((t) => <Tag key={t} colorScheme="purple">{t}</Tag>)}
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => { setActive(b); onOpen(); }}>Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{active?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color="gray.500" mb={4}>
              By {active?.author} • {active?.createdAt ? dayjs(active.createdAt).format('MMM D, YYYY') : ''}
            </Text>
            <Text whiteSpace="pre-wrap">{active?.content}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
