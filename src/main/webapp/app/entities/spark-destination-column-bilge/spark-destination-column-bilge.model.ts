import { BaseEntity } from './../../shared';

export class SparkDestinationColumnBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: string,
        public desc?: string,
        public parentTableId?: number,
    ) {
    }
}
