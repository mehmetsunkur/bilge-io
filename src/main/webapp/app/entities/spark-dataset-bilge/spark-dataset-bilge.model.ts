import { BaseEntity } from './../../shared';

export class SparkDatasetBilge implements BaseEntity {
    constructor(
        public id?: number,
        public module?: string,
        public name?: string,
        public desc?: string,
        public columns?: BaseEntity[],
    ) {
    }
}
