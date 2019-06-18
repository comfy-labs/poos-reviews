const { prisma } = require('../src/generated/prisma-client');

async function main() {
  // const user = await prisma.createUser({
  //   name: 'Poo',
  //   email: 'poo@butt.com',
  //   password: 'c0e81794384491161f1777c232bc6bd9ec38f616560b120fda8e90f383853542' // '12345'
  // });

  const shithole_ = await prisma.createShithole({
    name: 'Taqueria Guadalajara',
    address: '3146 24th St San Francisco, CA 94110',
    lat: 37.752558,
    lng: -122.415047
  });

  const shithole =  await prisma.createShithole({
    name: 'La Vecindad Neighborhood TACOS',
    address: '3827 Fifth Ave, San Diego, CA 92103',
    lat: 32.747538,
    lng: -117.160266
  });

  // await prisma.createTurdbit({
  //   accessibility: 1,
  //   cleanliness: 1,
  //   stalls: 1,
  //   privacy: 1,
  //   text: 'DO NOT! GO IN THERE! WOOOOOOOO!',
  //   tpQuality: 1,
  //   overall: 1,
  //   author: {
  //     connect: {
  //       id: user.id
  //     }
  //   },
  //   shithole: {
  //     connect: {
  //       id: shithole.id
  //     }
  //   }
  // });
}
main().catch(e =>console.error(e));