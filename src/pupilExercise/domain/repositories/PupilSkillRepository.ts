import { CreatePupilSkillDto } from "src/pupilExercise/data/dtos/create-pupil-skill.dto";
import { PupilSkillI } from "../entitiesI/PupilSkillI";


export interface PupilSkillRepository {
    create(createPupilSkillDto: CreatePupilSkillDto): Promise<PupilSkillI>;
    cretaeMany(pupilSkills: [CreatePupilSkillDto]): Promise<PupilSkillI[]>;
    findAll(): Promise<PupilSkillI[]>;
    findByPupil(pupilId: number): Promise<PupilSkillI[]>;
}