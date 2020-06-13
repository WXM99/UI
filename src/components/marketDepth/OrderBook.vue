<template>
    <div style="text-align: center;">
        <a-row style="min-height: 510px">
            <a-col :span="6">
                <a-affix :offset-top="100">
                    <div class="fd-card"
                         style="background: #fff; margin: 0 20px; margin-bottom: 20px; z-index: 2; padding: 20px">
                        <a-button style="font-size: 18px; font-weight: 200">
                            WIT OCT-2020
                        </a-button>
                        <a-divider/>
                        <span class="fude-title" style="font-size: 22px; font-weight: 300">Morgan Stanley Huaxin Securities Co., Ltd.</span>
                        <a-divider/>
                        <a-col :span="24">
                            <a-statistic
                                    title="Market Price of Selling"
                                    :value="mps"
                                    :precision="2"
                                    suffix="CNY/share"
                                    :value-style="{ color: '#345586' }"
                                    style="margin-bottom: 20px">
                                <template #prefix>
                                    <a-icon type="logout"/>
                                </template>
                            </a-statistic>
                        </a-col>
                        <a-divider/>
                        <a-col :span="24">
                            <a-statistic
                                    title="Market Price of Buying"
                                    :value="mpb"
                                    :precision="2"
                                    suffix="CNY/share"
                                    :value-style="{ color: '#cf7426' }"
                                    style="margin-bottom: 20px">
                                <template #prefix>
                                    <a-icon type="login"/>
                                </template>
                            </a-statistic>
                        </a-col>
                        <a-divider/>
                        <div style="color: #888; font-weight: 200">{{time}}</div>
                    </div>
                </a-affix>
            </a-col>
            <a-col :span="18">
                <a-table :columns="columns" :data-source="sortedMd"
                         bordered :pagination="false" style="margin: 0px 20px" size="small">
                    <span slot="rlevelT" class="t-title">Level</span>
                    <span slot="bvolT" class="t-title">Buy Volume</span>
                    <span slot="priceT" class="t-title">Price</span>
                    <span slot="svolT" class="t-title">Sell Volume</span>
                    <span slot="llevelT" class="t-title">Level</span>
                    <span slot="price" slot-scope="text, record">
                <div v-if="record.llevel == 1" style="background:#cde8ff ">
                    <a-statistic :precision="2" :value="record.price"
                                 :value-style="{ color: '#345586',background: '#cde8ff'}"
                                 suffix="CNY"/>
                </div>
                <div v-else-if="record.rlevel == 1" style="background: #ffe0d0">
                    <a-statistic :precision="2" :value="record.price"
                                 :value-style="{ color: '#b46320', background: '#ffe0d0'}"
                                 suffix="CNY"/>
                </div>
                <div v-else>
                    <a-statistic :precision="2" :value="record.price"
                                 :value-style="{ color: '#545657' }"
                                 suffix="CNY"/>
                </div>
            </span>
                    <span slot="llevel" slot-scope="text, record">
                <div v-if="record.llevel!==''" style="font-size: 22px; font-weight: 300">
                    #{{record.llevel}}
                </div>
            </span>
                    <span slot="bvol" slot-scope="text, record">
                <div style="font-size: 22px; font-weight: 300">
                    {{record.bvol}}
                </div>
            </span>
                    <span slot="svol" slot-scope="text, record">
                <div style="font-size: 22px; font-weight: 300">
                    {{record.svol}}
                </div>
            </span>
                    <span slot="rlevel" slot-scope="text, record">
                <div v-if="record.rlevel!==''" style="font-size: 22px; font-weight: 300">
                    #{{record.rlevel}}
                </div>
            </span>
                </a-table>
                <div style="margin: 20px">
                    <apexchart type="area" height="350" :options="chartOptions" :series="series" :key="this.upCount"></apexchart>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="18" :offset="6">
                <a-spin :spinning="spinning" size="large">
                    <a-icon slot="indicator" type="loading-3-quarters"
                            style="font-size: 180px; transform: translate(-70px, 50px)" spin/>
                    <div class="fd-card" style="padding: 20px">
                        <div style="font-size: 26px; color: #0a7fbe">
                            <span class="fude-title">Transaction Order</span>
                        </div>
                        <a-descriptions bordered :column="4">
                            <a-descriptions-item label="Broker Name" :span="2">
                                Morgan Stanley Huaxin Securities Co., Ltd.
                            </a-descriptions-item>
                            <a-descriptions-item label="Order Type" :span="2">
                                <a-select style="width: 115px"
                                          v-model="txOrder.orderType"
                                          placeholder="Select">
                                    <a-select-option value="Market Order">
                                        Market Order
                                    </a-select-option>
                                    <a-select-option value="Limit Order">
                                        Limit Order
                                    </a-select-option>
                                    <a-select-option value="Stop Order">
                                        Stop Order
                                    </a-select-option>
                                </a-select>
                            </a-descriptions-item>
                            <a-descriptions-item label="Product Name" :span="2">
                                WIT OTC-2020
                            </a-descriptions-item>
                            <a-descriptions-item label="Buy/Sell" :span="2">
                                <a-radio-group
                                        v-model="txOrder.buyOrSell"
                                        button-style="solid">
                                    <a-radio-button value="Buy">
                                        Buy
                                    </a-radio-button>
                                    <a-radio-button value="Sell">
                                        Sell
                                    </a-radio-button>
                                </a-radio-group>
                            </a-descriptions-item>
                            <a-descriptions-item label="Price" :span="1">
                                <a-input-number size="large"
                                                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :step="0.01"
                                                style="width: 100px"
                                                v-model="txOrder.price"
                                                v-if="txOrder.orderType != 'Market Order'"
                                                :min="1" :default-value="1"/>
                                <div v-else>
                                    <a-button size="large" style="width: 100px;" :disabled="true">
                                        Omitted
                                    </a-button>
                                </div>
                            </a-descriptions-item>
                            <a-descriptions-item label="Quantity" :span="1">
                                <a-input-number size="large" style="width: 70px"
                                                v-model="txOrder.quantity"
                                                :min="1" :default-value="1"/>
                            </a-descriptions-item>
                            <a-descriptions-item label="SUM" :span="2">
                                <a-input-number size="large"
                                                v-if="txOrder.orderType != 'Market Order'"
                                                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                                :step="0.01"
                                                style="width: 100px"
                                                :min="1"
                                                :disabled="true"
                                                :value="this.txOrder.quantity * this.txOrder.price"/>
                                <div v-else>
                                    <a-button size="large" style="width: 100px;" :disabled="true">
                                        Omitted
                                    </a-button>
                                </div>
                            </a-descriptions-item>
                            <a-descriptions-item label="Declaration" :span="4">
                                <p style="text-align: left">
                                    I confirm this trade with the information below is correct:
                                    <br>
                                <ul>
                                    <li>Broker Name: <strong>Morgan Stanley Huaxin Securities Co., Ltd.</strong>;</li>
                                    <li>Order Type: <strong>{{this.txOrder.orderType}}</strong>;</li>
                                    <li>Product Name: <strong>WIT OCT-2020</strong>;</li>
                                    <li>Buy or Sell: <strong>{{this.txOrder.buyOrSell}}</strong>;</li>
                                    <li v-if="txOrder.orderType != 'Market Order'">Price per Hand: <strong>￥{{this.txOrder.price}}</strong>;
                                    </li>
                                    <li>Quatity: <strong>{{this.txOrder.quantity}}</strong>;</li>
                                    <li v-if="txOrder.orderType != 'Market Order'">Total Price: <strong>￥{{this.txOrder.quantity
                                        * this.txOrder.price}}</strong>;
                                    </li>
                                </ul>
                                </p>
                                <div style="float: right">
                                    <p>Trader: <strong>weixm</strong><br>
                                        <strong>Morgan Stanley Huaxin Securities Co., Ltd.</strong>
                                    </p>
                                    <a-checkbox
                                            v-model="txOrder.confirmed">
                                        Confirmed.
                                    </a-checkbox>
                                </div>
                            </a-descriptions-item>
                        </a-descriptions>
                        <a-button size="large" type="primary" @click="submitOrder"
                                  style="margin-top: 20px" :disabled="!txOrder.confirmed">
                            submit
                        </a-button>
                    </div>
                </a-spin>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="18" :offset="6">
                <div class="fd-card" style="text-align: left; padding: 20px">
                    <div style="font-size: 26px; color: #0a7fbe">
                        <span class="fude-title">For Cancel Order...</span></div>
                    You can make a cancel order of all the pending order in Order History.
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import ACol from "ant-design-vue/es/grid/Col";
    import VueApexCharts from 'vue-apexcharts'

    const columns = [
        {
            slots: {title: 'rlevelT'},
            dataIndex: 'rlevel',
            scopedSlots: {customRender: 'rlevel'},
            align: 'center'
        },
        {
            slots: {title: 'bvolT'},
            dataIndex: 'bvol',
            scopedSlots: {customRender: 'bvol'},
            align: 'center'
        },
        {
            slots: {title: 'priceT'},
            dataIndex: 'price',
            scopedSlots: {customRender: 'price'},
            align: 'center'
        },
        {
            slots: {title: 'svolT'},
            dataIndex: 'svol',
            scopedSlots: {customRender: 'svol'},
            align: 'center'
        },
        {
            slots: {title: 'llevelT'},
            dataIndex: 'llevel',
            scopedSlots: {customRender: 'llevel'},
            align: 'center'
        },
    ];
    export default {
        name: 'OrderBook',
        components: {
            ACol,
            apexchart: VueApexCharts
        },
        mounted() {
            this.updateTime();
            this.updateTable();
            this.updateChart();
        },
        data() {
            return {
                websock: null,
                username: "weixm",
                time: '',
                product: this.$route.params.product,
                md: [
                    [
                        {'amount': 981, 'price': 21.91},
                        {'amount': 981, 'price': 20.19},
                        {'amount': 1050, 'price': 18.11},
                        {'amount': 510, 'price': 15.21},
                        {'amount': 110, 'price': 13.61},
                    ],
                    [
                        {'amount': 131, 'price': 13.11},
                        {'amount': 831, 'price': 11.11},
                        {'amount': 81, 'price': 10.19},
                        {'amount': 14, 'price': 10.15},
                        {'amount': 121, 'price': 10.01},
                    ]
                ],
                columns,
                chartOptions:{
                    chart: {
                        height: 450,
                        type: 'area',
                        zoom: {
                            enabled: false
                        },
                        animations: {
                            enabled: false
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                    },
                    colors: ['#ffad69','#008FFB'],
                    xaxis: {
                        type: 'datetime',
                        categories: [],
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        },
                    },
                    legend: {
                        position: 'top',
                        offsetX: -10
                    },
                },
                sortedMd: [],
                mps: 0,
                mpb: 0,
                txOrder: {
                    orderType: '',
                    quantity: 1,
                    price: 1,
                    productId: '',
                    buyOrSell: '',
                    mdId: '',
                    traderID: '',
                    confirmed: false
                },
                spinning: false,
                series: [{
                    name: 'Buying Market Price',
                    data: []
                }, {
                    name: 'Selling Market Price',
                    data: []
                }],
                upCount: 0,
            }
        },
        created() {
            // todo:
            //this.initWebSocket();
        },
        destroyed() {
            // this.websock.close()
        },
        methods: {
            submitOrder() {
                this.spinning = true;
                setTimeout(() => {
                    this.spinning = false;
                    this.$notification.open({
                        message: 'Processing The Transaction...',
                        description:
                            'The transaction order you\'ve made are under processing. ' +
                            'You can check it on the Order History page and look up pending orders. ',
                        icon: <a-icon type = "clock-circle-o" spin style = "color: #ffbc67;" />,
                })
                    ;
                }, 3000);
            },
            initWebSocket() {
                // todo: change to ws server addr
                const wsUrl = 'ws://localhost:8089/connection/' + this.username;
                this.websock = new WebSocket(wsUrl);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() {
                // let actions = {"msg": "hello, server!"};
                // this.websocketsend(JSON.stringify(actions));
            },
            websocketonerror() {
                //  this.initWebSocket();
            },
            websocketonmessage(e) {
                console.log(e);
                this.msg.push(e.data)
            },
            websocketsend(Data) {
                this.websock.send(Data);
            },
            websocketclose(e) {
                console.log('closing connection...', e);
            },
            updateTime() {
                let _this = this;
                this.time = setInterval(() => {
                    _this.time = new Date();
                }, 1000);
            },
            updateTable(){
                let sells = this.md[0];
                let buyrs = this.md[1];
                var i = 0;
                var tmpTable = [];
                for (var row in sells) {
                    let order = {
                        'llevel': sells.length - i,
                        'svol': sells[row].amount,
                        'price': sells[row].price,
                        'bvol': '',
                        'rlevel': ''
                    };
                    tmpTable.push(order);
                    i += 1;
                }
                i = 1;
                for (var brow in buyrs) {
                    let order = {
                        'rlevel': i,
                        'bvol': buyrs[brow].amount,
                        'price': buyrs[brow].price,
                        'svol': '',
                        'llevel': ''
                    };
                    tmpTable.push(order);
                    i += 1;
                }
                this.mpb = buyrs[0].price;
                this.mps = sells[sells.length - 1].price;
                this.sortedMd = tmpTable;
            },
            updateChart() {
                let _this = this;
                var xtime = new Date();
                    this.time = setInterval(() => {
                        xtime = new Date(xtime.getTime() + 60*60*1000);
                        _this.chartOptions.xaxis.categories.push(
                            xtime.getFullYear()+"-"+
                            (xtime.getMonth()+1)+"-"+
                            xtime.getDate()+"T"+
                            xtime.getHours()+":"+
                            xtime.getMinutes()+":"+
                            xtime.getSeconds()+"Z"
                        );
                        // update table and md
                        _this.simuTx();
                        // update chart
                        _this.series[0].data.push(Math.floor(this.mpb *100)/100);
                        _this.series[1].data.push(Math.floor(this.mps *100)/100);

                        _this.upCount += 1;

                        if (_this.upCount > 16) {
                            _this.chartOptions.xaxis.categories.shift();
                            _this.series[0].data.shift();
                            _this.series[1].data.shift();
                        }
                    }, 1451);
            },
            compare(property) {
                return function(a,b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return value2 - value1;
                }
            },
            simuTx(){
              var allTx = this.md[0].concat(this.md[1]);
              for (var i in allTx) {
                  allTx[i]['price'] += ((Math.random()-0.5)*3);
              }
              allTx.sort(this.compare('price'));
              var tmp0 = [];
              var tmp1 = [];
              for (var j in allTx) {
                  if (j < 5) {
                      tmp0.push(allTx[j])
                  }  else {
                      tmp1.push(allTx[j])
                  }
              }
              this.md[0] = tmp0;
              this.md[1] = tmp1;
              this.updateTable();
            }
        },
    }
</script>
<style scoped>
    .fude-title {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
        -webkit-background-clip: text;
        color: transparent;
    }

    .fd-card {
        border-radius: 5px;
        box-shadow: 0 0 0 1px #e5e5e5;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 20px;
        overflow: hidden;
    }

    .t-title {
        font-size: 22px;
        font-weight: 300;
        text-align: center;
        width: 100%;
        margin: 0;
    }

    .fd-btn {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
        color: #fff;
        font-weight: 200;
        font-size: 36px;
        height: 66px;
    }

    tr > th {
        padding: 5px !important;
    }
</style>
