import { Inject, InternalServerErrorException } from "@nestjs/common";
import { PupilExerciseRepositoryImpl } from "../data/repositories/pupil_exercise.repository.impl";
import { PupilExerciseRepository } from "../domain/repositories/PupilExerciseRepository";
import { CreatePupilExerciseDto } from "../data/dtos/create-pupil-exercise.dto";

export class PupilExerciseService {
    constructor(@Inject(PupilExerciseRepositoryImpl) private readonly pupilExerciseRepository: PupilExerciseRepository) {}

    async create(createPupilExerciseDto: CreatePupilExerciseDto) {
        try {
            const pupilExercise = await this.pupilExerciseRepository.create(createPupilExerciseDto);
            return pupilExercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findeByPupil(pupilId: number) {
        try {
            const pupilExercises = await this.pupilExerciseRepository.findByPupil(pupilId);
            return pupilExercises;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findeByExercise(exerciseId: number) {
        try {
            const pupilExercise = await this.pupilExerciseRepository.findByExercise(exerciseId);
            return pupilExercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}