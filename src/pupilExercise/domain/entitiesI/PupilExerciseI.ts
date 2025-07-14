import { PupilSkillI } from "./PupilSkillI";

export interface PupilExerciseI {
    id: number;
    pupilId: number;
    exerciseId: number;
    assignedDate: Date;
    completedDate: Date;
    assignedTime: string;
    skills: PupilSkillI[];
}