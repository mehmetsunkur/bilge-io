import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SourceDbConnectionBilge } from './source-db-connection-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SourceDbConnectionBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/source-db-connections';

    constructor(private http: Http) { }

    create(sourceDbConnection: SourceDbConnectionBilge): Observable<SourceDbConnectionBilge> {
        const copy = this.convert(sourceDbConnection);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sourceDbConnection: SourceDbConnectionBilge): Observable<SourceDbConnectionBilge> {
        const copy = this.convert(sourceDbConnection);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SourceDbConnectionBilge> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to SourceDbConnectionBilge.
     */
    private convertItemFromServer(json: any): SourceDbConnectionBilge {
        const entity: SourceDbConnectionBilge = Object.assign(new SourceDbConnectionBilge(), json);
        return entity;
    }

    /**
     * Convert a SourceDbConnectionBilge to a JSON which can be sent to the server.
     */
    private convert(sourceDbConnection: SourceDbConnectionBilge): SourceDbConnectionBilge {
        const copy: SourceDbConnectionBilge = Object.assign({}, sourceDbConnection);
        return copy;
    }
}
