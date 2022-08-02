const translate = require('../core/index');
const originText = require('./origin-text/cn')
const fs = require('fs')

async function translateText(text, single) {
  const langs = ['en', 'ko', 'vi'];
  const names = ['en', 'kr', 'Vietnam'];

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    let data = await translate.translateFac(text, lang);

    console.log(names[i] + ' 翻译完成',data);
    if (single) {
      console.log(names[i] + ': ' + data);
      continue
    }
    // fs.writeFileSync(
    //   '../i18n/' + names[i] + '.js',
    //   JSON.stringify(data, null, 2)
    // );
    console.log(names[i] + ' 执行成功');
  }
}
// translateText(originText);
translateText(originText);

