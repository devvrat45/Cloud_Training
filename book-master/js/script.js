fetch('https://8rbil8xom0.execute-api.ap-south-1.amazonaws.com/default/bookManagement', {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify({
    "bookId": '4',
    "BookName": 'Alchemist',
    "Genre": 'Motivational'
  })
});