import {AlgoFrame} from './AlgoFrame'
import {SelectionSortData} from './SelectionSortData'

export class AlgoVisualizer {

    private DELAY;
    private g2d;
    private data;
    private data_list;
    private frame;
    private N;
    private sceneHeight;

    constructor(g2d, sceneWidth, sceneHeight, N) {

        // 动画的执行速度[毫秒]
        this.DELAY = 40;

        this.g2d = g2d;

        // 初始化数据
        this.data = new SelectionSortData(N, sceneHeight);

        // 动画整个存储
        this.data_list = [];
        this.N = N;
        this.sceneHeight = sceneHeight;

        // 初始化视图
        this.frame = new AlgoFrame(g2d, "Selection Sort Visualization", sceneWidth, sceneHeight);
        this.run();
    }

    // 生成数据逻辑
    run() {
        this.setData(0, -1, -1);

        for (let i = 0; i < this.data.N(); i++) {
            // 寻找[i, n) 区间里的最小值的索引
            // [0,1) 前闭后开 0 <= n < 1
            let minIndex = i;
            this.setData(i, -1, minIndex);
            for (let j = i + 1; j < this.data.N(); j++) {
                this.setData(i, j, minIndex);
                if (this.data.get(j) < this.data.get(minIndex)) {
                    minIndex = j;
                    this.setData(i, j, minIndex);
                }
            }
            this.data.swap(i, minIndex);
            this.setData(i + 1, -1, -1);
        }
        this.setData(this.data.N(), -1, -1);
        // 渲染数据
        this.render();
    }

    setData(orderedIndex, currentCompareIndex, currentMinIndex) {
        let data = new SelectionSortData(this.N, this.sceneHeight);
        data.orderedIndex = orderedIndex;
        data.currentCompareIndex = currentCompareIndex;
        data.currentMinIndex = currentMinIndex;
        data.numbers = this.data.numbers.slice();
        this.data_list[this.data_list.length] = data
    }

    render() {
        let i = 0;
        setInterval(() => {
            if (i < this.data_list.length) {
                this.frame.render(this.data_list[i]);
                i++;
            }
        }, this.DELAY);
    }
}