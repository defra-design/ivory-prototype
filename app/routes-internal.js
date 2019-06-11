const express = require('express')
const router = express.Router()

// ENTER ROUTES HERE...

function logger (req) {
  return 'DEBUG.routes ' + req.method + req.route.path
}

/// ///////////////////////////////////////////////////////////////////////////
// REGISTRATIONS
router.get('/internal/registrations', function (req, res) {
  console.log(logger(req))
  // Optionally query parameter can get passed from the search, so pick it up.
  if (req.query.regId) {
    console.log(logger(req) + ':query parameters exist')
    console.log(logger(req) + ':regId=' + req.query.regId)
  } else {
    console.log(logger(req) + ':No query parameters exist')
  }

  let sqlQuery = ''

  // Use static data
  if (process.env.USE_DATABASE.toLowerCase() === 'false') {
    console.log(logger(req) + ':USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore use static data.')
    res.render('internal/registrations', {
      registrations: [{
        reg_id: 'IVR0001',
        exemption_type_shortname: '1',
        title: 'Upstanding piano',
        description: 'Piano made in the early 20th century with ivory keys',
        status: 'COMPLETE',
        submitted_datetime: new Date('2019-01-10 09:10:00')
      },
      {
        reg_id: 'IVR0002',
        exemption_type_shortname: '1',
        title: 'Flute',
        description: '1912 flute with some ivory in the mouthpiece',
        status: 'COMPLETE',
        submitted_datetime: new Date('2019-01-11 10:10:00')
      },
      {
        reg_id: 'IVR0003',
        exemption_type_shortname: '1',
        title: 'Grand piano',
        description: 'Grand piano with some ivory keys.',
        status: 'COMPLETE',
        submitted_datetime: new Date('2019-01-12 11:10:00')
      }
      ]
    })
  } else {
    // Use the database
    console.log(logger(req) + ':USE_DATABASE=' + process.env.USE_DATABASE + ', therefore lookup database.')

    var client = require('./postgres/db').getClient()
    client.connect()

    // Define the SQL
    if (req.query.regId) {
      sqlQuery = "SELECT r.reg_id, e.exemption_type_shortname, r.title, r.description, r.status, r.submitted_datetime FROM registrations r LEFT JOIN exemptiontypes e ON r.exemption_type = e.exemption_type_id WHERE UPPER(r.reg_id) LIKE UPPER('%" + req.query.regId + "%') ORDER BY r.reg_id"
    } else {
      sqlQuery = 'SELECT r.reg_id, e.exemption_type_shortname, r.title, r.description, r.status, r.submitted_datetime FROM registrations r LEFT JOIN exemptiontypes e ON r.exemption_type = e.exemption_type_id ORDER BY r.reg_id'
    }
    console.log(logger(req) + ':sqlQuery=' + sqlQuery)

    // Execute SQL
    client.query(sqlQuery, (err, queryRes) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(logger(req) + ':SQL query successful')
      }
      client.end()

      // Render the page
      res.render('internal/registrations', {
        registrations: queryRes.rows
      })
    })
  }
})

router.post('/internal/registrations', function (req, res) {
  console.log(logger(req))
  // Pick up search
  var searchRegId = req.session.data['searchRegId']
  console.log(logger(req) + ':searchRegId=' + searchRegId)

  // Render the page
  res.redirect('/internal/registrations?regId=' + searchRegId)
})

/// ///////////////////////////////////////////////////////////////////////////
// ITEM DETAIL
router.get('/internal/item-detail/:regId', function (req, res) {
  console.log(logger(req))
  // Pick up the 'URL parameter' (explicity put into the URL rather than a 'query parameters' that have ?var= at the end of the URL)
  let regId = req.params.regId
  console.log(logger(req) + ':regId=' + regId)
  let sqlQuery = ''

  // Use static data
  if (process.env.USE_DATABASE.toLowerCase() === 'false') {
    console.log(logger(req) + ':USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore use static data.')
    res.render('internal/item-detail', {
      registration: {
        reg_id: 'IVR0002',
        exemption_type_shortname: '1',
        title: 'Upstanding piano',
        description: 'Piano made in the early 20th century with ivory keys',
        explanation: '',
        status: 'COMPLETE',
        submitted_datetime: new Date('2019-01-12 11:10:00'),
        owner_name: 'Mickey Mouse',
        owner_address: 'Disland Paris, Paris, France',
        owner_postcode: 'PA1 3IS'
      }
    })

    // Use database
  } else {
    console.log(logger(req) + ':USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore lookup database.')

    let client = require('./postgres/db').getClient()
    client.connect()

    sqlQuery = "SELECT r.reg_id, e.exemption_type_shortname, r.title, r.description, r.explanation, r.owner_id, r.email_address, r.status, r.submitted_datetime, r.owner_name, r.owner_address, r.owner_postcode FROM registrations r LEFT JOIN exemptiontypes e ON r.exemption_type = e.exemption_type_id WHERE reg_id='" + regId + "'"
    console.log(logger(req) + ':sqlQuery=' + sqlQuery)
    client.query(sqlQuery, (err, queryRes) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(logger(req) + ': SQL successful')
      }
      client.end()

      res.render('internal/item-detail', {
        registration: queryRes.rows[0]
      })
    })
  }
})

// END OF ROUTES

module.exports = router
