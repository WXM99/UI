<template>
    <div>
        信息
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: 'test',
        data() {
            return {
                websock: null,
                username: "wxm",
                msg: []
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
        },
    }
</script>
<style lang='less'>

</style>
