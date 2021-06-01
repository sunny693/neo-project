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
    {
      key: 'event',
      value: Event,
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

function isType(param, type = 'object') {
  return checkType(param) === type;
}

function assignDeep(...objects) {
  return objects.reduce((accumulator, currentValue) => {
    Object.keys(currentValue).forEach(key => {
      const pVal = accumulator[key];
      const oVal = currentValue[key];

      // if (Array.isArray(pVal) && Array.isArray(oVal)) {
      //   accumulator[key] = pVal.concat(...oVal);
      // } else 
      if (isType(pVal) && isType(oVal)) {
        accumulator[key] = assignDeep(pVal, oVal);
      } else {
        accumulator[key] = oVal;
      }
    });

    return accumulator;
  }, {});
}

/**
 * @description 判断俩个变量关系
 * @returns
 *  equal 简单类型 相等
 *    包含 undefined
 *  different 不同
 *  same 非简单类型，内存地址相同
 *    包含 null
 *  similar 非简单类型，内存地址不同，数据一致
*/
function variableRelation(...rest) {
  if (rest.length < 2) throw new Error('Util-variableRelation: Missing parameter!');

  const [param1, param2] = rest;

  if (checkType(param1) !== checkType(param2)) return 'different';

  const deterministicType = (t, p = param1) => isType(p, t);

  if (typeof param1 !== 'object' && typeof param2 !== 'object') {

    if (deterministicType('function')) return String(param1) === String(param2) ? 'equal' : 'different';

    if (isNaN(param1) && isNaN(param2)) return 'equal';

    //includes symbol
    return param1 === param2 ? 'equal' : 'different';
  }

  if (param1 === param2) return 'same';



  if (deterministicType('date') && +param1 === +param2) return 'similar';

  if (deterministicType('regexp') && String(param1) === String(param2)) return 'similar';

  if (deterministicType('array')) {
    if (param1.length !== param2.length) return 'different';

    if (param1.some((v, i) => !isEqual(v, param2[i]))) return 'different';

    return 'similar';
  }

  if (deterministicType('object')) {
    const param1Keys = Object.getOwnPropertyNames(param1);
    const param2Keys = Object.getOwnPropertyNames(param2);

    if (param1Keys.length !== param2Keys.length) return 'different';

    if (param1Keys.some((v, i) => !isEqual(param1[v], param2[v]))) return 'different';

    return 'similar';
  }

  return 'different';

}

function isEqual(...rest) {
  return variableRelation(...rest) !== 'different';
}

function compose(...rest) {
  if (rest.length === 0) return;
  if (rest.length === 1) return rest[0]();

  const params = rest.pop();
  const funcs = rest;

  return funcs.reduce((acc, func) => func(acc), params);
}

export {
  checkType,
  isType,
  assignDeep,
  variableRelation,
  isEqual,
  compose,
}