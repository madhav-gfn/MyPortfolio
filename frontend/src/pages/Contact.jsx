import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { HiMail, HiUser, HiChat, HiPaperAirplane, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useContactForm } from '../hooks/useApi';

// Validation schema
const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

const Contact = () => {
  const contactMutation = useContactForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await contactMutation.mutateAsync(data);
      reset(); // Clear form after successful submission
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to send message:', error);
    }
  };

  const contactInfo = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'madmishra72@gmail.com',
      href: 'mailto:madmishra72@gmail.com',
    },
    {
      icon: HiPhone,
      label: 'Phone',
      value: '+91-9536068062',
      href: 'tel:+919536068062',
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Nagpur, Maharashtra, India',
      href: null,
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/madhav-gfn', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/madhav-mishra-4a0a62286/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 hover:shadow-glow-lg transition-all duration-300">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <HiChat className="text-primary-400" />
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-600/50 focus:ring-primary-500'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-dark-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-600/50 focus:ring-primary-500'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project or just say hi!"
                    className={`w-full px-4 py-3 bg-dark-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-600/50 focus:ring-primary-500'
                    }`}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-400"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || contactMutation.isLoading}
                  className={`cursor-target w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting || contactMutation.isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-black border border-white text-white'
                  }`}
                >
                  {isSubmitting || contactMutation.isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="order-1 lg:order-2 space-y-8"
          >
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Let's Connect</h2>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="cursor-target text-white transition-colors font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`cursor-target w-12 h-12 bg-dark-700/50 rounded-xl border border-gray-600/50 flex items-center justify-center text-gray-400 transition-all duration-200`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-dark-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Available for Work
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm currently available for freelance projects and full-time opportunities. 
                Whether you need help with web development, machine learning, or just want to discuss ideas, 
                I'd love to hear from you!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;