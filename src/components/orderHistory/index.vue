<template>
    <div>
        <div style="font-size: 26px; font-weight: 300; line-height: 36px">
            Transactions from: <br>
            <p class="fude-title"><span style="font-size: 48px">{{this.$store.state.username}}</span>
                <a-button style="margin-left: 20px; transform: translate(0, -8px)" @click="logout"> Log out</a-button>
            <br>
                {{this.$store.state.userComp}} Co., Ltd.
            </p>
        </div>
        <a-row style="width: calc(100vw - 140px)">
            <a-col :span="24">
                <a-table :columns="columns" :data-source="data" :scroll="{x:1600, y:350}">
                <span slot="action" slot-scope="text, record">
                    <a-button type="default" size="large"
                              v-if="record.state == 'Pending'" @click="showModel(record)">Cancel</a-button>
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
        <a-modal v-model="visible" title="Comfirm?"
                 :confirm-loading="confirmLoading"
                 @ok="handleOk" ok-text="Yes" cancel-text="No" >
            <p style="text-align: center;">
                <a-icon type="question-circle" style="font-size: 58px; color: #ff9c46; margin-bottom: 20px"/>
            </p>
            <p>Are you sure to make a cancel order to the order below?</p>
            <ul>
                <li>Product: {{cancelTx.productName}}</li>
                <li>Broker: {{cancelTx.broker}}</li>
                <li>Order Type: {{cancelTx.orderType}}</li>
                <li>Price: {{cancelTx.price}}</li>
                <li>Buy or Sell: {{cancelTx.buyOrSell}}</li>
                <li>Volume: {{cancelTx.volume}}</li>
                <li>Update at: {{cancelTx.updateTime}}</li>
            </ul>
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
                data: [
                    /*
                    {
                        'productName': 'WIT SPET-2020',
                        'broker': 'Everbright Securities Co., Ltd.',
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
                        'broker': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'orderType': 'Market Order',
                        'price': 11.12,
                        'volume': 13,
                        'state': 'Finished',
                        'buyOrSell': "Buy",
                        'updateTime': 'Fri Jun 12 2020 18:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'broker': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'orderType': 'Limit Order',
                        'price': 14.12,
                        'volume': 1100,
                        'state': 'Canceled',
                        'updateTime': 'Fri Jun 12 2020 20:30:19 GMT+0800 (China Standard Time)',
                        'buyOrSell': "Buy",
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'broker': 'Everbright Securities Co., Ltd.',
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
                        'broker': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'orderType': 'Stop Order',
                        'price': 411.12,
                        'volume': 5,
                        'state': 'Finished',
                        'buyOrSell': "Buy",
                        'updateTime': 'Fri Jun 12 2020 21:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'GOLD OCT-2020',
                        'broker': 'Everbright Securities Co., Ltd.',
                        'orderType': 'Limit Order',
                        'price': 314.12,
                        'volume': 5,
                        'state': 'Canceled',
                        'buyOrSell': "Sell",
                        'updateTime': 'Fri Jun 12 2020 21:30:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'WIT OCT-2020',
                        'broker': 'Everbright Securities Co., Ltd.',
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
                        'broker': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'orderType': 'Market Order',
                        'price': 17.12,
                        'volume': 10,
                        'state': 'Finished',
                        'buyOrSell': "Buy",
                        'updateTime': 'Fri Jun 12 2020 22:31:19 GMT+0800 (China Standard Time)'
                    },
                    {
                        'productName': 'GOLD OCT-2020',
                        'broker': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                        'orderType': 'Stop Order',
                        'price': 200,
                        'volume': 10,
                        'state': 'Canceled',
                        'buyOrSell': "Sell",
                        'updateTime': 'Fri Jun 12 2020 23:36:19 GMT+0800 (China Standard Time)'
                    },*/
                ],
                visible: false,
                confirmLoading: false,
                cancelTx: {}
            }
        },
        beforeCreate() {
        },
        methods: {
            logout() {
                this.$store.state.isLogin = false;
                this.$router.push("/signin");
            },
            toPage(url) {
                this.$router.push(url)
            },
            showModel(order) {
                this.cancelTx = order;
                this.visible = true;
            },
            handleOk() {
                /*
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
                            this.data[i].state="Canceled";
                            var now = new Date();
                            this.data[i].updateTime=now.toString();
                        }
                    }
                }, 2000);
                */
                this.confirmLoading = true;
                this.$axios({
                    method: 'post',
                    url: 'http://3.233.219.143:30089/createOrder',
                    data: {
                        'brokerId':this.cancelTx.brokerId,
                        'productId':this.cancelTx.productId,
                        "orderId": this.cancelTx.orderId,
                        "traderId": this.$store.state.userId,
                        "type": 'cancel',
                    },
                    withCredentials: true
                }).then(response => {
                    console.log('response\n', response.data);
                    this.confirmLoading = true;
                    this.visible = false;
                    if (response.data==="OK") {
                        this.$notification['success']({
                            message: 'Canceled Successful!',
                            description:
                                'The order is canceled successfully and it has been dropped down from market depth.',
                        });
                        for (var i in this.data) {
                            if (this.data[i] == this.cancelTx) {
                                this.data[i].state="Canceled";
                                var now = new Date();
                                this.data[i].updateTime=now.toString();
                            }
                        }
                    } else {
                        this.$notification['error']({
                            message: 'Cancel Failed',
                            description:
                                'The order is not in pending state anymore',
                        });
                    }
                });
                console.log(this.cancelTx)
            }
        },
        mounted() {
            // var now = new Date();
            /* var item = {
                'productName': 'WIT OCT-2020',

                'broker': 'Morgan Stanley Huaxin Securities Co., Ltd.',
                'orderType': 'Stop Order',
                'price': 6,
                'volume': 6,
                'totalPrice': 36,
                'state': 'Pending',
                'updateTime': new Date(now.valueOf()-92*1000).toString(),
                'buyOrSell': "Sell"
            };*/
            // this.data.push(item);\
            // http://3.233.219.143:30089/traderOrderHistory?traderId=1
            this.$axios({
                method: 'get',
                url: 'http://3.233.219.143:30089/traderOrderHistory?traderId='+this.$store.state.userId,
                withCredentials: true
            }).then(response => {
                console.log('resp: \n', response);
                var tmpData = response.data;
                // for (var i in tmpData) {
                //     tmpData[i].productName += " OCT-2020";
                // }
                this.data = tmpData;
                console.log(this.data)
            })

        }
    };

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
            fixed: 'left',
            width: 150,
            align: 'center'
        },
        {
            title: 'Broker Name',
            dataIndex: 'broker',
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
            onFilter: (value, record) => record.broker.indexOf(value) === 0,
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
            sorter: (a, b) => a.price*a.volume - b.totalPrice*b.volume,
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
</style>
