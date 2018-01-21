import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SourceDbConnectionBilge } from './source-db-connection-bilge.model';
import { SourceDbConnectionBilgeService } from './source-db-connection-bilge.service';

@Injectable()
export class SourceDbConnectionBilgePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private sourceDbConnectionService: SourceDbConnectionBilgeService

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
                this.sourceDbConnectionService.find(id).subscribe((sourceDbConnection) => {
                    this.ngbModalRef = this.sourceDbConnectionModalRef(component, sourceDbConnection);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sourceDbConnectionModalRef(component, new SourceDbConnectionBilge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sourceDbConnectionModalRef(component: Component, sourceDbConnection: SourceDbConnectionBilge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sourceDbConnection = sourceDbConnection;
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
