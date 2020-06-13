<template>
    <div>
        <a-button style="float: right; margin-bottom: 20px" @click="toPage('/signin')"> Log out</a-button><br>
        <a-row style="width: calc(100vw - 140px)">
            <a-col :span="24">
                <a-table :columns="columns" :data-source="data" :scroll="{x:1800, y:450}">
                <span slot="action" slot-scope="text, record">
                    <a-button type="default" size="large"
                              v-if="record.state == 'Finished'" @click="showModel(record)">Details</a-button>
                    <a-button type="default" size="large" v-else disabled>Cancel</a-button>
                </span>
                    <span slot="state" slot-scope="text, record">
                    <a-tag color="blue" v-if="record.state == 'Finished'">Finished</a-tag>
                    <a-tag color="orange" v-else-if="record.state == 'Pending'">Pending</a-tag>
                    <a-tag v-else>Canceled</a-tag>
                    </span>
                    <span slot="price" slot-scope="text, record">
                        <div v-if="(record.orderType=='Market Order' && record.state=='Finished')
                                    || (record.orderType=='Stop Order' && record.state=='Finished')">
                            ￥{{record.price}} (AVG)
                        </div>
                        <div v-else-if="!(record.orderType=='Market Order' && record.state=='Pending')">
                            ￥{{record.price}}
                        </div>
                        <div v-else>--</div>
                </span>
                    <span slot="totalPrice" slot-scope="text, record">
                        <div v-if="!(record.orderType=='Market Order' && record.state=='Pending')">
                            ￥{{record.price * record.volume}}
                        </div>
                        <div v-else>--</div>
                </span>
                </a-table>
            </a-col>
        </a-row>
        <a-modal v-model="visible" title="Transaction details" width="1200px">

            <a-descriptions title="Order Info">
                <a-descriptions-item label="Product">
                    {{cancelTx.productName}}
                </a-descriptions-item>
                <a-descriptions-item label="Initiator">
                    {{cancelTx.seller}}
                </a-descriptions-item>
                <a-descriptions-item label="Initiator Company">
                    {{cancelTx.sellerComp}}
                </a-descriptions-item>
                <a-descriptions-item label="Order Type">
                    {{cancelTx.orderType}}
                </a-descriptions-item>
                <a-descriptions-item label="Price">
                    {{cancelTx.price}}
                </a-descriptions-item>
                <a-descriptions-item label="Buy or Sell">
                    {{cancelTx.buyOrSell}}
                </a-descriptions-item>
                <a-descriptions-item label="Volume">
                    {{cancelTx.volume}}
                </a-descriptions-item>
            </a-descriptions>
            <br>
            <p style="font-size: 16px; font-weight: bold; color: rgba(0,0,0,0.85);">Transaction Logs</p>
            <a-table :columns="columnsLog" :data-source="dataLog"></a-table>
        </a-modal>
    </div>
</template>
<script>
    import ACol from "ant-design-vue/es/grid/Col";

    export default {
        components: {ACol},
        data() {
            return {
                columns,
                columnsLog,
                data: [
                    {
                        'productName': 'WIT SPET-2020',
                        'sellerComp': 'Everbright Securities Co., Ltd.',
                        'seller': 'iceFrog',
                        'orderType': 'Limit Order',
                        'price': 15.12,
                        'volume': 10,
                        'totalPrice': 12341,
                        'state': 'Pending',
                        'updateTime': 'Fri Jun 12 2020 23:31:19 GMT+0800 (China Standard Time)',
                        'buyOrSell': "Buy",
                    },
                    {
                        'productName': 'WIT SPET-2020',
                        'seller': 'weixm',
                        'sellerComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'orderType': 'Market Order',
                        'price': 11.12,
                        'volume': 13,
                        'state': 'Finished',
                        'buyOrSell': "Buy",
                        'updateTime': 'Fri Jun 12 2020 18:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'sellerComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'seller': 'weixm',
                        'orderType': 'Limit Order',
                        'price': 14.12,
                        'volume': 1100,
                        'state': 'Canceled',
                        'updateTime': 'Fri Jun 12 2020 20:30:19 GMT+0800 (China Standard Time)',
                        'buyOrSell': "Buy",
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'sellerComp': 'Everbright Securities Co., Ltd.',
                        'seller': 'weixm',
                        'orderType': 'Limit Order',
                        'price': 15.12,
                        'volume': 20,
                        'totalPrice': 12341,
                        'state': 'Pending',
                        'buyOrSell': "Sell",
                        'updateTime': 'Fri Jun 12 2020 20:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'GOLD OCT-2020',
                        'sellerComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'seller': 'chuyuxuan123',
                        'orderType': 'Stop Order',
                        'price': 411.12,
                        'volume': 5,
                        'state': 'Finished',
                        'buyOrSell': "Buy",
                        'updateTime': 'Fri Jun 12 2020 21:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'GOLD OCT-2020',
                        'sellerComp': 'Everbright Securities Co., Ltd.',
                        'seller': 'iceFrog',
                        'orderType': 'Limit Order',
                        'price': 314.12,
                        'volume': 5,
                        'state': 'Canceled',
                        'buyOrSell': "Sell",
                        'updateTime': 'Fri Jun 12 2020 21:30:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'sellerComp': 'Everbright Securities Co., Ltd.',
                        'seller': 'iceFrog',
                        'orderType': 'Market Order',
                        'price': 12.12,
                        'volume': 10,
                        'totalPrice': 12341,
                        'state': 'Pending',
                        'buyOrSell': "Sell",
                        'updateTime': 'Fri Jun 12 2020 23:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'sellerComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'seller': 'weixm',
                        'orderType': 'Market Order',
                        'price': 17.12,
                        'volume': 10,
                        'state': 'Finished',
                        'buyOrSell': "Buy",
                        'updateTime': 'Fri Jun 12 2020 22:31:19 GMT+0800 (China Standard Time)',
                    },
                    {
                        'productName': 'GOLD OCT-2020',
                        'sellerComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'seller': 'chuyuxuan123',
                        'orderType': 'Stop Order',
                        'price': 200,
                        'volume': 10,
                        'state': 'Canceled',
                        'buyOrSell': "Sell",
                        'updateTime': 'Fri Jun 12 2020 23:36:19 GMT+0800 (China Standard Time)'
                    },
                ],
                dataLog: [
                    {
                        'trader': 'chuyuxuan123',
                        'traderComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'traderRole': 'Seller',
                        'volume': 145,
                        'price': '￥12.16',
                        'time': 'Fri Jun 12 2020 21:31:19 GMT+0800 (China Standard Time)'
                    }
                ],
                visible: false,
                confirmLoading: false,
                cancelTx: {}
            }
        },
        beforeCreate() {
        },
        methods: {
            toPage(url) {
                this.$router.push(url)
            },
            showModel(order) {
                this.cancelTx = order;
                this.visible = true;
            },
            handleOk() {
                this.confirmLoading = true;
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                    this.$notification.open({
                        message: 'Cancel Order is Made.',
                        description:
                            'The cancel order you\'ve made is successfully handled. ',
                        icon: <a-icon type = "check-circle" style = "color: #6FB1FF;" />,
                })
                    for (var i in this.data) {
                        if (this.data[i] == this.cancelTx) {
                            this.data[i].state = "Canceled";
                            var now = new Date();
                            this.data[i].updateTime = now.toString();
                        }
                    }
                }, 2000);
            }
        },
        mounted() {
            var now = new Date();
            var item = {
                'productName': 'WIT OCT-2020',
                'sellerComp': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                'seller': 'weixm',
                'orderType': 'Stop Order',
                'price': 6,
                'volume': 6,
                'totalPrice': 36,
                'state': 'Pending',
                'updateTime': new Date(now.valueOf() - 123 * 1000).toString(),
                'buyOrSell': "Sell"
            };
            this.data.push(item);
        }
    };

    const columnsLog = [
        {
            title: 'Trader',
            dataIndex: 'trader',
            align: 'center',
        },
        {
            title: 'Trader Company',
            dataIndex: 'traderComp',
            align: 'center',
        },
        {
            title: 'Trader Role',
            dataIndex: 'traderRole',
            align: 'center',
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: 'center',
        },
        {
            title: 'Trading Time',
            dataIndex: 'time',
            align: 'center',
        },
    ];

    const columns = [
        {
            title: 'Product',
            dataIndex: 'productName',
            filters: [
                {
                    text: 'WIT OCT-2020',
                    value: 'WIT OCT-2020',
                },
                {
                    text: 'WIT SPET-2020',
                    value: 'WIT SPET-2020',
                },
                {
                    text: 'GOLD OCT-2020',
                    value: 'GOLD OCT-2020',
                },
            ],
            onFilter: (value, record) => record.productName.indexOf(value) === 0,
            width: 150,
            fixed: 'left',
            align: 'center'
        },
        {
            title: 'Initiator',
            dataIndex: 'seller',
            fixed: 'left',
            width: 150,
            align: 'center',
            scopedSlots: {customRender: 'seller'},
        },
        {
            title: 'Initiator Company',
            dataIndex: 'sellerComp',
            filters: [
                {
                    text: 'Morgan Stanley Huaxin Securities Co., Ltd.',
                    value: 'Morgan Stanley Huaxin Securities Co., Ltd.',
                },
                {
                    text: 'Everbright Securities Co., Ltd.',
                    value: 'Everbright Securities Co., Ltd.',
                },
            ],
            onFilter: (value, record) => record.sellerComp.indexOf(value) === 0,
            fixed: 'left',
            width: 320,
            align: 'center'
        },
        {
            title: 'Order Type',
            dataIndex: 'orderType',
            filters: [
                {
                    text: 'Market Order',
                    value: 'Market Order',
                }, {
                    text: 'Limit Order',
                    value: 'Limit Order',
                }, {
                    text: 'Stop Order',
                    value: 'Stop Order',
                }, {
                    text: 'Cancel Order',
                    value: 'Cancel Order',
                }
            ],
            onFilter: (value, record) => record.orderType.indexOf(value) === 0,
            width: 130,
            align: 'center'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            width: 110,
            align: 'center',
            scopedSlots: {customRender: 'price'},
        },
        {
            title: 'Volume',
            dataIndex: 'volume',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.volume - b.volume,
            width: 110,
            align: 'center',
        },
        {
            title: 'Buy/Sell',
            dataIndex: 'buyOrSell',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: 'Buy',
                    value: 'Buy',
                }, {
                    text: 'Sell',
                    value: 'Sell',
                },
            ],
            onFilter: (value, record) => record.buyOrSell.indexOf(value) === 0,
            align: 'center',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.volume*a.price - b.volume*b.price,
            width: 130,
            align: 'center',
            scopedSlots: {customRender: 'totalPrice'},
        },
        {
            title: 'State',
            dataIndex: 'state',
            filters: [
                {
                    text: 'Finished',
                    value: 'Finished',
                },
                {
                    text: 'Pending',
                    value: 'Pending',
                },
                {
                    text: 'Canceled',
                    value: 'Canceled',
                },
            ],
            onFilter: (value, record) => record.state.indexOf(value) === 0,
            align: 'center',
            scopedSlots: {customRender: 'state'},
        },
        {
            title: 'Update Time',
            dataIndex: 'updateTime',
            defaultSortOrder: 'descend',
            sorter: (a, b) => {
                var adate = new Date(a.updateTime);
                var bdate = new Date(b.updateTime);
                return adate.valueOf() - bdate.valueOf();
            },
            align: 'center',
            width: 300,
        },
        {
            title: 'Action',
            scopedSlots: {customRender: 'action'},
            align: 'center',
            width: 150,
        },
    ];

</script>
<style scoped>
    .ant-layout {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
    }

    .ant-layout-footer {
        background: rgba(0, 0, 0, 0);
        color: rgba(255, 255, 255, .85);
    }

    a {
        color: #1b4283;
    }

    a:hover {
        color: #0a7fbe;
    }

    .fd-card {
        border-radius: 5px;
        box-shadow: 0 0 0 1px #e5e5e5;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
        padding-top: 10px;
        margin: 20px;
    }

    .fude-title {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
        -webkit-background-clip: text;
        color: transparent;
    }

    .fude-title {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
        -webkit-background-clip: text;
        color: transparent;
    }

    .ant-form-item {
        margin-bottom: 5px;
    }
    .ant-modal-footer > button:nth-child(1) {
        display: none;
    }
</style>
