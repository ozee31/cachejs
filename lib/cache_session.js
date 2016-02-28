var CacheSessionjs = (function (_super) {
   __extends(CacheSessionjs, _super);

   function CacheSessionjs() {
       _super.call(this);
   }

   CacheSessionjs.storage = sessionStorage;

   return CacheSessionjs;
})(Cachejs);