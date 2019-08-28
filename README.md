# Project Barley

## Preparation

Please make sure you have [tampermonkey（油猴脚本）](https://github.com/Tampermonkey/tampermonkey) installed on your Chrome browser.  
You can either install tampermoneky from the [Chrome Webstore](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) or check their [official website](https://www.tampermonkey.net) to see how to install the extension.

## Automate the process of purchasing the ticket

> This script hasn't been fully tested yet, and it has limited functionalities for now.  
> You are not guaranteed to get the ticket you want in the end.  
> 抢票这件事情，1 分靠人力，99 分靠天命，祝好运。

1. After you install tampermonkey, open its **Dashboard**:

<img src="https://i.loli.net/2019/08/28/fkr8FWYIJEDBwqc.png" width=300>

2. In the **Dashboard** page, click the `+` icon on the left of `Installed Scripts` to enter the script editing page.

![Screenshot from 2019-08-28 21-13-22](https://i.loli.net/2019/08/28/afrFVPAKci7DJNW.png)

3. Copy and put the content of [tampermonkey.js](https://github.com/shd101wyy/project_barley/blob/master/tampermonkey.js)， which is under this GitHub repository, to the editor of tampermonkey.

![Screenshot from 2019-08-28 21-15-52](https://i.loli.net/2019/08/28/uz21NrsvKiJgmHQ.png)

4. Modify the script you just created

You may want to change the value of `@name` below `==UserScript==` from `Project Barley` to anything you like but unique.

Then change the variables `playID`, `playType`, `ticketType`, `ticketNum`, `viewers` to the value that you want.

---

For example, if you want to automate the process of purchasing the following ticket:

![Screenshot from 2019-08-28 21-42-30](https://i.loli.net/2019/08/28/zFQJKoL1TGPUiYI.png)

Change the variables to the following:

```javascript
const playID = 598182156683; // id
const playType = 1; // 场次
const ticketType = 2; // 票档
```

## After configuring the script

1. Make sure you have logged into the _stupid_ [barley](https://www.damai.cn/) website

![Screenshot from 2019-08-28 21-21-01](https://i.loli.net/2019/08/28/8uXItlowxPWCd2i.png)

2. Then open the webpage of the show that you want to watch. Right click at the webpage, choose `Inspect`(`审查元素`), then check the Console and make sure that it displays the message like `[info] 启动自动抢票脚本`.

![Screenshot from 2019-08-28 21-31-31](https://i.loli.net/2019/08/28/KSyNn4BcE2fw5Th.png)

3. You many want to open the same webpage to increase the chance of succeeding.

![Screenshot from 2019-08-28 21-35-23](https://i.loli.net/2019/08/28/KYTFOuhbq6nQyj5.png)

4. Repeat the steps in the previous section to create the script for the show(aka, play) that you want to watch.

## Notice

1. I might update the script sometimes.
2. Feel free to post GitHub issues [here](https://github.com/shd101wyy/project_barley/issues).

## License

MIT
