import { BaseEntity } from './../../../../shared';

export class SparkDestinationTableBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public desc?: string,
        public columns?: BaseEntity[],
    ) {
    }
}
