import { InjectRepository } from "@nestjs/typeorm";
import { PupilSkillRepository } from "src/pupilTopic/domain/repositories/PupilSkillRepository";
import { PupilSkillEntity } from "../entities/pupil_skill.entity";
import { Repository } from "typeorm";
import { PupilSkillI } from "src/pupilTopic/domain/entitiesI/PupilSkillI";
import { CreatePupilSkillDto } from "../dtos/create-pupil-skill.dto";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PupilExerciseEntity } from "../entities/pupil_exercise.entity";

export class PupilSkillRepositoryImpl implements PupilSkillRepository {
    constructor(
        @InjectRepository(PupilSkillEntity) private readonly pupilSkillRepository: Repository<PupilSkillEntity>,
        @InjectRepository(PupilExerciseEntity) private readonly pupilExerciseRepository: Repository<PupilExerciseEntity>
    ) {}

    async create(createPupilSkillDto: CreatePupilSkillDto): Promise<PupilSkillI> {
        try {
            
            const pupilExercise = await this.pupilExerciseRepository.findOne({ where: {id: createPupilSkillDto.pupilExerciseId}});
            if(!pupilExercise) throw new NotFoundException("El educando no tiene registrado el ejercicio al que corresponde este puntaje.");

            const pupilSkill = this.pupilSkillRepository.create({
                ...CreatePupilSkillDto,
                pupilExercise: pupilExercise,
            });

            return await this.pupilSkillRepository.save(pupilSkill);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async cretaeMany(pupilSkills: [CreatePupilSkillDto]): Promise<PupilSkillI[]> {
        try {
            
            const pupilExerciseId = pupilSkills[0].pupilExerciseId;
            const pupilExercise = await this.pupilExerciseRepository.findOne({where: {id: pupilExerciseId}});
            if(!pupilExercise) throw new NotFoundException("El educando no tiene registrado el ejercicio al que corresponde este puntaje.");

            const pupilSkillsToSave = pupilSkills.map(async (pupilSkill) => {
                const pupilSkillCreated = this.pupilSkillRepository.create({
                    ...pupilSkill,
                    pupilExercise: pupilExercise
                });

                return await this.pupilSkillRepository.save(pupilSkillCreated);
            })

            const pupilSkillsSaved = await Promise.all(pupilSkillsToSave);

            return pupilSkillsSaved;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<PupilSkillI[]> {
        try {
            const pupilSkills = await this.pupilSkillRepository.find();
            return pupilSkills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}