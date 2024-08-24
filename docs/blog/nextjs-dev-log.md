![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/77957ac3dc0b478ea10b7562180326c8.png#pic_center)

## 主要技术栈

本项目采用了前沿的技术栈来构建一个高性能且可维护的应用。选择了 Nx 作为构建管理和单一代码库解决方案，通过模块化和插件系统来扩展和优化开发流程、支持续集成。Next.js（App Router模式）为我们提供了服务器渲染和客户端渲染的能力，同时简化了路由配置。项目主要使用 Typescript 编写，这有助于捕捉类型错误并在编译时解决它们。

界面方面，Material UI和Tailwind CSS分别作为UI组件库和原子化CSS样式方案被引入，确保了快速且一致的UI开发体验。为了实现3D图形功能，我们集成了react-three-fiber，它是Three.js的一个 React 绑定。使用 Recoil 进行状态管理，它提供了一个直观的状态管理模型。

接口层，使用Apollo Client 来发送 GraphQL 请求和缓存，并将GraphQL转换为Cypher查询，以便与图数据库Neo4j交互。为了提高开发效率，我们还利用了 GraphQL Code Generator 来自动生成代码。关系数据库读写，采用 Prisma ORM，它可以跨多种数据库环境工作，并提供了强大的类型安全特性。

采用 Next Auth 实现用户认证。为了保证代码质量，我们引入了jest进行单元测试，eslint、commitlint和prettier用于代码风格和提交规范的检查，结合  VSCode 插件实现自动格式化、提交检查。此外，项目还探索了 WebAssembly 和 WebWorker 技术以增强应用性能

- [Nx](https://github.com/nrwl/nx) - 基于插件的单一代码库构建管理系统
- [Next.js](https://nextjs.org/) - 开发框架，采用 App Router 模式
- [Prisma ORM](https://www.prisma.io/): 支持多数据库的 Node.js and TypeScript ORM
- [Material UI](https://github.com/mui/material-ui) - UI组件库
- [Tailwindcss](https://github.com/tailwindlabs/tailwindcss) - 原子化 CSS 样式方案
- [Typescript](https://github.com/Microsoft/TypeScript) - 基于 Javascript 的编程语言
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber) - Three.js 组件
- [Apollo Client](https://github.com/apollographql/apollo-client) - **GraphQL** 客户端
- [@neo4j/graphql](https://github.com/neo4j/graphql) - 将 GraphQL 转换为 Cypher, 作为图数据库 **Neo4j** 查询执行层
- [Recoil](https://github.com/facebookexperimental/Recoil) - **状态管理**
- [Next Auth](https://github.com/nextauthjs/next-auth) - Web 认证
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)- 基于 GraphQL Schema 生成代码的工具
- 其他: jest eslint commitlint prettier WebAssembly WebWorker docker...

## Bug 坑

### 1.  Nx 19.6.2 使用 pnpm 初始化失败

执行命令：`npx create-nx-workspace --pm pnpm` 可生成代码，但无法正常运行。查看错误日志：`A project already exists in this directory`

通过与npm创建的项目对比，发现缺少 `@nx/react`

**解决**：`pn add -D @nx/react`， 之后 `nx dev app` 可运行

### 2. pnpm 用 dlx

`pn run generate` 报错：`The "path" argument must be of type string. Received undefined`

**分析**：实际执行的是 `npx prisma generate --schema=./file-path` ，可能是 npx 执行时缺少相关包或版本不一致导致。
**解决**：改用 dlx， `pnpm dlx prisma generate`

## 技巧

### 1. 自定义 VSCode 折叠显示

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/63b626ca79c74189b7ef3340b32be2cd.png)

在`.vscode/settings.json`中添加：

```json
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "*.env": "$(capture).env.*",
    "package.json": ".gitignore,.prettierrc,.prettierignore,.eslintrc.json,.eslintignore,.editorconfig......."
  }
```

---

## 欢迎合作

> 如果这篇文章对您有所帮助，欢迎点赞、分享和留言，让更多的人受益。感谢您的细心阅读，如果发现了任何错误或需要补充的地方，请随时告诉我，我会尽快处理  `^_^` 
