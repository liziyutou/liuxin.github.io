// 开启同步代码
// 定义一个对象来管理下面的变量
var Model = {};

Model.videoLength = mediaData.videoFiles.length;
Model.audioLength = mediaData.audioFiles.length;

Model.getVideoURL = function () {
    /*  let path = "D:/media/mp4Files/";
     return path + Model.videoFiles[Model.index]; */
    return mediaData.videoPath + mediaData.videoFiles[Model.index];
};
Model.getAudioURL = function () {
    /* let path = "D:/media/mp3Files/";
    return path + Model.audioFiles[Model.index]; */
    return mediaData.audioPath + mediaData.audioFiles[Model.index].fileName;
}

Model.index = 0;// 当前视频的下标
Model.UI = {};
Model.isVideo = true;

Model.UI.myVideo = document.getElementById("myVideo");

Model.UI.previousB = document.getElementById("previous")
Model.UI.playB = document.getElementById("play");
Model.UI.stopB = document.getElementById("stop");
Model.UI.nextB = document.getElementById("next");

Model.UI.currentTimeDom = document.getElementById("videoTime");
Model.UI.videoSN = document.getElementById("videoSN");
Model.UI.logoDom = document.getElementById("logo");

Model.UI.switchDom = document.getElementById("switch");
Model.UI.container = document.getElementById("container");

Model.UI.myAudio = document.getElementById("myAudio");


Model.UI.mediaList = document.getElementById("showList");
// 得到屏幕宽度
// Model.screenWidth = document.body.clientWidth;
// Model.screenWidth = document.body.clientWidth;
// Model.UI.stageDom.style.width = Model.UI.screenWidth + 'px';
// 确定父容器的高度
Model.UI.container.style.height = Model.UI.myVideo.clientHeight + 80 + 'px';
// 修改视频的宽度为屏幕的宽度
// Model.UI.myVideo.style.width = screenWidth + "px";

// 定义一个Model对象的属性来控制logo的文本内容
Model.showCurrentVideoUI = function (index) {
    // 修改文本内容
    /* Model.UI.logoDom.textContent = "No." + (index + 1) + "/共" + Model.videoFiles.length; */
    if (Model.isVideo) {
        Model.UI.logoDom.textContent = "No." + (index + 1) + "/共" + Model.videoLength;
    } else {
        Model.UI.logoDom.textContent = "No." + (index + 1) + "/共" + Model.audioLength;
    }

};

// 创建当前音频的标题
Model.createAudioMenu = function () {
    let pDom;
    // 得到当前索引的标题和时间
    let titles = mediaData.audioFiles[Model.index].title;
    let times = mediaData.audioFiles[Model.index].time;

    for (let i = 0; i < titles.length; i++) {
        pDom = document.createElement('p');
        pDom.textContent = "Menu " + titles[i];
        pDom.onclick = function () {
            Model.UI.myAudio.currentTime = times[i][0];
            Model.UI.myAudio.play();
            // 计时器
            window.setTimeout(function () {
                Model.UI.myAudio.pause();
            }, (times[i][1] - times[i][0]) * 1000);
        }
        Model.UI.container.appendChild(pDom);
    }
    /* 
        for (let i = 0; i < 6; i++) {
            pDom = document.createElement('p');
            pDom.textContent = "Menu " + (i + 1);
            pDom.onclick = function () {
                Model.UI.myAudio.currentTime = i * 200;
            }
            Model.UI.container.appendChild(pDom);
        } */

};


/* Model.removeAudioMenu = function () {
    let pDom;
    let titles = mediaData.audioFiles[Model.index].title; 
    pDom = document.querySelectorAll('div#container p');
    for (let i = 0; i < titles.length; i++) {
        Model.UI.container.removeChild(pDom[i]);
    }
} */

// 删除上一个或当前音频的标题
Model.removeAudioMenu = function (removeIndex) {
    let pDom;
    let titles = mediaData.audioFiles[removeIndex].title;

    pDom = document.querySelectorAll('div#container p');
    for (let i = 0; i < titles.length; i++) {
        Model.UI.container.removeChild(pDom[i]);
    }
}

Model.createImg = function () {
    // 得到有多少张照片
    let imgLength = mediaData.authors.picUrl.length;
    var face_imgDiv = document.getElementById("face-img");
    for (let i = 0; i < imgLength; i++) {
        var divDom = document.createElement("div");
        var imgDom = document.createElement("img");
        divDom.classList.add("container-img");

        imgDom.src = mediaData.authors.picUrl[i];
        imgDom.alt = mediaData.authors.names[i];
        imgDom.classList.add("face");
        divDom.appendChild(imgDom);
        face_imgDiv.appendChild(divDom);
    }

}



// 初始化
Model.init = function () {
    Model.UI.myVideo.src = Model.getVideoURL();
    Model.UI.myAudio.src = Model.getAudioURL();

    Model.createImg();
    // 初始化Logo
    Model.showCurrentVideoUI(Model.index);
    window.setInterval(function () {
        Model.showTimeUI();
    }, 1000);

    // 初始化列表
    renderList();


    Model.UI.previousB.onclick = function () {
        // 如果是视频
        if (Model.isVideo) {
            // 点击按钮，下标向前移动
            Model.index--;
            // 判断当前下标是不是第一个视频
            controlIndex(Model.index);
            // 修改logo
            Model.showCurrentVideoUI(Model.index);
            Model.UI.myVideo.src = Model.getVideoURL();
            Model.UI.myVideo.play();
            // console.log("第" + (index + 1) + "个视频");
        } else {
            // 点击按钮，下标向前移动
            Model.index--;
            // 先删除原先的标题
            Model.removeAudioMenu(Model.index + 1);
            // 判断当前下标是不是第一个视频
            controlIndex(Model.index);
            // 修改logo
            // Model.showCurrentVideoUI(Model.index);
            Model.showCurrentVideoUI(Model.index);
            Model.UI.myAudio.src = Model.getAudioURL();
            Model.UI.myAudio.play();


            // 在创建现在的标题
            Model.createAudioMenu();
        }

    };

    Model.UI.playB.onclick = function () {
        if (Model.isVideo) {
            // 如果输入了视频序号，点击播放按钮
            // 如果视频序号不合法
            if (!isValid(Model.UI.videoSN.value)) {
                alert("视频序号非法");
            } else {
                // 如果合法
                Model.index = Model.UI.videoSN.value - 1;
                Model.showCurrentVideoUI(Model.index);
            }
            Model.UI.myVideo.play();
        } else {
            // 如果输入了音频序号，点击播放按钮
            // 如果视频序号不合法
            if (!isValid(Model.UI.videoSN.value)) {
                alert("音频序号非法");
            } else {
                // 如果合法
                Model.index = Model.UI.videoSN.value - 1;
                Model.showCurrentVideoUI(Model.index);
            }

            Model.UI.myAudio.play();

        }

    };

    Model.UI.stopB.onclick = function () {
        if (Model.isVideo) {
            Model.UI.myVideo.pause();
        } else {
            Model.UI.myAudio.pause();
        }

    };


    Model.UI.nextB.onclick = function () {
        if (Model.isVideo) {
            Model.index++;
            controlIndex(Model.index);
            Model.showCurrentVideoUI(Model.index);
            Model.UI.myVideo.src = Model.getVideoURL();

            Model.UI.myVideo.play();
            // console.log("第" + (index + 1) + "个视频");
        } else {
            Model.index++;
            // 先删除原先的标题
            Model.removeAudioMenu(Model.index - 1);
            controlIndex(Model.index);
            Model.showCurrentVideoUI(Model.index);
            Model.UI.myAudio.src = Model.getAudioURL();

            // 在创建现在的标题
            Model.createAudioMenu();
            Model.UI.myAudio.play();
        }

    };


    // 键盘事件
    document.onkeypress = function (e) {
        console.log("you enter key type:" + e.key);
        // 如果按下的是回车
        if (e.key == "Enter") {
            if (Model.isVideo) {
                // 如果视频序号合法
                if (isValid(Model.UI.videoSN.value)) {
                    Model.index = Model.UI.videoSN.value - 1;
                    // 修改logo
                    Model.showCurrentVideoUI(Model.index);
                } else {
                    // 如果非法,就视频下标不变,提示非法
                    alert("视频序号非法");

                }
                Model.UI.myVideo.src = Model.getVideoURL();
                Model.UI.myVideo.play();
            } else {
                // 如果音频序号合法
                if (isValid(Model.UI.videoSN.value)) {
                    Model.index = Model.UI.videoSN.value - 1;
                    // 修改logo
                    Model.showCurrentVideoUI(Model.index);
                } else {
                    // 如果非法,就视频下标不变,提示非法
                    alert("视频序号非法");

                }
                Model.UI.myAudio.src = Model.getAudioURL();
                Model.UI.myAudio.play();
            }


        }
    };

    // 给switchDom添加点击事件
    Model.UI.switchDom.onclick = function () {
        Model.isVideo = !Model.isVideo;
        // 每次切换的时侯，都将下标初始化为0
        Model.index = 0;
        // 如果此时是播放视频
        if (Model.isVideo) {

            Model.UI.switchDom.value = "ToAudio";
            Model.shutDownAudio();// 关闭音频
            Model.turnOnVideo(); // 打开视频
            // 修改视频的UI
            Model.showCurrentVideoUI(Model.index);
            //重置视频的播放
            Model.UI.myVideo.src = Model.getVideoURL();
            // 重置视频序列
            Model.UI.videoSN.value = Model.index + 1;
            Model.removeAudioMenu(Model.index);
            renderList();
        } else {
            // 当点击的时候应该是播放audio，并且值应该是ToVideo
            Model.UI.switchDom.value = "ToVideo"
            // 修改视频的UI
            Model.showCurrentVideoUI(Model.index);
            //重置视频的播放
            Model.UI.myAudio.src = Model.getAudioURL();
            // 重置视频序列
            Model.UI.videoSN.value = Model.index + 1;
            // 关闭视频
            Model.shutDownVideo();
            // 打开音频
            Model.turnOnAudio();
            renderList();
            Model.createAudioMenu();
        }

    };

    Model.shutDownVideo = function () {
        /* Model.UI.myVideo.style.display = "none"; */
        Model.UI.container.removeChild(Model.UI.myVideo);
        /*   Model.UI.logoDom.style.display = "none";
          Model.UI.currentTimeDom.style.display = "none"; */
        // 显示音频
        Model.UI.myAudio.style.display = "block";
        /*  Model.UI.myAudio.appendChild(Model.UI.myAudio); */
    };

    Model.turnOnVideo = function () {
        /*   Model.UI.myVideo.style.display = "block"; */
        Model.UI.container.appendChild(Model.UI.myVideo);
        /* Model.UI.logoDom.style.display = "block";
        Model.UI.currentTimeDom.style.display = "block"; */
        // 隐藏音频
        Model.UI.myAudio.style.display = 'none';
        /*  Model.UI.container.removeChild(Model.UI.myAudio); */
    };

    Model.shutDownAudio = function () {
        Model.UI.container.removeChild(Model.UI.myAudio);
        Model.UI.myVideo.style.display = "block";
    }

    Model.turnOnAudio = function () {
        Model.UI.container.appendChild(Model.UI.myAudio);
        Model.UI.myVideo.style.display = 'none';
    }
    // 控制下标的首尾变化和视频序号 变化
    function controlIndex(index) {
        if (Model.isVideo) {
            /* if (index == Model.videoFiles.length) { // 如果当前视频是最后一个
                Model.index = 0;// 跳到开头，变成循环
    
            } else if (index == -1) {
                Model.index = Model.videoFiles.length - 1; // 跳到最后一个视频
            } */
            if (index == Model.videoLength) { // 如果当前视频是最后一个
                Model.index = 0;// 跳到开头，变成循环

            } else if (index == -1) {
                Model.index = Model.videoLength - 1; // 跳到最后一个视频
            }
        } else {
            /*  if (index == Model.audioFiles.length) {
                 Model.index = 0;
             } else if (index == -1) {
                 Model.index = Model.audioFiles.length - 1;
             } */
            if (index == Model.audioLength) {
                Model.index = 0;
            } else if (index == -1) {
                Model.index = Model.audioLength - 1;
            }
        }
        // 视频序号从1开始
        Model.UI.videoSN.value = Model.index + 1;
    };

    function isValid(value) {
        // 如果视频序号在1 到 videoFiles长度范围内
        if (Model.isVideo) {
            if (value >= "1" && value <= Model.videoLength) {
                // 合法
                return true;
            }
            // 否则非法
            return false;
        } else {
            if (value >= "1" && value <= Model.audioLength) {
                // 合法
                return true;
            }
            return false;
        }
    }

    // 更改进度条 
    Model.showTimeUI = function () {
        let timeText
        if (Model.isVideo) {
            timeText = parseInt(Model.UI.myVideo.currentTime) + " s"
            timeText += "/" + parseInt(Model.UI.myVideo.duration) + " s";

        } else {
            timeText = parseInt(Model.UI.myAudio.currentTime) + " s"
            timeText += "/" + parseInt(Model.UI.myAudio.duration) + " s";
        }

        Model.UI.currentTimeDom.textContent = timeText;
    };


    // 渲染列表
    function renderList() {
        removeList();
        if (Model.isVideo) {
            for (let i = 0; i < Model.videoLength; i++) {
                // 动态生成li
                let liDom = document.createElement("li");
                liDom.innerHTML = "第" + (i + 1) + "个视频：" + mediaData.videoFiles[i];
                liDom.onclick = function () {
                    Model.UI.myVideo.src = mediaData.videoPath + mediaData.videoFiles[i];
                    Model.index = i;
                    controlIndex(Model.index);
                    Model.showCurrentVideoUI(Model.index);
                }
                Model.UI.mediaList.appendChild(liDom);
            }
        } else {

            for (let i = 0; i < Model.audioLength; i++) {
                // 动态生成li
                var liDom = document.createElement("li");

                liDom.innerHTML = "第" + (i + 1) + "个音频：" + mediaData.audioFiles[i].fileName;
                liDom.onclick = function () {
                    Model.UI.myAudio.src = mediaData.audioPath + mediaData.audioFiles[i].fileName;
                    // 删除当前音频的标题
                    Model.removeAudioMenu(Model.index);
                    // 切换到别的音频
                    Model.index = i;
                    controlIndex(Model.index);
                    Model.showCurrentVideoUI(Model.index);

                    // 添加当前音频的标题
                    Model.createAudioMenu();
                }
                Model.UI.mediaList.appendChild(liDom);
            }
        }

    }
    // 删除列表
    function removeList() {
        var liDom = document.querySelectorAll(".mediaList li");
        for (let i = 0; i < liDom.length; i++) {
            Model.UI.mediaList.removeChild(liDom[i]);
        }
    }

}

// 开启异步代码
Model.init();

