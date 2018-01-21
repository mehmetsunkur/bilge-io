import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SourceDbConnection e2e test', () => {

    let navBarPage: NavBarPage;
    let sourceDbConnectionDialogPage: SourceDbConnectionDialogPage;
    let sourceDbConnectionComponentsPage: SourceDbConnectionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SourceDbConnections', () => {
        navBarPage.goToEntity('source-db-connection-bilge');
        sourceDbConnectionComponentsPage = new SourceDbConnectionComponentsPage();
        expect(sourceDbConnectionComponentsPage.getTitle())
            .toMatch(/bilgeApp.sourceDbConnection.home.title/);

    });

    it('should load create SourceDbConnection dialog', () => {
        sourceDbConnectionComponentsPage.clickOnCreateButton();
        sourceDbConnectionDialogPage = new SourceDbConnectionDialogPage();
        expect(sourceDbConnectionDialogPage.getModalTitle())
            .toMatch(/bilgeApp.sourceDbConnection.home.createOrEditLabel/);
        sourceDbConnectionDialogPage.close();
    });

    it('should create and save SourceDbConnections', () => {
        sourceDbConnectionComponentsPage.clickOnCreateButton();
        sourceDbConnectionDialogPage.setNameInput('name');
        expect(sourceDbConnectionDialogPage.getNameInput()).toMatch('name');
        sourceDbConnectionDialogPage.setUrlInput('url');
        expect(sourceDbConnectionDialogPage.getUrlInput()).toMatch('url');
        sourceDbConnectionDialogPage.setUserInput('user');
        expect(sourceDbConnectionDialogPage.getUserInput()).toMatch('user');
        sourceDbConnectionDialogPage.setPassInput('pass');
        expect(sourceDbConnectionDialogPage.getPassInput()).toMatch('pass');
        sourceDbConnectionDialogPage.setDbTypeInput('dbType');
        expect(sourceDbConnectionDialogPage.getDbTypeInput()).toMatch('dbType');
        sourceDbConnectionDialogPage.save();
        expect(sourceDbConnectionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SourceDbConnectionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-source-db-connection-bilge div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SourceDbConnectionDialogPage {
    modalTitle = element(by.css('h4#mySourceDbConnectionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    urlInput = element(by.css('input#field_url'));
    userInput = element(by.css('input#field_user'));
    passInput = element(by.css('input#field_pass'));
    dbTypeInput = element(by.css('input#field_dbType'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setUrlInput = function(url) {
        this.urlInput.sendKeys(url);
    }

    getUrlInput = function() {
        return this.urlInput.getAttribute('value');
    }

    setUserInput = function(user) {
        this.userInput.sendKeys(user);
    }

    getUserInput = function() {
        return this.userInput.getAttribute('value');
    }

    setPassInput = function(pass) {
        this.passInput.sendKeys(pass);
    }

    getPassInput = function() {
        return this.passInput.getAttribute('value');
    }

    setDbTypeInput = function(dbType) {
        this.dbTypeInput.sendKeys(dbType);
    }

    getDbTypeInput = function() {
        return this.dbTypeInput.getAttribute('value');
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
