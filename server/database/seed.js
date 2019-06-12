const { prisma } = require('./prisma-client');

async function main() {
  await prisma.createPooser({
    name: 'Poo',
    email: 'poo@butt.com',
    password: 'c0e81794384491161f1777c232bc6bd9ec38f616560b120fda8e90f383853542' // '12345'
  });

  let pooser = prisma.pooser({where: {email: 'poo@butt.com'}});

  await prisma.createShithole({
    name: 'Taqueria Guadalajara',
    address: '3146 24th St San Francisco, CA 94110',
    lat: 37.752558,
    lng: -122.415047
  });

  await prisma.createShithole({
    name: 'La Vecindad Neighborhood TACOS',
    address: '3827 Fifth Ave, San Diego, CA 92103',
    lat: 32.747538,
    lng: -117.160266
  });

  let shithole = prisma.shithole({where: {name: 'Taqueria Guadalajara'}});

  await prisma.createTurdbit({
    accessibility: 0,
    cleanliness: 0,
    stalls: 1,
    privacy: 0,
    text: 'DO NOT! GO IN THERE! WOOOOOOOO!',
    tpQuality: 0,
    overall: 0,
    author: pooser,
    shithole: shithole
  });
}
main().catch(e =>console.error(e));