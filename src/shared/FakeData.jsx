import { faker } from '@faker-js/faker';

const fuelTranslations = {
  Gasoline: 'Benzin',
  Diesel: 'Dizel',
  Electric: 'Električni',
  Hybrid: 'Hibrid',
  LPG: 'Plin',
  CNG: 'Plin',
  Ethanol: 'Etanol',
  Hydrogen: 'Vodik',
};

const euroBrands = [
  'Volkswagen', 'Peugeot', 'Renault', 'Audi', 'Škoda',
  'Opel', 'Seat', 'Citroën', 'BMW', 'Mercedes-Benz'
];

function createRandomCar() {
  const fuel = faker.vehicle.fuel();
  return {
    id: faker.string.uuid(),
    name: faker.vehicle.vehicle(),
    brand: faker.helpers.arrayElement(euroBrands),
    model: faker.vehicle.model(),
    fuelType: fuelTranslations[fuel] || fuel, 
    type: faker.vehicle.type(),
    image: `https://source.unsplash.com/400x250/?car,europe`,
    miles: faker.number.int({ min: 20000, max: 150000 }),
    gearType: faker.helpers.arrayElement(['Automatski', 'Ručni']),
    price: faker.number.int({ min: 4000, max: 20000 }),
  };
}

const carList = faker.helpers.multiple(createRandomCar, {
  count: 8,
});

export default {
  carList,
};
