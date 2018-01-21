import { BaseEntity } from './../../shared';

export class DataSchemaBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public tableCount?: number,
        public tables?: BaseEntity[],
        public dataContextId?: number,
    ) {
    }
}
