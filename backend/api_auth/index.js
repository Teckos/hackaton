const express = require('express');
const queryModule = require('./db_query_module');
const app = express();
const port = 3000;

const parkings = require('./parkings.json');

app.use(express.json());

const findParkingById = (id) => {
    return parkings.find((parking)=> parking.id === id);
};

app.get('/parkings', (req,res) => {
    res.status(200).json(parkings);
});

app.get('/db', async (req,res) => {
    const selectAll = "SELECT * FROM test";
    // const selectById = (id)=>{return "SELECT * FROM test WHERE id ="+id};
    try {
        const result = await queryModule.executeQuery(selectAll);
        res.status(200).json(result);
    } catch(err) {
        console.log(err)
        res.status(500).send('Something happened...');
    }
});

app.get('/db/:id', async (req,res) => {
    const id = parseInt((req.params.id));
    const selectById = (id)=>{return "SELECT * FROM test WHERE id ="+id};
    try {
        const result = await queryModule.executeQuery(selectById(id));
        res.status(200).json(result);
    } catch(err) {
        console.log(err)
        res.status(500).send('Something happened...');
    }
});

app.get('/parkings/:id', (req, res) => {
    const id = parseInt((req.params.id));
    const parking = findParkingById(id);
    if (!parking) {
        return res.status(404).json({ message: 'Parking not found' });
    };
    res.status(200).json(parking)
});

app.post('/parkings', (req,res) => {
    parkings.push(req.body);
    res.status(200).json(parkings);
});

app.put('/parkings/:id', (req,res)=> {
    const id = parseInt((req.params.id));
    let parking = findParkingById(id);
    if (!parking) {
        return res.status(404).json({ message: 'Parking not found' });
    };
    parking.name = req.body.name;
    parking.city = req.body.city;
    parking.type = req.body.type;
    res.status(200).json(parking);
});

app.delete('/parkings/:id', (req, res) => {
    const id = parseInt((req.params.id));
    let parking = findParkingById(id);
    if (!parking) {
        return res.status(404).json({ message: 'Parking not found!' });
    };
    parkings.splice(parkings.indexOf(parking),1);
    res.status(200).json(parkings);
});

app.listen(port, ()=> {
    console.log('Listening server @',port);
});