var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var Cachejs = (function (undefined) {

    function Cachejs() {};

    /**
     * Add the key to the storage, or update that key's value if it already exists
     * @param {string} key      : name of the key you want to create/updat
     * @param {mixed} value     : value you want to give the key you are creating/updating (string, int, array, object...)
     * @param {mixed} expire    : (int) the data expires in x seconds || (falsy) no expiration
     * @param {mixed} readOnly  : (true) prohibit modification || (falsy)
     */
    Cachejs.set = function(key, value, expire, readOnly) {

        var data = {};
        var now  = time();

        data[self.VALUE]   = value;
        data[self.CREATED] = now;

        if ( expire ) {
            expire = parseInt(expire, 10);

            if ( ! expire )
                return false;

            data[self.EXPIRED] = now + expire;
        }

        if ( readOnly )
            data[self.READ_ONLY] = true;

        data = JSON.stringify(data);

        try {
            this.storage.setItem(key, data);
            return true;
        } catch(e) {
            return false;
        }
    };

    Cachejs.get_storage = function() {
        return this.storage;
    };



    /** Private functions */

        /**
         * Get current timestamp in second
         * @return {int}
         */
        var time = function () {
            return Math.floor(Date.now() / 1000);
        };

    Cachejs.storage;
    var self = Cachejs;

    /** Constantes */
        Cachejs.VALUE     = 0;
        Cachejs.CREATED   = 1;
        Cachejs.EXPIRED   = 2;
        Cachejs.READ_ONLY = 3;

    return Cachejs;
})(undefined);