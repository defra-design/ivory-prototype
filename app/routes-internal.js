const express = require('express')
const router = express.Router()

// ENTER ROUTES HERE...

//////////////////////////////////////////////////////////////////////////////
// REGISTRATIONS
router.get('/internal/registrations', function(req, res) {
  console.log('\nDEBUG.routes ' + req.method + req.route.path);
  // Optionally query parameter can get passed from the search, so pick it up.
  var regId = req.query.regId;
  console.log('DEBUG.routes ' + req.route.path + ', regId=' + regId);

  // Use static data
  if (process.env.USE_DATABASE.toLowerCase() == 'false') {
    console.log('DEBUG.routes USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore use static data.');
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
    });


  } else {
    //Use the database
    console.log('DEBUG.routes USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore lookup database.');

    var client = require('./postgres/db').getClient();
    client.connect();

    // Define the SQL
    if (regId != '') {
      console.log('DEBUG.routes ' + req.route.path + ', regId=' + regId);
      var sqlQuery = "SELECT r.reg_id, e.exemption_type_shortname, r.title, r.description, r.status, r.submitted_datetime FROM registrations r LEFT JOIN exemptiontypes e ON r.exemption_type = e.exemption_type_id WHERE UPPER(r.reg_id) LIKE UPPER('%" + regId + "%') ORDER BY r.reg_id";
    } else {
      var sqlQuery = "SELECT r.reg_id, e.exemption_type_shortname, r.title, r.description, r.status, r.submitted_datetime FROM registrations r LEFT JOIN exemptiontypes e ON r.exemption_type = e.exemption_type_id ORDER BY r.reg_id";
    }
    console.log('Executing: ' + sqlQuery);

    //Execute SQL
    client.query(sqlQuery, (err, queryRes) => {
      if (err) { console.log(err.stack) }
      else { console.log('SQL query successful') }
      client.end()

      // Render the page
      res.render('internal/registrations', {
        registrations: queryRes.rows
      });
    })
  }
});


router.post('/internal/registrations', function(req, res) {
  console.log('\nDEBUG.routes ' + req.method + req.route.path);
  // Pick up search
  var searchRegId = req.session.data['searchRegId'];
  console.log('searchRegId=' + searchRegId);

  // Render the page
  res.redirect('/internal/registrations?regId='+searchRegId);
})




//////////////////////////////////////////////////////////////////////////////
// ITEM DETAIL
router.get('/internal/item-detail/:regId', function(req, res) {
  console.log('DEBUG.routes ' + req.method + req.route.path);
  // Pick up the 'URL parameter' (explicity put into the URL rather than a 'query parameters' that have ?var= at the end of the URL)
  var regId = req.params.regId;
  console.log('DEBUG.routes ' + req.route.path + ', regId=' + regId);

  // Use static data
  if (process.env.USE_DATABASE.toLowerCase() == 'false') {
    console.log('DEBUG.routes USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore use static data.');
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
    });

    //Use database
  } else {
    console.log('DEBUG.routes USE_DATABASE = ' + process.env.USE_DATABASE + ', therefore lookup database.');

    var client = require('./postgres/db').getClient();
    client.connect();

    var sqlQuery = "SELECT r.reg_id, e.exemption_type_shortname, r.title, r.description, r.explanation, r.owner_id, r.email_address, r.status, r.submitted_datetime, r.owner_name, r.owner_address, r.owner_postcode FROM registrations r LEFT JOIN exemptiontypes e ON r.exemption_type = e.exemption_type_id WHERE reg_id='" + regId + "'";
    console.log('Executing: ' + sqlQuery);
    client.query(sqlQuery, (err, queryRes) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('Successful');
      }
      client.end()

      res.render('internal/item-detail', {
        registration: queryRes.rows[0]
      });
    })
  }
});




// END OF ROUTES

module.exports = router
