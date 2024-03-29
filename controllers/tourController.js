
const fs = require('fs');
const { validateHeaderValue } = require('http');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

  // params midddleware created
exports.checkId=(req,res,next,val)=>{
  console.log(`Tour id is:${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed.',
      message: 'Invalid id ',
    });
  }
  next();
}

exports.checkBody=(req,res,next)=>{
  if(!req.body.name || !req.body.price){
    return res.status(400).json({
      status: 'failed.',
      message: 'Invalid body ',
    });
  }
  next();
}

// params middleware ended

exports.getAllTours=(req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      results: tours.length,
      requestedAt:req.requestTime,
      data: {
        tours: tours,
      },
    });
  }

  exports.getTour=  (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
  
    if (!tour) {
      return res.status(404).json({
        status: 'failed.',
        message: 'Invalid id ',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }

  exports.createTour=(req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (error) => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  }

  exports.updateTour=(req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here ...>',
      },
    });
  }

  exports.deleteTour= (req, res) => {
    
    res.status(204).json({
      status: 'success',
      data: {
       data:null
      },
    });
  }
