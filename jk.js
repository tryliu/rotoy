(function () {
  // 入口函数
  let isRepeat = false;
  const entrance = () => {
    // 定义事件
    incident();
  };
  //  事件定义
  const incident = () => {
    formContainer.addEventListener("submit", present);
    userName.addEventListener("change", verify);
  };
  // 判断账号注册的内容是否符合规范
  const judge = (loginId, nickname, loginPwd, confirmPwd) => {
    switch (true) {
      case !loginId:
        window.alert("注册用户名不能为空");

        return;
      case !nickname:
        window.alert("昵称不能为空");

        return;
      case !loginPwd:
        window.alert("注册密码不能为空");

        return;
      case !confirmPwd:
        window.alert("确认密码不能为空");

        return;
      case loginPwd !== confirmPwd:
        window.alert("两次输入的密码不一致");

        return;
      case isRepeat:
        window.alert("账户名已经注册过，请更换注册名称");

      default:
        return true;
    }
  };
  const present = (e) => {
    e.preventDefault(); //阻止默认行为
    const loginId = userName.value.trim();
    const nickname = userNickname.value.trim();
    const loginPwd = userPassword.value.trim();
    const confirmPwd = userConfirmPassword.value.trim();
    if (!judge(loginId, nickname, loginPwd, confirmPwd)) {
      return;
    }
    found();
  };
  //   账号创建
  const found = async () => {
    const loginId = userName.value.trim();
    const loginPwd = userPassword.value.trim();
    const nickname = userNickname.value.trim();
    const respin = await fethcFn({
      url: "/user/reg",
      method: "POST",
      params: {
        loginId,
        loginPwd,
        nickname,
      },
    });
    if (respin) {
      window.alert("注册成功");
      window.location.replace("./login.html");
    }
  };
  //   对注册账号进行验证
  const verify = async () => {
    const loginId = userName.value.trim();
    if (!loginId) {
      return;
    }
    const respon = await fetch(
      `https://study.duyiedu.com/api/user/exists?loginId=${loginId}`
    );
    const res = await respon.json();
    isRepeat = res;
    // return isRepeat;
  };
  entrance();
})();
