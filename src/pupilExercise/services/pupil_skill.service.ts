import { Inject, InternalServerErrorException } from "@nestjs/common";
import { PupilSkillRepositoryImpl } from "../data/repositories/pupil_skill.repository.impl";
import { PupilSkillRepository } from "../domain/repositories/PupilSkillRepository";
import { CreatePupilSkillDto } from "../data/dtos/create-pupil-skill.dto";


export class PupilSkillService {
    constructor(@Inject(PupilSkillRepositoryImpl) private readonly pupilSkillRepository: PupilSkillRepository) {}

    async create(createPupilSkillDto: CreatePupilSkillDto) {
        try {
            const pupilSkill = await this.pupilSkillRepository.create(createPupilSkillDto);
            return pupilSkill;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createMany(pupilSkills: [CreatePupilSkillDto]) {
        try {
            const pupilSkillsSaved = await this.pupilSkillRepository.cretaeMany(pupilSkills);
            return pupilSkillsSaved;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const pupilSkills = await this.pupilSkillRepository.findAll();
            return pupilSkills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByPupil(pupilId: number) {
        try {
            const pupilSkills = await this.pupilSkillRepository.findByPupil(pupilId);
            return pupilSkills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}