export type GetRoomQuestionsResponse = Array<{
    id: string,
    question: string,
    answer: string | null,
    created_at: string,
    isGeneratingAnswer?: boolean
}>