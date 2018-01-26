import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SparkDatasetColumn e2e test', () => {

    let navBarPage: NavBarPage;
    let sparkDatasetColumnDialogPage: SparkDatasetColumnDialogPage;
    let sparkDatasetColumnComponentsPage: SparkDatasetColumnComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SparkDatasetColumns', () => {
        navBarPage.goToEntity('spark-dataset-column-bilge');
        sparkDatasetColumnComponentsPage = new SparkDatasetColumnComponentsPage();
        expect(sparkDatasetColumnComponentsPage.getTitle())
            .toMatch(/bilgeApp.sparkDatasetColumn.home.title/);

    });

    it('should load create SparkDatasetColumn dialog', () => {
        sparkDatasetColumnComponentsPage.clickOnCreateButton();
        sparkDatasetColumnDialogPage = new SparkDatasetColumnDialogPage();
        expect(sparkDatasetColumnDialogPage.getModalTitle())
            .toMatch(/bilgeApp.sparkDatasetColumn.home.createOrEditLabel/);
        sparkDatasetColumnDialogPage.close();
    });

    it('should create and save SparkDatasetColumns', () => {
        sparkDatasetColumnComponentsPage.clickOnCreateButton();
        sparkDatasetColumnDialogPage.setNameInput('name');
        expect(sparkDatasetColumnDialogPage.getNameInput()).toMatch('name');
        sparkDatasetColumnDialogPage.typeSelectLastOption();
        sparkDatasetColumnDialogPage.setDescInput('desc');
        expect(sparkDatasetColumnDialogPage.getDescInput()).toMatch('desc');
        sparkDatasetColumnDialogPage.parentDatasetSelectLastOption();
        sparkDatasetColumnDialogPage.save();
        expect(sparkDatasetColumnDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SparkDatasetColumnComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-spark-dataset-column-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SparkDatasetColumnDialogPage {
    modalTitle = element(by.css('h4#mySparkDatasetColumnLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    typeSelect = element(by.css('select#field_type'));
    descInput = element(by.css('input#field_desc'));
    parentDatasetSelect = element(by.css('select#field_parentDataset'));

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
    setDescInput = function(desc) {
        this.descInput.sendKeys(desc);
    }

    getDescInput = function() {
        return this.descInput.getAttribute('value');
    }

    parentDatasetSelectLastOption = function() {
        this.parentDatasetSelect.all(by.tagName('option')).last().click();
    }

    parentDatasetSelectOption = function(option) {
        this.parentDatasetSelect.sendKeys(option);
    }

    getParentDatasetSelect = function() {
        return this.parentDatasetSelect;
    }

    getParentDatasetSelectedOption = function() {
        return this.parentDatasetSelect.element(by.css('option:checked')).getText();
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
