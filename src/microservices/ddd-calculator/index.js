import { Responder } from 'cote';
const responder = new Responder({ name: 'ddd-calculator' });
const rates = { usd_eur: 0.91, eur_usd: 1.10 };

responder.on('calculate', (req, cb) => {
    cb(req.amount * rates[`${req.from}_${req.to}`]);
});

responder.on('say-hi', () => 'hi, from the ddd-calculator');