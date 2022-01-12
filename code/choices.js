const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'expand',
      name: 'reptile',
      message: 'Which is better?',
      choices: [
        {
          key: 'a',
          value: 'alligator',
        },
        {
          key: 'c',
          value: 'crocodile',
        },
      ],
    },
  ])
  .then(answers => {
    console.info('Answer:', answers.reptile);
  });
