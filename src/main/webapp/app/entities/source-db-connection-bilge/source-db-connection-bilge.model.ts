import { BaseEntity } from './../../shared';

export class SourceDbConnectionBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public url?: string,
        public user?: string,
        public pass?: string,
        public dbType?: string,
        public dataContexts?: BaseEntity[],
    ) {
    }
}
