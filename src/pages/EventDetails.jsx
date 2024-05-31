import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useEvent, useComments, useAddComment } from "../integrations/supabase";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: eventLoading, isError: eventError } = useEvent(id);
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments(id);
  const addComment = useAddComment();

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    addComment.mutate({ content: newComment, event_id: id });
    setNewComment("");
  };

  if (eventLoading || commentsLoading) return <Text>Loading...</Text>;
  if (eventError || commentsError) return <Text>Error loading event details</Text>;

  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={4}>
        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <Text fontSize="2xl">{event.name}</Text>
          <Text>{event.date}</Text>
          <Text>{event.description}</Text>
          <Text>Venue ID: {event.venue_id}</Text>
        </Box>

        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <Text fontSize="xl" mb={4}>Comments</Text>
          {comments.map((comment) => (
            <Box key={comment.id} p={2} borderBottomWidth={1}>
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </Box>

        <Box w="100%" p={4} borderWidth={1} borderRadius="lg">
          <FormControl>
            <FormLabel>Add a Comment</FormLabel>
            <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          </FormControl>
          <Button mt={4} onClick={handleAddComment}>Submit</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetails;