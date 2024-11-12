import BookingPage from "../pages/BookingPage";

const bookingPage = new BookingPage();

function setDapartDate(daysFromToday) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromToday);

  const targetWeekday = targetDate.toLocaleDateString('default', { weekday: 'short' });
  const targetDay = targetDate.getDate();
  const targetMonth = targetDate.toLocaleString('default', { month: 'short' });
  const targetYear = targetDate.getFullYear();

  bookingPage.getDepartInput().click();

  const convertMonthToShort = (longMonth) => {
    const date = new Date(`${longMonth} 1, 2000`); // Using a fixed year
    return date.toLocaleDateString('default', { month: 'short' });
  };

  function selectMonthAndYear() {
    bookingPage.getMonth().invoke('text').then((currentMonthYearText) => {
      const [currentMonth, currentYear] = currentMonthYearText.split(' ');
      const shortCurrentMonth = convertMonthToShort(currentMonth);

      if (shortCurrentMonth !== targetMonth || parseInt(currentYear, 10) !== targetYear) {
        bookingPage.getNextBtn().click();
        cy.wait(200) 
        selectMonthAndYear(); 
      } else {
        bookingPage.getDay().not('div.react-datepicker__day--disabled').contains(targetDay).click();
      }
    });
  }
  selectMonthAndYear();

  // bookingPage.getDepartInput().invoke('val').should('equal', dateToAssert);
  bookingPage.getDepartInput().invoke('val');
  return departDateToAssert = `${targetWeekday} ${targetMonth} ${targetDay} ${targetYear}`;
}
let departDateToAssert;

function setReturnDate(daysFromToday) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromToday);

  const targetWeekday = targetDate.toLocaleDateString('default', { weekday: 'short' });
  const targetDay = targetDate.getDate();
  const targetMonth = targetDate.toLocaleString('default', { month: 'short' });
  const targetYear = targetDate.getFullYear();

  bookingPage.getReturnInput().click();

  const convertMonthToShort = (longMonth) => {
    const date = new Date(`${longMonth} 1, 2000`); // Using a fixed year
    return date.toLocaleDateString('default', { month: 'short' });
  };

  function selectMonthAndYear() {
    bookingPage.getMonth().invoke('text').then((currentMonthYearText) => {
      const [currentMonth, currentYear] = currentMonthYearText.split(' ');
      const shortCurrentMonth = convertMonthToShort(currentMonth);

      if (shortCurrentMonth !== targetMonth || parseInt(currentYear, 10) !== targetYear) {
        bookingPage.getNextBtn().click();
        cy.wait(200) 
        selectMonthAndYear(); 
      } else {
        bookingPage.getDay().not('div.react-datepicker__day--disabled').contains(targetDay).click();
      }
    });
  }
  selectMonthAndYear();

  // bookingPage.getDepartInput().invoke('val').should('equal', dateToAssert);
  bookingPage.getReturnInput().invoke('val');
  return returnDateToAssert = `${targetWeekday} ${targetMonth} ${targetDay} ${targetYear}`;
}
let returnDateToAssert;

describe('Validating a booking platform', function() {
  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/project-3')

    cy.fixture('example').then(function(data) {
      this.radioLabels = data.radioLabels
      this.labels = data.labels
      this.confirmMsgLabels = data.confirmMsgLabels
      this.passengerType = data.passengerType
      this.classType = data.classType
    })
  })


  it('Validating default book trip form', function() {
    bookingPage.getOneWayBtn().should('be.visible').and('be.enabled').and('be.checked')
    bookingPage.getRoundTripBtn().should('be.visible').and('be.enabled').and('not.be.checked')
    bookingPage.getFormLabels().each(($el, index) => {
      cy.wrap($el).should('be.visible').and('have.text', this.labels[index])
    })
    bookingPage.getCabinClassDrpDwn().should('be.visible')
    bookingPage.getFromDrpDwn().should('be.visible')
    bookingPage.getToDrpDwn().should('be.visible')
    bookingPage.getDepartInput().should('be.visible')
    bookingPage.getReturnInput().should('be.visible').and('not.be.enabled')
    bookingPage.getNumOfPassengersDrpDwn().should('be.visible').children().eq(0).should('have.text', '1')
    bookingPage.getPassenger1DrpDwn().should('be.visible').children().eq(0).should('have.text', this.passengerType[0])
    bookingPage.getBookBtn().should('be.visible').and('be.enabled')
  })

  it('Validating book trip form when round trip is selected', function() {
    bookingPage.getRoundTripBtn().click().should('be.checked')
    bookingPage.getOneWayBtn().should('not.be.checked')
    bookingPage.getFormLabels().each(($el, index) => {
      cy.wrap($el).should('be.visible').and('have.text', this.labels[index])
    })
    bookingPage.getCabinClassDrpDwn().should('be.visible')
    bookingPage.getFromDrpDwn().should('be.visible')
    bookingPage.getToDrpDwn().should('be.visible')
    bookingPage.getDepartInput().should('be.visible')
    bookingPage.getReturnInput().should('be.visible').and('be.enabled')
    bookingPage.getNumOfPassengersDrpDwn().should('be.visible').children().eq(0).should('have.text', '1')
    bookingPage.getPassenger1DrpDwn().should('be.visible').children().eq(0).should('have.text', this.passengerType[0])
    bookingPage.getBookBtn().should('be.visible').and('be.enabled')
  })

  it('Validate booking for 1 passenger and one way', function() {   
    bookingPage.getOneWayBtn().click().should('be.checked')
    bookingPage.getCabinClassDrpDwn().select(this.classType[1])
    bookingPage.getFromDrpDwn().select('Illinois')
    bookingPage.getToDrpDwn().select('Florida')
    setDapartDate(7)
    bookingPage.getNumOfPassengersDrpDwn().select('1')
    bookingPage.getPassenger1DrpDwn().select(this.passengerType[1])
    bookingPage.clickBookBtn()

    cy.get('.is-underlined').should('have.text', this.confirmMsgLabels[0])
    cy.get('.is-italic').should('have.text', 'IL to FL')
    cy.get('.field p').should('have.text', departDateToAssert)
    cy.get('.mt-4 p').eq(0).should('have.text', 'Number of Passengers: 1')
    cy.get('.mt-4 p').eq(1).should('have.text', `Passenger 1: ${this.passengerType[1]}`)
    cy.get('.mt-4 p').eq(2).should('have.text', `Cabin class: ${this.classType[1]}`)
  })

  it('Validating booking for 1 passenger and round trip', function() {
    bookingPage.getRoundTripBtn().click().should('be.checked')
    bookingPage.getCabinClassDrpDwn().select(this.classType[2])
    bookingPage.getFromDrpDwn().select('California')
    bookingPage.getToDrpDwn().select('Illinois')
    setDapartDate(7)
    setReturnDate(30)
    bookingPage.getNumOfPassengersDrpDwn().select('1')
    bookingPage.getPassenger1DrpDwn().select('Adult (16-64)')
    bookingPage.clickBookBtn()

    const dest = [ 'CA to IL', 'IL to CA']
    const dates = [ departDateToAssert, returnDateToAssert ]
    bookingPage.getItineraryHeadings().each(($el, index) => {
      cy.wrap($el).should('be.visible').and('have.text', this.confirmMsgLabels[index])
    })
    bookingPage.getItineraryDestinations().each(($el, index) => {
      cy.wrap($el).should('be.visible').and('have.text', dest[index])
    })
    bookingPage.getItineraryDates().each(($el, index) => {
      cy.wrap($el).should('be.visible').and('have.text', dates[index])
    })
    cy.get('.mt-4 p').eq(0).should('have.text', 'Number of Passengers: 1')
    cy.get('.mt-4 p').eq(1).should('have.text', `Passenger 1: ${this.passengerType[0]}`)
    cy.get('.mt-4 p').eq(2).should('have.text', `Cabin class: ${this.classType[2]}`)
  })

  it('Validate the booking for 2 passengers and one way', function() {
    bookingPage.getOneWayBtn().click().should('be.checked')
    bookingPage.getCabinClassDrpDwn().select(this.classType[0])
    bookingPage.getFromDrpDwn().select('New York')
    bookingPage.getToDrpDwn().select('Texas')
    setDapartDate(1)
    bookingPage.getNumOfPassengersDrpDwn().select('2')
    bookingPage.getPassenger1DrpDwn().select(this.passengerType[0])
    bookingPage.getPassenger2DrpDwn().select(this.passengerType[3])
    bookingPage.clickBookBtn()

    const dates = [ departDateToAssert, returnDateToAssert ]
    bookingPage.getItineraryHeadings().each(($el, index) => {
      cy.wrap($el).should('be.visible').and('have.text', this.confirmMsgLabels[index])
    })
    bookingPage.getItineraryDestinations().should('be.visible').and('have.text', 'NY to TX')
    bookingPage.getItineraryDates().should('have.text', departDateToAssert)
    cy.get('.mt-4 p').eq(0).should('have.text', 'Number of Passengers: 2')
    cy.get('.mt-4 p').eq(1).should('have.text', `Passenger 1: ${this.passengerType[0]}`)
    cy.get('.mt-4 p').eq(2).should('have.text', `Passenger 2: ${this.passengerType[3]}`)
    cy.get('.mt-4 p').eq(3).should('have.text', `Cabin class: ${this.classType[0]}`)
  })

})