const express = require('express')
const router = express.Router()

// ENTER ROUTES HERE...

router.get('/internal/registrations', function (req, res) {
  console.log('DEBUG.routes-internal.registrations.get');
  res.render('internal/registrations', {
    registrations : [
      { regId: 'ABC123', type: '1', Description: 'Upstanding piano, dated 1896', Owner: 'Mickey Mouse', OwnerAddress: '41 Test Street, Bristol, BS1 1AB', Status: 'COMPLETE' },
      { regId: 'ABC123', type: '1', Description: '1912 flute with some ivory in the mouthpiece', Owner: 'Goofy', OwnerAddress: 'Flat 1b, 102 Test Street, Bristol, BS3 4MN', Status: 'COMPLETE' },
      { regId: 'ABC123', type: '1', Description: 'Grand piano with some ivory kleys.  Built in 1905', Owner: 'Donald Duck', OwnerAddress: '1 Test Street, Windmill Hill, Bristol, BS7 6VC', Status: 'COMPLETE' },

    ]
  });
});

router.get('internal/item-detail/:id', function (req, res) {
  console.log('DEBUG.routes-internal.item-detail.get');

  console.log('ID:', req.params.id)

  res.render('internal/item-detail');



})



// <td class="govuk-table__cell">{{ registration.regId }}</td>
// <td class="govuk-table__cell">{{ registration.type }}</td>
// <td class="govuk-table__cell">{{ registration.Description }}</td>
// <td class="govuk-table__cell">{{ registration.Explanation }}</td>
// <td class="govuk-table__cell">{{ registration.Owner }}</td>
// <td class="govuk-table__cell">{{ registration.OwnerAddress }}</td>
// <td class="govuk-table__cell">{{ registration.Status }}</td>





//
//
// router.get('/test-template', function(req, res) {
//   res.render('test-template', {
//     items : [
//       { name : 'item #1' },
//       { name : 'item #2' },
//       { name : 'item #3' },
//       { name : 'item #4' },
//     ]
//   });
// });
//


// END OF ROUTES

module.exports = router
