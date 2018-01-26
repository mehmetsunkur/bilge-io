import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SparkDatasetColumnBilge } from './spark-dataset-column-bilge.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class SparkDatasetColumnBilgeService {

    private resourceUrl =  SERVER_API_URL + 'api/spark-dataset-columns';

    constructor(private http: Http) { }

    create(sparkDatasetColumn: SparkDatasetColumnBilge): Observable<SparkDatasetColumnBilge> {
        const copy = this.convert(sparkDatasetColumn);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(sparkDatasetColumn: SparkDatasetColumnBilge): Observable<SparkDatasetColumnBilge> {
        const copy = this.convert(sparkDatasetColumn);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<SparkDatasetColumnBilge> {
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
     * Convert a returned JSON object to SparkDatasetColumnBilge.
     */
    private convertItemFromServer(json: any): SparkDatasetColumnBilge {
        const entity: SparkDatasetColumnBilge = Object.assign(new SparkDatasetColumnBilge(), json);
        return entity;
    }

    /**
     * Convert a SparkDatasetColumnBilge to a JSON which can be sent to the server.
     */
    private convert(sparkDatasetColumn: SparkDatasetColumnBilge): SparkDatasetColumnBilge {
        const copy: SparkDatasetColumnBilge = Object.assign({}, sparkDatasetColumn);
        return copy;
    }
}
