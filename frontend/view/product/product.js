fetch('http://localhost:3000/api/furniture')
    .then(res => res.json())
    .then(res => console.log(res))
;

