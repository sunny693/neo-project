/**
* @description: 常用类型检查
*/
function checkType(param) {
  if (param === null) return null;

  if (typeof param !== "object") return typeof param;

  const objTypes = [
    {
      key: 'map',
      value: Map
    },
    {
      key: 'weakmap',
      value: WeakMap,
    },
    {
      key: 'set',
      value: Set,
    },
    {
      key: 'weakset',
      value: WeakSet,
    },
    {
      key: 'array',
      value: Array,
    },
    {
      key: 'date',
      value: Date,
    },
    {
      key: 'regexp',
      value: RegExp,
    },
    {
      key: 'error',
      value: Error,
    },
    {
      key: 'promise',
      value: Promise,
    },
  ];
  let type = 'object';
  objTypes.some(({ key, value }) => {
    const bool = param instanceof value;
    if (bool) type = key;
    return bool;
  });
  return type;
}

function isObject(param) {
  return checkType(param) === 'object';
}

function assignDeep(...objects) {
  return objects.reduce((accumulator, currentValue) => {
    Object.keys(currentValue).forEach(key => {
      const pVal = accumulator[key];
      const oVal = currentValue[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        accumulator[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        accumulator[key] = assignDeep(pVal, oVal);
      } else {
        accumulator[key] = oVal;
      }
    });

    return accumulator;
  }, {});
}

export {
  checkType,
  isObject,
  assignDeep,
}