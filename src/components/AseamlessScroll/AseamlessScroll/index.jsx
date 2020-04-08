import React from 'react';
import cssClass from './style.scss';

class AseamlessScroll extends React.Component {
    componentDidMount() {
        this.demo = document.getElementById('demo');
        this.demo2 = document.getElementById('demo2');
        this.demo1 = document.getElementById('demo1');
        this.demo2.innerHTML = this.demo1.innerHTML;
        // this.MyMar = setInterval(this.Marquee, this.speed);
        // this.demo.onmouseover = function () {
        //     console.log(8888888888888)
        //     clearInterval(this.MyMar);
        // };
        // this.demo.onmouseout = function () {
        //     this.MyMar = setInterval(this.Marquee, this.speed);
        // };
        console.log(this.demo.scrollTop, this.demo1.offsetHeight, this.demo2, '///////');
    }
    render() {
        return (
            // ref={(el) => { this.ratioStripSpan = el; }}
            <div className={cssClass['demo']} id="demo" onMouseOver={this.over} onMouseOut={this.out}>
                <ul className={cssClass['demo1']} id="demo1">
                    <li>
                        <span>专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个</span>
                    </li>
                    <li>
                        <span>专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个</span>
                    </li>
                    <li>
                        <span>专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个</span>
                    </li>
                    <li>
                        <span>专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个</span>
                    </li>
                    <li>
                        <span>专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个</span>
                    </li>
                    <li>
                        <span>专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个专线网完成数据文件碎片已处理数量987个</span>
                    </li>
                </ul>
                <div className={cssClass['demo2']} id="demo2"></div>
            </div>
        );
    }
    speed=40;
    demo=null;
    demo2=null;
    demo1=null;
    MyMar=setInterval(this.Marquee, this.speed);
    Marquee() {
        // console.log(666666666, this.demo.scrollTop, this.demo1.offsetHeight);
        if (this.demo.scrollTop >= this.demo1.offsetHeight) {
            this.demo.scrollTop = 0;
            // console.log(666666666227777);
        } else {
            // debugger;
            this.demo.scrollTop = this.demo.scrollTop + 1;
            // console.log(this.demo.scrollTop, '[[[[[[[[[[');
        }
    }
    over=() => {
        console.log(8888888888888);
        clearInterval(this.MyMar);
    };
    out=() => {
        this.MyMar = setInterval(this.Marquee, this.speed);
    };
}

export default {
    name: 'AseamlessScroll',
    component: AseamlessScroll
}
