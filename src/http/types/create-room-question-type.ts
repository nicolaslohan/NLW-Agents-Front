export type CreateRoomQuestionRequest = Array<{
    question: string
}>

export type CreateRoomQuestionResponse = Array<{
    questionId: string,
    answer: string | null,
}>