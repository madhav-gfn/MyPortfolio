// src/pages/Projects.jsx
import {
  Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Heading,
  HStack, Icon, Input, Link, SimpleGrid, Skeleton, Stack, Tag, Text, Wrap, WrapItem, useToast
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

async function fetchProjects() {
  const res = await axios.get(`${API_BASE}/projects`);
  return res.data;
}

export default function Projects() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });
  const [query, setQuery] = useState('');
  const [tech, setTech] = useState('');

  const importMutation = useMutation({
    mutationFn: async (username) => {
      const res = await axios.post(`${API_BASE}/projects/import-github`, { githubUsername: username });
      return res.data;
    },
    onSuccess: () => {
      toast({ title: 'Imported from GitHub', status: 'success' });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (e) => toast({ title: 'Import failed', description: e?.response?.data?.message || e.message, status: 'error' })
  });

  const projects = data || [];

  const techOptions = useMemo(() => {
    const set = new Set();
    projects.forEach(p => (p.techStack || []).forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchesTech = tech ? (p.techStack || []).includes(tech) : true;
      return matchesQuery && matchesTech;
    });
  }, [projects, query, tech]);

  return (
    <Container maxW="7xl">
      <Stack spacing={6}>
        <Heading size="xl">Projects</Heading>

        <HStack gap={4} flexWrap="wrap">
          <Input placeholder="Search projects..." maxW="420px" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Input placeholder="Filter by tech (e.g. react)" maxW="280px" value={tech} onChange={(e) => setTech(e.target.value)} />
          <Button
            variant="outline"
            onClick={async () => {
              const username = prompt('GitHub username to import projects tagged with "portfolio"');
              if (username) importMutation.mutate(username);
            }}>
            Import from GitHub
          </Button>
        </HStack>

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

        {isError && (
          <Box color="red.400">Failed to load projects: {error?.message}</Box>
        )}

        {!isLoading && !isError && (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {filtered.map((p, idx) => (
              <MotionCard
                key={p._id || idx}
                rounded="xl"
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}>
                <CardHeader>
                  <Heading size="md">{p.title}</Heading>
                  {p.importedFromGithub && <Badge ml={2} colorScheme="purple">Imported</Badge>}
                </CardHeader>
                <CardBody>
                  <Text color="gray.600" noOfLines={4}>{p.description}</Text>
                  <Wrap mt={4}>
                    {(p.techStack || []).map((t) => (
                      <WrapItem key={t}>
                        <Tag colorScheme="teal" variant="subtle">{t}</Tag>
                      </WrapItem>
                    ))}
                  </Wrap>
                </CardBody>
                <CardFooter justify="space-between" flexWrap="wrap" gap={2}>
                  {p.github && (
                    <Link href={p.github} isExternal>
                      <Button size="sm" rightIcon={<ExternalLinkIcon />}>GitHub</Button>
                    </Link>
                  )}
                  {p.liveDemo && (
                    <Link href={p.liveDemo} isExternal>
                      <Button size="sm" variant="outline" rightIcon={<ExternalLinkIcon />}>Live Demo</Button>
                    </Link>
                  )}
                </CardFooter>
              </MotionCard>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}
