const form = document.getElementById('deleteBookForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const bookId = document.getElementById('bookId').value;
  fetch('https://msyvwv7mh8.execute-api.ap-south-1.amazonaws.com/default/bookManagement', {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'DELETE',
    body: JSON.stringify({
      'bookId': bookId
    })
  }).then(() => {
    form.reset();
    alert('book has been deleted!');
  });
});