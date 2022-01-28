const fetch = require('node-fetch');

const users = [
  'Sam',
  'Peter',
  'Bob',
  'Ivan',
  'Pavlo',
  'John',
  'Samanta',
  'Iryna',
  'Polina',
  'Karolina',
];

(async () => {
  await (async () => {
    for (let user of users) {
      try {
        const userLowerCase = user.toLocaleLowerCase();

        const postedUser = await (
          await fetch('http://localhost:3000/api/users/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user,
              email: `${userLowerCase}@${userLowerCase}.${userLowerCase}`,
              password: userLowerCase + userLowerCase,
            }),
          })
        ).json();
        console.log('postedUser', postedUser);
      } catch (error) {
        console.log('ERRRRRRRRRR', error.message);
      }
    }
  })();
})();
