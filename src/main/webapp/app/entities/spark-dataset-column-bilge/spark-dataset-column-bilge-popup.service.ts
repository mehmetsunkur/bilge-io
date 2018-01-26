import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SparkDatasetColumnBilge } from './spark-dataset-column-bilge.model';
import { SparkDatasetColumnBilgeService } from './spark-dataset-column-bilge.service';

@Injectable()
export class SparkDatasetColumnBilgePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sparkDatasetColumnService: SparkDatasetColumnBilgeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.sparkDatasetColumnService.find(id).subscribe((sparkDatasetColumn) => {
                    this.ngbModalRef = this.sparkDatasetColumnModalRef(component, sparkDatasetColumn);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sparkDatasetColumnModalRef(component, new SparkDatasetColumnBilge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sparkDatasetColumnModalRef(component: Component, sparkDatasetColumn: SparkDatasetColumnBilge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sparkDatasetColumn = sparkDatasetColumn;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
