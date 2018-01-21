import { BaseEntity } from './../../shared';

export class DataTableBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public columnCount?: number,
        public columns?: BaseEntity[],
        public schemaId?: number,
    ) {
    }
}
