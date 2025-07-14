import { PupilTopicI } from "src/pupilTopic/domain/entitiesI/PupilTopicI";
import { Entity, PrimaryColumn } from "typeorm";

@Entity('educando_temas')
export class PupilTopicEntity implements PupilTopicI {
    @PrimaryColumn({name: 'id_educando', type: 'int', nullable: false})
    pupilId: number;
    @PrimaryColumn({name: 'id_tema', type: 'int', nullable: false})
    topicId: number;
}