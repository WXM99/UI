<template>
    <a-layout>
        <a-layout-content :style="{ padding: '0 50px', marginTop: '40px', minHeight: '100%'}">
            <a-breadcrumb :style="{ margin: '36px 0' }">
                <a-breadcrumb-item>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <div :style="{ background: '#fff', padding: '24px'}">
                <div>
                    <a-row type="flex" justify="space-around" align="middle">
                        <a-col :span="12">
                            <a-divider orientation="left" style="margin-top: 5px; ">
                                <div style="font-size: 46px;  color: #1b4283;">
                                    <span class="fude-title">FUDE.com</span>
                                </div>
                            </a-divider>
                            <div style="font-size: 16px; color: #9f9f9f; font-weight: 200;">
                                FUDE stands for a futures trade system which acts as an OTC market and brings traders
                                together on different brokers' platform.
                            </div>
                            <a-divider orientation="left" style="margin-top: 15px; ">
                                <div style="font-size: 36px;color: #1b4283;">
                                    <span class="fude-title">FAQ</span>
                                </div>
                            </a-divider>
                            <div style="font-size: 16px; color: #9f9f9f;font-weight: 200">
                                <ul>
                                    <li>How can I register as a trader?</li>
                                    <li style="margin-bottom: 5px">Contact with your trading company manager and
                                        apply for your own account under your company.
                                    </li>
                                    <li>How to participate the market as a trading company?</li>
                                    <li style="margin-bottom: 5px">Contact with us at <a>trading.registry@fude.com</a>
                                        to open up a new trading company
                                        gateway for traders of your company.
                                    </li>
                                    <li>How to participate the market as a broker?</li>
                                    <li style="margin-bottom: 5px">Contact with us at <a>broker.registry@fude.com</a> to
                                        open up a broker gateway and show your market depth.
                                    </li>
                                </ul>
                            </div>
                            <a-divider orientation="left" style="margin-top: 15px; ">
                                <div style="font-size: 36px;  color: #1b4283;">
                                    <span class="fude-title">About us</span>
                                </div>
                            </a-divider>
                            <div style="font-size: 16px; color: #9f9f9f;font-weight: 200; text-align: center">
                                <a-row type="flex" justify="space-around" align="middle">
                                    <a-col :span="8">
                                        <a href="https://github.com/orgs/FUDE-EIS2020/people">
                                            <a-icon type="user" style="font-size: 26px"/>
                                            <br>
                                            Developers
                                        </a>
                                    </a-col>
                                    <a-col :span="8">
                                        <a href="https://github.com/FUDE-EIS2020">
                                            <a-icon type="github" style="font-size: 26px"/>
                                            <br>
                                            Repositories
                                        </a>
                                    </a-col>
                                    <a-col :span="8">
                                        <a href="https://github.com/FUDE-EIS2020/UI/issues">
                                            <a-icon type="message" style="font-size: 26px"/>
                                            <br>
                                            Issues
                                        </a>
                                    </a-col>
                                </a-row>
                            </div>
                        </a-col>
                        <a-col :span="10">
                            <div class="fd-card">
                                <div style="font-size: 26px; color: #0a7fbe">
                                    <span class="fude-title">Trader</span></div>
                                <a-form
                                        id="components-form-demo-normal-login"
                                        :form="traderForm"
                                        class="login-form"
                                        @submit="traderLogin">
                                    <a-form-item>
                                        <a-select
                                                placeholder="Select Your Trading Company"
                                                style="width: 100%"
                                                v-decorator="['company']">
                                            <a-select-option value="MSHX">
                                                Morgan Stanley Huaxin Securities
                                            </a-select-option>
                                            <a-select-option value="EB">
                                                Everbright Securities
                                            </a-select-option>
                                            <a-select-option value="SI">
                                                Sinolink Securities
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-input v-decorator="['userName']"
                                                 placeholder="Username">
                                            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-input v-decorator="['password']"
                                                 type="password"
                                                 placeholder="Password">
                                            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-checkbox style="float: right"
                                                    v-decorator="['remember',{valuePropName: 'checked', initialValue: false}]">
                                            Remember me
                                        </a-checkbox>
                                        <a-button type="primary" html-type="submit" class="login-form-button"
                                                  style="float: left; margin-top: 5px">
                                            Sign in
                                        </a-button>
                                    </a-form-item>
                                </a-form>
                            </div>
                            <div class="fd-card">
                                <div style="font-size: 26px; color: #0a7fbe">
                                    <span class="fude-title">Broker</span></div>
                                <a-form
                                        id="components-form-normal-login-b"
                                        :form="brokerForm"
                                        class="b-login-form"
                                        @submit="brokerLogin">
                                    <a-form-item>
                                        <a-select
                                                placeholder="Select Your Broker Company"
                                                style="width: 100%" v-decorator="['company']">
                                            <a-select-option value="MS">
                                                Morgan Stanley Huaxin Securities
                                            </a-select-option>
                                            <a-select-option value="EB">
                                                Everbright Securities
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-input v-decorator="['password',
                                                { rules: [{ required: true, message: 'Please input your Password!' }] },]"
                                                 type="password"
                                                 placeholder="Password">
                                            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                                        </a-input>
                                    </a-form-item>
                                    <a-form-item>
                                        <a-checkbox style="float: right"
                                                    v-decorator="['remember',{valuePropName: 'checked', initialValue: false}]">
                                            Remember me
                                        </a-checkbox>
                                        <a-button type="primary" html-type="submit" class="login-form-button"
                                                  style="float: left; margin-top: 5px">
                                            Sign in
                                        </a-button>
                                    </a-form-item>
                                </a-form>
                            </div>
                            <div class="fd-card">
                                <div style="font-size: 26px; color: #0a7fbe">
                                    <span class="fude-title">Trading Company</span></div>
                                Contact with us at <a>trading.registry@fude.com</a>
                                to open up a new trading company gateway for traders of your company.
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center', float: 'bottom'}">FUDE Group ©2020 Created by EIS. SJTU.
            <a-icon @click="toGithub" type="github"></a-icon>
        </a-layout-footer>
    </a-layout>
</template>
<script>
    export default {
        data() {
            return {
                id: 0
            }
        },
        beforeCreate() {
            this.traderForm = this.$form.createForm(this, {name: 'trader_login'});
            this.brokerForm = this.$form.createForm(this, {name: 'broker_login'});
        },
        methods: {
            toGithub() {
                let url = "https://github.com/FUDE-EIS2020";
                window.open(url, '_blank');
            },
            traderLogin(e) {
                e.preventDefault();
                this.traderForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$router.push('/')
                    }
                });
            },
            brokerLogin(e) {
                e.preventDefault();
                this.traderForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$router.push('/broker')
                    }
                });
            }
        },
        mounted() {
        }
    };
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

    .ant-form-item {
        margin-bottom: 5px;
    }
</style>
