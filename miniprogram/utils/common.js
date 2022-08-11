const toString = Object.prototype.toString;

/**
 * 简单返回类型的小写标识
 * @param {需要判断的对象} obj 
 */
export const type = (obj) => {
  const str = toString.call(obj);

  return str.slice(8, -1).toLowerCase();
};

export const isObject = (obj) => {
  return type(obj) === 'object';
};

export const isArray = (obj) => {
  return type(obj) === 'array';
};

export const isFunction = (obj) => {
  return type(obj) === 'function';
};

/**
 * 简单的生成 json 列表
 * @param {要解析的json} json 
 */
export function getJsonDom(json) {
  // li > span 多嵌入 <span /> 主要是 rich-text 感觉对结构支持不太好
  const startArrayTag = '<ul class="json-wrap"><li class="json-item"><span class="json-item-content">[</span></li>';
  const startObjectTag = '<ul class="json-wrap"><li class="json-item"><span class="json-item-content">{</span></li>';

  const endArrayTag = '<li class="json-item"><span class="json-item-content">]</span></li></ul>';
  const endOneObjectTag = '<li class="json-item"><span class="json-item-content">},</span></li></ul>';
  const endObjectTag = '<li class="json-item"><span class="json-item-content">}</span></li></ul>'

  let resultDom = '';
  function jsonParse(obj) {
    if (isArray(obj)) {
      resultDom += startArrayTag;
      obj.forEach(o => {
        resultDom += startObjectTag;
        resultDom += getJsonDomItem(o);
        resultDom += endOneObjectTag;
      });

      resultDom += endArrayTag;
    } else {
      resultDom += startObjectTag;
      resultDom += getJsonDomItem(obj);
      resultDom += endObjectTag;
    }

    return resultDom;
  }

  return jsonParse(json);
}

function getJsonDomItem(obj, dom) {
  var tmpDom = dom !== undefined ? dom : '';
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      tmpDom += '<ul class="json-list">';
      if (isObject(obj[key])) {
        tmpDom += `<li class="json-item"><span class="json-item-content">${key}: {</span></li>`;
        tmpDom = getJsonDomItem(obj[key], tmpDom);
        tmpDom += '<li class="json-item"><span class="json-item-content">}</span></li>';
      } else {
        tmpDom += `<li class="json-item"><span class="json-item-content">${key}: ${obj[key]}</span></li>`;
      }

      tmpDom += '</ul>';
    }
  }

  return tmpDom;
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const ymd = [year, month, day].map(formatNumber).join('/');
  const hms = [hour, minute, second].map(formatNumber).join(':');

  return [ymd, hms].join(' ');
}

export function alertMethodAnnotation(action) {
  my.alert({
    content: `请检查是否打开了 ${action} 方法的代码注释`,
  });
}
