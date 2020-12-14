// 把页面上所有盒子的轮廓画到一个 canvas 元素上
class DrawElementBounds {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.targetEle = [];
  }

  /*
  @params
  ele string - 选择器
  target string -  要绘制盒子的目标元素选择器
  color 颜色值 - 盒子的颜色
   */
  init({ ele, target, color }) {
    this.canvas = document.querySelector(ele);
    this.canvas.width = document.documentElement.offsetWidth;
    this.canvas.height = document.documentElement.offsetHeight;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = color || 'yellow';

    let targetEle = [];
    if (!target || !target.length) {
      targetEle = [...document.querySelectorAll('*')];
    } else {
      target.forEach((ele) => {
        targetEle = [...targetEle, ...document.querySelectorAll(ele)];
      });
    }

    this.targetEle = [...targetEle];
  }

  // 绘制元素盒子
  draw() {
    const rects = this.getAllRects();
    const ctx = this.ctx;
    let i = 0;

    window.requestAnimationFrame(_draw); //浏览器重绘前执行一下

    function _draw() {
      let { x, y, width, height } = rects[i++];

      ctx.strokeRect(x, y, width, height);
      if (i < rects.length) {
        window.requestAnimationFrame(_draw); //1s重绘60次
      } else {
        console.log('dom元素遍历完了');
      }
    }
  }

  // 获取盒子的 size 相关值
  getAllRects() {
    const rects = [];
    const {
      x: htmlX,
      y: htmlY,
    } = document.documentElement.getBoundingClientRect(); //返回元素盒信息{x：x坐标，y：y坐标，width：宽度，height：高度}

    this.targetEle.forEach((ele) => {
      const eachELRects = [...ele.getClientRects()]
        .filter((rect) => {
          return rect.width || rect.height;
        })
        .map((rect) => {
          return {
            x: rect.x - htmlX,
            y: rect.y - htmlY,
            width: rect.width,
            height: rect.height,
          };
        });
      rects.push(...eachELRects);
    });

    return rects;
  }

  // 清除画布
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
