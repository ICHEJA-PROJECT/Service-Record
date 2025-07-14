
import { PupilExerciseI } from "src/pupilExercise/domain/entitiesI/PupilExerciseI";
import { PupilSkillI } from "src/pupilExercise/domain/entitiesI/PupilSkillI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PupilSkillEntity } from "./pupil_skill.entity";


@Entity('educando_ejercicios')
export class PupilExerciseEntity implements PupilExerciseI {
    @PrimaryGeneratedColumn('increment', {name: 'id_educando_ejercicio'})
    id: number;
    @Column({name: 'id_educando', type: 'int', nullable: false})
    pupilId: number;
    @Column({name: 'id_ejercicio', type: 'int', nullable: false})
    exerciseId: number;
    @Column({name: 'fecha_asignacion', type: 'timestamp without time zone', nullable: false})
    assignedDate: Date;
    @Column({name: 'fecha_completado', type: 'timestamp without time zone', nullable: false})
    completedDate: Date;
    @Column({name: 'tiempo_asignado', type: 'time without time zone', nullable: false})
    assignedTime: string;
    @OneToMany(() => PupilSkillEntity, pupilSkill => pupilSkill.pupilExercise)
    skills: PupilSkillI[];
}