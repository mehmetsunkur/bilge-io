import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DataColumn e2e test', () => {

    let navBarPage: NavBarPage;
    let dataColumnDialogPage: DataColumnDialogPage;
    let dataColumnComponentsPage: DataColumnComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DataColumns', () => {
        navBarPage.goToEntity('data-column-bilge');
        dataColumnComponentsPage = new DataColumnComponentsPage();
        expect(dataColumnComponentsPage.getTitle())
            .toMatch(/bilgeApp.dataColumn.home.title/);

    });

    it('should load create DataColumn dialog', () => {
        dataColumnComponentsPage.clickOnCreateButton();
        dataColumnDialogPage = new DataColumnDialogPage();
        expect(dataColumnDialogPage.getModalTitle())
            .toMatch(/bilgeApp.dataColumn.home.createOrEditLabel/);
        dataColumnDialogPage.close();
    });

    it('should create and save DataColumns', () => {
        dataColumnComponentsPage.clickOnCreateButton();
        dataColumnDialogPage.setNameInput('name');
        expect(dataColumnDialogPage.getNameInput()).toMatch('name');
        dataColumnDialogPage.typeSelectLastOption();
        dataColumnDialogPage.setSizeInput('5');
        expect(dataColumnDialogPage.getSizeInput()).toMatch('5');
        dataColumnDialogPage.getNullableInput().isSelected().then((selected) => {
            if (selected) {
                dataColumnDialogPage.getNullableInput().click();
                expect(dataColumnDialogPage.getNullableInput().isSelected()).toBeFalsy();
            } else {
                dataColumnDialogPage.getNullableInput().click();
                expect(dataColumnDialogPage.getNullableInput().isSelected()).toBeTruthy();
            }
        });
        dataColumnDialogPage.setRemarksInput('remarks');
        expect(dataColumnDialogPage.getRemarksInput()).toMatch('remarks');
        dataColumnDialogPage.setNativeTypeInput('nativeType');
        expect(dataColumnDialogPage.getNativeTypeInput()).toMatch('nativeType');
        dataColumnDialogPage.getIndexedInput().isSelected().then((selected) => {
            if (selected) {
                dataColumnDialogPage.getIndexedInput().click();
                expect(dataColumnDialogPage.getIndexedInput().isSelected()).toBeFalsy();
            } else {
                dataColumnDialogPage.getIndexedInput().click();
                expect(dataColumnDialogPage.getIndexedInput().isSelected()).toBeTruthy();
            }
        });
        dataColumnDialogPage.getPrimaryKeyInput().isSelected().then((selected) => {
            if (selected) {
                dataColumnDialogPage.getPrimaryKeyInput().click();
                expect(dataColumnDialogPage.getPrimaryKeyInput().isSelected()).toBeFalsy();
            } else {
                dataColumnDialogPage.getPrimaryKeyInput().click();
                expect(dataColumnDialogPage.getPrimaryKeyInput().isSelected()).toBeTruthy();
            }
        });
        dataColumnDialogPage.tableSelectLastOption();
        dataColumnDialogPage.save();
        expect(dataColumnDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DataColumnComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-data-column-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DataColumnDialogPage {
    modalTitle = element(by.css('h4#myDataColumnLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    typeSelect = element(by.css('select#field_type'));
    sizeInput = element(by.css('input#field_size'));
    nullableInput = element(by.css('input#field_nullable'));
    remarksInput = element(by.css('input#field_remarks'));
    nativeTypeInput = element(by.css('input#field_nativeType'));
    indexedInput = element(by.css('input#field_indexed'));
    primaryKeyInput = element(by.css('input#field_primaryKey'));
    tableSelect = element(by.css('select#field_table'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    }

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    }

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    }
    setSizeInput = function(size) {
        this.sizeInput.sendKeys(size);
    }

    getSizeInput = function() {
        return this.sizeInput.getAttribute('value');
    }

    getNullableInput = function() {
        return this.nullableInput;
    }
    setRemarksInput = function(remarks) {
        this.remarksInput.sendKeys(remarks);
    }

    getRemarksInput = function() {
        return this.remarksInput.getAttribute('value');
    }

    setNativeTypeInput = function(nativeType) {
        this.nativeTypeInput.sendKeys(nativeType);
    }

    getNativeTypeInput = function() {
        return this.nativeTypeInput.getAttribute('value');
    }

    getIndexedInput = function() {
        return this.indexedInput;
    }
    getPrimaryKeyInput = function() {
        return this.primaryKeyInput;
    }
    tableSelectLastOption = function() {
        this.tableSelect.all(by.tagName('option')).last().click();
    }

    tableSelectOption = function(option) {
        this.tableSelect.sendKeys(option);
    }

    getTableSelect = function() {
        return this.tableSelect;
    }

    getTableSelectedOption = function() {
        return this.tableSelect.element(by.css('option:checked')).getText();
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
