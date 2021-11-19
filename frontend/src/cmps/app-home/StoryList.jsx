import { Container } from '../shared/Container';
import { StoryPreview } from './StoryPreview';

export function StoryList({ stories, onClick }) {
  return (
    <Container className="story-list flex">
      {stories.map(story => (
        <StoryPreview key={story._id} id={story._id} user={story.user} />
      ))}
    </Container>
  );
}
