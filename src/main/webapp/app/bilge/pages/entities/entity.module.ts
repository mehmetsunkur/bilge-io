import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BilgeSourceDbConnectionBilgeModule } from './source-db-connection-bilge/source-db-connection-bilge.module';
import { Ng2Webstorage } from 'ngx-webstorage';
import { UserRouteAccessService } from '../../../shared/index';
import { ProfileService } from '../../../layouts/index';
import { customHttpProvider } from '../../../blocks/interceptor/http.provider';
import { BilgeSparkDestinationTableBilgeModule } from './spark-destination-table-bilge/spark-destination-table-bilge.module';
import { BilgeSparkDestinationColumnBilgeModule } from './spark-destination-column-bilge/spark-destination-column-bilge.module';
import { SparkTableMappingBilgeModule } from './spark-table-mapping-bilge/spark-table-mapping-bilge.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BilgeSourceDbConnectionBilgeModule,
        BilgeSparkDestinationTableBilgeModule,
        BilgeSparkDestinationColumnBilgeModule,
        SparkTableMappingBilgeModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [ProfileService,
        customHttpProvider(),
        UserRouteAccessService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BilgeEntityModule {}
