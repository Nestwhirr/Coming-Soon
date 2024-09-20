import { useState, useEffect } from 'react'
import { ChakraProvider, Box, VStack, Heading, Text, Input, Button, Image, Flex, Container, extendTheme, keyframes, Alert, AlertIcon, AlertTitle, AlertDescription, ScaleFade } from '@chakra-ui/react'
import logo from '/tp-logo.png'
import mainIllustration from '/primary.svg'
import Confetti from 'react-confetti'

// Create a subtle pulse animation
const pulseKeyframe = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.03); }
  100% { opacity: 1; transform: scale(1); }
`

// Create an ellipsis animation
const ellipsisKeyframe = keyframes`
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
  100% { content: ''; }
`

// Create a custom theme with a greyish primary color and dark background
const theme = extendTheme({
  colors: {
    brand: {
      500: '#A0AEC0', // Light grey color
    },
    highlight: '#4EA585', // Highlight color
  },
  styles: {
    global: {
      body: {
        bg: 'black',
        color: 'white',
      },
    },
  },
})

function App() {
  const [email, setEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Netlify will handle form submission
    setShowAlert(true)
    setShowConfetti(true)
    setEmail('') // Clear the email input
  }

  const handleLogoClick = () => {
    setShowConfetti(true)
    setTimeout(() => {
      window.location.href = '/'
    }, 2000) // Redirect after 2 seconds
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 5000) // Auto-close after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [showAlert])

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000) // Stop confetti after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  return (
    <ChakraProvider theme={theme}>
      {showConfetti && <Confetti />}
      <Container maxW="container.xl" py={12}>
        <VStack spacing={12} align="stretch">
          <Box as="header" my={8}>
            <Image 
              src={logo} 
              alt="Nestwhirr Logo" 
              h="60px" 
              mx="auto" 
              cursor="pointer"
              onClick={handleLogoClick}
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: 'scale(1.1)' }}
            />
          </Box>
          {showAlert && (
            <ScaleFade initialScale={0.9} in={showAlert}>
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                bg="highlight"
                color="white"
                borderRadius="md"
                boxShadow="0 4px 6px rgba(78, 165, 133, 0.25)"
              >
                <AlertIcon boxSize="40px" mr={0} color="white" />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  Thank you for subscribing!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  We'll keep you updated on our launch. Stay tuned!
                </AlertDescription>
              </Alert>
            </ScaleFade>
          )}
          <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
            <VStack align={{ base: 'center', md: 'start' }} spacing={6} w="100%" textAlign={{ base: 'center', md: 'left' }}>
              <Heading as="h1" size="2xl" color="brand.500" transition="all 0.3s ease-in-out" _hover={{ transform: 'translateY(-5px)' }}>
                Stay tuned for something big!
              </Heading>
              <Heading 
                as="h2" 
                size="xl" 
                color="white" 
                position="relative"
                animation={`${pulseKeyframe} 2s ease-in-out infinite`}
                _after={{
                  content: "''",
                  position: 'absolute',
                  right: { base: '-15px', md: '-30px' },
                  animation: `${ellipsisKeyframe} 1.5s steps(4, end) infinite`,
                }}
              >
                Coming Soon
              </Heading>
              <Text fontSize="lg" color="gray.300" transition="all 0.3s ease-in-out" _hover={{ color: 'brand.500' }}>
                We're working on something new and exciting. We can't wait to share it with you. It's going to blow your mind!
              </Text>
              <Heading as="h3" size="lg" color="brand.500" mt={4} transition="all 0.3s ease-in-out" _hover={{ transform: 'translateX(5px)' }}>
                Tasks buzzing around your neighborhood nest.
              </Heading>
              <Text fontSize="md" fontStyle="italic" color="gray.400">
                Stay in the loop - <Box as="span" color="highlight">get notified</Box> when we're ready to launch.
              </Text>
              <Box as="form" w="100%" maxW="500px" name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <Flex direction={{ base: 'column', sm: 'row' }}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    mb={{ base: 2, sm: 0 }}
                    mr={{ base: 0, sm: 2 }}
                    borderColor="brand.500"
                    _hover={{ borderColor: 'brand.500' }}
                    _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #A0AEC0' }}
                    bg="gray.800"
                    color="white"
                    transition="all 0.3s ease-in-out"
                  />
                  <Button 
                    type="submit" 
                    bg="brand.500" 
                    color="black" 
                    w={{ base: '100%', sm: 'auto' }}
                    _hover={{ 
                      bg: 'highlight', 
                      color: 'white',
                      transform: 'translateY(-2px) scale(1.05)',
                      boxShadow: '0 4px 6px rgba(78, 165, 133, 0.25)'
                    }}
                    transition="all 0.3s ease-in-out"
                  >
                    Notify Me
                  </Button>
                </Flex>
              </Box>
            </VStack>
            <Box maxW={{ base: '100%', md: '45%' }} mt={{ base: 8, md: 0 }} transition="all 0.3s ease-in-out" _hover={{ transform: 'scale(1.05)' }}>
              <Image src={mainIllustration} alt="Main Illustration" w="100%" />
            </Box>
          </Flex>
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
