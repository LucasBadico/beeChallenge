import { Responder } from '@LucasBadico/cote';
const responder = new Responder({ name: 'ddd-calculator' });

responder.on('say-hi', _ => Promise.resolve('hi, from the ddd-calculator'));