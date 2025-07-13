import { BrowserRouter, Route, Routes } from 'react-router';
import { CreateRoot } from "./pages/create-room";
import { Room } from "./pages/rooms";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const clientQuery = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={clientQuery}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoot />} />
          <Route element={<Room />} path="/rooms/:roomId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
