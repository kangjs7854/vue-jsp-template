<!--
 * @Date: 2020-07-28 11:01:40
 * @LastEditors: kjs
 * @LastEditTime: 2020-08-13 10:07:01
 * @FilePath: \vue-jsp-template\README.md
--> 

# jsp项目中的静态页面开发

> 由于业务逻辑大部分都在jsp实现，前端要实现的就是样式和基本交互，对于一些要动态渲染dom节点的需求，还是得前端来帮忙，虽然jsp也可以实现（总不能真的只画画样式吧，那多不好意思啊）

### stage 1

> 通过createElement创建dom节点来动态渲染数据非常繁琐，令人抓狂。并且不好维护，后期需求要修改或者变动，代码可维护性极差

``` js
    const listArr = [ //这是要渲染的数据
        {
            //...
        },
        {
            //...
        }
    ]
    let liDom = document.createElement("li")
    listDom.classList.add("list-item")
    //....balabala省略好多代码
```

### stage 2 

> 使用原生js通过操作模板字符串动态生成dom节点的方式来渲染数据（es6的模板字符串方便了字符串的拼接，不需要通过传统的+号来拼接需要换行的字符串，可读性更好）

``` js
//例子
const listArr = [ //这是要渲染的数据
    {
        userId: 666,
        name: '张三',
        sex: '男',
        age: '16',
        house: '无',
        cart: '无'
    },
    {
        userId: 777,
        name: '李四',
        sex: '男',
        age: '36',
        house: '还是无',
        cart: '还是无'
    },
]

function initListDom() {
    let liDomStr = ''
    listArr.forEach(el => {
        liDomStr += `
        <li class="list-item">
            <div class="content-wrap">
                <p class="title">
                    用户id
                    <span>${el.userId}</span>
                </p>
                <ul>
                    <li>
                        <span>名字</span>
                        <span>${el.name}</span>
                    </li>
                    <li>
                        <span>性别</span>
                        <span>${el.sex}</span>
                    </li>
                    <li>
                        <span>年龄</span>
                        <span>${el.age}</span>
                    </li>
                    <li>
                        <span>房子</span>
                        <span>${el.house}</span>
                    </li>
                    <li>
                        <span>车子</span>
                        <span>${el.cart}</span>
                    </li>
                </ul>
            </div>
        </li>
        `
    })
    //listWrapDom是ul节点
    listWrapDom.innerHTML = liDomStr
}
```

这种通过拼接dom节点字符串动态渲染数据的方式避免了直接去操作dom节点插入相应的节点数据，通过数据来渲染视图

但是每次更新完数据就要手动的调用函数去更新视图, 而且拼接字符串始终有着一定的风险，容易遭受xss攻击；由于数据的更新就会触发上述例子中的ul标签内所有li标签元素的变更，引起浏览器的重排重绘，极其消耗性能，

试想一下有一千个列表，但是只需要更新列表中的一个数据内容，浏览器渲染时却要把这一千个列表重新渲染，可能一千个列表浏览器速度还够快，一万个，十万个呢

### stage 3 

> 上一个阶段已经实现了通过数据去动态渲染视图，有点现代框架的UI=render(data)思想的意思了，那有没有可能在jsp中使用现代的js框架呢？vue渐进式的特点完美的回答了问题

* 和传统的html，css，js三剑客完美契合，通过安装vscode easyless插件使用less的功能
* 通过引入cdn链接的方式使用vue的特性，指令系统非常方便，且可读性很高，便于维护
* 数据的双向绑定，响应式且高效的更新视图，不用再去繁琐地操作dom节点

```html 
  <div id="app">

        <div class="medical-Enquir contaniner">
            <ul class="list-wrap">
                <li class="list-item" v-for="(item,index) in listArr" :key="index">
                    <div class="content-wrap">
                        <p class="title">
                            用户id:
                            <span>{{item.userId}}</span>
                        </p>
                        <ul>
                            <li>
                                <span>名字</span>
                                <span>{{item.name}}</span>
                            </li>
                            <li>
                                <span>性别</span>
                                <span>{{item.sex}}</span>
                            </li>
                            <li>
                                <span>年龄</span>
                                <span>{{item.age}}</span>
                            </li>
                            <li>
                                <span>房子</span>
                                <span>{{item.house}}</span>
                            </li>
                            <li>
                                <span>车子</span>
                                <span>{{item.cart}}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <script>
        const app = new Vue({
            el: '#app',//要挂载的dom节点

            data: {//要渲染到模板的数据
                listArr: [
                    {
                        userId: 666,
                        name: '张三',
                        sex: '男',
                        age: '16',
                        house: '无',
                        cart: '无'
                    },
                    {
                        userId: 777,
                        name: '李四',
                        sex: '男',
                        age: '36',
                        house: '还是无',
                        cart: '还是无'
                    },
                ],
            },

            created() {//实例创建完的生命周期，可以发起网络请求,发送ajax请求然后赋值给data里对应的数据，视图就会自动更新
                this.initData()
            },

            mounted() {//实例挂载到页面上的生命周期，可以操作dom节点
               
            },

            methods: {//定义函数方法
                initData(){
                    
                },

                handleRefresh(){

                }
            }
        })
    </script>

```

# 热更新
> 使用vue脚手架开发项目时，通过webpack的配置我们可以实现项目的热更新，方便我们的开发，不需要在修改之后重启服务。

在使用vue开发静态页面时会遇到编写样式之后需要刷新浏览器才能查看到更新内容，非常不方便，可以安装一个插件实现静态页面的热更新

1. 安装```live server```插件

2. 点击编辑器右下角的 ```Go Live```启动服务

3. 选择html文件夹中的项目文件，开始开发使用