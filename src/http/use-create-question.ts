import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomQuestionRequest, CreateRoomQuestionResponse } from "./types/create-room-question-type";
import type { GetRoomQuestionsResponse } from './types/get-room-question-types';

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateRoomQuestionRequest) => {
            const response = await fetch(
                `http://localhost:3333/room/${roomId}/questions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )

            const result: CreateRoomQuestionResponse = await response.json()

            return result
        },

        // Executa no momento que for feita a chamada p/ API
        onMutate({ question }) {
            const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
                'get-questions',
                roomId,
            ])

            const questionsArray = questions ?? []

            const newQuestion = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                created_at: new Date().toISOString(),
                isGeneratingAnswer: true,
            }

            queryClient.setQueryData<GetRoomQuestionsResponse>(
                ['get-room-questions', roomId],
                [newQuestion, ...questionsArray]
            )

            return { newQuestion, questions }
        },

        onSuccess(data, _variables, context) {
            queryClient.setQueryData<GetRoomQuestionsResponse>(
                ['get-room-questions', roomId],
                (questions) => {
                    if (!questions) {
                        return questions
                    }

                    if (!context.newQuestion) {
                        return questions
                    }

                    return questions.map((question) => {
                        if (question.id === context.newQuestion.id) {
                            return {
                                ...context.newQuestion,
                                id: data.questionId,
                                answer: data.answer,
                                isGeneratingAnswer: false,
                            }
                        }

                        return question
                    })
                }
            )
        },

        onError(_error, _variables, context) {
            if (context?.questions) {
                queryClient.setQueryData<GetRoomQuestionsResponse>(
                    ['get-room-questions', roomId],
                    context.questions
                )
            }
        },

        // onSuccess: () => {
        //   queryClient.invalidateQueries({ queryKey: ['get-questions', roomId] })
        // },
    })
}
