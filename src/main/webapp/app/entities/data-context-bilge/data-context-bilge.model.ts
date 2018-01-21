import { BaseEntity } from './../../shared';

export class DataContextBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public schemas?: BaseEntity[],
        public sourceConnectionId?: number,
    ) {
    }
}
