// shims-global.d.ts
export {}
// 或者也可以这么写，随便import个什么东西
// import Vue from 'vue'

declare global {
    interface ABC {
        convertFrom: any;
    }
}
