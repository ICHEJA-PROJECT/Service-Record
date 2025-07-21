import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PupilExerciseEntity } from "./data/entities/pupil_exercise.entity";
import { PupilSkillEntity } from "./data/entities/pupil_skill.entity";
import { PupilExerciseController } from "./controllers/pupil_exercise.controller";
import { PupilSkillController } from "./controllers/pupil_skill.controller";
import { PupilExerciseRepositoryImpl } from "./data/repositories/pupil_exercise.repository.impl";
import { PupilSkillRepositoryImpl } from "./data/repositories/pupil_skill.repository.impl";
import { PupilExerciseService } from "./services/pupil_exercise.service";
import { PupilSkillService } from "./services/pupil_skill.service";
import { CalculateGradesBySkillUseCase } from "./domain/usecases/CalculateGradeBySkillUseCase";
import { GetPorcentageTemplateSkillTransport } from "./transport/get-porcentage-template-skill.transport";
import { CalculateSkillPercentagesUseCase } from "./domain/usecases/CalculateSkillPercentagesUseCase";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PupilExerciseEntity,
            PupilSkillEntity
        ]),
        GetPorcentageTemplateSkillTransport 
    ],
    controllers: [
        PupilExerciseController,
        PupilSkillController
    ],
    providers: [
        PupilExerciseRepositoryImpl,
        PupilSkillRepositoryImpl,
        CalculateGradesBySkillUseCase,
        CalculateSkillPercentagesUseCase,
        PupilExerciseService,
        PupilSkillService
    ]
})

export class PupilExerciseModule {}