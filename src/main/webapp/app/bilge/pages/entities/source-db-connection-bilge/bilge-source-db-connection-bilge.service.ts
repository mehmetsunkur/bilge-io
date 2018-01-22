import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../../../app.constants';

import { SourceDbConnectionBilge, SourceDbConnectionBilgeService } from '../../../../entities/source-db-connection-bilge';
import { ResponseWrapper, createRequestOption } from '../../../../shared';
import { DataSchemaBilge } from '../../../../entities/data-schema-bilge';

@Injectable()
export class BilgeSourceDbConnectionBilgeService extends SourceDbConnectionBilgeService  {

    private bilgeResourceUrl = SERVER_API_URL + 'api/bilge/source-db-connections';
    

    constructor( http: Http) {
        super(http);
     }

    listSchemas(id: number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get(`${this.bilgeResourceUrl}/${id}/schemas`, options)
            .map((res: Response) => this.convertResponse(res));
    }

    listTables(id: number, schema: String): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get(`${this.bilgeResourceUrl}/${id}/schema/${schema}/tables`, options)
            .map((res: Response) => this.convertResponse(res));
    }
    
    listColumns(id: number, schema: String, table: String): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get(`${this.bilgeResourceUrl}/${id}/schema/${schema}/table/${table}/columns`, options)
            .map((res: Response) => this.convertResponse(res));
    }

}
