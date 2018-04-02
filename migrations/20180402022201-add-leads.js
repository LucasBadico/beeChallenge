'use strict'
const TABLE = 'leads'

exports.up = function (r, connection) {
  return r.tableCreate(TABLE)
    .run(connection)
    .catch(console.error)
}

exports.down = function (r, connection) {
return r.tableDrop(TABLE)
    .run(connection)
    .catch(console.error)
}