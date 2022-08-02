const translate = require('@vitalets/google-translate-api');

// const langs = {
//     en: require('../i18n/en.json'),
//     ko: require('../i18n/kr.json'),
//     vi: require('../i18n/Vietnam.json')
//   };
async function translateFac(text, lang = 'en') {
  let resp = {};
  // 翻译字符串
  if (typeof text === 'string') {
    try {
      const res = await translate(text, { from: 'zh-CN', to: lang });
      resp = res.text;
    } catch (err) {
      console.log(err);
    }
    return resp;
  }
  // 翻译本地 json 对象
  const keys = Object.keys(text);
  // 递归翻译每一个字段
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    let item = text[key];
    // let langItem = langs[lang][key] || '';

    if (typeof item === 'string') {
      // if (langItem) {
      //   item = langItem;
      // } else {
      //   try {
      //     const res = await translate(item, { from: 'zh-CN', to: lang });
      //     item = res.text;
      //   } catch (err) {
      //     console.log(err);
      //     break;
      //   }
      // }
      try {
        const res = await translate(item, { from: 'zh-CN', to: lang });
        item = res.text;
      } catch (err) {
        console.log(err);
        break;
      }
    } else {
      item = await translateFac(item, lang);
      langItem = item;
    }

    resp[key] = item;
  }

  return resp;
}

exports.translateFac = translateFac;
