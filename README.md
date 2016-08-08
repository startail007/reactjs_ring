環狀滑桿功能(ring)
=========================
### 演示
[線上觀看](http://virtools.github.io/reactjs_ring/v0/index.html)
### 設置
|設置|默認值|描述|
|---|---|---|
|src|`""`|圖片來源|
### 默認風格
該組件會自動嵌入了一些必要的風格。
```css
.ImageFullExpand > .Button{
    float: left;
    position: relative;
    display: block;
    width: 200px;
    height: 200px;
    background-color: brown;
    border-width: 1px;
    border-color: #4d4d4d;
    border-style: solid;    
    background-size: cover;
    background-position: center;
    cursor: pointer;
}
.ImageFullExpand > .Full{
    position: fixed;    
    display: block;
    background-color: rgba(165, 42, 42, 0);
    visibility: hidden;
    opacity: 0;
    overflow: hidden;
    display:flex;
    align-items:center;
    justify-content:center;
}
.ImageFullExpand > .Full.active{ 
    background-color: rgba(34, 31, 31, 0.95);
    visibility: inherit;
    z-index: 1;
    opacity: 1;
}
.ImageFullExpand > .Full > .Close{ 
    position: absolute;    
    display: block;
    right: 5px;
    top: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    background-image: url(Close01.png);
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 20px;
}
.ImageFullExpand > .Full > .Close:hover{ 
    background-color: rgba(255, 255, 255, 0.1);
}
.ImageFullExpand > .Full > .Image{ 
    object-fit:contain;
    max-width: 100%;
    max-height: 100%;
    box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.2);
}
```
### 設定參考
```javascript
<ImageFullExpand src = {'image01.jpg'} />
```
### 許可

MIT
