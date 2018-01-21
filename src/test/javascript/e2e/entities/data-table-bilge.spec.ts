import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DataTable e2e test', () => {

    let navBarPage: NavBarPage;
    let dataTableDialogPage: DataTableDialogPage;
    let dataTableComponentsPage: DataTableComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DataTables', () => {
        navBarPage.goToEntity('data-table-bilge');
        dataTableComponentsPage = new DataTableComponentsPage();
        expect(dataTableComponentsPage.getTitle())
            .toMatch(/bilgeApp.dataTable.home.title/);

    });

    it('should load create DataTable dialog', () => {
        dataTableComponentsPage.clickOnCreateButton();
        dataTableDialogPage = new DataTableDialogPage();
        expect(dataTableDialogPage.getModalTitle())
            .toMatch(/bilgeApp.dataTable.home.createOrEditLabel/);
        dataTableDialogPage.close();
    });

    it('should create and save DataTables', () => {
        dataTableComponentsPage.clickOnCreateButton();
        dataTableDialogPage.setNameInput('name');
        expect(dataTableDialogPage.getNameInput()).toMatch('name');
        dataTableDialogPage.setColumnCountInput('5');
        expect(dataTableDialogPage.getColumnCountInput()).toMatch('5');
        dataTableDialogPage.schemaSelectLastOption();
        dataTableDialogPage.save();
        expect(dataTableDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DataTableComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-data-table-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DataTableDialogPage {
    modalTitle = element(by.css('h4#myDataTableLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    columnCountInput = element(by.css('input#field_columnCount'));
    schemaSelect = element(by.css('select#field_schema'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setColumnCountInput = function(columnCount) {
        this.columnCountInput.sendKeys(columnCount);
    }

    getColumnCountInput = function() {
        return this.columnCountInput.getAttribute('value');
    }

    schemaSelectLastOption = function() {
        this.schemaSelect.all(by.tagName('option')).last().click();
    }

    schemaSelectOption = function(option) {
        this.schemaSelect.sendKeys(option);
    }

    getSchemaSelect = function() {
        return this.schemaSelect;
    }

    getSchemaSelectedOption = function() {
        return this.schemaSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
