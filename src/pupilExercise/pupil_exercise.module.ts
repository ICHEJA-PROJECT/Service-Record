import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PupilExerciseEntity } from './data/entities/pupil_exercise.entity';
import { PupilSkillEntity } from './data/entities/pupil_skill.entity';
import { PupilExerciseController } from './controllers/pupil_exercise.controller';
import { PupilSkillController } from './controllers/pupil_skill.controller';
import { PupilExerciseRepositoryImpl } from './data/repositories/pupil_exercise.repository.impl';
import { PupilSkillRepositoryImpl } from './data/repositories/pupil_skill.repository.impl';
import { PupilExerciseService } from './services/pupil_exercise.service';
import { PupilSkillService } from './services/pupil_skill.service';
import { CalculateGradesBySkillUseCase } from './domain/usecases/CalculateGradeBySkillUseCase';
import { ExerciseServiceTransport } from 'src/shared/transport/exercise-service.transport';

@Module({
  imports: [
    TypeOrmModule.forFeature([PupilExerciseEntity, PupilSkillEntity]),
    ExerciseServiceTransport,
  ],
  controllers: [PupilExerciseController, PupilSkillController],
  providers: [
    PupilExerciseRepositoryImpl,
    PupilSkillRepositoryImpl,
    CalculateGradesBySkillUseCase,
    PupilExerciseService,
    PupilSkillService,
  ],
})
export class PupilExerciseModule {}
