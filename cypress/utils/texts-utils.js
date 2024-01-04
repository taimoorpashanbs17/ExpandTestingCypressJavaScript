function notesCompletedText(numberOfCategories, category) {
  const categories = ["Home", "Work", "Personal"];
  if (categories.includes(category)) {
    return (
      "You have " +
      numberOfCategories +
      " notes completed in the " +
      category.toLowerCase() +
      " category"
    );
  } else {
    return (
      "You have " +
      numberOfCategories +
      " notes completed in the all categories"
    );
  }
}

function createNoteTitle(category, completedStatus) {
  return (
    "Title for " + category + " category, which is " + completedStatus
  );
}

function createNoteDescription(category, completedStatus) {
  return (
    "This is testing description for " +
    category +
    " category, which is to be mentioned that is " +
    completedStatus +
    " by user."
  );
}

function completedNotesTitle(category) {
  let categories = ['Home', 'Work', 'Personal']
  if (category.includes(categories)) {
    return "You have completed all notes in the "+category.toLowerCase()+" category"
  }
  else {
    return "You have completed all notes"
  }
}

module.exports = { notesCompletedText, createNoteTitle, createNoteDescription , completedNotesTitle};
