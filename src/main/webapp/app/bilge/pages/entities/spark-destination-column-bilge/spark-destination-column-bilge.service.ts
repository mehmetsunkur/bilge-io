import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../../../app.constants';

import { SparkDestinationColumnBilge } from './spark-destination-column-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../../../shared';

@Injectable()
export class SparkDestinationColumnBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/spark-destination-columns';

    constructor(private http: Http) { }

    create(sparkDestinationColumn: SparkDestinationColumnBilge): Observable<SparkDestinationColumnBilge> {
        const copy = this.convert(sparkDestinationColumn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sparkDestinationColumn: SparkDestinationColumnBilge): Observable<SparkDestinationColumnBilge> {
        const copy = this.convert(sparkDestinationColumn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SparkDestinationColumnBilge> {
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
     * Convert a returned JSON object to SparkDestinationColumnBilge.
     */
    private convertItemFromServer(json: any): SparkDestinationColumnBilge {
        const entity: SparkDestinationColumnBilge = Object.assign(new SparkDestinationColumnBilge(), json);
        return entity;
    }

    /**
     * Convert a SparkDestinationColumnBilge to a JSON which can be sent to the server.
     */
    private convert(sparkDestinationColumn: SparkDestinationColumnBilge): SparkDestinationColumnBilge {
        const copy: SparkDestinationColumnBilge = Object.assign({}, sparkDestinationColumn);
        return copy;
    }
}
