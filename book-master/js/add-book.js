const form = document.getElementById('addBookForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const bookId = document.getElementById('bookId').value;
  const bookName = document.getElementById('bookName').value;
  const bookGenre = document.getElementById('bookGenre').value;
  fetch('https://msyvwv7mh8.execute-api.ap-south-1.amazonaws.com/default/bookManagement', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({
      bookId: bookId,
      BookName: bookName,
      Genre: bookGenre
    })
  }).then(() => {
    form.reset();
    alert('data has been submitted!');
  });
});