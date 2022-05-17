import { render, screen } from '@testing-library/react';
import EditorScreen from './screens/EditorScreen';

test('renders learn react link', () => {
  render(<EditorScreen />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
