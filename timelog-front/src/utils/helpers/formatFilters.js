function formatFilters(
  selectedAuthor,
  selectedMonth,
  selectedProject,
  selectedRd
) {
  let author;
  let month;
  let project;
  let rd;

  if (selectedMonth === 'All') {
    month = null;
  } else {
    month = selectedMonth;
  }

  if (selectedAuthor === 'All') {
    author = null;
  } else {
    author = selectedAuthor;
  }

  if (selectedProject === 'All') {
    project = null;
  } else {
    project = selectedProject;
  }

  if (selectedRd === 'All') {
    rd = null;
  } else {
    rd = selectedRd;
  }

  return {
    author,
    month,
    project,
    rd,
  };
}

export default formatFilters;
