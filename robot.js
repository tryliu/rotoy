(function () {
  let page = 0;
  let size = 10;
  let chatTotal = 0;
  let numpan = 0;
  let spanType = "enter";
  //   获取dom数据函数
  const datahd = {
    clear: document.querySelector(".clear"),
    nickName: document.querySelector(".nick-name"),
    accountName: document.querySelector(".account-name"),
    loginTime: document.querySelector(".login-time"),
    close: document.querySelector(".close"),
    contentBody: document.querySelector(".content-body"),
    inputContainer: document.querySelector(".input-container"),
    sendBtn: document.querySelector(".send-btn"),
    arrowContainer: document.querySelector(".arrow-container"),
    selectContainer: document.querySelector(".select-container"),
    selectItem: document.querySelectorAll(".select-item"),
  };
  // 入口函数
  const into = () => {
    message(); //个人信息读取
    datahd.close.addEventListener("click", clickxx); //返回退出
    chatting("bottom"); //聊天消息的获取
    send(); //发送消息事件
    datahd.arrowContainer.addEventListener("click", choie); //选择发送方式
    datahd.clear.addEventListener("click", qing); //输入内容的清除
    manage();
    datahd.inputContainer.addEventListener("keydown", infinally);
  };

  // 发送消息选中处理
  function manage() {
    for (let key of datahd.selectItem) {
      key.addEventListener("click", kook);
    }
    function kook() {
      const on = document.querySelector(".on");
      on.classList.remove("on");
      this.classList.add("on");
      datahd.selectContainer.style.display = "none";
      spanType = this.getAttribute("type");
      console.log(spanType);
    }
  }

  // 发送消息的方法的显示和隐藏
  const choie = () => {
    if (numpan === 0) {
      datahd.selectContainer.style.display = "block";
      numpan = 1;
    } else if (numpan === 1) {
      datahd.selectContainer.style.display = "none";
      numpan = 0;
    }
  };
  // 账号退出函数
  const clickxx = () => {
    /* 清空sessionStorage */
    sessionStorage.removeItem("token");
    window.location.replace("login.html");
    /* 界面的跳转 */
  };
  // 清除聊天输入内容
  const qing = () => {
    datahd.inputContainer.value = "";
  };

  // 判断发送消息方式
  const infinally = (e) => {
    if (
      (e.keyCode === 13 && spanType === "enter" && !e.ctrlKey) ||
      (e.keyCode === 13 && spanType === "ctrlEnter" && e.ctrlKey)
    ) {
      datahd.sendBtn.click();
    }
  };
  //滚动历史消息的获取
  datahd.contentBody.addEventListener("wheel", roll);
  function roll(e) {
    if (this.scrollTop === 0) {
      if (chatTotal <= (page + 1) * size) return;
      page++;
      chatting("top");
    }
  }

  //   个人信息获取事件
  const message = async () => {
    const forpison = await fethcFn({
      url: "/user/profile",
    });
    // console.log(datahd.nickName);
    datahd.nickName.innerHTML = forpison.nickname;
    datahd.accountName.innerHTML = forpison.loginId;
    datahd.loginTime.innerHTML = formaDate(forpison.lastLoginTime);
  };
  //消息发送
  const send = () => {
    datahd.sendBtn.addEventListener("click", togoing);
  };
  const togoing = () => {
    const content = datahd.inputContainer.value.trim();
    if (!content) {
      window.alert("发送消息不能为空");
      return;
    }
    place = "bottom";
    renderChatForm([{ from: "user", content }], place);
    datahd.inputContainer.value = "";
    const jkk = async () => {
      const respion = await fethcFn({
        url: "/chat",
        method: "POST",
        params: {
          content,
        },
      });
      let chat = respion.content;

      renderChatForm([{ from: "robot", content: chat }], place);
    };
    jkk();
  };
  //   历史聊天记录获取
  const chatting = async (place) => {
    const respion = await fethcFn({
      url: "/chat/history",
      params: {
        page,
        size,
      },
    });
    chatTotal = respion.chatTotal;
    renderChatForm(respion.data, place);
  };
  //     聊天记录的获取
  const renderChatForm = (list, place) => {
    list.reverse();
    if (!list.length) {
      datahd.contentBody.innerHTML = `
      <div class="chat-container robot-container">
        <img src="./img/robot.jpg" alt="">
        <div class="chat-txt">
          您好！我是腾讯机器人，非常欢迎您的到来，有什么想和我聊聊的吗？
        </div>
      </div>
            `;
      return;
    }
    // let ko = [];
    // for (let i = 0; i < list.length; i++) {
    //   ko.unshift(list[i]);
    // }
    const chatData = list
      .map((item) => {
        /* 左右分别的进行渲染 */
        return item.from === "user"
          ? `<div class="chat-container avatar-container">
                            <img src="./img/avtar.png" alt="">
                            <div class="chat-txt">${item.content}</div>
              </div>`
          : ` <div class="chat-container robot-container">
                        <img src="./img/robot.jpg" alt="">
                        <div class="chat-txt">
                          ${item.content}
                        </div>
                </div>`;
      })
      .join(" ");

    if (place === "bottom") {
      datahd.contentBody.innerHTML += chatData;
      const bottomDistance =
        document.querySelectorAll(".chat-container")[
          document.querySelectorAll(".chat-container").length - 1
        ].offsetTop;
      datahd.contentBody.scrollTo(0, bottomDistance);
    } else {
      datahd.contentBody.innerHTML += chatData + datahd.contentBody.innerHTML;
    }
  };
  into();
})();
