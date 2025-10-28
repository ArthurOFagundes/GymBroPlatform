import { Type } from "@google/genai";
import { ai } from "./geminiClient.ts";

export async function generateTrainee(form: { nameUser: string; age: number; objective: string; availableTime: number; weekFrequency: number; bestTime: string; health: string; healthDetails: string; levelKnowledge: string; availableEquipment: string[] }) {
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
    `Crie um plano de treino de academia personalizado para o aluno abaixo, considerando todas as informações fornecidas:
    Nome: ${form.nameUser}
    Idade: ${form.age}
    Objetivo: ${form.objective}
    Tempo disponível por sessão: ${form.availableTime} minutos
    Frequência semanal: ${form.weekFrequency} vezes por semana
    Melhor horário para treinar: ${form.bestTime}
    Condição de saúde: ${form.health === "true" ? form.healthDetails : "Nenhuma"}
    Nível de conhecimento: ${form.levelKnowledge}
    Equipamentos disponíveis: ${form.availableEquipment.length > 0 ? form.availableEquipment.join(", ") : "Nenhum"}

    O treino deve ser dividido por dias da semana, com foco em diferentes grupos musculares. Para cada dia, inclua uma lista de exercícios com número de séries, repetições e tempo de descanso, adequados ao objetivo, nível de conhecimento e equipamentos disponíveis do aluno. Considere também possíveis restrições de saúde.


    Retorne o resultado em formato JSON conforme o schema especificado.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            nameUser: { type: Type.STRING },
            weekFrequency: { type: Type.NUMBER },
            availableTime: { type: Type.STRING },
            trainings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trainning: {
                    type: Type.OBJECT,
                    properties: {
                      muscularGroup: { type: Type.STRING },
                      exercises: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            name: { type: Type.STRING },
                            sets: { type: Type.NUMBER },
                            reps: { type: Type.STRING },
                            rest: { type: Type.STRING },
                          },
                        },
                      },
                    },
                    propertyOrdering: ["muscularGroup", "exercises"],
                  },
                },
                propertyOrdering: ["trainning"],
              },
            },
          },
          propertyOrdering: ["nameUser", "weekFrequency", "availableTime", "trainings"],
        },
      },
    },
  });

  return response.text;

}

