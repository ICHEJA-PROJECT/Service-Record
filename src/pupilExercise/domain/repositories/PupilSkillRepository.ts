import { CreatePupilSkillDto } from "src/pupilExercise/data/dtos/create-pupil-skill.dto";
import { PupilSkillI } from "../entitiesI/PupilSkillI";
import { CreateManyPupilSkillDto } from "src/pupilExercise/data/dtos/create-many-pupil-skill.dto";


export interface PupilSkillRepository {
    create(createPupilSkillDto: CreatePupilSkillDto): Promise<PupilSkillI>;
    createMany(createManyPupilSkillDto: CreateManyPupilSkillDto): Promise<PupilSkillI[]>;
    findAll(): Promise<PupilSkillI[]>;
    findByPupil(pupilId: number): Promise<PupilSkillI[]>;
    findByPupilAndSkill(pupilId: number, skillId: number): Promise<PupilSkillI[]>;
}