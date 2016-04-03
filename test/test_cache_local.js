describe("CacheLocaljs", function() {
	var _class = CachejsLocal;

	afterEach(function() {
		localStorage.clear();
        sessionStorage.clear();
	});

	function time() {
		return Math.floor(Date.now() / 1000);
	}




	describe("getStorage()", function() {

		it('is localStorage', function() {
			expect( _class.getStorage() ).toBe( localStorage );
		});

		it('is not sessionStorage', function() {
			expect( _class.getStorage() ).not.toBe( sessionStorage );
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

		it('update a data (readOnly)', function() {

			var key = 'hello';
            var created = time();
            var valInsert = 'world';
			_class.set(key, valInsert, null, true);

			var valUpdate = 'girl';

			var expected = JSON.stringify({0:valInsert, 1:created, 3:true});
			var returnFn = _class.set(key, valUpdate);

			expect(false).toBe(returnFn);
			expect(expected).toBe( localStorage.getItem(key) );
		});
	})





    describe("getData()", function() {

        it('get a string', function() {

            var key = 'hello';
            var val = 'world';

            _class.set(key, val);

            var expected = {
                0: val,
                1: time(),
            };
            var result = _class.getData(key);

            expect(expected).toEqual( result );
        });

        it('get an array', function() {

            var key = 'hello';
            var val = [1,2,3];

            _class.set(key, val);

            var expected = {
                0: val,
                1: time(),
            };
            var result = _class.getData(key);

            expect(expected).toEqual( result );
        });

        it('get an object', function() {

            var key = 'hello';
            var val = {t1:1, t2:2};

            _class.set(key, val);

            var expected = {
                0: val,
                1: time(),
            };
            var result = _class.getData(key);

            expect(expected).toEqual( result );
        });

        it('get undefided', function() {
            expect(null).toBe( _class.getData('blablablabla') );
        });

        it('get not set with cachejs', function() {
            var key = 'nocachejs';
            var val = 'oh no !!!';

            localStorage.setItem(key, val);

            var expected = {
                0: val
            };
            var result = _class.getData(key);

            expect(expected).toEqual( result );
        });

        it('get a data no expired', function() {

            var key        = 'hello';
            var val        = 'world';
            var expiration = 3600;

            _class.set(key, val, expiration);

            var expected = {0:val, 1:time(), 2:time()+expiration};
            var result   = _class.getData(key);

            expect(expected).toEqual( result );
        });

        it('get a data expired', function() {

            var key = 'hello';
            var val = 'world';
            var created = 1451602800 // 2016-01-01
            var expired = created + 3600;

            localStorage.setItem(key, JSON.stringify({0:val, 1:created, 2:expired}));
            var result = _class.getData(key);

            expect(null).toBe(result);
            expect(null).toBe( localStorage.getItem(key) );
        });

        it('get a data (readOnly)', function() {

            var key = 'hello';
            var val = 'world';

            _class.set(key, val, null, true)

            var expected = {0:val, 1:time(), 3:true};
            var result = _class.getData(key);

            expect(expected).toEqual(result);
        });
    });




    describe("get()", function() {

        it('get a string', function() {
            var key = 'hello';
            var val = 'world';

            _class.set(key, val);
            var result = _class.get(key);

            expect(val).toEqual(result);
        });

        it('get an array', function() {
            var key = 'hello';
            var val = [1,2,3];

            _class.set(key, val);
            var result = _class.get(key);

            expect(val).toEqual(result);
        });

        it('get an object', function() {
            var key = 'hello';
            var val = {t1:1, t2:2};

            _class.set(key, val);
            var result = _class.get(key);

            expect(val).toEqual(result);
        });

        it('get undefided', function() {
            expect(null).toBe( _class.get('blablablabla') );
        });

        it('get not set with cachejs', function() {
            var key = 'nocachejs';
            var val = 'oh no !!!';

            localStorage.setItem(key, val);
            var result = _class.get(key);

            expect(val).toEqual(result);
        });

        it('get a data no expired', function() {

            var key        = 'hello';
            var val        = 'world';
            var expiration = 3600;

            _class.set(key, val, expiration);
            var result = _class.get(key);

            expect(val).toEqual(result);
        });

        it('get a data expired', function() {

            var key = 'hello';
            var val = 'world';
            var created = 1451602800 // 2016-01-01
            var expired = created + 3600;

            localStorage.setItem(key, JSON.stringify({0:val, 1:created, 2:expired}));
            var result = _class.get(key);

            expect(null).toBe(result);
            expect(null).toBe( localStorage.getItem(key) );
        });

        it('get a data (readOnly)', function() {

            var key = 'hello';
            var val = 'world';

            _class.set(key, val, null, true);
            var result = _class.get(key);

            expect(val).toEqual(result);
        });
    });




    describe("remove()", function() {

        it('remove', function() {
            var key = 'hello';
            var val = 'world';

            _class.set(key, val);

            expect(null).not.toBe( localStorage.getItem(key) );
            expect(true).toBe( _class.remove(key) );
            expect(null).toBe( localStorage.getItem(key) );
        });

        it('remove not exist', function() {
            expect(true).toBe( _class.remove('Piiiikaaaachuuuuuuuuuu !!!!!') );
        });

        it('not remove if readonly', function() {
            var key = 'hello';
            var val = 'world';

            _class.set(key, val, null, true);

            expect(null).not.toBe( localStorage.getItem(key) );
            expect(false).toBe( _class.remove(key) );
            expect(null).not.toBe( localStorage.getItem(key) );
        });
    });




    describe("isExpired()", function() {

        it('is expired', function() {
            var key = 'hello';
            var val = 'world';
            var created = 1451602800 // 2016-01-01
            var expired = created + 3600;

            localStorage.setItem(key, JSON.stringify({0:val, 1:created, 2:expired}));
            var result = _class.isExpired(key);

            expect(true).toBe(result);
        });

        it('not expired', function() {
            var key        = 'hello';
            var val        = 'world';
            var expiration = 3600;

            _class.set(key, val, expiration);
            var result = _class.isExpired(key);

            expect(false).toBe(result);
        });

        it('not exist', function() {
            var result   = _class.isExpired('tictac');
            expect(null).toBe(result);
        });

        it('not have expiration', function() {
            var key = 'hello';
            var val = 'world';

            _class.set(key, val);
            var result = _class.isExpired(key);

            expect(false).toBe(result);
        });
    });





    describe("isReadonly()", function() {

        it('is readonly', function() {
            var key = 'hello';
            var val = 'world';

            _class.set(key, val, null, true)
            var result = _class.isReadonly(key);

            expect(true).toBe(result);
        });

        it('not readonly', function() {
            var key = 'hello';
            var val = 'world';

            _class.set(key, val)
            var result = _class.isReadonly(key);

            expect(false).toBe(result);
        });

        it('not exist', function() {
            var result = _class.isReadonly('tictac');
            expect(null).toBe(result);
        });
    });




    describe("clear()", function() {

        it('clear', function() {
            _class.set('k1', 'v1', null, true);
            _class.set('k2', 'v2');
            sessionStorage.setItem('s1', 's2');

            _class.clear();

            expect(null).toBe( localStorage.getItem('k1') );
            expect(null).toBe( localStorage.getItem('k2') );
            expect('s2').toEqual( sessionStorage.getItem('s1') );
        });
    });
});