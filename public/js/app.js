// Client-side JavaScript (Optional)
console.log('Client-side script loaded.');


app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
  });
  