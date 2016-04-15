Cachejs.Session = (function (_super) {
   __extends(CachejsSession, _super);

   function CachejsSession() {
       _super.call(this);
   }

   CachejsSession.storage = sessionStorage;

   return CachejsSession;
})(Cachejs.Engine);