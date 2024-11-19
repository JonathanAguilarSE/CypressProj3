/// <reference types="cypress"/>

import BookingPage from "../pages/BookingPage"

describe('Validating a booking platform', function() {
  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/project-3')
  })

  const bookingPage = new BookingPage

  it('Validating default book trip form', function() {
    bookingPage.getTripTypeRadioButtonByLabel('One way').should('be.visible').and('be.enabled').and('be.checked')
    bookingPage.getTripTypeRadioButtonByLabel('Round trip').should('be.visible').and('be.enabled').and('not.be.checked')
    bookingPage.getAllLabels().each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    bookingPage.getAllDropdowns().each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    bookingPage.getAllDatePickers().each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    bookingPage.getAllDatePickers().last().should('be.disabled')
    bookingPage.getDropdownByLabel('Number of passengers').should('have.value', '1')
    bookingPage.getDropdownByLabel('Passenger 1').should('have.value', 'Adult (16-64)')
    bookingPage.getBookButton().should('be.visible').and('be.enabled')
  })

  it('Validate book trip from when Round Trip is sleceted', () => {
    bookingPage.getTripTypeRadioButtonByLabel('Round trip').check().should('be.visible').and('be.checked')
    bookingPage.getTripTypeRadioButtonByLabel('One way').should('be.visible').and('not.be.checked')
    bookingPage.getAllLabels().each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    bookingPage.getAllDropdowns().each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    bookingPage.getAllDatePickers().each(($el) => {
      cy.wrap($el).should('be.visible')
    })
    bookingPage.getDropdownByLabel('Number of passengers').should('have.value', '1')
    bookingPage.getDropdownByLabel('Passenger 1').should('have.value', 'Adult (16-64)')
    bookingPage.getBookButton().should('be.visible').and('be.enabled')
  })

  it('Validate book trip when Round Trip is sleected', () => {
    bookingPage.selectTripType('One way')

    const dropdownOptions = {
      cabinClass: 'Business',
      from: 'Illinois',
      to: 'Florida',
      numberOfPassengers: '1',
      passengerOne: 'Senior (65+)'
    }
    bookingPage.fillDropdowns(dropdownOptions)

    const futureDateStr = bookingPage.getFutureDateByDays(7)
    bookingPage.getDatePickerByLabel('Depart').clear().type(`${futureDateStr} {enter}`)

    bookingPage.clickBookButton()

    
    const futureDateBookingFormat = bookingPage.getFormattedDateForBooking(futureDateStr)
    const departureAbbreviation = bookingPage.getAbbreviationsForState(dropdownOptions.from)
    const destinationAbbreviation = bookingPage.getAbbreviationsForState(dropdownOptions.to)
    
    const info = [ 'DEPART', `${departureAbbreviation} to ${destinationAbbreviation}`, futureDateBookingFormat ]
    
    bookingPage.getTravelInfoDepart().each(($el, index) => {
      cy.wrap($el).should('have.text', info[index])
    })

    const expectedTexts = bookingPage.formatDropdownOptionsToBookingText(dropdownOptions)

    bookingPage.getPassengerInfo().each(($el, index) => {
      cy.wrap($el).should('have.text', expectedTexts[index])
    })
  })

  it('Validating booking form with round trip with one passenger', () => {
    bookingPage.selectTripType('Round trip')
    
    const dropdownOptions = {
      cabinClass: 'First',
      from: 'California',
      to: 'Illinois',
      numberOfPassengers: '1',
      passengerOne: 'Adult (16-64)'
    }
    bookingPage.fillDropdowns(dropdownOptions)

    const departDate = bookingPage.getFutureDateByDays(7)
    const returnDate = bookingPage.getFutureDateByDays(30)

    bookingPage.getDatePickerByLabel('Depart').clear().type(`${departDate} {enter}`)
    bookingPage.getDatePickerByLabel('Return').clear().type(`${returnDate} {enter}`)

    bookingPage.clickBookButton()

    const departureAbbreviation = bookingPage.getAbbreviationsForState(dropdownOptions.from)
    const destinationAbbreviation = bookingPage.getAbbreviationsForState(dropdownOptions.to)

    const departBookingFormat = bookingPage.getFormattedDateForBooking(departDate)
    const returnBookingFormat = bookingPage.getFormattedDateForBooking(returnDate)

    const departInfo = [ 'DEPART', `${departureAbbreviation} to ${destinationAbbreviation}`, departBookingFormat ]
    bookingPage.getTravelInfoDepart().each(($el, index) => {
      cy.wrap($el).should('have.text', departInfo[index])
    })

    const returnInfo = [ 'RETURN', `${destinationAbbreviation} to ${departureAbbreviation}`, returnBookingFormat ]
    bookingPage.getTravelInfoReturn().each(($el, index) => {
      cy.wrap($el).should('have.text', returnInfo[index])
    })

    const expectedTexts = bookingPage.formatDropdownOptionsToBookingText(dropdownOptions)

    bookingPage.getPassengerInfo().each(($el, index) => {
      cy.wrap($el).should('have.text', expectedTexts[index])
    })
  })

  it('Validating boking for 2 passengers with One Way trip', () => {
    bookingPage.selectTripType('One way')
    
    const dropdownOptions = {
      cabinClass: 'First',
      from: 'New York',
      to: 'Texas',
      numberOfPassengers: '2',
      passengerOne: 'Adult (16-64)',
      passengerTwo: 'Child (2-11)'
    }

    bookingPage.fillDropdowns(dropdownOptions)

    const departDate = bookingPage.getFutureDateByDays(1)
    bookingPage.getDatePickerByLabel('Depart').clear().type(`${departDate} {enter}`)

    bookingPage.clickBookButton()

    const departureAbbreviation = bookingPage.getAbbreviationsForState(dropdownOptions.from)
    const destinationAbbreviation = bookingPage.getAbbreviationsForState(dropdownOptions.to)

    const departBookingFormat = bookingPage.getFormattedDateForBooking(departDate)

    const departInfo = [ 'DEPART', `${departureAbbreviation} to ${destinationAbbreviation}`, departBookingFormat ]
    bookingPage.getTravelInfoDepart().each(($el, index) => {
      cy.wrap($el).should('have.text', departInfo[index])
    })
    
    const expectedTexts = bookingPage.formatDropdownOptionsToBookingText(dropdownOptions)

    bookingPage.getPassengerInfo().each(($el, index) => {
      cy.wrap($el).should('have.text', expectedTexts[index])
    })

  })


})