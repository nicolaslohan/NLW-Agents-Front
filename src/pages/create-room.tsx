import { CreateRoomForm } from "@/components/create-room-form"
import { RoomList } from "@/components/room-list"

export function CreateRoot() {

    return (
        <>
            <div className="min-h-screen p-4">
                <div className="mx-auto max-w-4xl">
                    <div className="grid gap-8 grip-col-2 items-start">
                        <div />
                        <CreateRoomForm />
                        <RoomList />
                    </div>
                </div>
            </div>
        </>
    )
}