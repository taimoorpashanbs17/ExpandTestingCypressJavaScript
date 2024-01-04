import CreateNote from "../json-schemas/create_note";

const Ajv = require("ajv");
const avj = new Ajv();

const createNote = new CreateNote();

let endPoints;
let userInformation;
beforeEach(() => {
  cy.fixture("api_end_points").then((data) => {
    endPoints = data;
  });

  cy.fixture("user_information").then((data) => {
    userInformation = data;
  });
  cy.getUserToken();
});

class NoteEndPoint {
  noteURL() {
    var baseURL = Cypress.config("baseUrl");
    var notes_end_point = endPoints.notes;
    return baseURL + notes_end_point;
  }

  createNoteSuccessFully(noteTitle, noteDescription, noteCategory) {
    cy.createNote(
      this.noteURL(),
      noteTitle,
      noteDescription,
      noteCategory
    ).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body["message"]).to.eql("Note successfully created");
      expect(response.body["success"]).to.eql(true);
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(responseBodyKeys).to.deep.eq([
        "success",
        "status",
        "message",
        "data",
      ]);
      const dataBodyKeys = Cypress._.keys(response.body.data);
      expect(dataBodyKeys).to.deep.eq([
        "id",
        "title",
        "description",
        "category",
        "completed",
        "created_at",
        "updated_at",
        "user_id",
      ]);
      expect(response.body.data["title"]).to.eql(noteTitle);
      expect(response.body.data["description"]).to.eql(noteDescription);
      expect(response.body.data["category"]).to.eql(noteCategory);
      expect(response.body.data["completed"]).to.eql(false);
      expect(response.body.data["user_id"]).to.eql(userInformation.id);
      const schema = createNote.created_note_schema;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  createNoteWithOtherCategory(noteTitle, noteDescription, noteCategory) {
    cy.createNote(
      this.noteURL(),
      noteTitle,
      noteDescription,
      noteCategory
    ).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body["message"]).to.eql(
        "Category must be one of the categories: Home, Work, Personal"
      );
      expect(response.body["success"]).to.eql(false);
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message"]);
      const schema = createNote.create_note_with_other_category;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  createNoteWithOneDetailMissing(
    noteTitle,
    noteDescription,
    noteCategory,
    message
  ) {
    cy.createNote(
      this.noteURL(),
      noteTitle,
      noteDescription,
      noteCategory
    ).then((response) => {
      expect(response.status).to.eql(400);
      expect(response.body["message"]).to.eql(message);
      expect(response.body["success"]).to.eql(false);
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message"]);
      const schema = createNote.create_note_with_other_category;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }

  createNoteWithoutAuthToken(
    noteTitle,
    noteDescription,
    noteCategory,
    message
  ) {
    cy.request({
      method: "POST",
      url: this.noteURL(),
      form: true,
      failOnStatusCode: false,
      timeout: 30000,
      body: {
        title: noteTitle,
        description: noteDescription,
        category: noteCategory,
      },
      headers: {
        accept: "application/json",
        "x-auth-token": "",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      expect(response.status).to.eql(401);
      expect(response.body["message"]).to.eql(message);
      expect(response.body["success"]).to.eql(false);
      const responseBodyKeys = Cypress._.keys(response.body);
      expect(responseBodyKeys).to.deep.eq(["success", "status", "message"]);
      const schema = createNote.create_note_with_other_category;
      const validate = avj.compile(schema);
      const isValid = validate(response.body);
      expect(isValid).to.be.true;
    });
  }
}

module.exports = NoteEndPoint;
