/*
 * 前端缓存
 */
_global.localStorage || (_global.localStorage = {
    items: {},
    setItem: function (k, v) {
        BI.Cache.addCookie(k, v);
    },
    getItem: function (k) {
        return BI.Cache.getCookie(k);
    },
    removeItem: function (k) {
        BI.Cache.deleteCookie(k);
    },
    key: function () {

    },
    clear: function () {
        this.items = {};
    }
});