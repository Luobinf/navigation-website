function createElement(tagName, attributes) {
    let element = document.createElement(tagName);
    for (let key in attributes) {
        element[key] = attributes[key];
    }
    return element;
}
function initData() {
    let keys = {
        0: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        1: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        2: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        length: 3
    };

    let hash = {
        a: "www.amazon.com",
        b: "www.bilibili.com",
        e: "ele.me",
        f: "www.facebook.com",
        g: "www.google.com",
        i: "null",
        j: "www.jd.com",
        m: "www.mcdonalds.com.cn",
        o: "www.opera.com",
        p: "www.ps.com",
        q: "qq.com",
        r: "renren.com",
        s: "null",
        t: "",
        u: "",
        w: "weibo.com",
        y: "youtube.com",
        z: "zhihu.com"
    };

    // 使用localStorage来存储数据，这样当你重新刷新网页或关闭浏览器时，修改后的数据还在。
    // localStorage就像一个容器，存储方式是以键值对的形式来存储的，并且存储的值是字符串的形式，
    // 故从localStorage中拿取数据，要将字符串转换成js对象，使用JSON.parse().
    if (sessionStorage.getItem('z')) {
        hash = JSON.parse(sessionStorage.getItem('z'));
    }

    return {
        keys: keys,
        hash: hash
    }
}

function generateKbds() {
    let oMainInner = document.getElementById('mainInner');
    for (let j = 0; j < keys.length; j++) {
        let oDiv = document.createElement('div');
        let row = keys[j];  //获取['q','w','e','r','t','y','u','i','o','p']
        let oKeybd;
        let button;
        let image;
        let span;
        let imgSrc;
        let index = 0;
        oDiv.className = 'row';
        while (index < row.length) {
            oKeybd = document.createElement('kbd');
            button = document.createElement('button');
            span = document.createElement('span');
            image = document.createElement('img');
            if (hash[row[index]] && hash[row[index]] != 'null') {
                image.src = 'http://' + hash[row[index]] + '/favicon.ico';
            } else {
                image.className = 'hidden';
                image.src = 'https://i.loli.net/2019/08/02/5d43989f5d9f260609.png';
            }
            // 图片出错解决
            image.onerror = function (ev) {
                ev.target.style.display = 'none';
                ev.target.src = 'https://i.loli.net/2019/08/02/5d43989f5d9f260609.png';
            }
            // 改变样式
            oKeybd.className = 'key';
            oKeybd.id = row[index].toUpperCase();
            span.innerText = row[index]; //q
            span.className = 'text';
            button.innerText = '编辑';
            button.id = row[index];
            button.addEventListener('click', function (ev) {
                let key = ev.target.id;
                let buttonPreviousSibling; //获取img标签
                let website = prompt('给我一个网址');
                hash[key] = website;
                sessionStorage.setItem('z', JSON.stringify(hash));
                buttonPreviousSibling = ev.target.previousSibling; //找出button的前一个兄弟元素
                buttonPreviousSibling.src = 'http://' + website + '/favicon.ico';
                buttonPreviousSibling.onerror = function (ev) {
                    ev.target.style.display = 'none';
                    ev.target.src = 'https://i.loli.net/2019/08/02/5d43989f5d9f260609.png';
                }

            });

            oKeybd.appendChild(span);
            oKeybd.appendChild(image);
            oKeybd.appendChild(button);
            oDiv.appendChild(oKeybd);
            index++;
        }
        oMainInner.appendChild(oDiv);
    }
}

function skipToWeb() {
    document.onkeypress = function (ev) {
        let key = ev.key;
        let website = hash[key];  //获取网址
        // location.href = 'http://' + website
        //_blank表示以一个新窗口打开
        window.open('http://' + website, '_blank');
    };
    document.addEventListener('click', function (ev) {
        if (ev.target.id.toLowerCase() in hash) {
            let website = hash[ev.target.id.toLowerCase()];
            window.open('http://' + website, '_blank');
        }
        if (ev.target.tagName.toLowerCase() === 'img') {
            let index = ev.target.src.lastIndexOf('/');
            let result = ev.target.src.slice(0, index);
            console.log(result);
            window.open(result, '_blank');
        }
    });
}

//header部分获取时间
function update() {
    let clock = document.querySelector('.clock')
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    // console.log(date.getDay()) 获取星期几
    if (hours < 10) {
        hours = "0" + hours + ":"
    } else {
        hours = hours + ":"
    }
    clock.children[0].textContent = hours;

    if (minutes < 10) {
        minutes = "0" + minutes + ":"
    } else {
        minutes = minutes + ":"
    }
    clock.children[1].textContent = minutes;

    if (seconds < 10) {
        seconds = "0" + seconds
    } else {
        seconds = seconds
    }
    clock.children[2].textContent = seconds;
}

function createClock() {
    update() //*
    setInterval(update, 1000);
}