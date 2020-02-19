
const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Hobbies", deps: []
 * createTable "HobbyPosts", deps: []
 * createTable "Users", deps: []
 *
 * */

const info = {
  revision: 1,
  name: 'update-hobby',
  created: '2020-03-08T10:32:56.179Z',
  comment: ''
};

const migrationCommands = [{
  fn: 'createTable',
  params: [
    'Hobbies',
    {

    },
    {}
  ]
},
{
  fn: 'createTable',
  params: [
    'HobbyPosts',
    {

    },
    {}
  ]
},
{
  fn: 'createTable',
  params: [
    'Users',
    {

    },
    {}
  ]
}
];

module.exports = {
  pos: 0,
  up(queryInterface, Sequelize) {
    let index = this.pos;
    return new Promise(((resolve, reject) => {
      function next() {
        if (index < migrationCommands.length) {
          const command = migrationCommands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
        } else resolve();
      }
      next();
    }));
  },
  info
};
