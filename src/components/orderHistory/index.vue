<template>
    <div>
        hahah
    </div>
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
