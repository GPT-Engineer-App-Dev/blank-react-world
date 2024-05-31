import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { useVenues } from "../integrations/supabase";

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();

  if (isLoading) return <Text>Loading venues...</Text>;
  if (isError) return <Text>Error loading venues</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={4}>
        {venues.map((venue) => (
          <Box key={venue.id} w="100%" p={4} borderWidth={1} borderRadius="lg">
            <Text fontSize="xl">{venue.name}</Text>
            <Text>{venue.location}</Text>
            <Text>{venue.description}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Venues;