class BookingPage {
    /* Locators */
    getAllLabels() {
        return cy.get('.field > label')
    }

    getTripTypeRadioButtonByLabel(label) {
        return cy.contains('.radio', label).find('input')
    }

    getAllDropdowns() {
        return cy.get('.select > select')
    }

    getDropdownByLabel(label) {
        return cy.contains(label).parent().find('select')
    }

    getAllDatePickers() {
        return cy.get('[class*="react"] > div > input')
    }

    getDatePickerByLabel(label) {
        return cy.contains(label).parent().find('input')
    }

    getBookButton() {
        return cy.get('[type*="submit"]')
    }

    getTravelInfoDepart() {
        return cy.get('.ml-3 > div > div').first().children()
    }

    getTravelInfoReturn() {
        return cy.get('.ml-3 .ml').children()
    }

    getPassengerInfo() {
        return cy.get('.mt-4 > p')
    }
    
    /* Methods */
    selectTripType(type) {
        this.getTripTypeRadioButtonByLabel(type).check()
    }

    fillDropdowns(dropdownOptions) {
        Object.values(dropdownOptions).forEach((option, index) => {
            this.getAllDropdowns().eq(index).select(option)
        })
    }

    getFutureDateByDays(days) {
        const futureDate = new Date()

        futureDate.setDate(futureDate.getDate() + days)

        return `${futureDate.getMonth()  + 1}/${futureDate.getDate()}/${futureDate.getFullYear()}`
    }

    getFormattedDateForBooking(dateStr) {
        const date = new Date(dateStr)
        const dayName = date.toLocaleString('en-US', { weekday: 'short' })
        const monthName = date.toLocaleString('en-US', { month: 'short' })
        const day = date.toLocaleString('en-US', { day: '2-digit' })

        return `${dayName} ${monthName} ${day} ${date.getFullYear()}`
    } 

    clickBookButton() {
        this.getBookButton().click()
    }

    formatDropdownOptionsToBookingText(options) {
        const result = [
            `Number of Passengers: ${options.numberOfPassengers}`,
            `Passenger 1: ${options.passengerOne}`,
            `Cabin class: ${options.cabinClass}`
        ]

        if (options.passengerTwo){
            result.splice(2, 0, `Passenger 2: ${options.passengerTwo}`)
        }
        return result
    }

    stateAbbreviations = {
        Illinois: 'IL',
        Florida: 'FL',
        California: 'CA',
        'New York': 'NY',
        Texas: 'TX'
    }

    getAbbreviationsForState(state) {
        return this.stateAbbreviations[state]
    }
}

export default BookingPage;