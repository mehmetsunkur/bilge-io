import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SparkDestinationColumn e2e test', () => {

    let navBarPage: NavBarPage;
    let sparkDestinationColumnDialogPage: SparkDestinationColumnDialogPage;
    let sparkDestinationColumnComponentsPage: SparkDestinationColumnComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SparkDestinationColumns', () => {
        navBarPage.goToEntity('spark-destination-column-bilge');
        sparkDestinationColumnComponentsPage = new SparkDestinationColumnComponentsPage();
        expect(sparkDestinationColumnComponentsPage.getTitle())
            .toMatch(/bilgeApp.sparkDestinationColumn.home.title/);

    });

    it('should load create SparkDestinationColumn dialog', () => {
        sparkDestinationColumnComponentsPage.clickOnCreateButton();
        sparkDestinationColumnDialogPage = new SparkDestinationColumnDialogPage();
        expect(sparkDestinationColumnDialogPage.getModalTitle())
            .toMatch(/bilgeApp.sparkDestinationColumn.home.createOrEditLabel/);
        sparkDestinationColumnDialogPage.close();
    });

    it('should create and save SparkDestinationColumns', () => {
        sparkDestinationColumnComponentsPage.clickOnCreateButton();
        sparkDestinationColumnDialogPage.setNameInput('name');
        expect(sparkDestinationColumnDialogPage.getNameInput()).toMatch('name');
        sparkDestinationColumnDialogPage.setTypeInput('type');
        expect(sparkDestinationColumnDialogPage.getTypeInput()).toMatch('type');
        sparkDestinationColumnDialogPage.setDescInput('desc');
        expect(sparkDestinationColumnDialogPage.getDescInput()).toMatch('desc');
        sparkDestinationColumnDialogPage.parentTableSelectLastOption();
        sparkDestinationColumnDialogPage.save();
        expect(sparkDestinationColumnDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SparkDestinationColumnComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-spark-destination-column-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SparkDestinationColumnDialogPage {
    modalTitle = element(by.css('h4#mySparkDestinationColumnLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    typeInput = element(by.css('input#field_type'));
    descInput = element(by.css('input#field_desc'));
    parentTableSelect = element(by.css('select#field_parentTable'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    }

    setDescInput = function(desc) {
        this.descInput.sendKeys(desc);
    }

    getDescInput = function() {
        return this.descInput.getAttribute('value');
    }

    parentTableSelectLastOption = function() {
        this.parentTableSelect.all(by.tagName('option')).last().click();
    }

    parentTableSelectOption = function(option) {
        this.parentTableSelect.sendKeys(option);
    }

    getParentTableSelect = function() {
        return this.parentTableSelect;
    }

    getParentTableSelectedOption = function() {
        return this.parentTableSelect.element(by.css('option:checked')).getText();
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
