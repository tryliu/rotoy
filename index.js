(function () {
  // 入口函数
  const into = () => {
    // 定义事件函数
    incident();
  };
  //   事件定义
  const incident = () => {
    formContainer.addEventListener("submit", execute);
  };
  // 事件执行
  const execute = (e) => {
    //   阻止默认行为
    e.preventDefault();
    data();
  };
  const data = async () => {
    const loginId = userName.value;
    const loginPwd = userPassword.value;
    const respon = await fethcFn({
      url: "/user/login",
      method: "POST",
      params: { loginId, loginPwd },
    });
    respon && window.location.replace("./index.html");
  };
  into();
})();
