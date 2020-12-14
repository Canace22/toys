const randValue = (start, end) => {
  if (start >= end || Number.isNaN(start) || Number.isNaN(end)) {
    console.error('error argument in randomValue');
    return Math.random();
  }
  return Math.random() * (end - start) + start;
};

const randList = (list, length) => {
  let copyList = [...list];
  if (length > list.length) {
    console.error('error argument in randomList');
    return list;
  }
  const newList = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(randValue(0, copyList.length));
    newList.push(copyList[randomIndex]);
    copyList[randomIndex] = null;
    copyList = copyList.filter((ele) => ele);
  }
  return newList;
};

class Fireworks {
  constructor(canvasDom) {
    this.fireworks = canvasDom;
    this.fires = [];
    this.fillStyle = 'rgba(66, 134, 244)';
    this.colorList = [
      'rgb(66, 134, 244)',
      'rgb(0,0,0)',
      'rgb(65, 244, 214)',
      'rgb(244, 169, 65)',
      'rgb(244, 94, 65)',
      'rgb(148, 65, 244)',
      'rgb(224, 47, 129)'
    ];
    this.lastCheckTime = Date.now();
    this.fireworks.width = window.innerWidth;
    this.fireworks.height = window.innerHeight;
    this.ctx = this.fireworks.getContext('2d');
  }
  init() {
    for (let i = 0; i <= Math.floor(randValue(1, 3)); i++) {
      this.createFire();
    }
    this.lastCheckTime = Date.now();
    this.draw();
  }
  createFire() {
    const pos = [randValue(150, window.innerWidth - 150), randValue(100, 400)];

    for (let i = 0; i <= 100; i++) {
      setTimeout(() => {
        this.createFirePoint(pos);
      }, randValue(0, (i + 1) * 10));
    }
  }
  createFirePoint(pos) {
    const xSpeed = randValue(-2, 2);
    const ySpeed = randValue(-2, 2);

    if (Math.pow(xSpeed, 2) + Math.pow(ySpeed, 2) >= 4) return;

    const fire = {
      style: randList(this.colorList, 1)[0],
      fade: false,
      pair1: {
        pos: [...pos],
        gravitySpeed: 0,
        xSpeed,
        ySpeed
      },
      pair2: {
        pos: [...pos],
        gravitySpeed: 0,
        xSpeed: -xSpeed,
        ySpeed: -ySpeed
      }
    };

    this.fires.push(fire);
  }
  draw () {
    this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.fires.forEach((fire) => {
      if (fire.fade) return;
      this.update(fire);
      const { pair1, pair2, style } = fire;
      this.drawPair(pair1, style);
      this.drawPair(pair2, style);
    });
    this.healthCheck();
    this.timeID = window.requestAnimationFrame(() => {
      this.draw();
    });
  }
  update(fire) {
    const { pair1, pair2 } = fire;
    this.updatePos(pair1);
    this.updatePos(pair2);
    this.gravity(pair1);
    this.gravity(pair2);
    if (pair1.gravitySpeed >= 1 || pair2.gravitySpeed >= 1) {
      fire.fade = true;
    }
  }
  updatePos(pair) {
    pair.pos = [pair.pos[0] + pair.xSpeed, pair.pos[1] + pair.ySpeed];
  }
  gravity(pair) {
    pair.gravitySpeed += 0.01;
    pair.pos[1] += pair.gravitySpeed;
  }
  drawPair(pair, style) {
    const prefillstyle = this.ctx.fillStyle;
    this.ctx.fillStyle = style;
    this.ctx.beginPath();
    this.ctx.arc(pair.pos[0], pair.pos[1], 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.fillStyle = prefillstyle;
  }
  healthCheck() {
    if (Date.now() - this.lastCheckTime <= 1000) return;

    this.lastCheckTime = Date.now();

    this.fires = this.fires.reduce((fireList, fire) => {
      fire.fade ? (fire = null) : fireList.push(fire);
      return fireList;
    }, []);

    if (this.fires.length >= 30) return;

    for (let i = 0; i <= Math.floor(randValue(1, 3)); i++) {
      this.createFire();
    }
  }
}

const canvasDom = document.querySelector('#canvas');
const fireworks = new Fireworks(canvasDom);
fireworks.init();
