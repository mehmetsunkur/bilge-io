import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DataContextBilge } from './data-context-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DataContextBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/data-contexts';

    constructor(private http: Http) { }

    create(dataContext: DataContextBilge): Observable<DataContextBilge> {
        const copy = this.convert(dataContext);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dataContext: DataContextBilge): Observable<DataContextBilge> {
        const copy = this.convert(dataContext);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DataContextBilge> {
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
     * Convert a returned JSON object to DataContextBilge.
     */
    private convertItemFromServer(json: any): DataContextBilge {
        const entity: DataContextBilge = Object.assign(new DataContextBilge(), json);
        return entity;
    }

    /**
     * Convert a DataContextBilge to a JSON which can be sent to the server.
     */
    private convert(dataContext: DataContextBilge): DataContextBilge {
        const copy: DataContextBilge = Object.assign({}, dataContext);
        return copy;
    }
}
