/**
 * 创建api对象
 */
let Api = {};

let requireContext = require.context('./', false, /\.api.js$/);
requireContext.keys().forEach(path => {
  let apiObject = requireContext(path).default;
  if(apiObject){
    let key = path.match(/\.\/(\w+).api/)[1];
    Api[key] = apiObject;
  }
  
});

export default Api;
