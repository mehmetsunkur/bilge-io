import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BilgeSourceDbConnectionBilgeModule } from './source-db-connection-bilge/source-db-connection-bilge.module';
import { BilgeDataContextBilgeModule } from './data-context-bilge/data-context-bilge.module';
import { BilgeDataSchemaBilgeModule } from './data-schema-bilge/data-schema-bilge.module';
import { BilgeDataTableBilgeModule } from './data-table-bilge/data-table-bilge.module';
import { BilgeDataColumnBilgeModule } from './data-column-bilge/data-column-bilge.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BilgeSourceDbConnectionBilgeModule,
        BilgeDataContextBilgeModule,
        BilgeDataSchemaBilgeModule,
        BilgeDataTableBilgeModule,
        BilgeDataColumnBilgeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeEntityModule {}
