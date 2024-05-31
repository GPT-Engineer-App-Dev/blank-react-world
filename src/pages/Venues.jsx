import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack, Select } from "@chakra-ui/react";
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from "../integrations/supabase";

const Venues = () => {
  const { data: venues, isLoading, isError } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: "", location: "", description: "" });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVenue({ ...newVenue, [name]: value });
  };

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: "", location: "", description: "" });
  };

  const handleUpdateVenue = (venue) => {
    updateVenue.mutate(venue);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading venues</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={4}>
        <Box w="100%">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={newVenue.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={newVenue.location} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={newVenue.description} onChange={handleInputChange} />
          </FormControl>
          <Button mt={4} onClick={handleAddVenue}>Add Venue</Button>
        </Box>

        {venues.map((venue) => (
          <Box key={venue.id} w="100%" p={4} borderWidth={1} borderRadius="lg">
            {editingVenue?.id === venue.id ? (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name="name" value={editingVenue.name} onChange={(e) => setEditingVenue({ ...editingVenue, name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input name="location" value={editingVenue.location} onChange={(e) => setEditingVenue({ ...editingVenue, location: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" value={editingVenue.description} onChange={(e) => setEditingVenue({ ...editingVenue, description: e.target.value })} />
                </FormControl>
                <Button mt={4} onClick={() => handleUpdateVenue(editingVenue)}>Update Venue</Button>
              </>
            ) : (
              <>
                <Text fontSize="xl">{venue.name}</Text>
                <Text>{venue.location}</Text>
                <Text>{venue.description}</Text>
                <Button mt={2} onClick={() => setEditingVenue(venue)}>Edit</Button>
                <Button mt={2} onClick={() => handleDeleteVenue(venue.id)}>Delete</Button>
              </>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Venues;