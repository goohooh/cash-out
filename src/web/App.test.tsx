import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders title', async () => {
  render(<App />);
  const appTitle = screen.getByText(/장부/i);
  await waitFor(() => {
    expect(appTitle).toBeInTheDocument();
  })
});
