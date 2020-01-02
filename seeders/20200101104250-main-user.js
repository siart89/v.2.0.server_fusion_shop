
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      id: '02e2f3af-2aeb-42da-977e-f05a03073931',
      name: 'Artem',
      mail: 'artem@mail.ru',
      password: '$2a$08$JVodl5ih9ji24rJjto0wH.WEHCz8vtkXNm1oRENPLNDyzZAMsdn.q',
      avatar: null,
      phone: '+79854568521',
      createdAt: '2020-01-01 13:51:47.53+03',
      updatedAt: '2020-01-01 13:51:47.53+03',
    }, {
      id: '53edf9ea-14cc-429e-899d-8f1a6ff38476',
      name: 'Lisa',
      mail: 'lisa@mail.ru',
      password: '$2a$08$DbgtoEcyIJpAZXDN.qBqC.oUWf9b6h0PlG8WLX.r9dM9EBxljkGYm',
      avatar: null,
      phone: '+79656588789',
      createdAt: '2020-01-01 13:52:47.53+03',
      updatedAt: '2020-01-01 13:52:47.53+03',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  },
};
