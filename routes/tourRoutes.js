const express=require('express')
const toursControler=require('../controllers/tourController')

const router=express.Router();

router.param('id',toursControler.checkId)

router.route('/')
.get(toursControler.getAllTours)
.post(toursControler.checkBody,toursControler.createTour);

router.route('/:id')
.get(toursControler.getTour)
.patch(toursControler.updateTour)
.delete(toursControler.deleteTour)

module.exports=router