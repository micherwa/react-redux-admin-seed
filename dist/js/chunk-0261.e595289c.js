(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0261"],{LW0w:function(e,t,n){"use strict";n.r(t);var a=n("Kz1y"),i=n.n(a),r=n("YUSd"),s=n.n(r),l=n("Zv/C"),c=n.n(l),o=n("2lBV"),u=n.n(o),m=n("Dkg+"),h=n.n(m),d=n("Gjrs"),f=n.n(d),p=(n("mqUQ"),n("LRNO")),E=n.n(p),y=(n("geFr"),n("WlsU")),v=n.n(y),g=n("mXGw"),k=n.n(g),w=n("thVU"),b=n("jf7e"),N=n("U8a7"),U=n("JviU"),z=n("aEK/"),K=n("Qi1R"),M=function(e){return k.a.createElement(U.a,{path:e.path,exact:!!e.exact,render:function(t){return K.a.getLocalItem("token")?k.a.createElement(e.component,i()({},t,{routes:e.routes})):k.a.createElement(z.a,{to:{pathname:"/login",state:{from:t.location}}})}})},H=n("pNn+"),L=n("snOE"),R=n.n(L),j=n("Bb2r"),x=n.n(j),D=n("w5bz"),I=[{path:"/dashboard",component:x()({loader:function(){return Promise.all([n.e("chunk-antd"),n.e("chunk-19f2"),n.e("i2qy")]).then(n.bind(null,"i2qy"))},loading:function(){return k.a.createElement(D.a,null)}})}],S=[].concat(R()(I)),_=(n("f4Mj"),v.a.SubMenu,E.a.Header),q=E.a.Content,C=E.a.Sider,J=function(e){function t(e){c()(this,t);var n=h()(this,(t.__proto__||s()(t)).call(this,e));return n.state={mainHeight:0,menuItemkey:"",avatarUrl:"",userName:"用户名",unlisten:null},n}return f()(t,e),u()(t,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("resize",this.handleResize.bind(this)),this.handleResize(),this.setMenuDefaultKey(),this.state.unlisten=H.a.listen(function(){e.setMenuDefaultKey()})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleResize.bind(this)),this.state.unlisten()}},{key:"handleResize",value:function(){this.setState({mainHeight:document.documentElement.scrollHeight-64})}},{key:"setMenuDefaultKey",value:function(){for(var e=H.a.location.pathname.substring(1),t=[],n=0;n<e.length&&"/"!==e[n];n++)t.push(e[n]);this.setState({menuItemkey:t.join("")})}},{key:"render",value:function(){return k.a.createElement(E.a,{className:"home"},k.a.createElement(_,{className:"c-white clearfix header"},k.a.createElement("div",{className:"pull-left f20 w210 text-center"},"Lilith 广告投放配置平台"),k.a.createElement("span",{className:"pull-right avatar m-l-10 m-t-12"},k.a.createElement("img",{className:"img-responsive",src:this.state.avatarUrl})),k.a.createElement("span",{className:"pull-right f14"},"Hi, ",this.state.userName)),k.a.createElement(E.a,null,k.a.createElement(C,{width:180},k.a.createElement(v.a,{mode:"inline",theme:"dark",selectedKeys:[this.state.menuItemkey],defaultOpenKeys:["master-manager"],style:{height:"100%"}},k.a.createElement(v.a.Item,{key:"dashboard"},k.a.createElement(w.a,{to:"/dashboard"},"首页")))),k.a.createElement(E.a,{className:"home-content"},k.a.createElement(q,{style:{height:this.state.mainHeight}},S.map(function(e,t){return k.a.createElement(M,i()({key:t},e))}),k.a.createElement(b.a,{path:"/",exact:!0,render:function(){return k.a.createElement(N.a,{to:"/dashboard"})}})))))}}]),t}(g.Component);t.default=J},f4Mj:function(e,t,n){}}]);