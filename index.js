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
    respon &&
      window.location.replace(
        "file:///D:/vsckd%E5%B7%A5%E4%BD%9C%E6%96%87%E4%BB%B6%E5%A4%B9/%E7%BD%91%E7%BB%9C%E7%BB%83%E4%B9%A0/index.html"
      );
  };
  into();
})();
