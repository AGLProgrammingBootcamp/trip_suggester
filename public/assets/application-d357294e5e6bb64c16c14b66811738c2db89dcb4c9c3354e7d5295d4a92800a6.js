/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: 1.0.8
 * Revision: 1250
 *
 * Copyright (c) 2009-2013 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot dot com or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * sprintf functions contained in jqplot.sprintf.js by Ash Searle:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 * 
 */

(function($) {
    /**
     * Class: $.jqplot.PieRenderer
     * Plugin renderer to draw a pie chart.
     * x values, if present, will be used as slice labels.
     * y values give slice size.
     * 
     * To use this renderer, you need to include the 
     * pie renderer plugin, for example:
     * 
     * > <script type="text/javascript" src="plugins/jqplot.pieRenderer.js"></script>
     * 
     * Properties described here are passed into the $.jqplot function
     * as options on the series renderer.  For example:
     * 
     * > plot2 = $.jqplot('chart2', [s1, s2], {
     * >     seriesDefaults: {
     * >         renderer:$.jqplot.PieRenderer,
     * >         rendererOptions:{
     * >              sliceMargin: 2,
     * >              startAngle: -90
     * >          }
     * >      }
     * > });
     * 
     * A pie plot will trigger events on the plot target
     * according to user interaction.  All events return the event object,
     * the series index, the point (slice) index, and the point data for 
     * the appropriate slice.
     * 
     * 'jqplotDataMouseOver' - triggered when user mouseing over a slice.
     * 'jqplotDataHighlight' - triggered the first time user mouses over a slice,
     * if highlighting is enabled.
     * 'jqplotDataUnhighlight' - triggered when a user moves the mouse out of
     * a highlighted slice.
     * 'jqplotDataClick' - triggered when the user clicks on a slice.
     * 'jqplotDataRightClick' - tiggered when the user right clicks on a slice if
     * the "captureRightClick" option is set to true on the plot.
     */
    $.jqplot.PieRenderer = function(){
        $.jqplot.LineRenderer.call(this);
    };
    
    $.jqplot.PieRenderer.prototype = new $.jqplot.LineRenderer();
    $.jqplot.PieRenderer.prototype.constructor = $.jqplot.PieRenderer;
    
    // called with scope of a series
    $.jqplot.PieRenderer.prototype.init = function(options, plot) {
        // Group: Properties
        //
        // prop: diameter
        // Outer diameter of the pie, auto computed by default
        this.diameter = null;
        // prop: padding
        // padding between the pie and plot edges, legend, etc.
        this.padding = 20;
        // prop: sliceMargin
        // angular spacing between pie slices in degrees.
        this.sliceMargin = 0;
        // prop: fill
        // true or false, whether to fil the slices.
        this.fill = true;
        // prop: shadowOffset
        // offset of the shadow from the slice and offset of 
        // each succesive stroke of the shadow from the last.
        this.shadowOffset = 2;
        // prop: shadowAlpha
        // transparency of the shadow (0 = transparent, 1 = opaque)
        this.shadowAlpha = 0.07;
        // prop: shadowDepth
        // number of strokes to apply to the shadow, 
        // each stroke offset shadowOffset from the last.
        this.shadowDepth = 5;
        // prop: highlightMouseOver
        // True to highlight slice when moused over.
        // This must be false to enable highlightMouseDown to highlight when clicking on a slice.
        this.highlightMouseOver = true;
        // prop: highlightMouseDown
        // True to highlight when a mouse button is pressed over a slice.
        // This will be disabled if highlightMouseOver is true.
        this.highlightMouseDown = false;
        // prop: highlightColors
        // an array of colors to use when highlighting a slice.
        this.highlightColors = [];
        // prop: dataLabels
        // Either 'label', 'value', 'percent' or an array of labels to place on the pie slices.
        // Defaults to percentage of each pie slice.
        this.dataLabels = 'percent';
        // prop: showDataLabels
        // true to show data labels on slices.
        this.showDataLabels = false;
        // prop: dataLabelFormatString
        // Format string for data labels.  If none, '%s' is used for "label" and for arrays, '%d' for value and '%d%%' for percentage.
        this.dataLabelFormatString = null;
        // prop: dataLabelThreshold
        // Threshhold in percentage (0-100) of pie area, below which no label will be displayed.
        // This applies to all label types, not just to percentage labels.
        this.dataLabelThreshold = 3;
        // prop: dataLabelPositionFactor
        // A Multiplier (0-1) of the pie radius which controls position of label on slice.
        // Increasing will slide label toward edge of pie, decreasing will slide label toward center of pie.
        this.dataLabelPositionFactor = 0.52;
        // prop: dataLabelNudge
        // Number of pixels to slide the label away from (+) or toward (-) the center of the pie.
        this.dataLabelNudge = 2;
        // prop: dataLabelCenterOn
        // True to center the data label at its position.
        // False to set the inside facing edge of the label at its position.
        this.dataLabelCenterOn = true;
        // prop: startAngle
        // Angle to start drawing pie in degrees.  
        // According to orientation of canvas coordinate system:
        // 0 = on the positive x axis
        // -90 = on the positive y axis.
        // 90 = on the negaive y axis.
        // 180 or - 180 = on the negative x axis.
        this.startAngle = 0;
        this.tickRenderer = $.jqplot.PieTickRenderer;
        // Used as check for conditions where pie shouldn't be drawn.
        this._drawData = true;
        this._type = 'pie';
        
        // if user has passed in highlightMouseDown option and not set highlightMouseOver, disable highlightMouseOver
        if (options.highlightMouseDown && options.highlightMouseOver == null) {
            options.highlightMouseOver = false;
        }
        
        $.extend(true, this, options);

        if (this.sliceMargin < 0) {
            this.sliceMargin = 0;
        }

        this._diameter = null;
        this._radius = null;
        // array of [start,end] angles arrays, one for each slice.  In radians.
        this._sliceAngles = [];
        // index of the currenty highlighted point, if any
        this._highlightedPoint = null;
        
        // set highlight colors if none provided
        if (this.highlightColors.length == 0) {
            for (var i=0; i<this.seriesColors.length; i++){
                var rgba = $.jqplot.getColorComponents(this.seriesColors[i]);
                var newrgb = [rgba[0], rgba[1], rgba[2]];
                var sum = newrgb[0] + newrgb[1] + newrgb[2];
                for (var j=0; j<3; j++) {
                    // when darkening, lowest color component can be is 60.
                    newrgb[j] = (sum > 570) ?  newrgb[j] * 0.8 : newrgb[j] + 0.3 * (255 - newrgb[j]);
                    newrgb[j] = parseInt(newrgb[j], 10);
                }
                this.highlightColors.push('rgb('+newrgb[0]+','+newrgb[1]+','+newrgb[2]+')');
            }
        }
        
        this.highlightColorGenerator = new $.jqplot.ColorGenerator(this.highlightColors);
        
        plot.postParseOptionsHooks.addOnce(postParseOptions);
        plot.postInitHooks.addOnce(postInit);
        plot.eventListenerHooks.addOnce('jqplotMouseMove', handleMove);
        plot.eventListenerHooks.addOnce('jqplotMouseDown', handleMouseDown);
        plot.eventListenerHooks.addOnce('jqplotMouseUp', handleMouseUp);
        plot.eventListenerHooks.addOnce('jqplotClick', handleClick);
        plot.eventListenerHooks.addOnce('jqplotRightClick', handleRightClick);
        plot.postDrawHooks.addOnce(postPlotDraw);
    };
    
    $.jqplot.PieRenderer.prototype.setGridData = function(plot) {
        // set gridData property.  This will hold angle in radians of each data point.
        var stack = [];
        var td = [];
        var sa = this.startAngle/180*Math.PI;
        var tot = 0;
        // don't know if we have any valid data yet, so set plot to not draw.
        this._drawData = false;
        for (var i=0; i<this.data.length; i++){
            if (this.data[i][1] != 0) {
                // we have data, O.K. to draw.
                this._drawData = true;
            }
            stack.push(this.data[i][1]);
            td.push([this.data[i][0]]);
            if (i>0) {
                stack[i] += stack[i-1];
            }
            tot += this.data[i][1];
        }
        var fact = Math.PI*2/stack[stack.length - 1];
        
        for (var i=0; i<stack.length; i++) {
            td[i][1] = stack[i] * fact;
            td[i][2] = this.data[i][1]/tot;
        }
        this.gridData = td;
    };
    
    $.jqplot.PieRenderer.prototype.makeGridData = function(data, plot) {
        var stack = [];
        var td = [];
        var tot = 0;
        var sa = this.startAngle/180*Math.PI;
        // don't know if we have any valid data yet, so set plot to not draw.
        this._drawData = false;
        for (var i=0; i<data.length; i++){
            if (this.data[i][1] != 0) {
                // we have data, O.K. to draw.
                this._drawData = true;
            }
            stack.push(data[i][1]);
            td.push([data[i][0]]);
            if (i>0) {
                stack[i] += stack[i-1];
            }
            tot += data[i][1];
        }
        var fact = Math.PI*2/stack[stack.length - 1];
        
        for (var i=0; i<stack.length; i++) {
            td[i][1] = stack[i] * fact;
            td[i][2] = data[i][1]/tot;
        }
        return td;
    };

    function calcRadiusAdjustment(ang) {
        return Math.sin((ang - (ang-Math.PI) / 8 / Math.PI )/2.0);
    }

    function calcRPrime(ang1, ang2, sliceMargin, fill, lineWidth) {
        var rprime = 0;
        var ang = ang2 - ang1;
        var absang = Math.abs(ang);
        var sm = sliceMargin;
        if (fill == false) {
            sm += lineWidth;
        }

        if (sm > 0 && absang > 0.01 && absang < 6.282) {
            rprime = parseFloat(sm) / 2.0 / calcRadiusAdjustment(ang);
        }

        return rprime;
    }
    
    $.jqplot.PieRenderer.prototype.drawSlice = function (ctx, ang1, ang2, color, isShadow) {
        if (this._drawData) {
            var r = this._radius;
            var fill = this.fill;
            var lineWidth = this.lineWidth;
            var sm = this.sliceMargin;
            if (this.fill == false) {
                sm += this.lineWidth;
            }
            ctx.save();
            ctx.translate(this._center[0], this._center[1]);
            
            var rprime = calcRPrime(ang1, ang2, this.sliceMargin, this.fill, this.lineWidth);

            var transx = rprime * Math.cos((ang1 + ang2) / 2.0);
            var transy = rprime * Math.sin((ang1 + ang2) / 2.0);

            if ((ang2 - ang1) <= Math.PI) {
                r -= rprime;  
            }
            else {
                r += rprime;
            }

            ctx.translate(transx, transy);
            
            if (isShadow) {
                for (var i=0, l=this.shadowDepth; i<l; i++) {
                    ctx.save();
                    ctx.translate(this.shadowOffset*Math.cos(this.shadowAngle/180*Math.PI), this.shadowOffset*Math.sin(this.shadowAngle/180*Math.PI));
                    doDraw(r);
                }
                for (var i=0, l=this.shadowDepth; i<l; i++) {
                    ctx.restore();
                }
            }
    
            else {
                doDraw(r);
            }
            ctx.restore();
        }
    
        function doDraw (rad) {
            // Fix for IE and Chrome that can't seem to draw circles correctly.
            // ang2 should always be <= 2 pi since that is the way the data is converted.
            // 2Pi = 6.2831853, Pi = 3.1415927
             if (ang2 > 6.282 + this.startAngle) {
                ang2 = 6.282 + this.startAngle;
                if (ang1 > ang2) {
                    ang1 = 6.281 + this.startAngle;
                }
            }
            // Fix for IE, where it can't seem to handle 0 degree angles.  Also avoids
            // ugly line on unfilled pies.
            if (ang1 >= ang2) {
                return;
            }            
        
            ctx.beginPath();  
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.arc(0, 0, rad, ang1, ang2, false);
            ctx.lineTo(0,0);
            ctx.closePath();
        
            if (fill) {
                ctx.fill();
            }
            else {
                ctx.stroke();
            }
        }
    };
    
    // called with scope of series
    $.jqplot.PieRenderer.prototype.draw = function (ctx, gd, options, plot) {
        var i;
        var opts = (options != undefined) ? options : {};
        // offset and direction of offset due to legend placement
        var offx = 0;
        var offy = 0;
        var trans = 1;
        var colorGenerator = new $.jqplot.ColorGenerator(this.seriesColors);
        if (options.legendInfo && options.legendInfo.placement == 'insideGrid') {
            var li = options.legendInfo;
            switch (li.location) {
                case 'nw':
                    offx = li.width + li.xoffset;
                    break;
                case 'w':
                    offx = li.width + li.xoffset;
                    break;
                case 'sw':
                    offx = li.width + li.xoffset;
                    break;
                case 'ne':
                    offx = li.width + li.xoffset;
                    trans = -1;
                    break;
                case 'e':
                    offx = li.width + li.xoffset;
                    trans = -1;
                    break;
                case 'se':
                    offx = li.width + li.xoffset;
                    trans = -1;
                    break;
                case 'n':
                    offy = li.height + li.yoffset;
                    break;
                case 's':
                    offy = li.height + li.yoffset;
                    trans = -1;
                    break;
                default:
                    break;
            }
        }
        
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var cw = ctx.canvas.width;
        var ch = ctx.canvas.height;
        var w = cw - offx - 2 * this.padding;
        var h = ch - offy - 2 * this.padding;
        var mindim = Math.min(w,h);
        var d = mindim;
        
        // Fixes issue #272.  Thanks hugwijst!
        // reset slice angles array.
        this._sliceAngles = [];

        var sm = this.sliceMargin;
        if (this.fill == false) {
            sm += this.lineWidth;
        }
        
        var rprime;
        var maxrprime = 0;

        var ang, ang1, ang2, shadowColor;
        var sa = this.startAngle / 180 * Math.PI;

        // have to pre-draw shadows, so loop throgh here and calculate some values also.
        for (var i=0, l=gd.length; i<l; i++) {
            ang1 = (i == 0) ? sa : gd[i-1][1] + sa;
            ang2 = gd[i][1] + sa;

            this._sliceAngles.push([ang1, ang2]);

            rprime = calcRPrime(ang1, ang2, this.sliceMargin, this.fill, this.lineWidth);

            if (Math.abs(ang2-ang1) > Math.PI) {
                maxrprime = Math.max(rprime, maxrprime);  
            }
        }

        if (this.diameter != null && this.diameter > 0) {
            this._diameter = this.diameter - 2*maxrprime;
        }
        else {
            this._diameter = d - 2*maxrprime;
        }

        // Need to check for undersized pie.  This can happen if
        // plot area too small and legend is too big.
        if (this._diameter < 6) {
            $.jqplot.log('Diameter of pie too small, not rendering.');
            return;
        }

        var r = this._radius = this._diameter/2;

        this._center = [(cw - trans * offx)/2 + trans * offx + maxrprime * Math.cos(sa), (ch - trans*offy)/2 + trans * offy + maxrprime * Math.sin(sa)];

        if (this.shadow) {
            for (var i=0, l=gd.length; i<l; i++) {
                shadowColor = 'rgba(0,0,0,'+this.shadowAlpha+')';
                this.renderer.drawSlice.call (this, ctx, this._sliceAngles[i][0], this._sliceAngles[i][1], shadowColor, true);
            }
        }
        
        for (var i=0; i<gd.length; i++) {
                      
            this.renderer.drawSlice.call (this, ctx, this._sliceAngles[i][0], this._sliceAngles[i][1], colorGenerator.next(), false);
        
            if (this.showDataLabels && gd[i][2]*100 >= this.dataLabelThreshold) {
                var fstr, avgang = (this._sliceAngles[i][0] + this._sliceAngles[i][1])/2, label;
            
                if (this.dataLabels == 'label') {
                    fstr = this.dataLabelFormatString || '%s';
                    label = $.jqplot.sprintf(fstr, gd[i][0]);
                }
                else if (this.dataLabels == 'value') {
                    fstr = this.dataLabelFormatString || '%d';
                    label = $.jqplot.sprintf(fstr, this.data[i][1]);
                }
                else if (this.dataLabels == 'percent') {
                    fstr = this.dataLabelFormatString || '%d%%';
                    label = $.jqplot.sprintf(fstr, gd[i][2]*100);
                }
                else if (this.dataLabels.constructor == Array) {
                    fstr = this.dataLabelFormatString || '%s';
                    label = $.jqplot.sprintf(fstr, this.dataLabels[i]);
                }
            
                var fact = (this._radius ) * this.dataLabelPositionFactor + this.sliceMargin + this.dataLabelNudge;
            
                var x = this._center[0] + Math.cos(avgang) * fact + this.canvas._offsets.left;
                var y = this._center[1] + Math.sin(avgang) * fact + this.canvas._offsets.top;
            
                var labelelem = $('<div class="jqplot-pie-series jqplot-data-label" style="position:absolute;">' + label + '</div>').insertBefore(plot.eventCanvas._elem);
                if (this.dataLabelCenterOn) {
                    x -= labelelem.width()/2;
                    y -= labelelem.height()/2;
                }
                else {
                    x -= labelelem.width() * Math.sin(avgang/2);
                    y -= labelelem.height()/2;
                }
                x = Math.round(x);
                y = Math.round(y);
                labelelem.css({left: x, top: y});
            }
        }            
    };
    
    $.jqplot.PieAxisRenderer = function() {
        $.jqplot.LinearAxisRenderer.call(this);
    };
    
    $.jqplot.PieAxisRenderer.prototype = new $.jqplot.LinearAxisRenderer();
    $.jqplot.PieAxisRenderer.prototype.constructor = $.jqplot.PieAxisRenderer;
        
    
    // There are no traditional axes on a pie chart.  We just need to provide
    // dummy objects with properties so the plot will render.
    // called with scope of axis object.
    $.jqplot.PieAxisRenderer.prototype.init = function(options){
        //
        this.tickRenderer = $.jqplot.PieTickRenderer;
        $.extend(true, this, options);
        // I don't think I'm going to need _dataBounds here.
        // have to go Axis scaling in a way to fit chart onto plot area
        // and provide u2p and p2u functionality for mouse cursor, etc.
        // for convienence set _dataBounds to 0 and 100 and
        // set min/max to 0 and 100.
        this._dataBounds = {min:0, max:100};
        this.min = 0;
        this.max = 100;
        this.showTicks = false;
        this.ticks = [];
        this.showMark = false;
        this.show = false; 
    };
    
    
    
    
    $.jqplot.PieLegendRenderer = function(){
        $.jqplot.TableLegendRenderer.call(this);
    };
    
    $.jqplot.PieLegendRenderer.prototype = new $.jqplot.TableLegendRenderer();
    $.jqplot.PieLegendRenderer.prototype.constructor = $.jqplot.PieLegendRenderer;
    
    /**
     * Class: $.jqplot.PieLegendRenderer
     * Legend Renderer specific to pie plots.  Set by default
     * when user creates a pie plot.
     */
    $.jqplot.PieLegendRenderer.prototype.init = function(options) {
        // Group: Properties
        //
        // prop: numberRows
        // Maximum number of rows in the legend.  0 or null for unlimited.
        this.numberRows = null;
        // prop: numberColumns
        // Maximum number of columns in the legend.  0 or null for unlimited.
        this.numberColumns = null;
        $.extend(true, this, options);
    };
    
    // called with context of legend
    $.jqplot.PieLegendRenderer.prototype.draw = function() {
        var legend = this;
        if (this.show) {
            var series = this._series;


            this._elem = $(document.createElement('table'));
            this._elem.addClass('jqplot-table-legend');

            var ss = {position:'absolute'};
            if (this.background) {
                ss['background'] = this.background;
            }
            if (this.border) {
                ss['border'] = this.border;
            }
            if (this.fontSize) {
                ss['fontSize'] = this.fontSize;
            }
            if (this.fontFamily) {
                ss['fontFamily'] = this.fontFamily;
            }
            if (this.textColor) {
                ss['textColor'] = this.textColor;
            }
            if (this.marginTop != null) {
                ss['marginTop'] = this.marginTop;
            }
            if (this.marginBottom != null) {
                ss['marginBottom'] = this.marginBottom;
            }
            if (this.marginLeft != null) {
                ss['marginLeft'] = this.marginLeft;
            }
            if (this.marginRight != null) {
                ss['marginRight'] = this.marginRight;
            }

            this._elem.css(ss);

            // Pie charts legends don't go by number of series, but by number of data points
            // in the series.  Refactor things here for that.
            
            var pad = false, 
                reverse = false,
                nr, 
                nc;
            var s = series[0];
            var colorGenerator = new $.jqplot.ColorGenerator(s.seriesColors);
            
            if (s.show) {
                var pd = s.data;
                if (this.numberRows) {
                    nr = this.numberRows;
                    if (!this.numberColumns){
                        nc = Math.ceil(pd.length/nr);
                    }
                    else{
                        nc = this.numberColumns;
                    }
                }
                else if (this.numberColumns) {
                    nc = this.numberColumns;
                    nr = Math.ceil(pd.length/this.numberColumns);
                }
                else {
                    nr = pd.length;
                    nc = 1;
                }
                
                var i, j;
                var tr, td1, td2; 
                var lt, rs, color;
                var idx = 0; 
                var div0, div1;   
                
                for (i=0; i<nr; i++) {
                    tr = $(document.createElement('tr'));
                    tr.addClass('jqplot-table-legend');
                    
                    if (reverse){
                        tr.prependTo(this._elem);
                    }
                    
                    else{
                        tr.appendTo(this._elem);
                    }
                    
                    for (j=0; j<nc; j++) {
                        if (idx < pd.length){
                            lt = this.labels[idx] || pd[idx][0].toString();
                            color = colorGenerator.next();
                            if (!reverse){
                                if (i>0){
                                    pad = true;
                                }
                                else{
                                    pad = false;
                                }
                            }
                            else{
                                if (i == nr -1){
                                    pad = false;
                                }
                                else{
                                    pad = true;
                                }
                            }
                            rs = (pad) ? this.rowSpacing : '0';



                            td1 = $(document.createElement('td'));
                            td1.addClass('jqplot-table-legend jqplot-table-legend-swatch');
                            td1.css({textAlign: 'center', paddingTop: rs});

                            div0 = $(document.createElement('div'));
                            div0.addClass('jqplot-table-legend-swatch-outline');
                            div1 = $(document.createElement('div'));
                            div1.addClass('jqplot-table-legend-swatch');
                            div1.css({backgroundColor: color, borderColor: color});
                            td1.append(div0.append(div1));

                            td2 = $(document.createElement('td'));
                            td2.addClass('jqplot-table-legend jqplot-table-legend-label');
                            td2.css('paddingTop', rs);

                            if (this.escapeHtml){
                                td2.text(lt);
                            }
                            else {
                                td2.html(lt);
                            }
                            if (reverse) {
                                td2.prependTo(tr);
                                td1.prependTo(tr);
                            }
                            else {
                                td1.appendTo(tr);
                                td2.appendTo(tr);
                            }
                            pad = true;
                        }
                        idx++;
                    }   
                }
            }
        }
        return this._elem;                
    };
    
    $.jqplot.PieRenderer.prototype.handleMove = function(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            plot.target.trigger('jqplotDataMouseOver', ins);
            if (plot.series[ins[0]].highlightMouseOver && !(ins[0] == plot.plugins.pieRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
                plot.target.trigger('jqplotDataHighlight', ins);
                highlight (plot, ins[0], ins[1]);
            }
        }
        else if (neighbor == null) {
            unhighlight (plot);
        }
    };
    
    
    // this.eventCanvas._elem.bind($.jqplot.eventListenerHooks[i][0], {plot:this}, $.jqplot.eventListenerHooks[i][1]);
    
    // setup default renderers for axes and legend so user doesn't have to
    // called with scope of plot
    function preInit(target, data, options) {
        options = options || {};
        options.axesDefaults = options.axesDefaults || {};
        options.legend = options.legend || {};
        options.seriesDefaults = options.seriesDefaults || {};
        // only set these if there is a pie series
        var setopts = false;
        if (options.seriesDefaults.renderer == $.jqplot.PieRenderer) {
            setopts = true;
        }
        else if (options.series) {
            for (var i=0; i < options.series.length; i++) {
                if (options.series[i].renderer == $.jqplot.PieRenderer) {
                    setopts = true;
                }
            }
        }
        
        if (setopts) {
            options.axesDefaults.renderer = $.jqplot.PieAxisRenderer;
            options.legend.renderer = $.jqplot.PieLegendRenderer;
            options.legend.preDraw = true;
            options.seriesDefaults.pointLabels = {show: false};
        }
    }
    
    function postInit(target, data, options) {
        for (var i=0; i<this.series.length; i++) {
            if (this.series[i].renderer.constructor == $.jqplot.PieRenderer) {
                // don't allow mouseover and mousedown at same time.
                if (this.series[i].highlightMouseOver) {
                    this.series[i].highlightMouseDown = false;
                }
            }
        }
    }
    
    // called with scope of plot
    function postParseOptions(options) {
        for (var i=0; i<this.series.length; i++) {
            this.series[i].seriesColors = this.seriesColors;
            this.series[i].colorGenerator = $.jqplot.colorGenerator;
        }
    }
    
    function highlight (plot, sidx, pidx) {
        var s = plot.series[sidx];
        var canvas = plot.plugins.pieRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0,canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        s._highlightedPoint = pidx;
        plot.plugins.pieRenderer.highlightedSeriesIndex = sidx;
        s.renderer.drawSlice.call(s, canvas._ctx, s._sliceAngles[pidx][0], s._sliceAngles[pidx][1], s.highlightColorGenerator.get(pidx), false);
    }
    
    function unhighlight (plot) {
        var canvas = plot.plugins.pieRenderer.highlightCanvas;
        canvas._ctx.clearRect(0,0, canvas._ctx.canvas.width, canvas._ctx.canvas.height);
        for (var i=0; i<plot.series.length; i++) {
            plot.series[i]._highlightedPoint = null;
        }
        plot.plugins.pieRenderer.highlightedSeriesIndex = null;
        plot.target.trigger('jqplotDataUnhighlight');
    }
 
    function handleMove(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var evt1 = jQuery.Event('jqplotDataMouseOver');
            evt1.pageX = ev.pageX;
            evt1.pageY = ev.pageY;
            plot.target.trigger(evt1, ins);
            if (plot.series[ins[0]].highlightMouseOver && !(ins[0] == plot.plugins.pieRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
                var evt = jQuery.Event('jqplotDataHighlight');
                evt.which = ev.which;
                evt.pageX = ev.pageX;
                evt.pageY = ev.pageY;
                plot.target.trigger(evt, ins);
                highlight (plot, ins[0], ins[1]);
            }
        }
        else if (neighbor == null) {
            unhighlight (plot);
        }
    } 
    
    function handleMouseDown(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            if (plot.series[ins[0]].highlightMouseDown && !(ins[0] == plot.plugins.pieRenderer.highlightedSeriesIndex && ins[1] == plot.series[ins[0]]._highlightedPoint)) {
                var evt = jQuery.Event('jqplotDataHighlight');
                evt.which = ev.which;
                evt.pageX = ev.pageX;
                evt.pageY = ev.pageY;
                plot.target.trigger(evt, ins);
                highlight (plot, ins[0], ins[1]);
            }
        }
        else if (neighbor == null) {
            unhighlight (plot);
        }
    }
    
    function handleMouseUp(ev, gridpos, datapos, neighbor, plot) {
        var idx = plot.plugins.pieRenderer.highlightedSeriesIndex;
        if (idx != null && plot.series[idx].highlightMouseDown) {
            unhighlight(plot);
        }
    }
    
    function handleClick(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var evt = jQuery.Event('jqplotDataClick');
            evt.which = ev.which;
            evt.pageX = ev.pageX;
            evt.pageY = ev.pageY;
            plot.target.trigger(evt, ins);
        }
    }
    
    function handleRightClick(ev, gridpos, datapos, neighbor, plot) {
        if (neighbor) {
            var ins = [neighbor.seriesIndex, neighbor.pointIndex, neighbor.data];
            var idx = plot.plugins.pieRenderer.highlightedSeriesIndex;
            if (idx != null && plot.series[idx].highlightMouseDown) {
                unhighlight(plot);
            }
            var evt = jQuery.Event('jqplotDataRightClick');
            evt.which = ev.which;
            evt.pageX = ev.pageX;
            evt.pageY = ev.pageY;
            plot.target.trigger(evt, ins);
        }
    }    
    
    // called within context of plot
    // create a canvas which we can draw on.
    // insert it before the eventCanvas, so eventCanvas will still capture events.
    function postPlotDraw() {
        // Memory Leaks patch    
        if (this.plugins.pieRenderer && this.plugins.pieRenderer.highlightCanvas) {
            this.plugins.pieRenderer.highlightCanvas.resetCanvas();
            this.plugins.pieRenderer.highlightCanvas = null;
        }

        this.plugins.pieRenderer = {highlightedSeriesIndex:null};
        this.plugins.pieRenderer.highlightCanvas = new $.jqplot.GenericCanvas();
        
        // do we have any data labels?  if so, put highlight canvas before those
        var labels = $(this.targetId+' .jqplot-data-label');
        if (labels.length) {
            $(labels[0]).before(this.plugins.pieRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-pieRenderer-highlight-canvas', this._plotDimensions, this));
        }
        // else put highlight canvas before event canvas.
        else {
            this.eventCanvas._elem.before(this.plugins.pieRenderer.highlightCanvas.createElement(this._gridPadding, 'jqplot-pieRenderer-highlight-canvas', this._plotDimensions, this));
        }
        
        var hctx = this.plugins.pieRenderer.highlightCanvas.setContext();
        this.eventCanvas._elem.bind('mouseleave', {plot:this}, function (ev) { unhighlight(ev.data.plot); });
    }
    
    $.jqplot.preInitHooks.push(preInit);
    
    $.jqplot.PieTickRenderer = function() {
        $.jqplot.AxisTickRenderer.call(this);
    };
    
    $.jqplot.PieTickRenderer.prototype = new $.jqplot.AxisTickRenderer();
    $.jqplot.PieTickRenderer.prototype.constructor = $.jqplot.PieTickRenderer;
    
})(jQuery);
    
    
/* jqPlot 1.0.8r1250 | (c) 2009-2013 Chris Leonello | jplot.com
   jsDate | (c) 2010-2013 Chris Leonello
 */
(function(L){var u;L.fn.emptyForce=function(){for(var ah=0,ai;(ai=L(this)[ah])!=null;ah++){if(ai.nodeType===1){L.cleanData(ai.getElementsByTagName("*"))}if(L.jqplot.use_excanvas){ai.outerHTML=""}else{while(ai.firstChild){ai.removeChild(ai.firstChild)}}ai=null}return L(this)};L.fn.removeChildForce=function(ah){while(ah.firstChild){this.removeChildForce(ah.firstChild);ah.removeChild(ah.firstChild)}};L.fn.jqplot=function(){var ah=[];var aj=[];for(var ak=0,ai=arguments.length;ak<ai;ak++){if(L.isArray(arguments[ak])){ah.push(arguments[ak])}else{if(L.isPlainObject(arguments[ak])){aj.push(arguments[ak])}}}return this.each(function(an){var at,ar,aq=L(this),am=ah.length,al=aj.length,ap,ao;if(an<am){ap=ah[an]}else{ap=am?ah[am-1]:null}if(an<al){ao=aj[an]}else{ao=al?aj[al-1]:null}at=aq.attr("id");if(at===u){at="jqplot_target_"+L.jqplot.targetCounter++;aq.attr("id",at)}ar=L.jqplot(at,ap,ao);aq.data("jqplot",ar)})};L.jqplot=function(an,ak,ai){var aj=null,ah=null;if(arguments.length===3){aj=ak;ah=ai}else{if(arguments.length===2){if(L.isArray(ak)){aj=ak}else{if(L.isPlainObject(ak)){ah=ak}}}}if(aj===null&&ah!==null&&ah.data){aj=ah.data}var am=new R();L("#"+an).removeClass("jqplot-error");if(L.jqplot.config.catchErrors){try{am.init(an,aj,ah);am.draw();am.themeEngine.init.call(am);return am}catch(al){var ao=L.jqplot.config.errorMessage||al.message;L("#"+an).append('<div class="jqplot-error-message">'+ao+"</div>");L("#"+an).addClass("jqplot-error");document.getElementById(an).style.background=L.jqplot.config.errorBackground;document.getElementById(an).style.border=L.jqplot.config.errorBorder;document.getElementById(an).style.fontFamily=L.jqplot.config.errorFontFamily;document.getElementById(an).style.fontSize=L.jqplot.config.errorFontSize;document.getElementById(an).style.fontStyle=L.jqplot.config.errorFontStyle;document.getElementById(an).style.fontWeight=L.jqplot.config.errorFontWeight}}else{am.init(an,aj,ah);am.draw();am.themeEngine.init.call(am);return am}};L.jqplot.version="1.0.8";L.jqplot.revision="1250";L.jqplot.targetCounter=1;L.jqplot.CanvasManager=function(){if(typeof L.jqplot.CanvasManager.canvases=="undefined"){L.jqplot.CanvasManager.canvases=[];L.jqplot.CanvasManager.free=[]}var ah=[];this.getCanvas=function(){var ak;var aj=true;if(!L.jqplot.use_excanvas){for(var al=0,ai=L.jqplot.CanvasManager.canvases.length;al<ai;al++){if(L.jqplot.CanvasManager.free[al]===true){aj=false;ak=L.jqplot.CanvasManager.canvases[al];L.jqplot.CanvasManager.free[al]=false;ah.push(al);break}}}if(aj){ak=document.createElement("canvas");ah.push(L.jqplot.CanvasManager.canvases.length);L.jqplot.CanvasManager.canvases.push(ak);L.jqplot.CanvasManager.free.push(false)}return ak};this.initCanvas=function(ai){if(L.jqplot.use_excanvas){return window.G_vmlCanvasManager.initElement(ai)}return ai};this.freeAllCanvases=function(){for(var aj=0,ai=ah.length;aj<ai;aj++){this.freeCanvas(ah[aj])}ah=[]};this.freeCanvas=function(ai){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(L.jqplot.CanvasManager.canvases[ai]);L.jqplot.CanvasManager.canvases[ai]=null}else{var aj=L.jqplot.CanvasManager.canvases[ai];aj.getContext("2d").clearRect(0,0,aj.width,aj.height);L(aj).unbind().removeAttr("class").removeAttr("style");L(aj).css({left:"",top:"",position:""});aj.width=0;aj.height=0;L.jqplot.CanvasManager.free[ai]=true}}};L.jqplot.log=function(){if(window.console){window.console.log.apply(window.console,arguments)}};L.jqplot.config={addDomReference:false,enablePlugins:false,defaultHeight:300,defaultWidth:400,UTCAdjust:false,timezoneOffset:new Date(new Date().getTimezoneOffset()*60000),errorMessage:"",errorBackground:"",errorBorder:"",errorFontFamily:"",errorFontSize:"",errorFontStyle:"",errorFontWeight:"",catchErrors:false,defaultTickFormatString:"%.1f",defaultColors:["#4bb2c5","#EAA228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f","#ff5800","#0085cc","#c747a3","#cddf54","#FBD178","#26B4E3","#bd70c7"],defaultNegativeColors:["#498991","#C08840","#9F9274","#546D61","#646C4A","#6F6621","#6E3F5F","#4F64B0","#A89050","#C45923","#187399","#945381","#959E5C","#C7AF7B","#478396","#907294"],dashLength:4,gapLength:4,dotGapLength:2.5,srcLocation:"jqplot/src/",pluginLocation:"jqplot/src/plugins/"};L.jqplot.arrayMax=function(ah){return Math.max.apply(Math,ah)};L.jqplot.arrayMin=function(ah){return Math.min.apply(Math,ah)};L.jqplot.enablePlugins=L.jqplot.config.enablePlugins;L.jqplot.support_canvas=function(){if(typeof L.jqplot.support_canvas.result=="undefined"){L.jqplot.support_canvas.result=!!document.createElement("canvas").getContext}return L.jqplot.support_canvas.result};L.jqplot.support_canvas_text=function(){if(typeof L.jqplot.support_canvas_text.result=="undefined"){if(window.G_vmlCanvasManager!==u&&window.G_vmlCanvasManager._version>887){L.jqplot.support_canvas_text.result=true}else{L.jqplot.support_canvas_text.result=!!(document.createElement("canvas").getContext&&typeof document.createElement("canvas").getContext("2d").fillText=="function")}}return L.jqplot.support_canvas_text.result};L.jqplot.use_excanvas=((!L.support.boxModel||!L.support.objectAll||!$support.leadingWhitespace)&&!L.jqplot.support_canvas())?true:false;L.jqplot.preInitHooks=[];L.jqplot.postInitHooks=[];L.jqplot.preParseOptionsHooks=[];L.jqplot.postParseOptionsHooks=[];L.jqplot.preDrawHooks=[];L.jqplot.postDrawHooks=[];L.jqplot.preDrawSeriesHooks=[];L.jqplot.postDrawSeriesHooks=[];L.jqplot.preDrawLegendHooks=[];L.jqplot.addLegendRowHooks=[];L.jqplot.preSeriesInitHooks=[];L.jqplot.postSeriesInitHooks=[];L.jqplot.preParseSeriesOptionsHooks=[];L.jqplot.postParseSeriesOptionsHooks=[];L.jqplot.eventListenerHooks=[];L.jqplot.preDrawSeriesShadowHooks=[];L.jqplot.postDrawSeriesShadowHooks=[];L.jqplot.ElemContainer=function(){this._elem;this._plotWidth;this._plotHeight;this._plotDimensions={height:null,width:null}};L.jqplot.ElemContainer.prototype.createElement=function(ak,am,ai,aj,an){this._offsets=am;var ah=ai||"jqplot";var al=document.createElement(ak);this._elem=L(al);this._elem.addClass(ah);this._elem.css(aj);this._elem.attr(an);al=null;return this._elem};L.jqplot.ElemContainer.prototype.getWidth=function(){if(this._elem){return this._elem.outerWidth(true)}else{return null}};L.jqplot.ElemContainer.prototype.getHeight=function(){if(this._elem){return this._elem.outerHeight(true)}else{return null}};L.jqplot.ElemContainer.prototype.getPosition=function(){if(this._elem){return this._elem.position()}else{return{top:null,left:null,bottom:null,right:null}}};L.jqplot.ElemContainer.prototype.getTop=function(){return this.getPosition().top};L.jqplot.ElemContainer.prototype.getLeft=function(){return this.getPosition().left};L.jqplot.ElemContainer.prototype.getBottom=function(){return this._elem.css("bottom")};L.jqplot.ElemContainer.prototype.getRight=function(){return this._elem.css("right")};function w(ah){L.jqplot.ElemContainer.call(this);this.name=ah;this._series=[];this.show=false;this.tickRenderer=L.jqplot.AxisTickRenderer;this.tickOptions={};this.labelRenderer=L.jqplot.AxisLabelRenderer;this.labelOptions={};this.label=null;this.showLabel=true;this.min=null;this.max=null;this.autoscale=false;this.pad=1.2;this.padMax=null;this.padMin=null;this.ticks=[];this.numberTicks;this.tickInterval;this.renderer=L.jqplot.LinearAxisRenderer;this.rendererOptions={};this.showTicks=true;this.showTickMarks=true;this.showMinorTicks=true;this.drawMajorGridlines=true;this.drawMinorGridlines=false;this.drawMajorTickMarks=true;this.drawMinorTickMarks=true;this.useSeriesColor=false;this.borderWidth=null;this.borderColor=null;this.scaleToHiddenSeries=false;this._dataBounds={min:null,max:null};this._intervalStats=[];this._offsets={min:null,max:null};this._ticks=[];this._label=null;this.syncTicks=null;this.tickSpacing=75;this._min=null;this._max=null;this._tickInterval=null;this._numberTicks=null;this.__ticks=null;this._options={}}w.prototype=new L.jqplot.ElemContainer();w.prototype.constructor=w;w.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.tickOptions.axis=this.name;if(this.tickOptions.showMark==null){this.tickOptions.showMark=this.showTicks}if(this.tickOptions.showMark==null){this.tickOptions.showMark=this.showTickMarks}if(this.tickOptions.showLabel==null){this.tickOptions.showLabel=this.showTicks}if(this.label==null||this.label==""){this.showLabel=false}else{this.labelOptions.label=this.label}if(this.showLabel==false){this.labelOptions.show=false}if(this.pad==0){this.pad=1}if(this.padMax==0){this.padMax=1}if(this.padMin==0){this.padMin=1}if(this.padMax==null){this.padMax=(this.pad-1)/2+1}if(this.padMin==null){this.padMin=(this.pad-1)/2+1}this.pad=this.padMax+this.padMin-1;if(this.min!=null||this.max!=null){this.autoscale=false}if(this.syncTicks==null&&this.name.indexOf("y")>-1){this.syncTicks=true}else{if(this.syncTicks==null){this.syncTicks=false}}this.renderer.init.call(this,this.rendererOptions)};w.prototype.draw=function(ah,ai){if(this.__ticks){this.__ticks=null}return this.renderer.draw.call(this,ah,ai)};w.prototype.set=function(){this.renderer.set.call(this)};w.prototype.pack=function(ai,ah){if(this.show){this.renderer.pack.call(this,ai,ah)}if(this._min==null){this._min=this.min;this._max=this.max;this._tickInterval=this.tickInterval;this._numberTicks=this.numberTicks;this.__ticks=this._ticks}};w.prototype.reset=function(){this.renderer.reset.call(this)};w.prototype.resetScale=function(ah){L.extend(true,this,{min:null,max:null,numberTicks:null,tickInterval:null,_ticks:[],ticks:[]},ah);this.resetDataBounds()};w.prototype.resetDataBounds=function(){var ao=this._dataBounds;ao.min=null;ao.max=null;var ai,ap,am;var aj=(this.show)?true:false;for(var al=0;al<this._series.length;al++){ap=this._series[al];if(ap.show||this.scaleToHiddenSeries){am=ap._plotData;if(ap._type==="line"&&ap.renderer.bands.show&&this.name.charAt(0)!=="x"){am=[[0,ap.renderer.bands._min],[1,ap.renderer.bands._max]]}var ah=1,an=1;if(ap._type!=null&&ap._type=="ohlc"){ah=3;an=2}for(var ak=0,ai=am.length;ak<ai;ak++){if(this.name=="xaxis"||this.name=="x2axis"){if((am[ak][0]!=null&&am[ak][0]<ao.min)||ao.min==null){ao.min=am[ak][0]}if((am[ak][0]!=null&&am[ak][0]>ao.max)||ao.max==null){ao.max=am[ak][0]}}else{if((am[ak][ah]!=null&&am[ak][ah]<ao.min)||ao.min==null){ao.min=am[ak][ah]}if((am[ak][an]!=null&&am[ak][an]>ao.max)||ao.max==null){ao.max=am[ak][an]}}}if(aj&&ap.renderer.constructor!==L.jqplot.BarRenderer){aj=false}else{if(aj&&this._options.hasOwnProperty("forceTickAt0")&&this._options.forceTickAt0==false){aj=false}else{if(aj&&ap.renderer.constructor===L.jqplot.BarRenderer){if(ap.barDirection=="vertical"&&this.name!="xaxis"&&this.name!="x2axis"){if(this._options.pad!=null||this._options.padMin!=null){aj=false}}else{if(ap.barDirection=="horizontal"&&(this.name=="xaxis"||this.name=="x2axis")){if(this._options.pad!=null||this._options.padMin!=null){aj=false}}}}}}}}if(aj&&this.renderer.constructor===L.jqplot.LinearAxisRenderer&&ao.min>=0){this.padMin=1;this.forceTickAt0=true}};function q(ah){L.jqplot.ElemContainer.call(this);this.show=false;this.location="ne";this.labels=[];this.showLabels=true;this.showSwatches=true;this.placement="insideGrid";this.xoffset=0;this.yoffset=0;this.border;this.background;this.textColor;this.fontFamily;this.fontSize;this.rowSpacing="0.5em";this.renderer=L.jqplot.TableLegendRenderer;this.rendererOptions={};this.preDraw=false;this.marginTop=null;this.marginRight=null;this.marginBottom=null;this.marginLeft=null;this.escapeHtml=false;this._series=[];L.extend(true,this,ah)}q.prototype=new L.jqplot.ElemContainer();q.prototype.constructor=q;q.prototype.setOptions=function(ah){L.extend(true,this,ah);if(this.placement=="inside"){this.placement="insideGrid"}if(this.xoffset>0){if(this.placement=="insideGrid"){switch(this.location){case"nw":case"w":case"sw":if(this.marginLeft==null){this.marginLeft=this.xoffset+"px"}this.marginRight="0px";break;case"ne":case"e":case"se":default:if(this.marginRight==null){this.marginRight=this.xoffset+"px"}this.marginLeft="0px";break}}else{if(this.placement=="outside"){switch(this.location){case"nw":case"w":case"sw":if(this.marginRight==null){this.marginRight=this.xoffset+"px"}this.marginLeft="0px";break;case"ne":case"e":case"se":default:if(this.marginLeft==null){this.marginLeft=this.xoffset+"px"}this.marginRight="0px";break}}}this.xoffset=0}if(this.yoffset>0){if(this.placement=="outside"){switch(this.location){case"sw":case"s":case"se":if(this.marginTop==null){this.marginTop=this.yoffset+"px"}this.marginBottom="0px";break;case"ne":case"n":case"nw":default:if(this.marginBottom==null){this.marginBottom=this.yoffset+"px"}this.marginTop="0px";break}}else{if(this.placement=="insideGrid"){switch(this.location){case"sw":case"s":case"se":if(this.marginBottom==null){this.marginBottom=this.yoffset+"px"}this.marginTop="0px";break;case"ne":case"n":case"nw":default:if(this.marginTop==null){this.marginTop=this.yoffset+"px"}this.marginBottom="0px";break}}}this.yoffset=0}};q.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions)};q.prototype.draw=function(ai,aj){for(var ah=0;ah<L.jqplot.preDrawLegendHooks.length;ah++){L.jqplot.preDrawLegendHooks[ah].call(this,ai)}return this.renderer.draw.call(this,ai,aj)};q.prototype.pack=function(ah){this.renderer.pack.call(this,ah)};function y(ah){L.jqplot.ElemContainer.call(this);this.text=ah;this.show=true;this.fontFamily;this.fontSize;this.textAlign;this.textColor;this.renderer=L.jqplot.DivTitleRenderer;this.rendererOptions={};this.escapeHtml=false}y.prototype=new L.jqplot.ElemContainer();y.prototype.constructor=y;y.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions)};y.prototype.draw=function(ah){return this.renderer.draw.call(this,ah)};y.prototype.pack=function(){this.renderer.pack.call(this)};function S(ah){ah=ah||{};L.jqplot.ElemContainer.call(this);this.show=true;this.xaxis="xaxis";this._xaxis;this.yaxis="yaxis";this._yaxis;this.gridBorderWidth=2;this.renderer=L.jqplot.LineRenderer;this.rendererOptions={};this.data=[];this.gridData=[];this.label="";this.showLabel=true;this.color;this.negativeColor;this.lineWidth=2.5;this.lineJoin="round";this.lineCap="round";this.linePattern="solid";this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.25;this.shadowDepth=3;this.shadowAlpha="0.1";this.breakOnNull=false;this.markerRenderer=L.jqplot.MarkerRenderer;this.markerOptions={};this.showLine=true;this.showMarker=true;this.index;this.fill=false;this.fillColor;this.fillAlpha;this.fillAndStroke=false;this.disableStack=false;this._stack=false;this.neighborThreshold=4;this.fillToZero=false;this.fillToValue=0;this.fillAxis="y";this.useNegativeColors=true;this._stackData=[];this._plotData=[];this._plotValues={x:[],y:[]};this._intervals={x:{},y:{}};this._prevPlotData=[];this._prevGridData=[];this._stackAxis="y";this._primaryAxis="_xaxis";this.canvas=new L.jqplot.GenericCanvas();this.shadowCanvas=new L.jqplot.GenericCanvas();this.plugins={};this._sumy=0;this._sumx=0;this._type=""}S.prototype=new L.jqplot.ElemContainer();S.prototype.constructor=S;S.prototype.init=function(ak,ao,am){this.index=ak;this.gridBorderWidth=ao;var an=this.data;var aj=[],al,ah;for(al=0,ah=an.length;al<ah;al++){if(!this.breakOnNull){if(an[al]==null||an[al][0]==null||an[al][1]==null){continue}else{aj.push(an[al])}}else{aj.push(an[al])}}this.data=aj;if(!this.color){this.color=am.colorGenerator.get(this.index)}if(!this.negativeColor){this.negativeColor=am.negativeColorGenerator.get(this.index)}if(!this.fillColor){this.fillColor=this.color}if(this.fillAlpha){var ai=L.jqplot.normalize2rgb(this.fillColor);var ai=L.jqplot.getColorComponents(ai);this.fillColor="rgba("+ai[0]+","+ai[1]+","+ai[2]+","+this.fillAlpha+")"}if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions,am);this.markerRenderer=new this.markerRenderer();if(!this.markerOptions.color){this.markerOptions.color=this.color}if(this.markerOptions.show==null){this.markerOptions.show=this.showMarker}this.showMarker=this.markerOptions.show;this.markerRenderer.init(this.markerOptions)};S.prototype.draw=function(an,ak,am){var ai=(ak==u)?{}:ak;an=(an==u)?this.canvas._ctx:an;var ah,al,aj;for(ah=0;ah<L.jqplot.preDrawSeriesHooks.length;ah++){L.jqplot.preDrawSeriesHooks[ah].call(this,an,ai)}if(this.show){this.renderer.setGridData.call(this,am);if(!ai.preventJqPlotSeriesDrawTrigger){L(an.canvas).trigger("jqplotSeriesDraw",[this.data,this.gridData])}al=[];if(ai.data){al=ai.data}else{if(!this._stack){al=this.data}else{al=this._plotData}}aj=ai.gridData||this.renderer.makeGridData.call(this,al,am);if(this._type==="line"&&this.renderer.smooth&&this.renderer._smoothedData.length){aj=this.renderer._smoothedData}this.renderer.draw.call(this,an,aj,ai,am)}for(ah=0;ah<L.jqplot.postDrawSeriesHooks.length;ah++){L.jqplot.postDrawSeriesHooks[ah].call(this,an,ai,am)}an=ak=am=ah=al=aj=null};S.prototype.drawShadow=function(an,ak,am){var ai=(ak==u)?{}:ak;an=(an==u)?this.shadowCanvas._ctx:an;var ah,al,aj;for(ah=0;ah<L.jqplot.preDrawSeriesShadowHooks.length;ah++){L.jqplot.preDrawSeriesShadowHooks[ah].call(this,an,ai)}if(this.shadow){this.renderer.setGridData.call(this,am);al=[];if(ai.data){al=ai.data}else{if(!this._stack){al=this.data}else{al=this._plotData}}aj=ai.gridData||this.renderer.makeGridData.call(this,al,am);this.renderer.drawShadow.call(this,an,aj,ai,am)}for(ah=0;ah<L.jqplot.postDrawSeriesShadowHooks.length;ah++){L.jqplot.postDrawSeriesShadowHooks[ah].call(this,an,ai)}an=ak=am=ah=al=aj=null};S.prototype.toggleDisplay=function(ai,ak){var ah,aj;if(ai.data.series){ah=ai.data.series}else{ah=this}if(ai.data.speed){aj=ai.data.speed}if(aj){if(ah.canvas._elem.is(":hidden")||!ah.show){ah.show=true;ah.canvas._elem.removeClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.fadeIn(aj)}ah.canvas._elem.fadeIn(aj,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).fadeIn(aj)}else{ah.show=false;ah.canvas._elem.addClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.fadeOut(aj)}ah.canvas._elem.fadeOut(aj,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).fadeOut(aj)}}else{if(ah.canvas._elem.is(":hidden")||!ah.show){ah.show=true;ah.canvas._elem.removeClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.show()}ah.canvas._elem.show(0,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).show()}else{ah.show=false;ah.canvas._elem.addClass("jqplot-series-hidden");if(ah.shadowCanvas._elem){ah.shadowCanvas._elem.hide()}ah.canvas._elem.hide(0,ak);ah.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+ah.index).hide()}}};function M(){L.jqplot.ElemContainer.call(this);this.drawGridlines=true;this.gridLineColor="#cccccc";this.gridLineWidth=1;this.background="#fffdf6";this.borderColor="#999999";this.borderWidth=2;this.drawBorder=true;this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.5;this.shadowWidth=3;this.shadowDepth=3;this.shadowColor=null;this.shadowAlpha="0.07";this._left;this._top;this._right;this._bottom;this._width;this._height;this._axes=[];this.renderer=L.jqplot.CanvasGridRenderer;this.rendererOptions={};this._offsets={top:null,bottom:null,left:null,right:null}}M.prototype=new L.jqplot.ElemContainer();M.prototype.constructor=M;M.prototype.init=function(){if(L.isFunction(this.renderer)){this.renderer=new this.renderer()}this.renderer.init.call(this,this.rendererOptions)};M.prototype.createElement=function(ah,ai){this._offsets=ah;return this.renderer.createElement.call(this,ai)};M.prototype.draw=function(){this.renderer.draw.call(this)};L.jqplot.GenericCanvas=function(){L.jqplot.ElemContainer.call(this);this._ctx};L.jqplot.GenericCanvas.prototype=new L.jqplot.ElemContainer();L.jqplot.GenericCanvas.prototype.constructor=L.jqplot.GenericCanvas;L.jqplot.GenericCanvas.prototype.createElement=function(al,aj,ai,am){this._offsets=al;var ah="jqplot";if(aj!=u){ah=aj}var ak;ak=am.canvasManager.getCanvas();if(ai!=null){this._plotDimensions=ai}ak.width=this._plotDimensions.width-this._offsets.left-this._offsets.right;ak.height=this._plotDimensions.height-this._offsets.top-this._offsets.bottom;this._elem=L(ak);this._elem.css({position:"absolute",left:this._offsets.left,top:this._offsets.top});this._elem.addClass(ah);ak=am.canvasManager.initCanvas(ak);ak=null;return this._elem};L.jqplot.GenericCanvas.prototype.setContext=function(){this._ctx=this._elem.get(0).getContext("2d");return this._ctx};L.jqplot.GenericCanvas.prototype.resetCanvas=function(){if(this._elem){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(this._elem.get(0))}this._elem.emptyForce()}this._ctx=null};L.jqplot.HooksManager=function(){this.hooks=[];this.args=[]};L.jqplot.HooksManager.prototype.addOnce=function(ak,ai){ai=ai||[];var al=false;for(var aj=0,ah=this.hooks.length;aj<ah;aj++){if(this.hooks[aj]==ak){al=true}}if(!al){this.hooks.push(ak);this.args.push(ai)}};L.jqplot.HooksManager.prototype.add=function(ai,ah){ah=ah||[];this.hooks.push(ai);this.args.push(ah)};L.jqplot.EventListenerManager=function(){this.hooks=[]};L.jqplot.EventListenerManager.prototype.addOnce=function(al,ak){var am=false,aj,ai;for(var ai=0,ah=this.hooks.length;ai<ah;ai++){aj=this.hooks[ai];if(aj[0]==al&&aj[1]==ak){am=true}}if(!am){this.hooks.push([al,ak])}};L.jqplot.EventListenerManager.prototype.add=function(ai,ah){this.hooks.push([ai,ah])};var U=["yMidAxis","xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];function R(){this.animate=false;this.animateReplot=false;this.axes={xaxis:new w("xaxis"),yaxis:new w("yaxis"),x2axis:new w("x2axis"),y2axis:new w("y2axis"),y3axis:new w("y3axis"),y4axis:new w("y4axis"),y5axis:new w("y5axis"),y6axis:new w("y6axis"),y7axis:new w("y7axis"),y8axis:new w("y8axis"),y9axis:new w("y9axis"),yMidAxis:new w("yMidAxis")};this.baseCanvas=new L.jqplot.GenericCanvas();this.captureRightClick=false;this.data=[];this.dataRenderer;this.dataRendererOptions;this.defaults={axesDefaults:{},axes:{xaxis:{},yaxis:{},x2axis:{},y2axis:{},y3axis:{},y4axis:{},y5axis:{},y6axis:{},y7axis:{},y8axis:{},y9axis:{},yMidAxis:{}},seriesDefaults:{},series:[]};this.defaultAxisStart=1;this.drawIfHidden=false;this.eventCanvas=new L.jqplot.GenericCanvas();this.fillBetween={series1:null,series2:null,color:null,baseSeries:0,fill:true};this.fontFamily;this.fontSize;this.grid=new M();this.legend=new q();this.noDataIndicator={show:false,indicator:"Loading Data...",axes:{xaxis:{min:0,max:10,tickInterval:2,show:true},yaxis:{min:0,max:12,tickInterval:3,show:true}}};this.negativeSeriesColors=L.jqplot.config.defaultNegativeColors;this.options={};this.previousSeriesStack=[];this.plugins={};this.series=[];this.seriesStack=[];this.seriesColors=L.jqplot.config.defaultColors;this.sortData=true;this.stackSeries=false;this.syncXTicks=true;this.syncYTicks=true;this.target=null;this.targetId=null;this.textColor;this.title=new y();this._drawCount=0;this._sumy=0;this._sumx=0;this._stackData=[];this._plotData=[];this._width=null;this._height=null;this._plotDimensions={height:null,width:null};this._gridPadding={top:null,right:null,bottom:null,left:null};this._defaultGridPadding={top:10,right:10,bottom:23,left:10};this._addDomReference=L.jqplot.config.addDomReference;this.preInitHooks=new L.jqplot.HooksManager();this.postInitHooks=new L.jqplot.HooksManager();this.preParseOptionsHooks=new L.jqplot.HooksManager();this.postParseOptionsHooks=new L.jqplot.HooksManager();this.preDrawHooks=new L.jqplot.HooksManager();this.postDrawHooks=new L.jqplot.HooksManager();this.preDrawSeriesHooks=new L.jqplot.HooksManager();this.postDrawSeriesHooks=new L.jqplot.HooksManager();this.preDrawLegendHooks=new L.jqplot.HooksManager();this.addLegendRowHooks=new L.jqplot.HooksManager();this.preSeriesInitHooks=new L.jqplot.HooksManager();this.postSeriesInitHooks=new L.jqplot.HooksManager();this.preParseSeriesOptionsHooks=new L.jqplot.HooksManager();this.postParseSeriesOptionsHooks=new L.jqplot.HooksManager();this.eventListenerHooks=new L.jqplot.EventListenerManager();this.preDrawSeriesShadowHooks=new L.jqplot.HooksManager();this.postDrawSeriesShadowHooks=new L.jqplot.HooksManager();this.colorGenerator=new L.jqplot.ColorGenerator();this.negativeColorGenerator=new L.jqplot.ColorGenerator();this.canvasManager=new L.jqplot.CanvasManager();this.themeEngine=new L.jqplot.ThemeEngine();var aj=0;this.init=function(av,ar,ay){ay=ay||{};for(var at=0;at<L.jqplot.preInitHooks.length;at++){L.jqplot.preInitHooks[at].call(this,av,ar,ay)}for(var at=0;at<this.preInitHooks.hooks.length;at++){this.preInitHooks.hooks[at].call(this,av,ar,ay)}this.targetId="#"+av;this.target=L("#"+av);if(this._addDomReference){this.target.data("jqplot",this)}this.target.removeClass("jqplot-error");if(!this.target.get(0)){throw new Error("No plot target specified")}if(this.target.css("position")=="static"){this.target.css("position","relative")}if(!this.target.hasClass("jqplot-target")){this.target.addClass("jqplot-target")}if(!this.target.height()){var au;if(ay&&ay.height){au=parseInt(ay.height,10)}else{if(this.target.attr("data-height")){au=parseInt(this.target.attr("data-height"),10)}else{au=parseInt(L.jqplot.config.defaultHeight,10)}}this._height=au;this.target.css("height",au+"px")}else{this._height=au=this.target.height()}if(!this.target.width()){var aw;if(ay&&ay.width){aw=parseInt(ay.width,10)}else{if(this.target.attr("data-width")){aw=parseInt(this.target.attr("data-width"),10)}else{aw=parseInt(L.jqplot.config.defaultWidth,10)}}this._width=aw;this.target.css("width",aw+"px")}else{this._width=aw=this.target.width()}for(var at=0,ap=U.length;at<ap;at++){this.axes[U[at]]=new w(U[at])}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;if(this._height<=0||this._width<=0||!this._height||!this._width){throw new Error("Canvas dimension not set")}if(ay.dataRenderer&&L.isFunction(ay.dataRenderer)){if(ay.dataRendererOptions){this.dataRendererOptions=ay.dataRendererOptions}this.dataRenderer=ay.dataRenderer;ar=this.dataRenderer(ar,this,this.dataRendererOptions)}if(ay.noDataIndicator&&L.isPlainObject(ay.noDataIndicator)){L.extend(true,this.noDataIndicator,ay.noDataIndicator)}if(ar==null||L.isArray(ar)==false||ar.length==0||L.isArray(ar[0])==false||ar[0].length==0){if(this.noDataIndicator.show==false){throw new Error("No data specified")}else{for(var al in this.noDataIndicator.axes){for(var an in this.noDataIndicator.axes[al]){this.axes[al][an]=this.noDataIndicator.axes[al][an]}}this.postDrawHooks.add(function(){var aD=this.eventCanvas.getHeight();var aA=this.eventCanvas.getWidth();var az=L('<div class="jqplot-noData-container" style="position:absolute;"></div>');this.target.append(az);az.height(aD);az.width(aA);az.css("top",this.eventCanvas._offsets.top);az.css("left",this.eventCanvas._offsets.left);var aC=L('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');az.append(aC);aC.html(this.noDataIndicator.indicator);var aB=aC.height();var ax=aC.width();aC.height(aB);aC.width(ax);aC.css("top",(aD-aB)/2+"px")})}}this.data=L.extend(true,[],ar);this.parseOptions(ay);if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this.title.init();this.legend.init();this._sumy=0;this._sumx=0;this.computePlotData();for(var at=0;at<this.series.length;at++){this.seriesStack.push(at);this.previousSeriesStack.push(at);this.series[at].shadowCanvas._plotDimensions=this._plotDimensions;this.series[at].canvas._plotDimensions=this._plotDimensions;for(var aq=0;aq<L.jqplot.preSeriesInitHooks.length;aq++){L.jqplot.preSeriesInitHooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}for(var aq=0;aq<this.preSeriesInitHooks.hooks.length;aq++){this.preSeriesInitHooks.hooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}this.series[at]._plotDimensions=this._plotDimensions;this.series[at].init(at,this.grid.borderWidth,this);for(var aq=0;aq<L.jqplot.postSeriesInitHooks.length;aq++){L.jqplot.postSeriesInitHooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}for(var aq=0;aq<this.postSeriesInitHooks.hooks.length;aq++){this.postSeriesInitHooks.hooks[aq].call(this.series[at],av,this.data,this.options.seriesDefaults,this.options.series[at],this)}this._sumy+=this.series[at]._sumy;this._sumx+=this.series[at]._sumx}var am,ao;for(var at=0,ap=U.length;at<ap;at++){am=U[at];ao=this.axes[am];ao._plotDimensions=this._plotDimensions;ao.init();if(this.axes[am].borderColor==null){if(am.charAt(0)!=="x"&&ao.useSeriesColor===true&&ao.show){ao.borderColor=ao._series[0].color}else{ao.borderColor=this.grid.borderColor}}}if(this.sortData){ah(this.series)}this.grid.init();this.grid._axes=this.axes;this.legend._series=this.series;for(var at=0;at<L.jqplot.postInitHooks.length;at++){L.jqplot.postInitHooks[at].call(this,av,this.data,ay)}for(var at=0;at<this.postInitHooks.hooks.length;at++){this.postInitHooks.hooks[at].call(this,av,this.data,ay)}};this.resetAxesScale=function(aq,am){var ao=am||{};var ap=aq||this.axes;if(ap===true){ap=this.axes}if(L.isArray(ap)){for(var an=0;an<ap.length;an++){this.axes[ap[an]].resetScale(ao[ap[an]])}}else{if(typeof(ap)==="object"){for(var al in ap){this.axes[al].resetScale(ao[al])}}}};this.reInitialize=function(au,al){var ay=L.extend(true,{},this.options,al);var aw=this.targetId.substr(1);var ar=(au==null)?this.data:au;for(var av=0;av<L.jqplot.preInitHooks.length;av++){L.jqplot.preInitHooks[av].call(this,aw,ar,ay)}for(var av=0;av<this.preInitHooks.hooks.length;av++){this.preInitHooks.hooks[av].call(this,aw,ar,ay)}this._height=this.target.height();this._width=this.target.width();if(this._height<=0||this._width<=0||!this._height||!this._width){throw new Error("Target dimension not set")}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;var am,ax,at,ao;for(var av=0,aq=U.length;av<aq;av++){am=U[av];ao=this.axes[am];ax=ao._ticks;for(var at=0,ap=ax.length;at<ap;at++){var an=ax[at]._elem;if(an){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(an.get(0))}an.emptyForce();an=null;ax._elem=null}}ax=null;delete ao.ticks;delete ao._ticks;this.axes[am]=new w(am);this.axes[am]._plotWidth=this._width;this.axes[am]._plotHeight=this._height}if(au){if(ay.dataRenderer&&L.isFunction(ay.dataRenderer)){if(ay.dataRendererOptions){this.dataRendererOptions=ay.dataRendererOptions}this.dataRenderer=ay.dataRenderer;au=this.dataRenderer(au,this,this.dataRendererOptions)}this.data=L.extend(true,[],au)}if(al){this.parseOptions(ay)}this.title._plotWidth=this._width;if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this.title.init();this.legend.init();this._sumy=0;this._sumx=0;this.seriesStack=[];this.previousSeriesStack=[];this.computePlotData();for(var av=0,aq=this.series.length;av<aq;av++){this.seriesStack.push(av);this.previousSeriesStack.push(av);this.series[av].shadowCanvas._plotDimensions=this._plotDimensions;this.series[av].canvas._plotDimensions=this._plotDimensions;for(var at=0;at<L.jqplot.preSeriesInitHooks.length;at++){L.jqplot.preSeriesInitHooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}for(var at=0;at<this.preSeriesInitHooks.hooks.length;at++){this.preSeriesInitHooks.hooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}this.series[av]._plotDimensions=this._plotDimensions;this.series[av].init(av,this.grid.borderWidth,this);for(var at=0;at<L.jqplot.postSeriesInitHooks.length;at++){L.jqplot.postSeriesInitHooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}for(var at=0;at<this.postSeriesInitHooks.hooks.length;at++){this.postSeriesInitHooks.hooks[at].call(this.series[av],aw,this.data,this.options.seriesDefaults,this.options.series[av],this)}this._sumy+=this.series[av]._sumy;this._sumx+=this.series[av]._sumx}for(var av=0,aq=U.length;av<aq;av++){am=U[av];ao=this.axes[am];ao._plotDimensions=this._plotDimensions;ao.init();if(ao.borderColor==null){if(am.charAt(0)!=="x"&&ao.useSeriesColor===true&&ao.show){ao.borderColor=ao._series[0].color}else{ao.borderColor=this.grid.borderColor}}}if(this.sortData){ah(this.series)}this.grid.init();this.grid._axes=this.axes;this.legend._series=this.series;for(var av=0,aq=L.jqplot.postInitHooks.length;av<aq;av++){L.jqplot.postInitHooks[av].call(this,aw,this.data,ay)}for(var av=0,aq=this.postInitHooks.hooks.length;av<aq;av++){this.postInitHooks.hooks[av].call(this,aw,this.data,ay)}};this.quickInit=function(){this._height=this.target.height();this._width=this.target.width();if(this._height<=0||this._width<=0||!this._height||!this._width){throw new Error("Target dimension not set")}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;for(var aq in this.axes){this.axes[aq]._plotWidth=this._width;this.axes[aq]._plotHeight=this._height}this.title._plotWidth=this._width;if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this._sumy=0;this._sumx=0;this.computePlotData();for(var ao=0;ao<this.series.length;ao++){if(this.series[ao]._type==="line"&&this.series[ao].renderer.bands.show){this.series[ao].renderer.initBands.call(this.series[ao],this.series[ao].renderer.options,this)}this.series[ao]._plotDimensions=this._plotDimensions;this.series[ao].canvas._plotDimensions=this._plotDimensions;this._sumy+=this.series[ao]._sumy;this._sumx+=this.series[ao]._sumx}var am;for(var al=0;al<12;al++){am=U[al];var an=this.axes[am]._ticks;for(var ao=0;ao<an.length;ao++){var ap=an[ao]._elem;if(ap){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){window.G_vmlCanvasManager.uninitElement(ap.get(0))}ap.emptyForce();ap=null;an._elem=null}}an=null;this.axes[am]._plotDimensions=this._plotDimensions;this.axes[am]._ticks=[]}if(this.sortData){ah(this.series)}this.grid._axes=this.axes;this.legend._series=this.series};function ah(ap){var au,av,aw,al,at;for(var aq=0;aq<ap.length;aq++){var am;var ar=[ap[aq].data,ap[aq]._stackData,ap[aq]._plotData,ap[aq]._prevPlotData];for(var an=0;an<4;an++){am=true;au=ar[an];if(ap[aq]._stackAxis=="x"){for(var ao=0;ao<au.length;ao++){if(typeof(au[ao][1])!="number"){am=false;break}}if(am){au.sort(function(ay,ax){return ay[1]-ax[1]})}}else{for(var ao=0;ao<au.length;ao++){if(typeof(au[ao][0])!="number"){am=false;break}}if(am){au.sort(function(ay,ax){return ay[0]-ax[0]})}}}}}this.computePlotData=function(){this._plotData=[];this._stackData=[];var at,au,ao;for(au=0,ao=this.series.length;au<ao;au++){at=this.series[au];this._plotData.push([]);this._stackData.push([]);var am=at.data;this._plotData[au]=L.extend(true,[],am);this._stackData[au]=L.extend(true,[],am);at._plotData=this._plotData[au];at._stackData=this._stackData[au];var ax={x:[],y:[]};if(this.stackSeries&&!at.disableStack){at._stack=true;var av=(at._stackAxis==="x")?0:1;for(var ap=0,al=am.length;ap<al;ap++){var aw=am[ap][av];if(aw==null){aw=0}this._plotData[au][ap][av]=aw;this._stackData[au][ap][av]=aw;if(au>0){for(var aq=au;aq--;){var an=this._plotData[aq][ap][av];if(aw*an>=0){this._plotData[au][ap][av]+=an;this._stackData[au][ap][av]+=an;break}}}}}else{for(var ar=0;ar<at.data.length;ar++){ax.x.push(at.data[ar][0]);ax.y.push(at.data[ar][1])}this._stackData.push(at.data);this.series[au]._stackData=at.data;this._plotData.push(at.data);at._plotData=at.data;at._plotValues=ax}if(au>0){at._prevPlotData=this.series[au-1]._plotData}at._sumy=0;at._sumx=0;for(ar=at.data.length-1;ar>-1;ar--){at._sumy+=at.data[ar][1];at._sumx+=at.data[ar][0]}}};this.populatePlotData=function(au,av){this._plotData=[];this._stackData=[];au._stackData=[];au._plotData=[];var ay={x:[],y:[]};if(this.stackSeries&&!au.disableStack){au._stack=true;var ax=(au._stackAxis==="x")?0:1;var az=L.extend(true,[],au.data);var aA=L.extend(true,[],au.data);var an,am,ao,aw,al;for(var ar=0;ar<av;ar++){var ap=this.series[ar].data;for(var aq=0;aq<ap.length;aq++){ao=ap[aq];an=(ao[0]!=null)?ao[0]:0;am=(ao[1]!=null)?ao[1]:0;az[aq][0]+=an;az[aq][1]+=am;aw=(ax)?am:an;if(au.data[aq][ax]*aw>=0){aA[aq][ax]+=aw}}}for(var at=0;at<aA.length;at++){ay.x.push(aA[at][0]);ay.y.push(aA[at][1])}this._plotData.push(aA);this._stackData.push(az);au._stackData=az;au._plotData=aA;au._plotValues=ay}else{for(var at=0;at<au.data.length;at++){ay.x.push(au.data[at][0]);ay.y.push(au.data[at][1])}this._stackData.push(au.data);this.series[av]._stackData=au.data;this._plotData.push(au.data);au._plotData=au.data;au._plotValues=ay}if(av>0){au._prevPlotData=this.series[av-1]._plotData}au._sumy=0;au._sumx=0;for(at=au.data.length-1;at>-1;at--){au._sumy+=au.data[at][1];au._sumx+=au.data[at][0]}};this.getNextSeriesColor=(function(am){var al=0;var an=am.seriesColors;return function(){if(al<an.length){return an[al++]}else{al=0;return an[al++]}}})(this);this.parseOptions=function(ay){for(var at=0;at<this.preParseOptionsHooks.hooks.length;at++){this.preParseOptionsHooks.hooks[at].call(this,ay)}for(var at=0;at<L.jqplot.preParseOptionsHooks.length;at++){L.jqplot.preParseOptionsHooks[at].call(this,ay)}this.options=L.extend(true,{},this.defaults,ay);var am=this.options;this.animate=am.animate;this.animateReplot=am.animateReplot;this.stackSeries=am.stackSeries;if(L.isPlainObject(am.fillBetween)){var ax=["series1","series2","color","baseSeries","fill"],au;for(var at=0,aq=ax.length;at<aq;at++){au=ax[at];if(am.fillBetween[au]!=null){this.fillBetween[au]=am.fillBetween[au]}}}if(am.seriesColors){this.seriesColors=am.seriesColors}if(am.negativeSeriesColors){this.negativeSeriesColors=am.negativeSeriesColors}if(am.captureRightClick){this.captureRightClick=am.captureRightClick}this.defaultAxisStart=(ay&&ay.defaultAxisStart!=null)?ay.defaultAxisStart:this.defaultAxisStart;this.colorGenerator.setColors(this.seriesColors);this.negativeColorGenerator.setColors(this.negativeSeriesColors);L.extend(true,this._gridPadding,am.gridPadding);this.sortData=(am.sortData!=null)?am.sortData:this.sortData;for(var at=0;at<12;at++){var an=U[at];var ap=this.axes[an];ap._options=L.extend(true,{},am.axesDefaults,am.axes[an]);L.extend(true,ap,am.axesDefaults,am.axes[an]);ap._plotWidth=this._width;ap._plotHeight=this._height}var aw=function(aD,aB,aE){var aA=[];var aC,az;aB=aB||"vertical";if(!L.isArray(aD[0])){for(aC=0,az=aD.length;aC<az;aC++){if(aB=="vertical"){aA.push([aE+aC,aD[aC]])}else{aA.push([aD[aC],aE+aC])}}}else{L.extend(true,aA,aD)}return aA};var av=0;this.series=[];for(var at=0;at<this.data.length;at++){var al=L.extend(true,{index:at},{seriesColors:this.seriesColors,negativeSeriesColors:this.negativeSeriesColors},this.options.seriesDefaults,this.options.series[at],{rendererOptions:{animation:{show:this.animate}}});var ax=new S(al);for(var ar=0;ar<L.jqplot.preParseSeriesOptionsHooks.length;ar++){L.jqplot.preParseSeriesOptionsHooks[ar].call(ax,this.options.seriesDefaults,this.options.series[at])}for(var ar=0;ar<this.preParseSeriesOptionsHooks.hooks.length;ar++){this.preParseSeriesOptionsHooks.hooks[ar].call(ax,this.options.seriesDefaults,this.options.series[at])}L.extend(true,ax,al);var ao="vertical";if(ax.renderer===L.jqplot.BarRenderer&&ax.rendererOptions&&ax.rendererOptions.barDirection=="horizontal"){ao="horizontal";ax._stackAxis="x";ax._primaryAxis="_yaxis"}ax.data=aw(this.data[at],ao,this.defaultAxisStart);switch(ax.xaxis){case"xaxis":ax._xaxis=this.axes.xaxis;break;case"x2axis":ax._xaxis=this.axes.x2axis;break;default:break}ax._yaxis=this.axes[ax.yaxis];ax._xaxis._series.push(ax);ax._yaxis._series.push(ax);if(ax.show){ax._xaxis.show=true;ax._yaxis.show=true}else{if(ax._xaxis.scaleToHiddenSeries){ax._xaxis.show=true}if(ax._yaxis.scaleToHiddenSeries){ax._yaxis.show=true}}if(!ax.label){ax.label="Series "+(at+1).toString()}this.series.push(ax);for(var ar=0;ar<L.jqplot.postParseSeriesOptionsHooks.length;ar++){L.jqplot.postParseSeriesOptionsHooks[ar].call(this.series[at],this.options.seriesDefaults,this.options.series[at])}for(var ar=0;ar<this.postParseSeriesOptionsHooks.hooks.length;ar++){this.postParseSeriesOptionsHooks.hooks[ar].call(this.series[at],this.options.seriesDefaults,this.options.series[at])}}L.extend(true,this.grid,this.options.grid);for(var at=0,aq=U.length;at<aq;at++){var an=U[at];var ap=this.axes[an];if(ap.borderWidth==null){ap.borderWidth=this.grid.borderWidth}}if(typeof this.options.title=="string"){this.title.text=this.options.title}else{if(typeof this.options.title=="object"){L.extend(true,this.title,this.options.title)}}this.title._plotWidth=this._width;this.legend.setOptions(this.options.legend);for(var at=0;at<L.jqplot.postParseOptionsHooks.length;at++){L.jqplot.postParseOptionsHooks[at].call(this,ay)}for(var at=0;at<this.postParseOptionsHooks.hooks.length;at++){this.postParseOptionsHooks.hooks[at].call(this,ay)}};this.destroy=function(){this.canvasManager.freeAllCanvases();if(this.eventCanvas&&this.eventCanvas._elem){this.eventCanvas._elem.unbind()}this.target.empty();this.target[0].innerHTML=""};this.replot=function(am){var an=am||{};var ap=an.data||null;var al=(an.clear===false)?false:true;var ao=an.resetAxes||false;delete an.data;delete an.clear;delete an.resetAxes;this.target.trigger("jqplotPreReplot");if(al){this.destroy()}if(ap||!L.isEmptyObject(an)){this.reInitialize(ap,an)}else{this.quickInit()}if(ao){this.resetAxesScale(ao,an.axes)}this.draw();this.target.trigger("jqplotPostReplot")};this.redraw=function(al){al=(al!=null)?al:true;this.target.trigger("jqplotPreRedraw");if(al){this.canvasManager.freeAllCanvases();this.eventCanvas._elem.unbind();this.target.empty()}for(var an in this.axes){this.axes[an]._ticks=[]}this.computePlotData();this._sumy=0;this._sumx=0;for(var am=0,ao=this.series.length;am<ao;am++){this._sumy+=this.series[am]._sumy;this._sumx+=this.series[am]._sumx}this.draw();this.target.trigger("jqplotPostRedraw")};this.draw=function(){if(this.drawIfHidden||this.target.is(":visible")){this.target.trigger("jqplotPreDraw");var aH,aF,aE,ao;for(aH=0,aE=L.jqplot.preDrawHooks.length;aH<aE;aH++){L.jqplot.preDrawHooks[aH].call(this)}for(aH=0,aE=this.preDrawHooks.hooks.length;aH<aE;aH++){this.preDrawHooks.hooks[aH].apply(this,this.preDrawSeriesHooks.args[aH])}this.target.append(this.baseCanvas.createElement({left:0,right:0,top:0,bottom:0},"jqplot-base-canvas",null,this));this.baseCanvas.setContext();this.target.append(this.title.draw());this.title.pack({top:0,left:0});var aL=this.legend.draw({},this);var al={top:0,left:0,bottom:0,right:0};if(this.legend.placement=="outsideGrid"){this.target.append(aL);switch(this.legend.location){case"n":al.top+=this.legend.getHeight();break;case"s":al.bottom+=this.legend.getHeight();break;case"ne":case"e":case"se":al.right+=this.legend.getWidth();break;case"nw":case"w":case"sw":al.left+=this.legend.getWidth();break;default:al.right+=this.legend.getWidth();break}aL=aL.detach()}var ar=this.axes;var aM;for(aH=0;aH<12;aH++){aM=U[aH];this.target.append(ar[aM].draw(this.baseCanvas._ctx,this));ar[aM].set()}if(ar.yaxis.show){al.left+=ar.yaxis.getWidth()}var aG=["y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];var az=[0,0,0,0,0,0,0,0];var aC=0;var aB;for(aB=0;aB<8;aB++){if(ar[aG[aB]].show){aC+=ar[aG[aB]].getWidth();az[aB]=aC}}al.right+=aC;if(ar.x2axis.show){al.top+=ar.x2axis.getHeight()}if(this.title.show){al.top+=this.title.getHeight()}if(ar.xaxis.show){al.bottom+=ar.xaxis.getHeight()}if(this.options.gridDimensions&&L.isPlainObject(this.options.gridDimensions)){var at=parseInt(this.options.gridDimensions.width,10)||0;var aI=parseInt(this.options.gridDimensions.height,10)||0;var an=(this._width-al.left-al.right-at)/2;var aK=(this._height-al.top-al.bottom-aI)/2;if(aK>=0&&an>=0){al.top+=aK;al.bottom+=aK;al.left+=an;al.right+=an}}var am=["top","bottom","left","right"];for(var aB in am){if(this._gridPadding[am[aB]]==null&&al[am[aB]]>0){this._gridPadding[am[aB]]=al[am[aB]]}else{if(this._gridPadding[am[aB]]==null){this._gridPadding[am[aB]]=this._defaultGridPadding[am[aB]]}}}var aA=this._gridPadding;if(this.legend.placement==="outsideGrid"){aA={top:this.title.getHeight(),left:0,right:0,bottom:0};if(this.legend.location==="s"){aA.left=this._gridPadding.left;aA.right=this._gridPadding.right}}ar.xaxis.pack({position:"absolute",bottom:this._gridPadding.bottom-ar.xaxis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});ar.yaxis.pack({position:"absolute",top:0,left:this._gridPadding.left-ar.yaxis.getWidth(),height:this._height},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});ar.x2axis.pack({position:"absolute",top:this._gridPadding.top-ar.x2axis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});for(aH=8;aH>0;aH--){ar[aG[aH-1]].pack({position:"absolute",top:0,right:this._gridPadding.right-az[aH-1]},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top})}var au=(this._width-this._gridPadding.left-this._gridPadding.right)/2+this._gridPadding.left-ar.yMidAxis.getWidth()/2;ar.yMidAxis.pack({position:"absolute",top:0,left:au,zIndex:9,textAlign:"center"},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});this.target.append(this.grid.createElement(this._gridPadding,this));this.grid.draw();var aq=this.series;var aJ=aq.length;for(aH=0,aE=aJ;aH<aE;aH++){aF=this.seriesStack[aH];this.target.append(aq[aF].shadowCanvas.createElement(this._gridPadding,"jqplot-series-shadowCanvas",null,this));aq[aF].shadowCanvas.setContext();aq[aF].shadowCanvas._elem.data("seriesIndex",aF)}for(aH=0,aE=aJ;aH<aE;aH++){aF=this.seriesStack[aH];this.target.append(aq[aF].canvas.createElement(this._gridPadding,"jqplot-series-canvas",null,this));aq[aF].canvas.setContext();aq[aF].canvas._elem.data("seriesIndex",aF)}this.target.append(this.eventCanvas.createElement(this._gridPadding,"jqplot-event-canvas",null,this));this.eventCanvas.setContext();this.eventCanvas._ctx.fillStyle="rgba(0,0,0,0)";this.eventCanvas._ctx.fillRect(0,0,this.eventCanvas._ctx.canvas.width,this.eventCanvas._ctx.canvas.height);this.bindCustomEvents();if(this.legend.preDraw){this.eventCanvas._elem.before(aL);this.legend.pack(aA);if(this.legend._elem){this.drawSeries({legendInfo:{location:this.legend.location,placement:this.legend.placement,width:this.legend.getWidth(),height:this.legend.getHeight(),xoffset:this.legend.xoffset,yoffset:this.legend.yoffset}})}else{this.drawSeries()}}else{this.drawSeries();if(aJ){L(aq[aJ-1].canvas._elem).after(aL)}this.legend.pack(aA)}for(var aH=0,aE=L.jqplot.eventListenerHooks.length;aH<aE;aH++){this.eventCanvas._elem.bind(L.jqplot.eventListenerHooks[aH][0],{plot:this},L.jqplot.eventListenerHooks[aH][1])}for(var aH=0,aE=this.eventListenerHooks.hooks.length;aH<aE;aH++){this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[aH][0],{plot:this},this.eventListenerHooks.hooks[aH][1])}var ay=this.fillBetween;if(ay.fill&&ay.series1!==ay.series2&&ay.series1<aJ&&ay.series2<aJ&&aq[ay.series1]._type==="line"&&aq[ay.series2]._type==="line"){this.doFillBetweenLines()}for(var aH=0,aE=L.jqplot.postDrawHooks.length;aH<aE;aH++){L.jqplot.postDrawHooks[aH].call(this)}for(var aH=0,aE=this.postDrawHooks.hooks.length;aH<aE;aH++){this.postDrawHooks.hooks[aH].apply(this,this.postDrawHooks.args[aH])}if(this.target.is(":visible")){this._drawCount+=1}var av,aw,aD,ap;for(aH=0,aE=aJ;aH<aE;aH++){av=aq[aH];aw=av.renderer;aD=".jqplot-point-label.jqplot-series-"+aH;if(aw.animation&&aw.animation._supported&&aw.animation.show&&(this._drawCount<2||this.animateReplot)){ap=this.target.find(aD);ap.stop(true,true).hide();av.canvas._elem.stop(true,true).hide();av.shadowCanvas._elem.stop(true,true).hide();av.canvas._elem.jqplotEffect("blind",{mode:"show",direction:aw.animation.direction},aw.animation.speed);av.shadowCanvas._elem.jqplotEffect("blind",{mode:"show",direction:aw.animation.direction},aw.animation.speed);ap.fadeIn(aw.animation.speed*0.8)}}ap=null;this.target.trigger("jqplotPostDraw",[this])}};R.prototype.doFillBetweenLines=function(){var an=this.fillBetween;var ax=an.series1;var av=an.series2;var aw=(ax<av)?ax:av;var au=(av>ax)?av:ax;var ar=this.series[aw];var aq=this.series[au];if(aq.renderer.smooth){var ap=aq.renderer._smoothedData.slice(0).reverse()}else{var ap=aq.gridData.slice(0).reverse()}if(ar.renderer.smooth){var at=ar.renderer._smoothedData.concat(ap)}else{var at=ar.gridData.concat(ap)}var ao=(an.color!==null)?an.color:this.series[ax].fillColor;var ay=(an.baseSeries!==null)?an.baseSeries:aw;var am=this.series[ay].renderer.shapeRenderer;var al={fillStyle:ao,fill:true,closePath:true};am.draw(ar.shadowCanvas._ctx,at,al)};this.bindCustomEvents=function(){this.eventCanvas._elem.bind("click",{plot:this},this.onClick);this.eventCanvas._elem.bind("dblclick",{plot:this},this.onDblClick);this.eventCanvas._elem.bind("mousedown",{plot:this},this.onMouseDown);this.eventCanvas._elem.bind("mousemove",{plot:this},this.onMouseMove);this.eventCanvas._elem.bind("mouseenter",{plot:this},this.onMouseEnter);this.eventCanvas._elem.bind("mouseleave",{plot:this},this.onMouseLeave);if(this.captureRightClick){this.eventCanvas._elem.bind("mouseup",{plot:this},this.onRightClick);this.eventCanvas._elem.get(0).oncontextmenu=function(){return false}}else{this.eventCanvas._elem.bind("mouseup",{plot:this},this.onMouseUp)}};function ai(av){var au=av.data.plot;var ap=au.eventCanvas._elem.offset();var at={x:av.pageX-ap.left,y:av.pageY-ap.top};var aq={xaxis:null,yaxis:null,x2axis:null,y2axis:null,y3axis:null,y4axis:null,y5axis:null,y6axis:null,y7axis:null,y8axis:null,y9axis:null,yMidAxis:null};var ar=["xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"];var al=au.axes;var am,ao;for(am=11;am>0;am--){ao=ar[am-1];if(al[ao].show){aq[ao]=al[ao].series_p2u(at[ao.charAt(0)])}}return{offsets:ap,gridPos:at,dataPos:aq}}function ak(al,am){var aq=am.series;var aW,aU,aT,aO,aP,aJ,aI,aw,au,az,aA,aK;var aS,aX,aQ,ar,aH,aM,aV;var an,aN;for(aT=am.seriesStack.length-1;aT>=0;aT--){aW=am.seriesStack[aT];aO=aq[aW];aV=aO._highlightThreshold;switch(aO.renderer.constructor){case L.jqplot.BarRenderer:aJ=al.x;aI=al.y;for(aU=0;aU<aO._barPoints.length;aU++){aH=aO._barPoints[aU];aQ=aO.gridData[aU];if(aJ>aH[0][0]&&aJ<aH[2][0]&&aI>aH[2][1]&&aI<aH[0][1]){return{seriesIndex:aO.index,pointIndex:aU,gridData:aQ,data:aO.data[aU],points:aO._barPoints[aU]}}}break;case L.jqplot.PyramidRenderer:aJ=al.x;aI=al.y;for(aU=0;aU<aO._barPoints.length;aU++){aH=aO._barPoints[aU];aQ=aO.gridData[aU];if(aJ>aH[0][0]+aV[0][0]&&aJ<aH[2][0]+aV[2][0]&&aI>aH[2][1]&&aI<aH[0][1]){return{seriesIndex:aO.index,pointIndex:aU,gridData:aQ,data:aO.data[aU],points:aO._barPoints[aU]}}}break;case L.jqplot.DonutRenderer:az=aO.startAngle/180*Math.PI;aJ=al.x-aO._center[0];aI=al.y-aO._center[1];aP=Math.sqrt(Math.pow(aJ,2)+Math.pow(aI,2));if(aJ>0&&-aI>=0){aw=2*Math.PI-Math.atan(-aI/aJ)}else{if(aJ>0&&-aI<0){aw=-Math.atan(-aI/aJ)}else{if(aJ<0){aw=Math.PI-Math.atan(-aI/aJ)}else{if(aJ==0&&-aI>0){aw=3*Math.PI/2}else{if(aJ==0&&-aI<0){aw=Math.PI/2}else{if(aJ==0&&aI==0){aw=0}}}}}}if(az){aw-=az;if(aw<0){aw+=2*Math.PI}else{if(aw>2*Math.PI){aw-=2*Math.PI}}}au=aO.sliceMargin/180*Math.PI;if(aP<aO._radius&&aP>aO._innerRadius){for(aU=0;aU<aO.gridData.length;aU++){aA=(aU>0)?aO.gridData[aU-1][1]+au:au;aK=aO.gridData[aU][1];if(aw>aA&&aw<aK){return{seriesIndex:aO.index,pointIndex:aU,gridData:[al.x,al.y],data:aO.data[aU]}}}}break;case L.jqplot.PieRenderer:az=aO.startAngle/180*Math.PI;aJ=al.x-aO._center[0];aI=al.y-aO._center[1];aP=Math.sqrt(Math.pow(aJ,2)+Math.pow(aI,2));if(aJ>0&&-aI>=0){aw=2*Math.PI-Math.atan(-aI/aJ)}else{if(aJ>0&&-aI<0){aw=-Math.atan(-aI/aJ)}else{if(aJ<0){aw=Math.PI-Math.atan(-aI/aJ)}else{if(aJ==0&&-aI>0){aw=3*Math.PI/2}else{if(aJ==0&&-aI<0){aw=Math.PI/2}else{if(aJ==0&&aI==0){aw=0}}}}}}if(az){aw-=az;if(aw<0){aw+=2*Math.PI}else{if(aw>2*Math.PI){aw-=2*Math.PI}}}au=aO.sliceMargin/180*Math.PI;if(aP<aO._radius){for(aU=0;aU<aO.gridData.length;aU++){aA=(aU>0)?aO.gridData[aU-1][1]+au:au;aK=aO.gridData[aU][1];if(aw>aA&&aw<aK){return{seriesIndex:aO.index,pointIndex:aU,gridData:[al.x,al.y],data:aO.data[aU]}}}}break;case L.jqplot.BubbleRenderer:aJ=al.x;aI=al.y;var aF=null;if(aO.show){for(var aU=0;aU<aO.gridData.length;aU++){aQ=aO.gridData[aU];aX=Math.sqrt((aJ-aQ[0])*(aJ-aQ[0])+(aI-aQ[1])*(aI-aQ[1]));if(aX<=aQ[2]&&(aX<=aS||aS==null)){aS=aX;aF={seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}if(aF!=null){return aF}}break;case L.jqplot.FunnelRenderer:aJ=al.x;aI=al.y;var aL=aO._vertices,ap=aL[0],ao=aL[aL.length-1],at,aE,ay;function aR(a0,a2,a1){var aZ=(a2[1]-a1[1])/(a2[0]-a1[0]);var aY=a2[1]-aZ*a2[0];var a3=a0+a2[1];return[(a3-aY)/aZ,a3]}at=aR(aI,ap[0],ao[3]);aE=aR(aI,ap[1],ao[2]);for(aU=0;aU<aL.length;aU++){ay=aL[aU];if(aI>=ay[0][1]&&aI<=ay[3][1]&&aJ>=at[0]&&aJ<=aE[0]){return{seriesIndex:aO.index,pointIndex:aU,gridData:null,data:aO.data[aU]}}}break;case L.jqplot.LineRenderer:aJ=al.x;aI=al.y;aP=aO.renderer;if(aO.show){if((aO.fill||(aO.renderer.bands.show&&aO.renderer.bands.fill))&&(!am.plugins.highlighter||!am.plugins.highlighter.show)){var ax=false;if(aJ>aO._boundingBox[0][0]&&aJ<aO._boundingBox[1][0]&&aI>aO._boundingBox[1][1]&&aI<aO._boundingBox[0][1]){var aD=aO._areaPoints.length;var aG;var aU=aD-1;for(var aG=0;aG<aD;aG++){var aC=[aO._areaPoints[aG][0],aO._areaPoints[aG][1]];var aB=[aO._areaPoints[aU][0],aO._areaPoints[aU][1]];if(aC[1]<aI&&aB[1]>=aI||aB[1]<aI&&aC[1]>=aI){if(aC[0]+(aI-aC[1])/(aB[1]-aC[1])*(aB[0]-aC[0])<aJ){ax=!ax}}aU=aG}}if(ax){return{seriesIndex:aW,pointIndex:null,gridData:aO.gridData,data:aO.data,points:aO._areaPoints}}break}else{aN=aO.markerRenderer.size/2+aO.neighborThreshold;an=(aN>0)?aN:0;for(var aU=0;aU<aO.gridData.length;aU++){aQ=aO.gridData[aU];if(aP.constructor==L.jqplot.OHLCRenderer){if(aP.candleStick){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._bodyWidth/2&&aJ<=aQ[0]+aP._bodyWidth/2&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{if(!aP.hlc){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][1])&&aI<=av(aO.data[aU][2])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}else{if(aQ[0]!=null&&aQ[1]!=null){aX=Math.sqrt((aJ-aQ[0])*(aJ-aQ[0])+(aI-aQ[1])*(aI-aQ[1]));if(aX<=an&&(aX<=aS||aS==null)){aS=aX;return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}}}break;default:aJ=al.x;aI=al.y;aP=aO.renderer;if(aO.show){aN=aO.markerRenderer.size/2+aO.neighborThreshold;an=(aN>0)?aN:0;for(var aU=0;aU<aO.gridData.length;aU++){aQ=aO.gridData[aU];if(aP.constructor==L.jqplot.OHLCRenderer){if(aP.candleStick){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._bodyWidth/2&&aJ<=aQ[0]+aP._bodyWidth/2&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{if(!aP.hlc){var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][2])&&aI<=av(aO.data[aU][3])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}else{var av=aO._yaxis.series_u2p;if(aJ>=aQ[0]-aP._tickLength&&aJ<=aQ[0]+aP._tickLength&&aI>=av(aO.data[aU][1])&&aI<=av(aO.data[aU][2])){return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}else{aX=Math.sqrt((aJ-aQ[0])*(aJ-aQ[0])+(aI-aQ[1])*(aI-aQ[1]));if(aX<=an&&(aX<=aS||aS==null)){aS=aX;return{seriesIndex:aW,pointIndex:aU,gridData:aQ,data:aO.data[aU]}}}}}break}}return null}this.onClick=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotClick");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onDblClick=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotDblClick");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onMouseDown=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotMouseDown");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onMouseUp=function(an){var am=ai(an);var al=L.Event("jqplotMouseUp");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,null,an.data.plot])};this.onRightClick=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);if(ap.captureRightClick){if(an.which==3){var al=L.Event("jqplotRightClick");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])}else{var al=L.Event("jqplotMouseUp");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])}}};this.onMouseMove=function(an){var am=ai(an);var ap=an.data.plot;var ao=ak(am.gridPos,ap);var al=L.Event("jqplotMouseMove");al.pageX=an.pageX;al.pageY=an.pageY;L(this).trigger(al,[am.gridPos,am.dataPos,ao,ap])};this.onMouseEnter=function(an){var am=ai(an);var ao=an.data.plot;var al=L.Event("jqplotMouseEnter");al.pageX=an.pageX;al.pageY=an.pageY;al.relatedTarget=an.relatedTarget;L(this).trigger(al,[am.gridPos,am.dataPos,null,ao])};this.onMouseLeave=function(an){var am=ai(an);var ao=an.data.plot;var al=L.Event("jqplotMouseLeave");al.pageX=an.pageX;al.pageY=an.pageY;al.relatedTarget=an.relatedTarget;L(this).trigger(al,[am.gridPos,am.dataPos,null,ao])};this.drawSeries=function(an,al){var ap,ao,am;al=(typeof(an)==="number"&&al==null)?an:al;an=(typeof(an)==="object")?an:{};if(al!=u){ao=this.series[al];am=ao.shadowCanvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.drawShadow(am,an,this);am=ao.canvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.draw(am,an,this);if(ao.renderer.constructor==L.jqplot.BezierCurveRenderer){if(al<this.series.length-1){this.drawSeries(al+1)}}}else{for(ap=0;ap<this.series.length;ap++){ao=this.series[ap];am=ao.shadowCanvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.drawShadow(am,an,this);am=ao.canvas._ctx;am.clearRect(0,0,am.canvas.width,am.canvas.height);ao.draw(am,an,this)}}an=al=ap=ao=am=null};this.moveSeriesToFront=function(am){am=parseInt(am,10);var ap=L.inArray(am,this.seriesStack);if(ap==-1){return}if(ap==this.seriesStack.length-1){this.previousSeriesStack=this.seriesStack.slice(0);return}var al=this.seriesStack[this.seriesStack.length-1];var ao=this.series[am].canvas._elem.detach();var an=this.series[am].shadowCanvas._elem.detach();this.series[al].shadowCanvas._elem.after(an);this.series[al].canvas._elem.after(ao);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(ap,1);this.seriesStack.push(am)};this.moveSeriesToBack=function(am){am=parseInt(am,10);var ap=L.inArray(am,this.seriesStack);if(ap==0||ap==-1){return}var al=this.seriesStack[0];var ao=this.series[am].canvas._elem.detach();var an=this.series[am].shadowCanvas._elem.detach();this.series[al].shadowCanvas._elem.before(an);this.series[al].canvas._elem.before(ao);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(ap,1);this.seriesStack.unshift(am)};this.restorePreviousSeriesOrder=function(){var ar,aq,ap,ao,an,al,am;if(this.seriesStack==this.previousSeriesStack){return}for(ar=1;ar<this.previousSeriesStack.length;ar++){al=this.previousSeriesStack[ar];am=this.previousSeriesStack[ar-1];ap=this.series[al].canvas._elem.detach();ao=this.series[al].shadowCanvas._elem.detach();this.series[am].shadowCanvas._elem.after(ao);this.series[am].canvas._elem.after(ap)}an=this.seriesStack.slice(0);this.seriesStack=this.previousSeriesStack.slice(0);this.previousSeriesStack=an};this.restoreOriginalSeriesOrder=function(){var ap,ao,al=[],an,am;for(ap=0;ap<this.series.length;ap++){al.push(ap)}if(this.seriesStack==al){return}this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack=al;for(ap=1;ap<this.seriesStack.length;ap++){an=this.series[ap].canvas._elem.detach();am=this.series[ap].shadowCanvas._elem.detach();this.series[ap-1].shadowCanvas._elem.after(am);this.series[ap-1].canvas._elem.after(an)}};this.activateTheme=function(al){this.themeEngine.activate(this,al)}}L.jqplot.computeHighlightColors=function(ai){var ak;if(L.isArray(ai)){ak=[];for(var am=0;am<ai.length;am++){var al=L.jqplot.getColorComponents(ai[am]);var ah=[al[0],al[1],al[2]];var an=ah[0]+ah[1]+ah[2];for(var aj=0;aj<3;aj++){ah[aj]=(an>660)?ah[aj]*0.85:0.73*ah[aj]+90;ah[aj]=parseInt(ah[aj],10);(ah[aj]>255)?255:ah[aj]}ah[3]=0.3+0.35*al[3];ak.push("rgba("+ah[0]+","+ah[1]+","+ah[2]+","+ah[3]+")")}}else{var al=L.jqplot.getColorComponents(ai);var ah=[al[0],al[1],al[2]];var an=ah[0]+ah[1]+ah[2];for(var aj=0;aj<3;aj++){ah[aj]=(an>660)?ah[aj]*0.85:0.73*ah[aj]+90;ah[aj]=parseInt(ah[aj],10);(ah[aj]>255)?255:ah[aj]}ah[3]=0.3+0.35*al[3];ak="rgba("+ah[0]+","+ah[1]+","+ah[2]+","+ah[3]+")"}return ak};L.jqplot.ColorGenerator=function(ai){ai=ai||L.jqplot.config.defaultColors;var ah=0;this.next=function(){if(ah<ai.length){return ai[ah++]}else{ah=0;return ai[ah++]}};this.previous=function(){if(ah>0){return ai[ah--]}else{ah=ai.length-1;return ai[ah]}};this.get=function(ak){var aj=ak-ai.length*Math.floor(ak/ai.length);return ai[aj]};this.setColors=function(aj){ai=aj};this.reset=function(){ah=0};this.getIndex=function(){return ah};this.setIndex=function(aj){ah=aj}};L.jqplot.hex2rgb=function(aj,ah){aj=aj.replace("#","");if(aj.length==3){aj=aj.charAt(0)+aj.charAt(0)+aj.charAt(1)+aj.charAt(1)+aj.charAt(2)+aj.charAt(2)}var ai;ai="rgba("+parseInt(aj.slice(0,2),16)+", "+parseInt(aj.slice(2,4),16)+", "+parseInt(aj.slice(4,6),16);if(ah){ai+=", "+ah}ai+=")";return ai};L.jqplot.rgb2hex=function(am){var aj=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/;var ah=am.match(aj);var al="#";for(var ak=1;ak<4;ak++){var ai;if(ah[ak].search(/%/)!=-1){ai=parseInt(255*ah[ak]/100,10).toString(16);if(ai.length==1){ai="0"+ai}}else{ai=parseInt(ah[ak],10).toString(16);if(ai.length==1){ai="0"+ai}}al+=ai}return al};L.jqplot.normalize2rgb=function(ai,ah){if(ai.search(/^ *rgba?\(/)!=-1){return ai}else{if(ai.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/)!=-1){return L.jqplot.hex2rgb(ai,ah)}else{throw new Error("Invalid color spec")}}};L.jqplot.getColorComponents=function(am){am=L.jqplot.colorKeywordMap[am]||am;var ak=L.jqplot.normalize2rgb(am);var aj=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/;var ah=ak.match(aj);var ai=[];for(var al=1;al<4;al++){if(ah[al].search(/%/)!=-1){ai[al-1]=parseInt(255*ah[al]/100,10)}else{ai[al-1]=parseInt(ah[al],10)}}ai[3]=parseFloat(ah[4])?parseFloat(ah[4]):1;return ai};L.jqplot.colorKeywordMap={aliceblue:"rgb(240, 248, 255)",antiquewhite:"rgb(250, 235, 215)",aqua:"rgb( 0, 255, 255)",aquamarine:"rgb(127, 255, 212)",azure:"rgb(240, 255, 255)",beige:"rgb(245, 245, 220)",bisque:"rgb(255, 228, 196)",black:"rgb( 0, 0, 0)",blanchedalmond:"rgb(255, 235, 205)",blue:"rgb( 0, 0, 255)",blueviolet:"rgb(138, 43, 226)",brown:"rgb(165, 42, 42)",burlywood:"rgb(222, 184, 135)",cadetblue:"rgb( 95, 158, 160)",chartreuse:"rgb(127, 255, 0)",chocolate:"rgb(210, 105, 30)",coral:"rgb(255, 127, 80)",cornflowerblue:"rgb(100, 149, 237)",cornsilk:"rgb(255, 248, 220)",crimson:"rgb(220, 20, 60)",cyan:"rgb( 0, 255, 255)",darkblue:"rgb( 0, 0, 139)",darkcyan:"rgb( 0, 139, 139)",darkgoldenrod:"rgb(184, 134, 11)",darkgray:"rgb(169, 169, 169)",darkgreen:"rgb( 0, 100, 0)",darkgrey:"rgb(169, 169, 169)",darkkhaki:"rgb(189, 183, 107)",darkmagenta:"rgb(139, 0, 139)",darkolivegreen:"rgb( 85, 107, 47)",darkorange:"rgb(255, 140, 0)",darkorchid:"rgb(153, 50, 204)",darkred:"rgb(139, 0, 0)",darksalmon:"rgb(233, 150, 122)",darkseagreen:"rgb(143, 188, 143)",darkslateblue:"rgb( 72, 61, 139)",darkslategray:"rgb( 47, 79, 79)",darkslategrey:"rgb( 47, 79, 79)",darkturquoise:"rgb( 0, 206, 209)",darkviolet:"rgb(148, 0, 211)",deeppink:"rgb(255, 20, 147)",deepskyblue:"rgb( 0, 191, 255)",dimgray:"rgb(105, 105, 105)",dimgrey:"rgb(105, 105, 105)",dodgerblue:"rgb( 30, 144, 255)",firebrick:"rgb(178, 34, 34)",floralwhite:"rgb(255, 250, 240)",forestgreen:"rgb( 34, 139, 34)",fuchsia:"rgb(255, 0, 255)",gainsboro:"rgb(220, 220, 220)",ghostwhite:"rgb(248, 248, 255)",gold:"rgb(255, 215, 0)",goldenrod:"rgb(218, 165, 32)",gray:"rgb(128, 128, 128)",grey:"rgb(128, 128, 128)",green:"rgb( 0, 128, 0)",greenyellow:"rgb(173, 255, 47)",honeydew:"rgb(240, 255, 240)",hotpink:"rgb(255, 105, 180)",indianred:"rgb(205, 92, 92)",indigo:"rgb( 75, 0, 130)",ivory:"rgb(255, 255, 240)",khaki:"rgb(240, 230, 140)",lavender:"rgb(230, 230, 250)",lavenderblush:"rgb(255, 240, 245)",lawngreen:"rgb(124, 252, 0)",lemonchiffon:"rgb(255, 250, 205)",lightblue:"rgb(173, 216, 230)",lightcoral:"rgb(240, 128, 128)",lightcyan:"rgb(224, 255, 255)",lightgoldenrodyellow:"rgb(250, 250, 210)",lightgray:"rgb(211, 211, 211)",lightgreen:"rgb(144, 238, 144)",lightgrey:"rgb(211, 211, 211)",lightpink:"rgb(255, 182, 193)",lightsalmon:"rgb(255, 160, 122)",lightseagreen:"rgb( 32, 178, 170)",lightskyblue:"rgb(135, 206, 250)",lightslategray:"rgb(119, 136, 153)",lightslategrey:"rgb(119, 136, 153)",lightsteelblue:"rgb(176, 196, 222)",lightyellow:"rgb(255, 255, 224)",lime:"rgb( 0, 255, 0)",limegreen:"rgb( 50, 205, 50)",linen:"rgb(250, 240, 230)",magenta:"rgb(255, 0, 255)",maroon:"rgb(128, 0, 0)",mediumaquamarine:"rgb(102, 205, 170)",mediumblue:"rgb( 0, 0, 205)",mediumorchid:"rgb(186, 85, 211)",mediumpurple:"rgb(147, 112, 219)",mediumseagreen:"rgb( 60, 179, 113)",mediumslateblue:"rgb(123, 104, 238)",mediumspringgreen:"rgb( 0, 250, 154)",mediumturquoise:"rgb( 72, 209, 204)",mediumvioletred:"rgb(199, 21, 133)",midnightblue:"rgb( 25, 25, 112)",mintcream:"rgb(245, 255, 250)",mistyrose:"rgb(255, 228, 225)",moccasin:"rgb(255, 228, 181)",navajowhite:"rgb(255, 222, 173)",navy:"rgb( 0, 0, 128)",oldlace:"rgb(253, 245, 230)",olive:"rgb(128, 128, 0)",olivedrab:"rgb(107, 142, 35)",orange:"rgb(255, 165, 0)",orangered:"rgb(255, 69, 0)",orchid:"rgb(218, 112, 214)",palegoldenrod:"rgb(238, 232, 170)",palegreen:"rgb(152, 251, 152)",paleturquoise:"rgb(175, 238, 238)",palevioletred:"rgb(219, 112, 147)",papayawhip:"rgb(255, 239, 213)",peachpuff:"rgb(255, 218, 185)",peru:"rgb(205, 133, 63)",pink:"rgb(255, 192, 203)",plum:"rgb(221, 160, 221)",powderblue:"rgb(176, 224, 230)",purple:"rgb(128, 0, 128)",red:"rgb(255, 0, 0)",rosybrown:"rgb(188, 143, 143)",royalblue:"rgb( 65, 105, 225)",saddlebrown:"rgb(139, 69, 19)",salmon:"rgb(250, 128, 114)",sandybrown:"rgb(244, 164, 96)",seagreen:"rgb( 46, 139, 87)",seashell:"rgb(255, 245, 238)",sienna:"rgb(160, 82, 45)",silver:"rgb(192, 192, 192)",skyblue:"rgb(135, 206, 235)",slateblue:"rgb(106, 90, 205)",slategray:"rgb(112, 128, 144)",slategrey:"rgb(112, 128, 144)",snow:"rgb(255, 250, 250)",springgreen:"rgb( 0, 255, 127)",steelblue:"rgb( 70, 130, 180)",tan:"rgb(210, 180, 140)",teal:"rgb( 0, 128, 128)",thistle:"rgb(216, 191, 216)",tomato:"rgb(255, 99, 71)",turquoise:"rgb( 64, 224, 208)",violet:"rgb(238, 130, 238)",wheat:"rgb(245, 222, 179)",white:"rgb(255, 255, 255)",whitesmoke:"rgb(245, 245, 245)",yellow:"rgb(255, 255, 0)",yellowgreen:"rgb(154, 205, 50)"};L.jqplot.AxisLabelRenderer=function(ah){L.jqplot.ElemContainer.call(this);this.axis;this.show=true;this.label="";this.fontFamily=null;this.fontSize=null;this.textColor=null;this._elem;this.escapeHTML=false;L.extend(true,this,ah)};L.jqplot.AxisLabelRenderer.prototype=new L.jqplot.ElemContainer();L.jqplot.AxisLabelRenderer.prototype.constructor=L.jqplot.AxisLabelRenderer;L.jqplot.AxisLabelRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.AxisLabelRenderer.prototype.draw=function(ah,ai){if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=L('<div style="position:absolute;" class="jqplot-'+this.axis+'-label"></div>');if(Number(this.label)){this._elem.css("white-space","nowrap")}if(!this.escapeHTML){this._elem.html(this.label)}else{this._elem.text(this.label)}if(this.fontFamily){this._elem.css("font-family",this.fontFamily)}if(this.fontSize){this._elem.css("font-size",this.fontSize)}if(this.textColor){this._elem.css("color",this.textColor)}return this._elem};L.jqplot.AxisLabelRenderer.prototype.pack=function(){};L.jqplot.AxisTickRenderer=function(ah){L.jqplot.ElemContainer.call(this);this.mark="outside";this.axis;this.showMark=true;this.showGridline=true;this.isMinorTick=false;this.size=4;this.markSize=6;this.show=true;this.showLabel=true;this.label=null;this.value=null;this._styles={};this.formatter=L.jqplot.DefaultTickFormatter;this.prefix="";this.suffix="";this.formatString="";this.fontFamily;this.fontSize;this.textColor;this.escapeHTML=false;this._elem;this._breakTick=false;L.extend(true,this,ah)};L.jqplot.AxisTickRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.AxisTickRenderer.prototype=new L.jqplot.ElemContainer();L.jqplot.AxisTickRenderer.prototype.constructor=L.jqplot.AxisTickRenderer;L.jqplot.AxisTickRenderer.prototype.setTick=function(ah,aj,ai){this.value=ah;this.axis=aj;if(ai){this.isMinorTick=true}return this};L.jqplot.AxisTickRenderer.prototype.draw=function(){if(this.label===null){this.label=this.prefix+this.formatter(this.formatString,this.value)+this.suffix}var ai={position:"absolute"};if(Number(this.label)){ai.whitSpace="nowrap"}if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=L(document.createElement("div"));this._elem.addClass("jqplot-"+this.axis+"-tick");if(!this.escapeHTML){this._elem.html(this.label)}else{this._elem.text(this.label)}this._elem.css(ai);for(var ah in this._styles){this._elem.css(ah,this._styles[ah])}if(this.fontFamily){this._elem.css("font-family",this.fontFamily)}if(this.fontSize){this._elem.css("font-size",this.fontSize)}if(this.textColor){this._elem.css("color",this.textColor)}if(this._breakTick){this._elem.addClass("jqplot-breakTick")}return this._elem};L.jqplot.DefaultTickFormatter=function(ah,ai){if(typeof ai=="number"){if(!ah){ah=L.jqplot.config.defaultTickFormatString}return L.jqplot.sprintf(ah,ai)}else{return String(ai)}};L.jqplot.PercentTickFormatter=function(ah,ai){if(typeof ai=="number"){ai=100*ai;if(!ah){ah=L.jqplot.config.defaultTickFormatString}return L.jqplot.sprintf(ah,ai)}else{return String(ai)}};L.jqplot.AxisTickRenderer.prototype.pack=function(){};L.jqplot.CanvasGridRenderer=function(){this.shadowRenderer=new L.jqplot.ShadowRenderer()};L.jqplot.CanvasGridRenderer.prototype.init=function(ai){this._ctx;L.extend(true,this,ai);var ah={lineJoin:"miter",lineCap:"round",fill:false,isarc:false,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.shadowWidth,closePath:false,strokeStyle:this.shadowColor};this.renderer.shadowRenderer.init(ah)};L.jqplot.CanvasGridRenderer.prototype.createElement=function(ak){var aj;if(this._elem){if(L.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==u){aj=this._elem.get(0);window.G_vmlCanvasManager.uninitElement(aj);aj=null}this._elem.emptyForce();this._elem=null}aj=ak.canvasManager.getCanvas();var ah=this._plotDimensions.width;var ai=this._plotDimensions.height;aj.width=ah;aj.height=ai;this._elem=L(aj);this._elem.addClass("jqplot-grid-canvas");this._elem.css({position:"absolute",left:0,top:0});aj=ak.canvasManager.initCanvas(aj);this._top=this._offsets.top;this._bottom=ai-this._offsets.bottom;this._left=this._offsets.left;this._right=ah-this._offsets.right;this._width=this._right-this._left;this._height=this._bottom-this._top;aj=null;return this._elem};L.jqplot.CanvasGridRenderer.prototype.draw=function(){this._ctx=this._elem.get(0).getContext("2d");var at=this._ctx;var aw=this._axes;at.save();at.clearRect(0,0,this._plotDimensions.width,this._plotDimensions.height);at.fillStyle=this.backgroundColor||this.background;at.fillRect(this._left,this._top,this._width,this._height);at.save();at.lineJoin="miter";at.lineCap="butt";at.lineWidth=this.gridLineWidth;at.strokeStyle=this.gridLineColor;var aA,az,ap,aq;var am=["xaxis","yaxis","x2axis","y2axis"];for(var ay=4;ay>0;ay--){var aD=am[ay-1];var ah=aw[aD];var aB=ah._ticks;var ar=aB.length;if(ah.show){if(ah.drawBaseline){var aC={};if(ah.baselineWidth!==null){aC.lineWidth=ah.baselineWidth}if(ah.baselineColor!==null){aC.strokeStyle=ah.baselineColor}switch(aD){case"xaxis":ao(this._left,this._bottom,this._right,this._bottom,aC);break;case"yaxis":ao(this._left,this._bottom,this._left,this._top,aC);break;case"x2axis":ao(this._left,this._bottom,this._right,this._bottom,aC);break;case"y2axis":ao(this._right,this._bottom,this._right,this._top,aC);break}}for(var au=ar;au>0;au--){var an=aB[au-1];if(an.show){var ak=Math.round(ah.u2p(an.value))+0.5;switch(aD){case"xaxis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(ak,this._top,ak,this._bottom)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._bottom;az=this._bottom+ap;break;case"inside":aA=this._bottom-ap;az=this._bottom;break;case"cross":aA=this._bottom-ap;az=this._bottom+ap;break;default:aA=this._bottom;az=this._bottom+ap;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[ak,aA],[ak,az]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false})}ao(ak,aA,ak,az)}break;case"yaxis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(this._right,ak,this._left,ak)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._left-ap;az=this._left;break;case"inside":aA=this._left;az=this._left+ap;break;case"cross":aA=this._left-ap;az=this._left+ap;break;default:aA=this._left-ap;az=this._left;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[aA,ak],[az,ak]],{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}ao(aA,ak,az,ak,{strokeStyle:ah.borderColor})}break;case"x2axis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(ak,this._bottom,ak,this._top)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._top-ap;az=this._top;break;case"inside":aA=this._top;az=this._top+ap;break;case"cross":aA=this._top-ap;az=this._top+ap;break;default:aA=this._top-ap;az=this._top;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[ak,aA],[ak,az]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false})}ao(ak,aA,ak,az)}break;case"y2axis":if(an.showGridline&&this.drawGridlines&&((!an.isMinorTick&&ah.drawMajorGridlines)||(an.isMinorTick&&ah.drawMinorGridlines))){ao(this._left,ak,this._right,ak)}if(an.showMark&&an.mark&&((!an.isMinorTick&&ah.drawMajorTickMarks)||(an.isMinorTick&&ah.drawMinorTickMarks))){ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;switch(aq){case"outside":aA=this._right;az=this._right+ap;break;case"inside":aA=this._right-ap;az=this._right;break;case"cross":aA=this._right-ap;az=this._right+ap;break;default:aA=this._right;az=this._right+ap;break}if(this.shadow){this.renderer.shadowRenderer.draw(at,[[aA,ak],[az,ak]],{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}ao(aA,ak,az,ak,{strokeStyle:ah.borderColor})}break;default:break}}}an=null}ah=null;aB=null}am=["y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"];for(var ay=7;ay>0;ay--){var ah=aw[am[ay-1]];var aB=ah._ticks;if(ah.show){var ai=aB[ah.numberTicks-1];var al=aB[0];var aj=ah.getLeft();var av=[[aj,ai.getTop()+ai.getHeight()/2],[aj,al.getTop()+al.getHeight()/2+1]];if(this.shadow){this.renderer.shadowRenderer.draw(at,av,{lineCap:"butt",fill:false,closePath:false})}ao(av[0][0],av[0][1],av[1][0],av[1][1],{lineCap:"butt",strokeStyle:ah.borderColor,lineWidth:ah.borderWidth});for(var au=aB.length;au>0;au--){var an=aB[au-1];ap=an.markSize;aq=an.mark;var ak=Math.round(ah.u2p(an.value))+0.5;if(an.showMark&&an.mark){switch(aq){case"outside":aA=aj;az=aj+ap;break;case"inside":aA=aj-ap;az=aj;break;case"cross":aA=aj-ap;az=aj+ap;break;default:aA=aj;az=aj+ap;break}av=[[aA,ak],[az,ak]];if(this.shadow){this.renderer.shadowRenderer.draw(at,av,{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}ao(aA,ak,az,ak,{strokeStyle:ah.borderColor})}an=null}al=null}ah=null;aB=null}at.restore();function ao(aH,aG,aE,ax,aF){at.save();aF=aF||{};if(aF.lineWidth==null||aF.lineWidth!=0){L.extend(true,at,aF);at.beginPath();at.moveTo(aH,aG);at.lineTo(aE,ax);at.stroke();at.restore()}}if(this.shadow){var av=[[this._left,this._bottom],[this._right,this._bottom],[this._right,this._top]];this.renderer.shadowRenderer.draw(at,av)}if(this.borderWidth!=0&&this.drawBorder){ao(this._left,this._top,this._right,this._top,{lineCap:"round",strokeStyle:aw.x2axis.borderColor,lineWidth:aw.x2axis.borderWidth});ao(this._right,this._top,this._right,this._bottom,{lineCap:"round",strokeStyle:aw.y2axis.borderColor,lineWidth:aw.y2axis.borderWidth});ao(this._right,this._bottom,this._left,this._bottom,{lineCap:"round",strokeStyle:aw.xaxis.borderColor,lineWidth:aw.xaxis.borderWidth});ao(this._left,this._bottom,this._left,this._top,{lineCap:"round",strokeStyle:aw.yaxis.borderColor,lineWidth:aw.yaxis.borderWidth})}at.restore();at=null;aw=null};L.jqplot.DivTitleRenderer=function(){};L.jqplot.DivTitleRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.DivTitleRenderer.prototype.draw=function(){if(this._elem){this._elem.emptyForce();this._elem=null}var ak=this.renderer;var aj=document.createElement("div");this._elem=L(aj);this._elem.addClass("jqplot-title");if(!this.text){this.show=false;this._elem.height(0);this._elem.width(0)}else{if(this.text){var ah;if(this.color){ah=this.color}else{if(this.textColor){ah=this.textColor}}var ai={position:"absolute",top:"0px",left:"0px"};if(this._plotWidth){ai.width=this._plotWidth+"px"}if(this.fontSize){ai.fontSize=this.fontSize}if(typeof this.textAlign==="string"){ai.textAlign=this.textAlign}else{ai.textAlign="center"}if(ah){ai.color=ah}if(this.paddingBottom){ai.paddingBottom=this.paddingBottom}if(this.fontFamily){ai.fontFamily=this.fontFamily}this._elem.css(ai);if(this.escapeHtml){this._elem.text(this.text)}else{this._elem.html(this.text)}}}aj=null;return this._elem};L.jqplot.DivTitleRenderer.prototype.pack=function(){};var r=0.1;L.jqplot.LinePattern=function(aw,aq){var ap={dotted:[r,L.jqplot.config.dotGapLength],dashed:[L.jqplot.config.dashLength,L.jqplot.config.gapLength],solid:null};if(typeof aq==="string"){if(aq[0]==="."||aq[0]==="-"){var ax=aq;aq=[];for(var ao=0,al=ax.length;ao<al;ao++){if(ax[ao]==="."){aq.push(r)}else{if(ax[ao]==="-"){aq.push(L.jqplot.config.dashLength)}else{continue}}aq.push(L.jqplot.config.gapLength)}}else{aq=ap[aq]}}if(!(aq&&aq.length)){return aw}var ak=0;var ar=aq[0];var au=0;var at=0;var an=0;var ah=0;var av=function(ay,az){aw.moveTo(ay,az);au=ay;at=az;an=ay;ah=az};var aj=function(ay,aE){var aC=aw.lineWidth;var aA=ay-au;var az=aE-at;var aB=Math.sqrt(aA*aA+az*az);if((aB>0)&&(aC>0)){aA/=aB;az/=aB;while(true){var aD=aC*ar;if(aD<aB){au+=aD*aA;at+=aD*az;if((ak&1)==0){aw.lineTo(au,at)}else{aw.moveTo(au,at)}aB-=aD;ak++;if(ak>=aq.length){ak=0}ar=aq[ak]}else{au=ay;at=aE;if((ak&1)==0){aw.lineTo(au,at)}else{aw.moveTo(au,at)}ar-=aB/aC;break}}}};var ai=function(){aw.beginPath()};var am=function(){aj(an,ah)};return{moveTo:av,lineTo:aj,beginPath:ai,closePath:am}};L.jqplot.LineRenderer=function(){this.shapeRenderer=new L.jqplot.ShapeRenderer();this.shadowRenderer=new L.jqplot.ShadowRenderer()};L.jqplot.LineRenderer.prototype.init=function(ai,an){ai=ai||{};this._type="line";this.renderer.animation={show:false,direction:"left",speed:2500,_supported:true};this.renderer.smooth=false;this.renderer.tension=null;this.renderer.constrainSmoothing=true;this.renderer._smoothedData=[];this.renderer._smoothedPlotData=[];this.renderer._hiBandGridData=[];this.renderer._lowBandGridData=[];this.renderer._hiBandSmoothedData=[];this.renderer._lowBandSmoothedData=[];this.renderer.bandData=[];this.renderer.bands={show:false,hiData:[],lowData:[],color:this.color,showLines:false,fill:true,fillColor:null,_min:null,_max:null,interval:"3%"};var al={highlightMouseOver:ai.highlightMouseOver,highlightMouseDown:ai.highlightMouseDown,highlightColor:ai.highlightColor};delete (ai.highlightMouseOver);delete (ai.highlightMouseDown);delete (ai.highlightColor);L.extend(true,this.renderer,ai);this.renderer.options=ai;if(this.renderer.bandData.length>1&&(!ai.bands||ai.bands.show==null)){this.renderer.bands.show=true}else{if(ai.bands&&ai.bands.show==null&&ai.bands.interval!=null){this.renderer.bands.show=true}}if(this.fill){this.renderer.bands.show=false}if(this.renderer.bands.show){this.renderer.initBands.call(this,this.renderer.options,an)}if(this._stack){this.renderer.smooth=false}var am={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:false,strokeStyle:this.color,fillStyle:this.fillColor,lineWidth:this.lineWidth,linePattern:this.linePattern,closePath:this.fill};this.renderer.shapeRenderer.init(am);var aj=ai.shadowOffset;if(aj==null){if(this.lineWidth>2.5){aj=1.25*(1+(Math.atan((this.lineWidth/2.5))/0.785398163-1)*0.6)}else{aj=1.25*Math.atan((this.lineWidth/2.5))/0.785398163}}var ah={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:false,angle:this.shadowAngle,offset:aj,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.lineWidth,linePattern:this.linePattern,closePath:this.fill};this.renderer.shadowRenderer.init(ah);this._areaPoints=[];this._boundingBox=[[],[]];if(!this.isTrendline&&this.fill||this.renderer.bands.show){this.highlightMouseOver=true;this.highlightMouseDown=false;this.highlightColor=null;if(al.highlightMouseDown&&al.highlightMouseOver==null){al.highlightMouseOver=false}L.extend(true,this,{highlightMouseOver:al.highlightMouseOver,highlightMouseDown:al.highlightMouseDown,highlightColor:al.highlightColor});if(!this.highlightColor){var ak=(this.renderer.bands.show)?this.renderer.bands.fillColor:this.fillColor;this.highlightColor=L.jqplot.computeHighlightColors(ak)}if(this.highlighter){this.highlighter.show=false}}if(!this.isTrendline&&an){an.plugins.lineRenderer={};an.postInitHooks.addOnce(z);an.postDrawHooks.addOnce(af);an.eventListenerHooks.addOnce("jqplotMouseMove",h);an.eventListenerHooks.addOnce("jqplotMouseDown",e);an.eventListenerHooks.addOnce("jqplotMouseUp",ad);an.eventListenerHooks.addOnce("jqplotClick",g);an.eventListenerHooks.addOnce("jqplotRightClick",s)}};L.jqplot.LineRenderer.prototype.initBands=function(ak,av){var al=ak.bandData||[];var an=this.renderer.bands;an.hiData=[];an.lowData=[];var aB=this.data;an._max=null;an._min=null;if(al.length==2){if(L.isArray(al[0][0])){var ao;var ah=0,ar=0;for(var aw=0,at=al[0].length;aw<at;aw++){ao=al[0][aw];if((ao[1]!=null&&ao[1]>an._max)||an._max==null){an._max=ao[1]}if((ao[1]!=null&&ao[1]<an._min)||an._min==null){an._min=ao[1]}}for(var aw=0,at=al[1].length;aw<at;aw++){ao=al[1][aw];if((ao[1]!=null&&ao[1]>an._max)||an._max==null){an._max=ao[1];ar=1}if((ao[1]!=null&&ao[1]<an._min)||an._min==null){an._min=ao[1];ah=1}}if(ar===ah){an.show=false}an.hiData=al[ar];an.lowData=al[ah]}else{if(al[0].length===aB.length&&al[1].length===aB.length){var aj=(al[0][0]>al[1][0])?0:1;var aC=(aj)?0:1;for(var aw=0,at=aB.length;aw<at;aw++){an.hiData.push([aB[aw][0],al[aj][aw]]);an.lowData.push([aB[aw][0],al[aC][aw]])}}else{an.show=false}}}else{if(al.length>2&&!L.isArray(al[0][0])){var aj=(al[0][0]>al[0][1])?0:1;var aC=(aj)?0:1;for(var aw=0,at=al.length;aw<at;aw++){an.hiData.push([aB[aw][0],al[aw][aj]]);an.lowData.push([aB[aw][0],al[aw][aC]])}}else{var aq=an.interval;var aA=null;var az=null;var ai=null;var au=null;if(L.isArray(aq)){aA=aq[0];az=aq[1]}else{aA=aq}if(isNaN(aA)){if(aA.charAt(aA.length-1)==="%"){ai="multiply";aA=parseFloat(aA)/100+1}}else{aA=parseFloat(aA);ai="add"}if(az!==null&&isNaN(az)){if(az.charAt(az.length-1)==="%"){au="multiply";az=parseFloat(az)/100+1}}else{if(az!==null){az=parseFloat(az);au="add"}}if(aA!==null){if(az===null){az=-aA;au=ai;if(au==="multiply"){az+=2}}if(aA<az){var ax=aA;aA=az;az=ax;ax=ai;ai=au;au=ax}for(var aw=0,at=aB.length;aw<at;aw++){switch(ai){case"add":an.hiData.push([aB[aw][0],aB[aw][1]+aA]);break;case"multiply":an.hiData.push([aB[aw][0],aB[aw][1]*aA]);break}switch(au){case"add":an.lowData.push([aB[aw][0],aB[aw][1]+az]);break;case"multiply":an.lowData.push([aB[aw][0],aB[aw][1]*az]);break}}}else{an.show=false}}}var am=an.hiData;var ap=an.lowData;for(var aw=0,at=am.length;aw<at;aw++){if((am[aw][1]!=null&&am[aw][1]>an._max)||an._max==null){an._max=am[aw][1]}}for(var aw=0,at=ap.length;aw<at;aw++){if((ap[aw][1]!=null&&ap[aw][1]<an._min)||an._min==null){an._min=ap[aw][1]}}if(an.fillColor===null){var ay=L.jqplot.getColorComponents(an.color);ay[3]=ay[3]*0.5;an.fillColor="rgba("+ay[0]+", "+ay[1]+", "+ay[2]+", "+ay[3]+")"}};function K(ai,ah){return(3.4182054+ah)*Math.pow(ai,-0.3534992)}function n(aj,ai){var ah=Math.sqrt(Math.pow((ai[0]-aj[0]),2)+Math.pow((ai[1]-aj[1]),2));return 5.7648*Math.log(ah)+7.4456}function A(ah){var ai=(Math.exp(2*ah)-1)/(Math.exp(2*ah)+1);return ai}function J(aJ){var at=this.renderer.smooth;var aD=this.canvas.getWidth();var an=this._xaxis.series_p2u;var aG=this._yaxis.series_p2u;var aF=null;var am=null;var az=aJ.length/aD;var aj=[];var ay=[];if(!isNaN(parseFloat(at))){aF=parseFloat(at)}else{aF=K(az,0.5)}var aw=[];var ak=[];for(var aE=0,aA=aJ.length;aE<aA;aE++){aw.push(aJ[aE][1]);ak.push(aJ[aE][0])}function av(aK,aL){if(aK-aL==0){return Math.pow(10,10)}else{return aK-aL}}var ax,ar,aq,ap;var ah=aJ.length-1;for(var al=1,aB=aJ.length;al<aB;al++){var ai=[];var au=[];for(var aC=0;aC<2;aC++){var aE=al-1+aC;if(aE==0||aE==ah){ai[aC]=Math.pow(10,10)}else{if(aw[aE+1]-aw[aE]==0||aw[aE]-aw[aE-1]==0){ai[aC]=0}else{if(((ak[aE+1]-ak[aE])/(aw[aE+1]-aw[aE])+(ak[aE]-ak[aE-1])/(aw[aE]-aw[aE-1]))==0){ai[aC]=0}else{if((aw[aE+1]-aw[aE])*(aw[aE]-aw[aE-1])<0){ai[aC]=0}else{ai[aC]=2/(av(ak[aE+1],ak[aE])/(aw[aE+1]-aw[aE])+av(ak[aE],ak[aE-1])/(aw[aE]-aw[aE-1]))}}}}}if(al==1){ai[0]=3/2*(aw[1]-aw[0])/av(ak[1],ak[0])-ai[1]/2}else{if(al==ah){ai[1]=3/2*(aw[ah]-aw[ah-1])/av(ak[ah],ak[ah-1])-ai[0]/2}}au[0]=-2*(ai[1]+2*ai[0])/av(ak[al],ak[al-1])+6*(aw[al]-aw[al-1])/Math.pow(av(ak[al],ak[al-1]),2);au[1]=2*(2*ai[1]+ai[0])/av(ak[al],ak[al-1])-6*(aw[al]-aw[al-1])/Math.pow(av(ak[al],ak[al-1]),2);ap=1/6*(au[1]-au[0])/av(ak[al],ak[al-1]);aq=1/2*(ak[al]*au[0]-ak[al-1]*au[1])/av(ak[al],ak[al-1]);ar=(aw[al]-aw[al-1]-aq*(Math.pow(ak[al],2)-Math.pow(ak[al-1],2))-ap*(Math.pow(ak[al],3)-Math.pow(ak[al-1],3)))/av(ak[al],ak[al-1]);ax=aw[al-1]-ar*ak[al-1]-aq*Math.pow(ak[al-1],2)-ap*Math.pow(ak[al-1],3);var aI=(ak[al]-ak[al-1])/aF;var aH,ao;for(var aC=0,aA=aF;aC<aA;aC++){aH=[];ao=ak[al-1]+aC*aI;aH.push(ao);aH.push(ax+ar*ao+aq*Math.pow(ao,2)+ap*Math.pow(ao,3));aj.push(aH);ay.push([an(aH[0]),aG(aH[1])])}}aj.push(aJ[aE]);ay.push([an(aJ[aE][0]),aG(aJ[aE][1])]);return[aj,ay]}function F(ap){var ao=this.renderer.smooth;var aU=this.renderer.tension;var ah=this.canvas.getWidth();var aH=this._xaxis.series_p2u;var aq=this._yaxis.series_p2u;var aI=null;var aJ=null;var aT=null;var aO=null;var aM=null;var at=null;var aR=null;var am=null;var aK,aL,aD,aC,aA,ay;var ak,ai,av,au;var aB,az,aN;var aw=[];var aj=[];var al=ap.length/ah;var aS,ax,aF,aG,aE;var ar=[];var an=[];if(!isNaN(parseFloat(ao))){aI=parseFloat(ao)}else{aI=K(al,0.5)}if(!isNaN(parseFloat(aU))){aU=parseFloat(aU)}for(var aQ=0,aP=ap.length-1;aQ<aP;aQ++){if(aU===null){at=Math.abs((ap[aQ+1][1]-ap[aQ][1])/(ap[aQ+1][0]-ap[aQ][0]));aS=0.3;ax=0.6;aF=(ax-aS)/2;aG=2.5;aE=-1.4;am=at/aG+aE;aO=aF*A(am)-aF*A(aE)+aS;if(aQ>0){aR=Math.abs((ap[aQ][1]-ap[aQ-1][1])/(ap[aQ][0]-ap[aQ-1][0]))}am=aR/aG+aE;aM=aF*A(am)-aF*A(aE)+aS;aT=(aO+aM)/2}else{aT=aU}for(aK=0;aK<aI;aK++){aL=aK/aI;aD=(1+2*aL)*Math.pow((1-aL),2);aC=aL*Math.pow((1-aL),2);aA=Math.pow(aL,2)*(3-2*aL);ay=Math.pow(aL,2)*(aL-1);if(ap[aQ-1]){ak=aT*(ap[aQ+1][0]-ap[aQ-1][0]);ai=aT*(ap[aQ+1][1]-ap[aQ-1][1])}else{ak=aT*(ap[aQ+1][0]-ap[aQ][0]);ai=aT*(ap[aQ+1][1]-ap[aQ][1])}if(ap[aQ+2]){av=aT*(ap[aQ+2][0]-ap[aQ][0]);au=aT*(ap[aQ+2][1]-ap[aQ][1])}else{av=aT*(ap[aQ+1][0]-ap[aQ][0]);au=aT*(ap[aQ+1][1]-ap[aQ][1])}aB=aD*ap[aQ][0]+aA*ap[aQ+1][0]+aC*ak+ay*av;az=aD*ap[aQ][1]+aA*ap[aQ+1][1]+aC*ai+ay*au;aN=[aB,az];ar.push(aN);an.push([aH(aB),aq(az)])}}ar.push(ap[aP]);an.push([aH(ap[aP][0]),aq(ap[aP][1])]);return[ar,an]}L.jqplot.LineRenderer.prototype.setGridData=function(ap){var al=this._xaxis.series_u2p;var ah=this._yaxis.series_u2p;var am=this._plotData;var aq=this._prevPlotData;this.gridData=[];this._prevGridData=[];this.renderer._smoothedData=[];this.renderer._smoothedPlotData=[];this.renderer._hiBandGridData=[];this.renderer._lowBandGridData=[];this.renderer._hiBandSmoothedData=[];this.renderer._lowBandSmoothedData=[];var ak=this.renderer.bands;var ai=false;for(var an=0,aj=am.length;an<aj;an++){if(am[an][0]!=null&&am[an][1]!=null){this.gridData.push([al.call(this._xaxis,am[an][0]),ah.call(this._yaxis,am[an][1])])}else{if(am[an][0]==null){ai=true;this.gridData.push([null,ah.call(this._yaxis,am[an][1])])}else{if(am[an][1]==null){ai=true;this.gridData.push([al.call(this._xaxis,am[an][0]),null])}}}if(aq[an]!=null&&aq[an][0]!=null&&aq[an][1]!=null){this._prevGridData.push([al.call(this._xaxis,aq[an][0]),ah.call(this._yaxis,aq[an][1])])}else{if(aq[an]!=null&&aq[an][0]==null){this._prevGridData.push([null,ah.call(this._yaxis,aq[an][1])])}else{if(aq[an]!=null&&aq[an][0]!=null&&aq[an][1]==null){this._prevGridData.push([al.call(this._xaxis,aq[an][0]),null])}}}}if(ai){this.renderer.smooth=false;if(this._type==="line"){ak.show=false}}if(this._type==="line"&&ak.show){for(var an=0,aj=ak.hiData.length;an<aj;an++){this.renderer._hiBandGridData.push([al.call(this._xaxis,ak.hiData[an][0]),ah.call(this._yaxis,ak.hiData[an][1])])}for(var an=0,aj=ak.lowData.length;an<aj;an++){this.renderer._lowBandGridData.push([al.call(this._xaxis,ak.lowData[an][0]),ah.call(this._yaxis,ak.lowData[an][1])])}}if(this._type==="line"&&this.renderer.smooth&&this.gridData.length>2){var ao;if(this.renderer.constrainSmoothing){ao=J.call(this,this.gridData);this.renderer._smoothedData=ao[0];this.renderer._smoothedPlotData=ao[1];if(ak.show){ao=J.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ao[0];ao=J.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ao[0]}ao=null}else{ao=F.call(this,this.gridData);this.renderer._smoothedData=ao[0];this.renderer._smoothedPlotData=ao[1];if(ak.show){ao=F.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ao[0];ao=F.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ao[0]}ao=null}}};L.jqplot.LineRenderer.prototype.makeGridData=function(ao,aq){var am=this._xaxis.series_u2p;var ah=this._yaxis.series_u2p;var ar=[];var aj=[];this.renderer._smoothedData=[];this.renderer._smoothedPlotData=[];this.renderer._hiBandGridData=[];this.renderer._lowBandGridData=[];this.renderer._hiBandSmoothedData=[];this.renderer._lowBandSmoothedData=[];var al=this.renderer.bands;var ai=false;for(var an=0;an<ao.length;an++){if(ao[an][0]!=null&&ao[an][1]!=null){ar.push([am.call(this._xaxis,ao[an][0]),ah.call(this._yaxis,ao[an][1])])}else{if(ao[an][0]==null){ai=true;ar.push([null,ah.call(this._yaxis,ao[an][1])])}else{if(ao[an][1]==null){ai=true;ar.push([am.call(this._xaxis,ao[an][0]),null])}}}}if(ai){this.renderer.smooth=false;if(this._type==="line"){al.show=false}}if(this._type==="line"&&al.show){for(var an=0,ak=al.hiData.length;an<ak;an++){this.renderer._hiBandGridData.push([am.call(this._xaxis,al.hiData[an][0]),ah.call(this._yaxis,al.hiData[an][1])])}for(var an=0,ak=al.lowData.length;an<ak;an++){this.renderer._lowBandGridData.push([am.call(this._xaxis,al.lowData[an][0]),ah.call(this._yaxis,al.lowData[an][1])])}}if(this._type==="line"&&this.renderer.smooth&&ar.length>2){var ap;if(this.renderer.constrainSmoothing){ap=J.call(this,ar);this.renderer._smoothedData=ap[0];this.renderer._smoothedPlotData=ap[1];if(al.show){ap=J.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ap[0];ap=J.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ap[0]}ap=null}else{ap=F.call(this,ar);this.renderer._smoothedData=ap[0];this.renderer._smoothedPlotData=ap[1];if(al.show){ap=F.call(this,this.renderer._hiBandGridData);this.renderer._hiBandSmoothedData=ap[0];ap=F.call(this,this.renderer._lowBandGridData);this.renderer._lowBandSmoothedData=ap[0]}ap=null}}return ar};L.jqplot.LineRenderer.prototype.draw=function(ax,aI,ai,aB){var aC;var aq=L.extend(true,{},ai);var ak=(aq.shadow!=u)?aq.shadow:this.shadow;var aJ=(aq.showLine!=u)?aq.showLine:this.showLine;var aA=(aq.fill!=u)?aq.fill:this.fill;var ah=(aq.fillAndStroke!=u)?aq.fillAndStroke:this.fillAndStroke;var ar,ay,av,aE;ax.save();if(aI.length){if(aJ){if(aA){if(this.fillToZero){var aF=this.negativeColor;if(!this.useNegativeColors){aF=aq.fillStyle}var ao=false;var ap=aq.fillStyle;if(ah){var aH=aI.slice(0)}if(this.index==0||!this._stack){var aw=[];var aL=(this.renderer.smooth)?this.renderer._smoothedPlotData:this._plotData;this._areaPoints=[];var aG=this._yaxis.series_u2p(this.fillToValue);var aj=this._xaxis.series_u2p(this.fillToValue);aq.closePath=true;if(this.fillAxis=="y"){aw.push([aI[0][0],aG]);this._areaPoints.push([aI[0][0],aG]);for(var aC=0;aC<aI.length-1;aC++){aw.push(aI[aC]);this._areaPoints.push(aI[aC]);if(aL[aC][1]*aL[aC+1][1]<=0){if(aL[aC][1]<0){ao=true;aq.fillStyle=aF}else{ao=false;aq.fillStyle=ap}var an=aI[aC][0]+(aI[aC+1][0]-aI[aC][0])*(aG-aI[aC][1])/(aI[aC+1][1]-aI[aC][1]);aw.push([an,aG]);this._areaPoints.push([an,aG]);if(ak){this.renderer.shadowRenderer.draw(ax,aw,aq)}this.renderer.shapeRenderer.draw(ax,aw,aq);aw=[[an,aG]]}}if(aL[aI.length-1][1]<0){ao=true;aq.fillStyle=aF}else{ao=false;aq.fillStyle=ap}aw.push(aI[aI.length-1]);this._areaPoints.push(aI[aI.length-1]);aw.push([aI[aI.length-1][0],aG]);this._areaPoints.push([aI[aI.length-1][0],aG])}if(ak){this.renderer.shadowRenderer.draw(ax,aw,aq)}this.renderer.shapeRenderer.draw(ax,aw,aq)}else{var au=this._prevGridData;for(var aC=au.length;aC>0;aC--){aI.push(au[aC-1])}if(ak){this.renderer.shadowRenderer.draw(ax,aI,aq)}this._areaPoints=aI;this.renderer.shapeRenderer.draw(ax,aI,aq)}}else{if(ah){var aH=aI.slice(0)}if(this.index==0||!this._stack){var al=ax.canvas.height;aI.unshift([aI[0][0],al]);var aD=aI.length;aI.push([aI[aD-1][0],al])}else{var au=this._prevGridData;for(var aC=au.length;aC>0;aC--){aI.push(au[aC-1])}}this._areaPoints=aI;if(ak){this.renderer.shadowRenderer.draw(ax,aI,aq)}this.renderer.shapeRenderer.draw(ax,aI,aq)}if(ah){var az=L.extend(true,{},aq,{fill:false,closePath:false});this.renderer.shapeRenderer.draw(ax,aH,az);if(this.markerRenderer.show){if(this.renderer.smooth){aH=this.gridData}for(aC=0;aC<aH.length;aC++){this.markerRenderer.draw(aH[aC][0],aH[aC][1],ax,aq.markerOptions)}}}}else{if(this.renderer.bands.show){var am;var aK=L.extend(true,{},aq);if(this.renderer.bands.showLines){am=(this.renderer.smooth)?this.renderer._hiBandSmoothedData:this.renderer._hiBandGridData;this.renderer.shapeRenderer.draw(ax,am,aq);am=(this.renderer.smooth)?this.renderer._lowBandSmoothedData:this.renderer._lowBandGridData;this.renderer.shapeRenderer.draw(ax,am,aK)}if(this.renderer.bands.fill){if(this.renderer.smooth){am=this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse())}else{am=this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse())}this._areaPoints=am;aK.closePath=true;aK.fill=true;aK.fillStyle=this.renderer.bands.fillColor;this.renderer.shapeRenderer.draw(ax,am,aK)}}if(ak){this.renderer.shadowRenderer.draw(ax,aI,aq)}this.renderer.shapeRenderer.draw(ax,aI,aq)}}var ar=av=ay=aE=null;for(aC=0;aC<this._areaPoints.length;aC++){var at=this._areaPoints[aC];if(ar>at[0]||ar==null){ar=at[0]}if(aE<at[1]||aE==null){aE=at[1]}if(av<at[0]||av==null){av=at[0]}if(ay>at[1]||ay==null){ay=at[1]}}if(this.type==="line"&&this.renderer.bands.show){aE=this._yaxis.series_u2p(this.renderer.bands._min);ay=this._yaxis.series_u2p(this.renderer.bands._max)}this._boundingBox=[[ar,aE],[av,ay]];if(this.markerRenderer.show&&!aA){if(this.renderer.smooth){aI=this.gridData}for(aC=0;aC<aI.length;aC++){if(aI[aC][0]!=null&&aI[aC][1]!=null){this.markerRenderer.draw(aI[aC][0],aI[aC][1],ax,aq.markerOptions)}}}}ax.restore()};L.jqplot.LineRenderer.prototype.drawShadow=function(ah,aj,ai){};function z(ak,aj,ah){for(var ai=0;ai<this.series.length;ai++){if(this.series[ai].renderer.constructor==L.jqplot.LineRenderer){if(this.series[ai].highlightMouseOver){this.series[ai].highlightMouseDown=false}}}}function af(){if(this.plugins.lineRenderer&&this.plugins.lineRenderer.highlightCanvas){this.plugins.lineRenderer.highlightCanvas.resetCanvas();this.plugins.lineRenderer.highlightCanvas=null}this.plugins.lineRenderer.highlightedSeriesIndex=null;this.plugins.lineRenderer.highlightCanvas=new L.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding,"jqplot-lineRenderer-highlight-canvas",this._plotDimensions,this));this.plugins.lineRenderer.highlightCanvas.setContext();this.eventCanvas._elem.bind("mouseleave",{plot:this},function(ah){aa(ah.data.plot)})}function ac(an,am,ak,aj){var ai=an.series[am];var ah=an.plugins.lineRenderer.highlightCanvas;ah._ctx.clearRect(0,0,ah._ctx.canvas.width,ah._ctx.canvas.height);ai._highlightedPoint=ak;an.plugins.lineRenderer.highlightedSeriesIndex=am;var al={fillStyle:ai.highlightColor};if(ai.type==="line"&&ai.renderer.bands.show){al.fill=true;al.closePath=true}ai.renderer.shapeRenderer.draw(ah._ctx,aj,al);ah=null}function aa(aj){var ah=aj.plugins.lineRenderer.highlightCanvas;ah._ctx.clearRect(0,0,ah._ctx.canvas.width,ah._ctx.canvas.height);for(var ai=0;ai<aj.series.length;ai++){aj.series[ai]._highlightedPoint=null}aj.plugins.lineRenderer.highlightedSeriesIndex=null;aj.target.trigger("jqplotDataUnhighlight");ah=null}function h(al,ak,ao,an,am){if(an){var aj=[an.seriesIndex,an.pointIndex,an.data];var ai=jQuery.Event("jqplotDataMouseOver");ai.pageX=al.pageX;ai.pageY=al.pageY;am.target.trigger(ai,aj);if(am.series[aj[0]].highlightMouseOver&&!(aj[0]==am.plugins.lineRenderer.highlightedSeriesIndex)){var ah=jQuery.Event("jqplotDataHighlight");ah.which=al.which;ah.pageX=al.pageX;ah.pageY=al.pageY;am.target.trigger(ah,aj);ac(am,an.seriesIndex,an.pointIndex,an.points)}}else{if(an==null){aa(am)}}}function e(ak,aj,an,am,al){if(am){var ai=[am.seriesIndex,am.pointIndex,am.data];if(al.series[ai[0]].highlightMouseDown&&!(ai[0]==al.plugins.lineRenderer.highlightedSeriesIndex)){var ah=jQuery.Event("jqplotDataHighlight");ah.which=ak.which;ah.pageX=ak.pageX;ah.pageY=ak.pageY;al.target.trigger(ah,ai);ac(al,am.seriesIndex,am.pointIndex,am.points)}}else{if(am==null){aa(al)}}}function ad(aj,ai,am,al,ak){var ah=ak.plugins.lineRenderer.highlightedSeriesIndex;if(ah!=null&&ak.series[ah].highlightMouseDown){aa(ak)}}function g(ak,aj,an,am,al){if(am){var ai=[am.seriesIndex,am.pointIndex,am.data];var ah=jQuery.Event("jqplotDataClick");ah.which=ak.which;ah.pageX=ak.pageX;ah.pageY=ak.pageY;al.target.trigger(ah,ai)}}function s(al,ak,ao,an,am){if(an){var aj=[an.seriesIndex,an.pointIndex,an.data];var ah=am.plugins.lineRenderer.highlightedSeriesIndex;if(ah!=null&&am.series[ah].highlightMouseDown){aa(am)}var ai=jQuery.Event("jqplotDataRightClick");ai.which=al.which;ai.pageX=al.pageX;ai.pageY=al.pageY;am.target.trigger(ai,aj)}}L.jqplot.LinearAxisRenderer=function(){};L.jqplot.LinearAxisRenderer.prototype.init=function(ah){this.breakPoints=null;this.breakTickLabel="&asymp;";this.drawBaseline=true;this.baselineWidth=null;this.baselineColor=null;this.forceTickAt0=false;this.forceTickAt100=false;this.tickInset=0;this.minorTicks=0;this.alignTicks=false;this._autoFormatString="";this._overrideFormatString=false;this._scalefact=1;L.extend(true,this,ah);if(this.breakPoints){if(!L.isArray(this.breakPoints)){this.breakPoints=null}else{if(this.breakPoints.length<2||this.breakPoints[1]<=this.breakPoints[0]){this.breakPoints=null}}}if(this.numberTicks!=null&&this.numberTicks<2){this.numberTicks=2}this.resetDataBounds()};L.jqplot.LinearAxisRenderer.prototype.draw=function(ah,ao){if(this.show){this.renderer.createTicks.call(this,ao);var an=0;var ai;if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=L(document.createElement("div"));this._elem.addClass("jqplot-axis jqplot-"+this.name);this._elem.css("position","absolute");if(this.name=="xaxis"||this.name=="x2axis"){this._elem.width(this._plotDimensions.width)}else{this._elem.height(this._plotDimensions.height)}this.labelOptions.axis=this.name;this._label=new this.labelRenderer(this.labelOptions);if(this._label.show){var am=this._label.draw(ah,ao);am.appendTo(this._elem);am=null}var al=this._ticks;var ak;for(var aj=0;aj<al.length;aj++){ak=al[aj];if(ak.show&&ak.showLabel&&(!ak.isMinorTick||this.showMinorTicks)){this._elem.append(ak.draw(ah,ao))}}ak=null;al=null}return this._elem};L.jqplot.LinearAxisRenderer.prototype.reset=function(){this.min=this._options.min;this.max=this._options.max;this.tickInterval=this._options.tickInterval;this.numberTicks=this._options.numberTicks;this._autoFormatString="";if(this._overrideFormatString&&this.tickOptions&&this.tickOptions.formatString){this.tickOptions.formatString=""}};L.jqplot.LinearAxisRenderer.prototype.set=function(){var ao=0;var aj;var ai=0;var an=0;var ah=(this._label==null)?false:this._label.show;if(this.show){var am=this._ticks;var al;for(var ak=0;ak<am.length;ak++){al=am[ak];if(!al._breakTick&&al.show&&al.showLabel&&(!al.isMinorTick||this.showMinorTicks)){if(this.name=="xaxis"||this.name=="x2axis"){aj=al._elem.outerHeight(true)}else{aj=al._elem.outerWidth(true)}if(aj>ao){ao=aj}}}al=null;am=null;if(ah){ai=this._label._elem.outerWidth(true);an=this._label._elem.outerHeight(true)}if(this.name=="xaxis"){ao=ao+an;this._elem.css({height:ao+"px",left:"0px",bottom:"0px"})}else{if(this.name=="x2axis"){ao=ao+an;this._elem.css({height:ao+"px",left:"0px",top:"0px"})}else{if(this.name=="yaxis"){ao=ao+ai;this._elem.css({width:ao+"px",left:"0px",top:"0px"});if(ah&&this._label.constructor==L.jqplot.AxisLabelRenderer){this._label._elem.css("width",ai+"px")}}else{ao=ao+ai;this._elem.css({width:ao+"px",right:"0px",top:"0px"});if(ah&&this._label.constructor==L.jqplot.AxisLabelRenderer){this._label._elem.css("width",ai+"px")}}}}}};L.jqplot.LinearAxisRenderer.prototype.createTicks=function(aj){var aT=this._ticks;var aK=this.ticks;var az=this.name;var aB=this._dataBounds;var ah=(this.name.charAt(0)==="x")?this._plotDimensions.width:this._plotDimensions.height;var an;var a6,aI;var ap,ao;var a4,a0;var aH=this.min;var a5=this.max;var aW=this.numberTicks;var ba=this.tickInterval;var am=30;this._scalefact=(Math.max(ah,am+1)-am)/300;if(aK.length){for(a0=0;a0<aK.length;a0++){var aO=aK[a0];var aU=new this.tickRenderer(this.tickOptions);if(L.isArray(aO)){aU.value=aO[0];if(this.breakPoints){if(aO[0]==this.breakPoints[0]){aU.label=this.breakTickLabel;aU._breakTick=true;aU.showGridline=false;aU.showMark=false}else{if(aO[0]>this.breakPoints[0]&&aO[0]<=this.breakPoints[1]){aU.show=false;aU.showGridline=false;aU.label=aO[1]}else{aU.label=aO[1]}}}else{aU.label=aO[1]}aU.setTick(aO[0],this.name);this._ticks.push(aU)}else{if(L.isPlainObject(aO)){L.extend(true,aU,aO);aU.axis=this.name;this._ticks.push(aU)}else{aU.value=aO;if(this.breakPoints){if(aO==this.breakPoints[0]){aU.label=this.breakTickLabel;aU._breakTick=true;aU.showGridline=false;aU.showMark=false}else{if(aO>this.breakPoints[0]&&aO<=this.breakPoints[1]){aU.show=false;aU.showGridline=false}}}aU.setTick(aO,this.name);this._ticks.push(aU)}}}this.numberTicks=aK.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.tickInterval=(this.max-this.min)/(this.numberTicks-1)}else{if(az=="xaxis"||az=="x2axis"){ah=this._plotDimensions.width}else{ah=this._plotDimensions.height}var ax=this.numberTicks;if(this.alignTicks){if(this.name==="x2axis"&&aj.axes.xaxis.show){ax=aj.axes.xaxis.numberTicks}else{if(this.name.charAt(0)==="y"&&this.name!=="yaxis"&&this.name!=="yMidAxis"&&aj.axes.yaxis.show){ax=aj.axes.yaxis.numberTicks}}}a6=((this.min!=null)?this.min:aB.min);aI=((this.max!=null)?this.max:aB.max);var av=aI-a6;var aS,ay;var at;if(this.tickOptions==null||!this.tickOptions.formatString){this._overrideFormatString=true}if(this.min==null||this.max==null&&this.tickInterval==null&&!this.autoscale){if(this.forceTickAt0){if(a6>0){a6=0}if(aI<0){aI=0}}if(this.forceTickAt100){if(a6>100){a6=100}if(aI<100){aI=100}}var aE=false,a1=false;if(this.min!=null){aE=true}else{if(this.max!=null){a1=true}}var aP=L.jqplot.LinearTickGenerator(a6,aI,this._scalefact,ax,aE,a1);var aw=(this.min!=null)?a6:a6+av*(this.padMin-1);var aQ=(this.max!=null)?aI:aI-av*(this.padMax-1);if(a6<aw||aI>aQ){aw=(this.min!=null)?a6:a6-av*(this.padMin-1);aQ=(this.max!=null)?aI:aI+av*(this.padMax-1);aP=L.jqplot.LinearTickGenerator(aw,aQ,this._scalefact,ax,aE,a1)}this.min=aP[0];this.max=aP[1];this.numberTicks=aP[2];this._autoFormatString=aP[3];this.tickInterval=aP[4]}else{if(a6==aI){var ai=0.05;if(a6>0){ai=Math.max(Math.log(a6)/Math.LN10,0.05)}a6-=ai;aI+=ai}if(this.autoscale&&this.min==null&&this.max==null){var ak,al,ar;var aC=false;var aN=false;var aA={min:null,max:null,average:null,stddev:null};for(var a0=0;a0<this._series.length;a0++){var aV=this._series[a0];var aD=(aV.fillAxis=="x")?aV._xaxis.name:aV._yaxis.name;if(this.name==aD){var aR=aV._plotValues[aV.fillAxis];var aG=aR[0];var a2=aR[0];for(var aZ=1;aZ<aR.length;aZ++){if(aR[aZ]<aG){aG=aR[aZ]}else{if(aR[aZ]>a2){a2=aR[aZ]}}}var au=(a2-aG)/a2;if(aV.renderer.constructor==L.jqplot.BarRenderer){if(aG>=0&&(aV.fillToZero||au>0.1)){aC=true}else{aC=false;if(aV.fill&&aV.fillToZero&&aG<0&&a2>0){aN=true}else{aN=false}}}else{if(aV.fill){if(aG>=0&&(aV.fillToZero||au>0.1)){aC=true}else{if(aG<0&&a2>0&&aV.fillToZero){aC=false;aN=true}else{aC=false;aN=false}}}else{if(aG<0){aC=false}}}}}if(aC){this.numberTicks=2+Math.ceil((ah-(this.tickSpacing-1))/this.tickSpacing);this.min=0;aH=0;al=aI/(this.numberTicks-1);at=Math.pow(10,Math.abs(Math.floor(Math.log(al)/Math.LN10)));if(al/at==parseInt(al/at,10)){al+=at}this.tickInterval=Math.ceil(al/at)*at;this.max=this.tickInterval*(this.numberTicks-1)}else{if(aN){this.numberTicks=2+Math.ceil((ah-(this.tickSpacing-1))/this.tickSpacing);var aJ=Math.ceil(Math.abs(a6)/av*(this.numberTicks-1));var a9=this.numberTicks-1-aJ;al=Math.max(Math.abs(a6/aJ),Math.abs(aI/a9));at=Math.pow(10,Math.abs(Math.floor(Math.log(al)/Math.LN10)));this.tickInterval=Math.ceil(al/at)*at;this.max=this.tickInterval*a9;this.min=-this.tickInterval*aJ}else{if(this.numberTicks==null){if(this.tickInterval){this.numberTicks=3+Math.ceil(av/this.tickInterval)}else{this.numberTicks=2+Math.ceil((ah-(this.tickSpacing-1))/this.tickSpacing)}}if(this.tickInterval==null){al=av/(this.numberTicks-1);if(al<1){at=Math.pow(10,Math.abs(Math.floor(Math.log(al)/Math.LN10)))}else{at=1}this.tickInterval=Math.ceil(al*at*this.pad)/at}else{at=1/this.tickInterval}ak=this.tickInterval*(this.numberTicks-1);ar=(ak-av)/2;if(this.min==null){this.min=Math.floor(at*(a6-ar))/at}if(this.max==null){this.max=this.min+ak}}}var aF=L.jqplot.getSignificantFigures(this.tickInterval);var aM;if(aF.digitsLeft>=aF.significantDigits){aM="%d"}else{var at=Math.max(0,5-aF.digitsLeft);at=Math.min(at,aF.digitsRight);aM="%."+at+"f"}this._autoFormatString=aM}else{aS=(this.min!=null)?this.min:a6-av*(this.padMin-1);ay=(this.max!=null)?this.max:aI+av*(this.padMax-1);av=ay-aS;if(this.numberTicks==null){if(this.tickInterval!=null){this.numberTicks=Math.ceil((ay-aS)/this.tickInterval)+1}else{if(ah>100){this.numberTicks=parseInt(3+(ah-100)/75,10)}else{this.numberTicks=2}}}if(this.tickInterval==null){this.tickInterval=av/(this.numberTicks-1)}if(this.max==null){ay=aS+this.tickInterval*(this.numberTicks-1)}if(this.min==null){aS=ay-this.tickInterval*(this.numberTicks-1)}var aF=L.jqplot.getSignificantFigures(this.tickInterval);var aM;if(aF.digitsLeft>=aF.significantDigits){aM="%d"}else{var at=Math.max(0,5-aF.digitsLeft);at=Math.min(at,aF.digitsRight);aM="%."+at+"f"}this._autoFormatString=aM;this.min=aS;this.max=ay}if(this.renderer.constructor==L.jqplot.LinearAxisRenderer&&this._autoFormatString==""){av=this.max-this.min;var a7=new this.tickRenderer(this.tickOptions);var aL=a7.formatString||L.jqplot.config.defaultTickFormatString;var aL=aL.match(L.jqplot.sprintf.regex)[0];var a3=0;if(aL){if(aL.search(/[fFeEgGpP]/)>-1){var aY=aL.match(/\%\.(\d{0,})?[eEfFgGpP]/);if(aY){a3=parseInt(aY[1],10)}else{a3=6}}else{if(aL.search(/[di]/)>-1){a3=0}}var aq=Math.pow(10,-a3);if(this.tickInterval<aq){if(aW==null&&ba==null){this.tickInterval=aq;if(a5==null&&aH==null){this.min=Math.floor(this._dataBounds.min/aq)*aq;if(this.min==this._dataBounds.min){this.min=this._dataBounds.min-this.tickInterval}this.max=Math.ceil(this._dataBounds.max/aq)*aq;if(this.max==this._dataBounds.max){this.max=this._dataBounds.max+this.tickInterval}var aX=(this.max-this.min)/this.tickInterval;aX=aX.toFixed(11);aX=Math.ceil(aX);this.numberTicks=aX+1}else{if(a5==null){var aX=(this._dataBounds.max-this.min)/this.tickInterval;aX=aX.toFixed(11);this.numberTicks=Math.ceil(aX)+2;this.max=this.min+this.tickInterval*(this.numberTicks-1)}else{if(aH==null){var aX=(this.max-this._dataBounds.min)/this.tickInterval;aX=aX.toFixed(11);this.numberTicks=Math.ceil(aX)+2;this.min=this.max-this.tickInterval*(this.numberTicks-1)}else{this.numberTicks=Math.ceil((a5-aH)/this.tickInterval)+1;this.min=Math.floor(aH*Math.pow(10,a3))/Math.pow(10,a3);this.max=Math.ceil(a5*Math.pow(10,a3))/Math.pow(10,a3);this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1}}}}}}}}if(this._overrideFormatString&&this._autoFormatString!=""){this.tickOptions=this.tickOptions||{};this.tickOptions.formatString=this._autoFormatString}var aU,a8;for(var a0=0;a0<this.numberTicks;a0++){a4=this.min+a0*this.tickInterval;aU=new this.tickRenderer(this.tickOptions);aU.setTick(a4,this.name);this._ticks.push(aU);if(a0<this.numberTicks-1){for(var aZ=0;aZ<this.minorTicks;aZ++){a4+=this.tickInterval/(this.minorTicks+1);a8=L.extend(true,{},this.tickOptions,{name:this.name,value:a4,label:"",isMinorTick:true});aU=new this.tickRenderer(a8);this._ticks.push(aU)}}aU=null}}if(this.tickInset){this.min=this.min-this.tickInset*this.tickInterval;this.max=this.max+this.tickInset*this.tickInterval}aT=null};L.jqplot.LinearAxisRenderer.prototype.resetTickValues=function(aj){if(L.isArray(aj)&&aj.length==this._ticks.length){var ai;for(var ah=0;ah<aj.length;ah++){ai=this._ticks[ah];ai.value=aj[ah];ai.label=ai.formatter(ai.formatString,aj[ah]);ai.label=ai.prefix+ai.label;ai._elem.html(ai.label)}ai=null;this.min=L.jqplot.arrayMin(aj);this.max=L.jqplot.arrayMax(aj);this.pack()}};L.jqplot.LinearAxisRenderer.prototype.pack=function(aj,ai){aj=aj||{};ai=ai||this._offsets;var ay=this._ticks;var au=this.max;var at=this.min;var ao=ai.max;var am=ai.min;var aq=(this._label==null)?false:this._label.show;for(var ar in aj){this._elem.css(ar,aj[ar])}this._offsets=ai;var ak=ao-am;var al=au-at;if(this.breakPoints){al=al-this.breakPoints[1]+this.breakPoints[0];this.p2u=function(aA){return(aA-am)*al/ak+at};this.u2p=function(aA){if(aA>this.breakPoints[0]&&aA<this.breakPoints[1]){aA=this.breakPoints[0]}if(aA<=this.breakPoints[0]){return(aA-at)*ak/al+am}else{return(aA-this.breakPoints[1]+this.breakPoints[0]-at)*ak/al+am}};if(this.name.charAt(0)=="x"){this.series_u2p=function(aA){if(aA>this.breakPoints[0]&&aA<this.breakPoints[1]){aA=this.breakPoints[0]}if(aA<=this.breakPoints[0]){return(aA-at)*ak/al}else{return(aA-this.breakPoints[1]+this.breakPoints[0]-at)*ak/al}};this.series_p2u=function(aA){return aA*al/ak+at}}else{this.series_u2p=function(aA){if(aA>this.breakPoints[0]&&aA<this.breakPoints[1]){aA=this.breakPoints[0]}if(aA>=this.breakPoints[1]){return(aA-au)*ak/al}else{return(aA+this.breakPoints[1]-this.breakPoints[0]-au)*ak/al}};this.series_p2u=function(aA){return aA*al/ak+au}}}else{this.p2u=function(aA){return(aA-am)*al/ak+at};this.u2p=function(aA){return(aA-at)*ak/al+am};if(this.name=="xaxis"||this.name=="x2axis"){this.series_u2p=function(aA){return(aA-at)*ak/al};this.series_p2u=function(aA){return aA*al/ak+at}}else{this.series_u2p=function(aA){return(aA-au)*ak/al};this.series_p2u=function(aA){return aA*al/ak+au}}}if(this.show){if(this.name=="xaxis"||this.name=="x2axis"){for(var av=0;av<ay.length;av++){var ap=ay[av];if(ap.show&&ap.showLabel){var ah;if(ap.constructor==L.jqplot.CanvasAxisTickRenderer&&ap.angle){var ax=(this.name=="xaxis")?1:-1;switch(ap.labelPosition){case"auto":if(ax*ap.angle<0){ah=-ap.getWidth()+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2}else{ah=-ap._textRenderer.height*Math.sin(ap._textRenderer.angle)/2}break;case"end":ah=-ap.getWidth()+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2;break;case"start":ah=-ap._textRenderer.height*Math.sin(ap._textRenderer.angle)/2;break;case"middle":ah=-ap.getWidth()/2+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2;break;default:ah=-ap.getWidth()/2+ap._textRenderer.height*Math.sin(-ap._textRenderer.angle)/2;break}}else{ah=-ap.getWidth()/2}var az=this.u2p(ap.value)+ah+"px";ap._elem.css("left",az);ap.pack()}}if(aq){var an=this._label._elem.outerWidth(true);this._label._elem.css("left",am+ak/2-an/2+"px");if(this.name=="xaxis"){this._label._elem.css("bottom","0px")}else{this._label._elem.css("top","0px")}this._label.pack()}}else{for(var av=0;av<ay.length;av++){var ap=ay[av];if(ap.show&&ap.showLabel){var ah;if(ap.constructor==L.jqplot.CanvasAxisTickRenderer&&ap.angle){var ax=(this.name=="yaxis")?1:-1;switch(ap.labelPosition){case"auto":case"end":if(ax*ap.angle<0){ah=-ap._textRenderer.height*Math.cos(-ap._textRenderer.angle)/2}else{ah=-ap.getHeight()+ap._textRenderer.height*Math.cos(ap._textRenderer.angle)/2}break;case"start":if(ap.angle>0){ah=-ap._textRenderer.height*Math.cos(-ap._textRenderer.angle)/2}else{ah=-ap.getHeight()+ap._textRenderer.height*Math.cos(ap._textRenderer.angle)/2}break;case"middle":ah=-ap.getHeight()/2;break;default:ah=-ap.getHeight()/2;break}}else{ah=-ap.getHeight()/2}var az=this.u2p(ap.value)+ah+"px";ap._elem.css("top",az);ap.pack()}}if(aq){var aw=this._label._elem.outerHeight(true);this._label._elem.css("top",ao-ak/2-aw/2+"px");if(this.name=="yaxis"){this._label._elem.css("left","0px")}else{this._label._elem.css("right","0px")}this._label.pack()}}}ay=null};function i(ai){var ah;ai=Math.abs(ai);if(ai>=10){ah="%d"}else{if(ai>1){if(ai===parseInt(ai,10)){ah="%d"}else{ah="%.1f"}}else{var aj=-Math.floor(Math.log(ai)/Math.LN10);ah="%."+aj+"f"}}return ah}var b=[0.1,0.2,0.3,0.4,0.5,0.8,1,2,3,4,5];var c=function(ai){var ah=b.indexOf(ai);if(ah>0){return b[ah-1]}else{return b[b.length-1]/100}};var k=function(ai){var ah=b.indexOf(ai);if(ah<b.length-1){return b[ah+1]}else{return b[0]*100}};function d(al,au,at){var aq=Math.floor(at/2);var ai=Math.ceil(at*1.5);var ak=Number.MAX_VALUE;var ah=(au-al);var ax;var ap;var ar;var ay=L.jqplot.getSignificantFigures;var aw;var an;var ao;var av;for(var am=0,aj=ai-aq+1;am<aj;am++){ao=aq+am;ax=ah/(ao-1);ap=ay(ax);ax=Math.abs(at-ao)+ap.digitsRight;if(ax<ak){ak=ax;ar=ao;av=ap.digitsRight}else{if(ax===ak){if(ap.digitsRight<av){ar=ao;av=ap.digitsRight}}}}aw=Math.max(av,Math.max(ay(al).digitsRight,ay(au).digitsRight));if(aw===0){an="%d"}else{an="%."+aw+"f"}ax=ah/(ar-1);return[al,au,ar,an,ax]}function W(ai,al){al=al||7;var ak=ai/(al-1);var aj=Math.pow(10,Math.floor(Math.log(ak)/Math.LN10));var am=ak/aj;var ah;if(aj<1){if(am>5){ah=10*aj}else{if(am>2){ah=5*aj}else{if(am>1){ah=2*aj}else{ah=aj}}}}else{if(am>5){ah=10*aj}else{if(am>4){ah=5*aj}else{if(am>3){ah=4*aj}else{if(am>2){ah=3*aj}else{if(am>1){ah=2*aj}else{ah=aj}}}}}}return ah}function Q(ai,ah){ah=ah||1;var ak=Math.floor(Math.log(ai)/Math.LN10);var am=Math.pow(10,ak);var al=ai/am;var aj;al=al/ah;if(al<=0.38){aj=0.1}else{if(al<=1.6){aj=0.2}else{if(al<=4){aj=0.5}else{if(al<=8){aj=1}else{if(al<=16){aj=2}else{aj=5}}}}}return aj*am}function x(aj,ai){var al=Math.floor(Math.log(aj)/Math.LN10);var an=Math.pow(10,al);var am=aj/an;var ah;var ak;am=am/ai;if(am<=0.38){ak=0.1}else{if(am<=1.6){ak=0.2}else{if(am<=4){ak=0.5}else{if(am<=8){ak=1}else{if(am<=16){ak=2}else{ak=5}}}}}ah=ak*an;return[ah,ak,an]}L.jqplot.LinearTickGenerator=function(an,aq,aj,ak,ao,ar){ao=(ao===null)?false:ao;ar=(ar===null||ao)?false:ar;if(an===aq){aq=(aq)?0:1}aj=aj||1;if(aq<an){var at=aq;aq=an;an=at}var ai=[];var aw=Q(aq-an,aj);var av=L.jqplot.getSignificantFigures;if(ak==null){if(!ao&&!ar){ai[0]=Math.floor(an/aw)*aw;ai[1]=Math.ceil(aq/aw)*aw;ai[2]=Math.round((ai[1]-ai[0])/aw+1);ai[3]=i(aw);ai[4]=aw}else{if(ao){ai[0]=an;ai[2]=Math.ceil((aq-an)/aw+1);ai[1]=an+(ai[2]-1)*aw;var au=av(an).digitsRight;var ap=av(aw).digitsRight;if(au<ap){ai[3]=i(aw)}else{ai[3]="%."+au+"f"}ai[4]=aw}else{if(ar){ai[1]=aq;ai[2]=Math.ceil((aq-an)/aw+1);ai[0]=aq-(ai[2]-1)*aw;var al=av(aq).digitsRight;var ap=av(aw).digitsRight;if(al<ap){ai[3]=i(aw)}else{ai[3]="%."+al+"f"}ai[4]=aw}}}}else{var am=[];am[0]=Math.floor(an/aw)*aw;am[1]=Math.ceil(aq/aw)*aw;am[2]=Math.round((am[1]-am[0])/aw+1);am[3]=i(aw);am[4]=aw;if(am[2]===ak){ai=am}else{var ah=W(am[1]-am[0],ak);ai[0]=am[0];ai[2]=ak;ai[4]=ah;ai[3]=i(ah);ai[1]=ai[0]+(ai[2]-1)*ai[4]}}return ai};L.jqplot.LinearTickGenerator.bestLinearInterval=Q;L.jqplot.LinearTickGenerator.bestInterval=W;L.jqplot.LinearTickGenerator.bestLinearComponents=x;L.jqplot.LinearTickGenerator.bestConstrainedInterval=d;L.jqplot.MarkerRenderer=function(ah){this.show=true;this.style="filledCircle";this.lineWidth=2;this.size=9;this.color="#666666";this.shadow=true;this.shadowAngle=45;this.shadowOffset=1;this.shadowDepth=3;this.shadowAlpha="0.07";this.shadowRenderer=new L.jqplot.ShadowRenderer();this.shapeRenderer=new L.jqplot.ShapeRenderer();L.extend(true,this,ah)};L.jqplot.MarkerRenderer.prototype.init=function(ah){L.extend(true,this,ah);var aj={angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,lineWidth:this.lineWidth,depth:this.shadowDepth,closePath:true};if(this.style.indexOf("filled")!=-1){aj.fill=true}if(this.style.indexOf("ircle")!=-1){aj.isarc=true;aj.closePath=false}this.shadowRenderer.init(aj);var ai={fill:false,isarc:false,strokeStyle:this.color,fillStyle:this.color,lineWidth:this.lineWidth,closePath:true};if(this.style.indexOf("filled")!=-1){ai.fill=true}if(this.style.indexOf("ircle")!=-1){ai.isarc=true;ai.closePath=false}this.shapeRenderer.init(ai)};L.jqplot.MarkerRenderer.prototype.drawDiamond=function(aj,ai,am,al,ao){var ah=1.2;var ap=this.size/2/ah;var an=this.size/2*ah;var ak=[[aj-ap,ai],[aj,ai+an],[aj+ap,ai],[aj,ai-an]];if(this.shadow){this.shadowRenderer.draw(am,ak)}this.shapeRenderer.draw(am,ak,ao)};L.jqplot.MarkerRenderer.prototype.drawPlus=function(ak,aj,an,am,aq){var ai=1;var ar=this.size/2*ai;var ao=this.size/2*ai;var ap=[[ak,aj-ao],[ak,aj+ao]];var al=[[ak+ar,aj],[ak-ar,aj]];var ah=L.extend(true,{},this.options,{closePath:false});if(this.shadow){this.shadowRenderer.draw(an,ap,{closePath:false});this.shadowRenderer.draw(an,al,{closePath:false})}this.shapeRenderer.draw(an,ap,ah);this.shapeRenderer.draw(an,al,ah)};L.jqplot.MarkerRenderer.prototype.drawX=function(ak,aj,an,am,aq){var ai=1;var ar=this.size/2*ai;var ao=this.size/2*ai;var ah=L.extend(true,{},this.options,{closePath:false});var ap=[[ak-ar,aj-ao],[ak+ar,aj+ao]];var al=[[ak-ar,aj+ao],[ak+ar,aj-ao]];if(this.shadow){this.shadowRenderer.draw(an,ap,{closePath:false});this.shadowRenderer.draw(an,al,{closePath:false})}this.shapeRenderer.draw(an,ap,ah);this.shapeRenderer.draw(an,al,ah)};L.jqplot.MarkerRenderer.prototype.drawDash=function(aj,ai,am,al,ao){var ah=1;var ap=this.size/2*ah;var an=this.size/2*ah;var ak=[[aj-ap,ai],[aj+ap,ai]];if(this.shadow){this.shadowRenderer.draw(am,ak)}this.shapeRenderer.draw(am,ak,ao)};L.jqplot.MarkerRenderer.prototype.drawLine=function(am,al,ah,ak,ai){var aj=[am,al];if(this.shadow){this.shadowRenderer.draw(ah,aj)}this.shapeRenderer.draw(ah,aj,ai)};L.jqplot.MarkerRenderer.prototype.drawSquare=function(aj,ai,am,al,ao){var ah=1;var ap=this.size/2/ah;var an=this.size/2*ah;var ak=[[aj-ap,ai-an],[aj-ap,ai+an],[aj+ap,ai+an],[aj+ap,ai-an]];if(this.shadow){this.shadowRenderer.draw(am,ak)}this.shapeRenderer.draw(am,ak,ao)};L.jqplot.MarkerRenderer.prototype.drawCircle=function(ai,ao,ak,an,al){var ah=this.size/2;var aj=2*Math.PI;var am=[ai,ao,ah,0,aj,true];if(this.shadow){this.shadowRenderer.draw(ak,am)}this.shapeRenderer.draw(ak,am,al)};L.jqplot.MarkerRenderer.prototype.draw=function(ah,ak,ai,aj){aj=aj||{};if(aj.show==null||aj.show!=false){if(aj.color&&!aj.fillStyle){aj.fillStyle=aj.color}if(aj.color&&!aj.strokeStyle){aj.strokeStyle=aj.color}switch(this.style){case"diamond":this.drawDiamond(ah,ak,ai,false,aj);break;case"filledDiamond":this.drawDiamond(ah,ak,ai,true,aj);break;case"circle":this.drawCircle(ah,ak,ai,false,aj);break;case"filledCircle":this.drawCircle(ah,ak,ai,true,aj);break;case"square":this.drawSquare(ah,ak,ai,false,aj);break;case"filledSquare":this.drawSquare(ah,ak,ai,true,aj);break;case"x":this.drawX(ah,ak,ai,true,aj);break;case"plus":this.drawPlus(ah,ak,ai,true,aj);break;case"dash":this.drawDash(ah,ak,ai,true,aj);break;case"line":this.drawLine(ah,ak,ai,false,aj);break;default:this.drawDiamond(ah,ak,ai,false,aj);break}}};L.jqplot.ShadowRenderer=function(ah){this.angle=45;this.offset=1;this.alpha=0.07;this.lineWidth=1.5;this.lineJoin="miter";this.lineCap="round";this.closePath=false;this.fill=false;this.depth=3;this.strokeStyle="rgba(0,0,0,0.1)";this.isarc=false;L.extend(true,this,ah)};L.jqplot.ShadowRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.ShadowRenderer.prototype.draw=function(av,at,ax){av.save();var ah=(ax!=null)?ax:{};var au=(ah.fill!=null)?ah.fill:this.fill;var ap=(ah.fillRect!=null)?ah.fillRect:this.fillRect;var ao=(ah.closePath!=null)?ah.closePath:this.closePath;var al=(ah.offset!=null)?ah.offset:this.offset;var aj=(ah.alpha!=null)?ah.alpha:this.alpha;var an=(ah.depth!=null)?ah.depth:this.depth;var aw=(ah.isarc!=null)?ah.isarc:this.isarc;var aq=(ah.linePattern!=null)?ah.linePattern:this.linePattern;av.lineWidth=(ah.lineWidth!=null)?ah.lineWidth:this.lineWidth;av.lineJoin=(ah.lineJoin!=null)?ah.lineJoin:this.lineJoin;av.lineCap=(ah.lineCap!=null)?ah.lineCap:this.lineCap;av.strokeStyle=ah.strokeStyle||this.strokeStyle||"rgba(0,0,0,"+aj+")";av.fillStyle=ah.fillStyle||this.fillStyle||"rgba(0,0,0,"+aj+")";for(var ak=0;ak<an;ak++){var ar=L.jqplot.LinePattern(av,aq);av.translate(Math.cos(this.angle*Math.PI/180)*al,Math.sin(this.angle*Math.PI/180)*al);ar.beginPath();if(aw){av.arc(at[0],at[1],at[2],at[3],at[4],true)}else{if(ap){if(ap){av.fillRect(at[0],at[1],at[2],at[3])}}else{if(at&&at.length){var ai=true;for(var am=0;am<at.length;am++){if(at[am][0]!=null&&at[am][1]!=null){if(ai){ar.moveTo(at[am][0],at[am][1]);ai=false}else{ar.lineTo(at[am][0],at[am][1])}}else{ai=true}}}}}if(ao){ar.closePath()}if(au){av.fill()}else{av.stroke()}}av.restore()};L.jqplot.ShapeRenderer=function(ah){this.lineWidth=1.5;this.linePattern="solid";this.lineJoin="miter";this.lineCap="round";this.closePath=false;this.fill=false;this.isarc=false;this.fillRect=false;this.strokeRect=false;this.clearRect=false;this.strokeStyle="#999999";this.fillStyle="#999999";L.extend(true,this,ah)};L.jqplot.ShapeRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.ShapeRenderer.prototype.draw=function(at,aq,av){at.save();var ah=(av!=null)?av:{};var ar=(ah.fill!=null)?ah.fill:this.fill;var am=(ah.closePath!=null)?ah.closePath:this.closePath;var an=(ah.fillRect!=null)?ah.fillRect:this.fillRect;var ak=(ah.strokeRect!=null)?ah.strokeRect:this.strokeRect;var ai=(ah.clearRect!=null)?ah.clearRect:this.clearRect;var au=(ah.isarc!=null)?ah.isarc:this.isarc;var ao=(ah.linePattern!=null)?ah.linePattern:this.linePattern;var ap=L.jqplot.LinePattern(at,ao);at.lineWidth=ah.lineWidth||this.lineWidth;at.lineJoin=ah.lineJoin||this.lineJoin;at.lineCap=ah.lineCap||this.lineCap;at.strokeStyle=(ah.strokeStyle||ah.color)||this.strokeStyle;at.fillStyle=ah.fillStyle||this.fillStyle;at.beginPath();if(au){at.arc(aq[0],aq[1],aq[2],aq[3],aq[4],true);if(am){at.closePath()}if(ar){at.fill()}else{at.stroke()}at.restore();return}else{if(ai){at.clearRect(aq[0],aq[1],aq[2],aq[3]);at.restore();return}else{if(an||ak){if(an){at.fillRect(aq[0],aq[1],aq[2],aq[3])}if(ak){at.strokeRect(aq[0],aq[1],aq[2],aq[3]);at.restore();return}}else{if(aq&&aq.length){var aj=true;for(var al=0;al<aq.length;al++){if(aq[al][0]!=null&&aq[al][1]!=null){if(aj){ap.moveTo(aq[al][0],aq[al][1]);aj=false}else{ap.lineTo(aq[al][0],aq[al][1])}}else{aj=true}}if(am){ap.closePath()}if(ar){at.fill()}else{at.stroke()}}}}}at.restore()};L.jqplot.TableLegendRenderer=function(){};L.jqplot.TableLegendRenderer.prototype.init=function(ah){L.extend(true,this,ah)};L.jqplot.TableLegendRenderer.prototype.addrow=function(aq,ak,ah,ao){var al=(ah)?this.rowSpacing+"px":"0px";var ap;var aj;var ai;var an;var am;ai=document.createElement("tr");ap=L(ai);ap.addClass("jqplot-table-legend");ai=null;if(ao){ap.prependTo(this._elem)}else{ap.appendTo(this._elem)}if(this.showSwatches){aj=L(document.createElement("td"));aj.addClass("jqplot-table-legend jqplot-table-legend-swatch");aj.css({textAlign:"center",paddingTop:al});an=L(document.createElement("div"));an.addClass("jqplot-table-legend-swatch-outline");am=L(document.createElement("div"));am.addClass("jqplot-table-legend-swatch");am.css({backgroundColor:ak,borderColor:ak});ap.append(aj.append(an.append(am)))}if(this.showLabels){aj=L(document.createElement("td"));aj.addClass("jqplot-table-legend jqplot-table-legend-label");aj.css("paddingTop",al);ap.append(aj);if(this.escapeHtml){aj.text(aq)}else{aj.html(aq)}}aj=null;an=null;am=null;ap=null;ai=null};L.jqplot.TableLegendRenderer.prototype.draw=function(){if(this._elem){this._elem.emptyForce();this._elem=null}if(this.show){var am=this._series;var ai=document.createElement("table");this._elem=L(ai);this._elem.addClass("jqplot-table-legend");var ar={position:"absolute"};if(this.background){ar.background=this.background}if(this.border){ar.border=this.border}if(this.fontSize){ar.fontSize=this.fontSize}if(this.fontFamily){ar.fontFamily=this.fontFamily}if(this.textColor){ar.textColor=this.textColor}if(this.marginTop!=null){ar.marginTop=this.marginTop}if(this.marginBottom!=null){ar.marginBottom=this.marginBottom}if(this.marginLeft!=null){ar.marginLeft=this.marginLeft}if(this.marginRight!=null){ar.marginRight=this.marginRight}var ah=false,ao=false,aq;for(var an=0;an<am.length;an++){aq=am[an];if(aq._stack||aq.renderer.constructor==L.jqplot.BezierCurveRenderer){ao=true}if(aq.show&&aq.showLabel){var al=this.labels[an]||aq.label.toString();if(al){var aj=aq.color;if(ao&&an<am.length-1){ah=true}else{if(ao&&an==am.length-1){ah=false}}this.renderer.addrow.call(this,al,aj,ah,ao);ah=true}for(var ak=0;ak<L.jqplot.addLegendRowHooks.length;ak++){var ap=L.jqplot.addLegendRowHooks[ak].call(this,aq);if(ap){this.renderer.addrow.call(this,ap.label,ap.color,ah);ah=true}}al=null}}}return this._elem};L.jqplot.TableLegendRenderer.prototype.pack=function(aj){if(this.show){if(this.placement=="insideGrid"){switch(this.location){case"nw":var ai=aj.left;var ah=aj.top;this._elem.css("left",ai);this._elem.css("top",ah);break;case"n":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=aj.top;this._elem.css("left",ai);this._elem.css("top",ah);break;case"ne":var ai=aj.right;var ah=aj.top;this._elem.css({right:ai,top:ah});break;case"e":var ai=aj.right;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({right:ai,top:ah});break;case"se":var ai=aj.right;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break;case"s":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=aj.bottom;this._elem.css({left:ai,bottom:ah});break;case"sw":var ai=aj.left;var ah=aj.bottom;this._elem.css({left:ai,bottom:ah});break;case"w":var ai=aj.left;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({left:ai,top:ah});break;default:var ai=aj.right;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break}}else{if(this.placement=="outside"){switch(this.location){case"nw":var ai=this._plotDimensions.width-aj.left;var ah=aj.top;this._elem.css("right",ai);this._elem.css("top",ah);break;case"n":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=this._plotDimensions.height-aj.top;this._elem.css("left",ai);this._elem.css("bottom",ah);break;case"ne":var ai=this._plotDimensions.width-aj.right;var ah=aj.top;this._elem.css({left:ai,top:ah});break;case"e":var ai=this._plotDimensions.width-aj.right;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({left:ai,top:ah});break;case"se":var ai=this._plotDimensions.width-aj.right;var ah=aj.bottom;this._elem.css({left:ai,bottom:ah});break;case"s":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;var ah=this._plotDimensions.height-aj.bottom;this._elem.css({left:ai,top:ah});break;case"sw":var ai=this._plotDimensions.width-aj.left;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break;case"w":var ai=this._plotDimensions.width-aj.left;var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({right:ai,top:ah});break;default:var ai=aj.right;var ah=aj.bottom;this._elem.css({right:ai,bottom:ah});break}}else{switch(this.location){case"nw":this._elem.css({left:0,top:aj.top});break;case"n":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;this._elem.css({left:ai,top:aj.top});break;case"ne":this._elem.css({right:0,top:aj.top});break;case"e":var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({right:aj.right,top:ah});break;case"se":this._elem.css({right:aj.right,bottom:aj.bottom});break;case"s":var ai=(aj.left+(this._plotDimensions.width-aj.right))/2-this.getWidth()/2;this._elem.css({left:ai,bottom:aj.bottom});break;case"sw":this._elem.css({left:aj.left,bottom:aj.bottom});break;case"w":var ah=(aj.top+(this._plotDimensions.height-aj.bottom))/2-this.getHeight()/2;this._elem.css({left:aj.left,top:ah});break;default:this._elem.css({right:aj.right,bottom:aj.bottom});break}}}}};L.jqplot.ThemeEngine=function(){this.themes={};this.activeTheme=null};L.jqplot.ThemeEngine.prototype.init=function(){var ak=new L.jqplot.Theme({_name:"Default"});var an,ai,am;for(an in ak.target){if(an=="textColor"){ak.target[an]=this.target.css("color")}else{ak.target[an]=this.target.css(an)}}if(this.title.show&&this.title._elem){for(an in ak.title){if(an=="textColor"){ak.title[an]=this.title._elem.css("color")}else{ak.title[an]=this.title._elem.css(an)}}}for(an in ak.grid){ak.grid[an]=this.grid[an]}if(ak.grid.backgroundColor==null&&this.grid.background!=null){ak.grid.backgroundColor=this.grid.background}if(this.legend.show&&this.legend._elem){for(an in ak.legend){if(an=="textColor"){ak.legend[an]=this.legend._elem.css("color")}else{ak.legend[an]=this.legend._elem.css(an)}}}var aj;for(ai=0;ai<this.series.length;ai++){aj=this.series[ai];if(aj.renderer.constructor==L.jqplot.LineRenderer){ak.series.push(new p())}else{if(aj.renderer.constructor==L.jqplot.BarRenderer){ak.series.push(new T())}else{if(aj.renderer.constructor==L.jqplot.PieRenderer){ak.series.push(new f())}else{if(aj.renderer.constructor==L.jqplot.DonutRenderer){ak.series.push(new G())}else{if(aj.renderer.constructor==L.jqplot.FunnelRenderer){ak.series.push(new Z())}else{if(aj.renderer.constructor==L.jqplot.MeterGaugeRenderer){ak.series.push(new D())}else{ak.series.push({})}}}}}}for(an in ak.series[ai]){ak.series[ai][an]=aj[an]}}var ah,al;for(an in this.axes){al=this.axes[an];ah=ak.axes[an]=new P();ah.borderColor=al.borderColor;ah.borderWidth=al.borderWidth;if(al._ticks&&al._ticks[0]){for(am in ah.ticks){if(al._ticks[0].hasOwnProperty(am)){ah.ticks[am]=al._ticks[0][am]}else{if(al._ticks[0]._elem){ah.ticks[am]=al._ticks[0]._elem.css(am)}}}}if(al._label&&al._label.show){for(am in ah.label){if(al._label[am]){ah.label[am]=al._label[am]}else{if(al._label._elem){if(am=="textColor"){ah.label[am]=al._label._elem.css("color")}else{ah.label[am]=al._label._elem.css(am)}}}}}}this.themeEngine._add(ak);this.themeEngine.activeTheme=this.themeEngine.themes[ak._name]};L.jqplot.ThemeEngine.prototype.get=function(ah){if(!ah){return this.activeTheme}else{return this.themes[ah]}};function O(ai,ah){return ai-ah}L.jqplot.ThemeEngine.prototype.getThemeNames=function(){var ah=[];for(var ai in this.themes){ah.push(ai)}return ah.sort(O)};L.jqplot.ThemeEngine.prototype.getThemes=function(){var ai=[];var ah=[];for(var ak in this.themes){ai.push(ak)}ai.sort(O);for(var aj=0;aj<ai.length;aj++){ah.push(this.themes[ai[aj]])}return ah};L.jqplot.ThemeEngine.prototype.activate=function(av,aB){var ah=false;if(!aB&&this.activeTheme&&this.activeTheme._name){aB=this.activeTheme._name}if(!this.themes.hasOwnProperty(aB)){throw new Error("No theme of that name")}else{var am=this.themes[aB];this.activeTheme=am;var aA,at=false,ar=false;var ai=["xaxis","x2axis","yaxis","y2axis"];for(aw=0;aw<ai.length;aw++){var an=ai[aw];if(am.axesStyles.borderColor!=null){av.axes[an].borderColor=am.axesStyles.borderColor}if(am.axesStyles.borderWidth!=null){av.axes[an].borderWidth=am.axesStyles.borderWidth}}for(var az in av.axes){var ak=av.axes[az];if(ak.show){var aq=am.axes[az]||{};var ao=am.axesStyles;var al=L.jqplot.extend(true,{},aq,ao);aA=(am.axesStyles.borderColor!=null)?am.axesStyles.borderColor:al.borderColor;if(al.borderColor!=null){ak.borderColor=al.borderColor;ah=true}aA=(am.axesStyles.borderWidth!=null)?am.axesStyles.borderWidth:al.borderWidth;if(al.borderWidth!=null){ak.borderWidth=al.borderWidth;ah=true}if(ak._ticks&&ak._ticks[0]){for(var aj in al.ticks){aA=al.ticks[aj];if(aA!=null){ak.tickOptions[aj]=aA;ak._ticks=[];ah=true}}}if(ak._label&&ak._label.show){for(var aj in al.label){aA=al.label[aj];if(aA!=null){ak.labelOptions[aj]=aA;ah=true}}}}}for(var au in am.grid){if(am.grid[au]!=null){av.grid[au]=am.grid[au]}}if(!ah){av.grid.draw()}if(av.legend.show){for(au in am.legend){if(am.legend[au]!=null){av.legend[au]=am.legend[au]}}}if(av.title.show){for(au in am.title){if(am.title[au]!=null){av.title[au]=am.title[au]}}}var aw;for(aw=0;aw<am.series.length;aw++){var ap={};var ay=false;for(au in am.series[aw]){aA=(am.seriesStyles[au]!=null)?am.seriesStyles[au]:am.series[aw][au];if(aA!=null){ap[au]=aA;if(au=="color"){av.series[aw].renderer.shapeRenderer.fillStyle=aA;av.series[aw].renderer.shapeRenderer.strokeStyle=aA;av.series[aw][au]=aA}else{if((au=="lineWidth")||(au=="linePattern")){av.series[aw].renderer.shapeRenderer[au]=aA;av.series[aw][au]=aA}else{if(au=="markerOptions"){V(av.series[aw].markerOptions,aA);V(av.series[aw].markerRenderer,aA)}else{av.series[aw][au]=aA}}}ah=true}}}if(ah){av.target.empty();av.draw()}for(au in am.target){if(am.target[au]!=null){av.target.css(au,am.target[au])}}}};L.jqplot.ThemeEngine.prototype._add=function(ai,ah){if(ah){ai._name=ah}if(!ai._name){ai._name=Date.parse(new Date())}if(!this.themes.hasOwnProperty(ai._name)){this.themes[ai._name]=ai}else{throw new Error("jqplot.ThemeEngine Error: Theme already in use")}};L.jqplot.ThemeEngine.prototype.remove=function(ah){if(ah=="Default"){return false}return delete this.themes[ah]};L.jqplot.ThemeEngine.prototype.newTheme=function(ah,aj){if(typeof(ah)=="object"){aj=aj||ah;ah=null}if(aj&&aj._name){ah=aj._name}else{ah=ah||Date.parse(new Date())}var ai=this.copy(this.themes.Default._name,ah);L.jqplot.extend(ai,aj);return ai};function B(aj){if(aj==null||typeof(aj)!="object"){return aj}var ah=new aj.constructor();for(var ai in aj){ah[ai]=B(aj[ai])}return ah}L.jqplot.clone=B;function V(aj,ai){if(ai==null||typeof(ai)!="object"){return}for(var ah in ai){if(ah=="highlightColors"){aj[ah]=B(ai[ah])}if(ai[ah]!=null&&typeof(ai[ah])=="object"){if(!aj.hasOwnProperty(ah)){aj[ah]={}}V(aj[ah],ai[ah])}else{aj[ah]=ai[ah]}}}L.jqplot.merge=V;L.jqplot.extend=function(){var am=arguments[0]||{},ak=1,al=arguments.length,ah=false,aj;if(typeof am==="boolean"){ah=am;am=arguments[1]||{};ak=2}if(typeof am!=="object"&&!toString.call(am)==="[object Function]"){am={}}for(;ak<al;ak++){if((aj=arguments[ak])!=null){for(var ai in aj){var an=am[ai],ao=aj[ai];if(am===ao){continue}if(ah&&ao&&typeof ao==="object"&&!ao.nodeType){am[ai]=L.jqplot.extend(ah,an||(ao.length!=null?[]:{}),ao)}else{if(ao!==u){am[ai]=ao}}}}}return am};L.jqplot.ThemeEngine.prototype.rename=function(ai,ah){if(ai=="Default"||ah=="Default"){throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default")}if(this.themes.hasOwnProperty(ah)){throw new Error("jqplot.ThemeEngine Error: New name already in use.")}else{if(this.themes.hasOwnProperty(ai)){var aj=this.copy(ai,ah);this.remove(ai);return aj}}throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")};L.jqplot.ThemeEngine.prototype.copy=function(ah,aj,al){if(aj=="Default"){throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme")}if(!this.themes.hasOwnProperty(ah)){var ai="jqplot.ThemeEngine Error: Source name invalid";throw new Error(ai)}if(this.themes.hasOwnProperty(aj)){var ai="jqplot.ThemeEngine Error: Target name invalid";throw new Error(ai)}else{var ak=B(this.themes[ah]);ak._name=aj;L.jqplot.extend(true,ak,al);this._add(ak);return ak}};L.jqplot.Theme=function(ah,ai){if(typeof(ah)=="object"){ai=ai||ah;ah=null}ah=ah||Date.parse(new Date());this._name=ah;this.target={backgroundColor:null};this.legend={textColor:null,fontFamily:null,fontSize:null,border:null,background:null};this.title={textColor:null,fontFamily:null,fontSize:null,textAlign:null};this.seriesStyles={};this.series=[];this.grid={drawGridlines:null,gridLineColor:null,gridLineWidth:null,backgroundColor:null,borderColor:null,borderWidth:null,shadow:null};this.axesStyles={label:{},ticks:{}};this.axes={};if(typeof(ai)=="string"){this._name=ai}else{if(typeof(ai)=="object"){L.jqplot.extend(true,this,ai)}}};var P=function(){this.borderColor=null;this.borderWidth=null;this.ticks=new o();this.label=new t()};var o=function(){this.show=null;this.showGridline=null;this.showLabel=null;this.showMark=null;this.size=null;this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null};var t=function(){this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null;this.fontWeight=null};var p=function(){this.color=null;this.lineWidth=null;this.linePattern=null;this.shadow=null;this.fillColor=null;this.showMarker=null;this.markerOptions=new I()};var I=function(){this.show=null;this.style=null;this.lineWidth=null;this.size=null;this.color=null;this.shadow=null};var T=function(){this.color=null;this.seriesColors=null;this.lineWidth=null;this.shadow=null;this.barPadding=null;this.barMargin=null;this.barWidth=null;this.highlightColors=null};var f=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.highlightColors=null};var G=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.innerDiameter=null;this.thickness=null;this.ringMargin=null;this.highlightColors=null};var Z=function(){this.color=null;this.lineWidth=null;this.shadow=null;this.padding=null;this.sectionMargin=null;this.seriesColors=null;this.highlightColors=null};var D=function(){this.padding=null;this.backgroundColor=null;this.ringColor=null;this.tickColor=null;this.ringWidth=null;this.intervalColors=null;this.intervalInnerRadius=null;this.intervalOuterRadius=null;this.hubRadius=null;this.needleThickness=null;this.needlePad=null};L.fn.jqplotChildText=function(){return L(this).contents().filter(function(){return this.nodeType==3}).text()};L.fn.jqplotGetComputedFontStyle=function(){var ak=window.getComputedStyle?window.getComputedStyle(this[0],""):this[0].currentStyle;var ai=ak["font-style"]?["font-style","font-weight","font-size","font-family"]:["fontStyle","fontWeight","fontSize","fontFamily"];var al=[];for(var aj=0;aj<ai.length;++aj){var ah=String(ak[ai[aj]]);if(ah&&ah!="normal"){al.push(ah)}}return al.join(" ")};L.fn.jqplotToImageCanvas=function(aj){aj=aj||{};var av=(aj.x_offset==null)?0:aj.x_offset;var ax=(aj.y_offset==null)?0:aj.y_offset;var al=(aj.backgroundColor==null)?"rgb(255,255,255)":aj.backgroundColor;if(L(this).width()==0||L(this).height()==0){return null}if(L.jqplot.use_excanvas){return null}var an=document.createElement("canvas");var aA=L(this).outerHeight(true);var at=L(this).outerWidth(true);var am=L(this).offset();var ao=am.left;var aq=am.top;var au=0,ar=0;var ay=["jqplot-table-legend","jqplot-xaxis-tick","jqplot-x2axis-tick","jqplot-yaxis-tick","jqplot-y2axis-tick","jqplot-y3axis-tick","jqplot-y4axis-tick","jqplot-y5axis-tick","jqplot-y6axis-tick","jqplot-y7axis-tick","jqplot-y8axis-tick","jqplot-y9axis-tick","jqplot-xaxis-label","jqplot-x2axis-label","jqplot-yaxis-label","jqplot-y2axis-label","jqplot-y3axis-label","jqplot-y4axis-label","jqplot-y5axis-label","jqplot-y6axis-label","jqplot-y7axis-label","jqplot-y8axis-label","jqplot-y9axis-label"];var ap,ah,ai,aB;for(var az=0;az<ay.length;az++){L(this).find("."+ay[az]).each(function(){ap=L(this).offset().top-aq;ah=L(this).offset().left-ao;aB=ah+L(this).outerWidth(true)+au;ai=ap+L(this).outerHeight(true)+ar;if(ah<-au){at=at-au-ah;au=-ah}if(ap<-ar){aA=aA-ar-ap;ar=-ap}if(aB>at){at=aB}if(ai>aA){aA=ai}})}an.width=at+Number(av);an.height=aA+Number(ax);var ak=an.getContext("2d");ak.save();ak.fillStyle=al;ak.fillRect(0,0,an.width,an.height);ak.restore();ak.translate(au,ar);ak.textAlign="left";ak.textBaseline="top";function aC(aE){var aF=parseInt(L(aE).css("line-height"),10);if(isNaN(aF)){aF=parseInt(L(aE).css("font-size"),10)*1.2}return aF}function aD(aF,aE,aS,aG,aO,aH){var aQ=aC(aF);var aK=L(aF).innerWidth();var aL=L(aF).innerHeight();var aN=aS.split(/\s+/);var aR=aN.length;var aP="";var aM=[];var aU=aO;var aT=aG;for(var aJ=0;aJ<aR;aJ++){aP+=aN[aJ];if(aE.measureText(aP).width>aK){aM.push(aJ);aP="";aJ--}}if(aM.length===0){if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aS,aT,aO)}else{aP=aN.slice(0,aM[0]).join(" ");if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aP,aT,aU);aU+=aQ;for(var aJ=1,aI=aM.length;aJ<aI;aJ++){aP=aN.slice(aM[aJ-1],aM[aJ]).join(" ");if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aP,aT,aU);aU+=aQ}aP=aN.slice(aM[aJ-1],aN.length).join(" ");if(L(aF).css("textAlign")==="center"){aT=aG+(aH-aE.measureText(aP).width)/2-au}aE.fillText(aP,aT,aU)}}function aw(aG,aJ,aE){var aN=aG.tagName.toLowerCase();var aF=L(aG).position();var aK=window.getComputedStyle?window.getComputedStyle(aG,""):aG.currentStyle;var aI=aJ+aF.left+parseInt(aK.marginLeft,10)+parseInt(aK.borderLeftWidth,10)+parseInt(aK.paddingLeft,10);var aL=aE+aF.top+parseInt(aK.marginTop,10)+parseInt(aK.borderTopWidth,10)+parseInt(aK.paddingTop,10);var aM=an.width;if((aN=="div"||aN=="span")&&!L(aG).hasClass("jqplot-highlighter-tooltip")){L(aG).children().each(function(){aw(this,aI,aL)});var aO=L(aG).jqplotChildText();if(aO){ak.font=L(aG).jqplotGetComputedFontStyle();ak.fillStyle=L(aG).css("color");aD(aG,ak,aO,aI,aL,aM)}}else{if(aN==="table"&&L(aG).hasClass("jqplot-table-legend")){ak.strokeStyle=L(aG).css("border-top-color");ak.fillStyle=L(aG).css("background-color");ak.fillRect(aI,aL,L(aG).innerWidth(),L(aG).innerHeight());if(parseInt(L(aG).css("border-top-width"),10)>0){ak.strokeRect(aI,aL,L(aG).innerWidth(),L(aG).innerHeight())}L(aG).find("div.jqplot-table-legend-swatch-outline").each(function(){var aU=L(this);ak.strokeStyle=aU.css("border-top-color");var aQ=aI+aU.position().left;var aR=aL+aU.position().top;ak.strokeRect(aQ,aR,aU.innerWidth(),aU.innerHeight());aQ+=parseInt(aU.css("padding-left"),10);aR+=parseInt(aU.css("padding-top"),10);var aT=aU.innerHeight()-2*parseInt(aU.css("padding-top"),10);var aP=aU.innerWidth()-2*parseInt(aU.css("padding-left"),10);var aS=aU.children("div.jqplot-table-legend-swatch");ak.fillStyle=aS.css("background-color");ak.fillRect(aQ,aR,aP,aT)});L(aG).find("td.jqplot-table-legend-label").each(function(){var aR=L(this);var aP=aI+aR.position().left;var aQ=aL+aR.position().top+parseInt(aR.css("padding-top"),10);ak.font=aR.jqplotGetComputedFontStyle();ak.fillStyle=aR.css("color");aD(aR,ak,aR.text(),aP,aQ,aM)});var aH=null}else{if(aN=="canvas"){ak.drawImage(aG,aI,aL)}}}}L(this).children().each(function(){aw(this,av,ax)});return an};L.fn.jqplotToImageStr=function(ai){var ah=L(this).jqplotToImageCanvas(ai);if(ah){return ah.toDataURL("image/png")}else{return null}};L.fn.jqplotToImageElem=function(ah){var ai=document.createElement("img");var aj=L(this).jqplotToImageStr(ah);ai.src=aj;return ai};L.fn.jqplotToImageElemStr=function(ah){var ai="<img src="+L(this).jqplotToImageStr(ah)+" />";return ai};L.fn.jqplotSaveImage=function(){var ah=L(this).jqplotToImageStr({});if(ah){window.location.href=ah.replace("image/png","image/octet-stream")}};L.fn.jqplotViewImage=function(){var ai=L(this).jqplotToImageElemStr({});var aj=L(this).jqplotToImageStr({});if(ai){var ah=window.open("");ah.document.open("image/png");ah.document.write(ai);ah.document.close();ah=null}};var ag=function(){this.syntax=ag.config.syntax;this._type="jsDate";this.proxy=new Date();this.options={};this.locale=ag.regional.getLocale();this.formatString="";this.defaultCentury=ag.config.defaultCentury;switch(arguments.length){case 0:break;case 1:if(l(arguments[0])=="[object Object]"&&arguments[0]._type!="jsDate"){var aj=this.options=arguments[0];this.syntax=aj.syntax||this.syntax;this.defaultCentury=aj.defaultCentury||this.defaultCentury;this.proxy=ag.createDate(aj.date)}else{this.proxy=ag.createDate(arguments[0])}break;default:var ah=[];for(var ai=0;ai<arguments.length;ai++){ah.push(arguments[ai])}this.proxy=new Date();this.proxy.setFullYear.apply(this.proxy,ah.slice(0,3));if(ah.slice(3).length){this.proxy.setHours.apply(this.proxy,ah.slice(3))}break}};ag.config={defaultLocale:"en",syntax:"perl",defaultCentury:1900};ag.prototype.add=function(aj,ai){var ah=E[ai]||E.day;if(typeof ah=="number"){this.proxy.setTime(this.proxy.getTime()+(ah*aj))}else{ah.add(this,aj)}return this};ag.prototype.clone=function(){return new ag(this.proxy.getTime())};ag.prototype.getUtcOffset=function(){return this.proxy.getTimezoneOffset()*60000};ag.prototype.diff=function(ai,al,ah){ai=new ag(ai);if(ai===null){return null}var aj=E[al]||E.day;if(typeof aj=="number"){var ak=(this.proxy.getTime()-ai.proxy.getTime())/aj}else{var ak=aj.diff(this.proxy,ai.proxy)}return(ah?ak:Math[ak>0?"floor":"ceil"](ak))};ag.prototype.getAbbrDayName=function(){return ag.regional[this.locale]["dayNamesShort"][this.proxy.getDay()]};ag.prototype.getAbbrMonthName=function(){return ag.regional[this.locale]["monthNamesShort"][this.proxy.getMonth()]};ag.prototype.getAMPM=function(){return this.proxy.getHours()>=12?"PM":"AM"};ag.prototype.getAmPm=function(){return this.proxy.getHours()>=12?"pm":"am"};ag.prototype.getCentury=function(){return parseInt(this.proxy.getFullYear()/100,10)};ag.prototype.getDate=function(){return this.proxy.getDate()};ag.prototype.getDay=function(){return this.proxy.getDay()};ag.prototype.getDayOfWeek=function(){var ah=this.proxy.getDay();return ah===0?7:ah};ag.prototype.getDayOfYear=function(){var ai=this.proxy;var ah=ai-new Date(""+ai.getFullYear()+"/1/1 GMT");ah+=ai.getTimezoneOffset()*60000;ai=null;return parseInt(ah/60000/60/24,10)+1};ag.prototype.getDayName=function(){return ag.regional[this.locale]["dayNames"][this.proxy.getDay()]};ag.prototype.getFullWeekOfYear=function(){var ak=this.proxy;var ah=this.getDayOfYear();var aj=6-ak.getDay();var ai=parseInt((ah+aj)/7,10);return ai};ag.prototype.getFullYear=function(){return this.proxy.getFullYear()};ag.prototype.getGmtOffset=function(){var ah=this.proxy.getTimezoneOffset()/60;var ai=ah<0?"+":"-";ah=Math.abs(ah);return ai+N(Math.floor(ah),2)+":"+N((ah%1)*60,2)};ag.prototype.getHours=function(){return this.proxy.getHours()};ag.prototype.getHours12=function(){var ah=this.proxy.getHours();return ah>12?ah-12:(ah==0?12:ah)};ag.prototype.getIsoWeek=function(){var ak=this.proxy;var aj=this.getWeekOfYear();var ah=(new Date(""+ak.getFullYear()+"/1/1")).getDay();var ai=aj+(ah>4||ah<=1?0:1);if(ai==53&&(new Date(""+ak.getFullYear()+"/12/31")).getDay()<4){ai=1}else{if(ai===0){ak=new ag(new Date(""+(ak.getFullYear()-1)+"/12/31"));ai=ak.getIsoWeek()}}ak=null;return ai};ag.prototype.getMilliseconds=function(){return this.proxy.getMilliseconds()};ag.prototype.getMinutes=function(){return this.proxy.getMinutes()};ag.prototype.getMonth=function(){return this.proxy.getMonth()};ag.prototype.getMonthName=function(){return ag.regional[this.locale]["monthNames"][this.proxy.getMonth()]};ag.prototype.getMonthNumber=function(){return this.proxy.getMonth()+1};ag.prototype.getSeconds=function(){return this.proxy.getSeconds()};ag.prototype.getShortYear=function(){return this.proxy.getYear()%100};ag.prototype.getTime=function(){return this.proxy.getTime()};ag.prototype.getTimezoneAbbr=function(){return this.proxy.toString().replace(/^.*\(([^)]+)\)$/,"$1")};ag.prototype.getTimezoneName=function(){var ah=/(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());return ah[1]||ah[2]||"GMT"+this.getGmtOffset()};ag.prototype.getTimezoneOffset=function(){return this.proxy.getTimezoneOffset()};ag.prototype.getWeekOfYear=function(){var ah=this.getDayOfYear();var aj=7-this.getDayOfWeek();var ai=parseInt((ah+aj)/7,10);return ai};ag.prototype.getUnix=function(){return Math.round(this.proxy.getTime()/1000,0)};ag.prototype.getYear=function(){return this.proxy.getYear()};ag.prototype.next=function(ah){ah=ah||"day";return this.clone().add(1,ah)};ag.prototype.set=function(){switch(arguments.length){case 0:this.proxy=new Date();break;case 1:if(l(arguments[0])=="[object Object]"&&arguments[0]._type!="jsDate"){var aj=this.options=arguments[0];this.syntax=aj.syntax||this.syntax;this.defaultCentury=aj.defaultCentury||this.defaultCentury;this.proxy=ag.createDate(aj.date)}else{this.proxy=ag.createDate(arguments[0])}break;default:var ah=[];for(var ai=0;ai<arguments.length;ai++){ah.push(arguments[ai])}this.proxy=new Date();this.proxy.setFullYear.apply(this.proxy,ah.slice(0,3));if(ah.slice(3).length){this.proxy.setHours.apply(this.proxy,ah.slice(3))}break}return this};ag.prototype.setDate=function(ah){this.proxy.setDate(ah);return this};ag.prototype.setFullYear=function(){this.proxy.setFullYear.apply(this.proxy,arguments);return this};ag.prototype.setHours=function(){this.proxy.setHours.apply(this.proxy,arguments);return this};ag.prototype.setMilliseconds=function(ah){this.proxy.setMilliseconds(ah);return this};ag.prototype.setMinutes=function(){this.proxy.setMinutes.apply(this.proxy,arguments);return this};ag.prototype.setMonth=function(){this.proxy.setMonth.apply(this.proxy,arguments);return this};ag.prototype.setSeconds=function(){this.proxy.setSeconds.apply(this.proxy,arguments);return this};ag.prototype.setTime=function(ah){this.proxy.setTime(ah);return this};ag.prototype.setYear=function(){this.proxy.setYear.apply(this.proxy,arguments);return this};ag.prototype.strftime=function(ah){ah=ah||this.formatString||ag.regional[this.locale]["formatString"];return ag.strftime(this,ah,this.syntax)};ag.prototype.toString=function(){return this.proxy.toString()};ag.prototype.toYmdInt=function(){return(this.proxy.getFullYear()*10000)+(this.getMonthNumber()*100)+this.proxy.getDate()};ag.regional={en:{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],formatString:"%Y-%m-%d %H:%M:%S"},fr:{monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthNamesShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],dayNamesShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],formatString:"%Y-%m-%d %H:%M:%S"},de:{monthNames:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],formatString:"%Y-%m-%d %H:%M:%S"},es:{monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthNamesShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],dayNames:["Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"],dayNamesShort:["Dom","Lun","Mar","Mi&eacute;","Juv","Vie","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},ru:{monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthNamesShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],dayNames:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],dayNamesShort:["вск","пнд","втр","срд","чтв","птн","сбт"],formatString:"%Y-%m-%d %H:%M:%S"},ar:{monthNames:["كانون الثاني","شباط","آذار","نيسان","آذار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],monthNamesShort:["1","2","3","4","5","6","7","8","9","10","11","12"],dayNames:["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"],dayNamesShort:["سبت","أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة"],formatString:"%Y-%m-%d %H:%M:%S"},pt:{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},"pt-BR":{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},pl:{monthNames:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthNamesShort:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],dayNames:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],dayNamesShort:["Ni","Pn","Wt","Śr","Cz","Pt","Sb"],formatString:"%Y-%m-%d %H:%M:%S"},nl:{monthNames:["Januari","Februari","Maart","April","Mei","Juni","July","Augustus","September","Oktober","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],dayNames:","["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"],dayNamesShort:["Zo","Ma","Di","Wo","Do","Vr","Za"],formatString:"%Y-%m-%d %H:%M:%S"},sv:{monthNames:["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],monthNamesShort:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],dayNames:["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],dayNamesShort:["sön","mån","tis","ons","tor","fre","lör"],formatString:"%Y-%m-%d %H:%M:%S"}};ag.regional["en-US"]=ag.regional["en-GB"]=ag.regional.en;ag.regional.getLocale=function(){var ah=ag.config.defaultLocale;if(document&&document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){ah=document.getElementsByTagName("html")[0].lang;if(!ag.regional.hasOwnProperty(ah)){ah=ag.config.defaultLocale}}return ah};var C=24*60*60*1000;var N=function(ah,ak){ah=String(ah);var ai=ak-ah.length;var aj=String(Math.pow(10,ai)).slice(1);return aj.concat(ah)};var E={millisecond:1,second:1000,minute:60*1000,hour:60*60*1000,day:C,week:7*C,month:{add:function(aj,ah){E.year.add(aj,Math[ah>0?"floor":"ceil"](ah/12));var ai=aj.getMonth()+(ah%12);if(ai==12){ai=0;aj.setYear(aj.getFullYear()+1)}else{if(ai==-1){ai=11;aj.setYear(aj.getFullYear()-1)}}aj.setMonth(ai)},diff:function(al,aj){var ah=al.getFullYear()-aj.getFullYear();var ai=al.getMonth()-aj.getMonth()+(ah*12);var ak=al.getDate()-aj.getDate();return ai+(ak/30)}},year:{add:function(ai,ah){ai.setYear(ai.getFullYear()+Math[ah>0?"floor":"ceil"](ah))},diff:function(ai,ah){return E.month.diff(ai,ah)/12}}};for(var Y in E){if(Y.substring(Y.length-1)!="s"){E[Y+"s"]=E[Y]}}var H=function(al,ak,ai){if(ag.formats[ai]["shortcuts"][ak]){return ag.strftime(al,ag.formats[ai]["shortcuts"][ak],ai)}else{var ah=(ag.formats[ai]["codes"][ak]||"").split(".");var aj=al["get"+ah[0]]?al["get"+ah[0]]():"";if(ah[1]){aj=N(aj,ah[1])}return aj}};ag.strftime=function(an,ak,aj,ao){var ai="perl";var am=ag.regional.getLocale();if(aj&&ag.formats.hasOwnProperty(aj)){ai=aj}else{if(aj&&ag.regional.hasOwnProperty(aj)){am=aj}}if(ao&&ag.formats.hasOwnProperty(ao)){ai=ao}else{if(ao&&ag.regional.hasOwnProperty(ao)){am=ao}}if(l(an)!="[object Object]"||an._type!="jsDate"){an=new ag(an);an.locale=am}if(!ak){ak=an.formatString||ag.regional[am]["formatString"]}var ah=ak||"%Y-%m-%d",ap="",al;while(ah.length>0){if(al=ah.match(ag.formats[ai].codes.matcher)){ap+=ah.slice(0,al.index);ap+=(al[1]||"")+H(an,al[2],ai);ah=ah.slice(al.index+al[0].length)}else{ap+=ah;ah=""}}return ap};ag.formats={ISO:"%Y-%m-%dT%H:%M:%S.%N%G",SQL:"%Y-%m-%d %H:%M:%S"};ag.formats.perl={codes:{matcher:/()%(#?(%|[a-z]))/i,Y:"FullYear",y:"ShortYear.2",m:"MonthNumber.2","#m":"MonthNumber",B:"MonthName",b:"AbbrMonthName",d:"Date.2","#d":"Date",e:"Date",A:"DayName",a:"AbbrDayName",w:"Day",H:"Hours.2","#H":"Hours",I:"Hours12.2","#I":"Hours12",p:"AMPM",M:"Minutes.2","#M":"Minutes",S:"Seconds.2","#S":"Seconds",s:"Unix",N:"Milliseconds.3","#N":"Milliseconds",O:"TimezoneOffset",Z:"TimezoneName",G:"GmtOffset"},shortcuts:{F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",D:"%m/%d/%y","#c":"%a %b %e %H:%M:%S %Y",v:"%e-%b-%Y",R:"%H:%M",r:"%I:%M:%S %p",t:"\t",n:"\n","%":"%"}};ag.formats.php={codes:{matcher:/()%((%|[a-z]))/i,a:"AbbrDayName",A:"DayName",d:"Date.2",e:"Date",j:"DayOfYear.3",u:"DayOfWeek",w:"Day",U:"FullWeekOfYear.2",V:"IsoWeek.2",W:"WeekOfYear.2",b:"AbbrMonthName",B:"MonthName",m:"MonthNumber.2",h:"AbbrMonthName",C:"Century.2",y:"ShortYear.2",Y:"FullYear",H:"Hours.2",I:"Hours12.2",l:"Hours12",p:"AMPM",P:"AmPm",M:"Minutes.2",S:"Seconds.2",s:"Unix",O:"TimezoneOffset",z:"GmtOffset",Z:"TimezoneAbbr"},shortcuts:{D:"%m/%d/%y",F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",R:"%H:%M",r:"%I:%M:%S %p",t:"\t",n:"\n","%":"%"}};ag.createDate=function(aj){if(aj==null){return new Date()}if(aj instanceof Date){return aj}if(typeof aj=="number"){return new Date(aj)}var ao=String(aj).replace(/^\s*(.+)\s*$/g,"$1");ao=ao.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/,"$1/$2/$3");ao=ao.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i,"$1 $2 $3");var an=ao.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);if(an&&an.length>3){var at=parseFloat(an[3]);var am=ag.config.defaultCentury+at;am=String(am);ao=ao.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i,an[1]+" "+an[2]+" "+am)}an=ao.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/);function ar(ax,aw){var aC=parseFloat(aw[1]);var aB=parseFloat(aw[2]);var aA=parseFloat(aw[3]);var az=ag.config.defaultCentury;var av,au,aD,ay;if(aC>31){au=aA;aD=aB;av=az+aC}else{au=aB;aD=aC;av=az+aA}ay=aD+"/"+au+"/"+av;return ax.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/,ay)}if(an&&an.length>3){ao=ar(ao,an)}var an=ao.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);if(an&&an.length>3){ao=ar(ao,an)}var al=0;var ai=ag.matchers.length;var aq,ah,ap=ao,ak;while(al<ai){ah=Date.parse(ap);if(!isNaN(ah)){return new Date(ah)}aq=ag.matchers[al];if(typeof aq=="function"){ak=aq.call(ag,ap);if(ak instanceof Date){return ak}}else{ap=ao.replace(aq[0],aq[1])}al++}return NaN};ag.daysInMonth=function(ah,ai){if(ai==2){return new Date(ah,1,29).getDate()==29?29:28}return[u,31,u,31,30,31,30,31,31,30,31,30,31][ai]};ag.matchers=[[/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/,"$2/$1/$3"],[/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/,"$2/$3/$1"],function(ak){var ai=ak.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);if(ai){if(ai[1]){var aj=this.createDate(ai[1]);if(isNaN(aj)){return}}else{var aj=new Date();aj.setMilliseconds(0)}var ah=parseFloat(ai[2]);if(ai[6]){ah=ai[6].toLowerCase()=="am"?(ah==12?0:ah):(ah==12?12:ah+12)}aj.setHours(ah,parseInt(ai[3]||0,10),parseInt(ai[4]||0,10),((parseFloat(ai[5]||0))||0)*1000);return aj}else{return ak}},function(ak){var ai=ak.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);if(ai){if(ai[1]){var aj=this.createDate(ai[1]);if(isNaN(aj)){return}}else{var aj=new Date();aj.setMilliseconds(0)}var ah=parseFloat(ai[2]);aj.setHours(ah,parseInt(ai[3],10),parseInt(ai[4],10),parseFloat(ai[5])*1000);return aj}else{return ak}},function(al){var aj=al.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);if(aj){var ak=new Date();var am=ag.config.defaultCentury;var ao=parseFloat(aj[1]);var an=parseFloat(aj[3]);var ai,ah,ap;if(ao>31){ah=an;ai=am+ao}else{ah=ao;ai=am+an}var ap=ab(aj[2],ag.regional[ag.regional.getLocale()]["monthNamesShort"]);if(ap==-1){ap=ab(aj[2],ag.regional[ag.regional.getLocale()]["monthNames"])}ak.setFullYear(ai,ap,ah);ak.setHours(0,0,0,0);return ak}else{return al}}];function ab(aj,ak){if(ak.indexOf){return ak.indexOf(aj)}for(var ah=0,ai=ak.length;ah<ai;ah++){if(ak[ah]===aj){return ah}}return -1}function l(ah){if(ah===null){return"[object Null]"}return Object.prototype.toString.call(ah)}L.jsDate=ag;L.jqplot.sprintf=function(){function an(au,ap,aq,at){var ar=(au.length>=ap)?"":Array(1+ap-au.length>>>0).join(aq);return at?au+ar:ar+au}function ak(ar){var aq=new String(ar);for(var ap=10;ap>0;ap--){if(aq==(aq=aq.replace(/^(\d+)(\d{3})/,"$1"+L.jqplot.sprintf.thousandsSeparator+"$2"))){break}}return aq}function aj(av,au,ax,ar,at,aq){var aw=ar-av.length;if(aw>0){var ap=" ";if(aq){ap="&nbsp;"}if(ax||!at){av=an(av,ar,ap,ax)}else{av=av.slice(0,au.length)+an("",aw,"0",true)+av.slice(au.length)}}return av}function ao(ay,aq,aw,ar,ap,av,ax,au){var at=ay>>>0;aw=aw&&at&&{"2":"0b","8":"0","16":"0x"}[aq]||"";ay=aw+an(at.toString(aq),av||0,"0",false);return aj(ay,aw,ar,ap,ax,au)}function ah(au,av,ar,ap,at,aq){if(ap!=null){au=au.slice(0,ap)}return aj(au,"",av,ar,at,aq)}var ai=arguments,al=0,am=ai[al++];return am.replace(L.jqplot.sprintf.regex,function(aM,ax,ay,aB,aO,aJ,av){if(aM=="%%"){return"%"}var aD=false,az="",aA=false,aL=false,aw=false,au=false;for(var aI=0;ay&&aI<ay.length;aI++){switch(ay.charAt(aI)){case" ":az=" ";break;case"+":az="+";break;case"-":aD=true;break;case"0":aA=true;break;case"#":aL=true;break;case"&":aw=true;break;case"'":au=true;break}}if(!aB){aB=0}else{if(aB=="*"){aB=+ai[al++]}else{if(aB.charAt(0)=="*"){aB=+ai[aB.slice(1,-1)]}else{aB=+aB}}}if(aB<0){aB=-aB;aD=true}if(!isFinite(aB)){throw new Error("$.jqplot.sprintf: (minimum-)width must be finite")}if(!aJ){aJ="fFeE".indexOf(av)>-1?6:(av=="d")?0:void (0)}else{if(aJ=="*"){aJ=+ai[al++]}else{if(aJ.charAt(0)=="*"){aJ=+ai[aJ.slice(1,-1)]}else{aJ=+aJ}}}var aF=ax?ai[ax.slice(0,-1)]:ai[al++];switch(av){case"s":if(aF==null){return""}return ah(String(aF),aD,aB,aJ,aA,aw);case"c":return ah(String.fromCharCode(+aF),aD,aB,aJ,aA,aw);case"b":return ao(aF,2,aL,aD,aB,aJ,aA,aw);case"o":return ao(aF,8,aL,aD,aB,aJ,aA,aw);case"x":return ao(aF,16,aL,aD,aB,aJ,aA,aw);case"X":return ao(aF,16,aL,aD,aB,aJ,aA,aw).toUpperCase();case"u":return ao(aF,10,aL,aD,aB,aJ,aA,aw);case"i":var ar=parseInt(+aF,10);if(isNaN(ar)){return""}var aH=ar<0?"-":az;var aK=au?ak(String(Math.abs(ar))):String(Math.abs(ar));aF=aH+an(aK,aJ,"0",false);return aj(aF,aH,aD,aB,aA,aw);case"d":var ar=Math.round(+aF);if(isNaN(ar)){return""}var aH=ar<0?"-":az;var aK=au?ak(String(Math.abs(ar))):String(Math.abs(ar));aF=aH+an(aK,aJ,"0",false);return aj(aF,aH,aD,aB,aA,aw);case"e":case"E":case"f":case"F":case"g":case"G":var ar=+aF;if(isNaN(ar)){return""}var aH=ar<0?"-":az;var at=["toExponential","toFixed","toPrecision"]["efg".indexOf(av.toLowerCase())];var aN=["toString","toUpperCase"]["eEfFgG".indexOf(av)%2];var aK=Math.abs(ar)[at](aJ);var aE=aK.toString().split(".");aE[0]=au?ak(aE[0]):aE[0];aK=aE.join(L.jqplot.sprintf.decimalMark);aF=aH+aK;var aC=aj(aF,aH,aD,aB,aA,aw)[aN]();return aC;case"p":case"P":var ar=+aF;if(isNaN(ar)){return""}var aH=ar<0?"-":az;var aE=String(Number(Math.abs(ar)).toExponential()).split(/e|E/);var aq=(aE[0].indexOf(".")!=-1)?aE[0].length-1:String(ar).length;var aG=(aE[1]<0)?-aE[1]-1:0;if(Math.abs(ar)<1){if(aq+aG<=aJ){aF=aH+Math.abs(ar).toPrecision(aq)}else{if(aq<=aJ-1){aF=aH+Math.abs(ar).toExponential(aq-1)}else{aF=aH+Math.abs(ar).toExponential(aJ-1)}}}else{var ap=(aq<=aJ)?aq:aJ;aF=aH+Math.abs(ar).toPrecision(ap)}var aN=["toString","toUpperCase"]["pP".indexOf(av)%2];return aj(aF,aH,aD,aB,aA,aw)[aN]();case"n":return"";default:return aM}})};L.jqplot.sprintf.thousandsSeparator=",";L.jqplot.sprintf.decimalMark=".";L.jqplot.sprintf.regex=/%%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g;L.jqplot.getSignificantFigures=function(al){var an=String(Number(Math.abs(al)).toExponential()).split(/e|E/);var am=(an[0].indexOf(".")!=-1)?an[0].length-1:an[0].length;var ai=(an[1]<0)?-an[1]-1:0;var ah=parseInt(an[1],10);var aj=(ah+1>0)?ah+1:0;var ak=(am<=aj)?0:am-ah-1;return{significantDigits:am,digitsLeft:aj,digitsRight:ak,zeros:ai,exponent:ah}};L.jqplot.getPrecision=function(ah){return L.jqplot.getSignificantFigures(ah).digitsRight};var X=L.uiBackCompat!==false;L.jqplot.effects={effect:{}};var m="jqplot.storage.";L.extend(L.jqplot.effects,{version:"1.9pre",save:function(ai,aj){for(var ah=0;ah<aj.length;ah++){if(aj[ah]!==null){ai.data(m+aj[ah],ai[0].style[aj[ah]])}}},restore:function(ai,aj){for(var ah=0;ah<aj.length;ah++){if(aj[ah]!==null){ai.css(aj[ah],ai.data(m+aj[ah]))}}},setMode:function(ah,ai){if(ai==="toggle"){ai=ah.is(":hidden")?"show":"hide"}return ai},createWrapper:function(ai){if(ai.parent().is(".ui-effects-wrapper")){return ai.parent()}var aj={width:ai.outerWidth(true),height:ai.outerHeight(true),"float":ai.css("float")},al=L("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),ah={width:ai.width(),height:ai.height()},ak=document.activeElement;ai.wrap(al);if(ai[0]===ak||L.contains(ai[0],ak)){L(ak).focus()}al=ai.parent();if(ai.css("position")==="static"){al.css({position:"relative"});ai.css({position:"relative"})}else{L.extend(aj,{position:ai.css("position"),zIndex:ai.css("z-index")});L.each(["top","left","bottom","right"],function(am,an){aj[an]=ai.css(an);if(isNaN(parseInt(aj[an],10))){aj[an]="auto"}});ai.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}ai.css(ah);return al.css(aj).show()},removeWrapper:function(ah){var ai=document.activeElement;if(ah.parent().is(".ui-effects-wrapper")){ah.parent().replaceWith(ah);if(ah[0]===ai||L.contains(ah[0],ai)){L(ai).focus()}}return ah}});function j(ai,ah,aj,ak){if(L.isPlainObject(ai)){return ai}ai={effect:ai};if(ah===u){ah={}}if(L.isFunction(ah)){ak=ah;aj=null;ah={}}if(L.type(ah)==="number"||L.fx.speeds[ah]){ak=aj;aj=ah;ah={}}if(L.isFunction(aj)){ak=aj;aj=null}if(ah){L.extend(ai,ah)}aj=aj||ah.duration;ai.duration=L.fx.off?0:typeof aj==="number"?aj:aj in L.fx.speeds?L.fx.speeds[aj]:L.fx.speeds._default;ai.complete=ak||ah.complete;return ai}function ae(ah){if(!ah||typeof ah==="number"||L.fx.speeds[ah]){return true}if(typeof ah==="string"&&!L.jqplot.effects.effect[ah]){if(X&&L.jqplot.effects[ah]){return false}return true}return false}L.fn.extend({jqplotEffect:function(ap,aq,ai,ao){var an=j.apply(this,arguments),ak=an.mode,al=an.queue,am=L.jqplot.effects.effect[an.effect],ah=!am&&X&&L.jqplot.effects[an.effect];if(L.fx.off||!(am||ah)){if(ak){return this[ak](an.duration,an.complete)}else{return this.each(function(){if(an.complete){an.complete.call(this)}})}}function aj(au){var av=L(this),at=an.complete,aw=an.mode;function ar(){if(L.isFunction(at)){at.call(av[0])}if(L.isFunction(au)){au()}}if(av.is(":hidden")?aw==="hide":aw==="show"){ar()}else{am.call(av[0],an,ar)}}if(am){return al===false?this.each(aj):this.queue(al||"fx",aj)}else{return ah.call(this,{options:an,duration:an.duration,callback:an.complete,mode:an.mode})}}});var a=/up|down|vertical/,v=/up|left|vertical|horizontal/;L.jqplot.effects.effect.blind=function(aj,ao){var ak=L(this),ar=["position","top","bottom","left","right","height","width"],ap=L.jqplot.effects.setMode(ak,aj.mode||"hide"),au=aj.direction||"up",am=a.test(au),al=am?"height":"width",aq=am?"top":"left",aw=v.test(au),an={},av=ap==="show",ai,ah,at;if(ak.parent().is(".ui-effects-wrapper")){L.jqplot.effects.save(ak.parent(),ar)}else{L.jqplot.effects.save(ak,ar)}ak.show();at=parseInt(ak.css("top"),10);ai=L.jqplot.effects.createWrapper(ak).css({overflow:"hidden"});ah=am?ai[al]()+at:ai[al]();an[al]=av?String(ah):"0";if(!aw){ak.css(am?"bottom":"right",0).css(am?"top":"left","").css({position:"absolute"});an[aq]=av?"0":String(ah)}if(av){ai.css(al,0);if(!aw){ai.css(aq,ah)}}ai.animate(an,{duration:aj.duration,easing:aj.easing,queue:false,complete:function(){if(ap==="hide"){ak.hide()}L.jqplot.effects.restore(ak,ar);L.jqplot.effects.removeWrapper(ak);ao()}})}})(jQuery);
/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/
(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




