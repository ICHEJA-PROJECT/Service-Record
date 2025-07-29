import { CreatePupilExerciseDto } from "src/pupilExercise/data/dtos/create-pupil-exercise.dto";
import { PupilExerciseI } from "../entitiesI/PupilExerciseI";
import { UpdatePupilExerciseDto } from "src/pupilExercise/data/dtos/update-pupil-exercise.dto";


export interface PupilExerciseRepository {
    create(createPupilExerciseDto: CreatePupilExerciseDto): Promise<PupilExerciseI>;
    findByPupil(pupilId: number): Promise<PupilExerciseI[]>;
    findByExercise(exerciseId: number): Promise<PupilExerciseI>;
    findOne(id: number): Promise<PupilExerciseI>;
    updateExerciseToCompleted(id: number, updatePupilExerciseDto: UpdatePupilExerciseDto): Promise<any>;
    findAssignedExercisesByPupil(pupilId: number): Promise<PupilExerciseI[]>;
}