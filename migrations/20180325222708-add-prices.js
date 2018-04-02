const TABLE = 'prices';
const DATA = [
  {
    "destination":  "011" ,
    "origin":  "016" ,
    "costByMinute": 2.9
  },
  {
    "destination":  "011" ,
    "origin":  "018" ,
    "costByMinute": 1.9
  },
  {
    "destination":  "016" ,
    "origin":  "011" ,
    "costByMinute": 1.9
  },
  {
    "destination":  "017" ,
    "origin":  "011" ,
    "costByMinute": 1.7
  },
  {
    "destination":  "011" ,
    "origin":  "017" ,
    "costByMinute": 2.7
  },
  {
    "destination":  "018" ,
    "origin":  "011" ,
    "costByMinute": 0.9
  }
]

exports.up = function (r, connection) {
    return r.tableCreate(TABLE)
      .run(connection)
      .then(() => r.table(TABLE).insert(DATA).run(connection))
      .catch(console.error)
}

exports.down = function (r, connection) {
  return r.tableDrop(TABLE)
      .run(connection)
      .catch(console.error)
}
