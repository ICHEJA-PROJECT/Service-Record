import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PupilTopicEntity } from "./data/entities/pupil_topic.entity";
import { PupilTopicController } from "./controllers/pupil_topic.controller";
import { PupilTopicRepositoryImpl } from "./data/repositories/pupil_topic.repository.impl";
import { PupilTopicService } from "./services/pupil_topic.service";
import { PupilExerciseRepositoryImpl } from "./data/repositories/pupil_exercise.repository.impl";
import { PupilExerciseController } from "./controllers/pupil_exercise.controller";
import { PupilExerciseEntity } from "./data/entities/pupil_exercise.entity";
import { PupilExerciseService } from "./services/pupil_exercise.service";
import { PupilSkillEntity } from "./data/entities/pupil_skill.entity";
import { PupilSkillController } from "./controllers/pupil_skill.controller";
import { PupilSkillRepositoryImpl } from "./data/repositories/pupil_skill.repository.impl";
import { PupilSkillService } from "./services/pupil_skill.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PupilTopicEntity,
            PupilExerciseEntity,
            PupilSkillEntity
        ])
    ],
    controllers: [
        PupilTopicController,
        PupilExerciseController,
        PupilSkillController
    ],
    providers: [
        PupilTopicRepositoryImpl,
        PupilExerciseRepositoryImpl,
        PupilSkillRepositoryImpl,
        PupilTopicService,
        PupilExerciseService,
        PupilSkillService
    ]
})

export class PupilTopicModule {}