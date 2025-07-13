import { dayjs } from "@/lib/formatTime"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useRooms } from "@/http/use-rooms"



export function RoomList() {

    const { data, isLoading } = useRooms()

    return (<Card>
        <CardHeader>
            <CardTitle>
                Salas Recentes
            </CardTitle>
            <CardDescription>
                Acesso rápido para salas criadas recentemente.
            </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
            {isLoading && <p className="text-muted-foreground text-sm">Carregando salas...</p>}

            {data?.map(room => {
                return (
                    <Link key={room.id} to={`/rooms/${room.id}`} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50">
                        <div className="flex-1 flex flex-col gap-1">
                            <h3 className="font-medium">{room.name}</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <Badge variant="secondary" className="text-xs">{dayjs(room.created_at).toNow()}</Badge>
                                <Badge variant="secondary" className="text-xs">{room.questionsCount} Perguntas</Badge>
                            </div>
                        </div>
                        <span className="flex items-center gap-2 text-sm">
                            Entrar
                            <ArrowRight className="size-3"></ArrowRight>
                        </span>
                    </Link>
                )
            })}
        </CardContent>
    </Card>)
}