<template>
    <div>
        <a-divider>
            <div style="font-size: 26px; font-weight: 300; margin-top: -10px">
                <span class="fude-title">Real-time Market Prices on Subscribed Market Depths</span>
            </div>
        </a-divider>
        <div style="text-align: center">
            <div style="font-size: 16px; font-weight: 300; color: #888">Market Clock</div>
            <div style="font-size: 22px; font-weight: 200">{{time}}</div>
        </div>
        <a-row type="flex">
            <a-col :span="12" v-for="board in this.allBoards" :key='board.productId+board.brokerId' >
                <div class="fd-card">
                    <p class="pr-title">{{board.productName + ' ' + board.productPeriod}}</p>
                    <p style="text-align: center">Update At: {{time}}</p>
                    <a-row style="text-align: center">
                        <a-col :span="12">
                            <a-statistic
                                    title="Market Price of Selling"
                                    :value="board.sellPrice"
                                    :precision="2"
                                    suffix="CNY/share"
                                    :value-style="{ color: '#345586' }"
                                    style="margin-left: 20px">
                                <template #prefix>
                                    <a-icon type="logout"/>
                                </template>
                            </a-statistic>
                        </a-col>
                        <a-col :span="12">
                            <a-statistic
                                    title="Market Price of Buying"
                                    :value="board.buyPrice"
                                    :precision="2"
                                    suffix="CNY/share"
                                    :value-style="{ color: '#cf7426' }"
                                    style="margin-left: 20px">
                                <template #prefix>
                                    <a-icon type="login"/>
                                </template>
                            </a-statistic>
                        </a-col>
                    </a-row>
                    <div style="text-align: center; margin-top: 20px">
                        <a-button @click="toPage('/broker/md/'+board.productId+'-'+board.brokerId)">Detailed Market Depth</a-button>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeKey: ['1', '2'],
                deadline: Date.now() + 1000 * 60 * 60 * 24 * 1,
                time: '',
                prices: [
                    [12.12, 10.23], [15.31, 10, 14], [22.12, 19.89], [23.54, 21.41], [351.13, 330.32], [364.86, 320.90]
                ],
                allBoards: [],
            }
        },
        mounted() {
            let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
            this.time = setInterval(() => {
                _this.time = new Date(); // 修改数据date
            }, 1000);
            this.$axios({
                method: 'get',
                url: "http://3.233.219.143:30089/prices",
                withCredentials: true
            }).then(response => {
                console.log("resp: ", response);
                this.$store.state.allMds = response.data;
                for (var i in response.data) {
                    if (response.data[i].brokerName === this.$store.state.userComp) {
                        this.allBoards.push(response.data[i]);
                    }
                }
            })
        },
        methods: {
            toPage(url) {
                this.$router.push(url)
            },
            updatePrices() {
                var tmp = [];
                for (var i in this.prices) {
                    var prc = this.prices[i];
                    var p1 = prc[0] + (Math.random() - 0.5) * 2;
                    var p2 = prc[1] + (Math.random() - 0.5) * 2;
                    prc[0] = Math.max(p1, p2);
                    prc[1] = Math.min(p1, p2);
                    tmp.push(prc)
                }
                this.prices = tmp;
            }
        }
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

    .br-title {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
        color: #fff;
        padding: 10px;
        width: 100%;
        transform: translate(0%, -10px);
        font-weight: 300;
        font-size: 26px;
        text-align: center;
    }

    .pr-title {
        text-align: center;
        font-weight: 300;
        font-size: 16px;
    }
</style>
