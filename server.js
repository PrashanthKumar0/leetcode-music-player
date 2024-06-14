import e from 'express';
import cors from 'cors';

const app = e();
app.use(cors());
app.use(e.static('public'));


app.listen(8080, ()=>{
    console.log('file server started at http://localhost:8080');
});