import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DataSchema e2e test', () => {

    let navBarPage: NavBarPage;
    let dataSchemaDialogPage: DataSchemaDialogPage;
    let dataSchemaComponentsPage: DataSchemaComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DataSchemas', () => {
        navBarPage.goToEntity('data-schema-bilge');
        dataSchemaComponentsPage = new DataSchemaComponentsPage();
        expect(dataSchemaComponentsPage.getTitle())
            .toMatch(/bilgeApp.dataSchema.home.title/);

    });

    it('should load create DataSchema dialog', () => {
        dataSchemaComponentsPage.clickOnCreateButton();
        dataSchemaDialogPage = new DataSchemaDialogPage();
        expect(dataSchemaDialogPage.getModalTitle())
            .toMatch(/bilgeApp.dataSchema.home.createOrEditLabel/);
        dataSchemaDialogPage.close();
    });

    it('should create and save DataSchemas', () => {
        dataSchemaComponentsPage.clickOnCreateButton();
        dataSchemaDialogPage.setNameInput('name');
        expect(dataSchemaDialogPage.getNameInput()).toMatch('name');
        dataSchemaDialogPage.setTableCountInput('5');
        expect(dataSchemaDialogPage.getTableCountInput()).toMatch('5');
        dataSchemaDialogPage.dataContextSelectLastOption();
        dataSchemaDialogPage.save();
        expect(dataSchemaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DataSchemaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-data-schema-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DataSchemaDialogPage {
    modalTitle = element(by.css('h4#myDataSchemaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    tableCountInput = element(by.css('input#field_tableCount'));
    dataContextSelect = element(by.css('select#field_dataContext'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setTableCountInput = function(tableCount) {
        this.tableCountInput.sendKeys(tableCount);
    }

    getTableCountInput = function() {
        return this.tableCountInput.getAttribute('value');
    }

    dataContextSelectLastOption = function() {
        this.dataContextSelect.all(by.tagName('option')).last().click();
    }

    dataContextSelectOption = function(option) {
        this.dataContextSelect.sendKeys(option);
    }

    getDataContextSelect = function() {
        return this.dataContextSelect;
    }

    getDataContextSelectedOption = function() {
        return this.dataContextSelect.element(by.css('option:checked')).getText();
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
