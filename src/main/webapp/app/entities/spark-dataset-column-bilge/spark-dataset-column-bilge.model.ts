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

export class SparkDatasetColumnBilge implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: ColumnType,
        public desc?: string,
        public parentDatasetId?: number,
    ) {
    }
}
