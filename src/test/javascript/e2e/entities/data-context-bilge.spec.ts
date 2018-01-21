import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('DataContext e2e test', () => {

    let navBarPage: NavBarPage;
    let dataContextDialogPage: DataContextDialogPage;
    let dataContextComponentsPage: DataContextComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DataContexts', () => {
        navBarPage.goToEntity('data-context-bilge');
        dataContextComponentsPage = new DataContextComponentsPage();
        expect(dataContextComponentsPage.getTitle())
            .toMatch(/bilgeApp.dataContext.home.title/);

    });

    it('should load create DataContext dialog', () => {
        dataContextComponentsPage.clickOnCreateButton();
        dataContextDialogPage = new DataContextDialogPage();
        expect(dataContextDialogPage.getModalTitle())
            .toMatch(/bilgeApp.dataContext.home.createOrEditLabel/);
        dataContextDialogPage.close();
    });

    it('should create and save DataContexts', () => {
        dataContextComponentsPage.clickOnCreateButton();
        dataContextDialogPage.setNameInput('name');
        expect(dataContextDialogPage.getNameInput()).toMatch('name');
        dataContextDialogPage.sourceConnectionSelectLastOption();
        dataContextDialogPage.save();
        expect(dataContextDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class DataContextComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-data-context-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DataContextDialogPage {
    modalTitle = element(by.css('h4#myDataContextLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    sourceConnectionSelect = element(by.css('select#field_sourceConnection'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    sourceConnectionSelectLastOption = function() {
        this.sourceConnectionSelect.all(by.tagName('option')).last().click();
    }

    sourceConnectionSelectOption = function(option) {
        this.sourceConnectionSelect.sendKeys(option);
    }

    getSourceConnectionSelect = function() {
        return this.sourceConnectionSelect;
    }

    getSourceConnectionSelectedOption = function() {
        return this.sourceConnectionSelect.element(by.css('option:checked')).getText();
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
