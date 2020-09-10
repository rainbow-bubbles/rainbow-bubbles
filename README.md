# rainbow-bubbles

[rainbow-bubbles](https://rainbow-bubbles.github.io/) is a wave component on Vue by [z7xisoo](https://z7xisoo.com/) in [github](https://github.com/rainbow-bubbles).

## Install

```sh
npm i --save rainbow-bubbles
```

```js
import RainbowBubbles from 'rainbow-bubbles'
```

## Usage

```html
<rainbow-bubbles :config="config" :bubbles="bubbles"></rainbow-bubbles>
```

## Options


- [x] config

| key|type|default|use|
| -------- |-----:|:----:|:----:|
| el|String|"rainbow-bubbles"|canvas id|
| new|Boolean|true|create new canvas|
| clear|Boolean|true|clear canvas when animation|
| width|Number|1920|canvas width|
| height|Number|1080|canvas height|
| move|Boolean|true|mouse interaction|
| blow|Boolean|true|automatic explosion|
| background|Object|{...}|canvas background|

- [x] background

| key|type|default|use|range|
| -------- |-----:|:----:|:----:|:----:|
| type|String|""|type|"color","image","gradient"|
| color|String Array|""|color|-|
| position|Array|""|image-gradient-positon|[0,0,width,0]|
| src|String|""|image-url| "color","image","gradient" |
| repetition|String|""|image-repetition| "repeat","repeat-x","repeat-y","no-repeat" |


```js
import image from "rainbow-bubbles.png";

background = {
  type: "gradient",
  color: ["red", "orange", "green", "blue"],
  position:[0,0,1920,1080]
};

background = {
  type: "image",
  src:image,
  repetition:"repeat", // "repeat","repeat-x","repeat-y","no-repeat"
};

background = {
  type: "color",
  color: ["red", "orange", "green", "blue"],
};

background = {
  type: "color",
  color: "green",
};

```

- [x] bubbles

| key|type|default|use|
| -------- |-----:|:----:|:----:|
| max|Object|{...}|big bubbles config|
| min|Object|{...}|explosion bubbles config|

- [x] bubbles - max

| key|type|default|use|
| -------- |-----:|:----:|:----:|
| number|Number|3|每次生成气泡的数量|
| rate|Number|0.1|生成气泡频率|
| radius|Array|[15,20]|生成气泡半径范围|
| blowHeight|Number|0.6|气泡爆炸高度占比|
| background|Object|{...}|bubbles background|



- [x] bubbles - min

| key|type|default|use|
| -------- |-----:|:----:|:----:|
| show|Boolean|true|是否生成小气泡|
| number|Number|4|每次生成气泡的数量|
| radius|Array|[1,1]|生成气泡半径范围|
| background|Object|{...}|bubbles background|



## LICENSE

MIT

----
                
![](https://raw.githubusercontent.com/rainbow-bubbles/rainbow-bubbles.github.io/master/rainbow-bubbles.jpg)

