import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PupilSkillRepositoryImpl } from "src/pupilExercise/data/repositories/pupil_skill.repository.impl";
import { PupilSkillRepository } from "../repositories/PupilSkillRepository";

@Injectable()
export class CalculateGradesBySkillUseCase {
    constructor(@Inject(PupilSkillRepositoryImpl) private readonly pupilSkillRepository: PupilSkillRepository) {}

    async run(pupilId: number, skillId: number, factorDecaimiento: number = 0.3) {
        try {
            
            const pupilSkills = await this.pupilSkillRepository.findByPupilAndSkill(pupilId, skillId);
            console.log(pupilSkills);

            if (!pupilSkills || pupilSkills.length === 0) {
                return 0;
            }

            if (pupilSkills.length === 1) {
                return pupilSkills[0].score;
            }

            // Ordenar por fecha
            const rankedScores = pupilSkills
                .sort((a, b) => b.pupilExercise.completedDate!.getTime() - a.pupilExercise.completedDate!.getTime());

            const fechaReferencia = rankedScores[0].pupilExercise.completedDate!.getTime();
            let sumaProductos = 0;
            let sumaPesos = 0;

            rankedScores.forEach((rankedScore) => {
            // Calcular días transcurridos desde la calificación más reciente
            const diasTranscurridos = Math.abs(
                (fechaReferencia - rankedScore.pupilExercise.completedDate!.getTime()) / (1000 * 60 * 60 * 24)
            );
            
            // Peso usando función logarítmica con decaimiento temporal
            // Peso = 1 / (1 + log(1 + días * factor))
            const peso = 1 / (1 + Math.log(1 + diasTranscurridos * factorDecaimiento));
            
            sumaProductos += rankedScore.score * peso;
            sumaPesos += peso;
            });

            return sumaProductos / sumaPesos;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}