import { PupilExerciseI } from "./PupilExerciseI";

export interface PupilSkillI {
    pupilExercise: PupilExerciseI;
    skillId: number;
    score: number;
}