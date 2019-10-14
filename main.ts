import Amplify,{ Auth,API } from 'aws-amplify';
Amplify.configure({
  Auth: {
      identityPoolId: 'us-east-2:407c0b68-9a34-4fa1-a916-47bd46686284', //REQUIRED - Amazon Cognito Identity Pool ID
      region: 'us-east-2', // REQUIRED - Amazon Cognito Region
      userPoolId: 'us-east-2_I3nRjackN', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: '6mdsa320oe530p1r774mkjtt98', //OPTIONAL - Amazon Cognito Web Client ID
  },
  API: {
    endpoints: [
      {
          name: "AmplifyTest",
          endpoint: "https://pwoihyr22i.execute-api.us-east-2.amazonaws.com/v1"
      }
    ]
  }
});

var email:any;

$('#login-form-link').click((e)=>{
  $("#login-form").delay(100).fadeIn(100);
  $("#register-form").fadeOut(100);
  $("#register-verify-form").fadeOut(100);
  $('#register-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();

});
$('#register-form-link').click((e)=>{
  $("#register-form").delay(100).fadeIn(100);
  $("#login-form").fadeOut(100);
  $("#register-verify-form").fadeOut(100);
  $('#login-form-link').removeClass('active');
  $(this).addClass('active');
  e.preventDefault();
});
$('#register-submit').click((e)=>{
  email = $("#register-form #email").val();
  let password = $("#register-form #password").val();
  let comfirm_password = $("#register-form #confirm-password").val();
  
  if(!email && email == ''){
    alert('メールアドレスを入力してください');
    return;
  }
  if(!password && password == ''){
    alert('パスワードを入力してください');
    return;
  }
  if(password != comfirm_password){
    alert('確認パスワードが一致しません。');
    return;
  }

  Auth.signUp(email, password)
  .then((data) => { 
    console.log(data);
    $("#register-verify-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    alert('登録メールアドレスに検証コードを送信しました。');
  })
  .catch((err) => {
    console.log(err);
    alert(err);
    return;
  });
});

$('#register-verify-submit').click((e)=>{
  let code = $("#register-verify-form #code").val();
  
  if(!code && code == ''){
    alert('検証コードを入力してください');
    return;
  }
  Auth.confirmSignUp(email, code)
  .then((data) => { 
    console.log(data);
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $("#register-verify-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    alert('ユーザ登録が完了しました。');
  })
  .catch((err) => {
    console.log(err);
    alert(err);
    return;
  });
});

$('#login-submit').click((e)=>{
  email = $("#login-form #email").val();
  let password = $("#login-form #password").val();
  
  if(!email && email == ''){
    alert('メールアドレスを入力してください');
    return;
  }
  if(!password && password == ''){
    alert('パスワードを入力してください');
    return;
  }

  Auth.signIn(email, password)
  .then((data) => { 
    console.log(data);
    alert('サインインに成功しました');

    let apiName = 'AmplifyTest';
    let path = '/member'; 
    API.get(apiName, path)
    .then(response => {
      console.log('--------- OK ------------');
      console.log(response);
    })
    .catch(err =>{
      console.log('--------- NG ------------');
      console.log(err);
    });
    
  })
  .catch((err) => {
    console.log(err);
    alert(err);
    return;
  });
});

$('#signout').click((e)=>{

  Auth.signOut()
  .then((data) => { 
    console.log(data);
    alert('サインアウトしました');
  })
  .catch((err) => {
    console.log(err);
    alert(err);
    return;
  });
});

let apiName = 'AmplifyTest';
let guest_path = '/guest'; 
let member_path = '/member';

API.get(apiName, guest_path)
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});
API.get(apiName, member_path)
.then(response => {
  console.log(response);
})
.catch(err => {
  console.log(err);
});

