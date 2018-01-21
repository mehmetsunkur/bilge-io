import { BaseEntity } from './../../shared';

export const enum ColumnType {
    'CHAR',
    'VARCHAR',
    'LONGVARCHAR',
    'CLOB',
    'NCHAR',
    'NVARCHAR',
    'LONGNVARCHAR',
    'NCLOB',
    'TINYINT',
    'SMALLINT',
    'INTEGER',
    'BIGINT',
    'FLOAT',
    'REAL',
    'DOUBLE',
    'NUMERIC',
    'DECIMAL',
    'UUID',
    'DATE',
    'TIME',
    'TIMESTAMP',
    'BIT',
    'BOOLEAN',
    'BINARY',
    'VARBINARY',
    'LONGVARBINARY',
    'BLOB',
    'NULL',
    'OTHER',
    'JAVA_OBJECT',
    'DISTINCT',
    'STRUCT',
    'ARRAY',
    'REF',
    'DATALINK',
    'ROWID',
    'SQLXML',
    'INET',
    'LIST',
    'MAP',
    'SET',
    'STRING',
    'NUMBER'
}

export class DataColumnBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: ColumnType,
        public size?: number,
        public nullable?: boolean,
        public remarks?: string,
        public nativeType?: string,
        public indexed?: boolean,
        public primaryKey?: boolean,
        public tableId?: number,
    ) {
        this.nullable = false;
        this.indexed = false;
        this.primaryKey = false;
    }
}
