import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCreateRoom } from "@/http/use-create-room";

const CreateRoomSchema = z.object({
    name: z.string().min(1, { message: 'Inclua no mínimo 3 caracteres para criar a sala.' }),
    description: z.string().optional()
})

type CreateRoomForm = z.infer<typeof CreateRoomSchema>

export function CreateRoomForm() {

    const { mutateAsync: createRoom } = useCreateRoom()

    const createRoomForm = useForm<CreateRoomForm>({
        resolver: zodResolver(CreateRoomSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    async function handleCreateForm({ name, description }: CreateRoomForm) {
        await createRoom({ name, description })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Sala</CardTitle>
                <CardDescription>
                    Crie uma nova sala para fazer perguntas e receber respostas da I.A.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateForm)} className="flex flex-col gap-4">
                        <FormField
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Nome da sala
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Digite o nome da sala" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>
                                            Descrição da sala
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea {...field} placeholder="Digite a descrição da sala" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <Button type="submit" className="w-full">Criar sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}