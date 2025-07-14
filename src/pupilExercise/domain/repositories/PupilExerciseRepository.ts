import { CreatePupilExerciseDto } from "src/pupilExercise/data/dtos/create-pupil-exercise.dto";
import { PupilExerciseI } from "../entitiesI/PupilExerciseI";


export interface PupilExerciseRepository {
    create(createPupilExerciseDto: CreatePupilExerciseDto): Promise<PupilExerciseI>;
    findByPupil(pupilId: number): Promise<PupilExerciseI[]>;
    findByExercise(exerciseId: number): Promise<PupilExerciseI>
}