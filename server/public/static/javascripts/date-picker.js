$(function () {
  var page = new StartDatePage({
    maxDaysInAdvance: 90
  })
})

function StartDatePage (options) {
  var maxDate = options.maxDaysInAdvance
  var $day = $('#day')
  var $month = $('#month')
  var $year = $('#year')
  var $datepicker = $('#datepicker')

  if ($datepicker.val() === '//') {
    $datepicker.val('')
  }

  $datepicker.datepicker({
    minDate: 0,
    maxDate: maxDate,
    dateFormat: 'dd/mm/yy',
    showOn: 'button',
    //buttonImage: '/public/images/calendar.png',
    buttonImage: '/public/images/calendar-two.png',
    buttonImageOnly: false,
    //buttonText: 'Open calendar',
    //buttonText: 'Select from calendar',
    dayNamesShort: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
    showButtonPanel: true,
    closeText: 'Close',
    onSelect: onSelect
  })

  dayTripper()

  function dayTripper () {
    $('.ui-datepicker-trigger').click(function () {
      setTimeout(function () {
        var $today = $('.ui-datepicker-today a')
        var $selected = $('.ui-datepicker-current-day a')

        if ($selected.length) {
          $selected.focus()
        } else {
          $today.focus()
        }

        // Hide the "today" button
        $('.ui-datepicker-current').hide()

        datePickHandler()
      }, 0)
    })
  }

  function datePickHandler () {
    var activeDate, prev, next
    var container = document.getElementById('ui-datepicker-div')
    var input = document.getElementById('datepicker')

    if (!container || !input) {
      return
    }

    $(container).find('table').first().attr('role', 'grid')

    container.setAttribute('role', 'application')
    container.setAttribute('aria-label', 'Calendar view date-picker')

    // the top controls:
    prev = $('.ui-datepicker-prev', container)[0]
    next = $('.ui-datepicker-next', container)[0]

    // This is the line that needs to be fixed for use on pages with base URL set in head
    next.href = 'javascript:void(0)'
    prev.href = 'javascript:void(0)'

    next.setAttribute('role', 'button')
    next.removeAttribute('title')
    prev.setAttribute('role', 'button')
    prev.removeAttribute('title')

    appendOffscreenMonthText(next)
    appendOffscreenMonthText(prev)

    // delegation won't work here for whatever reason, so we are
    // forced to attach individual click listeners to the prev /
    // next month buttons each time they are added to the DOM
    $(next).on('click', handleNextClicks)
    $(prev).on('click', handlePrevClicks)

    monthDayYearText()

    $(container).on('keydown', function calendarKeyboardListener (keyVent) {
      var which = keyVent.which
      var target = keyVent.target
      var dateCurrent = getCurrentDate(container)

      if (!dateCurrent) {
        dateCurrent = $('a.ui-state-default')[0]
        setHighlightState(dateCurrent, container)
      }

      if (which === 27) {
        keyVent.stopPropagation()
        return closeCalendar()
      } else if (which === 9 && keyVent.shiftKey) { // SHIFT + TAB
        keyVent.preventDefault()
        if ($(target).hasClass('ui-datepicker-close')) { // close button
          $('.ui-datepicker-prev')[0].focus()
        } else if ($(target).hasClass('ui-state-default')) { // a date link
          $('.ui-datepicker-close')[0].focus()
        } else if ($(target).hasClass('ui-datepicker-prev')) { // the prev link
          $('.ui-datepicker-next')[0].focus()
        } else if ($(target).hasClass('ui-datepicker-next')) { // the next link
          activeDate = $('.ui-state-highlight') ||
          $('.ui-state-active')[0]
          if (activeDate) {
            activeDate.focus()
          }
        }
      } else if (which === 9) { // TAB
        keyVent.preventDefault()
        if ($(target).hasClass('ui-datepicker-close')) { // close button
          activeDate = $('.ui-state-highlight') ||
          $('.ui-state-active')[0]
          if (activeDate) {
            activeDate.focus()
          }
        } else if ($(target).hasClass('ui-state-default')) {
          $('.ui-datepicker-next')[0].focus()
        } else if ($(target).hasClass('ui-datepicker-next')) {
          $('.ui-datepicker-prev')[0].focus()
        } else if ($(target).hasClass('ui-datepicker-prev')) {
          $('.ui-datepicker-close')[0].focus()
        }
      } else if (which === 37) { // LEFT arrow key
        // if we're on a date link...
        if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
          keyVent.preventDefault()
          previousDay(target)
        }
      } else if (which === 39) { // RIGHT arrow key
        // if we're on a date link...
        if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
          keyVent.preventDefault()
          nextDay(target)
        }
      } else if (which === 38) { // UP arrow key
        if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
          keyVent.preventDefault()
          upHandler(target, container, prev)
        }
      } else if (which === 40) { // DOWN arrow key
        if (!$(target).hasClass('ui-datepicker-close') && $(target).hasClass('ui-state-default')) {
          keyVent.preventDefault()
          downHandler(target, container, next)
        }
      } else if (which === 13) { // ENTER
        if ($(target).hasClass('ui-state-default')) {
          setTimeout(function () {
            closeCalendar()
          }, 100)
        } else if ($(target).hasClass('ui-datepicker-prev')) {
          handlePrevClicks()
        } else if ($(target).hasClass('ui-datepicker-next')) {
          handleNextClicks()
        }
      } else if (which === 32) {
        if ($(target).hasClass('ui-datepicker-prev') || $(target).hasClass('ui-datepicker-next')) {
          target.click()
        }
      } else if (which === 33) { // PAGE UP
        moveOneMonth(target, 'prev')
      } else if (which === 34) { // PAGE DOWN
        moveOneMonth(target, 'next')
      } else if (which === 36) { // HOME
        var firstOfMonth = $(target).closest('tbody').find('.ui-state-default')[0]
        if (firstOfMonth) {
          firstOfMonth.focus()
          setHighlightState(firstOfMonth, $('#ui-datepicker-div')[0])
        }
      } else if (which === 35) { // END
        var $daysOfMonth = $(target).closest('tbody').find('.ui-state-default')
        var lastDay = $daysOfMonth[$daysOfMonth.length - 1]
        if (lastDay) {
          lastDay.focus()
          setHighlightState(lastDay, $('#ui-datepicker-div')[0])
        }
      }
      $('.ui-datepicker-current').hide()
    })
  }

  function closeCalendar () {
    var container = $('#ui-datepicker-div')
    $(container).off('keydown')
    var input = $('#datepicker')[0]
    $(input).datepicker('hide')

    input.focus()
  }

  function moveOneMonth (currentDate, dir) {
    var button = (dir === 'next')
      ? $('.ui-datepicker-next')[0]
      : $('.ui-datepicker-prev')[0]

    if (!button) {
      return
    }

    var ENABLED_SELECTOR = '#ui-datepicker-div tbody td:not(.ui-state-disabled)'
    var $currentCells = $(ENABLED_SELECTOR)
    var currentIdx = $.inArray(currentDate.parentNode, $currentCells)

    button.click()
    setTimeout(function () {
      updateHeaderElements()

      var $newCells = $(ENABLED_SELECTOR)
      var newTd = $newCells[currentIdx]
      var newAnchor = newTd && $(newTd).find('a')[0]

      while (!newAnchor) {
        currentIdx--
        newTd = $newCells[currentIdx]
        newAnchor = newTd && $(newTd).find('a')[0]
      }

      setHighlightState(newAnchor, $('#ui-datepicker-div')[0])
      newAnchor.focus()
    }, 0)
  }

  function handleNextClicks () {
    setTimeout(function () {
      updateHeaderElements()
      prepHighlightState()
      $('.ui-datepicker-next').focus()
      $('.ui-datepicker-current').hide()
    }, 0)
  }

  function handlePrevClicks () {
    setTimeout(function () {
      updateHeaderElements()
      prepHighlightState()
      $('.ui-datepicker-prev').focus()
      $('.ui-datepicker-current').hide()
    }, 0)
  }

  function previousDay (dateLink) {
    var container = document.getElementById('ui-datepicker-div')
    if (!dateLink) {
      return
    }
    var td = $(dateLink).closest('td')
    if (!td) {
      return
    }

    var prevTd = $(td).prev()
    var prevDateLink = $('a.ui-state-default', prevTd)[0]

    if (prevTd && prevDateLink) {
      setHighlightState(prevDateLink, container)
      prevDateLink.focus()
    } else {
      handlePrevious(dateLink)
    }
  }

  function handlePrevious (target) {
    var container = document.getElementById('ui-datepicker-div')
    if (!target) {
      return
    }
    var currentRow = $(target).closest('tr')
    if (!currentRow) {
      return
    }
    var previousRow = $(currentRow).prev()

    if (!previousRow || previousRow.length === 0) {
      // there is not previous row, so we go to previous month...
      previousMonth()
    } else {
      var prevRowDates = $('td a.ui-state-default', previousRow)
      var prevRowDate = prevRowDates[prevRowDates.length - 1]

      if (prevRowDate) {
        setTimeout(function () {
          setHighlightState(prevRowDate, container)
          prevRowDate.focus()
        }, 0)
      }
    }
  }

  function previousMonth () {
    var prevLink = $('.ui-datepicker-prev')[0]
    var container = document.getElementById('ui-datepicker-div')
    prevLink.click()
    // focus last day of new month
    setTimeout(function () {
      var trs = $('tr', container)
      var lastRowTdLinks = $('td a.ui-state-default', trs[trs.length - 1])
      var lastDate = lastRowTdLinks[lastRowTdLinks.length - 1]

      // updating the cached header elements
      updateHeaderElements()

      setHighlightState(lastDate, container)
      lastDate.focus()
    }, 0)
  }

  /**
   * Handles right arrow key navigation
   * @param  {HTMLElement} dateLink The target of the keyboard event
   */
  function nextDay (dateLink) {
    var container = document.getElementById('ui-datepicker-div')
    if (!dateLink) {
      return
    }
    var td = $(dateLink).closest('td')
    if (!td) {
      return
    }
    var nextTd = $(td).next()
    var nextDateLink = $('a.ui-state-default', nextTd)[0]

    if (nextTd && nextDateLink) {
      setHighlightState(nextDateLink, container)
      nextDateLink.focus()
    } else {
      handleNext(dateLink)
    }
  }

  function handleNext (target) {
    var container = document.getElementById('ui-datepicker-div')
    if (!target) {
      return
    }
    var currentRow = $(target).closest('tr')
    var nextRow = $(currentRow).next()

    if (!nextRow || nextRow.length === 0) {
      nextMonth()
    } else {
      var nextRowFirstDate = $('a.ui-state-default', nextRow)[0]
      if (nextRowFirstDate) {
        setHighlightState(nextRowFirstDate, container)
        nextRowFirstDate.focus()
      }
    }
  }

  function nextMonth () {
    var nextMon = $('.ui-datepicker-next')[0]
    var container = document.getElementById('ui-datepicker-div')
    nextMon.click()
    // focus the first day of the new month
    setTimeout(function () {
      // updating the cached header elements
      updateHeaderElements()

      var firstDate = $('a.ui-state-default', container)[0]
      setHighlightState(firstDate, container)
      firstDate.focus()
    }, 0)
  }

  // ///////// UP ///////////
  /**
   * Handle the up arrow navigation through dates
   * @param  {HTMLElement} target   The target of the keyboard event (day)
   * @param  {HTMLElement} cont     The calendar container
   * @param  {HTMLElement} prevLink Link to navigate to previous month
   */
  function upHandler (target, cont, prevLink) {
    prevLink = $('.ui-datepicker-prev')[0]
    var rowContext = $(target).closest('tr')
    if (!rowContext) {
      return
    }
    var rowTds = $('td', rowContext)
    var rowLinks = $('a.ui-state-default', rowContext)
    var targetIndex = $.inArray(target, rowLinks)
    var prevRow = $(rowContext).prev()
    var prevRowTds = $('td', prevRow)
    var parallel = prevRowTds[targetIndex]
    var linkCheck = $('a.ui-state-default', parallel)[0]

    if (prevRow && parallel && linkCheck) {
      // there is a previous row, a td at the same index
      // of the target AND theres a link in that td
      setHighlightState(linkCheck, cont)
      linkCheck.focus()
    } else {
      // we're either on the first row of a month, or we're on the
      // second and there is not a date link directly above the target
      prevLink.click()
      setTimeout(function () {
        // updating the cached header elements
        updateHeaderElements()
        var newRows = $('tr', cont)
        var lastRow = newRows[newRows.length - 1]
        var lastRowTds = $('td', lastRow)
        var tdParallelIndex = $.inArray(target.parentNode, rowTds)
        var newParallel = lastRowTds[tdParallelIndex]
        var newCheck = $('a.ui-state-default', newParallel)[0]

        if (lastRow && newParallel && newCheck) {
          setHighlightState(newCheck, cont)
          newCheck.focus()
        } else {
          // theres no date link on the last week (row) of the new month
          // meaning its an empty cell, so we'll try the 2nd to last week
          var secondLastRow = newRows[newRows.length - 2]
          var secondTds = $('td', secondLastRow)
          var targetTd = secondTds[tdParallelIndex]
          var linkCheck = $('a.ui-state-default', targetTd)[0]

          if (linkCheck) {
            setHighlightState(linkCheck, cont)
            linkCheck.focus()
          }
        }
      }, 0)
    }
  }

  // ////////////// DOWN ////////////////
  /**
   * Handles down arrow navigation through dates in calendar
   * @param  {HTMLElement} target   The target of the keyboard event (day)
   * @param  {HTMLElement} cont     The calendar container
   * @param  {HTMLElement} nextLink Link to navigate to next month
   */
  function downHandler (target, cont, nextLink) {
    nextLink = $('.ui-datepicker-next')[0]
    var targetRow = $(target).closest('tr')
    if (!targetRow) {
      return
    }
    var targetCells = $('td', targetRow)
    var cellIndex = $.inArray(target.parentNode, targetCells)
    var nextRow = $(targetRow).next()
    var nextRowCells = $('td', nextRow)
    var nextWeekTd = nextRowCells[cellIndex]
    var nextWeekCheck = $('a.ui-state-default', nextWeekTd)[0]

    if (nextRow && nextWeekTd && nextWeekCheck) {
      // theres a next row, a TD at the same index of `target`,
      // and theres an anchor within that td
      setHighlightState(nextWeekCheck, cont)
      nextWeekCheck.focus()
    } else {
      nextLink.click()

      setTimeout(function () {
        // updating the cached header elements
        updateHeaderElements()

        var nextMonthTrs = $('tbody tr', cont)
        var firstTds = $('td', nextMonthTrs[0])
        var firstParallel = firstTds[cellIndex]
        var firstCheck = $('a.ui-state-default', firstParallel)[0]

        if (firstParallel && firstCheck) {
          setHighlightState(firstCheck, cont)
          firstCheck.focus()
        } else {
          // lets try the second row b/c we didnt find a
          // date link in the first row at the target's index
          var secondRow = nextMonthTrs[1]
          var secondTds = $('td', secondRow)
          var secondRowTd = secondTds[cellIndex]
          var secondCheck = $('a.ui-state-default', secondRowTd)[0]

          if (secondRow && secondCheck) {
            setHighlightState(secondCheck, cont)
            secondCheck.focus()
          }
        }
      }, 0)
    }
  }

  // add an aria-label to the date link indicating the currently focused date
  // (formatted identically to the required format: mm/dd/yyyy)
  function monthDayYearText () {
    var cleanUps = $('.amaze-date')

    $(cleanUps).each(function (clean) {
      // each(cleanUps, function (clean) {
      clean.parentNode.removeChild(clean)
    })

    var datePickDiv = document.getElementById('ui-datepicker-div')
    // in case we find no datepick div
    if (!datePickDiv) {
      return
    }

    var dates = $('a.ui-state-default', datePickDiv)

    $(dates).each(function (index, date) {
      var currentRow = $(date).closest('tr')
      var currentTds = $('td', currentRow)
      var currentIndex = $.inArray(date.parentNode, currentTds)
      var headThs = $('thead tr th', datePickDiv)
      var dayIndex = headThs[currentIndex]
      var daySpan = $('span', dayIndex)[0]
      var monthName = $('.ui-datepicker-month', datePickDiv)[0].innerHTML
      var year = $('.ui-datepicker-year', datePickDiv)[0].innerHTML
      var number = date.innerHTML

      if (!daySpan || !monthName || !number || !year) {
        return
      }

      // AT Reads: {month} {date} {year} {day}
      // "December 18 2014 Thursday"
      var dateText = monthName + ' ' + date.innerHTML + ' ' + year + ' ' + daySpan.title
      // AT Reads: {date(number)} {name of day} {name of month} {year(number)}
      // var dateText = date.innerHTML + ' ' + daySpan.title + ' ' + monthName + ' ' + year
      // add an aria-label to the date link reading out the currently focused date
      date.setAttribute('aria-label', dateText)
    })
  }

  // update the cached header elements because we're in a new month or year
  function updateHeaderElements () {
    var context = document.getElementById('ui-datepicker-div')
    if (!context) {
      return
    }

    $(context).find('table').first().attr('role', 'grid')

    var prev = $('.ui-datepicker-prev', context)[0]
    var next = $('.ui-datepicker-next', context)[0]

    // make them click/focus - able
    next.href = 'javascript:void(0)'
    prev.href = 'javascript:void(0)'

    next.setAttribute('role', 'button')
    prev.setAttribute('role', 'button')
    appendOffscreenMonthText(next)
    appendOffscreenMonthText(prev)

    $(next).on('click', handleNextClicks)
    $(prev).on('click', handlePrevClicks)

    // add month day year text
    monthDayYearText()
  }

  function prepHighlightState () {
    var highlight
    var cage = document.getElementById('ui-datepicker-div')
    highlight = $('.ui-state-highlight', cage)[0] ||
    $('.ui-state-default', cage)[0]
    if (highlight && cage) {
      setHighlightState(highlight, cage)
    }
  }

  // Set the highlighted class to date elements, when focus is recieved
  function setHighlightState (newHighlight, container) {
    var prevHighlight = getCurrentDate(container)
    // remove the highlight state from previously
    // highlighted date and add it to our newly active date
    $(prevHighlight).removeClass('ui-state-highlight')
    $(newHighlight).addClass('ui-state-highlight')
  }

  // grabs the current date based on the hightlight class
  function getCurrentDate (container) {
    var currentDate = $('.ui-state-highlight', container)[0]
    return currentDate
  }

  /**
   * Appends logical next/prev month text to the buttons
   * - ex: Next Month, January 2015
   *       Previous Month, November 2014
   */
  function appendOffscreenMonthText (button) {
    var buttonText
    var isNext = $(button).hasClass('ui-datepicker-next')
    var months = [
      'january', 'february',
      'march', 'april',
      'may', 'june', 'july',
      'august', 'september',
      'october',
      'november', 'december'
    ]

    var currentMonth = $('.ui-datepicker-title .ui-datepicker-month').text().toLowerCase()
    var monthIndex = $.inArray(currentMonth.toLowerCase(), months)
    var currentYear = $('.ui-datepicker-title .ui-datepicker-year').text().toLowerCase()
    var adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1

    if (isNext && currentMonth === 'december') {
      currentYear = parseInt(currentYear, 10) + 1
      adjacentIndex = 0
    } else if (!isNext && currentMonth === 'january') {
      currentYear = parseInt(currentYear, 10) - 1
      adjacentIndex = months.length - 1
    }

    buttonText = (isNext)
      ? 'Next Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear
      : 'Previous Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear

    $(button).find('.ui-icon').html(buttonText)
  }

  // Returns the string with the first letter capitalized
  function firstToCap (s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  function onSelect (dateText) {
    var parts = dateText.split('/')
    $day.val(parts[0])
    $month.val(parts[1])
    $year.val(parts[2])
    $('.ui-datepicker-trigger').focus()
  }
}
