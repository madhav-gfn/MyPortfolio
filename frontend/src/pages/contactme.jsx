// src/pages/contactme.jsx
import {
  Box, Button, Container, FormControl, FormErrorMessage, FormLabel, Heading,
  Input, Textarea, useToast, VStack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function ContactMe() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();

  const onSubmit = async (values) => {
    try {
      await axios.post(`${API_BASE}/contact/add`, values);
      toast({ title: 'Message sent!', status: 'success' });
      reset();
    } catch (e) {
      toast({ title: 'Failed to send', description: e?.response?.data || e.message, status: 'error' });
    }
  };

  return (
    <Container maxW="2xl">
      <Heading mb={6}>Contact Me</Heading>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Jane Doe"
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="jane@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.message}>
            <FormLabel>Message</FormLabel>
            <Textarea
              rows={6}
              placeholder="Write your message..."
              {...register('message', { required: 'Message is required', minLength: { value: 5, message: 'Minimum 5 characters' } })}
            />
            <FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="teal" isLoading={isSubmitting} alignSelf="flex-start">
            Send
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

