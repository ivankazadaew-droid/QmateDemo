import { faker } from '@faker-js/faker';

class TestDataGenerator {
  static generateCardDetails(): {
    cardHolderName: string;
    cardNumber: string;
    securityCode: string;
    expirationDate: string;
  } {
    const firstName: string = faker.person.firstName();
    const lastName: string = faker.person.lastName();
    const futureDate = faker.date.future({ years: 5 });
    const futureMonth = (futureDate.getMonth() + 1).toString().padStart(2, '0');
    const futureYear = futureDate.getFullYear();

    return {
      cardHolderName: `${firstName} ${lastName}`,
      cardNumber: faker.finance.creditCardNumber().replace(/\D/g, '').substring(0, 16),
      securityCode: faker.finance.creditCardCVV(),
      expirationDate: `${futureMonth}/${futureYear}`,
    };
  }

  static generateAddressDetails(): {
    address: string;
    city: string;
    zipCode: string;
    country: string;
  } {
    const streetName = faker.location.street();
    const houseNumber = faker.string.numeric(1);

    return {
      address: `${streetName.split(' ')[0]} ${houseNumber}`,
      city: faker.location.city(),
      zipCode: faker.location.zipCode('#####'),
      country: faker.location.country(),
    };
  }
}

export default TestDataGenerator;
