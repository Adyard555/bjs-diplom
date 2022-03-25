const userForm = new UserForm();

userForm.loginFormCallback = function (loginData) {
   let loginCallback = (loginResponse) => {
      if (!loginResponse.success) {
         this.setLoginErrorMessage('Ошибка при вводе данных или данного пользователя не существует!');
      } else location.reload();
   };

   ApiConnector.login(loginData, loginCallback);
}

userForm.registerFormCallback = function (registerData) {
   let registerCallback = (registerResponse) => {
      if (!registerResponse.success) {
         this.setRegisterErrorMessage('Данные введены не правильно, проверьте правильно ли вы указали свои данные!');
      } else location.reload();
   };

   ApiConnector.register(registerData, registerCallback);
}