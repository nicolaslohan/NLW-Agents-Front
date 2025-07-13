export type CreateRoomRequest = Array<{
    name: string
    description: string
}>

export type CreateRoomResponse = Array<{
    roomId: string
}>