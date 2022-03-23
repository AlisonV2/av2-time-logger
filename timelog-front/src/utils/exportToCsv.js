function exportToCsv(data) {
  const a = document.createElement('a');
  a.href = `data:attachment/csv,${encodeURI(data)}`;
  a.target = '_blank';
  a.download = 'timelog.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default exportToCsv;