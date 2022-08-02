const fs = require('fs');
const en = require('./origin-text/en');
const cn = require('./origin-text/cn');
const kr = require('./origin-text/kr');
const vietnam = require('./origin-text/vietnam');

// 把项目中的js文件转为json格式文件
const langs = { en, cn, kr, vietnam};
fs.writeFileSync('./i18n/' + 'en.json', JSON.stringify(en, null, 2));
const keys = Object.keys(langs)
for (let i = 0; i < keys.length; i++) {
  fs.writeFileSync('./i18n/' + keys[i] + '.json', JSON.stringify(langs[keys[i]], null, 2));
}
