環狀滑桿功能(ring)
=========================
### 演示
[線上觀看](http://virtools.github.io/reactjs_ring/v0/index.html)
### 設置
|設置|默認值|描述|
|---|---|---|
|rate|`0`|滑動的比例，範圍(0 ~ 1)|
|radius|`80`|圈的半徑|
|buttonRadius|`80`|按鈕半徑|
|open|`false`|開關,值(true或false)|
|enable|`true`|啟動,值(true或false)|
### 事件
|設置|描述|
|---|---|
|onChange(value)|變更數值觸發|
### 默認風格
該組件會自動嵌入了一些必要的風格。
```css
.Ring{
    position: relative;
    display: block;
    -webkit-user-select:none;
}
.Ring > .Button{
    position: absolute;
    display: block;
    background-color: #3fcbff;
    cursor: pointer;
}
.Ring > .Button:hover{
    background-color: #82ddff;    
}
.Ring > .TextFrame > .Text{
    font-size: 30px;
    text-align: center;
}
.Ring > .TextFrame{
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    display:flex;
    align-items:center;
    justify-content:center; 
}

.Ring > .TextFrame{
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;
    display:flex;
    align-items:center;
    justify-content:center; 
}
.Ring > .SVG > .RateBg{
    stroke-width:8;
    stroke: #d8d8d8;
}
.Ring > .SVG > .Rate{
    stroke-width:4;
    stroke: #27678e;
}
.Ring.disable{
}
.Ring.disable > .Button{
    background-color: #717171;
}
.Ring.disable > .Button{
    background-color: #3b3b3b;
}
.Ring.disable > .TextFrame{
}

.Ring.disable > .SVG > .RateBg{
    stroke: #aaaaaa;
}
.Ring.disable > .SVG > .Rate{
    stroke: #343434;
}
```
### 例
```javascript
var Ring01 = ReactDOM.render(
    <Ring rate = {0.5} radius = {80} onChange = {onChange}/>,
    document.getElementById('example01')
);
function onChange(value){
    console.log(value)
}
```
### 許可
MIT
