import rdash from 'rethinkdbdash'
import config from './config.js'

let r;

export default function(options) {
	if(!r){
		options = options || config.rethink;
		r = rdash(options);
	}
	return r;
}