import { faker } from '@faker-js/faker';

class TestDataGenerator {

    generateCardDetails() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const futureMonth = faker.date.future({ years: 5 }).getMonth() + 1;
        const futureYear = faker.date.future({ years: 5 }).getFullYear();
        return {
            cardHolderName: `${firstName} ${lastName}`,
            cardNumber: faker.finance.creditCardNumber().replace(/\D/g, '').substring(0, 16),
            securityCode: faker.finance.creditCardCVV(),
            expirationDate: `${futureMonth.toString().padStart(2, '0')}/${futureYear}`,
        }
    }

    generateAddressDetails() {
        const streetName = faker.location.street();
        const houseNumber = faker.string.numeric(1);  
        return {
            address: `${streetName.split(' ')[0]} ${houseNumber}`,
            city: faker.location.city(),
            zipCode: faker.location.zipCode('#####'),
            country: faker.location.country(),
        }
    }
}

export default new TestDataGenerator();