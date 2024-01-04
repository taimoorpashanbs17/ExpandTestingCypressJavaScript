/// <reference types="cypress" />

import WelcomePage from "../../pages/welcomePage";
import HomePage from "../../pages/homePage";

let {
  notesCompletedText,
  createNoteTitle,
  createNoteDescription,
  completedNotesTitle,
} = require("../../utils/texts-utils");

let userInformation;
let webMessages;
let backGroundColors;

const welcomePage = new WelcomePage();
const homePage = new HomePage();

beforeEach(() => {
  cy.fixture("user_information_web").then((data) => {
    userInformation = data;
  });
  cy.fixture("web_messages").then((data) => {
    webMessages = data;
  });
  cy.fixture("background_color").then((data) => {
    backGroundColors = data;
  });

  welcomePage.navigate();
  cy.restoreLocalStorage();
});

describe(
  "Note - Create Note with Different Categories and Different Statuses (i.e. Complete and InComplete)",
  {
    retries: {
      runMode: 1,
      openMode: 2,
    },
  },
  () => {
    it("Opening Note Home Page for First Time", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      cy.reload();
      cy.loginUser(userInformation.email, userInformation.password);
      homePage.clickOnAllTabButton();
      homePage.verifyNoNotesText(webMessages.no_notes_all_categories);
      homePage.clickOnHomeTabButton();
      homePage.verifyNoNotesText(webMessages.no_notes_home);
      homePage.clickOnWorkTabButton();
      homePage.verifyNoNotesText(webMessages.no_notes_work);
      homePage.clickOnPersonalTabButton();
      homePage.verifyNoNotesText(webMessages.no_notes_personal);
    });

    it("Creating Note - Home Category", () => {
      const testingNote = createNoteTitle("Home", "InComplete");
      const notesText = notesCompletedText("0/1", "All");
      const notesHomeText = notesCompletedText("0/1", "Home");
      const notesHomeDescription = createNoteDescription("Home", "InComplete");
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Home");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(notesText);
      homePage.clickOnHomeTabButton();
      homePage.getProgressBarText(notesHomeText);
    });

    it("Creating Note - Home Category and Making It Complete", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      cy.reload();
      // cy.loginUser(userInformation.email, userInformation.password)
      const testingNote = createNoteTitle("Home", "Complete");
      const notesText = notesCompletedText("0/1", "All");
      const notesHomeText = notesCompletedText("0/1", "Home");
      const notesHomeDescription = createNoteDescription("Home", "Complete");
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Home");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(notesText);
      homePage.clickOnHomeTabButton();
      homePage.getProgressBarText(notesHomeText);
      homePage.clickOnCompleteToggle();
      homePage.verifyCreatedCardTitle(testingNote);
      homePage.verifyCompleteToggleChecked();
      homePage.verifyCreatedCardBackgroundColorAfterMarkingComplete(
        backGroundColors.home
      );
    });

    it("Creating Note - Home Category with Complete status and marking it incomplete", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      // cy.loginUser(userInformation.email, userInformation.password)
      cy.reload();
      const testingNote = completedNotesTitle("All");
      const notesHomeText = completedNotesTitle("Home");
      const notesHomeDescription = createNoteDescription("Home", "Complete");
      const notesTextAfterUnCheckingComplete = notesCompletedText("0/1", "All");
      const notesTextAfterUnCheckingCompleteAtHome = notesCompletedText(
        "0/1",
        "Home"
      );
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Home");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.checkOnCompleteCheckBox();
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(testingNote);
      homePage.clickOnHomeTabButton();
      homePage.getProgressBarText(notesHomeText);
      homePage.verifyCreatedCardTitle(testingNote);
      homePage.unCheckCompleteToggle();
      homePage.verifyCompleteToggleNotChecked();
      homePage.getProgressBarText(notesTextAfterUnCheckingCompleteAtHome);
      homePage.clickOnAllTabButton();
      homePage.getProgressBarText(notesTextAfterUnCheckingComplete);
      homePage.verifyCreatedCardBackgroundColorAfterMarkingInComplete();
    });

    it("Creating Note - 'Work' Category and Making It Complete", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      // cy.loginUser(userInformation.email, userInformation.password)
      cy.reload();
      const testingNote = createNoteTitle("Work", "Complete");
      const notesText = notesCompletedText("0/1", "All");
      const notesHomeText = notesCompletedText("0/1", "Work");
      const notesHomeDescription = createNoteDescription("Work", "Complete");
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Work");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(notesText);
      homePage.clickOnWorkTabButton();
      homePage.getProgressBarText(notesHomeText);
      homePage.clickOnCompleteToggle();
      homePage.verifyCreatedCardTitle(testingNote);
      homePage.verifyCompleteToggleChecked();
      homePage.verifyCreatedCardBackgroundColorAfterMarkingComplete(
        backGroundColors.home
      );
    });

    it("Creating Note - 'Work' Category with Complete status and marking it incomplete", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      // cy.loginUser(userInformation.email, userInformation.password)
      cy.reload();
      const testingNote = createNoteTitle("Work", "InComplete");
      const notesHomeText = completedNotesTitle("Work");
      const allNotesHomeText = completedNotesTitle("All");
      const notesHomeDescription = createNoteDescription("Work", "Complete");
      const notesTextAfterUnCheckingComplete = notesCompletedText("0/1", "All");
      const notesTextAfterUnCheckingCompleteAtHome = notesCompletedText(
        "0/1",
        "Work"
      );
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Work");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.checkOnCompleteCheckBox();
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(allNotesHomeText);
      homePage.clickOnWorkTabButton();
      homePage.getProgressBarText(notesHomeText);
      homePage.verifyCreatedCardTitle(testingNote);
      homePage.unCheckCompleteToggle();
      homePage.verifyCompleteToggleNotChecked();
      homePage.getProgressBarText(notesTextAfterUnCheckingCompleteAtHome);
      homePage.clickOnAllTabButton();
      homePage.getProgressBarText(notesTextAfterUnCheckingComplete);
      homePage.verifyCreatedCardBackgroundColorAfterMarkingComplete(
        backGroundColors.work
      );
    });

    it("Creating Note - 'Personal' Category and Making It Complete", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      // cy.loginUser(userInformation.email, userInformation.password)
      cy.reload();
      const testingNote = createNoteTitle("Personal", "Complete");
      const notesText = notesCompletedText("0/1", "All");
      const notesHomeText = notesCompletedText("0/1", "Personal");
      const notesHomeDescription = createNoteDescription(
        "Personal",
        "Complete"
      );
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Personal");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(notesText);
      homePage.clickOnPersonalTabButton();
      homePage.getProgressBarText(notesHomeText);
      homePage.clickOnCompleteToggle();
      homePage.verifyCreatedCardTitle(testingNote);
      homePage.verifyCompleteToggleChecked();
      homePage.verifyCreatedCardBackgroundColorAfterMarkingComplete(
        backGroundColors.home
      );
    });

    it("Creating Note - 'Personal' Category with Complete status and marking it incomplete", () => {
      cy.getUserToken();
      cy.deleteAllCreatedNotes();
      // cy.loginUser(userInformation.email, userInformation.password)
      cy.reload();
      const testingNote = createNoteTitle("Personal", "InComplete");
      const notesHomeText = completedNotesTitle("Personal");
      const allNotesHomeText = completedNotesTitle("All");
      const notesHomeDescription = createNoteDescription(
        "Personal",
        "Complete"
      );
      const notesTextAfterUnCheckingComplete = notesCompletedText("0/1", "All");
      const notesTextAfterUnCheckingCompleteAtHome = notesCompletedText(
        "0/1",
        "Personal"
      );
      homePage.clickOnAllTabButton();
      homePage.clickOnAddNoteButton();
      homePage.selectCategoryFromDropDown("Personal");
      homePage.enterTitleOnTitleTextField(testingNote);
      homePage.enterTextOnDescriptionField(notesHomeDescription);
      homePage.checkOnCompleteCheckBox();
      homePage.clickOnCreateButton();
      homePage.getProgressBarText(allNotesHomeText);
      homePage.clickOnPersonalTabButton();
      homePage.getProgressBarText(notesHomeText);
      homePage.verifyCreatedCardTitle(testingNote);
      homePage.unCheckCompleteToggle();
      homePage.verifyCompleteToggleNotChecked();
      homePage.getProgressBarText(notesTextAfterUnCheckingCompleteAtHome);
      homePage.clickOnAllTabButton();
      homePage.getProgressBarText(notesTextAfterUnCheckingComplete);
      homePage.verifyCreatedCardBackgroundColorAfterMarkingComplete(
        backGroundColors.personal
      );
    });
  }
);

afterEach(() => {
  cy.saveLocalStorage();
});
