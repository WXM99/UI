<template>
    <a-layout id="components-layout-demo-fixed">
        <a-layout-header :style="{ position: 'fixed', zIndex: 999, width: '100%' }">
            <div class="logo" @click="toPage('/broker')">
                <span class="fude-title" style="font-weight: 200; font-size: 40px">F U D E</span>
                <span style="font-weight: 500;">&nbsp;&nbsp;&nbsp;Broker Version&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <br>
                <span style="font-weight: 300">FU</span>TURES TRA<span style="font-weight: 300">DE</span> SYSTEM
            </div>
            <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <!--:default-selected-keys="['2']"-->
                <a-menu-item key="0" @click="toPage('/broker')" style="color: #fff; margin-right: 40px; font-size: 26px; margin-bottom: 5px">
                    Morgan Stanley Huaxin Securities Co., Ltd.<span style="font-size: 12px"> 600621</span>
                </a-menu-item>
                <a-menu-item key="1" @click="toPage('/broker')" style="margin-bottom: 10px">Market Depth</a-menu-item>
                <a-menu-item key="2" @click="toPage('/broker/tx')" style="margin-bottom: 10px">Transcation Records</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', minHeight: '100%'}">
            <a-breadcrumb :style="{ margin: '36px 0' }">
                <a-breadcrumb-item>
                </a-breadcrumb-item>
            </a-breadcrumb>
            <div :style="{ background: '#fff', padding: '24px', minHeight: '580px' }">
                <router-view/>
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center', float: 'bottom'}">FUDE ©2020 Created by FUDE Group of EIS. SJTU.
            <a-icon @click="toGithub" type="github"></a-icon>
        </a-layout-footer>
    </a-layout>
</template>
<style scoped>
    #components-layout-demo-fixed .logo {
        width: 220px;
        height: 44px;
        background: rgba(255, 255, 255, 0.0);
        margin: 14px 0px 0px 0;
        float: left;
        line-height: 18px;
        color: #fff;
        text-align: center;
        font-weight: 100;
        font-size: 11px;
    }

    .fude-title {
        background: linear-gradient(#97b8d5, #ffffff);;
        -webkit-background-clip: text;
        color: transparent;
    }

    .ant-layout-header {
        background: linear-gradient(to right, #1b4283, #0a7fbe);
    }

    .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
        background: rgba(0, 0, 0, 0);
        text-align: right;
        font-size: 20px;
        font-weight: 300;
    }

    .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
        background: radial-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
    }
    .anticon:hover{
        color: #0a7fbe
    }
</style>
<script>
    export default {
        data() {
            return {
                id: 0
            }
        },
        methods: {
            toGithub () {
                let url="https://github.com/FUDE-EIS2020";
                window.open(url,'_blank');
            },
            toPage(url) {
                this.$router.push(url)
            }
        },
        mounted() {
        }
    };
</script>
