describe("CacheLocaljs", function() {
	var _class = CacheLocaljs;

	afterEach(function() {
		localStorage.clear();
	});

	function time() {
		return Math.floor(Date.now() / 1000);
	}




	describe("get_storage()", function() {

		it('is localStorage', function() {
			expect( _class.get_storage() ).toBe( localStorage );
		});

		it('is not sessionStorage', function() {
			expect( _class.get_storage() ).not.toBe( sessionStorage );
		});
	});



	describe("set()", function() {

		it('add a new data (string)', function() {

			var key = 'hello';
			var val = 'word';

			var expected = JSON.stringify({0:val, 1:time()});
			var returnFn = _class.set(key, val);

			expect(true).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
			expect(null).toBe( sessionStorage.getItem(key) );
		});

		it('add a new data (array)', function() {

			var key = 'hello';
			var val = [1,2,3];

			var expected = JSON.stringify({0:val, 1:time()});
			var returnFn = _class.set(key, val);

			expect(true).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
		});

		it('add a new data (object)', function() {

			var key = 'hello';
			var val = {t1:1, t2:2};

			var expected = JSON.stringify({0:val, 1:time()});
			var returnFn = _class.set(key, val);

			expect(true).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
		});

		it('add a new data with expiration', function() {

			var key = 'hello';
			var val = 'world';
			var expiration = 3600;

			var expected = JSON.stringify({0:val, 1:time(), 2:time()+expiration});
			var returnFn = _class.set(key, val, expiration);

			expect(true).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
		});

		it('add a new data with expiration (not int) => fail', function() {

			var key = 'hello';
			var val = 'world';
			var expiration = 'notAInt';

			var returnFn = _class.set(key, val, expiration);

			expect(false).toBe(returnFn);
			expect(null).toBe( localStorage.getItem(key) );
		});

		it('add a new data (readOnly)', function() {

			var key = 'hello';
			var val = 'world';

			var expected = JSON.stringify({0:val, 1:time(), 3:true});
			var returnFn = _class.set(key, val, null, true);

			expect(true).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
		});

		it('update a data', function() {

			var key = 'hello';
			_class.set(key, 'world');

			var val = 'girl';

			var expected = JSON.stringify({0:val, 1:time()});
			var returnFn = _class.set(key, val);

			expect(true).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
		});
	})
});