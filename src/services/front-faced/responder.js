import { Responder } from 'cote';
const responder = new Responder({ name: 'front-faced' });

responder.on('say-hi', _ => Promise.resolve('hi, from the front-faced'));