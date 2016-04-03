var CachejsLocal = (function (_super) {
   __extends(CachejsLocal, _super);

   function CachejsLocal() {
       _super.call(this);
   }

   CachejsLocal.storage = localStorage;

   return CachejsLocal;
})(Cachejs);