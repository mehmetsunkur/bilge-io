import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SparkDataset e2e test', () => {

    let navBarPage: NavBarPage;
    let sparkDatasetDialogPage: SparkDatasetDialogPage;
    let sparkDatasetComponentsPage: SparkDatasetComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SparkDatasets', () => {
        navBarPage.goToEntity('spark-dataset-bilge');
        sparkDatasetComponentsPage = new SparkDatasetComponentsPage();
        expect(sparkDatasetComponentsPage.getTitle())
            .toMatch(/bilgeApp.sparkDataset.home.title/);

    });

    it('should load create SparkDataset dialog', () => {
        sparkDatasetComponentsPage.clickOnCreateButton();
        sparkDatasetDialogPage = new SparkDatasetDialogPage();
        expect(sparkDatasetDialogPage.getModalTitle())
            .toMatch(/bilgeApp.sparkDataset.home.createOrEditLabel/);
        sparkDatasetDialogPage.close();
    });

    it('should create and save SparkDatasets', () => {
        sparkDatasetComponentsPage.clickOnCreateButton();
        sparkDatasetDialogPage.setModuleInput('module');
        expect(sparkDatasetDialogPage.getModuleInput()).toMatch('module');
        sparkDatasetDialogPage.setNameInput('name');
        expect(sparkDatasetDialogPage.getNameInput()).toMatch('name');
        sparkDatasetDialogPage.setDescInput('desc');
        expect(sparkDatasetDialogPage.getDescInput()).toMatch('desc');
        sparkDatasetDialogPage.save();
        expect(sparkDatasetDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SparkDatasetComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-spark-dataset-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SparkDatasetDialogPage {
    modalTitle = element(by.css('h4#mySparkDatasetLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    moduleInput = element(by.css('input#field_module'));
    nameInput = element(by.css('input#field_name'));
    descInput = element(by.css('input#field_desc'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setModuleInput = function(module) {
        this.moduleInput.sendKeys(module);
    }

    getModuleInput = function() {
        return this.moduleInput.getAttribute('value');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setDescInput = function(desc) {
        this.descInput.sendKeys(desc);
    }

    getDescInput = function() {
        return this.descInput.getAttribute('value');
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
