$(function(){
  mouse.createMap();

  $("#start").click(function() {
  // 游戏初始化
  mouse.init();
  })
})



var mouse = (function() {
    // 采用单体模式设计游戏
    var stage = $("#stage"), // 整体背景
      map = $("#map"), // 地图div
      scoreDiv = $("#scoreDiv") // 分数标签
      again = $("#again"),  // 再来一次
      timerSpan = $("#timer")  // 时间标签
      oScore = 0, // 分数
      interval = null, // 定时器
      timer = 30000, // 游戏时长
      appearSpeed = 800;  // 出现速度

    // 三种地鼠
    var mouses = [{
      style: "mouse1",
      score: 1,
      speed: 3
      }, {
        style: "mouse2",
        score: 1,
        speed: 2
      }, {
        style: "mouse3",
        score: 1,
        speed: 1
      }];
    var margin = 20, // 每个方格之间的间距
      stageWdith = stage.width(), // 整体背景的宽度
      liWidth = parseInt((stageWdith - margin * 2) / 3), // 每个li方格的宽度
      liHeight = 170, // 每个li方格的高度
      mapWidth = liWidth * 3 + margin * 2, // 地图div的宽度
      mapHeight = liHeight * 3 + margin * 2;  // 地图div的高度

    function init() {
      // 游戏初始化
      // 创建地图
      createMap();

      // 创建倒计时
      createTimer(timer);

      // 地鼠出现
      mouseAppear();

      // 点击地鼠得分
      getScore();

      // 设定时间结束游戏，确认后重新加载
      stopGame();
    }

    function createMap() {
      again.hide();
      var ili = $("li");
      for (var i = 0; i < ili.length; i++) {
        ili.eq(i).remove();
      };
      // 创建地图
      map.css("width", mapWidth).css("height", mapHeight)
        .css("margin-left", -mapWidth / 2).css("padding-left", (liWidth - 192) / 2)
        // .css("margin-top", -mapHeight/2);
        // 九个方格的地图，适应屏幕宽度
      for (var i = 0; i < 9; i++) {
        var mapLi = $("<li></li>");
        mapLi.css("width", liWidth).css("height", liHeight)
          .css("margin-left", margin).css("margin-top", margin)
          .appendTo(map);
      };
      var li = $("li");
      for (var i = 0; i < li.length;

        i += 3) {
        li.eq(i).css("margin-left", 0)
      };
    }

    function createTimer (timer) {
      // 创建倒计时
      var intver = null;
      clearInterval(intver);
      timerSpan.html(timer/1000 + "s");
      intver = setInterval(function(){
        if (timer > 0) {
          // timer -= appearSpeed;
          timer -= 1000;
          timerSpan.html(timer/1000 + "s");
        };
      },1000)
    }

    function mouseAppear() {
      // 地鼠出现函数
      var li = $("li");

      // 通过定时器和随机数产生地鼠
      interval = setInterval(function() {
        // 随机产生地鼠种类
        var iMouse = Math.floor(Math.random() * 3);
        // 随机指定地鼠出现的方格
        var iLi = Math.floor(Math.random() * 9);
        var mouse = mouses[iMouse];
        $("li div").remove();

        // 根据地鼠种类决定地鼠存在时间
        setTimeout(function() {
          // li.eq(iLi).css("background", "orange");
          $("<div></div>").addClass(mouse.style).attr("score", mouse.score)
            .appendTo(li.eq(iLi));
        }, mouse.speed);
      }, appearSpeed)
    }

    function getScore() {
      // 点击地鼠得分
      var li = $("li")
      li.click(function() {
        var This = $(this);
        var index = This.index();

        // 点击事件判断
        if (li.eq(index).children().length == 0) {
          oScore += 0
        } else {
          // 根据地鼠种类判断相应得分
          oScore += parseInt(li.eq(index).children().attr("score"));
        }
        scoreDiv.html(oScore + "”");
      })
    }

    function stopGame() {
      // 设定时间结束游戏，重新加载
      var finalScore = $("#finalScore");
      var playagain = $("#playagain");

      // 根据设定时长结束游戏
      setTimeout(function() {
        clearInterval(interval);
        again.show();
        finalScore.html(oScore + "”");

        playagain.click(function() {
          // window.location.reload();
          mouse.init();
        })
      }, timer)
    }
    return {
      init: init,
      createMap: createMap,
    }
  }
  ());
