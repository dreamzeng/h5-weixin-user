import {isObject, isArray} from './type'
/**
 * 合并
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
const Merge = function(target){
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          //deep extend
          if(isObject(value) && !isArray(value)){
            value = Merge({},target[prop],value)
          }
          target[prop] = value;
        }
      }
    }
  }

  return target;
}

export default Merge