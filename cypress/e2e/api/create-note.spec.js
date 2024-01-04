import NoteEndPoint from "../../endpoints/note-end-point";


let {
    createNoteTitle,
    createNoteDescription
  } = require("../../utils/texts-utils");

const noteEndPoint = new NoteEndPoint();
let messages;

beforeEach(() => {
    cy.fixture("messages").then((data) => {
      messages = data;
    });
});

describe("Create Note - End Point ", () => {
  it("Create a Note with Valid Values with 'Home' Category", () => {
    const category = "Home"
    const title = createNoteTitle(category, "InComplete")
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteSuccessFully(
      title,
      description,
      category
    );
  });

  it("Create a Note with Valid Values with 'Personal' Category", () => {
    const category = "Personal"
    const title = createNoteTitle(category, "InComplete")
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteSuccessFully(
      title,
      description,
      category
    );
  });

  it("Create a Note with Valid Values with 'Work' Category", () => {
    const category = "Work"
    const title = createNoteTitle(category, "InComplete")
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteSuccessFully(
      title,
      description,
      category
    );
  });

  it("Create a Note with InValid Category i.e. 'Professional", () => {
    const category = "Professional"
    const title = createNoteTitle(category, "InComplete")
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteWithOtherCategory(
      title,
      description,
      category
    );
  });

  it("Create a Note without Entering 'Title'", () => {
    const category = "Home"
    const title = ""
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteWithOneDetailMissing(
      title,
      description,
      category,
      messages.title_missing
    );
  });

  it("Create a Note without Entering 'Description'", () => {
    const category = "Home"
    const title = createNoteTitle(category, "InComplete")
    const description = ""
    noteEndPoint.createNoteWithOneDetailMissing(
      title,
      description,
      category,
      messages.description_missing
    );
  });

  it("Create a Note without Entering 'Category'", () => {
    const category = "Home"
    const title = createNoteTitle(category, "InComplete")
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteWithOneDetailMissing(
      title,
      description,
      "",
      messages.category_missing
    );
  });

  it("Create a Note without Entering 'x-auth-token'", () => {
    const category = "Home"
    const title = createNoteTitle(category, "InComplete")
    const description = createNoteDescription(category, "InComplete")
    noteEndPoint.createNoteWithoutAuthToken(
      title,
      description,
      category,
      messages.no_auth_token
    );
  });
});
