import { InjectRepository } from "@nestjs/typeorm";
import { PupilExerciseRepository } from "src/pupilTopic/domain/repositories/PupilExerciseRepository";
import { PupilExerciseEntity } from "../entities/pupil_exercise.entity";
import { Repository } from "typeorm";
import { CreatePupilExerciseDto } from "../dtos/create-pupil-exercise.dto";
import { PupilExerciseI } from "src/pupilTopic/domain/entitiesI/PupilExerciseI";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

export class PupilExerciseRepositoryImpl implements PupilExerciseRepository {
    constructor(@InjectRepository(PupilExerciseEntity) private readonly pupilExerciseRepository: Repository<PupilExerciseEntity>) {}

    async create(createPupilExerciseDto: CreatePupilExerciseDto): Promise<PupilExerciseI> {
        try {
            const pupilExercise = this.pupilExerciseRepository.create(createPupilExerciseDto);
            return await this.pupilExerciseRepository.save(pupilExercise);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByPupil(pupilId: number): Promise<PupilExerciseI[]> {
        try {
            const pupilExercises = await this.pupilExerciseRepository.find({ where: {pupilId: pupilId}, relations: {skills: true}});
            return pupilExercises;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByExercise(exerciseId: number): Promise<PupilExerciseI> {
        try {
            const pupilExercise = await this.pupilExerciseRepository.findOne({ where: {exerciseId: exerciseId}});
            if(!pupilExercise) throw new NotFoundException('El ejercicio no ha sido realizado por el educando.');
            return pupilExercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}