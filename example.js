var EventUtil = {
  addHandler: function(element, type, handler, bool) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, bool | false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function(element, type, handler, bool) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, bool | false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = undefined;
    }
  }
};

var Point = function(pX, pY) {
  this.x = pX || 0;
  this.y = pY || 0;
  this.set = function(pX, pY) {
    this.x = pX;
    this.y = pY;
  };
  this.add = function(pP) {
    return new Point(this.x + pP.x, this.y + pP.y);
  };
  this.sub = function(pP) {
    return new Point(this.x - pP.x, this.y - pP.y);
  };
  this.mul = function(pV) {
    return new Point(this.x * pV, this.y * pV);
  };
  this.div = function(pV) {
    return new Point(this.x / pV, this.y / pV);
  };
  this.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };
  this.clone = function() {
    return new Point(this.x, this.y);
  };
};

var MathEx = {
  get DEG180() {
    return Math.PI / 180;
  },
  get DEG90() {
    return Math.PI / 90;
  },
  VectorAngle: function(pVector0, pVector1) {
    var temp0 = (pVector0.x * pVector1.x + pVector0.y * pVector1.y) / pVector0.len() / pVector1.len();
    var temp = Math.acos(temp0 <= 1 ? temp0 : 1) * 180 / Math.PI;
    return (pVector0.x * pVector1.y - pVector0.y * pVector1.x) < 0 ? temp : -temp;
  },
  Turn: function(pPoint, pValue, pCPoint) {
    if (pCPoint == undefined) {
      pCPoint = new Point();
    }
    var WH01 = pPoint.sub(pCPoint);
    var temp = new Point();
    var COS = Math.cos(-pValue * MathEx.DEG180);
    var SIN = Math.sin(-pValue * MathEx.DEG180);
    temp.x = WH01.x * COS + WH01.y * SIN + pCPoint.x;
    temp.y = -WH01.x * SIN + WH01.y * COS + pCPoint.y;
    return temp;
  }
};

var getPosition = function(el) {
  var Rect = el.getBoundingClientRect();
  return new Point(Rect.left + window.scrollX,Rect.top + window.scrollY);
}
var Ring = React.createClass({
    getInitialState: function() {
        return {rate:this.props.rate || 0,Mousedown:false,enable:(this.props.enable==undefined)?true:this.props.enable,radius:(this.props.radius==undefined)?80:this.props.radius,buttonRadius:(this.props.buttonRadius==undefined)?10:this.props.buttonRadius,changeFun:this.props.onChange};
    },
    componentDidMount:function(rootNode){    
    },
    componentDidUpdate: function(prevProps, prevState){
        if(this.state.changeFun){
            this.state.changeFun.call(this,this.state.rate);
        }
    },
    onMouseDown: function(e) {
        if(this.state.enable){
            var p0 = getPosition(this.refs.button).add(new Point(this.state.buttonRadius,this.state.buttonRadius));
            var p1 = getPosition(this.refs.ring);
            this.LocP = new Point(e.clientX - p0.x,e.clientY - p0.y);
            var vector01 = p0.sub(p1).sub(new Point(this.state.radius+this.state.buttonRadius,this.state.radius+this.state.buttonRadius));         
            var angle = MathEx.VectorAngle(vector01, new Point(1,0));  
            angle = angle<0?angle+360:angle;
            this.SetRate(angle/360);    
            this.setState({Mousedown:true})
            EventUtil.addHandler(window, 'mouseup', this.onMouseUp);
            EventUtil.addHandler(this.refs.ring, 'mousemove', this.onMouseMove);
        }
    },
    SetRate:function(value){
        var rate = Math.min(Math.max(value,0),1);
        this.setState({rate:rate});       
    },
    onMouseMove: function(e) {
        if(this.state.Mousedown){
            var m = new Point(e.clientX,e.clientY)
            var p = getPosition(this.refs.ring); 
            var vector01 = m.sub(this.LocP).sub(p).sub(new Point(this.state.radius+this.state.buttonRadius,this.state.radius+this.state.buttonRadius));
            var len = vector01.len();
            if(len>=this.state.radius-this.state.buttonRadius*2 && len<=this.state.radius+this.state.buttonRadius*2){
                var angle = MathEx.VectorAngle(vector01, new Point(1,0));  
                angle = angle<0?angle+360:angle;
                this.SetRate(angle/360); 
            }                  
        }
    },
    onMouseUp: function(e) {        
        this.setState({Mousedown:false})
        EventUtil.removeHandler(window, 'mouseup', this.onMouseUp);
        EventUtil.removeHandler(this.refs.ring, 'mousemove', this.onMouseMove);
    },
    render: function() {
        var radius = this.state.radius;
        var buttonRadius = this.state.buttonRadius;
        var angle = this.state.rate*360* MathEx.DEG180;
        var c = 2*Math.PI*radius;
        var cx = radius + buttonRadius;
        var cy = radius + buttonRadius;
        var x0 = cx + radius * Math.cos(angle);
        var y0 = cy + radius * Math.sin(angle);        
        var ButtonStyle = {left:x0-buttonRadius,top:y0-buttonRadius,width:buttonRadius*2,height:buttonRadius*2,borderRadius:buttonRadius};
        var RingStyle = {width:cx*2,height:cy*2};
        var RingClass = "Ring " + (this.state.enable?"":"disable");        
      return(
          <div ref = "ring" className = {RingClass} style = {RingStyle}>
             <div className = "TextFrame" style = {{borderRadius:radius+buttonRadius}}>
                <div className = "Text">{Math.round(this.state.rate*100) + "%"}</div>
             </div>
             <svg className = "SVG" width = {cx*2} height = {cy*2}>
                <circle className = "RateBg" cx={cx} cy={cy} r={radius} fill="none" />
                <circle className = "Rate" cx={cx} cy={cy} r={radius} fill="none" strokeDasharray={c} strokeDashoffset= {(1-this.state.rate)*c} />
              </svg>               
              <label ref = "button" className = "Button" style = {ButtonStyle} onMouseDown = {this.onMouseDown}></label>
          </div>
      );
    }
});

var Ring01 = ReactDOM.render(
    <Ring rate = {0.5} radius = {80} onChange = {onChange}/>,
    document.getElementById('example01')
);
function onChange(value){
    console.log(value)
}
ReactDOM.render(
    <Ring radius = {80} enable = {false}/>,
    document.getElementById('example02')
);

