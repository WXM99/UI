<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: 'test',
        data() {
            return {
                websock: null,
                msg: ''
            }
        },
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.websock.close()
        },
        methods: {
            initWebSocket() {
                // todo: change to server ip
                const wsuri = "ws://127.0.0.1:8080";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() {
                let actions = {"test": "12345"};
                this.websocketsend(JSON.stringify(actions));
            },
            websocketonerror() {
                this.initWebSocket();
            },
            websocketonmessage(e) {
                const redata = JSON.parse(e.data);
                this.msg = redata
            },
            websocketsend(Data) {
                this.websock.send(Data);
            },
            websocketclose(e) {
                console.log('断开连接', e);
            },
        },
    }
</script>
<style lang='less'>

</style>
