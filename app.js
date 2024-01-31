const express = require('express');
const morgan=require('morgan')

 const toursRouter=require('./routes/tourRoutes')
 const usersRouter=require('./routes/userRoutes')

app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use((req,res,next)=>{
      console.log("Hello from middle ware")
      next()
})

app.use((req,res,next)=>{
      req.requestTime=new Date().toString();
      next()
})



// app.get('/api/v1/tours',getAllTours );
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id',updateTour );
// app.delete('/api/v1/tours/:id',deleteTour);



// const usersRouter=express.Router();
// usersRouter.route('/').get(getAllUsers).post(createUser);
// usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

app.use('/api/v1/tours',toursRouter)
app.use('/api/v1/users',usersRouter)

module.exports=app;