# Sys2

## 调试

需要两个命令行终端  
第一个

```bash
$ cd packages/main
$ yarn start
```

第二个

```bash
$ cd packages/sys2
$ yarn start
```

## 关于 UI 库

由于 Element-Plus 暂时不完善，优化不好，所以用 Ant-Design-Vue

## 关于样式

`index.scss` 是 element 的自定义样式。  
`index.less` 是 ant 的自定义样式。

规定：

1. 页面内的样式必须使用`scoped`关键字
2. 页面内不建议写内联样式
3. 凡需要改组件样式的，优先考虑使用 ant 中提供的变量进行修改
