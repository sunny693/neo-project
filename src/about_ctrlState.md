quesion：
* dispatch传入的参数可能是在state基础上修改的，内存地址相同，react内部使用Object.is判断的话，是无法进行有效更新的。
  * 解决办法：在reducer中检测，传入的新state是和原state内存地址相同，则抛出错误。
* 性能优化，保证state不变的组件，不渲染




关于hooks
* useState和useReduer之间的区别
  * useReducer更底层
  * 在useReducer中，dispatch触发，发送一个action到reducer中，reducer会将action和当前的state做对比，
    * 不想更新，可以将原state返回

https://github.com/facebook/react/issues/15156#issuecomment-474590693