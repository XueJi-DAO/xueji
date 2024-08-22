
# Nx 单一代码库构建系统

> 单一代码仓库：一种将多个项目或代码库存储在同一个版本控制系统中的策略，以便于跨项目协作和代码共享。

Nx is a powerful open-source build system that provides tools and techniques for enhancing developer productivity, optimizing CI performance, and maintaining code quality.

Nx是一个强大的开源构建系统，它提供了用于提高开发效率、优化持续集成CI和提高代码质量的工具和技术。

# 一、Nx 设计理念

Nx 的设计理念与 Visual Studio Code 类似。VSCode 是一个强大的文本编辑器，即使你不安装任何扩展，你也可以使用它非常高效。VSCode 的扩展生态系统可以真正提高你的工作效率。

Nx 的核心是通用的、简单的和透明的。Nx 插件尽管对许多项目非常有用，但完全是可选的。Nx 是一个 VSCode 的构建工具，具有强大的核心，由元数据驱动，并通过插件进行扩展。

# 二、Nx 核心概念

## 1. 项目图 - Project graph

项目图用于反映库中的源代码和所有不在库中创建的外部依赖项（如Webpack、React、Angular等）。Nx会存储缓存的项目图，所以它只会重新分析你修改过的文件。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/faa68bebcd6b2fef7b1094af1320c810.png)

## 2.元数据驱动 - Metadata driven

Nx中的所有东西都带有元数据，以支持工具可用性性。默认值、验证、自动完成工作等等都在模式中定义，而不是在代码中定义。

## 3. 任务图 - Task graph

Nx基于项目图来创建任务图。每当你运行任何东西时，Nx都会从项目图中创建一个任务图，然后执行该图中的任务。但任务图与项目图不要求相同结构如，运行 `nx run-many --target=test --projects=app1,app2,lib`
 生成的任务图：尽管app1依赖于 lib，但 app1:test不依赖于lib:test。这意味着两个任务可以并行运行，提高整体执行时间：![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f5266788e4587aec111739e102d2162b.png)

## 4.受影响指令 Affected commands

 随着工作空间的增长，重新测试所有项目会变得太慢。 为了解决这个问题，Nx实现了代码变更分析，以获得需要重新测试的最小项目集。

 ```nx affected --target=test```
 ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e3258d9d774c98aba72f4126af3877ee.png)

## 5. 计算缓存 - Computation hashing and caching

Nx支持计算缓存，不会重复执行相同的计算。 这个计算缓存是可插拔的，并且可以分布式运行。
Nx按照正确的顺序运行任务图中的任务。在运行任务之前，Nx会计算它的哈希值。只要哈希值相同，运行任务的输出也相同。如果 Nx 没有找到这个计算，Nx 运行这个任务，完成后，它获取输出和终端输出，并将其存储在本地(如果是远程配置的话)，所有这些对用户都是透明的。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a7ad39ebe8911a948a92f0455826481b.png)

# 三、常用指令

## 1. 创建工作区

`npx create-nx-workspace@latest`
指定创建参数 -preset 预设：
`npx create-nx-workspace --preset=core`

## 2.代码生成

`nx generate <collection:generator>`

参数：dryRun ，只展示结果给，不实际生成本地文件

## 3. 执行任务

`nx run <target> [options]`

## 4. 项目图

`nx graph`

## 5. 已安装插件

`nx list [plugin]`

# 目录结构

```
myorg/
├── apps/
├── libs/
├── tools/
├── workspace.json
├── nx.json
├── package.json
└── tsconfig.base.json
```

- apps/ 应用源码，建议尽量保持应用源码简洁，通用逻辑放到库源码中
- libs/  库源码
- tools/ 常用工具，如 数据库脚本、工作区代码生成器脚本等
- workspace.json 列出当前工作区的所有项目（可选）
- nx.json Nx Cli的配置文件，如缓存及任务执行设置
- tsconfig.base.json TypeScript全局设置

# 参考

- [Nx官网文档](https://nx.dev/getting-started/intro)
- [Monorepo](https://www.jianshu.com/p/c10d0b8c5581)， 意思是在版本控制系统的单个代码库里包含了许多项目的代码。这些项目虽然有可能是相关的，但通常在逻辑上是独立的，并由不同的团队维护。
