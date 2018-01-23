import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SparkDestinationTable e2e test', () => {

    let navBarPage: NavBarPage;
    let sparkDestinationTableDialogPage: SparkDestinationTableDialogPage;
    let sparkDestinationTableComponentsPage: SparkDestinationTableComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SparkDestinationTables', () => {
        navBarPage.goToEntity('spark-destination-table-bilge');
        sparkDestinationTableComponentsPage = new SparkDestinationTableComponentsPage();
        expect(sparkDestinationTableComponentsPage.getTitle())
            .toMatch(/bilgeApp.sparkDestinationTable.home.title/);

    });

    it('should load create SparkDestinationTable dialog', () => {
        sparkDestinationTableComponentsPage.clickOnCreateButton();
        sparkDestinationTableDialogPage = new SparkDestinationTableDialogPage();
        expect(sparkDestinationTableDialogPage.getModalTitle())
            .toMatch(/bilgeApp.sparkDestinationTable.home.createOrEditLabel/);
        sparkDestinationTableDialogPage.close();
    });

    it('should create and save SparkDestinationTables', () => {
        sparkDestinationTableComponentsPage.clickOnCreateButton();
        sparkDestinationTableDialogPage.setNameInput('name');
        expect(sparkDestinationTableDialogPage.getNameInput()).toMatch('name');
        sparkDestinationTableDialogPage.setDescInput('desc');
        expect(sparkDestinationTableDialogPage.getDescInput()).toMatch('desc');
        sparkDestinationTableDialogPage.save();
        expect(sparkDestinationTableDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SparkDestinationTableComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-spark-destination-table-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SparkDestinationTableDialogPage {
    modalTitle = element(by.css('h4#mySparkDestinationTableLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descInput = element(by.css('input#field_desc'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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
