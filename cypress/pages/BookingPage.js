class BookingPage {
    /* Locators */
    getOneWayBtn() {
        return cy.get('.mr-1[value="One way"]')
    }
    
    getRoundTripBtn() {
        return cy.get('.mr-1[value="Round trip"]')
    }
    
    getRadioLabels() {
        return cy.get('.radio')
    }
    
    getFormLabels() {
        return cy.get('.label')
    }

    getCabinClassDrpDwn() {
        return cy.get('form > div > div:nth-child(2) select')
    }

    getFromDrpDwn() {
        return cy.get('form > div > div:nth-child(3) select')
    }

    getToDrpDwn() {
        return cy.get('form > div > div:nth-child(4) select')
    }
    
    getDepartInput() {
        return cy.get('form > div > div:nth-child(5) input')
    }
    
    getReturnInput() {
        return cy.get('form > div > div:nth-child(6) input')
    }

    getNumOfPassengersDrpDwn() {
        return cy.get('form > div > div:nth-child(7) select')
    }

    getPassenger1DrpDwn() {
        return cy.get('form > div > div:nth-child(8) select')
    }

    getPassenger2DrpDwn() {
        return cy.get('form > div > div:nth-child(9) select')
    }

    getBookBtn() {
        return cy.get('.Button_c_button__TmkRS')
    }

    /* Calendar Locators */
    getDay() {
        return cy.get('div .react-datepicker__day')
    }

    getMonth() {
        return cy.get('div .react-datepicker__current-month')
    }

    getNextBtn() {
        return cy.get('div .react-datepicker__navigation.react-datepicker__navigation--next')
    }

    /* Calendar Itinerary Info Locators */
    getItineraryHeadings() {
        return cy.get('.is-underlined')
    }

    getItineraryDestinations() {
        return cy.get('.is-italic')
    }

    getItineraryDates() {
        return cy.get('.field p')
    }

    /* Methods */
    clickBookBtn() {
        this.getBookBtn().click()
    }
}

export default BookingPage;