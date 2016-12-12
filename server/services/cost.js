module.exports = function () {

  // Calculate cost
  // 1 Day
  if (request.session.licenceLength === '1-day') {
    if (request.session.licenceType === 'Trout and coarse' && request.session.oldPrice === true) {
      request.session.cost = "£3.75"
    } else if (request.session.licenceType === 'Trout and coarse') {
      request.session.cost = "£6.00"
    } else if (request.session.licenceType === 'Salmon and sea trout' && request.session.oldPrice === true) {
      request.session.cost = "£8.00"
    } else if (request.session.licenceType === 'Salmon and sea trout') {
      request.session.cost = "£12.00"
    }
  }

  // 8 Day
  if (request.session.licenceLength === '8-days (These licences are valid for 8 consecutive days)') {
    if (request.session.licenceType === 'Trout and coarse' && request.session.oldPrice === true) {
      request.session.cost = "£10.00"
    } else if (request.session.licenceType === 'Trout and coarse') {
      request.session.cost = "£12.00"
    } else if (request.session.licenceType === 'Salmon and sea trout' && request.session.oldPrice === true) {
      request.session.cost = "£23.00"
    } else if (request.session.licenceType === 'Salmon and sea trout') {
      request.session.cost = "£27.00"
    }
  }

  // 365 Day
  if (request.session.licenceLength === '365-days') {
      request.session.isFull = true;
    // Junior
    if (request.session.startAge < 17 ) {
      request.session.cost = "00.00"
    }
    // Salmon
    if (request.session.licenceType === 'Salmon and sea trout') {
      if (request.session.startAge  > 65 || request.session.hasBlueBadge === true) {
        request.session.cost = "£54.00"
      } else {
        request.session.cost = "£82.00"
      }
    }
    // Coarse
    if (request.session.licenceType === 'Trout and coarse') {
      if(request.session.numberOfRods === '3 rods') {
        if (request.session.startAge  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = "£30.00"
        } else {
          request.session.cost = "£45.00"
        }
      } else {
        if (request.session.startAge  > 65 || request.session.hasBlueBadge === true) {
          request.session.cost = "£20.00"
        } else {
          request.session.cost = "£30.00"
        }
      }
    }
  }


  return request.session.cost
}
