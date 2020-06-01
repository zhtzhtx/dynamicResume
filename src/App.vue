<template>
  <div id="app">
    <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
    <ResumeEditor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></ResumeEditor>
  </div>
</template>

<script>
import StyleEditor from "./components/StyleEditor";
import ResumeEditor from "./components/ResumeEditor";
import "./assets/reset.css";

export default {
  name: "App",
  components: {
    StyleEditor,
    ResumeEditor
  },
  data() {
    return {
      interval: 20,
      currentStyle: "",
      enableHtml: false,
      fullStyle: [
        `/*
* Inspired by http://strml.net/
* 大家好，我是张瀚庭
* 今天让我为大家演示如何使用html制作一份好看的简历！
* 闲话不多说，让我们开始吧
*/
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); 
  background: rgb(0,43,54);
}
/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}

/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历代码了 */
`,
`
/* 将代码转换为HTML就行了
 * 现在我的简历主体已经完成了，但看上非常粗糙
 * 我需要为它添加样式，使它精美起来
 */
`,
`
/* 首先设置整个简历为网格布局 */
.resumeMain{
  display: grid;
  grid: auto auto auto / 1fr 1.7fr;
}
/* 设置顶部网格布局 */
header {
    grid-column: 1 / 3;
    grid-row: 1;
}
/* 设置主体内容网格布局 */
main {
  display: grid;
  grid: 140px 300px auto / auto;
  grid-column: 2;
  grid-row: 2;
}
/* 设置副体内容网格布局 */
aside {
  display: grid;
  grid: 140px auto / auto;
  grid-column: 1;
  grid-row: 2;
}
/* 设置文章内容网格布局 */
article {
  display: grid;
  grid: auto auto / auto;
  grid-column: 1 / 3;
  grid-row: 3;
}
/* 好了，简历整体布局已经完成
 * 接下来，需要为各个部分详细地添加样式
 * 首先是简历整体样式
 */
.resumeMain{
  font: 14px/1.5 Arial;
  color: #333;
  padding-bottom: 30px;
}
/* 其次是设置顶部样式 */
header {
  text-align: center;
  padding: 30px;
  background: rgb(0, 43, 54);
  color: #fff;
}
/* 设置顶部姓名样式 */
header figcaption {
  font-weight: bold;
  margin-top: 10px;
}
/* 设置顶部职位样式 */
header figure p {
  margin-top: 10px;
  color: #ccc;
}
/* 接下来是设置文章内部的网格布局 */
section .timeline-panel {
  display: grid;
  grid: auto auto auto / 120px 1fr auto;
  align-items: center;
  margin-top: 16px;
}
/* 设置文章详细内容的网格布局*/
section>.detail {
  grid-row: 2;
  grid-column: 2/span 2
}
/* 设置日期的网格布局 */
section .timeline-panel .date {
  grid-column: 1 / 4;
  grid-row: 2;
}
/* 设置文章标题的网格布局 */
section .timeline-panel>h3 {
  grid-column: 1 / 3;
  grid-row: 1;
}
/* 设置文章介绍的网格布局 */
section .timeline-panel .intro {
  grid-column: 3;
  grid-row: 1;
  color: #666;
}
/* 设置文章详情的网格布局 */
section .timeline-panel .detail {
  grid-column: 1 / 4;
  grid-row: 3;
  margin-top: 10px;
}
/* 是不是看上去整齐了好多呢
 * 然后是我们需要为文章内容设置样式
 * 让整个简历告别单调的白色
 */
section {
  display: grid;
  grid: 30px auto / 50px 120px 1fr;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
}
/* 设置文章图标样式 */
section>.iconfont {
  grid-row: 1;
  grid-column: 1;
  display: block;
  width: 30px;
  height: 30px;
  background: #66a9a3;
  border-radius: 50%;
  font-size: 20px;
  text-align: center;
  color: #fff;
}
/* 设置基本信息中小图标样式 */
section .icon-list {
  display: flex;
  align-items: center;
}
section .icon-list .iconfont {
  font-size: 20px;
  margin-right: 10px;
}
/* 设置文章标题样式 */
section>h2 {
  grid-row: 1;
  grid-column: 2;
  font-size: 18px;
  font-weight: bold;
}
/* 设置文章装饰线样式 */
section>hr {
  grid-row: 1;
  grid-column: 3;
  border: none;
  height: 3px;
  background: #66a9a3;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 最后去掉超链接的默认下划线 */
a:link {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
/* 大功告成！
 * 不知道你是否喜欢这份简历呢？
 * 如果喜欢就请联系我吧！
 */
`
  ],
  currentMarkdown: "",
  fullMarkdown: 
`   
<div class="resumeMain"> 
  <header>
    <figure>
        <figcaption>张瀚庭</figcaption>
        <p>应聘前端工程师</p>
    </figure>
  </header>
  <main style="margin-left:5px">
    <section>
        <span class="iconfont icon-education"></span>
        <h2>教育经历</h2>
        <hr>
        <div class="detail">
            <div class="timeline-panel">
                <div class="date">09/2014~07/2018</div>
                <h3>南京信息工程大学</h3>
                <p class="intro">测控技术与仪器</p>
                <div class="detail">
                    校学生会成员，曾获校三好学生称号.
                </div>
            </div>
        </div>
    </section>
    <section>
        <span class="iconfont icon-experience"></span>
        <h2>工作经历</h2>
        <hr>
        <div class="detail">
            <div class="timeline-panel">
                <div class="date">03/2018~07/2019</div>
                <h3>南京华脉科技股份有限公司</h3>
                <p class="intro">前端工程师</p>
                <div class="detail">
                    <ul>
                        <li>
                          根据UI设计师提供的设计图，使用Vue框架进行模块化开发，完成公司Web产品页面
                          的制作
                        </li>
                        <li>与后端工程师合作，实现项目需求，为客户提供优秀的产品体验</li>
                        <li>与产品经理合作，对公司Web产品进行维护和升级，优化产品的前端性能</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  </main>
  <aside>
    <section>
        <span class="iconfont icon-personal"></span>
        <h2>基本信息</h2>
        <hr>
        <div class="detail">
            <div class="icon-list"><span class="iconfont icon-phone"></span>18795875153</div>
            <div class="icon-list"><span class="iconfont icon-email">
            </span>790536079@qq.com</div>
            <div class="icon-list"><span class="iconfont icon-education-small"></span>本科</div>
        </div>
    </section>
    <section>
        <span class="iconfont icon-introduction"></span>
        <h2>掌握技能</h2>
        <hr>
        <div class="detail">
            <ul>
                <li>掌握HTML5/CSS3，熟悉传统布局、<span style="color:darkorange">Flex布局</span>、<span
                        style="color:darkorange">Grid布局</span>、移动端适配等</li>
                <li>熟悉<span style="color:darkorange">Vue</span>技术栈如Vue-Router、<span
                        style="color:darkorange">Vuex</span>、Vue-CLI及相关流行库的使用，理解其重要概念</li>
                <li>熟悉<span style="color:darkorange">React</span> / <span style="color:darkorange">React hook</span>
                    / <span style="color:darkorange">Redux</span>技术栈等使用，能够使用React进行基本开发</li>
                <li>熟悉<span style="color:darkorange">typescript</span>，能够在Vue和React中使用typescript进行开发</li>
            </ul>
        </div>
    </section>

  </aside>
  <article>
    <section>
        <span class="iconfont icon-project"></span>
        <h2>项目经历</h2>
        <hr>
        <div class="detail">
            <div class="timeline-panel" > 
                <div class="date">11/2018~07/2019</div>
                <h3>南京华脉科技智慧路灯管理系统</h3>
                <div class="detail">
                    <ul>
                        <li style="color:darkorange">技术栈：Vue、Vue-router、Vuex、Layui、ECharts、Stylus、Flex布局</li>
                        <li>项目介绍：
                            "智慧路灯"系统是南京华脉科技股份有限公司响应南京市政府"智慧城市"政策，自主研发搭建的道路监测系统。
                            该项目采用前后分离的技术方案，我负责的是第一期智慧路灯管理后台，使用Vue技术栈对页面进行编写和跟后端的数据交互。
                        </li>
                        <li> 项目成果: <br />
                            1.使用了Vuex对后端交互的数据进行集中的存储管理，提升了代码的可读性，利于项目后期的维护升级。<br />
                            2.使用了Stylus预处理器对CSS进行了优化，使CSS样式层复用、减少冗余代码，提高样式代码的可维护性。<br />
                            3.使用了Flex布局，配合rem完成不同分辨率的适配，提高了用户体验。
                        </li>
                    </ul>
                </div>
            </div>
            <div class="timeline-panel">
                <div class="date">10/2018~06/2019</div>
                <h3>南京赛博·悠游健康管理中心管理系统</h3>
                <div class="detail">
                    <ul>
                        <li style="color:darkorange">技术栈：Vue、Vue-router、Layui、ECharts、Flex布局</li>
                        <li>官网：<a href="http://cybervalue.cn/">http://cybervalue.cn/</a></li>
                        <li>项目介绍：
                            该项目是为赛博·悠游健康管理中心的移动端APP搭建第一期管理后台网站。
                            该项目采用前后分离的技术方案，我主要负责前端部分的开发，使用Vue技术栈对页面进行编写和跟后端的数据交互。
                        </li>
                        <li> 项目成果: <br />
                            1.使用了Vue-router构建单页面应用，使用路由懒加载提升页面加载速度，优化了用户体验。<br />
                            2.使用了ECharts进行数据可视化，使数据清晰的展示，利于工作人员的操作和管理。<br />
                            3.使用了Flex布局，配合rem完成不同分辨率的适配，提高了用户体验。
                        </li>
                    </ul>
                </div>
            </div>
            <div class="timeline-panel">
                <div class="date">06/2018~11/2018</div>
                <h3>南京溧水天生桥景区官网及管理后台的开发</h3>
                <div class="detail">
                    <ul>
                        <li style="color:darkorange">技术栈：jQuery、Layui、ECharts、wangEditor</li>
                        <li>官网：<a href="http://www.njtsq.com/">www.njtsq.com</a></li>
                        <li>项目介绍：
                            该项目的目的是搭建溧水天生桥景区官网及其管理后台，以完成景区的4A级升级，
                            该项目采用前后分离的技术方案，我主要负责前端部分的开发，使用jQuery技术栈对页面进行编写和跟后端的数据交互。
                        </li>
                        <li>项目成果: <br />
                            1.官网使用了ECharts，在页面中插入百度地图展示景区交通导航，提升了游客的参观体验。<br />
                            2.管理后台项目使用wangEditor富文本编辑器，支持景区工作人员对发布的文章进行撰写和排版，利于对官网进行管理维护和数据更新。
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <section>
        <span class="iconfont icon-works"></span>
        <h2>开源作品</h2>
        <hr>
        <div class="detail">
            <div class="timeline-panel">
                <h3>动态在线简历</h3>
                <div class="detail">
                    <ul>
                        <li style="color:darkorange">技术栈：vue、Promise、async函数、CSS3</li>
                        <li>项目展示: <a style="margin-left: 20px;"
                                href="https://github.com/zhtzhtx/dynamicResume">源码</a>&nbsp;|&nbsp;<a
                                href="http://zhang_hanting.gitee.io/tsq_web_react">预览</a></li>
                        <li>项目介绍：
                            该项目是利用Vue数据监听的原理制作的动态编写在线简历,通过不断更新数据使Vue同步更新页面中的DOM元素,以达到动画效果。</li>
                    </ul>
                </div>
            </div>
            <div class="timeline-panel">
                <h3>南京溧水天生桥景区官网(重制)</h3>
                <div class="detail">
                    <ul>
                        <li style="color:darkorange">React技术栈：React、react
                            hook、video-react、react-baidu-map、typescript</li>
                        <li style="color:darkorange">
                            Vue技术栈：Vue、vue-router、vuex-class、vue-property-decorator、vue-baidu-map、typescript</li>
                        <li>React版: <a style="margin-left: 20px;"
                                href="https://github.com/zhtzhtx/tsq_web_react">源码</a>&nbsp;|&nbsp;<a
                                href="http://zhang_hanting.gitee.io/tsq_web_react">预览</a></li>
                        <li>Vue版: <a style="margin-left: 32px;"
                                href="https://github.com/zhtzhtx/tsq_web_vue">源码</a>&nbsp;|&nbsp;<a
                                href="http://zhang_hanting.gitee.io/tsq_web_vue">预览</a></li>
                        <li>
                            项目介绍：<br />
                            在学习React、typescript和Vue-cil 3.0后,我决定把天生桥景区官网重新制作一遍,来练习新学习的知识。
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  </article>
</div>
`
    };
  },
  methods: {
    makeResume: async function() {
      await this.progressivelyShowStyle(0);
      await this.progressivelyShowResume();
      await this.progressivelyShowStyle(1);
      await this.showHtml();
      await this.progressivelyShowStyle(2);
    },
    progressivelyShowStyle(index) {
      return new Promise(resolve => {
        let interval = this.interval;
        let style = this.fullStyle[index];
        let n = 0;
        let showStyle = () => {
          if (n < style.length) {
            this.currentStyle += style.substring(n, n + 1);
            n += 1;
            setTimeout(showStyle, interval);
            if (style.substring(n - 1, n) === "\n" && this.$refs.styleEditor) {
              this.$nextTick(() => {
                this.$refs.styleEditor.goBottom();
              });
            }
          } else {
            resolve();
          }
        };
        showStyle();
      });
    },
    progressivelyShowResume() {
      return new Promise(resolve => {
        let markDown = this.fullMarkdown;
        let n = 0;
        let showResume = () => {
          if (n < markDown.length) {
            this.currentMarkdown += markDown.substring(n, n + 1);
            n += 1;
            setTimeout(showResume, 0);
            if (
              markDown.substring(n - 1, n) === "\n" &&
              this.$refs.resumeEditor
            ) {
              this.$nextTick(() => this.$refs.resumeEditor.goBottom());
            }
          } else {
            this.$nextTick(() => this.$refs.resumeEditor.goTop());
            resolve();
          }
        };
        showResume();
      });
    },
    showHtml: function() {
      return new Promise(resolve => {
        this.enableHtml = true;
        resolve();
      });
    }
  },

  created() {
    this.makeResume();
  }
};
</script>

<style>
</style>
