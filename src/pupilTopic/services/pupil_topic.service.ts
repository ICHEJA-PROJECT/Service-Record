import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PupilTopicRepositoryImpl } from "../data/repositories/pupil_topic.repository.impl";
import { PupilTopicRepository } from "../domain/repositories/PupilTopicRepository";
import { CreatePupilTopicDto } from "../data/dtos/create-pupil-topic.dto";

@Injectable()
export class PupilTopicService {
    constructor(@Inject(PupilTopicRepositoryImpl) private readonly pupilTopicRepository: PupilTopicRepository) {}

    async create(createPupilTopicDto: CreatePupilTopicDto) {
        try {
            const pupilTopic = await this.pupilTopicRepository.create(createPupilTopicDto);
            return pupilTopic;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByPupil(pupilId: number) {
        try {
            const pupilTopics = await this.pupilTopicRepository.findByPupil(pupilId);
            return pupilTopics;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}