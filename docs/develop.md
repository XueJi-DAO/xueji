# 开发说明

基础理论：人机交互、知识管理、知识工程、认知心理、人工智能、众包协作。  
核心技术：增强学习、知识图谱、语义计算、抽取集成、知识表示、自然语言理解、物理引擎、情感分析、检索推荐、区块链、数据可视化、3D。
迭代开发：启动、计划、任务看板、极限编程、持续集成部署，需求、设计、开发、测试、评审、交付、沟通会议。

## 技术架构

架构: 前端多插件的单核应用引擎 + 后台多智能体微服务 + 神经网络 + 知识图谱

交互层(智能文档,数字人,DSL)
接口层(Api,RPC,websocket,DSL)
服务层(文档服务, 虚拟空间, 知识管理, 贡献积分, DAO 组织, 项目任务, GTD, 资源管理, 版本)
引擎层(DSL,智能体, 语义计算, 知识图谱, 流程引擎, 即时通讯, 消息队列, 数据存储, 认证, 权限, 加密)
数据层(组件, 文档, 数据, 图数据库+向量数据库, 开发库框架, 算法)

## 技术选型

Reactjs,Nextjs,MUI,emotion,Ts,impressjs,markdown-it,slatejs,threejs,twojs,d3js,openlayers,apollo,apisix,neo4j,quarkus

https://github.com/alibaba/yalantinglibs

### 前端

https://ahooks.js.org/hooks/use-request/index

## 注意事项

- 不要直接将服务器组件导入客户端组件使用，将服务器组件作为参数传递给客户端组件
- 为了防止客户端对服务器代码的意外使用，可以使用`import 'server-only'`产生一个构建时错误。

### 后端

服务层：quarkus
Dapp 公链：conflux
调用百度人工智能服务实现可视化智能交互的：
https://ai.baidu.com/bml/app/overview 深度学习平台
https://ai.baidu.com/ai-doc/UNIT/Lkipmh0tz 对话平台

### 可视化

绘图 2D

- https://github.com/fabricjs/fabric.js: is a framework that makes it easy to work with HTML5 canvas element.
- https://github.com/konvajs/konva: an HTML5 Canvas JavaScript framework
- https://github.com/jonobr1/two.js: same api to render in multiple contexts: webgl, canvas2d, and svg.
- https://github.com/svgdotjs/svg.js 用于操作 SVG 和制作动画的轻量级库。
- https://github.com/timmywil/panzoom: uses CSS transforms add panning and zooming functionality to an element
- https://github.com/chrvadala/react-svg-pan-zoom: adds pan and zoom features to the SVG images.
- https://github.com/paperjs/paper.js: — The Swiss Army Knife of Vector Graphics Scripting. SVG
- https://github.com/anseki/leader-line
- https://github.com/anseki/plain-draggable

3D:

- https://github.com/oframe/ogl: Minimal WebGL library
- https://github.com/mrdoob/three.js/
- react-three-fiber:three.js 的 react 封装

图表：

- https://github.com/apache/echarts:可高度个性化定制的数据可视化图表。
- https://github.com/d3/d3: 是一个数据可视化的库，
- https://github.com/recharts/recharts: built with React and D3.
- https://github.com/vega/vega: 数据可视化描述语言

思维导图：图数据

- https://antv.vision/zh
- https://github.com/antvis/XFlow: 图分析
- https://github.com/antvis/graphin: 图编辑
- https://graphin.antv.vision/solution/knowledge-graph
- https://cambridge-intelligence.com/use-cases/

动画：

- https://github.com/pixijs/pixijs 2d 动画游戏，pixi.js，a fast lightweight 2D library that works across all devices.
- 3D 游戏：Babylon.js: a complete JavaScript framework for building 3D games with HTML 5 and WebGL
- tweenjs 动画效果 https://github.com/tweenjs/tween.js 它支持数值对象属性和 CSS 样式属性的渐变。
- TagCanvas - HTML5 Canvas Tag Cloud 标签云
- react-spring（css 动效）https://github.com/drcmda/react-spring
- Granim.js – 超赞的流体渐变动画
- impress.js 一统江湖的大前端——PPT 制作库 impress.js 。画板页面切换 https://impress.js.org/#/bored reveal.js 文档演示

地图：

- Leaflet:https://github.com/Leaflet/Leaflet
- openlayers:https://github.com/openlayers/openlayers

## 参考项目

``` md
https://github.com/ianstormtaylor/slate
https://docs.omniverse.nvidia.com/index.html
https://github.com/enisdenjo/graphql-ws
https://github.com/ianstormtaylor/slate
https://github.com/yjs/yjs
https://github.com/apollographql
https://github.com/pmndrs/jotai、zustand
https://github.com/trpc/trpc
https://github.com/tldraw/tldraw
https://github.com/pmndrs/drei
```

## 代码检查与格式化

- eslint-config-prettier 关闭所有不必要的或可能与 pretty 冲突的规则。这个配置只关闭规则，所以只有将它与其他配置一起使用才有意义

``` sh
安装：pnpm install --save-dev eslint-config-prettier
  "extends": [
    "some-other-config-you-use",
    "prettier" 确保把它放在最后，这样它就有机会覆盖其他配置。可使用下面 eslint-plugin-prettier 的推荐配置替代该行
  ]
```

- eslint-plugin-prettier 作为 ESLint 规则运行 pretty。这个插件附带了一个 plugin:prettier/recommended Config，可以一次性设置插件和 eslint-config-prettier。

``` json
{
  "extends": ["plugin:prettier/recommended"]
}
等价于:
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```
