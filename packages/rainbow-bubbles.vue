<template>
  <div v-if="createCanvas" class="rainbow-bubbles">
    <canvas :id="elId" />
  </div>
</template>

<script>
export default {
  name: "rainbow-bubbles",
  props: {
    config: {
      type: Object,
    },
    bubbles: {
      type: Object,
    },
  },
  computed: {
    createCanvas() {
      if (this.config && this.config.hasOwnProperty("new")) {
        return this.config.new;
      }
      return true;
    },
    elId() {
      if (this.config && this.config.hasOwnProperty("el")) {
        return this.config.el;
      }
      return "rainbow-bubbles";
    },
  },
  watch: {
    config: {
      handler() {
        this.drow();
      },
      deep: true,
    },
    bubbles: {
      handler() {
        this.drow();
      },
      deep: true,
    },
  },
  mounted() {
    this.drow();
  },
  methods: {
    drow() {
      // 初始化
      let canvas = null;
      let ctx = null;
      let mouse = {
        x: 0,
        y: 0,
      };
      let bubbles = [];
      let minibubbles = [];
      let width = 0;
      let height = 0;

      // 配置项
      let {
        new: create,
        el,
        move,
        blow,
        clear,
        width: xW,
        height: xH,
        background,
      } = {
        new: true,
        clear: true,
        el: "rainbow-bubbles",
        width: 1920,
        height: 1080,
        move: true,
        blow: true,
        background: {
          type: "gradient",
          color: ["red", "orange", "green", "blue"],
          position: [0, 0, 1920, 1080],
        },
        ...this.config,
      };

      // 获取画布
      canvas = document.getElementById(el);
      // 未找到指定元素
      if (!canvas) throw new Error(`指定ID为 ${el} 的元素未找到`);
      if (!canvas) return;
      ctx = canvas.getContext("2d");

      // 配置 画布
      if (create) {
        canvas.width = width = xW;
        canvas.height = height = xH;
      } else {
        width = canvas.width;
        height = canvas.height;
      }
      // 设置背景
      function setColor(background) {
        // 未找到指定元素
        if (!ctx) throw new Error(`未找到‘canvas’, getContext 错误`);
        if (!ctx) return;
        switch (background.type) {
          case "color":
            ctx.fillStyle = background.color;
            break;
          case "gradient":
            const [o1, o2, o3, o4] = background.position;
            const gradient = ctx.createLinearGradient(o1, o2, o3, o4);
            const l = background.color.length;
            background.color.forEach((x, k) => {
              gradient.addColorStop(k / l, x);
            });
            ctx.fillStyle = gradient;
            break;
          case "image":
            let img = new Image();
            img.src = background.src;
            ctx.fillStyle = ctx.createPattern(img, background.repetition);
            break;
        }
      }
      // 监听鼠标事件
      function moveFN(e) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
      }
      if (move) {
        canvas.addEventListener("mousemove", moveFN);
      }

      class Bubbles {
        constructor(x, y, radius, background) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.background = background;
          this.gravityY = Math.floor(Math.random() * 8 + 2);
        }
      }

      Bubbles.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        setColor({
          ...this.background,
          position: [
            this.x - this.radius,
            this.y - this.radius,
            this.x + this.radius,
            this.y + this.radius,
          ],
        });
        ctx.fill();
        ctx.closePath();
      };

      Bubbles.prototype.update = function () {
        this.y -= this.gravityY;
        this.draw();
      };

      class miniBubbles {
        constructor(x, y, radius, background) {
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.background = background;
          this.gravityX = (Math.random() - 0.5) * 0.5;
          this.gravityY = (Math.random() - 1) * 3;
          this.timeToLive = 100;
        }
      }

      miniBubbles.prototype.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        setColor({
          ...this.background,
          position: [
            this.x - this.radius,
            this.y - this.radius,
            this.x + this.radius,
            this.y + this.radius,
          ],
        });
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      };
      miniBubbles.prototype.update = function () {
        this.x += this.gravityX;
        this.y += this.gravityY;
        this.timeToLive -= 1;
        this.draw();
      };

      // 配置项
      const { max, min } = { max: {}, min: {}, ...this.bubbles };
      const {
        max: {
          number: maxNumber,
          rate: maxRate,
          radius: maxRadius,
          blowHeight: maxBlowHeight,
          background: maxBackground,
        },
        min: {
          show: minShow,
          number: minNumber,
          radius: minRadius,
          background: minBackground,
        },
      } = {
        max: {
          number: 3,
          rate: 0.1,
          radius: [15, 20],
          blowHeight: 0.6,
          background: {
            type: "color",
            color: ["blue", "red", "orange", "green"],
          },
          ...max,
        },
        min: {
          show: true,
          number: 4,
          radius: [1, 1],
          background: {
            type: "color",
            color: "#fff",
          },
          ...min,
        },
      };

      // 随机生成气泡半径
      function getRadius([min, max]) {
        return Number((Math.random() * (max - min + 1) + min).toFixed(2));
      }
      // 生成小气泡
      function miniboo(x, y) {
        let minir = getRadius(minRadius);
        for (let k = 0; k < minNumber; k++) {
          minibubbles.push(new miniBubbles(x, y, minir, minBackground));
        }
      }
      toooo();
      function toooo() {
        // 清空画布
        if (clear) ctx.clearRect(0, 0, width, height);
        if (create){
          setColor(background);
        }else{
          setColor({
            type:"color",
            color:"rgba(0,0,0,0)"
          });
        }
        ctx.fillRect(0, 0, width, height);

        if (Math.random() * 10 > 10 - maxRate) {
          for (let index = 0; index < maxNumber; index++) {
            const radius = getRadius(maxRadius);
            const x = Math.max(radius, Math.random() * width - radius);
            const y = canvas.height + 100;
            let color = bubbles.push(
              new Bubbles(x, y, radius, {
                ...maxBackground,
                color:
                  maxBackground.type === "color" &&
                  Array.isArray(maxBackground.color)
                    ? maxBackground.color[
                        Math.ceil(
                          Math.random() * (maxBackground.color.length - 1)
                        )
                      ]
                    : maxBackground.color,
              })
            );
          }
        }

        // 生成大气泡
        bubbles.forEach((bubble, index) => {
          if (bubble.radius) {
            bubble.update();
          } else {
            bubbles.splice(index, 1);
          }
        });
        // 鼠标 或者 自动爆炸 交互
        if (move || blow) {
          for (let i = 0; i < bubbles.length; i++) {
            let x = bubbles[i].x;
            let y = bubbles[i].y;
            let or = bubbles[i].radius;
            let oX = mouse.x;
            let oY = mouse.y;
            // 鼠标触碰破碎效果
            if (
              move &&
              oX > x - or &&
              oX < x + or &&
              oY > y - or &&
              oY < y + or
            ) {
              bubbles[i].radius = 0;
              // 是否出线小气泡
              if (minShow) miniboo(x, y);
            }

            // 到达一定高度自动爆破碎效果
            if (blow && y < canvas.height * maxBlowHeight) {
              bubbles[i].radius = 0;
              // 是否出线小气泡
              if (minShow) miniboo(x, y);
            }
          }
        }
        // 遍历小气泡
        // 是否需要展示小气泡
        if (minShow) {
          minibubbles.forEach((minibubble, index) => {
            minibubble.update();
            if (minibubble.timeToLive == 0) {
              minibubbles.splice(index, 1);
            }
          });
        }
        requestAnimationFrame(toooo);
      }
    },
  },
};
</script>