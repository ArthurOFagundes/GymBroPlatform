import type { GenerateContentResponse } from "@google/genai";
import { supabase } from "../supabaseClient.ts";

export type Workout = {
  id?: number;
  name_user: string;
  week_frequency: number;
  level_knowledge: string;
  objective?: string;
  plan: string;
  trainer?: string | null;
  created_at?: string;

};

export async function saveWorkout(workout: Workout): Promise<Workout | null> {

  try {
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user ?? null;
    workout.trainer = user ? user.id : null;

    const { data, error } = await supabase
      .from("workouts")
      .insert<Workout>(workout)
      .select()
      .single();

    if (error || !data) {
      console.error("Erro ao salvar treino:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Exceção ao salvar treino:", err);
    return null;
  }
}