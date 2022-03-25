const exit = new LogoutButton();
exit.action = () => {
   ApiConnector.logout((callback) => {
      if (callback.success) {
         location.reload();
      }
   });
};

new ProfileWidget();
ApiConnector.current(callback => {
   if (callback.success === true) {
      ProfileWidget.showProfile(callback.data);
   }
});

const tableBody = new RatesBoard();
ApiConnector.getStocks(callback => {
   if (callback.success === true) {
      tableBody.clearTable();
      tableBody.fillTable(callback.data);
   }
});

setInterval(function () {
   ApiConnector.getStocks
}, 1000);


const addMoneyForm = new MoneyManager();
addMoneyForm.addMoneyCallback = (data) => {
   ApiConnector.addMoney(data, callback => {
      if (callback.success === true) {
         ProfileWidget.showProfile(callback.data);
         addMoneyForm.setMessage(false, 'Кошелек пополнен');
      } else {
         addMoneyForm.setMessage(!callback.success, 'Укажите валюту');
      }
   });
};

addMoneyForm.conversionMoneyCallback = (data) => {
   ApiConnector.convertMoney(data, callback => {
      if (callback.success === true) {
         ProfileWidget.showProfile(callback.data);
         addMoneyForm.setMessage(false, 'Успешно сконвертирована валюта');
      } else {
         addMoneyForm.setMessage(!callback.success, 'Укажите из какой валюты и в какую вы хотите сконвертировать');
      }
   })
}

addMoneyForm.sendMoneyCallback = (data) => {
   ApiConnector.transferMoney(data, callback => {
      if (callback.success === true) {
         ProfileWidget.showProfile(callback.data);
         addMoneyForm.setMessage(false, 'Перевод выполнен');
      } else {
         addMoneyForm.setMessage(!callback.success, 'Укажите кому вы хотите перевести деньги и в какой валюте');
      }
   })
}
const favoritesTableBody = new FavoritesWidget();
ApiConnector.getFavorites(callback => {
   if (callback.success === true) {
      favoritesTableBody.clearTable();
      favoritesTableBody.fillTable(callback.data);
      addMoneyForm.updateUsersList(callback.data);
   }
});

favoritesTableBody.addUserCallback = (data) => {
   ApiConnector.addUserToFavorites(data, callback => {
      console.log(callback)
      if (callback.success === true) {
         favoritesTableBody.clearTable();
         favoritesTableBody.fillTable(callback.data);
         addMoneyForm.updateUsersList(callback.data);
         favoritesTableBody.setMessage(false, 'Контакт успешно добавлен в избранное');
      } else {
         favoritesTableBody.setMessage(!callback.success, 'Введите ID и имя контакта');
      }
   });
};

favoritesTableBody.removeUserCallback = (data) => {
   ApiConnector.removeUserFromFavorites(data, callback => {
      console.log(callback)
      if (callback.success === true) {
         favoritesTableBody.clearTable();
         favoritesTableBody.fillTable(callback.data);
         addMoneyForm.updateUsersList(callback.data);
         favoritesTableBody.setMessage(false, 'Контакт успешно удален');
      }
   });
}