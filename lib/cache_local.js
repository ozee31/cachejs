var CacheLocaljs = (function (_super) {
   __extends(CacheLocaljs, _super);

   function CacheLocaljs() {
       _super.call(this);
   }

   CacheLocaljs.storage = localStorage;

   return CacheLocaljs;
})(Cachejs);