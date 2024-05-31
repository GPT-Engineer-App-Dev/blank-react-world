import { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Select, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent, usePinEvent, useUnpinEvent, useVenues } from "../integrations/supabase";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const { data: venues, isLoading: venuesLoading, isError: venuesError } = useVenues();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const pinEvent = usePinEvent();
  const unpinEvent = useUnpinEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", venue_id: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "", venue_id: "" });
  };

  const handleUpdateEvent = (event) => {
    updateEvent.mutate(event);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  const handlePinEvent = (id) => {
    pinEvent.mutate(id);
  };

  const handleUnpinEvent = (id) => {
    unpinEvent.mutate(id);
  };

  if (isLoading || venuesLoading) return <Text>Loading...</Text>;
  if (isError || venuesError) return <Text>Error loading events or venues</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={4}>
        <Box w="100%">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={newEvent.name} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="date" value={newEvent.date} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input name="description" value={newEvent.description} onChange={handleInputChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Venue</FormLabel>
            <Select name="venue_id" value={newEvent.venue_id} onChange={handleInputChange}>
              <option value="">Select a venue</option>
              {venues && venues.map((venue) => (
                <option key={venue.id} value={venue.id}>{venue.name}</option>
              ))}
            </Select>
          </FormControl>
          <Button mt={4} onClick={handleAddEvent}>Add Event</Button>
        </Box>

        {events.map((event) => (
          <Box key={event.id} w="100%" p={4} borderWidth={1} borderRadius="lg" bg={event.is_pinned ? "yellow.100" : "white"}>
            {editingEvent?.id === event.id ? (
              <>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input name="name" value={editingEvent.name} onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input name="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input name="description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>Venue</FormLabel>
                  <Select name="venue_id" value={editingEvent.venue_id} onChange={(e) => setEditingEvent({ ...editingEvent, venue_id: e.target.value })}>
                    <option value="">Select a venue</option>
                    {venues && venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>{venue.name}</option>
                    ))}
                  </Select>
                </FormControl>
                <Button mt={4} onClick={() => handleUpdateEvent(editingEvent)}>Update Event</Button>
              </>
            ) : (
              <>
                <Text fontSize="xl">{event.name}</Text>
                <Text>{event.date}</Text>
                <Text>{event.description}</Text>
                <Text>Venue: {venues.find(venue => venue.id === event.venue_id)?.name}</Text>
                <Flex mt={2}>
                  <Button mr={2} onClick={() => setEditingEvent(event)}>Edit</Button>
                  <Button mr={2} onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                  {event.is_pinned ? (
                    <Button onClick={() => handleUnpinEvent(event.id)}>Unpin</Button>
                  ) : (
                    <Button onClick={() => handlePinEvent(event.id)}>Pin</Button>
                  )}
                </Flex>
                <Link to={`/events/${event.id}`}>
                  <Button mt={2}>View Details</Button>
                </Link>
              </>
            )}
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Events;