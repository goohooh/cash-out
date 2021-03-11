import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest
  .useFakeTimers('modern')
  .setSystemTime(new Date('2021-03-01T15:00:00.000Z').getTime());

it("renders title", async () => {
  render(<App />);
  const appTitle = screen.getByText(/장부/i);
  await waitFor(() => {
    expect(appTitle).toBeInTheDocument();
  })
});
