describe("CacheLocaljs", function() {
	var _class = CacheSessionjs;

	afterEach(function() {
		sessionStorage.clear();
	});

	describe("get_storage()", function() {

		it('is SessionStorage', function() {
			expect( _class.get_storage() ).toBe( sessionStorage );
		});

		it('is not localStorage', function() {
			expect( _class.get_storage() ).not.toBe( localStorage );
		});
	});
});