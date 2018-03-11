const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//define actions based on url
express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/result', calculatePrice)
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

//calculate the price of shipping
function calculatePrice(req, res) {
    var weight = parseFloat(req.param('weight'));
    var mailType = req.param('mail-type');
    var price;

    switch (mailType) {
        case 'stamped':
            price = 29 + (calculateWeight(weight) * 21);
            break;
        case 'metered':
            price = 26 + (calculateWeight(weight) * 21);
            break;
        case 'large':
            price = 79 + (calculateWeight(weight) * 21);
            break;
        case 'first-class':
            price = calculateFirstClass(calculateWeight(weight));
            break;
        default:
            price = 'Invalid input';
            break;
    }

    res.render('pages/displayPrices', { 'mailType': mailType, 'weight': weight, 'price': (price / 100).toFixed(2) });
}

function calculateWeight(weight) {
    if (weight <= 1) {
        return 1;
    } else if (weight <= 2) {
        return 2;
    } else if (weight <= 3) {
        return 3;
    } else if (weight <= 4){
        return 4;
    } else if (weight <= 5) {
        return 5;
    } else if (weight <= 6) {
        return 6;
    } else if (weight <= 7) {
        return 7;
    } else if (weight <= 8) {
        return 8;
    } else if (weight <= 9) {
        return 9;
    } else if (weight <= 10) {
        return 10;
    } else if (weight <= 11) {
        return 11;
    } else if (weight <= 12) {
        return 12;
    } else {
        return 13;
    }
}

function calculateFirstClass(weight) {
    if (weight < 5) {
        return 350;
    } else if (weight < 9) {
        return 375;
    } else {
        return 375 + ((weight % 8) * 35 ); 
    } 
}
