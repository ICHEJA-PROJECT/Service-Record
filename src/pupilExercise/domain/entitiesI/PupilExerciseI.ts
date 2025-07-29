import { PupilSkillI } from "./PupilSkillI";

export interface PupilExerciseI {
    id: number;
    pupilId: number;
    exerciseId: number;
    assignedDate: Date | null;
    completedDate: Date | null;
    assignedTime: string;
    skills: PupilSkillI[];
}