import { BrowserRouter, Route, Routes } from 'react-router';
import { CreateRoot } from "./pages/create-room";
import { Room } from "./pages/rooms";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecordRoomAudio } from './pages/record-room-audio';

const clientQuery = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={clientQuery}>
      <BrowserRouter>
        <Routes>
          <Route index element={<CreateRoot />} />
          <Route element={<Room />} path="/rooms/:roomId" />
          <Route element={<RecordRoomAudio />} path="/room/:roomId/audio" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
