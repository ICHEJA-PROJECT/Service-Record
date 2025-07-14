
import { PupilSkillI } from "src/pupilExercise/domain/entitiesI/PupilSkillI";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { PupilExerciseEntity } from "./pupil_exercise.entity";
import { PupilExerciseI } from "src/pupilExercise/domain/entitiesI/PupilExerciseI";


@Entity('educando_ejercicio_habilidades')
export class PupilSkillEntity implements PupilSkillI {

    @PrimaryColumn({ name: 'id_educando_ejercicio', type: 'int', nullable: false})
    pupilExerciseId: number;

    @PrimaryColumn({ name: 'id_habilidad', type: 'int', nullable: false})
    skillId: number;

    @ManyToOne(() => PupilExerciseEntity, pupilExercise => pupilExercise.skills)
    @JoinColumn({name: 'id_educando_ejercicio'})
    pupilExercise: PupilExerciseI;

    @Column({ name: 'puntaje', type: 'float', nullable: false})
    score: number;
}