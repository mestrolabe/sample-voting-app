/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

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
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

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

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
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
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

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

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
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
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
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
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
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
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

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
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
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
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

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
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
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
		return ( cache[ key + " " ] = value );
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
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
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
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
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
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
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
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
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
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
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
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

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
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
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
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
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

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
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
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
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
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
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
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
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
		while ( ( elem = results[ i++ ] ) ) {
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
		while ( ( node = elem[ i++ ] ) ) {

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
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
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
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
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

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
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
								while ( ( node = node[ dir ] ) ) {
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
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

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
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

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
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
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
			return !Expr.pseudos[ "empty" ]( elem );
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
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

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
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
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
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
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
		if ( ( elem = unmatched[ i ] ) ) {
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
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

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
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
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
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
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
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
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
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
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
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
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
					if ( ( elem = !matcher && elem ) ) {
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
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
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
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

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
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

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
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




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



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
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
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
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

					// Option to run scripts is true for back-compat
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
							if ( isFunction( this[ match ] ) ) {
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

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
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
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
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
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
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
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
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
	parentsUntil: function( elem, _i, until ) {
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
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
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
			locked = locked || options.once;

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
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

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
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
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


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
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
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
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
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

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
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
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
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
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

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
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

				// Ensure a hooks for this queue
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
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
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


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
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
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
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

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
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

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
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

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
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

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
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

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

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

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

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
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
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
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
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

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
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
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
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

						// Support: Android <=4.0 only, PhantomJS 1 only
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
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
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

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
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

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
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
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
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
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
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

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
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
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

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

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
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


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
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
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
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
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
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

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
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
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
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

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
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

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
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

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
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

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
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

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
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

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
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

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
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

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
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

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
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
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
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
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
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

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
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
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

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

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
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
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
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
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
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
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
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
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

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

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
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
					nodeName( elem, "input" ) ) {
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
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
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
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
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

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
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




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

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

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
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

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

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

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
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




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

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
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

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
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
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

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
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

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

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


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

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

	} else if ( !traditional && toType( obj ) === "object" ) {

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
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

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
	return s.join( "&" );
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
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

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

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

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
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
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
	var key, deep,
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

	var ct, type, finalDataType, firstDataType,
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
					if ( conv && s.throws ) {
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
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
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
			"text json": JSON.parse,

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

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

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

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
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
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
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
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
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
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

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
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

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

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
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

				// Extract error from statusText and normalize for non-aborts
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

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
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

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
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
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

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
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




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

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
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
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
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
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
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

		// Force json dataType
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

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
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


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

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
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

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

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
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
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
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
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
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
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



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

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

;/*
 * # Fomantic UI - 2.8.8
 * https://github.com/fomantic/Fomantic-UI
 * http://fomantic-ui.com/
 *
 * Copyright 2021 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(p,h,v,b){p.isFunction=p.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},p.site=p.fn.site=function(e){var s,i=(new Date).getTime(),o=[],t=e,n="string"==typeof t,l=[].slice.call(arguments,1),c=p.isPlainObject(e)?p.extend(!0,{},p.site.settings,e):p.extend({},p.site.settings),a=c.namespace,u=c.error,r="module-"+a,d=p(v),f=this,m=d.data(r),g={initialize:function(){g.instantiate()},instantiate:function(){g.verbose("Storing instance of site",g),m=g,d.data(r,g)},normalize:function(){g.fix.console(),g.fix.requestAnimationFrame()},fix:{console:function(){g.debug("Normalizing window.console"),console!==b&&console.log!==b||(g.verbose("Console not available, normalizing events"),g.disable.console()),void 0!==console.group&&void 0!==console.groupEnd&&void 0!==console.groupCollapsed||(g.verbose("Console group not available, normalizing events"),h.console.group=function(){},h.console.groupEnd=function(){},h.console.groupCollapsed=function(){}),void 0===console.markTimeline&&(g.verbose("Mark timeline not available, normalizing events"),h.console.markTimeline=function(){})},consoleClear:function(){g.debug("Disabling programmatic console clearing"),h.console.clear=function(){}},requestAnimationFrame:function(){g.debug("Normalizing requestAnimationFrame"),h.requestAnimationFrame===b&&(g.debug("RequestAnimationFrame not available, normalizing event"),h.requestAnimationFrame=h.requestAnimationFrame||h.mozRequestAnimationFrame||h.webkitRequestAnimationFrame||h.msRequestAnimationFrame||function(e){setTimeout(e,0)})}},moduleExists:function(e){return p.fn[e]!==b&&p.fn[e].settings!==b},enabled:{modules:function(e){var n=[];return e=e||c.modules,p.each(e,function(e,t){g.moduleExists(t)&&n.push(t)}),n}},disabled:{modules:function(e){var n=[];return e=e||c.modules,p.each(e,function(e,t){g.moduleExists(t)||n.push(t)}),n}},change:{setting:function(o,a,e,r){e="string"==typeof e?"all"===e?c.modules:[e]:e||c.modules,r=r===b||r,p.each(e,function(e,t){var n,i=!g.moduleExists(t)||(p.fn[t].settings.namespace||!1);g.moduleExists(t)&&(g.verbose("Changing default setting",o,a,t),p.fn[t].settings[o]=a,r&&i&&0<(n=p(":data(module-"+i+")")).length&&(g.verbose("Modifying existing settings",n),n[t]("setting",o,a)))})},settings:function(i,e,o){e="string"==typeof e?[e]:e||c.modules,o=o===b||o,p.each(e,function(e,t){var n;g.moduleExists(t)&&(g.verbose("Changing default setting",i,t),p.extend(!0,p.fn[t].settings,i),o&&a&&0<(n=p(":data(module-"+a+")")).length&&(g.verbose("Modifying existing settings",n),n[t]("setting",i)))})}},enable:{console:function(){g.console(!0)},debug:function(e,t){e=e||c.modules,g.debug("Enabling debug for modules",e),g.change.setting("debug",!0,e,t)},verbose:function(e,t){e=e||c.modules,g.debug("Enabling verbose debug for modules",e),g.change.setting("verbose",!0,e,t)}},disable:{console:function(){g.console(!1)},debug:function(e,t){e=e||c.modules,g.debug("Disabling debug for modules",e),g.change.setting("debug",!1,e,t)},verbose:function(e,t){e=e||c.modules,g.debug("Disabling verbose debug for modules",e),g.change.setting("verbose",!1,e,t)}},console:function(e){e?m.cache.console!==b?(g.debug("Restoring console function"),h.console=m.cache.console):g.error(u.console):(g.debug("Disabling console function"),m.cache.console=h.console,h.console={clear:function(){},error:function(){},group:function(){},groupCollapsed:function(){},groupEnd:function(){},info:function(){},log:function(){},markTimeline:function(){},warn:function(){}})},destroy:function(){g.verbose("Destroying previous site for",d),d.removeData(r)},cache:{},setting:function(e,t){if(p.isPlainObject(e))p.extend(!0,c,e);else{if(t===b)return c[e];c[e]=t}},internal:function(e,t){if(p.isPlainObject(e))p.extend(!0,g,e);else{if(t===b)return g[e];g[e]=t}},debug:function(){c.debug&&(c.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,c.name+":"),g.debug.apply(console,arguments)))},verbose:function(){c.verbose&&c.debug&&(c.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,c.name+":"),g.verbose.apply(console,arguments)))},error:function(){g.error=Function.prototype.bind.call(console.error,console,c.name+":"),g.error.apply(console,arguments)},performance:{log:function(e){var t,n;c.performance&&(n=(t=(new Date).getTime())-(i||t),i=t,o.push({Element:f,Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var e=c.name+":",n=0;i=!1,clearTimeout(g.performance.timer),p.each(o,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",(console.group!==b||console.table!==b)&&0<o.length&&(console.groupCollapsed(e),console.table?console.table(o):p.each(o,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),o=[]}},invoke:function(i,e,t){var o,a,n,r=m;return e=e||l,t=f||t,"string"==typeof i&&r!==b&&(i=i.split(/[\. ]/),o=i.length-1,p.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(p.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==b)return a=r[n],!1;{if(!p.isPlainObject(r[t])||e==o)return r[t]!==b?a=r[t]:g.error(u.method,i),!1;r=r[t]}}})),p.isFunction(a)?n=a.apply(t,e):a!==b&&(n=a),Array.isArray(s)?s.push(n):s!==b?s=[s,n]:n!==b&&(s=n),a}};return n?(m===b&&g.initialize(),g.invoke(t)):(m!==b&&g.destroy(),g.initialize()),s!==b?s:this},p.site.settings={name:"Site",namespace:"site",error:{console:"Console cannot be restored, most likely it was overwritten outside of module",method:"The method you called is not defined."},debug:!1,verbose:!1,performance:!0,modules:["accordion","api","calendar","checkbox","dimmer","dropdown","embed","form","modal","nag","popup","slider","rating","shape","sidebar","state","sticky","tab","toast","transition","visibility","visit"],siteNamespace:"site",namespaceStub:{cache:{},config:{},sections:{},section:{},utilities:{}}},p.extend(p.expr[":"],{data:p.expr.createPseudo?p.expr.createPseudo(function(t){return function(e){return!!p.data(e,t)}}):function(e,t,n){return!!p.data(e,n[3])}})}(jQuery,window,document),function(M,I,j,L){"use strict";M.isFunction=M.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},I=void 0!==I&&I.Math==Math?I:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),M.fn.form=function(k){var T,S=M(this),D=S.selector||"",A=(new Date).getTime(),E=[],F=k,P=arguments[1],O="string"==typeof F,R=[].slice.call(arguments,1);return S.each(function(){var n,d,t,e,f,l,m,g,p,i,c,o,a,s,u,h=M(this),v=this,b=[],y=!1,r=!1,x=!1,C=["clean","clean"],w={initialize:function(){w.get.settings(),O?(u===L&&w.instantiate(),w.invoke(F)):(u!==L&&(u.invoke("destroy"),w.refresh()),w.verbose("Initializing form validation",h,f),w.bindEvents(),w.set.defaults(),f.autoCheckRequired&&w.set.autoCheck(),w.instantiate())},instantiate:function(){w.verbose("Storing instance of module",w),u=w,h.data(a,w)},destroy:function(){w.verbose("Destroying previous module",u),w.removeEvents(),h.removeData(a)},refresh:function(){w.verbose("Refreshing selector cache"),n=h.find(g.field),d=h.find(g.group),t=h.find(g.message),h.find(g.prompt),e=h.find(g.submit),h.find(g.clear),h.find(g.reset)},submit:function(){w.verbose("Submitting form",h),r=!0,h.submit()},attachEvents:function(e,t){t=t||"submit",M(e).on("click"+s,function(e){w[t](),e.preventDefault()})},bindEvents:function(){w.verbose("Attaching form events"),h.on("submit"+s,w.validate.form).on("blur"+s,g.field,w.event.field.blur).on("click"+s,g.submit,w.submit).on("click"+s,g.reset,w.reset).on("click"+s,g.clear,w.clear),f.keyboardShortcuts&&h.on("keydown"+s,g.field,w.event.field.keydown),n.each(function(e,t){var n=M(t),t=n.prop("type"),t=w.get.changeEvent(t,n);n.on(t+s,w.event.field.change)}),f.preventLeaving&&M(I).on("beforeunload"+s,w.event.beforeUnload),n.on("change click keyup keydown blur",function(e){w.determine.isDirty()}),h.on("dirty"+s,function(e){f.onDirty.call()}),h.on("clean"+s,function(e){f.onClean.call()})},clear:function(){n.each(function(e,t){var n=M(t),i=n.parent(),o=n.closest(d),a=o.find(g.prompt),r=n.closest(g.uiCalendar),s=n.data(m.defaultValue)||"",l=i.is(g.uiCheckbox),c=i.is(g.uiDropdown)&&w.can.useElement("dropdown"),t=0<r.length&&w.can.useElement("calendar");o.hasClass(p.error)&&(w.verbose("Resetting error on field",o),o.removeClass(p.error),a.remove()),c?(w.verbose("Resetting dropdown value",i,s),i.dropdown("clear",!0)):l?n.prop("checked",!1):t?r.calendar("clear"):(w.verbose("Resetting field value",n,s),n.val(""))}),w.remove.states()},reset:function(){n.each(function(e,t){var n=M(t),i=n.parent(),o=n.closest(d),a=n.closest(g.uiCalendar),r=o.find(g.prompt),s=n.data(m.defaultValue),l=i.is(g.uiCheckbox),c=i.is(g.uiDropdown)&&w.can.useElement("dropdown"),u=0<a.length&&w.can.useElement("calendar"),t=o.hasClass(p.error);s!==L&&(t&&(w.verbose("Resetting error on field",o),o.removeClass(p.error),r.remove()),c?(w.verbose("Resetting dropdown value",i,s),i.dropdown("restore defaults",!0)):l?(w.verbose("Resetting checkbox value",i,s),n.prop("checked",s)):u?a.calendar("set date",s):(w.verbose("Resetting field value",n,s),n.val(s)))}),w.remove.states()},determine:{isValid:function(){var n=!0;return M.each(l,function(e,t){w.validate.field(t,e,!0)||(n=!1)}),n},isDirty:function(e){var i=!1;n.each(function(e,t){var n=M(t),t=0<n.filter(g.checkbox).length?w.is.checkboxDirty(n):w.is.fieldDirty(n);n.data(f.metadata.isDirty,t),i|=t}),i?w.set.dirty():w.set.clean()}},is:{bracketedRule:function(e){return e.type&&e.type.match(f.regExp.bracket)},shorthandRules:function(e){return"string"==typeof e||Array.isArray(e)},empty:function(e){return!e||0===e.length||(e.is(g.checkbox)?!e.is(":checked"):w.is.blank(e))},blank:function(e){return""===String(e.val()).trim()},valid:function(e,n){var i=!0;return e?(w.verbose("Checking if field is valid",e),w.validate.field(l[e],e,!!n)):(w.verbose("Checking if form is valid"),M.each(l,function(e,t){w.is.valid(e,n)||(i=!1)}),i)},dirty:function(){return x},clean:function(){return!x},fieldDirty:function(e){var t=e.data(m.defaultValue);null==t?t="":Array.isArray(t)&&(t=t.toString());var n=e.val();null==n?n="":Array.isArray(n)&&(n=n.toString());e=/^(true|false)$/i;return e.test(t)&&e.test(n)?!new RegExp("^"+t+"$","i").test(n):n!==t},checkboxDirty:function(e){return e.data(m.defaultValue)!==e.is(":checked")},justDirty:function(){return"dirty"===C[0]},justClean:function(){return"clean"===C[0]}},removeEvents:function(){h.off(s),n.off(s),e.off(s),n.off(s)},event:{field:{keydown:function(e){var t=M(this),n=e.which,i=t.is(g.input),o=t.is(g.checkbox),a=0<t.closest(g.uiDropdown).length,r=13;n==27&&(w.verbose("Escape key pressed blurring field"),t[0].blur()),e.ctrlKey||n!=r||!i||a||o||(y||(t.one("keyup"+s,w.event.field.keyup),w.submit(),w.debug("Enter pressed on input submitting form")),y=!0)},keyup:function(){y=!1},blur:function(e){var t=M(this),n=t.closest(d),i=w.get.validation(t);i&&("blur"==f.on||n.hasClass(p.error)&&f.revalidate)&&(w.debug("Revalidating field",t,i),w.validate.field(i),f.inline||w.validate.form(!1,!0))},change:function(e){var t=M(this),n=t.closest(d),i=w.get.validation(t);i&&("change"==f.on||n.hasClass(p.error)&&f.revalidate)&&(clearTimeout(w.timer),w.timer=setTimeout(function(){w.debug("Revalidating field",t,i),w.validate.field(i),f.inline||w.validate.form(!1,!0)},f.delay))}},beforeUnload:function(e){if(w.is.dirty()&&!r)return(e=e||I.event)&&(e.returnValue=f.text.leavingMessage),f.text.leavingMessage}},get:{ancillaryValue:function(e){return!(!e.type||!e.value&&!w.is.bracketedRule(e))&&(e.value!==L?e.value:e.type.match(f.regExp.bracket)[1]+"")},ruleName:function(e){return w.is.bracketedRule(e)?e.type.replace(e.type.match(f.regExp.bracket)[0],""):e.type},changeEvent:function(e,t){return"checkbox"==e||"radio"==e||"hidden"==e||t.is("select")?"change":w.get.inputEvent()},inputEvent:function(){return j.createElement("input").oninput!==L?"input":j.createElement("input").onpropertychange!==L?"propertychange":"keyup"},fieldsFromShorthand:function(e){var i={};return M.each(e,function(n,e){Array.isArray(e)||"object"!=typeof e?("string"==typeof e&&(e=[e]),i[n]={rules:[]},M.each(e,function(e,t){i[n].rules.push({type:t})})):i[n]=e}),i},prompt:function(e,t){var n=w.get.ruleName(e),i=w.get.ancillaryValue(e),o=w.get.field(t.identifier),a=o.val(),r=M.isFunction(e.prompt)?e.prompt(a):e.prompt||f.prompt[n]||f.text.unspecifiedRule,s=-1!==r.search("{value}"),l=-1!==r.search("{name}");return i&&0<=i.indexOf("..")&&(a=i.split("..",2),e.prompt||(r+=(""===a[0]?f.prompt.maxValue.replace(/\{ruleValue\}/g,"{max}"):""===a[1]?f.prompt.minValue.replace(/\{ruleValue\}/g,"{min}"):f.prompt.range).replace(/\{name\}/g," "+f.text.and)),r=(r=r.replace(/\{min\}/g,a[0])).replace(/\{max\}/g,a[1])),s&&(r=r.replace(/\{value\}/g,o.val())),l&&(o=1==(l=o.closest(g.group).find("label").eq(0)).length?l.text():o.prop("placeholder")||f.text.unspecifiedField,r=r.replace(/\{name\}/g,o)),r=(r=r.replace(/\{identifier\}/g,t.identifier)).replace(/\{ruleValue\}/g,i),e.prompt||w.verbose("Using default validation prompt for type",r,n),r},settings:function(){var e;M.isPlainObject(k)?0<(e=Object.keys(k)).length&&(k[e[0]].identifier!==L&&k[e[0]].rules!==L)?(f=M.extend(!0,{},M.fn.form.settings,P),l=M.extend({},M.fn.form.settings.defaults,k),w.error(f.error.oldSyntax,v),w.verbose("Extending settings from legacy parameters",l,f)):(k.fields&&(k.fields=w.get.fieldsFromShorthand(k.fields)),f=M.extend(!0,{},M.fn.form.settings,k),l=M.extend({},M.fn.form.settings.defaults,f.fields),w.verbose("Extending settings",l,f)):(f=M.fn.form.settings,l=M.fn.form.settings.defaults,w.verbose("Using default form validation",l,f)),o=f.namespace,m=f.metadata,g=f.selector,p=f.className,i=f.regExp,c=f.error,a="module-"+o,s="."+o,((u=h.data(a))||w).refresh()},field:function(e){var t;return w.verbose("Finding field with identifier",e),e=w.escape.string(e),0<(t=n.filter("#"+e)).length||0<(t=n.filter('[name="'+e+'"]')).length||0<(t=n.filter('[name="'+e+'[]"]')).length||0<(t=n.filter("[data-"+m.validate+'="'+e+'"]')).length?t:M("<input/>")},fields:function(e){var n=M();return M.each(e,function(e,t){n=n.add(w.get.field(t))}),n},validation:function(i){var o,a;return!!l&&(M.each(l,function(e,n){a=n.identifier||e,M.each(w.get.field(a),function(e,t){if(t==i[0])return n.identifier=a,o=n,!1})}),o||!1)},value:function(e){var t=[];return t.push(e),w.get.values.call(v,t)[e]},values:function(e){var e=Array.isArray(e)?w.get.fields(e):n,d={};return e.each(function(e,t){var n=M(t),i=n.closest(g.uiCalendar),o=n.prop("name"),a=n.val(),r=n.is(g.checkbox),s=n.is(g.radio),l=-1!==o.indexOf("[]"),t=0<i.length&&w.can.useElement("calendar"),n=!!r&&n.is(":checked");if(o)if(l)o=o.replace("[]",""),d[o]||(d[o]=[]),r?n?d[o].push(a||!0):d[o].push(!1):d[o].push(a);else if(s)d[o]!==L&&!1!==d[o]||(d[o]=!!n&&(a||!0));else if(r)d[o]=!!n&&(a||!0);else if(t){var c=i.calendar("get date");if(null!==c){if("date"==f.dateHandling)d[o]=c;else if("input"==f.dateHandling)d[o]=i.calendar("get input date");else if("formatter"==f.dateHandling){var u=i.calendar("setting","type");switch(u){case"date":d[o]=f.formatter.date(c);break;case"datetime":d[o]=f.formatter.datetime(c);break;case"time":d[o]=f.formatter.time(c);break;case"month":d[o]=f.formatter.month(c);break;case"year":d[o]=f.formatter.year(c);break;default:w.debug("Wrong calendar mode",i,u),d[o]=""}}}else d[o]=""}else d[o]=a}),d},dirtyFields:function(){return n.filter(function(e,t){return M(t).data(m.isDirty)})}},has:{field:function(e){return w.verbose("Checking for existence of a field with identifier",e),"string"!=typeof(e=w.escape.string(e))&&w.error(c.identifier,e),0<n.filter("#"+e).length||(0<n.filter('[name="'+e+'"]').length||0<n.filter("[data-"+m.validate+'="'+e+'"]').length)}},can:{useElement:function(e){return M.fn[e]!==L||(w.error(c.noElement.replace("{element}",e)),!1)}},escape:{string:function(e){return(e=String(e)).replace(i.escape,"\\$&")}},add:{rule:function(e,t){w.add.field(e,t)},field:function(n,e){l[n]!==L&&l[n].rules!==L||(l[n]={rules:[]});var i={rules:[]};w.is.shorthandRules(e)?(e=Array.isArray(e)?e:[e],M.each(e,function(e,t){i.rules.push({type:t})})):i.rules=e.rules,M.each(i.rules,function(e,t){0==M.grep(l[n].rules,function(e){return e.type==t.type}).length&&l[n].rules.push(t)}),w.debug("Adding rules",i.rules,l)},fields:function(e){l=M.extend({},l,w.get.fieldsFromShorthand(e))},prompt:function(e,t,n){var i=w.get.field(e).closest(d),o=i.children(g.prompt),a=0!==o.length;t="string"==typeof t?[t]:t,w.verbose("Adding field error state",e),n||i.addClass(p.error),f.inline&&(a||(o=f.templates.prompt(t,p.label)).appendTo(i),o.html(t[0]),a?w.verbose("Inline errors are disabled, no inline error added",e):f.transition&&w.can.useElement("transition")&&h.transition("is supported")?(w.verbose("Displaying error with css transition",f.transition),o.transition(f.transition+" in",f.duration)):(w.verbose("Displaying error with fallback javascript animation"),o.fadeIn(f.duration)))},errors:function(e){w.debug("Adding form error messages",e),w.set.error(),t.html(f.templates.error(e))}},remove:{errors:function(){w.debug("Removing form error messages"),t.empty()},states:function(){h.removeClass(p.error).removeClass(p.success),f.inline||w.remove.errors(),w.determine.isDirty()},rule:function(n,e){var i=Array.isArray(e)?e:[e];if(l[n]!==L&&Array.isArray(l[n].rules))return e===L?(w.debug("Removed all rules"),void(l[n].rules=[])):void M.each(l[n].rules,function(e,t){t&&-1!==i.indexOf(t.type)&&(w.debug("Removed rule",t.type),l[n].rules.splice(e,1))})},field:function(e){e=Array.isArray(e)?e:[e];M.each(e,function(e,t){w.remove.rule(t)})},rules:function(e,n){Array.isArray(e)?M.each(e,function(e,t){w.remove.rule(t,n)}):w.remove.rule(e,n)},fields:function(e){w.remove.field(e)},prompt:function(e){var t=w.get.field(e).closest(d),n=t.children(g.prompt);t.removeClass(p.error),f.inline&&n.is(":visible")&&(w.verbose("Removing prompt for field",e),f.transition&&w.can.useElement("transition")&&h.transition("is supported")?n.transition(f.transition+" out",f.duration,function(){n.remove()}):n.fadeOut(f.duration,function(){n.remove()}))}},set:{success:function(){h.removeClass(p.error).addClass(p.success)},defaults:function(){n.each(function(e,t){var n=M(t),i=n.parent(),o=0<n.filter(g.checkbox).length,a=i.is(g.uiDropdown)&&w.can.useElement("dropdown"),r=n.closest(g.uiCalendar),t=0<r.length&&w.can.useElement("calendar"),o=o?n.is(":checked"):n.val();a?i.dropdown("save defaults"):t&&r.calendar("refresh"),n.data(m.defaultValue,o),n.data(m.isDirty,!1)})},error:function(){h.removeClass(p.success).addClass(p.error)},value:function(e,t){var n={};return n[e]=t,w.set.values.call(v,n)},values:function(e){M.isEmptyObject(e)||M.each(e,function(e,t){var n,i=w.get.field(e),o=i.parent(),a=i.closest(g.uiCalendar),r=Array.isArray(t),s=o.is(g.uiCheckbox)&&w.can.useElement("checkbox"),l=o.is(g.uiDropdown)&&w.can.useElement("dropdown"),c=i.is(g.radio)&&s,e=0<a.length&&w.can.useElement("calendar");0<i.length&&(r&&s?(w.verbose("Selecting multiple",t,i),o.checkbox("uncheck"),M.each(t,function(e,t){n=i.filter('[value="'+t+'"]'),o=n.parent(),0<n.length&&o.checkbox("check")})):c?(w.verbose("Selecting radio value",t,i),i.filter('[value="'+t+'"]').parent(g.uiCheckbox).checkbox("check")):s?(w.verbose("Setting checkbox value",t,o),!0===t||1===t?o.checkbox("check"):o.checkbox("uncheck")):l?(w.verbose("Setting dropdown value",t,o),o.dropdown("set selected",t)):e?a.calendar("set date",t):(w.verbose("Setting field value",t,i),i.val(t)))})},dirty:function(){w.verbose("Setting state dirty"),x=!0,C[0]=C[1],C[1]="dirty",w.is.justClean()&&h.trigger("dirty")},clean:function(){w.verbose("Setting state clean"),x=!1,C[0]=C[1],C[1]="clean",w.is.justDirty()&&h.trigger("clean")},asClean:function(){w.set.defaults(),w.set.clean()},asDirty:function(){w.set.defaults(),w.set.dirty()},autoCheck:function(){w.debug("Enabling auto check on required fields"),n.each(function(e,t){var n=M(t),i=M(t).closest(d),o=0<n.filter(g.checkbox).length,a=n.prop("required")||i.hasClass(p.required)||i.parent().hasClass(p.required),r=n.is(":disabled")||i.hasClass(p.disabled)||i.parent().hasClass(p.disabled),t=w.get.validation(n),i=!!t&&0!==M.grep(t.rules,function(e){return"empty"==e.type}),n=t.identifier||n.attr("id")||n.attr("name")||n.data(m.validate);!a||r||i||n===L||(o?(w.verbose("Adding 'checked' rule on field",n),w.add.rule(n,"checked")):(w.verbose("Adding 'empty' rule on field",n),w.add.rule(n,"empty")))})},optional:function(n,i){i=!1!==i,M.each(l,function(e,t){n!=e&&n!=t.identifier||(t.optional=i)})}},validate:{form:function(e,t){var n,i=w.get.values();if(y)return!1;if(b=[],w.determine.isValid()){if(w.debug("Form has no validation errors, submitting"),w.set.success(),f.inline||w.remove.errors(),!0!==t)return f.onSuccess.call(v,e,i)}else if(w.debug("Form has errors"),r=!1,w.set.error(),f.inline||w.add.errors(b),e&&h.data("moduleApi")!==L&&e.stopImmediatePropagation(),f.errorFocus&&(e=!0,"string"==typeof f.errorFocus?(e=(n=M(f.errorFocus)).is("[tabindex]"))||n.attr("tabindex",-1):n=d.filter("."+p.error).first().find(g.field),n.focus(),e||n.removeAttr("tabindex")),!0!==t)return f.onFailure.call(v,b,i)},field:function(i,e,o){o=o===L||o,"string"==typeof i&&(w.verbose("Validating field",i),i=l[e=i]);var a=i.identifier||e,t=w.get.field(a),e=!!i.depends&&w.get.field(i.depends),r=!0,s=[];return i.identifier||(w.debug("Using field name as identifier",a),i.identifier=a),!t.filter(":not(:disabled)").length?w.debug("Field is disabled. Skipping",a):i.optional&&w.is.blank(t)?w.debug("Field is optional and blank. Skipping",a):i.depends&&w.is.empty(e)?w.debug("Field depends on another value that is not present or empty. Skipping",e):i.rules!==L&&(o&&t.closest(d).removeClass(p.error),M.each(i.rules,function(e,t){var n;!w.has.field(a)||0<(n=w.validate.rule(i,t,!0)||[]).length&&(w.debug("Field is invalid",a,t.type),s.push(w.get.prompt(t,i)),r=!1,o&&M(n).closest(d).addClass(p.error))})),r?(o&&(w.remove.prompt(a,s),f.onValid.call(t)),!0):(o&&(b=b.concat(s),w.add.prompt(a,s,!0),f.onInvalid.call(t,s)),!1)},rule:function(e,n,t){function i(e){var t=(t=(l?M(e).filter(":checked"):M(e)).val())===L||""===t||null===t?"":f.shouldTrim&&!1!==n.shouldTrim||n.shouldTrim?String(t+"").trim():String(t+"");return r.call(e,t,a,h)}var o=w.get.field(e.identifier),a=w.get.ancillaryValue(n),e=w.get.ruleName(n),r=f.rules[e],s=[],l=o.is(g.checkbox);if(M.isFunction(r))return l?i(o)||(s=o):M.each(o,function(e,t){i(t)||s.push(t)}),t?s:!(0<s.length);w.error(c.noRule,e)}},setting:function(e,t){if(M.isPlainObject(e))M.extend(!0,f,e);else{if(t===L)return f[e];f[e]=t}},internal:function(e,t){if(M.isPlainObject(e))M.extend(!0,w,e);else{if(t===L)return w[e];w[e]=t}},debug:function(){!f.silent&&f.debug&&(f.performance?w.performance.log(arguments):(w.debug=Function.prototype.bind.call(console.info,console,f.name+":"),w.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?w.performance.log(arguments):(w.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),w.verbose.apply(console,arguments)))},error:function(){f.silent||(w.error=Function.prototype.bind.call(console.error,console,f.name+":"),w.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(A||t),A=t,E.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:v,"Execution Time":n})),clearTimeout(w.performance.timer),w.performance.timer=setTimeout(w.performance.display,500)},display:function(){var e=f.name+":",n=0;A=!1,clearTimeout(w.performance.timer),M.each(E,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",D&&(e+=" '"+D+"'"),1<S.length&&(e+=" ("+S.length+")"),(console.group!==L||console.table!==L)&&0<E.length&&(console.groupCollapsed(e),console.table?console.table(E):M.each(E,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),E=[]}},invoke:function(i,e,t){var o,a,n,r=u;return e=e||R,t=v||t,"string"==typeof i&&r!==L&&(i=i.split(/[\. ]/),o=i.length-1,M.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(M.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==L)return a=r[n],!1;{if(!M.isPlainObject(r[t])||e==o)return r[t]!==L&&(a=r[t]),!1;r=r[t]}}})),M.isFunction(a)?n=a.apply(t,e):a!==L&&(n=a),Array.isArray(T)?T.push(n):T!==L?T=[T,n]:n!==L&&(T=n),a}};w.initialize()}),T!==L?T:this},M.fn.form.settings={name:"Form",namespace:"form",debug:!1,verbose:!1,performance:!0,fields:!1,keyboardShortcuts:!0,on:"submit",inline:!1,delay:200,revalidate:!0,shouldTrim:!0,transition:"scale",duration:200,autoCheckRequired:!1,preventLeaving:!1,errorFocus:!1,dateHandling:"date",onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},onDirty:function(){},onClean:function(){},metadata:{defaultValue:"default",validate:"validate",isDirty:"isDirty"},regExp:{htmlID:/^[a-zA-Z][\w:.-]*$/g,bracket:/\[(.*)\]/i,decimal:/^\d+\.?\d*$/,email:/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|:,=@]/g,flags:/^\/(.*)\/(.*)?/,integer:/^\-?\d+$/,number:/^\-?\d*(\.\d+)?$/,url:/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i},text:{and:"and",unspecifiedRule:"Please enter a valid value",unspecifiedField:"This field",leavingMessage:"There are unsaved changes on this page which will be discarded if you continue."},prompt:{range:"{name} must be in a range from {min} to {max}",maxValue:"{name} must have a maximum value of {ruleValue}",minValue:"{name} must have a minimum value of {ruleValue}",empty:"{name} must have a value",checked:"{name} must be checked",email:"{name} must be a valid e-mail",url:"{name} must be a valid url",regExp:"{name} is not formatted correctly",integer:"{name} must be an integer",decimal:"{name} must be a decimal number",number:"{name} must be set to a number",is:'{name} must be "{ruleValue}"',isExactly:'{name} must be exactly "{ruleValue}"',not:'{name} cannot be set to "{ruleValue}"',notExactly:'{name} cannot be set to exactly "{ruleValue}"',contain:'{name} must contain "{ruleValue}"',containExactly:'{name} must contain exactly "{ruleValue}"',doesntContain:'{name} cannot contain  "{ruleValue}"',doesntContainExactly:'{name} cannot contain exactly "{ruleValue}"',minLength:"{name} must be at least {ruleValue} characters",length:"{name} must be at least {ruleValue} characters",exactLength:"{name} must be exactly {ruleValue} characters",maxLength:"{name} cannot be longer than {ruleValue} characters",match:"{name} must match {ruleValue} field",different:"{name} must have a different value than {ruleValue} field",creditCard:"{name} must be a valid credit card number",minCount:"{name} must have at least {ruleValue} choices",exactCount:"{name} must have exactly {ruleValue} choices",maxCount:"{name} must have {ruleValue} or less choices"},selector:{checkbox:'input[type="checkbox"], input[type="radio"]',clear:".clear",field:'input:not(.search):not([type="file"]), textarea, select',group:".field",input:'input:not([type="file"])',message:".error.message",prompt:".prompt.label",radio:'input[type="radio"]',reset:'.reset:not([type="reset"])',submit:'.submit:not([type="submit"])',uiCheckbox:".ui.checkbox",uiDropdown:".ui.dropdown",uiCalendar:".ui.calendar"},className:{error:"error",label:"ui basic red pointing prompt label",pressed:"down",success:"success",required:"required",disabled:"disabled"},error:{identifier:"You must specify a string identifier for each field",method:"The method you called is not defined.",noRule:"There is no rule matching the one you specified",oldSyntax:"Starting in 2.0 forms now only take a single settings object. Validation settings converted to new syntax automatically.",noElement:"This module requires ui {element}"},templates:{error:function(e){var n='<ul class="list">';return M.each(e,function(e,t){n+="<li>"+t+"</li>"}),M(n+="</ul>")},prompt:function(e,t){return M("<div/>").addClass(t).html(e[0])}},formatter:{date:function(e){return Intl.DateTimeFormat("en-GB").format(e)},datetime:function(e){return Intl.DateTimeFormat("en-GB",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)},time:function(e){return Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(e)},month:function(e){return Intl.DateTimeFormat("en-GB",{month:"2-digit",year:"numeric"}).format(e)},year:function(e){return Intl.DateTimeFormat("en-GB",{year:"numeric"}).format(e)}},rules:{empty:function(e){return!(e===L||""===e||Array.isArray(e)&&0===e.length)},checked:function(){return 0<M(this).filter(":checked").length},email:function(e){return M.fn.form.settings.regExp.email.test(e)},url:function(e){return M.fn.form.settings.regExp.url.test(e)},regExp:function(e,t){if(t instanceof RegExp)return e.match(t);var n,i=t.match(M.fn.form.settings.regExp.flags);return i&&(t=2<=i.length?i[1]:t,n=3<=i.length?i[2]:""),e.match(new RegExp(t,n))},minValue:function(e,t){return M.fn.form.settings.rules.range(e,t+"..","number")},maxValue:function(e,t){return M.fn.form.settings.rules.range(e,".."+t,"number")},integer:function(e,t){return M.fn.form.settings.rules.range(e,t,"integer")},range:function(e,t,n){var i,o;return(n="string"==typeof n?M.fn.form.settings.regExp[n]:n)instanceof RegExp||(n=M.fn.form.settings.regExp.integer),t&&-1===["",".."].indexOf(t)&&(-1==t.indexOf("..")?n.test(t)&&(i=o=+t):(t=t.split("..",2),n.test(t[0])&&(i=+t[0]),n.test(t[1])&&(o=+t[1]))),n.test(e)&&(i===L||i<=e)&&(o===L||e<=o)},decimal:function(e,t){return M.fn.form.settings.rules.range(e,t,"decimal")},number:function(e,t){return M.fn.form.settings.rules.range(e,t,"number")},is:function(e,t){return t="string"==typeof t?t.toLowerCase():t,(e="string"==typeof e?e.toLowerCase():e)==t},isExactly:function(e,t){return e==t},not:function(e,t){return(e="string"==typeof e?e.toLowerCase():e)!=(t="string"==typeof t?t.toLowerCase():t)},notExactly:function(e,t){return e!=t},contains:function(e,t){return t=t.replace(M.fn.form.settings.regExp.escape,"\\$&"),-1!==e.search(new RegExp(t,"i"))},containsExactly:function(e,t){return t=t.replace(M.fn.form.settings.regExp.escape,"\\$&"),-1!==e.search(new RegExp(t))},doesntContain:function(e,t){return t=t.replace(M.fn.form.settings.regExp.escape,"\\$&"),-1===e.search(new RegExp(t,"i"))},doesntContainExactly:function(e,t){return t=t.replace(M.fn.form.settings.regExp.escape,"\\$&"),-1===e.search(new RegExp(t))},minLength:function(e,t){return e!==L&&e.length>=t},length:function(e,t){return e!==L&&e.length>=t},exactLength:function(e,t){return e!==L&&e.length==t},maxLength:function(e,t){return e!==L&&e.length<=t},match:function(e,t,n){var i,o;return 0<(o=n.find('[data-validate="'+t+'"]')).length||0<(o=n.find("#"+t)).length||0<(o=n.find('[name="'+t+'"]')).length?i=o.val():0<(o=n.find('[name="'+t+'[]"]')).length&&(i=o),i!==L&&e.toString()==i.toString()},different:function(e,t,n){var i,o;return 0<(o=n.find('[data-validate="'+t+'"]')).length||0<(o=n.find("#"+t)).length||0<(o=n.find('[name="'+t+'"]')).length?i=o.val():0<(o=n.find('[name="'+t+'[]"]')).length&&(i=o),i!==L&&e.toString()!==i.toString()},creditCard:function(n,e){var i,o,a={visa:{pattern:/^4/,length:[16]},amex:{pattern:/^3[47]/,length:[15]},mastercard:{pattern:/^5[1-5]/,length:[16]},discover:{pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,length:[16]},unionPay:{pattern:/^(62|88)/,length:[16,17,18,19]},jcb:{pattern:/^35(2[89]|[3-8][0-9])/,length:[16]},maestro:{pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,length:[12,13,14,15,16,17,18,19]},dinersClub:{pattern:/^(30[0-5]|^36)/,length:[14]},laser:{pattern:/^(6304|670[69]|6771)/,length:[16,17,18,19]},visaElectron:{pattern:/^(4026|417500|4508|4844|491(3|7))/,length:[16]}},r=!1,e="string"==typeof e&&e.split(",");if("string"==typeof n&&0!==n.length){if(n=n.replace(/[\s\-]/g,""),e&&(M.each(e,function(e,t){(o=a[t])&&(i={length:-1!==M.inArray(n.length,o.length),pattern:-1!==n.search(o.pattern)}).length&&i.pattern&&(r=!0)}),!r))return!1;if((e={number:-1!==M.inArray(n.length,a.unionPay.length),pattern:-1!==n.search(a.unionPay.pattern)}).number&&e.pattern)return!0;for(var t=n.length,s=0,l=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],c=0;t--;)c+=l[s][parseInt(n.charAt(t),10)],s^=1;return c%10==0&&0<c}},minCount:function(e,t){return 0==t||(1==t?""!==e:e.split(",").length>=t)},exactCount:function(e,t){return 0==t?""===e:1==t?""!==e&&-1===e.search(","):e.split(",").length==t},maxCount:function(e,t){return 0!=t&&(1==t?-1===e.search(","):e.split(",").length<=t)}}}}(jQuery,window,document),function(k,T,S){"use strict";k.isFunction=k.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},T=void 0!==T&&T.Math==Math?T:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),k.fn.accordion=function(a){var h,v=k(this),b=(new Date).getTime(),y=[],x=a,C="string"==typeof x,w=[].slice.call(arguments,1);return v.each(function(){var e,r=k.isPlainObject(a)?k.extend(!0,{},k.fn.accordion.settings,a):k.extend({},k.fn.accordion.settings),s=r.className,t=r.namespace,l=r.selector,c=r.error,n="."+t,i="module-"+t,o=v.selector||"",u=k(this),d=u.find(l.title),f=u.find(l.content),m=this,g=u.data(i),p={initialize:function(){p.debug("Initializing",u),p.bind.events(),r.observeChanges&&p.observeChanges(),p.instantiate()},instantiate:function(){g=p,u.data(i,p)},destroy:function(){p.debug("Destroying previous instance",u),u.off(n).removeData(i)},refresh:function(){d=u.find(l.title),f=u.find(l.content)},observeChanges:function(){"MutationObserver"in T&&((e=new MutationObserver(function(e){p.debug("DOM tree modified, updating selector cache"),p.refresh()})).observe(m,{childList:!0,subtree:!0}),p.debug("Setting up mutation observer",e))},bind:{events:function(){p.debug("Binding delegated events"),u.on(r.on+n,l.trigger,p.event.click)}},event:{click:function(){p.toggle.call(this)}},toggle:function(e){var t=e!==S?"number"==typeof e?d.eq(e):k(e).closest(l.title):k(this).closest(l.title),n=t.next(f),i=n.hasClass(s.animating),e=n.hasClass(s.active),n=e&&!i,i=!e&&i;p.debug("Toggling visibility of content",t),n||i?r.collapsible?p.close.call(t):p.debug("Cannot close accordion content collapsing is disabled"):p.open.call(t)},open:function(e){var t=e!==S?"number"==typeof e?d.eq(e):k(e).closest(l.title):k(this).closest(l.title),n=t.next(f),e=n.hasClass(s.animating);n.hasClass(s.active)||e?p.debug("Accordion already open, skipping",n):(p.debug("Opening accordion content",t),r.onOpening.call(n),r.onChanging.call(n),r.exclusive&&p.closeOthers.call(t),t.addClass(s.active),n.stop(!0,!0).addClass(s.animating),r.animateChildren&&(k.fn.transition!==S&&u.transition("is supported")?n.children().transition({animation:"fade in",queue:!1,useFailSafe:!0,debug:r.debug,verbose:r.verbose,duration:r.duration,skipInlineHidden:!0,onComplete:function(){n.children().removeClass(s.transition)}}):n.children().stop(!0,!0).animate({opacity:1},r.duration,p.resetOpacity)),n.slideDown(r.duration,r.easing,function(){n.removeClass(s.animating).addClass(s.active),p.reset.display.call(this),r.onOpen.call(this),r.onChange.call(this)}))},close:function(e){var t=e!==S?"number"==typeof e?d.eq(e):k(e).closest(l.title):k(this).closest(l.title),n=t.next(f),i=n.hasClass(s.animating),e=n.hasClass(s.active);!e&&!(!e&&i)||e&&i||(p.debug("Closing accordion content",n),r.onClosing.call(n),r.onChanging.call(n),t.removeClass(s.active),n.stop(!0,!0).addClass(s.animating),r.animateChildren&&(k.fn.transition!==S&&u.transition("is supported")?n.children().transition({animation:"fade out",queue:!1,useFailSafe:!0,debug:r.debug,verbose:r.verbose,duration:r.duration,skipInlineHidden:!0}):n.children().stop(!0,!0).animate({opacity:0},r.duration,p.resetOpacity)),n.slideUp(r.duration,r.easing,function(){n.removeClass(s.animating).removeClass(s.active),p.reset.display.call(this),r.onClose.call(this),r.onChange.call(this)}))},closeOthers:function(e){var t,n=e!==S?d.eq(e):k(this).closest(l.title),i=n.parents(l.content).prev(l.title),o=n.closest(l.accordion),e=l.title+"."+s.active+":visible",n=l.content+"."+s.active+":visible",a=r.closeNested?(t=o.find(e).not(i)).next(f):(t=o.find(e).not(i),a=o.find(n).find(e).not(i),(t=t.not(a)).next(f));0<t.length&&(p.debug("Exclusive enabled, closing other content",t),t.removeClass(s.active),a.removeClass(s.animating).stop(!0,!0),r.animateChildren&&(k.fn.transition!==S&&u.transition("is supported")?a.children().transition({animation:"fade out",useFailSafe:!0,debug:r.debug,verbose:r.verbose,duration:r.duration,skipInlineHidden:!0}):a.children().stop(!0,!0).animate({opacity:0},r.duration,p.resetOpacity)),a.slideUp(r.duration,r.easing,function(){k(this).removeClass(s.active),p.reset.display.call(this)}))},reset:{display:function(){p.verbose("Removing inline display from element",this),k(this).css("display",""),""===k(this).attr("style")&&k(this).attr("style","").removeAttr("style")},opacity:function(){p.verbose("Removing inline opacity from element",this),k(this).css("opacity",""),""===k(this).attr("style")&&k(this).attr("style","").removeAttr("style")}},setting:function(e,t){if(p.debug("Changing setting",e,t),k.isPlainObject(e))k.extend(!0,r,e);else{if(t===S)return r[e];k.isPlainObject(r[e])?k.extend(!0,r[e],t):r[e]=t}},internal:function(e,t){if(p.debug("Changing internal",e,t),t===S)return p[e];k.isPlainObject(e)?k.extend(!0,p,e):p[e]=t},debug:function(){!r.silent&&r.debug&&(r.performance?p.performance.log(arguments):(p.debug=Function.prototype.bind.call(console.info,console,r.name+":"),p.debug.apply(console,arguments)))},verbose:function(){!r.silent&&r.verbose&&r.debug&&(r.performance?p.performance.log(arguments):(p.verbose=Function.prototype.bind.call(console.info,console,r.name+":"),p.verbose.apply(console,arguments)))},error:function(){r.silent||(p.error=Function.prototype.bind.call(console.error,console,r.name+":"),p.error.apply(console,arguments))},performance:{log:function(e){var t,n;r.performance&&(n=(t=(new Date).getTime())-(b||t),b=t,y.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:m,"Execution Time":n})),clearTimeout(p.performance.timer),p.performance.timer=setTimeout(p.performance.display,500)},display:function(){var e=r.name+":",n=0;b=!1,clearTimeout(p.performance.timer),k.each(y,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",o&&(e+=" '"+o+"'"),(console.group!==S||console.table!==S)&&0<y.length&&(console.groupCollapsed(e),console.table?console.table(y):k.each(y,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),y=[]}},invoke:function(i,e,t){var o,a,n,r=g;return e=e||w,t=m||t,"string"==typeof i&&r!==S&&(i=i.split(/[\. ]/),o=i.length-1,k.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(k.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==S)return a=r[n],!1;{if(!k.isPlainObject(r[t])||e==o)return r[t]!==S?a=r[t]:p.error(c.method,i),!1;r=r[t]}}})),k.isFunction(a)?n=a.apply(t,e):a!==S&&(n=a),Array.isArray(h)?h.push(n):h!==S?h=[h,n]:n!==S&&(h=n),a}};C?(g===S&&p.initialize(),p.invoke(x)):(g!==S&&g.invoke("destroy"),p.initialize())}),h!==S?h:this},k.fn.accordion.settings={name:"Accordion",namespace:"accordion",silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",observeChanges:!0,exclusive:!0,collapsible:!0,closeNested:!1,animateChildren:!0,duration:350,easing:"easeOutQuad",onOpening:function(){},onClosing:function(){},onChanging:function(){},onOpen:function(){},onClose:function(){},onChange:function(){},error:{method:"The method you called is not defined"},className:{active:"active",animating:"animating",transition:"transition"},selector:{accordion:".accordion",title:".title",trigger:".title",content:".content"}},k.extend(k.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,void document),function(oe,S,D,ae){"use strict";oe.isFunction=oe.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},S=void 0!==S&&S.Math==Math?S:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),oe.fn.calendar=function(h){var v,e=oe(this),b=e.selector||"",y=(new Date).getTime(),x=[],C=h,w="string"==typeof C,k=[].slice.call(arguments,1),T={5:{row:4,column:3},10:{row:3,column:2},15:{row:2,column:2},20:{row:3,column:1},30:{row:2,column:1}},ie=["","one","two","three","four","five","six","seven","eight"];return e.each(function(){var d,e,$=oe.isPlainObject(h)?oe.extend(!0,{},oe.fn.calendar.settings,h):oe.extend({},oe.fn.calendar.settings),G=$.className,t=$.namespace,i=$.selector,J=$.formatter,n=$.parser,Z=$.metadata,_=T[$.minTimeGap],s=$.error,o="."+t,a="module-"+t,r=oe(this),l=r.find(i.input),ee=r.find(i.popup),c=r.find(i.activator),u=this,f=r.data(a),m=!1,te=r.hasClass(G.inverted),g=!1,p=!1,ne={initialize:function(){ne.debug("Initializing calendar for",u,r),d=ne.get.isTouch(),ne.setup.config(),ne.setup.popup(),ne.setup.inline(),ne.setup.input(),ne.setup.date(),ne.create.calendar(),ne.bind.events(),ne.observeChanges(),ne.instantiate()},instantiate:function(){ne.verbose("Storing instance of calendar"),f=ne,r.data(a,f)},destroy:function(){ne.verbose("Destroying previous calendar for",u),r.removeData(a),ne.unbind.events(),ne.disconnect.classObserver()},setup:{config:function(){null!==ne.get.minDate()&&ne.set.minDate(r.data(Z.minDate)),null!==ne.get.maxDate()&&ne.set.maxDate(r.data(Z.maxDate)),ne.setting("type",ne.get.type()),ne.setting("on",$.on||(l.length?"focus":"click"))},popup:function(){var e,t,n;$.inline||(c.length||(c=r.children().first()).length)&&(oe.fn.popup!==ae?(ee.length||(n=0!==(t=c.parent()).closest(i.append).length?"appendTo":"prependTo",ee=oe("<div/>").addClass(G.popup)[n](t)),ee.addClass(G.calendar),te&&ee.addClass(G.inverted),e=function(){return ne.refreshTooltips(),$.onVisible.apply(ee,arguments)},n=$.onHidden,l.length||(ee.attr("tabindex","0"),e=function(){return ne.refreshTooltips(),ne.focus(),$.onVisible.apply(ee,arguments)},n=function(){return ne.blur(),$.onHidden.apply(ee,arguments)}),t=ne.setting("on"),n=oe.extend({},$.popupOptions,{popup:ee,on:t,hoverable:"hover"===t,closable:"click"===t,onShow:function(){return ne.set.focusDate(ne.get.date()),ne.set.mode(ne.get.validatedMode($.startMode)),$.onShow.apply(ee,arguments)},onVisible:e,onHide:$.onHide,onHidden:n}),ne.popup(n)):ne.error(s.popup))},inline:function(){c.length&&!$.inline||($.inline=!0,ee=oe("<div/>").addClass(G.calendar).appendTo(r),l.length||ee.attr("tabindex","0"))},input:function(){$.touchReadonly&&l.length&&d&&l.prop("readonly",!0),ne.check.disabled()},date:function(){var e;$.initialDate?e=n.date($.initialDate,$):r.data(Z.date)!==ae?e=n.date(r.data(Z.date),$):l.length&&(e=n.date(l.val(),$)),ne.set.date(e,$.formatInput,!1),ne.set.mode(ne.get.mode(),!1)}},trigger:{change:function(){var e,t=l[0];t&&(e=D.createEvent("HTMLEvents"),ne.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},create:{calendar:function(){var e,t,n,i=ne.get.mode(),o=new Date,a=ne.get.date(),r=ne.get.focusDate(),s=ne.helper.dateInRange(r||a||$.initialDate||o);r||ne.set.focusDate(r=s,!1,!1);var l="year"===i,c="month"===i,u="day"===i,d="hour"===i,f="minute"===i,m="time"===$.type,g=Math.max($.multiMonth,1),p=u?ne.get.monthOffset():0,h=s.getMinutes(),v=s.getHours(),b=s.getDate(),y=s.getMonth()+p,x=s.getFullYear(),C=u?$.showWeekNumbers?8:7:d?4:_.column,w=u||d?6:_.row,k=u?g:1,T=ee,S=T.hasClass("left")?"right center":"left center";for(T.empty(),1<k&&(n=oe("<div/>").addClass(G.grid).appendTo(T)),t=0;t<k;t++){1<k&&(T=oe("<div/>").addClass(G.column).appendTo(n));var D=y+t,A=(new Date(x,D,1).getDay()-$.firstDayOfWeek%7+7)%7;!$.constantHeight&&u&&(j=new Date(x,D+1,0).getDate()+A,w=Math.ceil(j/7));var E=l?10:c?1:0,F=u?1:0,P=d||f?1:0,O=d||f?b:1,R=new Date(x-E,D-F,O-P,v),M=new Date(x+E,D+F,O+P,v),I=l?new Date(10*Math.ceil(x/10)-9,0,0):c?new Date(x,0,0):u?new Date(x,D,0):new Date(x,D,b,-1),j=l?new Date(10*Math.ceil(x/10)+1,0,1):c?new Date(x+1,0,1):u?new Date(x,D+1,1):new Date(x,D,b+1),E=i;u&&$.showWeekNumbers&&(E+=" andweek");F=oe("<table/>").addClass(G.table).addClass(E).addClass(ie[C]+" column").appendTo(T);te&&F.addClass(G.inverted);var L=C;if(!m){var O=oe("<thead/>").appendTo(F),V=oe("<tr/>").appendTo(O),q=oe("<th/>").attr("colspan",""+C).appendTo(V),P=l||c?new Date(x,0,1):u?new Date(x,D,1):new Date(x,D,b,v,h),E=oe("<span/>").addClass(G.link).appendTo(q);E.text(J.header(P,i,$));var z,P=c?$.disableYear?"day":"year":u?$.disableMonth?"year":"month":"day";if(E.data(Z.mode,P),0===t&&((z=oe("<span/>").addClass(G.prev).appendTo(q)).data(Z.focusDate,R),z.toggleClass(G.disabledCell,!ne.helper.isDateInRange(I,i)),oe("<i/>").addClass(G.prevIcon).appendTo(z)),t===k-1&&((z=oe("<span/>").addClass(G.next).appendTo(q)).data(Z.focusDate,M),z.toggleClass(G.disabledCell,!ne.helper.isDateInRange(j,i)),oe("<i/>").addClass(G.nextIcon).appendTo(z)),u)for(V=oe("<tr/>").appendTo(O),$.showWeekNumbers&&((q=oe("<th/>").appendTo(V)).text($.text.weekNo),q.addClass(G.weekCell),L--),H=0;H<L;H++)(q=oe("<th/>").appendTo(V)).text(J.dayColumnHeader((H+$.firstDayOfWeek)%7,$))}for(var N=oe("<tbody/>").appendTo(F),H=l?10*Math.ceil(x/10)-9:u?1-A:0,U=0;U<w;U++)for(V=oe("<tr/>").appendTo(N),u&&$.showWeekNumbers&&((q=oe("<th/>").appendTo(V)).text(ne.get.weekOfYear(x,D,H+1-$.firstDayOfWeek)),q.addClass(G.weekCell)),e=0;e<L;e++,H++){var B=l?new Date(H,D,1,v,h):c?new Date(x,H,1,v,h):u?new Date(x,D,H,v,h):d?new Date(x,D,b,H):new Date(x,D,b,v,H*$.minTimeGap),W=l?H:c?$.text.monthsShort[H]:u?B.getDate():J.time(B,$,!0);(q=oe("<td/>").addClass(G.cell).appendTo(V)).text(W),q.data(Z.date,B);var Y,Q=u&&B.getMonth()!==(D+12)%12,X=!$.selectAdjacentDays&&Q||!ne.helper.isDateInRange(B,i)||$.isDisabled(B,i)||ne.helper.isDisabled(B,i)||!ne.helper.isEnabled(B,i);X?null!==(K=ne.helper.findDayAsObject(B,i,$.disabledDates))&&K[Z.message]&&(q.attr("data-tooltip",K[Z.message]),q.attr("data-position",K[Z.position]||S),(K[Z.inverted]||te&&K[Z.inverted]===ae)&&q.attr("data-inverted",""),K[Z.variation]&&q.attr("data-variation",K[Z.variation])):null!==(Y=ne.helper.findDayAsObject(B,i,$.eventDates))&&(q.addClass(Y[Z.class]||$.eventClass),Y[Z.message]&&(q.attr("data-tooltip",Y[Z.message]),q.attr("data-position",Y[Z.position]||S),(Y[Z.inverted]||te&&Y[Z.inverted]===ae)&&q.attr("data-inverted",""),Y[Z.variation]&&q.attr("data-variation",Y[Z.variation])));var W=ne.helper.dateEqual(B,a,i),K=ne.helper.dateEqual(B,o,i);q.toggleClass(G.adjacentCell,Q&&!Y),q.toggleClass(G.disabledCell,X),q.toggleClass(G.activeCell,W&&!(Q&&X)),d||f||q.toggleClass(G.todayCell,!Q&&K),J.cell(q,B,{mode:i,adjacent:Q,disabled:X,active:W,today:K}),ne.helper.dateEqual(B,r,i)&&ne.set.focusDate(B,!1,!1)}$.today&&(A=oe("<tr/>").appendTo(N),(A=oe("<td/>").attr("colspan",""+C).addClass(G.today).appendTo(A)).text(J.today($)),A.data(Z.date,o)),ne.update.focus(!1,F),$.inline&&ne.refreshTooltips()}}},update:{focus:function(e,t){t=t||ee;var r=ne.get.mode(),n=ne.get.date(),s=ne.get.focusDate(),l=ne.get.startDate(),c=ne.get.endDate(),u=(e?s:null)||n||(d?null:s);t.find("td").each(function(){var e,t,n,i,o=oe(this),a=o.data(Z.date);a&&(e=o.hasClass(G.disabledCell),t=o.hasClass(G.activeCell),n=o.hasClass(G.adjacentCell),i=ne.helper.dateEqual(a,s,r),a=!!u&&(!!l&&ne.helper.isDateInRange(a,r,l,u)||!!c&&ne.helper.isDateInRange(a,r,u,c)),o.toggleClass(G.focusCell,i&&(!d||m)&&(!n||$.selectAdjacentDays&&n)&&!e),ne.helper.isTodayButton(o)||o.toggleClass(G.rangeCell,a&&!t&&!e))})}},refresh:function(){ne.create.calendar()},refreshTooltips:function(){var i=oe(S).width();ee.find("td[data-position]").each(function(){var e=oe(this),t=S.getComputedStyle(e[0],":after").width.replace(/[^0-9\.]/g,""),n=e.attr("data-position"),t=i-e.width()-(parseInt(t,10)||250)>e.offset().left?"right":"left";-1===n.indexOf(t)&&e.attr("data-position",n.replace(/(left|right)/,t))})},bind:{events:function(){ne.debug("Binding events"),ee.on("mousedown"+o,ne.event.mousedown),ee.on("touchstart"+o,ne.event.mousedown),ee.on("mouseup"+o,ne.event.mouseup),ee.on("touchend"+o,ne.event.mouseup),ee.on("mouseover"+o,ne.event.mouseover),l.length?(l.on("input"+o,ne.event.inputChange),l.on("focus"+o,ne.event.inputFocus),l.on("blur"+o,ne.event.inputBlur),l.on("keydown"+o,ne.event.keydown)):ee.on("keydown"+o,ne.event.keydown)}},unbind:{events:function(){ne.debug("Unbinding events"),ee.off(o),l.length&&l.off(o)}},event:{mouseover:function(e){var t=oe(e.target).data(Z.date),e=1===e.buttons;t&&ne.set.focusDate(t,!1,!0,e)},mousedown:function(e){l.length&&e.preventDefault(),m=0<=e.type.indexOf("touch");e=oe(e.target).data(Z.date);e&&ne.set.focusDate(e,!1,!0,!0)},mouseup:function(e){ne.focus(),e.preventDefault(),e.stopPropagation(),m=!1;var t,n,i=oe(e.target);i.hasClass("disabled")||(t=(i=(n=i.parent()).data(Z.date)||n.data(Z.focusDate)||n.data(Z.mode)?n:i).data(Z.date),e=i.data(Z.focusDate),n=i.data(Z.mode),t&&!1!==$.onSelect.call(u,t,ne.get.mode())?(i=i.hasClass(G.today),ne.selectDate(t,i)):e?ne.set.focusDate(e):n&&ne.set.mode(n))},keydown:function(e){var t,n,i,o,a,r,s,l=e.which;27!==l&&9!==l||ne.popup("hide"),ne.popup("is visible")&&(37===l||38===l||39===l||40===l?(a="day"===(r=ne.get.mode())?7:"hour"===r?4:"minute"===r?_.column:3,s=37===l?-1:38===l?-a:39==l?1:a,s*="minute"===r?$.minTimeGap:1,n=(t=ne.get.focusDate()||ne.get.date()||new Date).getFullYear()+("year"===r?s:0),i=t.getMonth()+("month"===r?s:0),o=t.getDate()+("day"===r?s:0),a=t.getHours()+("hour"===r?s:0),s=t.getMinutes()+("minute"===r?s:0),s=new Date(n,i,o,a,s),"time"===$.type&&(s=ne.helper.mergeDateTime(t,s)),ne.helper.isDateInRange(s,r)&&ne.set.focusDate(s)):13===l&&(r=ne.get.mode(),(s=ne.get.focusDate())&&!$.isDisabled(s,r)&&!ne.helper.isDisabled(s,r)&&ne.helper.isEnabled(s,r)&&ne.selectDate(s),e.preventDefault(),e.stopPropagation())),38!==l&&40!==l||(e.preventDefault(),ne.popup("show"))},inputChange:function(){var e=l.val(),e=n.date(e,$);ne.set.date(e,!1)},inputFocus:function(){ee.addClass(G.active)},inputBlur:function(){var e;ee.removeClass(G.active),$.formatInput&&(e=ne.get.date(),e=J.datetime(e,$),l.val(e)),p&&(ne.trigger.change(),p=!1)},class:{mutation:function(e){e.forEach(function(e){"class"===e.attributeName&&ne.check.disabled()})}}},observeChanges:function(){"MutationObserver"in S&&(e=new MutationObserver(ne.event.class.mutation),ne.debug("Setting up mutation observer",e),ne.observe.class())},disconnect:{classObserver:function(){l.length&&e&&e.disconnect()}},observe:{class:function(){l.length&&e&&e.observe(r[0],{attributes:!0})}},is:{disabled:function(){return r.hasClass(G.disabled)}},check:{disabled:function(){l.attr("tabindex",ne.is.disabled()?-1:0)}},get:{weekOfYear:function(e,t,n){return t=Date.UTC(e,t,n+3)/864e5,n=Math.floor(t/7),t=new Date(6048e5*n).getUTCFullYear(),n-Math.floor(Date.UTC(t,0,7)/6048e5)+1},date:function(){return ne.helper.sanitiseDate(r.data(Z.date))||null},inputDate:function(){return l.val()},focusDate:function(){return r.data(Z.focusDate)||null},startDate:function(){var e=ne.get.calendarModule($.startCalendar);return(e?e.get.date():r.data(Z.startDate))||null},endDate:function(){var e=ne.get.calendarModule($.endCalendar);return(e?e.get.date():r.data(Z.endDate))||null},minDate:function(){return r.data(Z.minDate)||null},maxDate:function(){return r.data(Z.maxDate)||null},monthOffset:function(){return r.data(Z.monthOffset)||0},mode:function(){var e=r.data(Z.mode)||$.startMode;return ne.get.validatedMode(e)},validatedMode:function(e){var t=ne.get.validModes();return 0<=oe.inArray(e,t)?e:"time"===$.type?"hour":"month"===$.type?"month":"year"===$.type?"year":"day"},type:function(){return r.data(Z.type)||$.type},validModes:function(){var e=[];return"time"!==$.type&&($.disableYear&&"year"!==$.type||e.push("year"),($.disableMonth||"year"===$.type)&&"month"!==$.type||e.push("month"),0<=$.type.indexOf("date")&&e.push("day")),0<=$.type.indexOf("time")&&(e.push("hour"),$.disableMinute||e.push("minute")),e},isTouch:function(){try{return D.createEvent("TouchEvent"),!0}catch(e){return!1}},calendarModule:function(e){return e?(e=!(e instanceof oe)?oe(e).first():e).data(a):null}},set:{date:function(e,t,n){t=!1!==t,n=!1!==n,e=ne.helper.sanitiseDate(e),e=ne.helper.dateInRange(e);var i=ne.get.mode(),o=J.datetime(e,$);if(n&&!1===$.onBeforeChange.call(u,e,o,i))return!1;if(ne.set.focusDate(e),$.isDisabled(e,i))return!1;var a=ne.get.endDate();a&&e&&a<e&&ne.set.endDate(ae),ne.set.dataKeyValue(Z.date,e),t&&l.length&&l.val(o),n&&$.onChange.call(u,e,o,i)},startDate:function(e,t){e=ne.helper.sanitiseDate(e);var n=ne.get.calendarModule($.startCalendar);n&&n.set.date(e),ne.set.dataKeyValue(Z.startDate,e,t)},endDate:function(e,t){e=ne.helper.sanitiseDate(e);var n=ne.get.calendarModule($.endCalendar);n&&n.set.date(e),ne.set.dataKeyValue(Z.endDate,e,t)},focusDate:function(e,t,n,i){e=ne.helper.sanitiseDate(e),e=ne.helper.dateInRange(e);var o="day"===ne.get.mode(),a=ne.get.focusDate();o&&e&&a&&((a=12*(e.getFullYear()-a.getFullYear())+e.getMonth()-a.getMonth())&&(a=ne.get.monthOffset()-a,ne.set.monthOffset(a,!1)));e=ne.set.dataKeyValue(Z.focusDate,e,!!e&&t);n=!1!==n&&e&&!1===t||g!=i,g=i,n&&ne.update.focus(i)},minDate:function(e){e=ne.helper.sanitiseDate(e),null!==$.maxDate&&$.maxDate<=e?ne.verbose("Unable to set minDate variable bigger that maxDate variable",e,$.maxDate):(ne.setting("minDate",e),ne.set.dataKeyValue(Z.minDate,e))},maxDate:function(e){e=ne.helper.sanitiseDate(e),null!==$.minDate&&$.minDate>=e?ne.verbose("Unable to set maxDate variable lower that minDate variable",e,$.minDate):(ne.setting("maxDate",e),ne.set.dataKeyValue(Z.maxDate,e))},monthOffset:function(e,t){var n=Math.max($.multiMonth,1);e=Math.max(1-n,Math.min(0,e)),ne.set.dataKeyValue(Z.monthOffset,e,t)},mode:function(e,t){ne.set.dataKeyValue(Z.mode,e,t)},dataKeyValue:function(e,t,n){var i=r.data(e),i=i===t||i<=t&&t<=i;return t?r.data(e,t):r.removeData(e),(n=!1!==n&&!i)&&ne.refresh(),!i}},selectDate:function(e,t){ne.verbose("New date selection",e);var n,i=ne.get.mode();t||"minute"===i||$.disableMinute&&"hour"===i||"date"===$.type&&"day"===i||"month"===$.type&&"month"===i||"year"===$.type&&"year"===i?!1===ne.set.date(e)||(p=!0,$.closable&&(ne.popup("hide"),(n=ne.get.calendarModule($.endCalendar))&&("focus"!==n.setting("on")&&n.popup("show"),n.focus()))):(n="year"===i?$.disableMonth?"day":"month":"month"===i?"day":"day"===i?"hour":"minute",ne.set.mode(n),"hour"===i||"day"===i&&ne.get.date()?ne.set.date(e,!0,!1):ne.set.focusDate(e))},changeDate:function(e){ne.set.date(e)},clear:function(){ne.set.date(ae)},popup:function(){return c.popup.apply(c,arguments)},focus:function(){(l.length?l:ee).focus()},blur:function(){(l.length?l:ee).blur()},helper:{isDisabled:function(n,i){return("day"===i||"month"===i||"year"===i)&&("day"===i&&-1!==$.disabledDaysOfWeek.indexOf(n.getDay())||$.disabledDates.some(function(e){if((e="string"==typeof e?ne.helper.sanitiseDate(e):e)instanceof Date)return ne.helper.dateEqual(n,e,i);if(null!==e&&"object"==typeof e){if(e[Z.year])return"number"==typeof e[Z.year]?n.getFullYear()==e[Z.year]:Array.isArray(e[Z.year])?-1<e[Z.year].indexOf(n.getFullYear()):void 0;if(e[Z.month]){if("number"==typeof e[Z.month])return n.getMonth()==e[Z.month];if(Array.isArray(e[Z.month]))return-1<e[Z.month].indexOf(n.getMonth());if(e[Z.month]instanceof Date){var t=ne.helper.sanitiseDate(e[Z.month]);return n.getMonth()==t.getMonth()&&n.getFullYear()==t.getFullYear()}}else if(e[Z.date]&&"day"===i)return e[Z.date]instanceof Date?ne.helper.dateEqual(n,ne.helper.sanitiseDate(e[Z.date]),i):Array.isArray(e[Z.date])?e[Z.date].some(function(e){return ne.helper.dateEqual(n,e,i)}):void 0}}))},isEnabled:function(t,n){return"day"!==n||(0===$.enabledDates.length||$.enabledDates.some(function(e){return(e="string"==typeof e?ne.helper.sanitiseDate(e):e)instanceof Date?ne.helper.dateEqual(t,e,n):null!==e&&"object"==typeof e&&e[Z.date]?ne.helper.dateEqual(t,ne.helper.sanitiseDate(e[Z.date]),n):void 0}))},findDayAsObject:function(t,n,e){if("day"===n||"month"===n||"year"===n)for(var i,o=0;o<e.length;o++){if((i="string"==typeof(i=e[o])?ne.helper.sanitiseDate(i):i)instanceof Date&&ne.helper.dateEqual(t,i,n)){var a={};return a[Z.date]=i,a}if(null!==i&&"object"==typeof i)if(i[Z.year]){if("number"==typeof i[Z.year]&&t.getFullYear()==i[Z.year])return i;if(Array.isArray(i[Z.year])&&-1<i[Z.year].indexOf(t.getFullYear()))return i}else if(i[Z.month]){if("number"==typeof i[Z.month]&&t.getMonth()==i[Z.month])return i;if(Array.isArray(i[Z.month])){if(-1<i[Z.month].indexOf(t.getMonth()))return i}else if(i[Z.month]instanceof Date){a=ne.helper.sanitiseDate(i[Z.month]);if(t.getMonth()==a.getMonth()&&t.getFullYear()==a.getFullYear())return i}}else if(i[Z.date]&&"day"===n){if(i[Z.date]instanceof Date&&ne.helper.dateEqual(t,ne.helper.sanitiseDate(i[Z.date]),n))return i;if(Array.isArray(i[Z.date])&&i[Z.date].some(function(e){return ne.helper.dateEqual(t,e,n)}))return i}}return null},sanitiseDate:function(e){return!(e=!(e instanceof Date)?n.date(""+e,$):e)||isNaN(e.getTime())?null:e},dateDiff:function(e,t,n){var i="time"===$.type,o="year"===(n=n||"day"),a=o||"month"===n,r="minute"===n,n=r||"hour"===n;return e=new Date(i?2e3:e.getFullYear(),i||o?0:e.getMonth(),i||a?1:e.getDate(),n?e.getHours():0,r?$.minTimeGap*Math.floor(e.getMinutes()/$.minTimeGap):0),(t=new Date(i?2e3:t.getFullYear(),i||o?0:t.getMonth(),i||a?1:t.getDate(),n?t.getHours():0,r?$.minTimeGap*Math.floor(t.getMinutes()/$.minTimeGap):0)).getTime()-e.getTime()},dateEqual:function(e,t,n){return!!e&&!!t&&0===ne.helper.dateDiff(e,t,n)},isDateInRange:function(e,t,n,i){var o;return n||i||(n=(o=ne.get.startDate())&&$.minDate?new Date(Math.max(o,$.minDate)):o||$.minDate,i=$.maxDate),n=n&&new Date(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),$.minTimeGap*Math.ceil(n.getMinutes()/$.minTimeGap)),!(!e||n&&0<ne.helper.dateDiff(e,n,t)||i&&0<ne.helper.dateDiff(i,e,t))},dateInRange:function(e,t,n){t||n||(t=(i=ne.get.startDate())&&$.minDate?new Date(Math.max(i,$.minDate)):i||$.minDate,n=$.maxDate),t=t&&new Date(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),$.minTimeGap*Math.ceil(t.getMinutes()/$.minTimeGap));var i="time"===$.type;return e&&(t&&0<ne.helper.dateDiff(e,t,"minute")?i?ne.helper.mergeDateTime(e,t):t:n&&0<ne.helper.dateDiff(n,e,"minute")?i?ne.helper.mergeDateTime(e,n):n:e)},mergeDateTime:function(e,t){return e&&t?new Date(e.getFullYear(),e.getMonth(),e.getDate(),t.getHours(),t.getMinutes()):t},isTodayButton:function(e){return e.text()===$.text.today}},setting:function(e,t){if(ne.debug("Changing setting",e,t),oe.isPlainObject(e))oe.extend(!0,$,e);else{if(t===ae)return $[e];oe.isPlainObject($[e])?oe.extend(!0,$[e],t):$[e]=t}},internal:function(e,t){if(oe.isPlainObject(e))oe.extend(!0,ne,e);else{if(t===ae)return ne[e];ne[e]=t}},debug:function(){!$.silent&&$.debug&&($.performance?ne.performance.log(arguments):(ne.debug=Function.prototype.bind.call(console.info,console,$.name+":"),ne.debug.apply(console,arguments)))},verbose:function(){!$.silent&&$.verbose&&$.debug&&($.performance?ne.performance.log(arguments):(ne.verbose=Function.prototype.bind.call(console.info,console,$.name+":"),ne.verbose.apply(console,arguments)))},error:function(){$.silent||(ne.error=Function.prototype.bind.call(console.error,console,$.name+":"),ne.error.apply(console,arguments))},performance:{log:function(e){var t,n;$.performance&&(n=(t=(new Date).getTime())-(y||t),y=t,x.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:u,"Execution Time":n})),clearTimeout(ne.performance.timer),ne.performance.timer=setTimeout(ne.performance.display,500)},display:function(){var e=$.name+":",n=0;y=!1,clearTimeout(ne.performance.timer),oe.each(x,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",b&&(e+=" '"+b+"'"),(console.group!==ae||console.table!==ae)&&0<x.length&&(console.groupCollapsed(e),console.table?console.table(x):oe.each(x,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),x=[]}},invoke:function(i,e,t){var o,a,n,r=f;return e=e||k,t=u||t,"string"==typeof i&&r!==ae&&(i=i.split(/[\. ]/),o=i.length-1,oe.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(oe.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==ae)return a=r[n],!1;{if(!oe.isPlainObject(r[t])||e==o)return r[t]!==ae?a=r[t]:ne.error(s.method,i),!1;r=r[t]}}})),oe.isFunction(a)?n=a.apply(t,e):a!==ae&&(n=a),Array.isArray(v)?v.push(n):v!==ae?v=[v,n]:n!==ae&&(v=n),a}};w?(f===ae&&ne.initialize(),ne.invoke(C)):(f!==ae&&f.invoke("destroy"),ne.initialize())}),v!==ae?v:this},oe.fn.calendar.settings={name:"Calendar",namespace:"calendar",silent:!1,debug:!1,verbose:!1,performance:!1,type:"datetime",firstDayOfWeek:0,constantHeight:!0,today:!1,closable:!0,monthFirst:!0,touchReadonly:!0,inline:!1,on:null,initialDate:null,startMode:!1,minDate:null,maxDate:null,ampm:!0,disableYear:!1,disableMonth:!1,disableMinute:!1,formatInput:!0,startCalendar:null,endCalendar:null,multiMonth:1,minTimeGap:5,showWeekNumbers:null,disabledDates:[],disabledDaysOfWeek:[],enabledDates:[],eventDates:[],centuryBreak:60,currentCentury:2e3,selectAdjacentDays:!1,popupOptions:{position:"bottom left",lastResort:"bottom left",prefer:"opposite",hideOnScroll:!1},text:{days:["S","M","T","W","T","F","S"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",now:"Now",am:"AM",pm:"PM",weekNo:"Week"},formatter:{header:function(e,t,n){return"year"===t?n.formatter.yearHeader(e,n):"month"===t?n.formatter.monthHeader(e,n):"day"===t?n.formatter.dayHeader(e,n):"hour"===t?n.formatter.hourHeader(e,n):n.formatter.minuteHeader(e,n)},yearHeader:function(e,t){e=10*Math.ceil(e.getFullYear()/10);return e-9+" - "+(2+e)},monthHeader:function(e,t){return e.getFullYear()},dayHeader:function(e,t){return t.text.months[e.getMonth()]+" "+e.getFullYear()},hourHeader:function(e,t){return t.formatter.date(e,t)},minuteHeader:function(e,t){return t.formatter.date(e,t)},dayColumnHeader:function(e,t){return t.text.days[e]},datetime:function(e,t){if(!e)return"";var n="time"===t.type?"":t.formatter.date(e,t),e=t.type.indexOf("time")<0?"":t.formatter.time(e,t,!1);return n+("datetime"===t.type?" ":"")+e},date:function(e,t){if(!e)return"";var n=e.getDate(),i=t.text.months[e.getMonth()],e=e.getFullYear();return"year"===t.type?e:"month"===t.type?i+" "+e:(t.monthFirst?i+" "+n:n+" "+i)+", "+e},time:function(e,t,n){if(!e)return"";var i=e.getHours(),o=e.getMinutes(),e="";return t.ampm&&(e=" "+(i<12?t.text.am:t.text.pm),i=0===i?12:12<i?i-12:i),i+":"+(o<10?"0":"")+o+e},today:function(e){return"date"===e.type?e.text.today:e.text.now},cell:function(e,t,n){}},parser:{date:function(e,t){if(e instanceof Date)return e;if(!e)return null;if(0===(e=String(e).trim()).length)return null;e.match(/^[0-9]{4}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{1,2}$/)&&(e=e.replace(/[\/\-\.]/g,"/")+" 00:00:00"),e=t.monthFirst||!e.match(/^[0-9]{1,2}[\/\-\.]/)?e:e.replace(/[\/\-\.]/g,"/").replace(/([0-9]+)\/([0-9]+)/,"$2/$1");var n,i,o,a=new Date(e);if(!(null!==e.match(/^[0-9]+$/))&&!isNaN(a.getDate()))return a;e=e.toLowerCase();var r,s,l,c=-1,u=-1,d=-1,f=-1,m=-1,g=ae,p="time"===t.type,a=t.type.indexOf("time")<0,h=e.split(t.regExp.dateWords),v=e.split(t.regExp.dateNumbers);if(!a)for(g=0<=oe.inArray(t.text.am.toLowerCase(),h)||!(0<=oe.inArray(t.text.pm.toLowerCase(),h))&&ae,n=0;n<v.length;n++)if(0<=(s=v[n]).indexOf(":")){if(u<0||c<0)for(l=s.split(":"),o=0;o<Math.min(2,l.length);o++)i=parseInt(l[o]),isNaN(i)&&(i=0),0===o?u=i%24:c=i%60;v.splice(n,1)}if(!p){for(n=0;n<h.length;n++)if(!((r=h[n]).length<=0)){for(i=0;i<t.text.months.length;i++)if(t.text.months[i].substring(0,r.length).toLowerCase()===r){f=i+1;break}if(0<=f)break}for(n=0;n<v.length;n++)if(i=parseInt(v[n]),!isNaN(i)&&i>=t.centuryBreak&&n===v.length-1){i<=99&&(i+=t.currentCentury-100),m=i,v.splice(n,1);break}if(f<0)for(n=0;n<v.length;n++)if(o=1<n||t.monthFirst?n:1===n?0:1,i=parseInt(v[o]),!isNaN(i)&&1<=i&&i<=12){f=i,v.splice(o,1);break}for(n=0;n<v.length;n++)if(i=parseInt(v[n]),!isNaN(i)&&1<=i&&i<=31){d=i,v.splice(n,1);break}if(m<0)for(n=v.length-1;0<=n;n--)if(i=parseInt(v[n]),!isNaN(i)){i<=99&&(i+=t.currentCentury),m=i,v.splice(n,1);break}}if(!a){if(u<0)for(n=0;n<v.length;n++)if(i=parseInt(v[n]),!isNaN(i)&&0<=i&&i<=23){u=i,v.splice(n,1);break}if(c<0)for(n=0;n<v.length;n++)if(i=parseInt(v[n]),!isNaN(i)&&0<=i&&i<=59){c=i,v.splice(n,1);break}}if(c<0&&u<0&&d<0&&f<0&&m<0)return null;c<0&&(c=0),u<0&&(u=0),d<0&&(d=1),f<0&&(f=1),m<0&&(m=(new Date).getFullYear()),g!==ae&&(g?12===u&&(u=0):u<12&&(u+=12));g=new Date(m,f-1,d,u,c);return g.getMonth()===f-1&&g.getFullYear()===m||(g=new Date(m,f,0,u,c)),isNaN(g.getTime())?null:g}},onBeforeChange:function(e,t,n){return!0},onChange:function(e,t,n){},onShow:function(){},onVisible:function(){},onHide:function(){},onHidden:function(){},onSelect:function(e,t){},isDisabled:function(e,t){return!1},selector:{popup:".ui.popup",input:"input",activator:"input",append:".inline.field,.inline.fields"},regExp:{dateWords:/[^A-Za-z\u00C0-\u024F]+/g,dateNumbers:/[^\d:]+/g},error:{popup:"UI Popup, a required component is not included in this page",method:"The method you called is not defined."},className:{calendar:"calendar",active:"active",popup:"ui popup",grid:"ui equal width grid",column:"column",table:"ui celled center aligned unstackable table",inverted:"inverted",prev:"prev link",next:"next link",prevIcon:"chevron left icon",nextIcon:"chevron right icon",link:"link",cell:"link",disabledCell:"disabled",weekCell:"disabled",adjacentCell:"adjacent",activeCell:"active",rangeCell:"range",focusCell:"focus",todayCell:"today",today:"today link",disabled:"disabled"},metadata:{date:"date",focusDate:"focusDate",startDate:"startDate",endDate:"endDate",minDate:"minDate",maxDate:"maxDate",mode:"mode",type:"type",monthOffset:"monthOffset",message:"message",class:"class",inverted:"inverted",variation:"variation",position:"position",month:"month",year:"year"},eventClass:"blue"}}(jQuery,window,document),function(S,D,A,E){"use strict";S.isFunction=S.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},D=void 0!==D&&D.Math==Math?D:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),S.fn.checkbox=function(u){var d,e=S(this),f=e.selector||"",x=(new Date).getTime(),C=[],w=u,k="string"==typeof w,T=[].slice.call(arguments,1);return e.each(function(){var e,m=S.extend(!0,{},S.fn.checkbox.settings,u),t=m.className,n=m.namespace,g=m.selector,s=m.error,i="."+n,o="module-"+n,p=S(this),a=S(this).children(g.label),h=S(this).children(g.input),v=h[0],r=!1,b=!1,l=p.data(o),c=this,y={initialize:function(){y.verbose("Initializing checkbox",m),y.create.label(),y.bind.events(),y.set.tabbable(),y.hide.input(),y.observeChanges(),y.instantiate(),y.setup()},instantiate:function(){y.verbose("Storing instance of module",y),l=y,p.data(o,y)},destroy:function(){y.verbose("Destroying module"),y.unbind.events(),y.show.input(),p.removeData(o)},fix:{reference:function(){p.is(g.input)&&(y.debug("Behavior called on <input> adjusting invoked element"),p=p.closest(g.checkbox),y.refresh())}},setup:function(){y.set.initialLoad(),y.is.indeterminate()?(y.debug("Initial value is indeterminate"),y.indeterminate()):y.is.checked()?(y.debug("Initial value is checked"),y.check()):(y.debug("Initial value is unchecked"),y.uncheck()),y.remove.initialLoad()},refresh:function(){a=p.children(g.label),h=p.children(g.input),v=h[0]},hide:{input:function(){y.verbose("Modifying <input> z-index to be unselectable"),h.addClass(t.hidden)}},show:{input:function(){y.verbose("Modifying <input> z-index to be selectable"),h.removeClass(t.hidden)}},observeChanges:function(){"MutationObserver"in D&&((e=new MutationObserver(function(e){y.debug("DOM tree modified, updating selector cache"),y.refresh()})).observe(c,{childList:!0,subtree:!0}),y.debug("Setting up mutation observer",e))},attachEvents:function(e,t){var n=S(e);t=S.isFunction(y[t])?y[t]:y.toggle,0<n.length?(y.debug("Attaching checkbox events to element",e,t),n.on("click"+i,t)):y.error(s.notFound)},preventDefaultOnInputTarget:function(){"undefined"!=typeof event&&null!==event&&S(event.target).is(g.input)&&(y.verbose("Preventing default check action after manual check action"),event.preventDefault())},event:{change:function(e){y.should.ignoreCallbacks()||m.onChange.call(v)},click:function(e){var t=S(e.target);t.is(g.input)?y.verbose("Using default check action on initialized checkbox"):t.is(g.link)?y.debug("Clicking link inside checkbox, skipping toggle"):(y.toggle(),h.focus(),e.preventDefault())},keydown:function(e){var t=e.which,n=13,i=32,o=27,a=37,r=38,s=39,l=40,c=y.get.radios(),u=c.index(p),d=c.length,f=!1;if(t==a||t==r?f=(0===u?d:u)-1:t!=s&&t!=l||(f=u===d-1?0:u+1),!y.should.ignoreCallbacks()&&!1!==f){if(!1===m.beforeUnchecked.apply(v))return y.verbose("Option not allowed to be unchecked, cancelling key navigation"),!1;if(!1===m.beforeChecked.apply(S(c[f]).children(g.input)[0]))return y.verbose("Next option should not allow check, cancelling key navigation"),!1}b=t==o?(y.verbose("Escape key pressed blurring field"),h.blur(),!0):!(e.ctrlKey||!(t==i||t==n&&m.enableEnterKey))&&(y.verbose("Enter/space key pressed, toggling checkbox"),y.toggle(),!0)},keyup:function(e){b&&e.preventDefault()}},check:function(){y.should.allowCheck()&&(y.debug("Checking checkbox",h),y.set.checked(),y.should.ignoreCallbacks()||(m.onChecked.call(v),y.trigger.change()),y.preventDefaultOnInputTarget())},uncheck:function(){y.should.allowUncheck()&&(y.debug("Unchecking checkbox"),y.set.unchecked(),y.should.ignoreCallbacks()||(m.onUnchecked.call(v),y.trigger.change()),y.preventDefaultOnInputTarget())},indeterminate:function(){y.should.allowIndeterminate()?y.debug("Checkbox is already indeterminate"):(y.debug("Making checkbox indeterminate"),y.set.indeterminate(),y.should.ignoreCallbacks()||(m.onIndeterminate.call(v),y.trigger.change()))},determinate:function(){y.should.allowDeterminate()?y.debug("Checkbox is already determinate"):(y.debug("Making checkbox determinate"),y.set.determinate(),y.should.ignoreCallbacks()||(m.onDeterminate.call(v),y.trigger.change()))},enable:function(){y.is.enabled()?y.debug("Checkbox is already enabled"):(y.debug("Enabling checkbox"),y.set.enabled(),y.should.ignoreCallbacks()||(m.onEnable.call(v),m.onEnabled.call(v),y.trigger.change()))},disable:function(){y.is.disabled()?y.debug("Checkbox is already disabled"):(y.debug("Disabling checkbox"),y.set.disabled(),y.should.ignoreCallbacks()||(m.onDisable.call(v),m.onDisabled.call(v),y.trigger.change()))},get:{radios:function(){var e=y.get.name();return S('input[name="'+e+'"]').closest(g.checkbox)},otherRadios:function(){return y.get.radios().not(p)},name:function(){return h.attr("name")}},is:{initialLoad:function(){return r},radio:function(){return h.hasClass(t.radio)||"radio"==h.attr("type")},indeterminate:function(){return h.prop("indeterminate")!==E&&h.prop("indeterminate")},checked:function(){return h.prop("checked")!==E&&h.prop("checked")},disabled:function(){return h.prop("disabled")!==E&&h.prop("disabled")},enabled:function(){return!y.is.disabled()},determinate:function(){return!y.is.indeterminate()},unchecked:function(){return!y.is.checked()}},should:{allowCheck:function(){return y.is.determinate()&&y.is.checked()&&!y.is.initialLoad()?(y.debug("Should not allow check, checkbox is already checked"),!1):!(!y.should.ignoreCallbacks()&&!1===m.beforeChecked.apply(v))||(y.debug("Should not allow check, beforeChecked cancelled"),!1)},allowUncheck:function(){return y.is.determinate()&&y.is.unchecked()&&!y.is.initialLoad()?(y.debug("Should not allow uncheck, checkbox is already unchecked"),!1):!(!y.should.ignoreCallbacks()&&!1===m.beforeUnchecked.apply(v))||(y.debug("Should not allow uncheck, beforeUnchecked cancelled"),!1)},allowIndeterminate:function(){return y.is.indeterminate()&&!y.is.initialLoad()?(y.debug("Should not allow indeterminate, checkbox is already indeterminate"),!1):!(!y.should.ignoreCallbacks()&&!1===m.beforeIndeterminate.apply(v))||(y.debug("Should not allow indeterminate, beforeIndeterminate cancelled"),!1)},allowDeterminate:function(){return y.is.determinate()&&!y.is.initialLoad()?(y.debug("Should not allow determinate, checkbox is already determinate"),!1):!(!y.should.ignoreCallbacks()&&!1===m.beforeDeterminate.apply(v))||(y.debug("Should not allow determinate, beforeDeterminate cancelled"),!1)},ignoreCallbacks:function(){return r&&!m.fireOnInit}},can:{change:function(){return!(p.hasClass(t.disabled)||p.hasClass(t.readOnly)||h.prop("disabled")||h.prop("readonly"))},uncheck:function(){return"boolean"==typeof m.uncheckable?m.uncheckable:!y.is.radio()}},set:{initialLoad:function(){r=!0},checked:function(){y.verbose("Setting class to checked"),p.removeClass(t.indeterminate).addClass(t.checked),y.is.radio()&&y.uncheckOthers(),y.is.indeterminate()||!y.is.checked()?(y.verbose("Setting state to checked",v),h.prop("indeterminate",!1).prop("checked",!0)):y.debug("Input is already checked, skipping input property change")},unchecked:function(){y.verbose("Removing checked class"),p.removeClass(t.indeterminate).removeClass(t.checked),y.is.indeterminate()||!y.is.unchecked()?(y.debug("Setting state to unchecked"),h.prop("indeterminate",!1).prop("checked",!1)):y.debug("Input is already unchecked")},indeterminate:function(){y.verbose("Setting class to indeterminate"),p.addClass(t.indeterminate),y.is.indeterminate()?y.debug("Input is already indeterminate, skipping input property change"):(y.debug("Setting state to indeterminate"),h.prop("indeterminate",!0))},determinate:function(){y.verbose("Removing indeterminate class"),p.removeClass(t.indeterminate),y.is.determinate()?y.debug("Input is already determinate, skipping input property change"):(y.debug("Setting state to determinate"),h.prop("indeterminate",!1))},disabled:function(){y.verbose("Setting class to disabled"),p.addClass(t.disabled),y.is.disabled()?y.debug("Input is already disabled, skipping input property change"):(y.debug("Setting state to disabled"),h.prop("disabled","disabled"))},enabled:function(){y.verbose("Removing disabled class"),p.removeClass(t.disabled),y.is.enabled()?y.debug("Input is already enabled, skipping input property change"):(y.debug("Setting state to enabled"),h.prop("disabled",!1))},tabbable:function(){y.verbose("Adding tabindex to checkbox"),h.attr("tabindex")===E&&h.attr("tabindex",0)}},remove:{initialLoad:function(){r=!1}},trigger:{change:function(){var e,t=h[0];t&&(e=A.createEvent("HTMLEvents"),y.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},create:{label:function(){0<h.prevAll(g.label).length?(h.prev(g.label).detach().insertAfter(h),y.debug("Moving existing label",a)):y.has.label()||(a=S("<label>").insertAfter(h),y.debug("Creating label",a))}},has:{label:function(){return 0<a.length}},bind:{events:function(){y.verbose("Attaching checkbox events"),p.on("click"+i,y.event.click).on("change"+i,y.event.change).on("keydown"+i,g.input,y.event.keydown).on("keyup"+i,g.input,y.event.keyup)}},unbind:{events:function(){y.debug("Removing events"),p.off(i)}},uncheckOthers:function(){var e=y.get.otherRadios();y.debug("Unchecking other radios",e),e.removeClass(t.checked)},toggle:function(){y.can.change()?y.is.indeterminate()||y.is.unchecked()?(y.debug("Currently unchecked"),y.check()):y.is.checked()&&y.can.uncheck()&&(y.debug("Currently checked"),y.uncheck()):y.is.radio()||y.debug("Checkbox is read-only or disabled, ignoring toggle")},setting:function(e,t){if(y.debug("Changing setting",e,t),S.isPlainObject(e))S.extend(!0,m,e);else{if(t===E)return m[e];S.isPlainObject(m[e])?S.extend(!0,m[e],t):m[e]=t}},internal:function(e,t){if(S.isPlainObject(e))S.extend(!0,y,e);else{if(t===E)return y[e];y[e]=t}},debug:function(){!m.silent&&m.debug&&(m.performance?y.performance.log(arguments):(y.debug=Function.prototype.bind.call(console.info,console,m.name+":"),y.debug.apply(console,arguments)))},verbose:function(){!m.silent&&m.verbose&&m.debug&&(m.performance?y.performance.log(arguments):(y.verbose=Function.prototype.bind.call(console.info,console,m.name+":"),y.verbose.apply(console,arguments)))},error:function(){m.silent||(y.error=Function.prototype.bind.call(console.error,console,m.name+":"),y.error.apply(console,arguments))},performance:{log:function(e){var t,n;m.performance&&(n=(t=(new Date).getTime())-(x||t),x=t,C.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:c,"Execution Time":n})),clearTimeout(y.performance.timer),y.performance.timer=setTimeout(y.performance.display,500)},display:function(){var e=m.name+":",n=0;x=!1,clearTimeout(y.performance.timer),S.each(C,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",f&&(e+=" '"+f+"'"),(console.group!==E||console.table!==E)&&0<C.length&&(console.groupCollapsed(e),console.table?console.table(C):S.each(C,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),C=[]}},invoke:function(i,e,t){var o,a,n,r=l;return e=e||T,t=c||t,"string"==typeof i&&r!==E&&(i=i.split(/[\. ]/),o=i.length-1,S.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(S.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==E)return a=r[n],!1;{if(!S.isPlainObject(r[t])||e==o)return r[t]!==E?a=r[t]:y.error(s.method,i),!1;r=r[t]}}})),S.isFunction(a)?n=a.apply(t,e):a!==E&&(n=a),Array.isArray(d)?d.push(n):d!==E?d=[d,n]:n!==E&&(d=n),a}};k?(l===E&&y.initialize(),y.invoke(w)):(l!==E&&l.invoke("destroy"),y.initialize())}),d!==E?d:this},S.fn.checkbox.settings={name:"Checkbox",namespace:"checkbox",silent:!1,debug:!1,verbose:!0,performance:!0,uncheckable:"auto",fireOnInit:!1,enableEnterKey:!0,onChange:function(){},beforeChecked:function(){},beforeUnchecked:function(){},beforeDeterminate:function(){},beforeIndeterminate:function(){},onChecked:function(){},onUnchecked:function(){},onDeterminate:function(){},onIndeterminate:function(){},onEnable:function(){},onDisable:function(){},onEnabled:function(){},onDisabled:function(){},className:{checked:"checked",indeterminate:"indeterminate",disabled:"disabled",hidden:"hidden",radio:"radio",readOnly:"read-only"},error:{method:"The method you called is not defined"},selector:{checkbox:".ui.checkbox",label:"label, .box",input:'input[type="checkbox"], input[type="radio"]',link:"a[href]"}}}(jQuery,window,document),function(k,e,T,S){"use strict";k.isFunction=k.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),k.fn.dimmer=function(p){var h,v=k(this),b=(new Date).getTime(),y=[],x=p,C="string"==typeof x,w=[].slice.call(arguments,1);return v.each(function(){var o,t,a=k.isPlainObject(p)?k.extend(!0,{},k.fn.dimmer.settings,p):k.extend({},k.fn.dimmer.settings),n=a.selector,e=a.namespace,i=a.className,s=a.error,r="."+e,l="module-"+e,c=v.selector||"",u="ontouchstart"in T.documentElement?"touchstart":"click",d=k(this),f=this,m=d.data(l),g={preinitialize:function(){o=g.is.dimmer()?(t=d.parent(),d):(t=d,g.has.dimmer()?a.dimmerName?t.find(n.dimmer).filter("."+a.dimmerName):t.find(n.dimmer):g.create())},initialize:function(){g.debug("Initializing dimmer",a),g.bind.events(),g.set.dimmable(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),m=g,d.data(l,m)},destroy:function(){g.verbose("Destroying previous module",o),g.unbind.events(),g.remove.variation(),t.off(r)},bind:{events:function(){"hover"==a.on?t.on("mouseenter"+r,g.show).on("mouseleave"+r,g.hide):"click"==a.on&&t.on(u+r,g.toggle),g.is.page()&&(g.debug("Setting as a page dimmer",t),g.set.pageDimmer()),g.is.closable()&&(g.verbose("Adding dimmer close event",o),t.on(u+r,n.dimmer,g.event.click))}},unbind:{events:function(){d.removeData(l),t.off(r)}},event:{click:function(e){g.verbose("Determining if event occurred on dimmer",e),0!==o.find(e.target).length&&!k(e.target).is(n.content)||(g.hide(),e.stopImmediatePropagation())}},addContent:function(e){e=k(e);g.debug("Add content to dimmer",e),e.parent()[0]!==o[0]&&e.detach().appendTo(o)},create:function(){var e=k(a.template.dimmer(a));return a.dimmerName&&(g.debug("Creating named dimmer",a.dimmerName),e.addClass(a.dimmerName)),e.appendTo(t),e},show:function(e){e=k.isFunction(e)?e:function(){},g.debug("Showing dimmer",o,a),g.set.variation(),g.is.dimmed()&&!g.is.animating()||!g.is.enabled()?g.debug("Dimmer is already shown or disabled"):(g.animate.show(e),a.onShow.call(f),a.onChange.call(f))},hide:function(e){e=k.isFunction(e)?e:function(){},g.is.dimmed()||g.is.animating()?(g.debug("Hiding dimmer",o),g.animate.hide(e),a.onHide.call(f),a.onChange.call(f)):g.debug("Dimmer is not visible")},toggle:function(){g.verbose("Toggling dimmer visibility",o),g.is.dimmed()?g.is.closable()&&g.hide():g.show()},animate:{show:function(e){e=k.isFunction(e)?e:function(){},a.useCSS&&k.fn.transition!==S&&o.transition("is supported")?(a.useFlex?(g.debug("Using flex dimmer"),g.remove.legacy()):(g.debug("Using legacy non-flex dimmer"),g.set.legacy()),"auto"!==a.opacity&&g.set.opacity(),o.transition({displayType:a.useFlex?"flex":"block",animation:(a.transition.showMethod||a.transition)+" in",queue:!1,duration:g.get.duration(),useFailSafe:!0,onStart:function(){g.set.dimmed()},onComplete:function(){g.set.active(),e()}})):(g.verbose("Showing dimmer animation with javascript"),g.set.dimmed(),"auto"==a.opacity&&(a.opacity=.8),o.stop().css({opacity:0,width:"100%",height:"100%"}).fadeTo(g.get.duration(),a.opacity,function(){o.removeAttr("style"),g.set.active(),e()}))},hide:function(e){e=k.isFunction(e)?e:function(){},a.useCSS&&k.fn.transition!==S&&o.transition("is supported")?(g.verbose("Hiding dimmer with css"),o.transition({displayType:a.useFlex?"flex":"block",animation:(a.transition.hideMethod||a.transition)+" out",queue:!1,duration:g.get.duration(),useFailSafe:!0,onComplete:function(){g.remove.dimmed(),g.remove.variation(),g.remove.active(),e()}})):(g.verbose("Hiding dimmer with javascript"),o.stop().fadeOut(g.get.duration(),function(){g.remove.dimmed(),g.remove.active(),o.removeAttr("style"),e()}))}},get:{dimmer:function(){return o},duration:function(){return g.is.active()?a.transition.hideDuration||a.duration.hide||a.duration:a.transition.showDuration||a.duration.show||a.duration}},has:{dimmer:function(){return a.dimmerName?0<d.find(n.dimmer).filter("."+a.dimmerName).length:0<d.find(n.dimmer).length}},is:{active:function(){return o.hasClass(i.active)},animating:function(){return o.is(":animated")||o.hasClass(i.animating)},closable:function(){return"auto"==a.closable?"hover"!=a.on:a.closable},dimmer:function(){return d.hasClass(i.dimmer)},dimmable:function(){return d.hasClass(i.dimmable)},dimmed:function(){return t.hasClass(i.dimmed)},disabled:function(){return t.hasClass(i.disabled)},enabled:function(){return!g.is.disabled()},page:function(){return t.is("body")},pageDimmer:function(){return o.hasClass(i.pageDimmer)}},can:{show:function(){return!o.hasClass(i.disabled)}},set:{opacity:function(e){var t=o.css("background-color"),n=t.split(","),i=n&&3<=n.length;e=0===a.opacity?0:a.opacity||e,t=i?(n[2]=n[2].replace(")",""),n[3]=e+")",n.join(",")):"rgba(0, 0, 0, "+e+")",g.debug("Setting opacity to",e),o.css("background-color",t)},legacy:function(){o.addClass(i.legacy)},active:function(){o.addClass(i.active)},dimmable:function(){t.addClass(i.dimmable)},dimmed:function(){t.addClass(i.dimmed)},pageDimmer:function(){o.addClass(i.pageDimmer)},disabled:function(){o.addClass(i.disabled)},variation:function(e){(e=e||a.variation)&&o.addClass(e)}},remove:{active:function(){o.removeClass(i.active)},legacy:function(){o.removeClass(i.legacy)},dimmed:function(){t.removeClass(i.dimmed)},disabled:function(){o.removeClass(i.disabled)},variation:function(e){(e=e||a.variation)&&o.removeClass(e)}},setting:function(e,t){if(g.debug("Changing setting",e,t),k.isPlainObject(e))k.extend(!0,a,e);else{if(t===S)return a[e];k.isPlainObject(a[e])?k.extend(!0,a[e],t):a[e]=t}},internal:function(e,t){if(k.isPlainObject(e))k.extend(!0,g,e);else{if(t===S)return g[e];g[e]=t}},debug:function(){!a.silent&&a.debug&&(a.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,a.name+":"),g.debug.apply(console,arguments)))},verbose:function(){!a.silent&&a.verbose&&a.debug&&(a.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,a.name+":"),g.verbose.apply(console,arguments)))},error:function(){a.silent||(g.error=Function.prototype.bind.call(console.error,console,a.name+":"),g.error.apply(console,arguments))},performance:{log:function(e){var t,n;a.performance&&(n=(t=(new Date).getTime())-(b||t),b=t,y.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:f,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var e=a.name+":",n=0;b=!1,clearTimeout(g.performance.timer),k.each(y,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",c&&(e+=" '"+c+"'"),1<v.length&&(e+=" ("+v.length+")"),(console.group!==S||console.table!==S)&&0<y.length&&(console.groupCollapsed(e),console.table?console.table(y):k.each(y,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),y=[]}},invoke:function(i,e,t){var o,a,n,r=m;return e=e||w,t=f||t,"string"==typeof i&&r!==S&&(i=i.split(/[\. ]/),o=i.length-1,k.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(k.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==S)return a=r[n],!1;{if(!k.isPlainObject(r[t])||e==o)return r[t]!==S?a=r[t]:g.error(s.method,i),!1;r=r[t]}}})),k.isFunction(a)?n=a.apply(t,e):a!==S&&(n=a),Array.isArray(h)?h.push(n):h!==S?h=[h,n]:n!==S&&(h=n),a}};g.preinitialize(),C?(m===S&&g.initialize(),g.invoke(x)):(m!==S&&m.invoke("destroy"),g.initialize())}),h!==S?h:this},k.fn.dimmer.settings={name:"Dimmer",namespace:"dimmer",silent:!1,debug:!1,verbose:!1,performance:!0,useFlex:!0,dimmerName:!1,variation:!1,closable:"auto",useCSS:!0,transition:"fade",on:!1,opacity:"auto",duration:{show:500,hide:500},displayLoader:!1,loaderText:!1,loaderVariation:"",onChange:function(){},onShow:function(){},onHide:function(){},error:{method:"The method you called is not defined."},className:{active:"active",animating:"animating",dimmable:"dimmable",dimmed:"dimmed",dimmer:"dimmer",disabled:"disabled",hide:"hide",legacy:"legacy",pageDimmer:"page",show:"show",loader:"ui loader"},selector:{dimmer:"> .ui.dimmer",content:".ui.dimmer > .content, .ui.dimmer > .content > .center"},template:{dimmer:function(e){var t,n=k("<div/>").addClass("ui dimmer");return e.displayLoader&&(t=k("<div/>").addClass(e.className.loader).addClass(e.loaderVariation),e.loaderText&&(t.text(e.loaderText),t.addClass("text")),n.append(t)),n}}}}(jQuery,window,document),function(te,ne,ie,oe){"use strict";te.isFunction=te.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},ne=void 0!==ne&&ne.Math==Math?ne:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),te.fn.dropdown=function(B){var W,Y=te(this),Q=te(ie),X=Y.selector||"",K="ontouchstart"in ie.documentElement,$=K?"touchstart":"click",G=(new Date).getTime(),J=[],Z=B,_="string"==typeof Z,ee=[].slice.call(arguments,1);return Y.each(function(n){var d,e,t,i,o,a,r,s,l,f=te.isPlainObject(B)?te.extend(!0,{},te.fn.dropdown.settings,B):te.extend({},te.fn.dropdown.settings),m=f.className,g=f.message,c=f.fields,p=f.keys,h=f.metadata,u=f.namespace,v=f.regExp,b=f.selector,y=f.error,x=f.templates,C="."+u,w="module-"+u,k=te(this),T=te(f.context),S=k.find(b.text),D=k.find(b.search),A=k.find(b.sizer),E=k.find(b.input),F=k.find(b.icon),P=k.find(b.clearIcon),O=0<k.prev().find(b.text).length?k.prev().find(b.text):k.prev(),R=k.children(b.menu),M=R.find(b.item),I=f.hideDividers?M.parent().children(b.divider):te(),j=!1,L=!1,V=!1,q=!1,z=this,N=!1,H=k.data(w),U={initialize:function(){U.debug("Initializing dropdown",f),U.is.alreadySetup()?U.setup.reference():(f.ignoreDiacritics&&!String.prototype.normalize&&(f.ignoreDiacritics=!1,U.error(y.noNormalize,z)),U.setup.layout(),f.values&&(U.set.initialLoad(),U.change.values(f.values),U.remove.initialLoad()),U.refreshData(),U.save.defaults(),U.restore.selected(),U.create.id(),U.bind.events(),U.observeChanges(),U.instantiate())},instantiate:function(){U.verbose("Storing instance of dropdown",U),H=U,k.data(w,U)},destroy:function(){U.verbose("Destroying previous dropdown",k),U.remove.tabbable(),U.remove.active(),R.transition("stop all"),R.removeClass(m.visible).addClass(m.hidden),k.off(C).removeData(w),R.off(C),Q.off(o),U.disconnect.menuObserver(),U.disconnect.selectObserver(),U.disconnect.classObserver()},observeChanges:function(){"MutationObserver"in ne&&(r=new MutationObserver(U.event.select.mutation),s=new MutationObserver(U.event.menu.mutation),l=new MutationObserver(U.event.class.mutation),U.debug("Setting up mutation observer",r,s,l),U.observe.select(),U.observe.menu(),U.observe.class())},disconnect:{menuObserver:function(){s&&s.disconnect()},selectObserver:function(){r&&r.disconnect()},classObserver:function(){l&&l.disconnect()}},observe:{select:function(){U.has.input()&&r&&r.observe(k[0],{childList:!0,subtree:!0})},menu:function(){U.has.menu()&&s&&s.observe(R[0],{childList:!0,subtree:!0})},class:function(){U.has.search()&&l&&l.observe(k[0],{attributes:!0})}},create:{id:function(){a=(Math.random().toString(16)+"000000000").substr(2,8),o="."+a,U.verbose("Creating unique id for element",a)},userChoice:function(e){var n,i;return!!(e=e||U.get.userValues())&&(e=Array.isArray(e)?e:[e],te.each(e,function(e,t){!1===U.get.item(t)&&(i=f.templates.addition(U.add.variables(g.addResult,t)),i=te("<div />").html(i).attr("data-"+h.value,t).attr("data-"+h.text,t).addClass(m.addition).addClass(m.item),f.hideAdditions&&i.addClass(m.hidden),n=n===oe?i:n.add(i),U.verbose("Creating user choices for value",t,i))}),n)},userLabels:function(e){var t=U.get.userValues();t&&(U.debug("Adding user labels",t),te.each(t,function(e,t){U.verbose("Adding custom user value"),U.add.label(t,t)}))},menu:function(){R=te("<div />").addClass(m.menu).appendTo(k)},sizer:function(){A=te("<span />").addClass(m.sizer).insertAfter(D)}},search:function(e){e=e!==oe?e:U.get.query(),U.verbose("Searching for query",e),!1===f.fireOnInit&&U.is.initialLoad()?U.verbose("Skipping callback on initial load",f.onSearch):U.has.minCharacters(e)&&!1!==f.onSearch.call(z,e)?U.filter(e):U.hide(null,!0)},select:{firstUnfiltered:function(){U.verbose("Selecting first non-filtered element"),U.remove.selectedItem(),M.not(b.unselectable).not(b.addition+b.hidden).eq(0).addClass(m.selected)},nextAvailable:function(e){var t=(e=e.eq(0)).nextAll(b.item).not(b.unselectable).eq(0),e=e.prevAll(b.item).not(b.unselectable).eq(0);0<t.length?(U.verbose("Moving selection to",t),t.addClass(m.selected)):(U.verbose("Moving selection to",e),e.addClass(m.selected))}},setup:{api:function(){var e={debug:f.debug,urlData:{value:U.get.value(),query:U.get.query()},on:!1};U.verbose("First request, initializing API"),k.api(e)},layout:function(){k.is("select")&&(U.setup.select(),U.setup.returnedObject()),U.has.menu()||U.create.menu(),U.is.clearable()&&!U.has.clearItem()&&(U.verbose("Adding clear icon"),P=te("<i />").addClass("remove icon").insertBefore(S)),U.is.search()&&!U.has.search()&&(U.verbose("Adding search input"),D=te("<input />").addClass(m.search).prop("autocomplete",U.is.chrome()?"fomantic-search":"off").insertBefore(S)),U.is.multiple()&&U.is.searchSelection()&&!U.has.sizer()&&U.create.sizer(),f.allowTab&&U.set.tabbable()},select:function(){var e=U.get.selectValues();U.debug("Dropdown initialized on a select",e),0<(E=k.is("select")?k:E).parent(b.dropdown).length?(U.debug("UI dropdown already exists. Creating dropdown menu only"),k=E.closest(b.dropdown),U.has.menu()||U.create.menu(),R=k.children(b.menu),U.setup.menu(e)):(U.debug("Creating entire dropdown from select"),k=te("<div />").attr("class",E.attr("class")).addClass(m.selection).addClass(m.dropdown).html(x.dropdown(e,c,f.preserveHTML,f.className)).insertBefore(E),E.hasClass(m.multiple)&&!1===E.prop("multiple")&&(U.error(y.missingMultiple),E.prop("multiple",!0)),E.is("[multiple]")&&U.set.multiple(),E.prop("disabled")&&(U.debug("Disabling dropdown"),k.addClass(m.disabled)),E.removeAttr("required").removeAttr("class").detach().prependTo(k)),U.refresh()},menu:function(e){R.html(x.menu(e,c,f.preserveHTML,f.className)),M=R.find(b.item),I=f.hideDividers?M.parent().children(b.divider):te()},reference:function(){U.debug("Dropdown behavior was called on select, replacing with closest dropdown"),k=k.parent(b.dropdown),H=k.data(w),z=k.get(0),U.refresh(),U.setup.returnedObject()},returnedObject:function(){var e=Y.slice(0,n),t=Y.slice(n+1);Y=e.add(k).add(t)}},refresh:function(){U.refreshSelectors(),U.refreshData()},refreshItems:function(){M=R.find(b.item),I=f.hideDividers?M.parent().children(b.divider):te()},refreshSelectors:function(){U.verbose("Refreshing selector cache"),S=k.find(b.text),D=k.find(b.search),E=k.find(b.input),F=k.find(b.icon),O=0<k.prev().find(b.text).length?k.prev().find(b.text):k.prev(),R=k.children(b.menu),M=R.find(b.item),I=f.hideDividers?M.parent().children(b.divider):te()},refreshData:function(){U.verbose("Refreshing cached metadata"),M.removeData(h.text).removeData(h.value)},clearData:function(){U.verbose("Clearing metadata"),M.removeData(h.text).removeData(h.value),k.removeData(h.defaultText).removeData(h.defaultValue).removeData(h.placeholderText)},clearItems:function(){R.empty(),U.refreshItems()},toggle:function(){U.verbose("Toggling menu visibility"),U.is.active()?U.hide():U.show()},show:function(e,t){if(e=te.isFunction(e)?e:function(){},(N||q)&&U.is.remote()&&U.is.noApiCache()&&U.clearItems(),!U.can.show()&&U.is.remote()&&(U.debug("No API results retrieved, searching before show"),U.queryRemote(U.get.query(),U.show,[e,t])),U.can.show()&&!U.is.active()){if(U.debug("Showing dropdown"),!U.has.message()||U.has.maxSelections()||U.has.allResultsFiltered()||U.remove.message(),U.is.allFiltered())return!0;!1!==f.onShow.call(z)&&U.animate.show(function(){U.can.click()&&U.bind.intent(),U.has.search()&&!t&&U.focusSearch(),U.set.visible(),e.call(z)})}},hide:function(e,t){e=te.isFunction(e)?e:function(){},U.is.active()&&!U.is.animatingOutward()?(U.debug("Hiding dropdown"),!1!==f.onHide.call(z)&&U.animate.hide(function(){U.remove.visible(),U.is.focusedOnSearch()&&!0!==t&&D.blur(),e.call(z)})):U.can.click()&&U.unbind.intent(),N=q=!1},hideOthers:function(){U.verbose("Finding other dropdowns to hide"),Y.not(k).has(b.menu+"."+m.visible).dropdown("hide")},hideMenu:function(){U.verbose("Hiding menu  instantaneously"),U.remove.active(),U.remove.visible(),R.transition("hide")},hideSubMenus:function(){var e=R.children(b.item).find(b.menu);U.verbose("Hiding sub menus",e),e.transition("hide")},bind:{events:function(){U.bind.keyboardEvents(),U.bind.inputEvents(),U.bind.mouseEvents()},keyboardEvents:function(){U.verbose("Binding keyboard events"),k.on("keydown"+C,U.event.keydown),U.has.search()&&k.on(U.get.inputEvent()+C,b.search,U.event.input),U.is.multiple()&&Q.on("keydown"+o,U.event.document.keydown)},inputEvents:function(){U.verbose("Binding input change events"),k.on("change"+C,b.input,U.event.change)},mouseEvents:function(){U.verbose("Binding mouse events"),U.is.multiple()&&k.on($+C,b.label,U.event.label.click).on($+C,b.remove,U.event.remove.click),U.is.searchSelection()?(k.on("mousedown"+C,U.event.mousedown).on("mouseup"+C,U.event.mouseup).on("mousedown"+C,b.menu,U.event.menu.mousedown).on("mouseup"+C,b.menu,U.event.menu.mouseup).on($+C,b.icon,U.event.icon.click).on($+C,b.clearIcon,U.event.clearIcon.click).on("focus"+C,b.search,U.event.search.focus).on($+C,b.search,U.event.search.focus).on("blur"+C,b.search,U.event.search.blur).on($+C,b.text,U.event.text.focus),U.is.multiple()&&k.on($+C,U.event.click).on($+C,U.event.search.focus)):("click"==f.on?k.on($+C,b.icon,U.event.icon.click).on($+C,U.event.test.toggle):"hover"==f.on?k.on("mouseenter"+C,U.delay.show).on("mouseleave"+C,U.delay.hide):k.on(f.on+C,U.toggle),k.on("mousedown"+C,U.event.mousedown).on("mouseup"+C,U.event.mouseup).on("focus"+C,U.event.focus).on($+C,b.clearIcon,U.event.clearIcon.click),U.has.menuSearch()?k.on("blur"+C,b.search,U.event.search.blur):k.on("blur"+C,U.event.blur)),R.on((K?"touchstart":"mouseenter")+C,b.item,U.event.item.mouseenter).on("mouseleave"+C,b.item,U.event.item.mouseleave).on("click"+C,b.item,U.event.item.click)},intent:function(){U.verbose("Binding hide intent event to document"),K&&Q.on("touchstart"+o,U.event.test.touch).on("touchmove"+o,U.event.test.touch),Q.on($+o,U.event.test.hide)}},unbind:{intent:function(){U.verbose("Removing hide intent event from document"),K&&Q.off("touchstart"+o).off("touchmove"+o),Q.off($+o)}},filter:function(e){function t(){U.is.multiple()&&U.filterActive(),(e||!e&&0==U.get.activeItem().length)&&U.select.firstUnfiltered(),U.has.allResultsFiltered()?f.onNoResults.call(z,n)?f.allowAdditions?f.hideAdditions&&(U.verbose("User addition with no menu, setting empty style"),U.set.empty(),U.hideMenu()):(U.verbose("All items filtered, showing message",n),U.add.message(g.noResults)):(U.verbose("All items filtered, hiding dropdown",n),U.hideMenu()):(U.remove.empty(),U.remove.message()),f.allowAdditions&&U.add.userSuggestion(U.escape.htmlEntities(e)),U.is.searchSelection()&&U.can.show()&&U.is.focusedOnSearch()&&U.show()}var n=e!==oe?e:U.get.query();f.useLabels&&U.has.maxSelections()||(f.apiSettings?U.can.useAPI()?U.queryRemote(n,function(){f.filterRemoteData&&U.filterItems(n);var e=E.val();Array.isArray(e)||(e=e&&""!==e?e.split(f.delimiter):[]),U.is.multiple()&&te.each(e,function(e,t){M.filter('[data-value="'+t+'"]').addClass(m.filtered)}),U.focusSearch(!0),t()}):U.error(y.noAPI):(U.filterItems(n),t()))},queryRemote:function(e,n,i){Array.isArray(i)||(i=[i]);e={errorDuration:!1,cache:"local",throttle:f.throttle,urlData:{query:e},onError:function(){U.add.message(g.serverError),N=q=!1,n.apply(null,i)},onFailure:function(){U.add.message(g.serverError),N=q=!1,n.apply(null,i)},onSuccess:function(e){var t=e[c.remoteValues];Array.isArray(t)||(t=[]),U.remove.message();e={};e[c.values]=t,U.setup.menu(e),0!==t.length||f.allowAdditions?""!==(t=U.is.multiple()?U.get.values():U.get.value())&&(U.verbose("Value(s) present after click icon, select value(s) in items"),U.set.selected(t,null,null,!0)):U.add.message(g.noResults),N=q=!1,n.apply(null,i)}};k.api("get request")||U.setup.api(),e=te.extend(!0,{},e,f.apiSettings),k.api("setting",e).api("query")},filterItems:function(e){var n=U.remove.diacritics(e!==oe?e:U.get.query()),i=null,t=U.escape.string(n),e=(f.ignoreSearchCase?"i":"")+"gm",o=new RegExp("^"+t,e);U.has.query()&&(i=[],U.verbose("Searching for matching values",n),M.each(function(){var e,t=te(this);if(t.hasClass(m.unfilterable))return i.push(this),!0;if("both"===f.match||"text"===f.match){if(-1!==(e=U.remove.diacritics(String(U.get.choiceText(t,!1)))).search(o))return i.push(this),!0;if("exact"===f.fullTextSearch&&U.exactSearch(n,e))return i.push(this),!0;if(!0===f.fullTextSearch&&U.fuzzySearch(n,e))return i.push(this),!0}return("both"===f.match||"value"===f.match)&&(-1!==(e=U.remove.diacritics(String(U.get.choiceValue(t,e)))).search(o)||"exact"===f.fullTextSearch&&U.exactSearch(n,e)||!0===f.fullTextSearch&&U.fuzzySearch(n,e))?(i.push(this),!0):void 0})),U.debug("Showing only matched items",n),U.remove.filteredItem(),i&&M.not(i).addClass(m.filtered),U.has.query()?!0===f.hideDividers?I.addClass(m.hidden):"empty"===f.hideDividers&&I.removeClass(m.hidden).filter(function(){var e=te(this).nextUntil(b.item);return 0===(e.length?e:te(this)).nextUntil(b.divider).filter(b.item+":not(."+m.filtered+")").length}).addClass(m.hidden):I.removeClass(m.hidden)},fuzzySearch:function(e,t){var n=t.length,i=e.length;if(e=f.ignoreSearchCase?e.toLowerCase():e,t=f.ignoreSearchCase?t.toLowerCase():t,n<i)return!1;if(i===n)return e===t;e:for(var o=0,a=0;o<i;o++){for(var r=e.charCodeAt(o);a<n;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},exactSearch:function(e,t){return e=f.ignoreSearchCase?e.toLowerCase():e,-1<(t=f.ignoreSearchCase?t.toLowerCase():t).indexOf(e)},filterActive:function(){f.useLabels&&M.filter("."+m.active).addClass(m.filtered)},focusSearch:function(e){U.has.search()&&!U.is.focusedOnSearch()&&(e?(k.off("focus"+C,b.search),D.focus(),k.on("focus"+C,b.search,U.event.search.focus)):D.focus())},blurSearch:function(){U.has.search()&&D.blur()},forceSelection:function(){var e=M.not(m.filtered).filter("."+m.selected).eq(0),t=M.not(m.filtered).filter("."+m.active).eq(0),e=0<e.length?e:t,t=0<e.length;f.allowAdditions||t&&!U.is.multiple()?(U.debug("Forcing partial selection to selected item",e),U.event.item.click.call(e,{},!0)):U.remove.searchTerm()},change:{values:function(e){f.allowAdditions||U.clear(),U.debug("Creating dropdown with specified values",e);var t={};t[c.values]=e,U.setup.menu(t),te.each(e,function(e,t){if(1==t.selected&&(U.debug("Setting initial selection to",t[c.value]),U.set.selected(t[c.value]),!U.is.multiple()))return!1}),U.has.selectInput()&&(U.disconnect.selectObserver(),E.html(""),E.append("<option disabled selected value></option>"),te.each(e,function(e,t){var n=f.templates.deQuote(t[c.value]),t=f.templates.escape(t[c.name]||"",f.preserveHTML);E.append('<option value="'+n+'">'+t+"</option>")}),U.observe.select())}},event:{change:function(){V||(U.debug("Input changed, updating selection"),U.set.selected())},focus:function(){f.showOnFocus&&!j&&U.is.hidden()&&!t&&(N=!0,U.show())},blur:function(e){t=ie.activeElement===this,j||t||(U.remove.activeLabel(),U.hide())},mousedown:function(){U.is.searchSelection()?i=!0:j=!0},mouseup:function(){U.is.searchSelection()?i=!1:j=!1},click:function(e){te(e.target).is(k)&&(U.is.focusedOnSearch()?U.show():U.focusSearch())},search:{focus:function(e){j=!0,U.is.multiple()&&U.remove.activeLabel(),N||U.is.active()||!(f.showOnFocus||"focus"!==e.type&&"focusin"!==e.type)||(N=!0,U.search())},blur:function(e){t=ie.activeElement===this,U.is.searchSelection()&&!i&&(L||t||(f.forceSelection?U.forceSelection():f.allowAdditions||U.remove.searchTerm(),U.hide())),i=!1}},clearIcon:{click:function(e){U.clear(),U.is.searchSelection()&&U.remove.searchTerm(),U.hide(),e.stopPropagation()}},icon:{click:function(e){q=!0,U.has.search()?U.is.active()?U.blurSearch():f.showOnFocus?U.focusSearch():U.toggle():U.toggle(),e.stopPropagation()}},text:{focus:function(e){j=!0,U.focusSearch()}},input:function(e){(U.is.multiple()||U.is.searchSelection())&&U.set.filtered(),clearTimeout(U.timer),U.timer=setTimeout(U.search,f.delay.search)},label:{click:function(e){var t=te(this),n=k.find(b.label),i=n.filter("."+m.active),o=t.nextAll("."+m.active),a=t.prevAll("."+m.active),a=(0<o.length?t.nextUntil(o):t.prevUntil(a)).add(i).add(t);e.shiftKey?(i.removeClass(m.active),a.addClass(m.active)):e.ctrlKey?t.toggleClass(m.active):(i.removeClass(m.active),t.addClass(m.active)),f.onLabelSelect.apply(this,n.filter("."+m.active)),e.stopPropagation()}},remove:{click:function(e){var t=te(this).parent();t.hasClass(m.active)?U.remove.activeLabels():U.remove.activeLabels(t),e.stopPropagation()}},test:{toggle:function(e){var t=U.is.multiple()?U.show:U.toggle;U.is.bubbledLabelClick(e)||U.is.bubbledIconClick(e)||(U.is.multiple()&&(!U.is.multiple()||U.is.active())||(N=!0),U.determine.eventOnElement(e,t)&&e.preventDefault())},touch:function(e){U.determine.eventOnElement(e,function(){"touchstart"==e.type?U.timer=setTimeout(function(){U.hide()},f.delay.touch):"touchmove"==e.type&&clearTimeout(U.timer)}),e.stopPropagation()},hide:function(e){U.determine.eventInModule(e,U.hide)&&z.id&&te(e.target).attr("for")===z.id&&e.preventDefault()}},class:{mutation:function(e){e.forEach(function(e){"class"===e.attributeName&&U.check.disabled()})}},select:{mutation:function(e){U.debug("<select> modified, recreating menu"),U.is.selectMutation(e)&&(U.disconnect.selectObserver(),U.refresh(),U.setup.select(),U.set.selected(),U.observe.select())}},menu:{mutation:function(e){var t=e[0],e=t.addedNodes?te(t.addedNodes[0]):te(!1),t=t.removedNodes?te(t.removedNodes[0]):te(!1),e=e.add(t),t=e.is(b.addition)||0<e.closest(b.addition).length,e=e.is(b.message)||0<e.closest(b.message).length;t||e?(U.debug("Updating item selector cache"),U.refreshItems()):(U.debug("Menu modified, updating selector cache"),U.refresh())},mousedown:function(){L=!0},mouseup:function(){L=!1}},item:{mouseenter:function(e){var t=te(e.target),n=te(this),i=n.children(b.menu),o=n.siblings(b.item).children(b.menu),n=0<i.length;0<i.find(t).length||!n||(clearTimeout(U.itemTimer),U.itemTimer=setTimeout(function(){U.verbose("Showing sub-menu",i),te.each(o,function(){U.animate.hide(!1,te(this))}),U.animate.show(!1,i)},f.delay.show),e.preventDefault())},mouseleave:function(e){var t=te(this).children(b.menu);0<t.length&&(clearTimeout(U.itemTimer),U.itemTimer=setTimeout(function(){U.verbose("Hiding sub-menu",t),U.animate.hide(!1,t)},f.delay.hide))},click:function(e,t){var n=te(this),i=te(e?e.target:""),o=n.find(b.menu),a=U.get.choiceText(n),r=U.get.choiceValue(n,a),e=0<o.length,i=0<o.find(i).length;"input"!==ie.activeElement.tagName.toLowerCase()&&te(ie.activeElement).blur(),i||e&&!f.allowCategorySelection||(U.is.searchSelection()&&(f.allowAdditions&&U.remove.userAddition(),U.remove.searchTerm(),U.is.focusedOnSearch()||1==t||U.focusSearch(!0)),f.useLabels||(U.remove.filteredItem(),U.set.scrollPosition(n)),U.determine.selectAction.call(this,a,r))}},document:{keydown:function(e){var t,n,i,o,a,r,s,l,c,u,d,f=e.which;U.is.inObject(f,p)&&((n=(t=k.find(b.label)).filter("."+m.active)).data(h.value),u=t.index(n),d=t.length,i=0<n.length,o=1<n.length,a=0===u,r=u+1==d,s=U.is.searchSelection(),l=U.is.focusedOnSearch(),c=U.is.focused(),d=(u=l&&0===U.get.caretPosition(!1))&&0!==U.get.caretPosition(!0),s&&!i&&!l||(f==p.leftArrow?!c&&!u||i?i&&(e.shiftKey?U.verbose("Adding previous label to selection"):(U.verbose("Selecting previous label"),t.removeClass(m.active)),a&&!o?n.addClass(m.active):n.prev(b.siblingLabel).addClass(m.active).end(),e.preventDefault()):(U.verbose("Selecting previous label"),t.last().addClass(m.active)):f==p.rightArrow?(c&&!i&&t.first().addClass(m.active),i&&(e.shiftKey?U.verbose("Adding next label to selection"):(U.verbose("Selecting next label"),t.removeClass(m.active)),r?s?l?t.removeClass(m.active):U.focusSearch():(o?n.next(b.siblingLabel):n).addClass(m.active):n.next(b.siblingLabel).addClass(m.active),e.preventDefault())):f==p.deleteKey||f==p.backspace?i?(U.verbose("Removing active labels"),r&&s&&!l&&U.focusSearch(),n.last().next(b.siblingLabel).addClass(m.active),U.remove.activeLabels(n),e.preventDefault()):!u||d||i||f!=p.backspace||(U.verbose("Removing last label on input backspace"),n=t.last().addClass(m.active),U.remove.activeLabels(n)):n.removeClass(m.active)))}},keydown:function(e){var t=e.which;if(U.is.inObject(t,p)){var n,i=M.not(b.unselectable).filter("."+m.selected).eq(0),o=R.children("."+m.active).eq(0),a=0<i.length?i:o,r=0<a.length?a.siblings(":not(."+m.filtered+")").addBack():R.children(":not(."+m.filtered+")"),s=a.children(b.menu),l=a.closest(b.menu),c=l.hasClass(m.visible)||l.hasClass(m.animating)||0<l.parent(b.menu).length,u=0<s.length,d=0<a.length,i=0<a.not(b.unselectable).length,o=t==p.delimiter&&f.allowAdditions&&U.is.multiple();if(f.allowAdditions&&f.hideAdditions&&(t==p.enter||o)&&i&&(U.verbose("Selecting item from keyboard shortcut",a),U.event.item.click.call(a,e),U.is.searchSelection()&&U.remove.searchTerm(),U.is.multiple()&&e.preventDefault()),U.is.visible()){if(t!=p.enter&&!o||(t==p.enter&&d&&u&&!f.allowCategorySelection?(U.verbose("Pressed enter on unselectable category, opening sub menu"),t=p.rightArrow):i&&(U.verbose("Selecting item from keyboard shortcut",a),U.event.item.click.call(a,e),U.is.searchSelection()&&(U.remove.searchTerm(),U.is.multiple()&&D.focus())),e.preventDefault()),d&&(t==p.leftArrow&&l[0]!==R[0]&&(U.verbose("Left key pressed, closing sub-menu"),U.animate.hide(!1,l),a.removeClass(m.selected),l.closest(b.item).addClass(m.selected),e.preventDefault()),t==p.rightArrow&&u&&(U.verbose("Right key pressed, opening sub-menu"),U.animate.show(!1,s),a.removeClass(m.selected),s.find(b.item).eq(0).addClass(m.selected),e.preventDefault())),t==p.upArrow){if(n=(d&&c?a.prevAll(b.item+":not("+b.unselectable+")"):M).eq(0),r.index(n)<0)return U.verbose("Up key pressed but reached top of current menu"),void e.preventDefault();U.verbose("Up key pressed, changing active item"),a.removeClass(m.selected),n.addClass(m.selected),U.set.scrollPosition(n),f.selectOnKeydown&&U.is.single()&&U.set.selectedItem(n),e.preventDefault()}if(t==p.downArrow){if(0===(n=(d&&c?a.nextAll(b.item+":not("+b.unselectable+")"):M).eq(0)).length)return U.verbose("Down key pressed but reached bottom of current menu"),void e.preventDefault();U.verbose("Down key pressed, changing active item"),M.removeClass(m.selected),n.addClass(m.selected),U.set.scrollPosition(n),f.selectOnKeydown&&U.is.single()&&U.set.selectedItem(n),e.preventDefault()}t==p.pageUp&&(U.scrollPage("up"),e.preventDefault()),t==p.pageDown&&(U.scrollPage("down"),e.preventDefault()),t==p.escape&&(U.verbose("Escape key pressed, closing dropdown"),U.hide())}else o&&e.preventDefault(),t!=p.downArrow||U.is.visible()||(U.verbose("Down key pressed, showing dropdown"),U.show(),e.preventDefault())}else U.has.search()||U.set.selectedLetter(String.fromCharCode(t))}},trigger:{change:function(){var e,t=E[0];t&&(e=ie.createEvent("HTMLEvents"),U.verbose("Triggering native change event"),e.initEvent("change",!0,!1),t.dispatchEvent(e))}},determine:{selectAction:function(e,t){d=!0,U.verbose("Determining action",f.action),te.isFunction(U.action[f.action])?(U.verbose("Triggering preset action",f.action,e,t),U.action[f.action].call(z,e,t,this)):te.isFunction(f.action)?(U.verbose("Triggering user action",f.action,e,t),f.action.call(z,e,t,this)):U.error(y.action,f.action),d=!1},eventInModule:function(e,t){var n=te(e.target),e=0<n.closest(ie.documentElement).length,n=0<n.closest(k).length;return t=te.isFunction(t)?t:function(){},e&&!n?(U.verbose("Triggering event",t),t(),!0):(U.verbose("Event occurred in dropdown, canceling callback"),!1)},eventOnElement:function(e,t){var n=te(e.target),i=n.closest(b.siblingLabel),e=ie.body.contains(e.target),i=0===k.find(i).length||!(U.is.multiple()&&f.useLabels),n=0===n.closest(R).length;return t=te.isFunction(t)?t:function(){},e&&i&&n?(U.verbose("Triggering event",t),t(),!0):(U.verbose("Event occurred in dropdown menu, canceling callback"),!1)}},action:{nothing:function(){},activate:function(e,t,n){t=t!==oe?t:e,U.can.activate(te(n))&&(U.set.selected(t,te(n)),U.is.multiple()||U.hideAndClear())},select:function(e,t,n){t=t!==oe?t:e,U.can.activate(te(n))&&(U.set.value(t,e,te(n)),U.is.multiple()||U.hideAndClear())},combo:function(e,t,n){U.set.selected(t=t!==oe?t:e,te(n)),U.hideAndClear()},hide:function(e,t,n){U.set.value(t,e,te(n)),U.hideAndClear()}},get:{id:function(){return a},defaultText:function(){return k.data(h.defaultText)},defaultValue:function(){return k.data(h.defaultValue)},placeholderText:function(){return"auto"!=f.placeholder&&"string"==typeof f.placeholder?f.placeholder:k.data(h.placeholderText)||""},text:function(){return f.preserveHTML?S.html():S.text()},query:function(){return String(D.val()).trim()},searchWidth:function(e){return e=e!==oe?e:D.val(),A.text(e),Math.ceil(A.width()+1)},selectionCount:function(){var e=U.get.values();return U.is.multiple()?Array.isArray(e)?e.length:0:""!==U.get.value()?1:0},transition:function(e){return"auto"===f.transition?U.is.upward(e)?"slide up":"slide down":f.transition},userValues:function(){var e=U.get.values();return!!e&&(e=Array.isArray(e)?e:[e],te.grep(e,function(e){return!1===U.get.item(e)}))},uniqueArray:function(n){return te.grep(n,function(e,t){return te.inArray(e,n)===t})},caretPosition:function(e){var t,n,i=D.get(0);return e&&"selectionEnd"in i?i.selectionEnd:!e&&"selectionStart"in i?i.selectionStart:ie.selection?(i.focus(),n=(t=ie.selection.createRange()).text.length,e?n:(t.moveStart("character",-i.value.length),t.text.length-n)):void 0},value:function(){var e=0<E.length?E.val():k.data(h.value),t=Array.isArray(e)&&1===e.length&&""===e[0];return e===oe||t?"":e},values:function(e){var t=U.get.value();return""===t?"":!U.has.selectInput()&&U.is.multiple()?"string"==typeof t?(e?t:U.escape.htmlEntities(t)).split(f.delimiter):"":t},remoteValues:function(){var e=U.get.values(),i=!1;return e&&te.each(e="string"==typeof e?[e]:e,function(e,t){var n=U.read.remoteData(t);U.verbose("Restoring value from session data",n,t),n&&((i=i||{})[t]=n)}),i},choiceText:function(e,t){if(t=t!==oe?t:f.preserveHTML,e)return 0<e.find(b.menu).length&&(U.verbose("Retrieving text of element with sub-menu"),(e=e.clone()).find(b.menu).remove(),e.find(b.menuIcon).remove()),e.data(h.text)!==oe?e.data(h.text):t?e.html()&&e.html().trim():e.text()&&e.text().trim()},choiceValue:function(e,t){return t=t||U.get.choiceText(e),!!e&&(e.data(h.value)!==oe?String(e.data(h.value)):"string"==typeof t?String(f.ignoreSearchCase?t.toLowerCase():t).trim():String(t))},inputEvent:function(){var e=D[0];return!!e&&(e.oninput!==oe?"input":e.onpropertychange!==oe?"propertychange":"keyup")},selectValues:function(){var a={},r=[],s=[];return k.find("option").each(function(){var e=te(this),t=e.html(),n=e.attr("disabled"),i=e.attr("value")!==oe?e.attr("value"):t,o=e.data(h.text)!==oe?e.data(h.text):t,e=e.parent("optgroup");"auto"===f.placeholder&&""===i?a.placeholder=t:(e.length===r.length&&e[0]===r[0]||(s.push({type:"header",divider:f.headerDivider,name:e.attr("label")||""}),r=e),s.push({name:t,value:i,text:o,disabled:n}))}),f.placeholder&&"auto"!==f.placeholder&&(U.debug("Setting placeholder value to",f.placeholder),a.placeholder=f.placeholder),f.sortSelect?(!0===f.sortSelect?s.sort(function(e,t){return e.name.localeCompare(t.name)}):"natural"===f.sortSelect?s.sort(function(e,t){return e.name.toLowerCase().localeCompare(t.name.toLowerCase())}):te.isFunction(f.sortSelect)&&s.sort(f.sortSelect),a[c.values]=s,U.debug("Retrieved and sorted values from select",a)):(a[c.values]=s,U.debug("Retrieved values from select",a)),a},activeItem:function(){return M.filter("."+m.active)},selectedItem:function(){var e=M.not(b.unselectable).filter("."+m.selected);return 0<e.length?e:M.eq(0)},itemWithAdditions:function(e){var t=U.get.item(e),e=U.create.userChoice(e);return t=e&&0<e.length?0<t.length?t.add(e):e:t},item:function(n,i){var e,o,a=!1;return n=n!==oe?n:U.get.values()!==oe?U.get.values():U.get.text(),e=(o=U.is.multiple()&&Array.isArray(n))?0<n.length:n!==oe&&null!==n,i=""===n||!1===n||!0===n||(i||!1),e&&M.each(function(){var e=te(this),t=U.get.choiceText(e),t=U.get.choiceValue(e,t);if(null!==t&&t!==oe)if(o)-1!==te.inArray(U.escape.htmlEntities(String(t)),n.map(function(e){return String(e)}))&&(a=a?a.add(e):e);else if(i){if(U.verbose("Ambiguous dropdown value using strict type check",e,n),t===n)return a=e,!0}else if(f.ignoreCase&&(t=t.toLowerCase(),n=n.toLowerCase()),U.escape.htmlEntities(String(t))===U.escape.htmlEntities(String(n)))return U.verbose("Found select item by value",t,n),a=e,!0}),a},displayType:function(){return k.hasClass("column")?"flex":f.displayType}},check:{maxSelections:function(e){return!f.maxSelections||((e=e!==oe?e:U.get.selectionCount())>=f.maxSelections?(U.debug("Maximum selection count reached"),f.useLabels&&(M.addClass(m.filtered),U.add.message(g.maxSelections)),!0):(U.verbose("No longer at maximum selection count"),U.remove.message(),U.remove.filteredItem(),U.is.searchSelection()&&U.filterItems(),!1))},disabled:function(){D.attr("tabindex",U.is.disabled()?-1:0)}},restore:{defaults:function(e){U.clear(e),U.restore.defaultText(),U.restore.defaultValue()},defaultText:function(){var e=U.get.defaultText();e===U.get.placeholderText?(U.debug("Restoring default placeholder text",e),U.set.placeholderText(e)):(U.debug("Restoring default text",e),U.set.text(e))},placeholderText:function(){U.set.placeholderText()},defaultValue:function(){var e=U.get.defaultValue();e!==oe&&(U.debug("Restoring default value",e),""!==e?(U.set.value(e),U.set.selected()):(U.remove.activeItem(),U.remove.selectedItem()))},labels:function(){f.allowAdditions&&(f.useLabels||(U.error(y.labels),f.useLabels=!0),U.debug("Restoring selected values"),U.create.userLabels()),U.check.maxSelections()},selected:function(){U.restore.values(),U.is.multiple()?(U.debug("Restoring previously selected values and labels"),U.restore.labels()):U.debug("Restoring previously selected values")},values:function(){U.set.initialLoad(),f.apiSettings&&f.saveRemoteData&&U.get.remoteValues()?U.restore.remoteValues():U.set.selected();var e=U.get.value();!e||""===e||Array.isArray(e)&&0===e.length?E.addClass(m.noselection):E.removeClass(m.noselection),U.remove.initialLoad()},remoteValues:function(){var e=U.get.remoteValues();U.debug("Recreating selected from session data",e),e&&(U.is.single()?te.each(e,function(e,t){U.set.text(t)}):te.each(e,function(e,t){U.add.label(e,t)}))}},read:{remoteData:function(e){if(ne.Storage!==oe)return(e=sessionStorage.getItem(e))!==oe&&e;U.error(y.noStorage)}},save:{defaults:function(){U.save.defaultText(),U.save.placeholderText(),U.save.defaultValue()},defaultValue:function(){var e=U.get.value();U.verbose("Saving default value as",e),k.data(h.defaultValue,e)},defaultText:function(){var e=U.get.text();U.verbose("Saving default text as",e),k.data(h.defaultText,e)},placeholderText:function(){var e;!1!==f.placeholder&&S.hasClass(m.placeholder)&&(e=U.get.text(),U.verbose("Saving placeholder text as",e),k.data(h.placeholderText,e))},remoteData:function(e,t){ne.Storage!==oe?(U.verbose("Saving remote data to session storage",t,e),sessionStorage.setItem(t,e)):U.error(y.noStorage)}},clear:function(e){U.is.multiple()&&f.useLabels?U.remove.labels(k.find(b.label),e):(U.remove.activeItem(),U.remove.selectedItem(),U.remove.filteredItem()),U.set.placeholderText(),U.clearValue(e)},clearValue:function(e){U.set.value("",null,null,e)},scrollPage:function(e,t){var n=t||U.get.selectedItem(),i=n.closest(b.menu),o=i.outerHeight(),a=i.scrollTop(),t=M.eq(0).outerHeight(),o=Math.floor(o/t),a=(i.prop("scrollHeight"),"up"==e?a-t*o:a+t*o),t=M.not(b.unselectable),o="up"==e?t.index(n)-o:t.index(n)+o,t=("up"==e?0<=o:o<t.length)?t.eq(o):"up"==e?t.first():t.last();0<t.length&&(U.debug("Scrolling page",e,t),n.removeClass(m.selected),t.addClass(m.selected),f.selectOnKeydown&&U.is.single()&&U.set.selectedItem(t),i.scrollTop(a))},set:{filtered:function(){var e=U.is.multiple(),t=U.is.searchSelection(),n=e&&t,i=t?U.get.query():"",o="string"==typeof i&&0<i.length,t=U.get.searchWidth(),i=""!==i;e&&o&&(U.verbose("Adjusting input width",t,f.glyphWidth),D.css("width",t)),o||n&&i?(U.verbose("Hiding placeholder text"),S.addClass(m.filtered)):e&&(!n||i)||(U.verbose("Showing placeholder text"),S.removeClass(m.filtered))},empty:function(){k.addClass(m.empty)},loading:function(){k.addClass(m.loading)},placeholderText:function(e){e=e||U.get.placeholderText(),U.debug("Setting placeholder text",e),U.set.text(e),S.addClass(m.placeholder)},tabbable:function(){U.is.searchSelection()?(U.debug("Added tabindex to searchable dropdown"),D.val(""),U.check.disabled(),R.attr("tabindex",-1)):(U.debug("Added tabindex to dropdown"),k.attr("tabindex")===oe&&(k.attr("tabindex",0),R.attr("tabindex",-1)))},initialLoad:function(){U.verbose("Setting initial load"),e=!0},activeItem:function(e){f.allowAdditions&&0<e.filter(b.addition).length?e.addClass(m.filtered):e.addClass(m.active)},partialSearch:function(e){var t=U.get.query().length;D.val(e.substr(0,t))},scrollPosition:function(e,t){var n,i,o=(e=e||U.get.selectedItem()).closest(b.menu),a=e&&0<e.length;t=t!==oe&&t,0===U.get.activeItem().length&&(t=!1),e&&0<o.length&&a&&(e.position().top,o.addClass(m.loading),e=(a=o.scrollTop())-o.offset().top+e.offset().top,t||(i=a+o.height()<e+5,n=e-5<a),U.debug("Scrolling to active item",e),(t||n||i)&&o.scrollTop(e),o.removeClass(m.loading))},text:function(e){"combo"===f.action?(U.debug("Changing combo button text",e,O),f.preserveHTML?O.html(e):O.text(e)):"activate"===f.action&&(e!==U.get.placeholderText()&&S.removeClass(m.placeholder),U.debug("Changing text",e,S),S.removeClass(m.filtered),f.preserveHTML?S.html(e):S.text(e))},selectedItem:function(e){var t=U.get.choiceValue(e),n=U.get.choiceText(e,!1),i=U.get.choiceText(e,!0);U.debug("Setting user selection to item",e),U.remove.activeItem(),U.set.partialSearch(n),U.set.activeItem(e),U.set.selected(t,e),U.set.text(i)},selectedLetter:function(e){var t=M.filter("."+m.selected),n=0<t.length&&U.has.firstLetter(t,e),i=!1;n&&(n=t.nextAll(M).eq(0),U.has.firstLetter(n,e)&&(i=n)),i||M.each(function(){if(U.has.firstLetter(te(this),e))return i=te(this),!1}),i&&(U.verbose("Scrolling to next value with letter",e),U.set.scrollPosition(i),t.removeClass(m.selected),i.addClass(m.selected),f.selectOnKeydown&&U.is.single()&&U.set.selectedItem(i))},direction:function(e){"auto"==f.direction?(e?U.is.upward(e)&&U.remove.upward(e):U.remove.upward(),(U.can.openDownward(e)?U.remove:U.set).upward(e),U.is.leftward(e)||U.can.openRightward(e)||U.set.leftward(e)):"upward"==f.direction&&U.set.upward(e)},upward:function(e){(e||k).addClass(m.upward)},leftward:function(e){(e||R).addClass(m.leftward)},value:function(e,t,n,i){e===oe||""===e||Array.isArray(e)&&0===e.length?E.addClass(m.noselection):E.removeClass(m.noselection);var o=U.escape.value(e),a=0<E.length,r=U.get.values(),s=e!==oe?String(e):e;if(a){if(!f.allowReselection&&s==r&&(U.verbose("Skipping value update already same value",e,r),!U.is.initialLoad()))return;U.is.single()&&U.has.selectInput()&&U.can.extendSelect()&&(U.debug("Adding user option",e),U.add.optionValue(e)),U.debug("Updating input value",o,r),V=!0,E.val(o),!1===f.fireOnInit&&U.is.initialLoad()?U.debug("Input native change event ignored on initial load"):!0!==i&&U.trigger.change(),V=!1}else U.verbose("Storing value in metadata",o,E),o!==r&&k.data(h.value,s);!1===f.fireOnInit&&U.is.initialLoad()?U.verbose("No callback on initial load",f.onChange):!0!==i&&f.onChange.call(z,e,t,n)},active:function(){k.addClass(m.active)},multiple:function(){k.addClass(m.multiple)},visible:function(){k.addClass(m.visible)},exactly:function(e,t){U.debug("Setting selected to exact values"),U.clear(),U.set.selected(e,t)},selected:function(e,s,l,c){var u=U.is.multiple();(s=f.allowAdditions?s||U.get.itemWithAdditions(e):s||U.get.item(e))&&(U.debug("Setting selected menu item to",s),U.is.multiple()&&U.remove.searchWidth(),U.is.single()?(U.remove.activeItem(),U.remove.selectedItem()):f.useLabels&&U.remove.selectedItem(),s.each(function(){var e=te(this),t=U.get.choiceText(e),n=U.get.choiceValue(e,t),i=e.hasClass(m.filtered),o=e.hasClass(m.active),a=e.hasClass(m.addition),r=u&&1==s.length;u?!o||a?(f.apiSettings&&f.saveRemoteData&&U.save.remoteData(t,n),f.useLabels?(U.add.label(n,t,r),U.add.value(n,t,e),U.set.activeItem(e),U.filterActive(),U.select.nextAvailable(s)):(U.add.value(n,t,e),U.set.text(U.add.variables(g.count)),U.set.activeItem(e))):i||!f.useLabels&&!d||(U.debug("Selected active value, removing label"),U.remove.selected(n)):(f.apiSettings&&f.saveRemoteData&&U.save.remoteData(t,n),c||U.set.text(t),U.set.value(n,t,e,l),e.addClass(m.active).addClass(m.selected))}),c||U.remove.searchTerm())}},add:{label:function(e,t,n){var i,o=U.is.searchSelection()?D:S,a=U.escape.value(e);f.ignoreCase&&(a=a.toLowerCase()),i=te("<a />").addClass(m.label).attr("data-"+h.value,a).html(x.label(a,t,f.preserveHTML,f.className)),i=f.onLabelCreate.call(i,a,t),U.has.label(e)?U.debug("User selection already exists, skipping",a):(f.label.variation&&i.addClass(f.label.variation),!0===n?(U.debug("Animating in label",i),i.addClass(m.hidden).insertBefore(o).transition({animation:f.label.transition,debug:f.debug,verbose:f.verbose,duration:f.label.duration})):(U.debug("Adding selection label",i),i.insertBefore(o)))},message:function(e){var t=R.children(b.message),e=f.templates.message(U.add.variables(e));0<t.length?t.html(e):te("<div/>").html(e).addClass(m.message).appendTo(R)},optionValue:function(e){var t=U.escape.value(e);0<E.find('option[value="'+U.escape.string(t)+'"]').length||(U.disconnect.selectObserver(),U.is.single()&&(U.verbose("Removing previous user addition"),E.find("option."+m.addition).remove()),te("<option/>").prop("value",t).addClass(m.addition).html(e).appendTo(E),U.verbose("Adding user addition as an <option>",e),U.observe.select())},userSuggestion:function(e){var t=R.children(b.addition),n=U.get.item(e),i=n&&n.not(b.addition).length,n=0<t.length;f.useLabels&&U.has.maxSelections()||(""===e||i?t.remove():(n?(t.data(h.value,e).data(h.text,e).attr("data-"+h.value,e).attr("data-"+h.text,e).removeClass(m.filtered),f.hideAdditions||(n=f.templates.addition(U.add.variables(g.addResult,e)),t.html(n)),U.verbose("Replacing user suggestion with new value",t)):((t=U.create.userChoice(e)).prependTo(R),U.verbose("Adding item choice to menu corresponding with user choice addition",t)),f.hideAdditions&&!U.is.allFiltered()||t.addClass(m.selected).siblings().removeClass(m.selected),U.refreshItems()))},variables:function(e,t){var n,i=-1!==e.search("{count}"),o=-1!==e.search("{maxCount}"),a=-1!==e.search("{term}");return U.verbose("Adding templated variables to message",e),i&&(n=U.get.selectionCount(),e=e.replace("{count}",n)),o&&(n=U.get.selectionCount(),e=e.replace("{maxCount}",f.maxSelections)),a&&(t=t||U.get.query(),e=e.replace("{term}",t)),e},value:function(e,t,n){var i,o=U.get.values(!0);U.has.value(e)?U.debug("Value already selected"):""!==e?(i=Array.isArray(o)?(i=o.concat([e]),U.get.uniqueArray(i)):[e],U.has.selectInput()?U.can.extendSelect()&&(U.debug("Adding value to select",e,i,E),U.add.optionValue(e)):(i=i.join(f.delimiter),U.debug("Setting hidden input to delimited value",i,E)),!1===f.fireOnInit&&U.is.initialLoad()?U.verbose("Skipping onadd callback on initial load",f.onAdd):f.onAdd.call(z,e,t,n),U.set.value(i,t,n),U.check.maxSelections()):U.debug("Cannot select blank values from multiselect")}},remove:{active:function(){k.removeClass(m.active)},activeLabel:function(){k.find(b.label).removeClass(m.active)},empty:function(){k.removeClass(m.empty)},loading:function(){k.removeClass(m.loading)},initialLoad:function(){e=!1},upward:function(e){(e||k).removeClass(m.upward)},leftward:function(e){(e||R).removeClass(m.leftward)},visible:function(){k.removeClass(m.visible)},activeItem:function(){M.removeClass(m.active)},filteredItem:function(){f.useLabels&&U.has.maxSelections()||((f.useLabels&&U.is.multiple()?M.not("."+m.active):M).removeClass(m.filtered),f.hideDividers&&I.removeClass(m.hidden),U.remove.empty())},optionValue:function(e){var t=U.escape.value(e),e=E.find('option[value="'+U.escape.string(t)+'"]');0<e.length&&e.hasClass(m.addition)&&(r&&(r.disconnect(),U.verbose("Temporarily disconnecting mutation observer")),e.remove(),U.verbose("Removing user addition as an <option>",t),r&&r.observe(E[0],{childList:!0,subtree:!0}))},message:function(){R.children(b.message).remove()},searchWidth:function(){D.css("width","")},searchTerm:function(){U.verbose("Cleared search term"),D.val(""),U.set.filtered()},userAddition:function(){M.filter(b.addition).remove()},selected:function(e,t,i){if(!(t=f.allowAdditions?t||U.get.itemWithAdditions(e):t||U.get.item(e)))return!1;t.each(function(){var e=te(this),t=U.get.choiceText(e),n=U.get.choiceValue(e,t);U.is.multiple()?f.useLabels?(U.remove.value(n,t,e,i),U.remove.label(n)):(U.remove.value(n,t,e,i),0===U.get.selectionCount()?U.set.placeholderText():U.set.text(U.add.variables(g.count))):U.remove.value(n,t,e,i),e.removeClass(m.filtered).removeClass(m.active),f.useLabels&&e.removeClass(m.selected)})},selectedItem:function(){M.removeClass(m.selected)},value:function(e,t,n,i){var o,a=U.get.values();e=U.escape.htmlEntities(e),U.has.selectInput()?(U.verbose("Input is <select> removing selected option",e),o=U.remove.arrayValue(e,a),U.remove.optionValue(e)):(U.verbose("Removing from delimited values",e),o=(o=U.remove.arrayValue(e,a)).join(f.delimiter)),!1===f.fireOnInit&&U.is.initialLoad()?U.verbose("No callback on initial load",f.onRemove):f.onRemove.call(z,e,t,n),U.set.value(o,t,n,i),U.check.maxSelections()},arrayValue:function(t,e){return Array.isArray(e)||(e=[e]),e=te.grep(e,function(e){return t!=e}),U.verbose("Removed value from delimited string",t,e),e},label:function(e,t){e=U.escape.value(e),e=k.find(b.label).filter("[data-"+h.value+'="'+U.escape.string(f.ignoreCase?e.toLowerCase():e)+'"]');U.verbose("Removing label",e),e.remove()},activeLabels:function(e){e=e||k.find(b.label).filter("."+m.active),U.verbose("Removing active label selections",e),U.remove.labels(e)},labels:function(e,o){e=e||k.find(b.label),U.verbose("Removing labels",e),e.each(function(){var e=te(this),t=e.data(h.value),n=t!==oe?String(t):t,i=U.is.userValue(n);!1!==f.onLabelRemove.call(e,t)?(U.remove.message(),i?(U.remove.value(n,n,U.get.item(n),o),U.remove.label(n)):U.remove.selected(n,!1,o)):U.debug("Label remove callback cancelled removal")})},tabbable:function(){U.is.searchSelection()?(U.debug("Searchable dropdown initialized"),D.removeAttr("tabindex")):(U.debug("Simple selection dropdown initialized"),k.removeAttr("tabindex")),R.removeAttr("tabindex")},diacritics:function(e){return f.ignoreDiacritics?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}},has:{menuSearch:function(){return U.has.search()&&0<D.closest(R).length},clearItem:function(){return 0<P.length},search:function(){return 0<D.length},sizer:function(){return 0<A.length},selectInput:function(){return E.is("select")},minCharacters:function(e){return f.minCharacters&&!q?(e=e!==oe?String(e):String(U.get.query())).length>=f.minCharacters:!(q=!1)},firstLetter:function(e,t){return!(!e||0===e.length||"string"!=typeof t)&&(e=U.get.choiceText(e,!1),(t=t.toLowerCase())==String(e).charAt(0).toLowerCase())},input:function(){return 0<E.length},items:function(){return 0<M.length},menu:function(){return 0<R.length},subMenu:function(e){return 0<(e||R).find(b.menu).length},message:function(){return 0!==R.children(b.message).length},label:function(e){var t=U.escape.value(e),e=k.find(b.label);return f.ignoreCase&&(t=t.toLowerCase()),0<e.filter("[data-"+h.value+'="'+U.escape.string(t)+'"]').length},maxSelections:function(){return f.maxSelections&&U.get.selectionCount()>=f.maxSelections},allResultsFiltered:function(){var e=M.not(b.addition);return e.filter(b.unselectable).length===e.length},userSuggestion:function(){return 0<R.children(b.addition).length},query:function(){return""!==U.get.query()},value:function(e){return f.ignoreCase?U.has.valueIgnoringCase(e):U.has.valueMatchingCase(e)},valueMatchingCase:function(e){var t=U.get.values(!0);return!!(Array.isArray(t)?t&&-1!==te.inArray(e,t):t==e)},valueIgnoringCase:function(n){var e=U.get.values(!0),i=!1;return Array.isArray(e)||(e=[e]),te.each(e,function(e,t){if(String(n).toLowerCase()==String(t).toLowerCase())return!(i=!0)}),i}},is:{active:function(){return k.hasClass(m.active)},animatingInward:function(){return R.transition("is inward")},animatingOutward:function(){return R.transition("is outward")},bubbledLabelClick:function(e){return te(e.target).is("select, input")&&0<k.closest("label").length},bubbledIconClick:function(e){return 0<te(e.target).closest(F).length},chrome:function(){return!(!ne.chrome||!ne.chrome.webstore&&!ne.chrome.runtime)},alreadySetup:function(){return k.is("select")&&k.parent(b.dropdown).data(w)!==oe&&0===k.prev().length},animating:function(e){return e?e.transition&&e.transition("is animating"):R.transition&&R.transition("is animating")},leftward:function(e){return(e||R).hasClass(m.leftward)},clearable:function(){return k.hasClass(m.clearable)||f.clearable},disabled:function(){return k.hasClass(m.disabled)},focused:function(){return ie.activeElement===k[0]},focusedOnSearch:function(){return ie.activeElement===D[0]},allFiltered:function(){return(U.is.multiple()||U.has.search())&&!(0==f.hideAdditions&&U.has.userSuggestion())&&!U.has.message()&&U.has.allResultsFiltered()},hidden:function(e){return!U.is.visible(e)},initialLoad:function(){return e},inObject:function(n,e){var i=!1;return te.each(e,function(e,t){if(t==n)return i=!0}),i},multiple:function(){return k.hasClass(m.multiple)},remote:function(){return f.apiSettings&&U.can.useAPI()},noApiCache:function(){return f.apiSettings&&!f.apiSettings.cache},single:function(){return!U.is.multiple()},selectMutation:function(e){var n=!1;return te.each(e,function(e,t){if(te(t.target).is("select")||te(t.addedNodes).is("select"))return!(n=!0)}),n},search:function(){return k.hasClass(m.search)},searchSelection:function(){return U.has.search()&&1===D.parent(b.dropdown).length},selection:function(){return k.hasClass(m.selection)},userValue:function(e){return-1!==te.inArray(e,U.get.userValues())},upward:function(e){return(e||k).hasClass(m.upward)},visible:function(e){return(e||R).hasClass(m.visible)},verticallyScrollableContext:function(){var e=T.get(0)!==ne&&T.css("overflow-y");return"auto"==e||"scroll"==e},horizontallyScrollableContext:function(){var e=T.get(0)!==ne&&T.css("overflow-X");return"auto"==e||"scroll"==e}},can:{activate:function(e){return!!f.useLabels||(!U.has.maxSelections()||!(!U.has.maxSelections()||!e.hasClass(m.active)))},openDownward:function(e){var t,n=e||R,i=!0;return n.addClass(m.loading),e={context:{offset:T.get(0)===ne?{top:0,left:0}:T.offset(),scrollTop:T.scrollTop(),height:T.outerHeight()},menu:{offset:n.offset(),height:n.outerHeight()}},U.is.verticallyScrollableContext()&&(e.menu.offset.top+=e.context.scrollTop),U.has.subMenu(n)&&(e.menu.height+=n.find(b.menu).first().outerHeight()),i=(t={above:e.context.scrollTop<=e.menu.offset.top-e.context.offset.top-e.menu.height,below:e.context.scrollTop+e.context.height>=e.menu.offset.top-e.context.offset.top+e.menu.height}).below?(U.verbose("Dropdown can fit in context downward",t),!0):t.above?(U.verbose("Dropdown cannot fit below, opening upward",t),!1):(U.verbose("Dropdown cannot fit in either direction, favoring downward",t),!0),n.removeClass(m.loading),i},openRightward:function(e){var t,n=e||R,i=!0;return n.addClass(m.loading),e={context:{offset:T.get(0)===ne?{top:0,left:0}:T.offset(),scrollLeft:T.scrollLeft(),width:T.outerWidth()},menu:{offset:n.offset(),width:n.outerWidth()}},U.is.horizontallyScrollableContext()&&(e.menu.offset.left+=e.context.scrollLeft),(t=e.menu.offset.left-e.context.offset.left+e.menu.width>=e.context.scrollLeft+e.context.width)&&(U.verbose("Dropdown cannot fit in context rightward",t),i=!1),n.removeClass(m.loading),i},click:function(){return K||"click"==f.on},extendSelect:function(){return f.allowAdditions||f.apiSettings},show:function(){return!U.is.disabled()&&(U.has.items()||U.has.message())},useAPI:function(){return te.fn.api!==oe}},animate:{show:function(e,t){var n=t||R,i=t?function(){}:function(){U.hideSubMenus(),U.hideOthers(),U.set.active()};e=te.isFunction(e)?e:function(){},U.verbose("Doing menu show animation",n),U.set.direction(t),t=f.transition.showMethod||U.get.transition(t),U.is.selection()&&U.set.scrollPosition(U.get.selectedItem(),!0),(U.is.hidden(n)||U.is.animating(n))&&("none"===t?(i(),n.transition({displayType:U.get.displayType()}).transition("show"),e.call(z)):te.fn.transition!==oe&&k.transition("is supported")?n.transition({animation:t+" in",debug:f.debug,verbose:f.verbose,duration:f.transition.showDuration||f.duration,queue:!0,onStart:i,displayType:U.get.displayType(),onComplete:function(){e.call(z)}}):U.error(y.noTransition,t))},hide:function(e,t){var n=t||R,i=t?function(){}:function(){U.can.click()&&U.unbind.intent(),U.remove.active()},t=f.transition.hideMethod||U.get.transition(t);e=te.isFunction(e)?e:function(){},(U.is.visible(n)||U.is.animating(n))&&(U.verbose("Doing menu hide animation",n),"none"===t?(i(),n.transition({displayType:U.get.displayType()}).transition("hide"),e.call(z)):te.fn.transition!==oe&&k.transition("is supported")?n.transition({animation:t+" out",duration:f.transition.hideDuration||f.duration,debug:f.debug,verbose:f.verbose,queue:!1,onStart:i,displayType:U.get.displayType(),onComplete:function(){e.call(z)}}):U.error(y.transition))}},hideAndClear:function(){U.remove.searchTerm(),U.has.maxSelections()||(U.has.search()?U.hide(function(){U.remove.filteredItem()}):U.hide())},delay:{show:function(){U.verbose("Delaying show event to ensure user intent"),clearTimeout(U.timer),U.timer=setTimeout(U.show,f.delay.show)},hide:function(){U.verbose("Delaying hide event to ensure user intent"),clearTimeout(U.timer),U.timer=setTimeout(U.hide,f.delay.hide)}},escape:{value:function(e){var t=Array.isArray(e),n="string"==typeof e,i=!n&&!t,n=n&&-1!==e.search(v.quote),o=[];return i||!n?e:(U.debug("Encoding quote values for use in select",e),t?(te.each(e,function(e,t){o.push(t.replace(v.quote,"&quot;"))}),o):e.replace(v.quote,"&quot;"))},string:function(e){return(e=String(e)).replace(v.escape,"\\$&")},htmlEntities:function(e){var t={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?(e=e.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;")).replace(/[<>"'`]/g,function(e){return t[e]}):e}},setting:function(e,t){if(U.debug("Changing setting",e,t),te.isPlainObject(e))te.extend(!0,f,e);else{if(t===oe)return f[e];te.isPlainObject(f[e])?te.extend(!0,f[e],t):f[e]=t}},internal:function(e,t){if(te.isPlainObject(e))te.extend(!0,U,e);else{if(t===oe)return U[e];U[e]=t}},debug:function(){!f.silent&&f.debug&&(f.performance?U.performance.log(arguments):(U.debug=Function.prototype.bind.call(console.info,console,f.name+":"),U.debug.apply(console,arguments)))},verbose:function(){!f.silent&&f.verbose&&f.debug&&(f.performance?U.performance.log(arguments):(U.verbose=Function.prototype.bind.call(console.info,console,f.name+":"),U.verbose.apply(console,arguments)))},error:function(){f.silent||(U.error=Function.prototype.bind.call(console.error,console,f.name+":"),U.error.apply(console,arguments))},performance:{log:function(e){var t,n;f.performance&&(n=(t=(new Date).getTime())-(G||t),G=t,J.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":n})),clearTimeout(U.performance.timer),U.performance.timer=setTimeout(U.performance.display,500)},display:function(){var e=f.name+":",n=0;G=!1,clearTimeout(U.performance.timer),te.each(J,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",X&&(e+=" '"+X+"'"),(console.group!==oe||console.table!==oe)&&0<J.length&&(console.groupCollapsed(e),console.table?console.table(J):te.each(J,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),J=[]}},invoke:function(i,e,t){var o,a,n,r=H;return e=e||ee,t=z||t,"string"==typeof i&&r!==oe&&(i=i.split(/[\. ]/),o=i.length-1,te.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(te.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==oe)return a=r[n],!1;{if(!te.isPlainObject(r[t])||e==o)return r[t]!==oe?a=r[t]:U.error(y.method,i),!1;r=r[t]}}})),te.isFunction(a)?n=a.apply(t,e):a!==oe&&(n=a),Array.isArray(W)?W.push(n):W!==oe?W=[W,n]:n!==oe&&(W=n),a}};_?(H===oe&&U.initialize(),U.invoke(Z)):(H!==oe&&H.invoke("destroy"),U.initialize())}),W!==oe?W:Y},te.fn.dropdown.settings={silent:!1,debug:!1,verbose:!1,performance:!0,on:"click",action:"activate",values:!1,clearable:!1,apiSettings:!1,selectOnKeydown:!0,minCharacters:0,filterRemoteData:!1,saveRemoteData:!0,throttle:200,context:ne,direction:"auto",keepOnScreen:!0,match:"both",fullTextSearch:!1,ignoreDiacritics:!1,hideDividers:!1,placeholder:"auto",preserveHTML:!0,sortSelect:!1,forceSelection:!0,allowAdditions:!1,ignoreCase:!1,ignoreSearchCase:!0,hideAdditions:!0,maxSelections:!1,useLabels:!0,delimiter:",",showOnFocus:!0,allowReselection:!1,allowTab:!0,allowCategorySelection:!1,fireOnInit:!1,transition:"auto",duration:200,displayType:!1,glyphWidth:1.037,headerDivider:!0,label:{transition:"scale",duration:200,variation:!1},delay:{hide:300,show:200,search:20,touch:50},onChange:function(e,t,n){},onAdd:function(e,t,n){},onRemove:function(e,t,n){},onSearch:function(e){},onLabelSelect:function(e){},onLabelCreate:function(e,t){return te(this)},onLabelRemove:function(e){return!0},onNoResults:function(e){return!0},onShow:function(){},onHide:function(){},name:"Dropdown",namespace:"dropdown",message:{addResult:"Add <b>{term}</b>",count:"{count} selected",maxSelections:"Max {maxCount} selections",noResults:"No results found.",serverError:"There was an error contacting the server"},error:{action:"You called a dropdown action that was not defined",alreadySetup:"Once a select has been initialized behaviors must be called on the created ui dropdown",labels:"Allowing user additions currently requires the use of labels.",missingMultiple:"<select> requires multiple property to be set to correctly preserve multiple values",method:"The method you called is not defined.",noAPI:"The API module is required to load resources remotely",noStorage:"Saving remote data requires session storage",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",noNormalize:'"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including <https://cdn.jsdelivr.net/npm/unorm@1.4.1/lib/unorm.min.js> as a polyfill.'},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s:=@]/g,quote:/"/g},metadata:{defaultText:"defaultText",defaultValue:"defaultValue",placeholderText:"placeholder",text:"text",value:"value"},fields:{remoteValues:"results",values:"values",disabled:"disabled",name:"name",description:"description",descriptionVertical:"descriptionVertical",value:"value",text:"text",type:"type",image:"image",imageClass:"imageClass",icon:"icon",iconClass:"iconClass",class:"class",divider:"divider"},keys:{backspace:8,delimiter:188,deleteKey:46,enter:13,escape:27,pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},selector:{addition:".addition",divider:".divider, .header",dropdown:".ui.dropdown",hidden:".hidden",icon:"> .dropdown.icon",input:'> input[type="hidden"], > select',item:".item",label:"> .label",remove:"> .label > .delete.icon",siblingLabel:".label",menu:".menu",message:".message",menuIcon:".dropdown.icon",search:"input.search, .menu > .search > input, .menu input.search",sizer:"> span.sizer",text:"> .text:not(.icon)",unselectable:".disabled, .filtered",clearIcon:"> .remove.icon"},className:{active:"active",addition:"addition",animating:"animating",description:"description",descriptionVertical:"vertical",disabled:"disabled",empty:"empty",dropdown:"ui dropdown",filtered:"filtered",hidden:"hidden transition",icon:"icon",image:"image",item:"item",label:"ui label",loading:"loading",menu:"menu",message:"message",multiple:"multiple",placeholder:"default",sizer:"sizer",search:"search",selected:"selected",selection:"selection",text:"text",upward:"upward",leftward:"left",visible:"visible",clearable:"clearable",noselection:"noselection",delete:"delete",header:"header",divider:"divider",groupIcon:"",unfilterable:"unfilterable"}},te.fn.dropdown.settings.templates={deQuote:function(e,t){return String(e).replace(/"/g,t?"&quot;":"")},escape:function(e,t){if(t)return e;var n={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?(e=e.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;")).replace(/[<>"'`]/g,function(e){return n[e]}):e},dropdown:function(e,t,n,i){var o=e.placeholder||!1,a="",r=te.fn.dropdown.settings.templates.escape;return a+='<i class="dropdown icon"></i>',a+=o?'<div class="default text">'+r(o,n)+"</div>":'<div class="text"></div>',a+='<div class="'+i.menu+'">',a+=te.fn.dropdown.settings.templates.menu(e,t,n,i),a+="</div>"},menu:function(e,l,c,u){var e=e[l.values]||[],d="",f=te.fn.dropdown.settings.templates.escape,m=te.fn.dropdown.settings.templates.deQuote;return te.each(e,function(e,t){var n,i,o,a,r=t[l.type]||"item",s=-1!==r.indexOf("menu");"item"===r||s?(n=t[l.text]?' data-text="'+m(t[l.text],!0)+'"':"",i=t[l.disabled]?u.disabled+" ":"",o=t[l.descriptionVertical]?u.descriptionVertical+" ":"",a=""!=f(t[l.description]||"",c),d+='<div class="'+i+o+(t[l.class]?m(t[l.class]):u.item)+'" data-value="'+m(t[l.value],!0)+'"'+n+">",s&&(d+='<i class="'+(-1!==r.indexOf("left")?"left":"")+' dropdown icon"></i>'),t[l.image]&&(d+='<img class="'+(t[l.imageClass]?m(t[l.imageClass]):u.image)+'" src="'+m(t[l.image])+'">'),t[l.icon]&&(d+='<i class="'+m(t[l.icon])+" "+(t[l.iconClass]?m(t[l.iconClass]):u.icon)+'"></i>'),a&&(d+='<span class="'+u.description+'">'+f(t[l.description]||"",c)+"</span>",d+=s?"":'<span class="'+u.text+'">'),s&&(d+='<span class="'+u.text+'">'),d+=f(t[l.name]||"",c),s?(d+="</span>",d+='<div class="'+r+'">',d+=te.fn.dropdown.settings.templates.menu(t,l,c,u),d+="</div>"):a&&(d+="</span>"),d+="</div>"):"header"===r&&(a=f(t[l.name]||"",c),r=t[l.icon]?m(t[l.icon]):u.groupIcon,""===a&&""===r||(d+='<div class="'+(t[l.class]?m(t[l.class]):u.header)+'">',""!==r&&(d+='<i class="'+r+" "+(t[l.iconClass]?m(t[l.iconClass]):u.icon)+'"></i>'),d+=a,d+="</div>"),t[l.divider]&&(d+='<div class="'+u.divider+'"></div>'))}),d},label:function(e,t,n,i){return(0,te.fn.dropdown.settings.templates.escape)(t,n)+'<i class="'+i.delete+' icon"></i>'},message:function(e){return e},addition:function(e){return e}}}(jQuery,window,document),function(T,e,S){"use strict";T.isFunction=T.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),T.fn.embed=function(p){var h,v=T(this),b=v.selector||"",y=(new Date).getTime(),x=[],C=p,w="string"==typeof C,k=[].slice.call(arguments,1);return v.each(function(){var i=T.isPlainObject(p)?T.extend(!0,{},T.fn.embed.settings,p):T.extend({},T.fn.embed.settings),e=i.selector,t=i.className,o=i.sources,s=i.error,a=i.metadata,n=i.namespace,r=i.templates,l="."+n,c="module-"+n,u=T(this),d=(u.find(e.placeholder),u.find(e.icon),u.find(e.embed)),f=this,m=u.data(c),g={initialize:function(){g.debug("Initializing embed"),g.determine.autoplay(),g.create(),g.bind.events(),g.instantiate()},instantiate:function(){g.verbose("Storing instance of module",g),m=g,u.data(c,g)},destroy:function(){g.verbose("Destroying previous instance of embed"),g.reset(),u.removeData(c).off(l)},refresh:function(){g.verbose("Refreshing selector cache"),u.find(e.placeholder),u.find(e.icon),d=u.find(e.embed)},bind:{events:function(){g.has.placeholder()&&(g.debug("Adding placeholder events"),u.on("click"+l,e.placeholder,g.createAndShow).on("click"+l,e.icon,g.createAndShow))}},create:function(){g.get.placeholder()?g.createPlaceholder():g.createAndShow()},createPlaceholder:function(e){var t=g.get.icon(),n=g.get.url();g.generate.embed(n);e=e||g.get.placeholder(),u.html(r.placeholder(e,t)),g.debug("Creating placeholder for embed",e,t)},createEmbed:function(e){g.refresh(),e=e||g.get.url(),d=T("<div/>").addClass(t.embed).html(g.generate.embed(e)).appendTo(u),i.onCreate.call(f,e),g.debug("Creating embed object",d)},changeEmbed:function(e){d.html(g.generate.embed(e))},createAndShow:function(){g.createEmbed(),g.show()},change:function(e,t,n){g.debug("Changing video to ",e,t,n),u.data(a.source,e).data(a.id,t),n?u.data(a.url,n):u.removeData(a.url),g.has.embed()?g.changeEmbed():g.create()},reset:function(){g.debug("Clearing embed and showing placeholder"),g.remove.data(),g.remove.active(),g.remove.embed(),g.showPlaceholder(),i.onReset.call(f)},show:function(){g.debug("Showing embed"),g.set.active(),i.onDisplay.call(f)},hide:function(){g.debug("Hiding embed"),g.showPlaceholder()},showPlaceholder:function(){g.debug("Showing placeholder image"),g.remove.active(),i.onPlaceholderDisplay.call(f)},get:{id:function(){return i.id||u.data(a.id)},placeholder:function(){return i.placeholder||u.data(a.placeholder)},icon:function(){return i.icon||(u.data(a.icon)!==S?u.data(a.icon):g.determine.icon())},source:function(e){return i.source||(u.data(a.source)!==S?u.data(a.source):g.determine.source())},type:function(){var e=g.get.source();return o[e]!==S&&o[e].type},url:function(){return i.url||(u.data(a.url)!==S?u.data(a.url):g.determine.url())}},determine:{autoplay:function(){g.should.autoplay()&&(i.autoplay=!0)},source:function(n){var i=!1;return(n=n||g.get.url())&&T.each(o,function(e,t){if(-1!==n.search(t.domain))return i=e,!1}),i},icon:function(){var e=g.get.source();return o[e]!==S&&o[e].icon},url:function(){var e=i.id||u.data(a.id),t=i.source||u.data(a.source),e=o[t]!==S&&o[t].url.replace("{id}",e);return e&&u.data(a.url,e),e}},set:{active:function(){u.addClass(t.active)}},remove:{data:function(){u.removeData(a.id).removeData(a.icon).removeData(a.placeholder).removeData(a.source).removeData(a.url)},active:function(){u.removeClass(t.active)},embed:function(){d.empty()}},encode:{parameters:function(e){var t,n=[];for(t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&amp;")}},generate:{embed:function(e){g.debug("Generating embed html");var t,n=g.get.source();return(e=g.get.url(e))?(t=g.generate.parameters(n),t=r.iframe(e,t)):g.error(s.noURL,u),t},parameters:function(e,t){e=o[e]&&o[e].parameters!==S?o[e].parameters(i):{};return(t=t||i.parameters)&&(e=T.extend({},e,t)),e=i.onEmbed(e),g.encode.parameters(e)}},has:{embed:function(){return 0<d.length},placeholder:function(){return i.placeholder||u.data(a.placeholder)}},should:{autoplay:function(){return"auto"===i.autoplay?i.placeholder||u.data(a.placeholder)!==S:i.autoplay}},is:{video:function(){return"video"==g.get.type()}},setting:function(e,t){if(g.debug("Changing setting",e,t),T.isPlainObject(e))T.extend(!0,i,e);else{if(t===S)return i[e];T.isPlainObject(i[e])?T.extend(!0,i[e],t):i[e]=t}},internal:function(e,t){if(T.isPlainObject(e))T.extend(!0,g,e);else{if(t===S)return g[e];g[e]=t}},debug:function(){!i.silent&&i.debug&&(i.performance?g.performance.log(arguments):(g.debug=Function.prototype.bind.call(console.info,console,i.name+":"),g.debug.apply(console,arguments)))},verbose:function(){!i.silent&&i.verbose&&i.debug&&(i.performance?g.performance.log(arguments):(g.verbose=Function.prototype.bind.call(console.info,console,i.name+":"),g.verbose.apply(console,arguments)))},error:function(){i.silent||(g.error=Function.prototype.bind.call(console.error,console,i.name+":"),g.error.apply(console,arguments))},performance:{log:function(e){var t,n;i.performance&&(n=(t=(new Date).getTime())-(y||t),y=t,x.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:f,"Execution Time":n})),clearTimeout(g.performance.timer),g.performance.timer=setTimeout(g.performance.display,500)},display:function(){var e=i.name+":",n=0;y=!1,clearTimeout(g.performance.timer),T.each(x,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",b&&(e+=" '"+b+"'"),1<v.length&&(e+=" ("+v.length+")"),(console.group!==S||console.table!==S)&&0<x.length&&(console.groupCollapsed(e),console.table?console.table(x):T.each(x,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),x=[]}},invoke:function(i,e,t){var o,a,n,r=m;return e=e||k,t=f||t,"string"==typeof i&&r!==S&&(i=i.split(/[\. ]/),o=i.length-1,T.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(T.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==S)return a=r[n],!1;{if(!T.isPlainObject(r[t])||e==o)return r[t]!==S?a=r[t]:g.error(s.method,i),!1;r=r[t]}}})),T.isFunction(a)?n=a.apply(t,e):a!==S&&(n=a),Array.isArray(h)?h.push(n):h!==S?h=[h,n]:n!==S&&(h=n),a}};w?(m===S&&g.initialize(),g.invoke(C)):(m!==S&&m.invoke("destroy"),g.initialize())}),h!==S?h:this},T.fn.embed.settings={name:"Embed",namespace:"embed",silent:!1,debug:!1,verbose:!1,performance:!0,icon:!1,source:!1,url:!1,id:!1,autoplay:"auto",color:"#444444",hd:!0,brandedUI:!1,parameters:!1,onDisplay:function(){},onPlaceholderDisplay:function(){},onReset:function(){},onCreate:function(e){},onEmbed:function(e){return e},metadata:{id:"id",icon:"icon",placeholder:"placeholder",source:"source",url:"url"},error:{noURL:"No URL specified",method:"The method you called is not defined"},className:{active:"active",embed:"embed"},selector:{embed:".embed",placeholder:".placeholder",icon:".icon"},sources:{youtube:{name:"youtube",type:"video",icon:"video play",domain:"youtube.com",url:"//www.youtube.com/embed/{id}",parameters:function(e){return{autohide:!e.brandedUI,autoplay:e.autoplay,color:e.color||S,hq:e.hd,jsapi:e.api,modestbranding:!e.brandedUI}}},vimeo:{name:"vimeo",type:"video",icon:"video play",domain:"vimeo.com",url:"//player.vimeo.com/video/{id}",parameters:function(e){return{api:e.api,autoplay:e.autoplay,byline:e.brandedUI,color:e.color||S,portrait:e.brandedUI,title:e.brandedUI}}}},templates:{iframe:function(e,t){return t&&(e+="?"+t),'<iframe src="'+e+'" width="100%" height="100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'},placeholder:function(e,t){var n="";return t&&(n+='<i class="'+t+' icon"></i>'),e&&(n+='<img class="placeholder" src="'+e+'">'),n}},api:!1,onPause:function(){},onPlay:function(){},onStop:function(){}}}(jQuery,window,void document),function(z,N,H,U){"use strict";z.isFunction=z.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},N=void 0!==N&&N.Math==Math?N:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),z.fn.modal=function(A){var E,e=z(this),F=z(N),P=z(H),O=z("body"),R=e.selector||"",M=(new Date).getTime(),I=[],j=A,L="string"==typeof j,V=[].slice.call(arguments,1),q=N.requestAnimationFrame||N.mozRequestAnimationFrame||N.webkitRequestAnimationFrame||N.msRequestAnimationFrame||function(e){setTimeout(e,0)};return e.each(function(){var o,a,e,i,t,r,s,n,l,c,u=z.isPlainObject(A)?z.extend(!0,{},z.fn.modal.settings,A):z.extend({},z.fn.modal.settings),d=u.selector,f=u.className,m=u.namespace,g=u.fields,p=u.error,h="."+m,v="module-"+m,b=z(this),y=z(u.context),x=b.find(d.close),C=this,w=b.hasClass("modal")?b.data(v):U,k=!1,T="",S="",D={initialize:function(){var a;b.hasClass("modal")||(D.create.modal(),z.isFunction(u.onHidden)||(u.onHidden=function(){D.destroy(),b.remove()})),b.addClass(u.class),""!==u.title&&b.find(d.title).html(D.helpers.escape(u.title,u.preserveHTML)).addClass(u.classTitle),""!==u.content&&b.find(d.content).html(D.helpers.escape(u.content,u.preserveHTML)).addClass(u.classContent),D.has.configActions()&&(0===(a=b.find(d.actions).addClass(u.classActions)).length?a=z("<div/>",{class:f.actions+" "+(u.classActions||"")}).appendTo(b):a.empty(),u.actions.forEach(function(e){var t=e[g.icon]?'<i class="'+D.helpers.deQuote(e[g.icon])+' icon"></i>':"",n=D.helpers.escape(e[g.text]||"",u.preserveHTML),i=D.helpers.deQuote(e[g.class]||""),o=e[g.click]&&z.isFunction(e[g.click])?e[g.click]:function(){};a.append(z("<button/>",{html:t+n,class:f.button+" "+i,click:function(){!1!==o.call(C,b)&&D.hide()}}))})),D.cache={},D.verbose("Initializing dimmer",y),D.create.id(),D.create.dimmer(),u.allowMultiple&&D.create.innerDimmer(),u.centered||b.addClass("top aligned"),D.refreshModals(),D.bind.events(),u.observeChanges&&D.observeChanges(),D.instantiate(),u.autoShow&&D.show()},instantiate:function(){D.verbose("Storing instance of modal"),w=D,b.data(v,w)},create:{modal:function(){b=z("<div/>",{class:f.modal}),u.closeIcon&&(x=z("<i/>",{class:f.close}),b.append(x)),""!==u.title&&z("<div/>",{class:f.title}).appendTo(b),""!==u.content&&z("<div/>",{class:f.content}).appendTo(b),D.has.configActions()&&z("<div/>",{class:f.actions}).appendTo(b),y.append(b)},dimmer:function(){var e={debug:u.debug,dimmerName:"modals"},e=z.extend(!0,e,u.dimmerSettings);z.fn.dimmer!==U?(D.debug("Creating dimmer"),i=y.dimmer(e),u.detachable?(D.verbose("Modal is detachable, moving content into dimmer"),i.dimmer("add content",b)):D.set.undetached(),t=i.dimmer("get dimmer")):D.error(p.dimmer)},id:function(){l=(Math.random().toString(16)+"000000000").substr(2,8),n="."+l,D.verbose("Creating unique id for element",l)},innerDimmer:function(){0==b.find(d.dimmer).length&&b.prepend('<div class="ui inverted dimmer"></div>')}},destroy:function(){c&&c.disconnect(),D.verbose("Destroying previous modal"),b.removeData(v).off(h),F.off(n),t.off(n),x.off(h),y.dimmer("destroy")},observeChanges:function(){"MutationObserver"in N&&((c=new MutationObserver(function(e){D.debug("DOM tree modified, refreshing"),D.refresh()})).observe(C,{childList:!0,subtree:!0}),D.debug("Setting up mutation observer",c))},refresh:function(){D.remove.scrolling(),D.cacheSizes(),D.can.useFlex()||D.set.modalOffset(),D.set.screenHeight(),D.set.type()},refreshModals:function(){a=b.siblings(d.modal),o=a.add(b)},attachEvents:function(e,t){var n=z(e);t=z.isFunction(D[t])?D[t]:D.toggle,0<n.length?(D.debug("Attaching modal events to element",e,t),n.off(h).on("click"+h,t)):D.error(p.notFound,e)},bind:{events:function(){D.verbose("Attaching events"),b.on("click"+h,d.close,D.event.close).on("click"+h,d.approve,D.event.approve).on("click"+h,d.deny,D.event.deny),F.on("resize"+n,D.event.resize)},scrollLock:function(){i.get(0).addEventListener("touchmove",D.event.preventScroll,{passive:!1})}},unbind:{scrollLock:function(){i.get(0).removeEventListener("touchmove",D.event.preventScroll,{passive:!1})}},get:{id:function(){return(Math.random().toString(16)+"000000000").substr(2,8)},element:function(){return b},settings:function(){return u}},event:{approve:function(){k||!1===u.onApprove.call(C,z(this))?D.verbose("Approve callback returned false cancelling hide"):(k=!0,D.hide(function(){k=!1}))},preventScroll:function(e){-1!==e.target.className.indexOf("dimmer")&&e.preventDefault()},deny:function(){k||!1===u.onDeny.call(C,z(this))?D.verbose("Deny callback returned false cancelling hide"):(k=!0,D.hide(function(){k=!1}))},close:function(){D.hide()},mousedown:function(e){var t=z(e.target),n=D.is.rtl();(r=0<t.closest(d.modal).length)&&D.verbose("Mouse down event registered inside the modal"),(s=D.is.scrolling()&&(!n&&z(N).outerWidth()-u.scrollbarWidth<=e.clientX||n&&u.scrollbarWidth>=e.clientX))&&D.verbose("Mouse down event registered inside the scrollbar")},mouseup:function(e){if(u.closable)if(r)D.debug("Dimmer clicked but mouse down was initially registered inside the modal");else if(s)D.debug("Dimmer clicked but mouse down was initially registered inside the scrollbar");else{var t=0<z(e.target).closest(d.modal).length,e=z.contains(H.documentElement,e.target);if(!t&&e&&D.is.active()&&b.hasClass(f.front)){if(D.debug("Dimmer clicked, hiding all modals"),u.allowMultiple){if(!D.hideAll())return}else if(!D.hide())return;D.remove.clickaway()}}else D.verbose("Dimmer clicked but closable setting is disabled")},debounce:function(e,t){clearTimeout(D.timer),D.timer=setTimeout(e,t)},keyboard:function(e){27==e.which&&(u.closable?(D.debug("Escape key pressed hiding modal"),b.hasClass(f.front)&&D.hide()):D.debug("Escape key pressed, but closable is set to false"),e.preventDefault())},resize:function(){i.dimmer("is active")&&(D.is.animating()||D.is.active())&&q(D.refresh)}},toggle:function(){D.is.active()||D.is.animating()?D.hide():D.show()},show:function(e){e=z.isFunction(e)?e:function(){},D.refreshModals(),D.set.dimmerSettings(),D.set.dimmerStyles(),D.showModal(e)},hide:function(e){return e=z.isFunction(e)?e:function(){},D.refreshModals(),D.hideModal(e)},showModal:function(e){e=z.isFunction(e)?e:function(){},D.is.animating()||!D.is.active()?(D.showDimmer(),D.cacheSizes(),D.set.bodyMargin(),D.can.useFlex()?D.remove.legacy():(D.set.legacy(),D.set.modalOffset(),D.debug("Using non-flex legacy modal positioning.")),D.set.screenHeight(),D.set.type(),D.set.clickaway(),!u.allowMultiple&&D.others.active()?D.hideOthers(D.showModal):(k=!1,u.allowMultiple&&(D.others.active()&&a.filter("."+f.active).find(d.dimmer).addClass("active"),u.detachable&&b.detach().appendTo(t)),u.onShow.call(C),u.transition&&z.fn.transition!==U&&b.transition("is supported")?(D.debug("Showing modal with css animations"),b.transition({debug:u.debug,animation:(u.transition.showMethod||u.transition)+" in",queue:u.queue,duration:u.transition.showDuration||u.duration,useFailSafe:!0,onComplete:function(){u.onVisible.apply(C),u.keyboardShortcuts&&D.add.keyboardShortcuts(),D.save.focus(),D.set.active(),u.autofocus&&D.set.autofocus(),e()}})):D.error(p.noTransition))):D.debug("Modal is already visible")},hideModal:function(e,t,n){var i=a.filter("."+f.active).last();if(e=z.isFunction(e)?e:function(){},D.debug("Hiding modal"),!1===u.onHide.call(C,z(this)))return D.verbose("Hide callback returned false cancelling hide"),k=!1;(D.is.animating()||D.is.active())&&(u.transition&&z.fn.transition!==U&&b.transition("is supported")?(D.remove.active(),b.transition({debug:u.debug,animation:(u.transition.hideMethod||u.transition)+" out",queue:u.queue,duration:u.transition.hideDuration||u.duration,useFailSafe:!0,onStart:function(){D.others.active()||D.others.animating()||t||D.hideDimmer(),u.keyboardShortcuts&&!D.others.active()&&D.remove.keyboardShortcuts()},onComplete:function(){D.unbind.scrollLock(),u.allowMultiple&&(i.addClass(f.front),b.removeClass(f.front),(n?o:i).find(d.dimmer).removeClass("active")),z.isFunction(u.onHidden)&&u.onHidden.call(C),D.remove.dimmerStyles(),D.restore.focus(),e()}})):D.error(p.noTransition))},showDimmer:function(){i.dimmer("is animating")||!i.dimmer("is active")?(D.save.bodyMargin(),D.debug("Showing dimmer"),i.dimmer("show")):D.debug("Dimmer already visible")},hideDimmer:function(){i.dimmer("is animating")||i.dimmer("is active")?(D.unbind.scrollLock(),i.dimmer("hide",function(){D.restore.bodyMargin(),D.remove.clickaway(),D.remove.screenHeight()})):D.debug("Dimmer is not visible cannot hide")},hideAll:function(n){var e=o.filter("."+f.active+", ."+f.animating);if(n=z.isFunction(n)?n:function(){},0<e.length){D.debug("Hiding all visible modals");var i=!0;return z(e.get().reverse()).each(function(e,t){i=i&&z(t).modal("hide modal",n,!1,!0)}),i&&D.hideDimmer(),i}},hideOthers:function(e){var t=a.filter("."+f.active+", ."+f.animating);e=z.isFunction(e)?e:function(){},0<t.length&&(D.debug("Hiding other modals",a),t.modal("hide modal",e,!0))},others:{active:function(){return 0<a.filter("."+f.active).length},animating:function(){return 0<a.filter("."+f.animating).length}},add:{keyboardShortcuts:function(){D.verbose("Adding keyboard shortcuts"),P.on("keyup"+h,D.event.keyboard)}},save:{focus:function(){0<z(H.activeElement).closest(b).length||(e=z(H.activeElement).blur())},bodyMargin:function(){T=O.css("margin-"+(D.can.leftBodyScrollbar()?"left":"right"));var e=parseInt(T.replace(/[^\d.]/g,"")),t=N.innerWidth-H.documentElement.clientWidth;S=e+t}},restore:{focus:function(){e&&0<e.length&&u.restoreFocus&&e.focus()},bodyMargin:function(){var n=D.can.leftBodyScrollbar()?"left":"right";O.css("margin-"+n,T),O.find(d.bodyFixed.replace("right",n)).each(function(){var e=z(this),t="fixed"===e.css("position")?"padding-"+n:n;e.css(t,"")})}},remove:{active:function(){b.removeClass(f.active)},legacy:function(){b.removeClass(f.legacy)},clickaway:function(){u.detachable||b.off("mousedown"+n),t.off("mousedown"+n),t.off("mouseup"+n)},dimmerStyles:function(){t.removeClass(f.inverted),i.removeClass(f.blurring)},bodyStyle:function(){""===O.attr("style")&&(D.verbose("Removing style attribute"),O.removeAttr("style"))},screenHeight:function(){D.debug("Removing page height"),O.css("height","")},keyboardShortcuts:function(){D.verbose("Removing keyboard shortcuts"),P.off("keyup"+h)},scrolling:function(){i.removeClass(f.scrolling),b.removeClass(f.scrolling)}},cacheSizes:function(){b.addClass(f.loading);var e=b.prop("scrollHeight"),t=b.outerWidth(),n=b.outerHeight();D.cache.pageHeight!==U&&0===n||(z.extend(D.cache,{pageHeight:z(H).outerHeight(),width:t,height:n+u.offset,scrollHeight:e+u.offset,contextHeight:("body"==u.context?z(N):i).height()}),D.cache.topOffset=-D.cache.height/2),b.removeClass(f.loading),D.debug("Caching modal and container sizes",D.cache)},helpers:{deQuote:function(e){return String(e).replace(/"/g,"")},escape:function(e,t){if(t)return e;var n={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?(e=e.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;")).replace(/[<>"'`]/g,function(e){return n[e]}):e}},can:{leftBodyScrollbar:function(){return D.cache.leftBodyScrollbar===U&&(D.cache.leftBodyScrollbar=D.is.rtl()&&(D.is.iframe&&!D.is.firefox()||D.is.safari()||D.is.edge()||D.is.ie())),D.cache.leftBodyScrollbar},useFlex:function(){return"auto"===u.useFlex?u.detachable&&!D.is.ie():(u.useFlex&&D.is.ie()?D.debug("useFlex true is not supported in IE"):u.useFlex&&!u.detachable&&D.debug("useFlex true in combination with detachable false is not supported"),u.useFlex)},fit:function(){var e=D.cache.contextHeight,t=D.cache.contextHeight/2,n=D.cache.topOffset,i=D.cache.scrollHeight,o=D.cache.height,a=u.padding;return o<i?t+n+i+a<e:o+2*a<e}},has:{configActions:function(){return Array.isArray(u.actions)&&0<u.actions.length}},is:{active:function(){return b.hasClass(f.active)},ie:function(){var e,t;return D.cache.isIE===U&&(e=!N.ActiveXObject&&"ActiveXObject"in N,t="ActiveXObject"in N,D.cache.isIE=e||t),D.cache.isIE},animating:function(){return b.transition("is supported")?b.transition("is animating"):b.is(":visible")},scrolling:function(){return i.hasClass(f.scrolling)},modernBrowser:function(){return!(N.ActiveXObject||"ActiveXObject"in N)},rtl:function(){return D.cache.isRTL===U&&(D.cache.isRTL="rtl"===O.attr("dir")||"rtl"===O.css("direction")),D.cache.isRTL},safari:function(){return D.cache.isSafari===U&&(D.cache.isSafari=/constructor/i.test(N.HTMLElement)||!!N.ApplePaySession),D.cache.isSafari},edge:function(){return D.cache.isEdge===U&&(D.cache.isEdge=!!N.setImmediate&&!D.is.ie()),D.cache.isEdge},firefox:function(){return D.cache.isFirefox===U&&(D.cache.isFirefox=!!N.InstallTrigger),D.cache.isFirefox},iframe:function(){return!(self===top)}},set:{autofocus:function(){var e=b.find("[tabindex], :input").filter(":visible").filter(function(){return 0===z(this).closest(".disabled").length}),t=e.filter("[autofocus]"),e=(0<t.length?t:e).first();0<e.length&&e.focus()},bodyMargin:function(){var n=D.can.leftBodyScrollbar()?"left":"right";(u.detachable||D.can.fit())&&O.css("margin-"+n,S+"px"),O.find(d.bodyFixed.replace("right",n)).each(function(){var e=z(this),t="fixed"===e.css("position")?"padding-"+n:n;e.css(t,"calc("+e.css(t)+" + "+S+"px)")})},clickaway:function(){u.detachable||b.on("mousedown"+n,D.event.mousedown),t.on("mousedown"+n,D.event.mousedown),t.on("mouseup"+n,D.event.mouseup)},dimmerSettings:function(){var e;z.fn.dimmer!==U?(e={debug:u.debug,dimmerName:"modals",closable:"auto",useFlex:D.can.useFlex(),duration:{show:u.transition.showDuration||u.duration,hide:u.transition.hideDuration||u.duration}},e=z.extend(!0,e,u.dimmerSettings),u.inverted&&(e.variation=e.variation!==U?e.variation+" inverted":"inverted"),y.dimmer("setting",e)):D.error(p.dimmer)},dimmerStyles:function(){u.inverted?t.addClass(f.inverted):t.removeClass(f.inverted),u.blurring?i.addClass(f.blurring):i.removeClass(f.blurring)},modalOffset:function(){var e;u.detachable?b.css({marginTop:!b.hasClass("aligned")&&D.can.fit()?-D.cache.height/2:u.padding/2,marginLeft:-D.cache.width/2}):(e=D.can.fit(),b.css({top:!b.hasClass("aligned")&&e?z(H).scrollTop()+(D.cache.contextHeight-D.cache.height)/2:!e||b.hasClass("top")?z(H).scrollTop()+u.padding:z(H).scrollTop()+(D.cache.contextHeight-D.cache.height-u.padding),marginLeft:-D.cache.width/2})),D.verbose("Setting modal offset for legacy mode")},screenHeight:function(){D.can.fit()?O.css("height",""):b.hasClass("bottom")||(D.debug("Modal is taller than page content, resizing page height"),O.css("height",D.cache.height+2*u.padding))},active:function(){b.addClass(f.active+" "+f.front),a.filter("."+f.active).removeClass(f.front)},scrolling:function(){i.addClass(f.scrolling),b.addClass(f.scrolling),D.unbind.scrollLock()},legacy:function(){b.addClass(f.legacy)},type:function(){D.can.fit()?(D.verbose("Modal fits on screen"),D.others.active()||D.others.animating()||(D.remove.scrolling(),D.bind.scrollLock())):b.hasClass("bottom")?D.verbose("Bottom aligned modal not fitting on screen is unsupported for scrolling"):(D.verbose("Modal cannot fit on screen setting to scrolling"),D.set.scrolling())},undetached:function(){i.addClass(f.undetached)}},setting:function(e,t){if(D.debug("Changing setting",e,t),z.isPlainObject(e))z.extend(!0,u,e);else{if(t===U)return u[e];z.isPlainObject(u[e])?z.extend(!0,u[e],t):u[e]=t}},internal:function(e,t){if(z.isPlainObject(e))z.extend(!0,D,e);else{if(t===U)return D[e];D[e]=t}},debug:function(){!u.silent&&u.debug&&(u.performance?D.performance.log(arguments):(D.debug=Function.prototype.bind.call(console.info,console,u.name+":"),D.debug.apply(console,arguments)))},verbose:function(){!u.silent&&u.verbose&&u.debug&&(u.performance?D.performance.log(arguments):(D.verbose=Function.prototype.bind.call(console.info,console,u.name+":"),D.verbose.apply(console,arguments)))},error:function(){u.silent||(D.error=Function.prototype.bind.call(console.error,console,u.name+":"),D.error.apply(console,arguments))},performance:{log:function(e){var t,n;u.performance&&(n=(t=(new Date).getTime())-(M||t),M=t,I.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":n})),clearTimeout(D.performance.timer),D.performance.timer=setTimeout(D.performance.display,500)},display:function(){var e=u.name+":",n=0;M=!1,clearTimeout(D.performance.timer),z.each(I,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",R&&(e+=" '"+R+"'"),(console.group!==U||console.table!==U)&&0<I.length&&(console.groupCollapsed(e),console.table?console.table(I):z.each(I,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),I=[]}},invoke:function(i,e,t){var o,a,n,r=w;return e=e||V,t=C||t,"string"==typeof i&&r!==U&&(i=i.split(/[\. ]/),o=i.length-1,z.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(z.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==U)return a=r[n],!1;{if(!z.isPlainObject(r[t])||e==o)return r[t]!==U&&(a=r[t]),!1;r=r[t]}}})),z.isFunction(a)?n=a.apply(t,e):a!==U&&(n=a),Array.isArray(E)?E.push(n):E!==U?E=[E,n]:n!==U&&(E=n),a}};L?(w===U&&(z.isFunction(u.templates[j])&&(u.autoShow=!0,u.className.modal=u.className.template,u=z.extend(!0,{},u,u.templates[j].apply(D,V)),f=u.className,u.namespace,g=u.fields,p=u.error),D.initialize()),z.isFunction(u.templates[j])||D.invoke(j)):(w!==U&&w.invoke("destroy"),D.initialize(),E=b)}),E!==U?E:this},z.fn.modal.settings={name:"Modal",namespace:"modal",useFlex:"auto",offset:0,silent:!1,debug:!1,verbose:!1,performance:!0,observeChanges:!1,allowMultiple:!1,detachable:!0,closable:!0,autofocus:!0,restoreFocus:!0,autoShow:!1,inverted:!1,blurring:!1,centered:!0,dimmerSettings:{closable:!1,useCSS:!0},keyboardShortcuts:!0,context:"body",queue:!1,duration:500,transition:"scale",padding:50,scrollbarWidth:10,title:"",content:"",class:"",classTitle:"",classContent:"",classActions:"",closeIcon:!1,actions:!1,preserveHTML:!0,fields:{class:"class",text:"text",icon:"icon",click:"click"},onShow:function(){},onVisible:function(){},onHide:function(){return!0},onHidden:!1,onApprove:function(){return!0},onDeny:function(){return!0},selector:{title:"> .header",content:"> .content",actions:"> .actions",close:"> .close",approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel",modal:".ui.modal",dimmer:"> .ui.dimmer",bodyFixed:"> .ui.fixed.menu, > .ui.right.toast-container, > .ui.right.sidebar, > .ui.fixed.nag, > .ui.fixed.nag > .close",prompt:".ui.input > input"},error:{dimmer:"UI Dimmer, a required component is not included in this page",method:"The method you called is not defined.",notFound:"The element you specified could not be found"},className:{active:"active",animating:"animating",blurring:"blurring",inverted:"inverted",legacy:"legacy",loading:"loading",scrolling:"scrolling",undetached:"undetached",front:"front",close:"close icon",button:"ui button",modal:"ui modal",title:"header",content:"content",actions:"actions",template:"ui tiny modal",ok:"positive",cancel:"negative",prompt:"ui fluid input"},text:{ok:"Ok",cancel:"Cancel"}},z.fn.modal.settings.templates={getArguments:function(e){e=[].slice.call(e);return z.isPlainObject(e[0])?z.extend({handler:function(){},content:"",title:""},e[0]):(z.isFunction(e[e.length-1])||e.push(function(){}),{handler:e.pop(),content:e.pop()||"",title:e.pop()||""})},alert:function(){var e=this.get.settings(),t=e.templates.getArguments(arguments);return{title:t.title,content:t.content,actions:[{text:e.text.ok,class:e.className.ok,click:t.handler}]}},confirm:function(){var e=this.get.settings(),t=e.templates.getArguments(arguments);return{title:t.title,content:t.content,actions:[{text:e.text.ok,class:e.className.ok,click:function(){t.handler(!0)}},{text:e.text.cancel,class:e.className.cancel,click:function(){t.handler(!1)}}]}},prompt:function(){var t=this,e=this.get.settings(),n=e.templates.getArguments(arguments);return 0===z(z.parseHTML(n.content)).filter(".ui.input").length&&(n.content+='<p><div class="'+e.className.prompt+'"><input placeholder="'+this.helpers.deQuote(n.placeholder||"")+'" type="text" value="'+this.helpers.deQuote(n.defaultValue||"")+'"></div></p>'),{title:n.title,content:n.content,actions:[{text:e.text.ok,class:e.className.ok,click:function(){var e=t.get.settings(),e=t.get.element().find(e.selector.prompt)[0];n.handler(z(e).val())}},{text:e.text.cancel,class:e.className.cancel,click:function(){n.handler(null)}}]}}}}(jQuery,window,document),function(x,C,w,k){"use strict";x.isFunction=x.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},C=void 0!==C&&C.Math==Math?C:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),x.fn.nag=function(f){var m,e=x(this),g=e.selector||"",p=(new Date).getTime(),h=[],v=f,b="string"==typeof v,y=[].slice.call(arguments,1);return e.each(function(){var i,o=x.isPlainObject(f)?x.extend(!0,{},x.fn.nag.settings,f):x.extend({},x.fn.nag.settings),e=o.selector,s=o.error,t=o.namespace,n="."+t,a=t+"-module",r=x(this),l=o.context?x(o.context):x("body"),c=this,u=r.data(a),d={initialize:function(){d.verbose("Initializing element"),i=d.get.storage(),r.on("click"+n,e.close,d.dismiss).data(a,d),o.detachable&&r.parent()[0]!==l[0]&&r.detach().prependTo(l),0<o.displayTime&&setTimeout(d.hide,o.displayTime),d.show()},destroy:function(){d.verbose("Destroying instance"),r.removeData(a).off(n)},show:function(){if(d.should.show()&&!r.is(":visible")){if(!1===o.onShow.call(c))return d.debug("onShow callback returned false, cancelling nag animation"),!1;d.debug("Showing nag",o.animation.show),"fade"===o.animation.show?r.fadeIn(o.duration,o.easing,o.onVisible):r.slideDown(o.duration,o.easing,o.onVisible)}},hide:function(){if(!1===o.onHide.call(c))return d.debug("onHide callback returned false, cancelling nag animation"),!1;d.debug("Hiding nag",o.animation.hide),"fade"===o.animation.hide?r.fadeOut(o.duration,o.easing,o.onHidden):r.slideUp(o.duration,o.easing,o.onHidden)},dismiss:function(e){!1!==d.hide()&&o.storageMethod&&(d.debug("Dismissing nag",o.storageMethod,o.key,o.value,o.expires),d.storage.set(o.key,o.value)),e.stopImmediatePropagation(),e.preventDefault()},should:{show:function(){return o.persist?(d.debug("Persistent nag is set, can show nag"),!0):d.storage.get(o.key)!=o.value.toString()?(d.debug("Stored value is not set, can show nag",d.storage.get(o.key)),!0):(d.debug("Stored value is set, cannot show nag",d.storage.get(o.key)),!1)}},get:{expirationDate:function(e){if((e="number"==typeof e?new Date(Date.now()+864e5*e):e)instanceof Date&&e.getTime())return e.toUTCString();d.error(s.expiresFormat)},storage:function(){return"localstorage"===o.storageMethod&&C.localStorage!==k?(d.debug("Using local storage"),C.localStorage):"sessionstorage"===o.storageMethod&&C.sessionStorage!==k?(d.debug("Using session storage"),C.sessionStorage):"cookie"in w?(d.debug("Using cookie"),{setItem:function(e,t,n){e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),t=encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent);var i,o="";for(i in n)n.hasOwnProperty(i)&&(o+="; "+i,"string"==typeof n[i]&&(o+="="+n[i].split(";")[0]));w.cookie=e+"="+t+o},getItem:function(e){for(var t=w.cookie.split("; "),n=0,i=t.length;n<i;n++){var o=t[n].split("=");if(e===o[0].replace(/(%[\dA-F]{2})+/gi,decodeURIComponent))return o[1]||""}},removeItem:function(e,t){i.setItem(e,"",t)}}):void d.error(s.noStorage)},storageOptions:function(){var e={};return o.expires&&(e.expires=d.get.expirationDate(o.expires)),o.domain&&(e.domain=o.domain),o.path&&(e.path=o.path),o.secure&&(e.secure=o.secure),o.samesite&&(e.samesite=o.samesite),e}},clear:function(){d.storage.remove(o.key)},storage:{set:function(e,t){var n=d.get.storageOptions();i===C.localStorage&&n.expires&&(d.debug("Storing expiration value in localStorage",e,n.expires),i.setItem(e+o.expirationKey,n.expires)),d.debug("Value stored",e,t);try{i.setItem(e,t,n)}catch(e){d.error(s.setItem,e)}},get:function(e){var t,n=i.getItem(e);return i!==C.localStorage||null!==(t=i.getItem(e+o.expirationKey))&&t!==k&&new Date(t)<new Date&&(d.debug("Value in localStorage has expired. Deleting key",e),d.storage.remove(e),n=null),n="undefined"==n||"null"==n||n===k||null===n?k:n},remove:function(e){var t=d.get.storageOptions();t.expires=d.get.expirationDate(-1),i===C.localStorage&&i.removeItem(e+o.expirationKey),i.removeItem(e,t)}},setting:function(e,t){if(d.debug("Changing setting",e,t),x.isPlainObject(e))x.extend(!0,o,e);else{if(t===k)return o[e];x.isPlainObject(o[e])?x.extend(!0,o[e],t):o[e]=t}},internal:function(e,t){if(x.isPlainObject(e))x.extend(!0,d,e);else{if(t===k)return d[e];d[e]=t}},debug:function(){!o.silent&&o.debug&&(o.performance?d.performance.log(arguments):(d.debug=Function.prototype.bind.call(console.info,console,o.name+":"),d.debug.apply(console,arguments)))},verbose:function(){!o.silent&&o.verbose&&o.debug&&(o.performance?d.performance.log(arguments):(d.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),d.verbose.apply(console,arguments)))},error:function(){o.silent||(d.error=Function.prototype.bind.call(console.error,console,o.name+":"),d.error.apply(console,arguments))},performance:{log:function(e){var t,n;o.performance&&(n=(t=(new Date).getTime())-(p||t),p=t,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:c,"Execution Time":n})),clearTimeout(d.performance.timer),d.performance.timer=setTimeout(d.performance.display,500)},display:function(){var e=o.name+":",n=0;p=!1,clearTimeout(d.performance.timer),x.each(h,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",g&&(e+=" '"+g+"'"),(console.group!==k||console.table!==k)&&0<h.length&&(console.groupCollapsed(e),console.table?console.table(h):x.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(i,e,t){var o,a,n,r=u;return e=e||y,t=c||t,"string"==typeof i&&r!==k&&(i=i.split(/[\. ]/),o=i.length-1,x.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(x.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==k)return a=r[n],!1;{if(!x.isPlainObject(r[t])||e==o)return r[t]!==k?a=r[t]:d.error(s.method,i),!1;r=r[t]}}})),x.isFunction(a)?n=a.apply(t,e):a!==k&&(n=a),Array.isArray(m)?m.push(n):m!==k?m=[m,n]:n!==k&&(m=n),a}};b?(u===k&&d.initialize(),d.invoke(v)):(u!==k&&u.invoke("destroy"),d.initialize())}),m!==k?m:this},x.fn.nag.settings={name:"Nag",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"Nag",persist:!1,displayTime:0,animation:{show:"slide",hide:"slide"},context:!1,detachable:!1,expires:30,domain:!1,path:"/",secure:!1,samesite:!1,storageMethod:"cookie",key:"nag",value:"dismiss",expirationKey:"ExpirationDate",error:{noStorage:"Unsupported storage method",method:"The method you called is not defined.",setItem:"Unexpected error while setting value",expiresFormat:'"expires" must be a number of days or a Date Object'},className:{bottom:"bottom",fixed:"fixed"},selector:{close:"> .close.icon"},duration:500,easing:"easeOutQuad",onShow:function(){},onVisible:function(){},onHide:function(){},onHidden:function(){}},x.extend(x.easing,{easeOutQuad:function(e,t,n,i,o){return-i*(t/=o)*(t-2)+n}})}(jQuery,window,document),function(L,V,q,z){"use strict";L.isFunction=L.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},V=void 0!==V&&V.Math==Math?V:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),L.fn.popup=function(T){var S,e=L(this),D=L(q),A=L(V),E=L("body"),F=e.selector||"",P="ontouchstart"in q.documentElement?"touchstart":"click",O=(new Date).getTime(),R=[],M=T,I="string"==typeof M,j=[].slice.call(arguments,1);return e.each(function(){var c,s,e,t,n,u=L.isPlainObject(T)?L.extend(!0,{},L.fn.popup.settings,T):L.extend({},L.fn.popup.settings),i=u.selector,d=u.className,f=u.error,m=u.metadata,o=u.namespace,a="."+u.namespace,r="module-"+o,g=L(this),l=L(u.context),p=L(u.scrollContext),h=L(u.boundary),v=u.target?L(u.target):g,b=0,y=!1,x=!1,C=this,w=g.data(r),k={initialize:function(){k.debug("Initializing",g),k.createID(),k.bind.events(),!k.exists()&&u.preserve&&k.create(),u.observeChanges&&k.observeChanges(),k.instantiate()},instantiate:function(){k.verbose("Storing instance",k),w=k,g.data(r,w)},observeChanges:function(){"MutationObserver"in V&&((e=new MutationObserver(k.event.documentChanged)).observe(q,{childList:!0,subtree:!0}),k.debug("Setting up mutation observer",e))},refresh:function(){u.popup?c=L(u.popup).eq(0):u.inline&&(c=v.nextAll(i.popup).eq(0),u.popup=c),u.popup?(c.addClass(d.loading),s=k.get.offsetParent(),c.removeClass(d.loading),u.movePopup&&k.has.popup()&&k.get.offsetParent(c)[0]!==s[0]&&(k.debug("Moving popup to the same offset parent as target"),c.detach().appendTo(s))):s=u.inline?k.get.offsetParent(v):k.has.popup()?k.get.offsetParent(c):E,s.is("html")&&s[0]!==E[0]&&(k.debug("Setting page as offset parent"),s=E),k.get.variation()&&k.set.variation()},reposition:function(){k.refresh(),k.set.position()},destroy:function(){k.debug("Destroying previous module"),e&&e.disconnect(),c&&!u.preserve&&k.removePopup(),clearTimeout(k.hideTimer),clearTimeout(k.showTimer),k.unbind.close(),k.unbind.events(),g.removeData(r)},event:{start:function(e){var t=L.isPlainObject(u.delay)?u.delay.show:u.delay;clearTimeout(k.hideTimer),x&&!u.addTouchEvents||(k.showTimer=setTimeout(k.show,t))},end:function(){var e=L.isPlainObject(u.delay)?u.delay.hide:u.delay;clearTimeout(k.showTimer),k.hideTimer=setTimeout(k.hide,e)},touchstart:function(e){x=!0,u.addTouchEvents&&k.show()},resize:function(){k.is.visible()&&k.set.position()},documentChanged:function(e){[].forEach.call(e,function(e){e.removedNodes&&[].forEach.call(e.removedNodes,function(e){(e==C||0<L(e).find(C).length)&&(k.debug("Element removed from DOM, tearing down events"),k.destroy())})})},hideGracefully:function(e){var t=L(e.target),n=L.contains(q.documentElement,e.target),t=0<t.closest(i.popup).length;e&&!t&&n?(k.debug("Click occurred outside popup hiding popup"),k.hide()):k.debug("Click was inside popup, keeping popup open")}},create:function(){var e=k.get.html(),t=k.get.title(),n=k.get.content();e||n||t?(k.debug("Creating pop-up html"),e=e||u.templates.popup({title:t,content:n}),c=L("<div/>").addClass(d.popup).data(m.activator,g).html(e),u.inline?(k.verbose("Inserting popup element inline",c),c.insertAfter(g)):(k.verbose("Appending popup element to body",c),c.appendTo(l)),k.refresh(),k.set.variation(),u.hoverable&&k.bind.popup(),u.onCreate.call(c,C)):u.popup?(L(u.popup).data(m.activator,g),k.verbose("Used popup specified in settings"),k.refresh(),u.hoverable&&k.bind.popup()):0!==v.next(i.popup).length?(k.verbose("Pre-existing popup found"),u.inline=!0,u.popup=v.next(i.popup).data(m.activator,g),k.refresh(),u.hoverable&&k.bind.popup()):k.debug("No content specified skipping display",C)},createID:function(){n=(Math.random().toString(16)+"000000000").substr(2,8),t="."+n,k.verbose("Creating unique id for element",n)},toggle:function(){k.debug("Toggling pop-up"),k.is.hidden()?(k.debug("Popup is hidden, showing pop-up"),k.unbind.close(),k.show()):(k.debug("Popup is visible, hiding pop-up"),k.hide())},show:function(e){e=e||function(){},k.debug("Showing pop-up",u.transition),!k.is.hidden()||k.is.active()&&k.is.dropdown()||(k.exists()||k.create(),!1!==u.onShow.call(c,C)?(u.preserve||u.popup||k.refresh(),c&&k.set.position()&&(k.save.conditions(),u.exclusive&&k.hideAll(),k.animate.show(e))):k.debug("onShow callback returned false, cancelling popup animation"))},hide:function(e){e=e||function(){},(k.is.visible()||k.is.animating())&&(!1!==u.onHide.call(c,C)?(k.remove.visible(),k.unbind.close(),k.restore.conditions(),k.animate.hide(e)):k.debug("onHide callback returned false, cancelling popup animation"))},hideAll:function(){L(i.popup).filter("."+d.popupVisible).each(function(){L(this).data(m.activator).popup("hide")})},exists:function(){return!!c&&(u.inline||u.popup?k.has.popup():1<=c.closest(l).length)},removePopup:function(){k.has.popup()&&!u.popup&&(k.debug("Removing popup",c),c.remove(),c=z,u.onRemove.call(c,C))},save:{conditions:function(){k.cache={title:g.attr("title")},k.cache.title&&g.removeAttr("title"),k.verbose("Saving original attributes",k.cache.title)}},restore:{conditions:function(){return k.cache&&k.cache.title&&(g.attr("title",k.cache.title),k.verbose("Restoring original attributes",k.cache.title)),!0}},supports:{svg:function(){return"undefined"!=typeof SVGGraphicsElement}},animate:{show:function(e){e=L.isFunction(e)?e:function(){},u.transition&&L.fn.transition!==z&&g.transition("is supported")?(k.set.visible(),c.transition({animation:(u.transition.showMethod||u.transition)+" in",queue:!1,debug:u.debug,verbose:u.verbose,duration:u.transition.showDuration||u.duration,onComplete:function(){k.bind.close(),e.call(c,C),u.onVisible.call(c,C)}})):k.error(f.noTransition)},hide:function(e){e=L.isFunction(e)?e:function(){},k.debug("Hiding pop-up"),u.transition&&L.fn.transition!==z&&g.transition("is supported")?c.transition({animation:(u.transition.hideMethod||u.transition)+" out",queue:!1,duration:u.transition.hideDuration||u.duration,debug:u.debug,verbose:u.verbose,onComplete:function(){k.reset(),e.call(c,C),u.onHidden.call(c,C)}}):k.error(f.noTransition)}},change:{content:function(e){c.html(e)}},get:{html:function(){return g.removeData(m.html),g.data(m.html)||u.html},title:function(){return g.removeData(m.title),g.data(m.title)||u.title},content:function(){return g.removeData(m.content),g.data(m.content)||u.content||g.attr("title")},variation:function(){return g.removeData(m.variation),g.data(m.variation)||u.variation},popup:function(){return c},popupOffset:function(){return c.offset()},calculations:function(){var e=k.get.offsetParent(c),t=v[0],n=h[0]==V,i=v.offset(),o=u.inline||u.popup&&u.movePopup?v.offsetParent().offset():{top:0,left:0},a=n?{top:0,left:0}:h.offset(),r={},n=n?{top:A.scrollTop(),left:A.scrollLeft()}:{top:0,left:0},r={target:{element:v[0],width:v.outerWidth(),height:v.outerHeight(),top:i.top-o.top,left:i.left-o.left,margin:{}},popup:{width:c.outerWidth(),height:c.outerHeight()},parent:{width:s.outerWidth(),height:s.outerHeight()},screen:{top:a.top,left:a.left,scroll:{top:n.top,left:n.left},width:h.width(),height:h.height()}};return e.get(0)!==s.get(0)&&(n=e.offset(),r.target.top-=n.top,r.target.left-=n.left,r.parent.width=e.outerWidth(),r.parent.height=e.outerHeight()),u.setFluidWidth&&k.is.fluid()&&(r.container={width:c.parent().outerWidth()},r.popup.width=r.container.width),r.target.margin.top=u.inline?parseInt(V.getComputedStyle(t).getPropertyValue("margin-top"),10):0,r.target.margin.left=u.inline?k.is.rtl()?parseInt(V.getComputedStyle(t).getPropertyValue("margin-right"),10):parseInt(V.getComputedStyle(t).getPropertyValue("margin-left"),10):0,t=r.screen,r.boundary={top:t.top+t.scroll.top,bottom:t.top+t.scroll.top+t.height,left:t.left+t.scroll.left,right:t.left+t.scroll.left+t.width},r},id:function(){return n},startEvent:function(){return"hover"==u.on?"mouseenter":"focus"==u.on&&"focus"},scrollEvent:function(){return"scroll"},endEvent:function(){return"hover"==u.on?"mouseleave":"focus"==u.on&&"blur"},distanceFromBoundary:function(e,t){var n={},i=(t=t||k.get.calculations()).popup,t=t.boundary;return e&&(n={top:e.top-t.top,left:e.left-t.left,right:t.right-(e.left+i.width),bottom:t.bottom-(e.top+i.height)},k.verbose("Distance from boundaries determined",e,n)),n},offsetParent:function(e){var t=(e!==z?e:v)[0].parentNode,n=L(t);if(t)for(var i="none"===n.css("transform"),o="static"===n.css("position"),a=n.is("body");t&&!a&&o&&i;)t=t.parentNode,i="none"===(n=L(t)).css("transform"),o="static"===n.css("position"),a=n.is("body");return n&&0<n.length?n:L()},positions:function(){return{"top left":!1,"top center":!1,"top right":!1,"bottom left":!1,"bottom center":!1,"bottom right":!1,"left center":!1,"right center":!1}},nextPosition:function(e){var t=e.split(" "),n=t[0],i=t[1],o="top"==n||"bottom"==n,a=!1,r=!1,t=!1;return y||(k.verbose("All available positions available"),y=k.get.positions()),k.debug("Recording last position tried",e),y[e]=!0,"opposite"===u.prefer&&(t=(t=[{top:"bottom",bottom:"top",left:"right",right:"left"}[n],i]).join(" "),a=!0===y[t],k.debug("Trying opposite strategy",t)),"adjacent"===u.prefer&&o&&(t=(t=[n,{left:"center",center:"right",right:"left"}[i]]).join(" "),r=!0===y[t],k.debug("Trying adjacent strategy",t)),(r||a)&&(k.debug("Using backup position",t),t={"top left":"top center","top center":"top right","top right":"right center","right center":"bottom right","bottom right":"bottom center","bottom center":"bottom left","bottom left":"left center","left center":"top left"}[e]),t}},set:{position:function(e,t){if(0!==v.length&&0!==c.length){var n,i,o,a,r,s,l;if(t=t||k.get.calculations(),e=e||g.data(m.position)||u.position,n=g.data(m.offset)||u.offset,i=u.distanceAway,o=t.target,a=t.popup,r=t.parent,k.should.centerArrow(t)&&(k.verbose("Adjusting offset to center arrow on small target element"),"top left"!=e&&"bottom left"!=e||(n+=o.width/2,n-=u.arrowPixelsFromEdge),"top right"!=e&&"bottom right"!=e||(n-=o.width/2,n+=u.arrowPixelsFromEdge)),0===o.width&&0===o.height&&!k.is.svg(o.element))return k.debug("Popup target is hidden, no action taken"),!1;switch(u.inline&&(k.debug("Adding margin to calculation",o.margin),"left center"==e||"right center"==e?(n+=o.margin.top,i+=-o.margin.left):"top left"==e||"top center"==e||"top right"==e?(n+=o.margin.left,i-=o.margin.top):(n+=o.margin.left,i+=o.margin.top)),k.debug("Determining popup position from calculations",e,t),k.is.rtl()&&(e=e.replace(/left|right/g,function(e){return"left"==e?"right":"left"}),k.debug("RTL: Popup position updated",e)),e=b==u.maxSearchDepth&&"string"==typeof u.lastResort?u.lastResort:e){case"top left":s={top:"auto",bottom:r.height-o.top+i,left:o.left+n,right:"auto"};break;case"top center":s={bottom:r.height-o.top+i,left:o.left+o.width/2-a.width/2+n,top:"auto",right:"auto"};break;case"top right":s={bottom:r.height-o.top+i,right:r.width-o.left-o.width-n,top:"auto",left:"auto"};break;case"left center":s={top:o.top+o.height/2-a.height/2+n,right:r.width-o.left+i,left:"auto",bottom:"auto"};break;case"right center":s={top:o.top+o.height/2-a.height/2+n,left:o.left+o.width+i,bottom:"auto",right:"auto"};break;case"bottom left":s={top:o.top+o.height+i,left:o.left+n,bottom:"auto",right:"auto"};break;case"bottom center":s={top:o.top+o.height+i,left:o.left+o.width/2-a.width/2+n,bottom:"auto",right:"auto"};break;case"bottom right":s={top:o.top+o.height+i,right:r.width-o.left-o.width-n,left:"auto",bottom:"auto"}}if(s===z&&k.error(f.invalidPosition,e),k.debug("Calculated popup positioning values",s),c.css(s).removeClass(d.position).addClass(e).addClass(d.loading),l=k.get.popupOffset(),l=k.get.distanceFromBoundary(l,t),!u.forcePosition&&k.is.offstage(l,e)){if(k.debug("Position is outside viewport",e),b<u.maxSearchDepth)return b++,e=k.get.nextPosition(e),k.debug("Trying new position",e),!!c&&k.set.position(e,t);if(!u.lastResort)return k.debug("Popup could not find a position to display",c),k.error(f.cannotPlace,C),k.remove.attempts(),k.remove.loading(),k.reset(),u.onUnplaceable.call(c,C),!1;k.debug("No position found, showing with last position")}return k.debug("Position is on stage",e),k.remove.attempts(),k.remove.loading(),u.setFluidWidth&&k.is.fluid()&&k.set.fluidWidth(t),!0}k.error(f.notFound)},fluidWidth:function(e){e=e||k.get.calculations(),k.debug("Automatically setting element width to parent width",e.parent.width),c.css("width",e.container.width)},variation:function(e){(e=e||k.get.variation())&&k.has.popup()&&(k.verbose("Adding variation to popup",e),c.addClass(e))},visible:function(){g.addClass(d.visible)}},remove:{loading:function(){c.removeClass(d.loading)},variation:function(e){(e=e||k.get.variation())&&(k.verbose("Removing variation",e),c.removeClass(e))},visible:function(){g.removeClass(d.visible)},attempts:function(){k.verbose("Resetting all searched positions"),b=0,y=!1}},bind:{events:function(){k.debug("Binding popup events to module"),"click"==u.on&&g.on(P+a,k.toggle),"hover"==u.on&&g.on("touchstart"+a,k.event.touchstart),k.get.startEvent()&&g.on(k.get.startEvent()+a,k.event.start).on(k.get.endEvent()+a,k.event.end),u.target&&k.debug("Target set to element",v),A.on("resize"+t,k.event.resize)},popup:function(){k.verbose("Allowing hover events on popup to prevent closing"),c&&k.has.popup()&&c.on("mouseenter"+a,k.event.start).on("mouseleave"+a,k.event.end)},close:function(){(!0===u.hideOnScroll||"auto"==u.hideOnScroll&&"click"!=u.on)&&k.bind.closeOnScroll(),k.is.closable()?k.bind.clickaway():"hover"==u.on&&x&&k.bind.touchClose()},closeOnScroll:function(){k.verbose("Binding scroll close event to document"),p.one(k.get.scrollEvent()+t,k.event.hideGracefully)},touchClose:function(){k.verbose("Binding popup touchclose event to document"),D.on("touchstart"+t,function(e){k.verbose("Touched away from popup"),k.event.hideGracefully.call(C,e)})},clickaway:function(){k.verbose("Binding popup close event to document"),D.on(P+t,function(e){k.verbose("Clicked away from popup"),k.event.hideGracefully.call(C,e)})}},unbind:{events:function(){A.off(t),g.off(a)},close:function(){D.off(t),p.off(t)}},has:{popup:function(){return c&&0<c.length}},should:{centerArrow:function(e){return!k.is.basic()&&e.target.width<=2*u.arrowPixelsFromEdge}},is:{closable:function(){return"auto"==u.closable?"hover"!=u.on:u.closable},offstage:function(e,n){var i=[];return L.each(e,function(e,t){t<-u.jitter&&(k.debug("Position exceeds allowable distance from edge",e,t,n),i.push(e))}),0<i.length},svg:function(e){return k.supports.svg()&&e instanceof SVGGraphicsElement},basic:function(){return g.hasClass(d.basic)},active:function(){return g.hasClass(d.active)},animating:function(){return c!==z&&c.hasClass(d.animating)},fluid:function(){return c!==z&&c.hasClass(d.fluid)},visible:function(){return c!==z&&c.hasClass(d.popupVisible)},dropdown:function(){return g.hasClass(d.dropdown)},hidden:function(){return!k.is.visible()},rtl:function(){return"rtl"===g.attr("dir")||"rtl"===g.css("direction")}},reset:function(){k.remove.visible(),u.preserve?L.fn.transition!==z&&c.transition("remove transition"):k.removePopup()},setting:function(e,t){if(L.isPlainObject(e))L.extend(!0,u,e);else{if(t===z)return u[e];u[e]=t}},internal:function(e,t){if(L.isPlainObject(e))L.extend(!0,k,e);else{if(t===z)return k[e];k[e]=t}},debug:function(){!u.silent&&u.debug&&(u.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,u.name+":"),k.debug.apply(console,arguments)))},verbose:function(){!u.silent&&u.verbose&&u.debug&&(u.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,u.name+":"),k.verbose.apply(console,arguments)))},error:function(){u.silent||(k.error=Function.prototype.bind.call(console.error,console,u.name+":"),k.error.apply(console,arguments))},performance:{log:function(e){var t,n;u.performance&&(n=(t=(new Date).getTime())-(O||t),O=t,R.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:C,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,500)},display:function(){var e=u.name+":",n=0;O=!1,clearTimeout(k.performance.timer),L.each(R,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",F&&(e+=" '"+F+"'"),(console.group!==z||console.table!==z)&&0<R.length&&(console.groupCollapsed(e),console.table?console.table(R):L.each(R,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),R=[]}},invoke:function(i,e,t){var o,a,n,r=w;return e=e||j,t=C||t,"string"==typeof i&&r!==z&&(i=i.split(/[\. ]/),o=i.length-1,L.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(L.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==z)return a=r[n],!1;{if(!L.isPlainObject(r[t])||e==o)return r[t]!==z&&(a=r[t]),!1;r=r[t]}}})),L.isFunction(a)?n=a.apply(t,e):a!==z&&(n=a),Array.isArray(S)?S.push(n):S!==z?S=[S,n]:n!==z&&(S=n),a}};I?(w===z&&k.initialize(),k.invoke(M)):(w!==z&&w.invoke("destroy"),k.initialize())}),S!==z?S:this},L.fn.popup.settings={name:"Popup",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"popup",observeChanges:!0,onCreate:function(){},onRemove:function(){},onShow:function(){},onVisible:function(){},onHide:function(){},onUnplaceable:function(){},onHidden:function(){},on:"hover",boundary:V,addTouchEvents:!0,position:"top left",forcePosition:!1,variation:"",movePopup:!0,target:!1,popup:!1,inline:!1,preserve:!1,hoverable:!1,content:!1,html:!1,title:!1,closable:!0,hideOnScroll:"auto",exclusive:!1,context:"body",scrollContext:V,prefer:"opposite",lastResort:!1,arrowPixelsFromEdge:20,delay:{show:50,hide:70},setFluidWidth:!0,duration:200,transition:"scale",distanceAway:0,jitter:2,offset:0,maxSearchDepth:15,error:{invalidPosition:"The position you specified is not a valid position",cannotPlace:"Popup does not fit within the boundaries of the viewport",method:"The method you called is not defined.",noTransition:"This module requires ui transitions <https://github.com/Semantic-Org/UI-Transition>",notFound:"The target or popup you specified does not exist on the page"},metadata:{activator:"activator",content:"content",html:"html",offset:"offset",position:"position",title:"title",variation:"variation"},className:{active:"active",basic:"basic",animating:"animating",dropdown:"dropdown",fluid:"fluid",loading:"loading",popup:"ui popup",position:"top left center bottom right",visible:"visible",popupVisible:"visible"},selector:{popup:".ui.popup"},templates:{escape:function(e){var t={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?(e=e.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;")).replace(/[<>"'`]/g,function(e){return t[e]}):e},popup:function(e){var t="",n=L.fn.popup.settings.templates.escape;return typeof e!==z&&(typeof e.title!==z&&e.title&&(e.title=n(e.title),t+='<div class="header">'+e.title+"</div>"),typeof e.content!==z&&e.content&&(e.content=n(e.content),t+='<div class="content">'+e.content+"</div>")),t}}}}(jQuery,window,document),function(T,e,S,D){"use strict";T.isFunction=T.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),T.fn.progress=function(h){var v,e=T(this),b=e.selector||"",y=(new Date).getTime(),x=[],C=h,w="string"==typeof C,k=[].slice.call(arguments,1);return e.each(function(){var r=T.isPlainObject(h)?T.extend(!0,{},T.fn.progress.settings,h):T.extend({},T.fn.progress.settings),n=r.className,t=r.metadata,e=r.namespace,i=r.selector,s=r.error,o="."+e,a="module-"+e,c=T(this),u=T(this).find(i.bar),l=T(this).find(i.progress),d=T(this).find(i.label),f=this,m=c.data(a),g=!1,p={helper:{sum:function(e){return Array.isArray(e)?e.reduce(function(e,t){return e+Number(t)},0):0},derivePrecision:function(e,t){for(var n=0,i=1,o=e/t;n<10&&!(1<(o*=i));)i=Math.pow(10,n++);return i},forceArray:function(e){return Array.isArray(e)?e:isNaN(e)?"string"==typeof e?e.split(","):[]:[e]}},initialize:function(){p.set.duration(),p.set.transitionEvent(),p.debug(f),p.read.metadata(),p.read.settings(),p.instantiate()},instantiate:function(){p.verbose("Storing instance of progress",p),m=p,c.data(a,p)},destroy:function(){p.verbose("Destroying previous progress for",c),clearInterval(m.interval),p.remove.state(),c.removeData(a),m=D},reset:function(){p.remove.nextValue(),p.update.progress(0)},complete:function(e){(p.percent===D||p.percent<100)&&(p.remove.progressPoll(),!0!==e&&p.set.percent(100))},read:{metadata:function(){var e={percent:p.helper.forceArray(c.data(t.percent)),total:c.data(t.total),value:p.helper.forceArray(c.data(t.value))};e.total!==D&&(p.debug("Total value set from metadata",e.total),p.set.total(e.total)),0<e.value.length&&(p.debug("Current value set from metadata",e.value),p.set.value(e.value),p.set.progress(e.value)),0<e.percent.length&&(p.debug("Current percent value set from metadata",e.percent),p.set.percent(e.percent))},settings:function(){!1!==r.total&&(p.debug("Current total set in settings",r.total),p.set.total(r.total)),!1!==r.value&&(p.debug("Current value set in settings",r.value),p.set.value(r.value),p.set.progress(p.value)),!1!==r.percent&&(p.debug("Current percent set in settings",r.percent),p.set.percent(r.percent))}},bind:{transitionEnd:function(t){var e=p.get.transitionEnd();u.one(e+o,function(e){clearTimeout(p.failSafeTimer),t.call(this,e)}),p.failSafeTimer=setTimeout(function(){u.triggerHandler(e)},r.duration+r.failSafeDelay),p.verbose("Adding fail safe timer",p.timer)}},increment:function(e){var t;e=p.has.total()?(t=p.get.value(),e||1):(t=p.get.percent(),e||p.get.randomValue()),p.debug("Incrementing percentage by",t,t=t+e,e),t=p.get.normalizedValue(t),p.set.progress(t)},decrement:function(e){var t,n;p.get.total()?(n=(t=p.get.value())-(e=e||1),p.debug("Decrementing value by",e,t)):(n=(t=p.get.percent())-(e=e||p.get.randomValue()),p.debug("Decrementing percentage by",e,t)),n=p.get.normalizedValue(n),p.set.progress(n)},has:{progressPoll:function(){return p.progressPoll},total:function(){return!1!==p.get.total()}},get:{text:function(e,t){var n=t||0,i=p.get.value(n),o=p.get.total(),a=g?p.get.displayPercent(n):p.get.percent(n),t=!1!==o?Math.max(0,o-i):100-a;return e=(e=e||"").replace("{value}",i).replace("{total}",o||0).replace("{left}",t).replace("{percent}",a).replace("{bar}",r.text.bars[n]||""),p.verbose("Adding variables to progress bar text",e),e},normalizedValue:function(e){if(e<0)return p.debug("Value cannot decrement below 0"),0;if(p.has.total()){if(e>p.total)return p.debug("Value cannot increment above total",p.total),p.total}else if(100<e)return p.debug("Value cannot increment above 100 percent"),100;return e},updateInterval:function(){return"auto"==r.updateInterval?r.duration:r.updateInterval},randomValue:function(){return p.debug("Generating random increment percentage"),Math.floor(Math.random()*r.random.max+r.random.min)},numericValue:function(e){return"string"==typeof e?""!==e.replace(/[^\d.]/g,"")&&+e.replace(/[^\d.]/g,""):e},transitionEnd:function(){var e,t=S.createElement("element"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in n)if(t.style[e]!==D)return n[e]},displayPercent:function(e){var t=T(u[e]),n=t.width(),e=c.width(),e=parseInt(t.css("min-width"),10)<n?n/e*100:p.percent;return 0<r.precision?Math.round(e*(10*r.precision))/(10*r.precision):Math.round(e)},percent:function(e){return p.percent&&p.percent[e||0]||0},value:function(e){return p.nextValue||p.value&&p.value[e||0]||0},total:function(){return p.total!==D&&p.total}},create:{progressPoll:function(){p.progressPoll=setTimeout(function(){p.update.toNextValue(),p.remove.progressPoll()},p.get.updateInterval())}},is:{complete:function(){return p.is.success()||p.is.warning()||p.is.error()},success:function(){return c.hasClass(n.success)},warning:function(){return c.hasClass(n.warning)},error:function(){return c.hasClass(n.error)},active:function(){return c.hasClass(n.active)},visible:function(){return c.is(":visible")}},remove:{progressPoll:function(){p.verbose("Removing progress poll timer"),p.progressPoll&&(clearTimeout(p.progressPoll),delete p.progressPoll)},nextValue:function(){p.verbose("Removing progress value stored for next update"),delete p.nextValue},state:function(){p.verbose("Removing stored state"),delete p.total,delete p.percent,delete p.value},active:function(){p.verbose("Removing active state"),c.removeClass(n.active)},success:function(){p.verbose("Removing success state"),c.removeClass(n.success)},warning:function(){p.verbose("Removing warning state"),c.removeClass(n.warning)},error:function(){p.verbose("Removing error state"),c.removeClass(n.error)}},set:{barWidth:function(e){p.debug("set bar width with ",e),e=p.helper.forceArray(e);var o=-1,a=-1,r=p.helper.sum(e),s=u.length,l=1<s,t=e.map(function(e,t){var n=t===s-1&&0===r,i=T(u[t]);return 0===e&&l&&!n?i.css("display","none"):(l&&n&&i.css("background","transparent"),-1==o&&(o=t),a=t,i.css({display:"block",width:e+"%"})),parseFloat(e)});e.forEach(function(e,t){T(u[t]).css({borderTopLeftRadius:t==o?"":0,borderBottomLeftRadius:t==o?"":0,borderTopRightRadius:t==a?"":0,borderBottomRightRadius:t==a?"":0})}),c.attr("data-percent",t)},duration:function(e){e=e||r.duration,p.verbose("Setting progress bar transition duration",e="number"==typeof e?e+"ms":e),u.css({"transition-duration":e})},percent:function(e){e=p.helper.forceArray(e).map(function(e){return e="string"==typeof e?+e.replace("%",""):e,r.limitValues?Math.max(0,Math.min(100,e)):e});var t,n=p.has.total(),i=p.helper.sum(e),o=1<e.length&&n,a=p.helper.sum(p.helper.forceArray(p.value));o&&a>p.total?p.error(s.sumExceedsTotal,a,p.total):!o&&100<i?p.error(s.tooHigh,i):i<0?p.error(s.tooLow,i):(t=0<r.precision?r.precision:o?p.helper.derivePrecision(Math.min.apply(null,p.value),p.total):0,o=e.map(function(e){return 0<t?Math.round(e*(10*t))/(10*t):Math.round(e)}),p.percent=o,n&&(p.value=e.map(function(e){return 0<t?Math.round(e/100*p.total*(10*t))/(10*t):Math.round(e/100*p.total*10)/10})),p.set.barWidth(e),p.set.labelInterval()),r.onChange.call(f,e,p.value,p.total)},labelInterval:function(){clearInterval(p.interval),p.bind.transitionEnd(function(){p.verbose("Bar finished animating, removing continuous label updates"),clearInterval(p.interval),g=!1,p.set.labels()}),g=!0,p.interval=setInterval(function(){T.contains(S.documentElement,f)||(clearInterval(p.interval),g=!1),p.set.labels()},r.framerate)},labels:function(){p.verbose("Setting both bar progress and outer label text"),p.set.barLabel(),p.set.state()},label:function(e){(e=e||"")&&(e=p.get.text(e),p.verbose("Setting label to text",e),d.text(e))},state:function(e){100===(e=e!==D?e:p.helper.sum(p.percent))?r.autoSuccess&&1===u.length&&!(p.is.warning()||p.is.error()||p.is.success())?(p.set.success(),p.debug("Automatically triggering success at 100%")):(p.verbose("Reached 100% removing active state"),p.remove.active(),p.remove.progressPoll()):0<e?(p.verbose("Adjusting active progress bar label",e),p.set.active()):(p.remove.active(),p.set.label(r.text.active))},barLabel:function(n){l.map(function(e,t){t=T(t);n!==D?t.text(p.get.text(n,e)):"ratio"==r.label&&p.has.total()?(p.verbose("Adding ratio to bar label"),t.text(p.get.text(r.text.ratio,e))):"percent"==r.label&&(p.verbose("Adding percentage to bar label"),t.text(p.get.text(r.text.percent,e)))})},active:function(e){e=e||r.text.active,p.debug("Setting active state"),r.showActivity&&!p.is.active()&&c.addClass(n.active),p.remove.warning(),p.remove.error(),p.remove.success(),(e=r.onLabelUpdate("active",e,p.value,p.total))&&p.set.label(e),p.bind.transitionEnd(function(){r.onActive.call(f,p.value,p.total)})},success:function(e,t){e=e||r.text.success||r.text.active,p.debug("Setting success state"),c.addClass(n.success),p.remove.active(),p.remove.warning(),p.remove.error(),p.complete(t),e=r.text.success?r.onLabelUpdate("success",e,p.value,p.total):r.onLabelUpdate("active",e,p.value,p.total),p.set.label(e),p.bind.transitionEnd(function(){r.onSuccess.call(f,p.total)})},warning:function(e,t){e=e||r.text.warning,p.debug("Setting warning state"),c.addClass(n.warning),p.remove.active(),p.remove.success(),p.remove.error(),p.complete(t),(e=r.onLabelUpdate("warning",e,p.value,p.total))&&p.set.label(e),p.bind.transitionEnd(function(){r.onWarning.call(f,p.value,p.total)})},error:function(e,t){e=e||r.text.error,p.debug("Setting error state"),c.addClass(n.error),p.remove.active(),p.remove.success(),p.remove.warning(),p.complete(t),(e=r.onLabelUpdate("error",e,p.value,p.total))&&p.set.label(e),p.bind.transitionEnd(function(){r.onError.call(f,p.value,p.total)})},transitionEvent:function(){p.get.transitionEnd()},total:function(e){p.total=e},value:function(e){p.value=p.helper.forceArray(e)},progress:function(e){p.has.progressPoll()?(p.debug("Updated within interval, setting next update to use new value",e),p.set.nextValue(e)):(p.debug("First update in progress update interval, immediately updating",e),p.update.progress(e),p.create.progressPoll())},nextValue:function(e){p.nextValue=e}},update:{toNextValue:function(){var e=p.nextValue;e&&(p.debug("Update interval complete using last updated value",e),p.update.progress(e),p.remove.nextValue())},progress:function(e){var n=p.has.total();n&&p.set.value(e);e=p.helper.forceArray(e).map(function(e){var t;return!1===(e=p.get.numericValue(e))&&p.error(s.nonNumeric,e),e=p.get.normalizedValue(e),n?(t=0<p.total?e/p.total*100:100,p.debug("Calculating percent complete from total",t)):(t=e,p.debug("Setting value to exact percentage value",t)),t});p.set.percent(e)}},setting:function(e,t){if(p.debug("Changing setting",e,t),T.isPlainObject(e))T.extend(!0,r,e);else{if(t===D)return r[e];T.isPlainObject(r[e])?T.extend(!0,r[e],t):r[e]=t}},internal:function(e,t){if(T.isPlainObject(e))T.extend(!0,p,e);else{if(t===D)return p[e];p[e]=t}},debug:function(){!r.silent&&r.debug&&(r.performance?p.performance.log(arguments):(p.debug=Function.prototype.bind.call(console.info,console,r.name+":"),p.debug.apply(console,arguments)))},verbose:function(){!r.silent&&r.verbose&&r.debug&&(r.performance?p.performance.log(arguments):(p.verbose=Function.prototype.bind.call(console.info,console,r.name+":"),p.verbose.apply(console,arguments)))},error:function(){r.silent||(p.error=Function.prototype.bind.call(console.error,console,r.name+":"),p.error.apply(console,arguments))},performance:{log:function(e){var t,n;r.performance&&(n=(t=(new Date).getTime())-(y||t),y=t,x.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:f,"Execution Time":n})),clearTimeout(p.performance.timer),p.performance.timer=setTimeout(p.performance.display,500)},display:function(){var e=r.name+":",n=0;y=!1,clearTimeout(p.performance.timer),T.each(x,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",b&&(e+=" '"+b+"'"),(console.group!==D||console.table!==D)&&0<x.length&&(console.groupCollapsed(e),console.table?console.table(x):T.each(x,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),x=[]}},invoke:function(i,e,t){var o,a,n,r=m;return e=e||k,t=f||t,"string"==typeof i&&r!==D&&(i=i.split(/[\. ]/),o=i.length-1,T.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(T.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==D)return a=r[n],!1;{if(!T.isPlainObject(r[t])||e==o)return r[t]!==D?a=r[t]:p.error(s.method,i),!1;r=r[t]}}})),T.isFunction(a)?n=a.apply(t,e):a!==D&&(n=a),Array.isArray(v)?v.push(n):v!==D?v=[v,n]:n!==D&&(v=n),a}};w?(m===D&&p.initialize(),p.invoke(C)):(m!==D&&m.invoke("destroy"),p.initialize())}),v!==D?v:this},T.fn.progress.settings={name:"Progress",namespace:"progress",silent:!1,debug:!1,verbose:!1,performance:!0,random:{min:2,max:5},duration:300,updateInterval:"auto",autoSuccess:!0,showActivity:!0,limitValues:!0,label:"percent",precision:0,framerate:1e3/30,percent:!1,total:!1,value:!1,failSafeDelay:100,onLabelUpdate:function(e,t,n,i){return t},onChange:function(e,t,n){},onSuccess:function(e){},onActive:function(e,t){},onError:function(e,t){},onWarning:function(e,t){},error:{method:"The method you called is not defined.",nonNumeric:"Progress value is non numeric",tooHigh:"Value specified is above 100%",tooLow:"Value specified is below 0%",sumExceedsTotal:"Sum of multple values exceed total"},regExp:{variable:/\{\$*[A-z0-9]+\}/g},metadata:{percent:"percent",total:"total",value:"value"},selector:{bar:"> .bar",label:"> .label",progress:".bar > .progress"},text:{active:!1,error:!1,success:!1,warning:!1,percent:"{percent}%",ratio:"{value} of {total}",bars:[""]},className:{active:"active",error:"error",success:"success",warning:"warning"}}}(jQuery,window,document),function(U,t,B,W){"use strict";t=void 0!==t&&t.Math==Math?t:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),U.fn.slider=function(O){var R,e=U(this),M=U(t),I=e.selector||"",j=(new Date).getTime(),L=[],V=O,q="string"==typeof V,z=[].slice.call(arguments,1),N=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],H=0;return e.each(function(){var c,r,s,e,u,l,t,d,f,m,g,o,n,p,a,h,v=U.isPlainObject(O)?U.extend(!0,{},U.fn.slider.settings,O):U.extend({},U.fn.slider.settings),i=v.className,b=v.metadata,y=v.namespace,x=v.error,C=v.keys,w=v.interpretLabel,k=!1,T="."+y,S="module-"+y,D=U(this),A=this,E=D.data(S),F=1,P={initialize:function(){P.debug("Initializing slider",v),h=!0,t=H+=1,n=P.setup.testOutTouch(),P.setup.layout(),P.setup.labels(),P.is.disabled()||P.bind.events(),P.read.metadata(),P.read.settings(),h=!1,P.instantiate()},instantiate:function(){P.verbose("Storing instance of slider",P),E=P,D.data(S,P)},destroy:function(){P.verbose("Destroying previous slider for",D),clearInterval(E.interval),P.unbind.events(),P.unbind.slidingEvents(),D.removeData(S),E=W},setup:{layout:function(){D.attr("tabindex")===W&&D.attr("tabindex",0),0==D.find(".inner").length&&D.append("<div class='inner'><div class='track'></div><div class='track-fill'></div><div class='thumb'></div></div>"),o=P.get.precision(),r=D.find(".thumb:not(.second)"),c=r,P.is.range()&&(0==D.find(".thumb.second").length&&D.find(".inner").append("<div class='thumb second'></div>"),s=D.find(".thumb.second")),e=D.find(".track"),u=D.find(".track-fill"),g=r.width()/2},labels:function(){P.is.labeled()&&(0!=(l=D.find(".labels:not(.auto)")).length?P.setup.customLabel():P.setup.autoLabel(),v.showLabelTicks&&D.addClass(i.ticked))},testOutTouch:function(){try{return B.createEvent("TouchEvent"),!0}catch(e){return!1}},customLabel:function(){var n,e=l.find(".label"),i=e.length,o=P.get.min(),a=P.get.max();e.each(function(e){var t=U(this).attr("data-value");n=t?((t=a<t?a:t<o?o:t)-o)/(a-o):(e+1)/(i+1),P.update.labelPosition(n,U(this))})},autoLabel:function(){0!=(l=D.find(".labels")).length?l.empty():l=D.append('<ul class="auto labels"></ul>').find(".labels");for(var e=0,t=P.get.numLabels();e<=t;e++){var n=P.get.label(e),n=""!==n?e%P.get.gapRatio()?U('<li class="halftick label"></li>'):U('<li class="label">'+n+"</li>"):null;n&&(P.update.labelPosition(e/t,n),l.append(n))}}},bind:{events:function(){P.bind.globalKeyboardEvents(),P.bind.keyboardEvents(),P.bind.mouseEvents(),P.is.touch()&&P.bind.touchEvents(),v.autoAdjustLabels&&P.bind.windowEvents()},keyboardEvents:function(){P.verbose("Binding keyboard events"),D.on("keydown"+T,P.event.keydown)},globalKeyboardEvents:function(){U(B).on("keydown"+T+t,P.event.activateFocus)},mouseEvents:function(){P.verbose("Binding mouse events"),D.find(".track, .thumb, .inner").on("mousedown"+T,function(e){e.stopImmediatePropagation(),e.preventDefault(),P.event.down(e)}),D.on("mousedown"+T,P.event.down),D.on("mouseenter"+T,function(e){k=!0}),D.on("mouseleave"+T,function(e){k=!1})},touchEvents:function(){P.verbose("Binding touch events"),D.find(".track, .thumb, .inner").on("touchstart"+T,function(e){e.stopImmediatePropagation(),e.preventDefault(),P.event.down(e)}),D.on("touchstart"+T,P.event.down)},slidingEvents:function(){P.verbose("Binding page wide events while handle is being draged"),P.is.touch()?(U(B).on("touchmove"+T,P.event.move),U(B).on("touchend"+T,P.event.up)):(U(B).on("mousemove"+T,P.event.move),U(B).on("mouseup"+T,P.event.up))},windowEvents:function(){M.on("resize"+T,P.event.resize)}},unbind:{events:function(){D.find(".track, .thumb, .inner").off("mousedown"+T),D.find(".track, .thumb, .inner").off("touchstart"+T),D.off("mousedown"+T),D.off("mouseenter"+T),D.off("mouseleave"+T),D.off("touchstart"+T),D.off("keydown"+T),D.off("focusout"+T),U(B).off("keydown"+T+t,P.event.activateFocus),M.off("resize"+T)},slidingEvents:function(){P.is.touch()?(U(B).off("touchmove"+T),U(B).off("touchend"+T)):(U(B).off("mousemove"+T),U(B).off("mouseup"+T))}},event:{down:function(e){e.preventDefault(),P.is.range()?(e=P.determine.eventPos(e),e=P.determine.pos(e),c=v.preventCrossover&&P.is.range()&&P.thumbVal===P.secondThumbVal?(a=e,W):P.determine.closestThumb(e),p===W&&(p=P.get.currentThumbValue())):p===W&&(p=P.get.value()),P.is.disabled()||P.bind.slidingEvents()},move:function(e){e.preventDefault();var t,n,i=P.determine.valueFromEvent(e);c===W&&(t=P.determine.eventPos(e),n=P.determine.pos(t),c=n<a?r:s),0==P.get.step()||P.is.smooth()?(t=P.thumbVal,n=P.secondThumbVal,e=P.determine.smoothValueFromEvent(e),c.hasClass("second")?(v.preventCrossover&&P.is.range()&&(i=Math.max(t,i),e=Math.max(t,e)),n=i):(v.preventCrossover&&P.is.range()&&(i=Math.min(n,i),e=Math.min(n,e)),t=i),i=Math.abs(t-(n||0)),P.update.position(e),v.onMove.call(A,i,t,n)):P.update.value(i,function(e,t,n){v.onMove.call(A,e,t,n)})},up:function(e){e.preventDefault();e=P.determine.valueFromEvent(e);P.set.value(e),P.unbind.slidingEvents(),p!==W&&(p=W)},keydown:function(e,t){if(v.preventCrossover&&P.is.range()&&P.thumbVal===P.secondThumbVal&&(c=W),P.is.focused()&&U(B).trigger(e),t||P.is.focused()){t=P.determine.keyMovement(e);if(0!=t)switch(e.preventDefault(),t){case 1:P.takeStep();break;case 2:P.takeStep(P.get.multiplier());break;case-1:P.backStep();break;case-2:P.backStep(P.get.multiplier())}}},activateFocus:function(e){!P.is.focused()&&P.is.hover()&&0!=P.determine.keyMovement(e)&&(e.preventDefault(),P.event.keydown(e,!0),D.focus())},resize:function(e){F!=P.get.gapRatio()&&(P.setup.labels(),F=P.get.gapRatio())}},resync:function(){P.verbose("Resyncing thumb position based on value"),P.is.range()&&P.update.position(P.secondThumbVal,s),P.update.position(P.thumbVal,r),P.setup.labels()},takeStep:function(e){var e=e!=W?e:1,t=P.get.step(),n=P.get.currentThumbValue();P.verbose("Taking a step"),0<t?P.set.value(n+t*e):0==t&&(t=P.get.precision(),P.set.value(Math.round((n+e/t)*t)/t))},backStep:function(e){var e=e!=W?e:1,t=P.get.step(),n=P.get.currentThumbValue();P.verbose("Going back a step"),0<t?P.set.value(n-t*e):0==t&&(t=P.get.precision(),P.set.value(Math.round((n-e/t)*t)/t))},is:{range:function(){return D.hasClass(v.className.range)},hover:function(){return k},focused:function(){return D.is(":focus")},disabled:function(){return D.hasClass(v.className.disabled)},labeled:function(){return D.hasClass(v.className.labeled)},reversed:function(){return D.hasClass(v.className.reversed)},vertical:function(){return D.hasClass(v.className.vertical)},smooth:function(){return v.smooth||D.hasClass(v.className.smooth)},touch:function(){return n}},get:{trackOffset:function(){return P.is.vertical()?e.offset().top:e.offset().left},trackLength:function(){return P.is.vertical()?e.height():e.width()},trackLeft:function(){return P.is.vertical()?e.position().top:e.position().left},trackStartPos:function(){return P.is.reversed()?P.get.trackLeft()+P.get.trackLength():P.get.trackLeft()},trackEndPos:function(){return P.is.reversed()?P.get.trackLeft():P.get.trackLeft()+P.get.trackLength()},trackStartMargin:function(){var e=P.is.vertical()?P.is.reversed()?D.css("padding-bottom"):D.css("padding-top"):P.is.reversed()?D.css("padding-right"):D.css("padding-left");return e||"0px"},trackEndMargin:function(){var e=P.is.vertical()?P.is.reversed()?D.css("padding-top"):D.css("padding-bottom"):P.is.reversed()?D.css("padding-left"):D.css("padding-right");return e||"0px"},precision:function(){var e=P.get.step();t=0!=e?2==(t=String(e).split(".")).length?t[1].length:0:v.decimalPlaces;var t=Math.pow(10,t);return P.debug("Precision determined",t),t},min:function(){return v.min},max:function(){var e=P.get.step(),t=P.get.min(),n=0===e?0:Math.floor((v.max-t)/e);return 0==(0===e?0:(v.max-t)%e)?v.max:t+n*e},step:function(){return v.step},numLabels:function(){var e=Math.round((P.get.max()-P.get.min())/(0===P.get.step()?1:P.get.step()));return P.debug("Determined that there should be "+e+" labels"),e},labelType:function(){return v.labelType},label:function(e){if(w)return w(e);switch(v.labelType){case v.labelTypes.number:return Math.round((e*(0===P.get.step()?1:P.get.step())+P.get.min())*o)/o;case v.labelTypes.letter:return N[e%26];default:return e}},value:function(){return d},currentThumbValue:function(){return c!==W&&c.hasClass("second")?P.secondThumbVal:P.thumbVal},thumbValue:function(e){return"second"!==e?P.thumbVal:P.is.range()?P.secondThumbVal:void P.error(x.notrange)},multiplier:function(){return v.pageMultiplier},thumbPosition:function(e){return"second"!==e?f:P.is.range()?m:void P.error(x.notrange)},gapRatio:function(){var e=1;if(v.autoAdjustLabels){var t=P.get.numLabels(),n=P.get.trackLength(),i=1;if(0<n)for(;n/t*i<v.labelDistance;)t%i||(e=i),i+=1}return e}},determine:{pos:function(e){return P.is.reversed()?P.get.trackStartPos()-e+P.get.trackOffset():e-P.get.trackOffset()-P.get.trackStartPos()},closestThumb:function(e){var t=parseFloat(P.determine.thumbPos(r)),n=Math.abs(e-t),t=parseFloat(P.determine.thumbPos(s)),t=Math.abs(e-t);return(n!==t||P.get.thumbValue()!==P.get.min())&&n<=t?r:s},closestThumbPos:function(e){var t=parseFloat(P.determine.thumbPos(r)),n=Math.abs(e-t),i=parseFloat(P.determine.thumbPos(s));return n<=Math.abs(e-i)?t:i},thumbPos:function(e){return P.is.vertical()?P.is.reversed()?e.css("bottom"):e.css("top"):P.is.reversed()?e.css("right"):e.css("left")},positionFromValue:function(e){var t=P.get.min(),n=P.get.max(),e=n<e?n:e<t?t:e,i=P.get.trackLength(),i=Math.round((e-t)/(n-t)*i);return P.verbose("Determined position: "+i+" from value: "+e),i},positionFromRatio:function(e){var t=P.get.trackLength(),n=P.get.step(),t=Math.round(e*t);return 0==n?t:Math.round(t/n)*n},valueFromEvent:function(e){var t=P.determine.eventPos(e),e=P.determine.pos(t),e=t<P.get.trackOffset()?P.is.reversed()?P.get.max():P.get.min():t>P.get.trackOffset()+P.get.trackLength()?P.is.reversed()?P.get.min():P.get.max():P.determine.value(e);return e},smoothValueFromEvent:function(e){var t=P.get.min(),n=P.get.max(),i=P.get.trackLength(),e=P.determine.eventPos(e)-P.get.trackOffset(),i=(e=e<0?0:i<e?i:e)/i;return(i=P.is.reversed()?1-i:i)*(n-t)+t},eventPos:function(e){if(P.is.touch()){var t=e.changedTouches?e:e.originalEvent,n=t.changedTouches[0]?t.changedTouches:t.touches,t=n[0].pageY,n=n[0].pageX;return P.is.vertical()?t:n}n=e.pageY||e.originalEvent.pageY,e=e.pageX||e.originalEvent.pageX;return P.is.vertical()?n:e},value:function(e){var t=P.is.reversed()?P.get.trackEndPos():P.get.trackStartPos(),n=(e-t)/((P.is.reversed()?P.get.trackStartPos():P.get.trackEndPos())-t),i=P.get.max()-P.get.min(),t=P.get.step(),i=n*i,t=0==t?i:Math.round(i/t)*t;return P.verbose("Determined value based upon position: "+e+" as: "+i),i!=t&&P.verbose("Rounding value to closest step: "+t),P.verbose("Cutting off additional decimal places"),Math.round((t+P.get.min())*o)/o},keyMovement:function(e){var t=e.which,n=!P.is.vertical()||P.is.reversed()?C.downArrow:C.upArrow,i=!P.is.vertical()||P.is.reversed()?C.upArrow:C.downArrow,o=!P.is.vertical()&&P.is.reversed()?C.rightArrow:C.leftArrow,e=!P.is.vertical()&&P.is.reversed()?C.leftArrow:C.rightArrow;return t==n||t==o?-1:t==i||t==e?1:t==C.pageDown?-2:t==C.pageUp?2:0}},handleNewValuePosition:function(e){var t=P.get.min(),n=P.get.max();return e<=t?e=t:n<=e&&(e=n),P.determine.positionFromValue(e)},set:{value:function(i,o){o=!1!==o;var a=p===W;p=p===W?P.get.value():p,P.update.value(i,function(e,t,n){h&&!v.fireOnInit||!o||(i!==p&&v.onChange.call(A,e,t,n),v.onMove.call(A,e,t,n)),a&&(p=W)})},rangeValue:function(e,t,n){var i,o,a;n=!1!==n,P.is.range()?(i=P.get.min(),o=P.get.max(),p=(a=p===W)?P.get.value():p,e<=i?e=i:o<=e&&(e=o),t<=i?t=i:o<=t&&(t=o),P.thumbVal=e,P.secondThumbVal=t,d=Math.abs(P.thumbVal-P.secondThumbVal),P.update.position(P.thumbVal,r),P.update.position(P.secondThumbVal,s),h&&!v.fireOnInit||!n||(d!==p&&v.onChange.call(A,d,P.thumbVal,P.secondThumbVal),v.onMove.call(A,d,P.thumbVal,P.secondThumbVal)),a&&(p=W)):P.error(x.notrange)},position:function(e,t){e=P.determine.value(e);"second"===t?(P.secondThumbVal=e,P.update.position(e,s)):(P.thumbVal=e,P.update.position(e,r)),d=Math.abs(P.thumbVal-(P.secondThumbVal||0)),P.set.value(d)}},update:{value:function(e,t){var n=P.get.min(),i=P.get.max();e<=n?e=n:i<=e&&(e=i),P.is.range()?((c=c===W?e<=P.get.currentThumbValue()?r:s:c).hasClass("second")?(v.preventCrossover&&P.is.range()&&(e=Math.max(P.thumbVal,e)),P.secondThumbVal=e):(v.preventCrossover&&P.is.range()&&(e=Math.min(P.secondThumbVal,e)),P.thumbVal=e),d=Math.abs(P.thumbVal-P.secondThumbVal)):(d=e,P.thumbVal=d),P.update.position(e),P.debug("Setting slider value to "+d),"function"==typeof t&&t(d,P.thumbVal,P.secondThumbVal)},position:function(e,t){var n=P.handleNewValuePosition(e),i=t!=W?t:c,o=P.thumbVal||P.get.min(),a=P.secondThumbVal||P.get.min();P.is.range()&&i.hasClass("second")?(m=n,a=e):(f=n,o=e);var r,s=P.get.min(),l=P.get.max(),t=100*(e-s)/(l-s),e=100*(Math.min(o,a)-s)/(l-s),s=100*(1-(Math.max(o,a)-s)/(l-s)),s=P.is.vertical()?P.is.reversed()?(r={bottom:"calc("+t+"% - "+g+"px)",top:"auto"},{bottom:e+"%",top:s+"%"}):(r={top:"calc("+t+"% - "+g+"px)",bottom:"auto"},{top:e+"%",bottom:s+"%"}):P.is.reversed()?(r={right:"calc("+t+"% - "+g+"px)",left:"auto"},{right:e+"%",left:s+"%"}):(r={left:"calc("+t+"% - "+g+"px)",right:"auto"},{left:e+"%",right:s+"%"});i.css(r),u.css(s),P.debug("Setting slider position to "+n)},labelPosition:function(e,t){var n=P.get.trackStartMargin(),i=P.get.trackEndMargin(),o=P.is.vertical()?P.is.reversed()?"bottom":"top":P.is.reversed()?"right":"left",a=P.is.reversed()&&!P.is.vertical()?" - ":" + ";t.css(o,"calc("+("(100% - "+n+" - "+i+") * "+e)+a+n+")")}},goto:{max:function(){P.set.value(P.get.max())},min:function(){P.set.value(P.get.min())}},read:{metadata:function(){var e={thumbVal:D.data(b.thumbVal),secondThumbVal:D.data(b.secondThumbVal)};e.thumbVal&&(P.is.range()&&e.secondThumbVal?(P.debug("Current value set from metadata",e.thumbVal,e.secondThumbVal),P.set.rangeValue(e.thumbVal,e.secondThumbVal)):(P.debug("Current value set from metadata",e.thumbVal),P.set.value(e.thumbVal)))},settings:function(){!1!==v.start&&(P.is.range()?(P.debug("Start position set from settings",v.start,v.end),P.set.rangeValue(v.start,v.end)):(P.debug("Start position set from settings",v.start),P.set.value(v.start)))}},setting:function(e,t){if(P.debug("Changing setting",e,t),U.isPlainObject(e))U.extend(!0,v,e);else{if(t===W)return v[e];U.isPlainObject(v[e])?U.extend(!0,v[e],t):v[e]=t}},internal:function(e,t){if(U.isPlainObject(e))U.extend(!0,P,e);else{if(t===W)return P[e];P[e]=t}},debug:function(){!v.silent&&v.debug&&(v.performance?P.performance.log(arguments):(P.debug=Function.prototype.bind.call(console.info,console,v.name+":"),P.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?P.performance.log(arguments):(P.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),P.verbose.apply(console,arguments)))},error:function(){v.silent||(P.error=Function.prototype.bind.call(console.error,console,v.name+":"),P.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(j||t),j=t,L.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:A,"Execution Time":n})),clearTimeout(P.performance.timer),P.performance.timer=setTimeout(P.performance.display,500)},display:function(){var e=v.name+":",n=0;j=!1,clearTimeout(P.performance.timer),U.each(L,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",I&&(e+=" '"+I+"'"),(console.group!==W||console.table!==W)&&0<L.length&&(console.groupCollapsed(e),console.table?console.table(L):U.each(L,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),L=[]}},invoke:function(i,e,t){var o,a,n,r=E;return e=e||z,t=A||t,"string"==typeof i&&r!==W&&(i=i.split(/[\. ]/),o=i.length-1,U.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(U.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==W)return a=r[n],!1;{if(!U.isPlainObject(r[t])||e==o)return r[t]!==W?a=r[t]:P.error(x.method,i),!1;r=r[t]}}})),U.isFunction(a)?n=a.apply(t,e):a!==W&&(n=a),U.isArray(R)?R.push(n):R!==W?R=[R,n]:n!==W&&(R=n),a}};q?(E===W&&P.initialize(),P.invoke(V)):(E!==W&&E.invoke("destroy"),P.initialize())}),R!==W?R:this},U.fn.slider.settings={silent:!1,debug:!1,verbose:!1,performance:!0,name:"Slider",namespace:"slider",error:{method:"The method you called is not defined.",notrange:"This slider is not a range slider"},metadata:{thumbVal:"thumbVal",secondThumbVal:"secondThumbVal"},min:0,max:20,step:1,start:0,end:20,labelType:"number",showLabelTicks:!1,smooth:!1,autoAdjustLabels:!0,labelDistance:100,preventCrossover:!0,fireOnInit:!1,interpretLabel:!1,decimalPlaces:2,pageMultiplier:2,selector:{},className:{reversed:"reversed",disabled:"disabled",labeled:"labeled",ticked:"ticked",vertical:"vertical",range:"range",smooth:"smooth"},keys:{pageUp:33,pageDown:34,leftArrow:37,upArrow:38,rightArrow:39,downArrow:40},labelTypes:{number:"number",letter:"letter"},onChange:function(e,t,n){},onMove:function(e,t,n){}}}(jQuery,window,document),function(k,e,T){"use strict";k.isFunction=k.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),k.fn.rating=function(g){var p,h=k(this),v=h.selector||"",b=(new Date).getTime(),y=[],x=g,C="string"==typeof x,w=[].slice.call(arguments,1);return h.each(function(){var e,o=k.isPlainObject(g)?k.extend(!0,{},k.fn.rating.settings,g):k.extend({},k.fn.rating.settings),t=o.namespace,a=o.className,n=o.metadata,i=o.selector,r=o.cssVars,s="."+t,l="module-"+t,c=this,u=k(this).data(l),d=k(this),f=d.find(i.icon),m={initialize:function(){m.verbose("Initializing rating module",o),0===f.length&&m.setup.layout(),o.interactive&&!m.is.disabled()?m.enable():m.disable(),m.set.initialLoad(),m.set.rating(m.get.initialRating()),m.remove.initialLoad(),m.instantiate()},instantiate:function(){m.verbose("Instantiating module",o),u=m,d.data(l,m)},destroy:function(){m.verbose("Destroying previous instance",u),m.remove.events(),d.removeData(l)},refresh:function(){f=d.find(i.icon)},setup:{layout:function(){var e=m.get.maxRating(),t=m.get.icon(),t=k.fn.rating.settings.templates.icon(e,t);m.debug("Generating icon html dynamically"),d.html(t),m.refresh()}},event:{mouseenter:function(){var e=k(this);e.nextAll().removeClass(a.selected),d.addClass(a.selected),e.addClass(a.selected).prevAll().addClass(a.selected)},mouseleave:function(){d.removeClass(a.selected),f.removeClass(a.selected)},click:function(){var e=k(this),t=m.get.rating(),e=f.index(e)+1;("auto"==o.clearable?1===f.length:o.clearable)&&t==e?m.clearRating():m.set.rating(e)}},clearRating:function(){m.debug("Clearing current rating"),m.set.rating(0)},bind:{events:function(){m.verbose("Binding events"),d.on("mouseenter"+s,i.icon,m.event.mouseenter).on("mouseleave"+s,i.icon,m.event.mouseleave).on("click"+s,i.icon,m.event.click)}},remove:{events:function(){m.verbose("Removing events"),d.off(s)},initialLoad:function(){e=!1}},enable:function(){m.debug("Setting rating to interactive mode"),m.bind.events(),d.removeClass(a.disabled)},disable:function(){m.debug("Setting rating to read-only mode"),m.remove.events(),d.addClass(a.disabled)},is:{initialLoad:function(){return e},disabled:function(){return d.hasClass(a.disabled)}},get:{icon:function(){var e=d.data(n.icon);return e&&d.removeData(n.icon),e||o.icon},initialRating:function(){return d.data(n.rating)!==T?(d.removeData(n.rating),d.data(n.rating)):o.initialRating},maxRating:function(){return d.data(n.maxRating)!==T?(d.removeData(n.maxRating),d.data(n.maxRating)):o.maxRating},rating:function(){var e=f.filter("."+a.active).length;return m.verbose("Current rating retrieved",e),e}},set:{rating:function(e){var t=Math.floor(0<=e-1?e-1:0),n=f.eq(t),i=e<=1?n:n.next(),t=e%1*100;d.removeClass(a.selected),f.removeClass(a.selected).removeClass(a.active).removeClass(a.partiallyActive),0<e&&(m.verbose("Setting current rating to",e),n.prevAll().addBack().addClass(a.active),n.next()&&e%1!=0&&(i.addClass(a.partiallyActive).addClass(a.active),i.css(r.filledCustomPropName,t+"%"),"transparent"===i.css("backgroundColor")&&i.removeClass(a.partiallyActive).removeClass(a.active))),m.is.initialLoad()||o.onRate.call(c,e)},initialLoad:function(){e=!0}},setting:function(e,t){if(m.debug("Changing setting",e,t),k.isPlainObject(e))k.extend(!0,o,e);else{if(t===T)return o[e];k.isPlainObject(o[e])?k.extend(!0,o[e],t):o[e]=t}},internal:function(e,t){if(k.isPlainObject(e))k.extend(!0,m,e);else{if(t===T)return m[e];m[e]=t}},debug:function(){!o.silent&&o.debug&&(o.performance?m.performance.log(arguments):(m.debug=Function.prototype.bind.call(console.info,console,o.name+":"),m.debug.apply(console,arguments)))},verbose:function(){!o.silent&&o.verbose&&o.debug&&(o.performance?m.performance.log(arguments):(m.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),m.verbose.apply(console,arguments)))},error:function(){o.silent||(m.error=Function.prototype.bind.call(console.error,console,o.name+":"),m.error.apply(console,arguments))},performance:{log:function(e){var t,n;o.performance&&(n=(t=(new Date).getTime())-(b||t),b=t,y.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:c,"Execution Time":n})),clearTimeout(m.performance.timer),m.performance.timer=setTimeout(m.performance.display,500)},display:function(){var e=o.name+":",n=0;b=!1,clearTimeout(m.performance.timer),k.each(y,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",v&&(e+=" '"+v+"'"),1<h.length&&(e+=" ("+h.length+")"),(console.group!==T||console.table!==T)&&0<y.length&&(console.groupCollapsed(e),console.table?console.table(y):k.each(y,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),y=[]}},invoke:function(i,e,t){var o,a,n,r=u;return e=e||w,t=c||t,"string"==typeof i&&r!==T&&(i=i.split(/[\. ]/),o=i.length-1,k.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(k.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==T)return a=r[n],!1;{if(!k.isPlainObject(r[t])||e==o)return r[t]!==T&&(a=r[t]),!1;r=r[t]}}})),k.isFunction(a)?n=a.apply(t,e):a!==T&&(n=a),Array.isArray(p)?p.push(n):p!==T?p=[p,n]:n!==T&&(p=n),a}};C?(u===T&&m.initialize(),m.invoke(x)):(u!==T&&u.invoke("destroy"),m.initialize())}),p!==T?p:this},k.fn.rating.settings={name:"Rating",namespace:"rating",icon:"star",silent:!1,debug:!1,verbose:!1,performance:!0,initialRating:0,interactive:!0,maxRating:4,clearable:"auto",fireOnInit:!1,onRate:function(e){},error:{method:"The method you called is not defined",noMaximum:"No maximum rating specified. Cannot generate HTML automatically"},metadata:{rating:"rating",maxRating:"maxRating",icon:"icon"},className:{active:"active",disabled:"disabled",selected:"selected",loading:"loading",partiallyActive:"partial"},cssVars:{filledCustomPropName:"--full"},selector:{icon:".icon"},templates:{icon:function(e,t){for(var n=1,i="";n<=e;)i+='<i class="'+t+' icon"></i>',n++;return i}}}}(jQuery,window,void document),function(F,P,O,R){"use strict";F.isFunction=F.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},P=void 0!==P&&P.Math==Math?P:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),F.fn.search=function(x){var C,w=F(this),k=w.selector||"",T=(new Date).getTime(),S=[],D=x,A="string"==typeof D,E=[].slice.call(arguments,1);return F(this).each(function(){var u=F.isPlainObject(x)?F.extend(!0,{},F.fn.search.settings,x):F.extend({},F.fn.search.settings),d=u.className,l=u.metadata,i=u.regExp,a=u.fields,f=u.selector,m=u.error,e=u.namespace,o="."+e,t=e+"-module",g=F(this),p=g.find(f.prompt),n=g.find(f.searchButton),r=g.find(f.results),s=g.find(f.result),c=(g.find(f.category),this),h=g.data(t),v=!1,b=!1,y={initialize:function(){y.verbose("Initializing module"),y.get.settings(),y.determine.searchFields(),y.bind.events(),y.set.type(),y.create.results(),y.instantiate()},instantiate:function(){y.verbose("Storing instance of module",y),h=y,g.data(t,y)},destroy:function(){y.verbose("Destroying instance"),g.off(o).removeData(t)},refresh:function(){y.debug("Refreshing selector cache"),p=g.find(f.prompt),n=g.find(f.searchButton),g.find(f.category),r=g.find(f.results),s=g.find(f.result)},refreshResults:function(){r=g.find(f.results),s=g.find(f.result)},bind:{events:function(){y.verbose("Binding events to search"),u.automatic&&(g.on(y.get.inputEvent()+o,f.prompt,y.event.input),p.attr("autocomplete",y.is.chrome()?"fomantic-search":"off")),g.on("focus"+o,f.prompt,y.event.focus).on("blur"+o,f.prompt,y.event.blur).on("keydown"+o,f.prompt,y.handleKeyboard).on("click"+o,f.searchButton,y.query).on("mousedown"+o,f.results,y.event.result.mousedown).on("mouseup"+o,f.results,y.event.result.mouseup).on("click"+o,f.result,y.event.result.click)}},determine:{searchFields:function(){x&&x.searchFields!==R&&(u.searchFields=x.searchFields)}},event:{input:function(){u.searchDelay?(clearTimeout(y.timer),y.timer=setTimeout(function(){y.is.focused()&&y.query()},u.searchDelay)):y.query()},focus:function(){y.set.focus(),u.searchOnFocus&&y.has.minimumCharacters()&&y.query(function(){y.can.show()&&y.showResults()})},blur:function(e){function t(){y.cancel.query(),y.remove.focus(),y.timer=setTimeout(y.hideResults,u.hideDelay)}var n=O.activeElement===this;n||(b=!1,y.resultsClicked?(y.debug("Determining if user action caused search to close"),g.one("click.close"+o,f.results,function(e){y.is.inMessage(e)||v?p.focus():(v=!1,y.is.animating()||y.is.hidden()||t())})):(y.debug("Input blurred without user action, closing results"),t()))},result:{mousedown:function(){y.resultsClicked=!0},mouseup:function(){y.resultsClicked=!1},click:function(e){y.debug("Search result selected");var t=F(this),n=t.find(f.title).eq(0),i=t.is("a[href]")?t:t.find("a[href]").eq(0),o=i.attr("href")||!1,a=i.attr("target")||!1,r=0<n.length&&n.text(),s=y.get.results(),n=t.data(l.result)||y.get.result(r,s),t=y.get.value();if(F.isFunction(u.onSelect)&&!1===u.onSelect.call(c,n,s))return y.debug("Custom onSelect callback cancelled default select action"),void(v=!0);y.hideResults(),r&&y.get.value()===t&&y.set.value(r),o&&(e.preventDefault(),y.verbose("Opening search link found in result",i),"_blank"==a||e.ctrlKey?P.open(o):P.location.href=o)}}},ensureVisible:function(e){var t,n,i;0!==e.length&&(n=(t=e.position().top)+e.outerHeight(!0),i=r.scrollTop(),e=r.height(),t<0?r.scrollTop(i+t):e<n&&r.scrollTop(i+(n-e)))},handleKeyboard:function(e){var t,n=g.find(f.result),i=g.find(f.category),o=n.filter("."+d.active),a=n.index(o),r=n.length,s=0<o.length,l=e.which,c=13,u=38,o=40;if(l==27&&(y.verbose("Escape key pressed, blurring search field"),y.hideResults(),b=!0),y.is.visible())if(l==c){if(y.verbose("Enter key pressed, selecting active result"),0<n.filter("."+d.active).length)return y.event.result.click.call(n.filter("."+d.active),e),e.preventDefault(),!1}else l==u&&s?(y.verbose("Up key pressed, changing active result"),t=a-1<0?a:a-1,i.removeClass(d.active),n.removeClass(d.active).eq(t).addClass(d.active).closest(i).addClass(d.active),y.ensureVisible(n.eq(t)),e.preventDefault()):l==o&&(y.verbose("Down key pressed, changing active result"),t=r<=a+1?a:a+1,i.removeClass(d.active),n.removeClass(d.active).eq(t).addClass(d.active).closest(i).addClass(d.active),y.ensureVisible(n.eq(t)),e.preventDefault());else l==c&&(y.verbose("Enter key pressed, executing query"),y.query(),y.set.buttonPressed(),p.one("keyup",y.remove.buttonFocus))},setup:{api:function(t,n){var e={debug:u.debug,on:!1,cache:u.cache,action:"search",urlData:{query:t},onSuccess:function(e){y.parse.response.call(c,e,t),n()},onFailure:function(){y.displayMessage(m.serverError),n()},onAbort:function(e){},onError:y.error};F.extend(!0,e,u.apiSettings),y.verbose("Setting up API request",e),g.api(e)}},can:{useAPI:function(){return F.fn.api!==R},show:function(){return y.is.focused()&&!y.is.visible()&&!y.is.empty()},transition:function(){return u.transition&&F.fn.transition!==R&&g.transition("is supported")}},is:{animating:function(){return r.hasClass(d.animating)},chrome:function(){return!(!P.chrome||!P.chrome.webstore&&!P.chrome.runtime)},hidden:function(){return r.hasClass(d.hidden)},inMessage:function(e){if(e.target){var t=F(e.target);return F.contains(O.documentElement,e.target)&&0<t.closest(f.message).length}},empty:function(){return""===r.html()},visible:function(){return 0<r.filter(":visible").length},focused:function(){return 0<p.filter(":focus").length}},get:{settings:function(){F.isPlainObject(x)&&x.searchFullText&&(u.fullTextSearch=x.searchFullText,y.error(u.error.oldSearchSyntax,c)),u.ignoreDiacritics&&!String.prototype.normalize&&(u.ignoreDiacritics=!1,y.error(m.noNormalize,c))},inputEvent:function(){var e=p[0];return e!==R&&e.oninput!==R?"input":e!==R&&e.onpropertychange!==R?"propertychange":"keyup"},value:function(){return p.val()},results:function(){return g.data(l.results)},result:function(n,e){var i=!1;return n=n!==R?n:y.get.value(),e=e!==R?e:y.get.results(),"category"===u.type?(y.debug("Finding result that matches",n),F.each(e,function(e,t){if(Array.isArray(t.results)&&(i=y.search.object(n,t.results)[0]))return!1})):(y.debug("Finding result in results object",n),i=y.search.object(n,e)[0]),i||!1}},select:{firstResult:function(){y.verbose("Selecting first result"),s.first().addClass(d.active)}},set:{focus:function(){g.addClass(d.focus)},loading:function(){g.addClass(d.loading)},value:function(e){y.verbose("Setting search input value",e),p.val(e)},type:function(e){e=e||u.type,"category"==u.type&&g.addClass(u.type)},buttonPressed:function(){n.addClass(d.pressed)}},remove:{loading:function(){g.removeClass(d.loading)},focus:function(){g.removeClass(d.focus)},buttonPressed:function(){n.removeClass(d.pressed)},diacritics:function(e){return u.ignoreDiacritics?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}},query:function(e){e=F.isFunction(e)?e:function(){};var t=y.get.value(),n=y.read.cache(t);e=e||function(){},y.has.minimumCharacters()?(n?(y.debug("Reading result from cache",t),y.save.results(n.results),y.addResults(n.html),y.inject.id(n.results),e()):(y.debug("Querying for",t),F.isPlainObject(u.source)||Array.isArray(u.source)?(y.search.local(t),e()):y.can.useAPI()?y.search.remote(t,e):(y.error(m.source),e())),u.onSearchQuery.call(c,t)):y.hideResults()},search:{local:function(e){var t,n=y.search.object(e,u.source);y.set.loading(),y.save.results(n),y.debug("Returned full local search results",n),0<u.maxResults&&(y.debug("Using specified max results",n),n=n.slice(0,u.maxResults)),"category"==u.type&&(n=y.create.categoryResults(n)),t=y.generateResults({results:n}),y.remove.loading(),y.addResults(t),y.inject.id(n),y.write.cache(e,{html:t,results:n})},remote:function(e,t){t=F.isFunction(t)?t:function(){},g.api("is loading")&&g.api("abort"),y.setup.api(e,t),g.api("query")},object:function(o,t,e){o=y.remove.diacritics(String(o));function a(e,t){var n=-1==F.inArray(t,r),i=-1==F.inArray(t,l),o=-1==F.inArray(t,s);n&&i&&o&&e.push(t)}var r=[],s=[],l=[],n=o.replace(i.escape,"\\$&"),c=new RegExp(i.beginsWith+n,"i");return t=t||u.source,e=e!==R?e:u.searchFields,Array.isArray(e)||(e=[e]),t===R||!1===t?(y.error(m.source),[]):(F.each(e,function(e,i){F.each(t,function(e,t){var n;"string"!=typeof t[i]&&"number"!=typeof t[i]||(-1!==(n="string"==typeof t[i]?y.remove.diacritics(t[i]):t[i].toString()).search(c)?a(r,t):"exact"===u.fullTextSearch&&y.exactSearch(o,n)?a(s,t):1==u.fullTextSearch&&y.fuzzySearch(o,n)&&a(l,t))})}),F.merge(s,l),F.merge(r,s),r)}},exactSearch:function(e,t){return e=e.toLowerCase(),-1<(t=t.toLowerCase()).indexOf(e)},fuzzySearch:function(e,t){var n=t.length,i=e.length;if("string"!=typeof e)return!1;if(e=e.toLowerCase(),t=t.toLowerCase(),n<i)return!1;if(i===n)return e===t;e:for(var o=0,a=0;o<i;o++){for(var r=e.charCodeAt(o);a<n;)if(t.charCodeAt(a++)===r)continue e;return!1}return!0},parse:{response:function(e,t){Array.isArray(e)&&((n={})[a.results]=e,e=n);var n=y.generateResults(e);y.verbose("Parsing server response",e),e!==R&&t!==R&&e[a.results]!==R&&(y.addResults(n),y.inject.id(e[a.results]),y.write.cache(t,{html:n,results:e[a.results]}),y.save.results(e[a.results]))}},cancel:{query:function(){y.can.useAPI()&&g.api("abort")}},has:{minimumCharacters:function(){return y.get.value().length>=u.minCharacters},results:function(){return 0!==r.length&&""!=r.html()}},clear:{cache:function(e){var t=g.data(l.cache);e?t&&t[e]&&(y.debug("Removing value from cache",e),delete t[e],g.data(l.cache,t)):(y.debug("Clearing cache",e),g.removeData(l.cache))}},read:{cache:function(e){var t=g.data(l.cache);return!!u.cache&&(y.verbose("Checking cache for generated html for query",e),"object"==typeof t&&t[e]!==R&&t[e])}},create:{categoryResults:function(e){var n={};return F.each(e,function(e,t){t.category&&(n[t.category]===R?(y.verbose("Creating new category of results",t.category),n[t.category]={name:t.category,results:[t]}):n[t.category].results.push(t))}),n},id:function(e,t){var n,e=e+1;return t!==R?(n=String.fromCharCode(97+t),y.verbose("Creating category result id",n=n+e)):y.verbose("Creating result id",n=e),n},results:function(){0===r.length&&(r=F("<div />").addClass(d.results).appendTo(g))}},inject:{result:function(e,t,n){y.verbose("Injecting result into results");t=(n!==R?r.children().eq(n).children(f.results).first():r).children(f.result).eq(t);y.verbose("Injecting results metadata",t),t.data(l.result,e)},id:function(e){y.debug("Injecting unique ids into results");var n=0,i=0;return"category"===u.type?F.each(e,function(e,t){0<t.results.length&&(i=0,F.each(t.results,function(e,t){t.id===R&&(t.id=y.create.id(i,n)),y.inject.result(t,i,n),i++}),n++)}):F.each(e,function(e,t){t.id===R&&(t.id=y.create.id(i)),y.inject.result(t,i),i++}),e}},save:{results:function(e){y.verbose("Saving current search results to metadata",e),g.data(l.results,e)}},write:{cache:function(e,t){var n=g.data(l.cache)!==R?g.data(l.cache):{};u.cache&&(y.verbose("Writing generated html to cache",e,t),n[e]=t,g.data(l.cache,n))}},addResults:function(e){if(F.isFunction(u.onResultsAdd)&&!1===u.onResultsAdd.call(r,e))return y.debug("onResultsAdd callback cancelled default action"),!1;e?(r.html(e),y.refreshResults(),u.selectFirstResult&&y.select.firstResult(),y.showResults()):y.hideResults(function(){r.empty()})},showResults:function(e){e=F.isFunction(e)?e:function(){},b||!y.is.visible()&&y.has.results()&&(y.can.transition()?(y.debug("Showing results with css animations"),r.transition({animation:u.transition+" in",debug:u.debug,verbose:u.verbose,duration:u.duration,onShow:function(){var e=g.find(f.result).eq(0);y.ensureVisible(e)},onComplete:function(){e()},queue:!0})):(y.debug("Showing results with javascript"),r.stop().fadeIn(u.duration,u.easing)),u.onResultsOpen.call(r))},hideResults:function(e){e=F.isFunction(e)?e:function(){},y.is.visible()&&(y.can.transition()?(y.debug("Hiding results with css animations"),r.transition({animation:u.transition+" out",debug:u.debug,verbose:u.verbose,duration:u.duration,onComplete:function(){e()},queue:!0})):(y.debug("Hiding results with javascript"),r.stop().fadeOut(u.duration,u.easing)),u.onResultsClose.call(r))},generateResults:function(e){y.debug("Generating html from response",e);var t=u.templates[u.type],n=F.isPlainObject(e[a.results])&&!F.isEmptyObject(e[a.results]),i=Array.isArray(e[a.results])&&0<e[a.results].length,o="";return n||i?(0<u.maxResults&&(n?"standard"==u.type&&y.error(m.maxResults):e[a.results]=e[a.results].slice(0,u.maxResults)),F.isFunction(t)?o=t(e,a,u.preserveHTML):y.error(m.noTemplate,!1)):u.showNoResults&&(o=y.displayMessage(m.noResults,"empty",m.noResultsHeader)),u.onResults.call(c,e),o},displayMessage:function(e,t,n){return y.debug("Displaying message",e,t=t||"standard",n),y.addResults(u.templates.message(e,t,n)),u.templates.message(e,t,n)},setting:function(e,t){if(F.isPlainObject(e))F.extend(!0,u,e);else{if(t===R)return u[e];u[e]=t}},internal:function(e,t){if(F.isPlainObject(e))F.extend(!0,y,e);else{if(t===R)return y[e];y[e]=t}},debug:function(){!u.silent&&u.debug&&(u.performance?y.performance.log(arguments):(y.debug=Function.prototype.bind.call(console.info,console,u.name+":"),y.debug.apply(console,arguments)))},verbose:function(){!u.silent&&u.verbose&&u.debug&&(u.performance?y.performance.log(arguments):(y.verbose=Function.prototype.bind.call(console.info,console,u.name+":"),y.verbose.apply(console,arguments)))},error:function(){u.silent||(y.error=Function.prototype.bind.call(console.error,console,u.name+":"),y.error.apply(console,arguments))},performance:{log:function(e){var t,n;u.performance&&(n=(t=(new Date).getTime())-(T||t),T=t,S.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:c,"Execution Time":n})),clearTimeout(y.performance.timer),y.performance.timer=setTimeout(y.performance.display,500)},display:function(){var e=u.name+":",n=0;T=!1,clearTimeout(y.performance.timer),F.each(S,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",k&&(e+=" '"+k+"'"),1<w.length&&(e+=" ("+w.length+")"),(console.group!==R||console.table!==R)&&0<S.length&&(console.groupCollapsed(e),console.table?console.table(S):F.each(S,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),S=[]}},invoke:function(i,e,t){var o,a,n,r=h;return e=e||E,t=c||t,"string"==typeof i&&r!==R&&(i=i.split(/[\. ]/),o=i.length-1,F.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(F.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==R)return a=r[n],!1;{if(!F.isPlainObject(r[t])||e==o)return r[t]!==R&&(a=r[t]),!1;r=r[t]}}})),F.isFunction(a)?n=a.apply(t,e):a!==R&&(n=a),Array.isArray(C)?C.push(n):C!==R?C=[C,n]:n!==R&&(C=n),a}};A?(h===R&&y.initialize(),y.invoke(D)):(h!==R&&h.invoke("destroy"),y.initialize())}),C!==R?C:this},F.fn.search.settings={name:"Search",namespace:"search",silent:!1,debug:!1,verbose:!1,performance:!0,type:"standard",minCharacters:1,selectFirstResult:!1,apiSettings:!1,source:!1,searchOnFocus:!0,searchFields:["id","title","description"],displayField:"",fullTextSearch:"exact",ignoreDiacritics:!1,automatic:!0,hideDelay:0,searchDelay:200,maxResults:7,cache:!0,showNoResults:!0,preserveHTML:!0,transition:"scale",duration:200,easing:"easeOutExpo",onSelect:!1,onResultsAdd:!1,onSearchQuery:function(e){},onResults:function(e){},onResultsOpen:function(){},onResultsClose:function(){},className:{animating:"animating",active:"active",empty:"empty",focus:"focus",hidden:"hidden",loading:"loading",results:"results",pressed:"down"},error:{source:"Cannot search. No source used, and Semantic API module was not included",noResultsHeader:"No Results",noResults:"Your search returned no results",logging:"Error in debug logging, exiting.",noEndpoint:"No search endpoint was specified",noTemplate:"A valid template name was not specified.",oldSearchSyntax:"searchFullText setting has been renamed fullTextSearch for consistency, please adjust your settings.",serverError:"There was an issue querying the server.",maxResults:"Results must be an array to use maxResults setting",method:"The method you called is not defined.",noNormalize:'"ignoreDiacritics" setting will be ignored. Browser does not support String().normalize(). You may consider including <https://cdn.jsdelivr.net/npm/unorm@1.4.1/lib/unorm.min.js> as a polyfill.'},metadata:{cache:"cache",results:"results",result:"result"},regExp:{escape:/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,beginsWith:"(?:s|^)"},fields:{categories:"results",categoryName:"name",categoryResults:"results",description:"description",image:"image",price:"price",results:"results",title:"title",url:"url",action:"action",actionText:"text",actionURL:"url"},selector:{prompt:".prompt",searchButton:".search.button",results:".results",message:".results > .message",category:".category",result:".result",title:".title, .name"},templates:{escape:function(e,t){if(t)return e;var n={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?(e=e.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;")).replace(/[<>"'`]/g,function(e){return n[e]}):e},message:function(e,t,n){var i="";return e!==R&&t!==R&&(i+='<div class="message '+t+'">',n&&(i+='<div class="header">'+n+"</div>"),i+=' <div class="description">'+e+"</div>",i+="</div>"),i},category:function(e,n,i){var o="",a=F.fn.search.settings.templates.escape;return e[n.categoryResults]!==R&&(F.each(e[n.categoryResults],function(e,t){t[n.results]!==R&&0<t.results.length&&(o+='<div class="category">',t[n.categoryName]!==R&&(o+='<div class="name">'+a(t[n.categoryName],i)+"</div>"),o+='<div class="results">',F.each(t.results,function(e,t){t[n.url]?o+='<a class="result" href="'+t[n.url].replace(/"/g,"")+'">':o+='<a class="result">',t[n.image]!==R&&(o+='<div class="image"> <img src="'+t[n.image].replace(/"/g,"")+'"></div>'),o+='<div class="content">',t[n.price]!==R&&(o+='<div class="price">'+a(t[n.price],i)+"</div>"),t[n.title]!==R&&(o+='<div class="title">'+a(t[n.title],i)+"</div>"),t[n.description]!==R&&(o+='<div class="description">'+a(t[n.description],i)+"</div>"),o+="</div>",o+="</a>"}),o+="</div>",o+="</div>")}),e[n.action]&&(!1===n.actionURL?o+='<div class="action">'+a(e[n.action][n.actionText],i)+"</div>":o+='<a href="'+e[n.action][n.actionURL].replace(/"/g,"")+'" class="action">'+a(e[n.action][n.actionText],i)+"</a>"),o)},standard:function(e,n,i){var o="",a=F.fn.search.settings.templates.escape;return e[n.results]!==R&&(F.each(e[n.results],function(e,t){t[n.url]?o+='<a class="result" href="'+t[n.url].replace(/"/g,"")+'">':o+='<a class="result">',t[n.image]!==R&&(o+='<div class="image"> <img src="'+t[n.image].replace(/"/g,"")+'"></div>'),o+='<div class="content">',t[n.price]!==R&&(o+='<div class="price">'+a(t[n.price],i)+"</div>"),t[n.title]!==R&&(o+='<div class="title">'+a(t[n.title],i)+"</div>"),t[n.description]!==R&&(o+='<div class="description">'+a(t[n.description],i)+"</div>"),o+="</div>",o+="</a>"}),e[n.action]&&(!1===n.actionURL?o+='<div class="action">'+a(e[n.action][n.actionText],i)+"</div>":o+='<a href="'+e[n.action][n.actionURL].replace(/"/g,"")+'" class="action">'+a(e[n.action][n.actionText],i)+"</a>"),o)}}}}(jQuery,window,document),function(D,e,A,E){"use strict";D.isFunction=D.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),D.fn.shape=function(v){var b,y=D(this),x=(new Date).getTime(),C=[],w=v,k="string"==typeof w,T=[].slice.call(arguments,1),S=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,0)};return y.each(function(){var n,i,t=y.selector||"",a=D.isPlainObject(v)?D.extend(!0,{},D.fn.shape.settings,v):D.extend({},D.fn.shape.settings),e=a.namespace,r=a.selector,o=a.error,s=a.className,l="."+e,c="module-"+e,u=D(this),d=u.find(">"+r.sides),f=d.find(">"+r.side),m=!1,g=this,p=u.data(c),h={initialize:function(){h.verbose("Initializing module for",g),h.set.defaultSide(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),p=h,u.data(c,p)},destroy:function(){h.verbose("Destroying previous module for",g),u.removeData(c).off(l)},refresh:function(){h.verbose("Refreshing selector cache for",g),u=D(g),d=D(this).find(r.sides),f=D(this).find(r.side)},repaint:function(){h.verbose("Forcing repaint event");(d[0]||A.createElement("div")).offsetWidth},animate:function(e,t){h.verbose("Animating box with properties",e),t=t||function(e){h.verbose("Executing animation callback"),e!==E&&e.stopPropagation(),h.reset(),h.set.active()},a.beforeChange.call(i[0]),h.get.transitionEvent()?(h.verbose("Starting CSS animation"),u.addClass(s.animating),d.css(e).one(h.get.transitionEvent(),t),h.set.duration(a.duration),S(function(){u.addClass(s.animating),n.addClass(s.hidden)})):t()},queue:function(e){h.debug("Queueing animation of",e),d.one(h.get.transitionEvent(),function(){h.debug("Executing queued animation"),setTimeout(function(){u.shape(e)},0)})},reset:function(){h.verbose("Animating states reset"),u.removeClass(s.animating).attr("style","").removeAttr("style"),d.attr("style","").removeAttr("style"),f.attr("style","").removeAttr("style").removeClass(s.hidden),i.removeClass(s.animating).attr("style","").removeAttr("style")},is:{complete:function(){return f.filter("."+s.active)[0]==i[0]},animating:function(){return u.hasClass(s.animating)},hidden:function(){return 0<u.closest(":hidden").length}},set:{defaultSide:function(){n=f.filter("."+a.className.active),i=0<n.next(r.side).length?n.next(r.side):f.first(),m=!1,h.verbose("Active side set to",n),h.verbose("Next side set to",i)},duration:function(e){e=e||a.duration,h.verbose("Setting animation duration",e="number"==typeof e?e+"ms":e),!a.duration&&0!==a.duration||d.add(f).css({"-webkit-transition-duration":e,"-moz-transition-duration":e,"-ms-transition-duration":e,"-o-transition-duration":e,"transition-duration":e})},currentStageSize:function(){var e=f.filter("."+a.className.active),t=e.outerWidth(!0),e=e.outerHeight(!0);u.css({width:t,height:e})},stageSize:function(){var e=u.clone().addClass(s.loading),t=e.find(">"+r.sides+">"+r.side),n=t.filter("."+a.className.active),i=m?t.eq(m):0<n.next(r.side).length?n.next(r.side):t.first(),o="next"===a.width?i.outerWidth(!0):"initial"===a.width?u.width():a.width,t="next"===a.height?i.outerHeight(!0):"initial"===a.height?u.height():a.height;n.removeClass(s.active),i.addClass(s.active),e.insertAfter(u),e.remove(),"auto"!==a.width&&(u.css("width",o+a.jitter),h.verbose("Specifying width during animation",o)),"auto"!==a.height&&(u.css("height",t+a.jitter),h.verbose("Specifying height during animation",t))},nextSide:function(e){m=e,i=f.filter(e),m=f.index(i),0===i.length&&(h.set.defaultSide(),h.error(o.side)),h.verbose("Next side manually set to",i)},active:function(){h.verbose("Setting new side to active",i),f.removeClass(s.active),i.addClass(s.active),a.onChange.call(i[0]),h.set.defaultSide()}},flip:{to:function(e,t){var n;h.is.hidden()?h.debug("Module not visible",i):!h.is.complete()||h.is.animating()||a.allowRepeats?(n=h.get.transform[e](),h.is.animating()?h.queue("flip "+e):(h.debug("Flipping "+e,i),h.set.stageSize(),h.stage[t](),h.animate(n))):h.debug("Side already visible",i)},up:function(){h.flip.to("up","above")},down:function(){h.flip.to("down","below")},left:function(){h.flip.to("left","left")},right:function(){h.flip.to("right","right")},over:function(){h.flip.to("over","behind")},back:function(){h.flip.to("back","behind")}},get:{transform:{up:function(){var e=n.outerHeight(!0)/2;return{transform:"translateY("+(i.outerHeight(!0)-e)+"px) translateZ(-"+e+"px) rotateX(-90deg)"}},down:function(){var e=n.outerHeight(!0)/2;return{transform:"translateY(-"+e+"px) translateZ(-"+e+"px) rotateX(90deg)"}},left:function(){var e=n.outerWidth(!0)/2;return{transform:"translateX("+(i.outerWidth(!0)-e)+"px) translateZ(-"+e+"px) rotateY(90deg)"}},right:function(){var e=n.outerWidth(!0)/2;return{transform:"translateX(-"+e+"px) translateZ(-"+e+"px) rotateY(-90deg)"}},over:function(){return{transform:"translateX("+-(n.outerWidth(!0)-i.outerWidth(!0))/2+"px) rotateY(180deg)"}},back:function(){return{transform:"translateX("+-(n.outerWidth(!0)-i.outerWidth(!0))/2+"px) rotateY(-180deg)"}}},transitionEvent:function(){var e,t=A.createElement("element"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in n)if(t.style[e]!==E)return n[e]},nextSide:function(){return 0<n.next(r.side).length?n.next(r.side):f.first()}},stage:{above:function(){var e={origin:(n.outerHeight(!0)-i.outerHeight(!0))/2,depth:{active:i.outerHeight(!0)/2,next:n.outerHeight(!0)/2}};h.verbose("Setting the initial animation position as above",i,e),n.css({transform:"rotateX(0deg)"}),i.addClass(s.animating).css({top:e.origin+"px",transform:"rotateX(90deg) translateZ("+e.depth.next+"px) translateY(-"+e.depth.active+"px)"})},below:function(){var e={origin:(n.outerHeight(!0)-i.outerHeight(!0))/2,depth:{active:i.outerHeight(!0)/2,next:n.outerHeight(!0)/2}};h.verbose("Setting the initial animation position as below",i,e),n.css({transform:"rotateX(0deg)"}),i.addClass(s.animating).css({top:e.origin+"px",transform:"rotateX(-90deg) translateZ("+e.depth.next+"px) translateY("+e.depth.active+"px)"})},left:function(){var e=n.outerWidth(!0),t=i.outerWidth(!0),e={origin:(e-t)/2,depth:{active:t/2,next:e/2}};h.verbose("Setting the initial animation position as left",i,e),n.css({transform:"rotateY(0deg)"}),i.addClass(s.animating).css({left:e.origin+"px",transform:"rotateY(-90deg) translateZ("+e.depth.next+"px) translateX(-"+e.depth.active+"px)"})},right:function(){var e=n.outerWidth(!0),t=i.outerWidth(!0),e={origin:(e-t)/2,depth:{active:t/2,next:e/2}};h.verbose("Setting the initial animation position as right",i,e),n.css({transform:"rotateY(0deg)"}),i.addClass(s.animating).css({left:e.origin+"px",transform:"rotateY(90deg) translateZ("+e.depth.next+"px) translateX("+e.depth.active+"px)"})},behind:function(){var e=n.outerWidth(!0),t=i.outerWidth(!0),e={origin:(e-t)/2,depth:{active:t/2,next:e/2}};h.verbose("Setting the initial animation position as behind",i,e),n.css({transform:"rotateY(0deg)"}),i.addClass(s.animating).css({left:e.origin+"px",transform:"rotateY(-180deg)"})}},setting:function(e,t){if(h.debug("Changing setting",e,t),D.isPlainObject(e))D.extend(!0,a,e);else{if(t===E)return a[e];D.isPlainObject(a[e])?D.extend(!0,a[e],t):a[e]=t}},internal:function(e,t){if(D.isPlainObject(e))D.extend(!0,h,e);else{if(t===E)return h[e];h[e]=t}},debug:function(){!a.silent&&a.debug&&(a.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,a.name+":"),h.debug.apply(console,arguments)))},verbose:function(){!a.silent&&a.verbose&&a.debug&&(a.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,a.name+":"),h.verbose.apply(console,arguments)))},error:function(){a.silent||(h.error=Function.prototype.bind.call(console.error,console,a.name+":"),h.error.apply(console,arguments))},performance:{log:function(e){var t,n;a.performance&&(n=(t=(new Date).getTime())-(x||t),x=t,C.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:g,"Execution Time":n})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,500)},display:function(){var e=a.name+":",n=0;x=!1,clearTimeout(h.performance.timer),D.each(C,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",t&&(e+=" '"+t+"'"),1<y.length&&(e+=" ("+y.length+")"),(console.group!==E||console.table!==E)&&0<C.length&&(console.groupCollapsed(e),console.table?console.table(C):D.each(C,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),C=[]}},invoke:function(i,e,t){var o,a,n,r=p;return e=e||T,t=g||t,"string"==typeof i&&r!==E&&(i=i.split(/[\. ]/),o=i.length-1,D.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(D.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==E)return a=r[n],!1;{if(!D.isPlainObject(r[t])||e==o)return r[t]!==E&&(a=r[t]),!1;r=r[t]}}})),D.isFunction(a)?n=a.apply(t,e):a!==E&&(n=a),Array.isArray(b)?b.push(n):b!==E?b=[b,n]:n!==E&&(b=n),a}};k?(p===E&&h.initialize(),0<(e=u.find("input")).length?(e.blur(),setTimeout(function(){h.invoke(w)},150)):h.invoke(w)):(p!==E&&p.invoke("destroy"),h.initialize())}),b!==E?b:this},D.fn.shape.settings={name:"Shape",silent:!1,debug:!1,verbose:!1,jitter:0,performance:!0,namespace:"shape",width:"initial",height:"initial",beforeChange:function(){},onChange:function(){},allowRepeats:!1,duration:!1,error:{side:"You tried to switch to a side that does not exist.",method:"The method you called is not defined"},className:{animating:"animating",hidden:"hidden",loading:"loading",active:"active"},selector:{sides:".sides",side:".side"}}}(jQuery,window,document),function(M,I,j,L){"use strict";M.isFunction=M.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},I=void 0!==I&&I.Math==Math?I:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),M.fn.sidebar=function(x){var C,e=M(this),w=M(I),k=M(j),T=M("html"),S=M("head"),D=e.selector||"",A=(new Date).getTime(),E=[],F=x,P="string"==typeof F,O=[].slice.call(arguments,1),R=I.requestAnimationFrame||I.mozRequestAnimationFrame||I.webkitRequestAnimationFrame||I.msRequestAnimationFrame||function(e){setTimeout(e,0)};return e.each(function(){var o,a,e,t,r,s=M.isPlainObject(x)?M.extend(!0,{},M.fn.sidebar.settings,x):M.extend({},M.fn.sidebar.settings),n=s.selector,l=s.className,i=s.namespace,c=s.regExp,u=s.error,d="."+i,f="module-"+i,m=M(this),g=M(s.context),p=m.children(n.sidebar),h=(g.children(n.fixed),g.children(n.pusher)),v=this,b=m.data(f),y={initialize:function(){y.debug("Initializing sidebar",x),y.create.id(),r=y.get.transitionEvent(),s.delaySetup?R(y.setup.layout):y.setup.layout(),R(function(){y.setup.cache()}),y.instantiate()},instantiate:function(){y.verbose("Storing instance of module",y),b=y,m.data(f,y)},create:{id:function(){e=(Math.random().toString(16)+"000000000").substr(2,8),a="."+e,y.verbose("Creating unique id for element",e)}},destroy:function(){y.verbose("Destroying previous module for",m),m.off(d).removeData(f),y.is.ios()&&y.remove.ios(),g.off(a),w.off(a),k.off(a)},event:{clickaway:function(e){var t;s.closable&&(t=0<h.find(e.target).length||h.is(e.target),e=g.is(e.target),t&&(y.verbose("User clicked on dimmed page"),y.hide()),e&&(y.verbose("User clicked on dimmable context (scaled out page)"),y.hide()))},touch:function(e){},containScroll:function(e){v.scrollTop<=0&&(v.scrollTop=1),v.scrollTop+v.offsetHeight>=v.scrollHeight&&(v.scrollTop=v.scrollHeight-v.offsetHeight-1)},scroll:function(e){0===M(e.target).closest(n.sidebar).length&&e.preventDefault()}},bind:{clickaway:function(){y.verbose("Adding clickaway events to context",g),g.on("click"+a,y.event.clickaway).on("touchend"+a,y.event.clickaway)},scrollLock:function(){s.scrollLock&&(y.debug("Disabling page scroll"),w.on("DOMMouseScroll"+a,y.event.scroll)),y.verbose("Adding events to contain sidebar scroll"),k.on("touchmove"+a,y.event.touch),m.on("scroll"+d,y.event.containScroll)}},unbind:{clickaway:function(){y.verbose("Removing clickaway events from context",g),g.off(a)},scrollLock:function(){y.verbose("Removing scroll lock from page"),k.off(a),w.off(a),m.off("scroll"+d)}},add:{inlineCSS:function(){var e=y.cache.width||m.outerWidth(),t=y.cache.height||m.outerHeight(),n=y.is.rtl(),i=y.get.direction(),t={left:e,right:-e,top:t,bottom:-t};n&&(y.verbose("RTL detected, flipping widths"),t.left=-e,t.right=e),n="<style>","left"===i||"right"===i?(y.debug("Adding CSS rules for animation distance",e),n+=" .ui.visible."+i+".sidebar ~ .fixed, .ui.visible."+i+".sidebar ~ .pusher {   -webkit-transform: translate3d("+t[i]+"px, 0, 0);           transform: translate3d("+t[i]+"px, 0, 0); }"):"top"!==i&&"bottom"!=i||(n+=" .ui.visible."+i+".sidebar ~ .fixed, .ui.visible."+i+".sidebar ~ .pusher {   -webkit-transform: translate3d(0, "+t[i]+"px, 0);           transform: translate3d(0, "+t[i]+"px, 0); }"),y.is.ie()&&("left"===i||"right"===i?(y.debug("Adding CSS rules for animation distance",e),n+=" body.pushable > .ui.visible."+i+".sidebar ~ .pusher:after {   -webkit-transform: translate3d("+t[i]+"px, 0, 0);           transform: translate3d("+t[i]+"px, 0, 0); }"):"top"!==i&&"bottom"!=i||(n+=" body.pushable > .ui.visible."+i+".sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, "+t[i]+"px, 0);           transform: translate3d(0, "+t[i]+"px, 0); }"),n+=" body.pushable > .ui.visible.left.sidebar ~ .ui.visible.right.sidebar ~ .pusher:after, body.pushable > .ui.visible.right.sidebar ~ .ui.visible.left.sidebar ~ .pusher:after {   -webkit-transform: translate3d(0, 0, 0);           transform: translate3d(0, 0, 0); }"),o=M(n+="</style>").appendTo(S),y.debug("Adding sizing css to head",o)}},refresh:function(){y.verbose("Refreshing selector cache"),g=M(s.context),p=g.children(n.sidebar),h=g.children(n.pusher),g.children(n.fixed),y.clear.cache()},refreshSidebars:function(){y.verbose("Refreshing other sidebars"),p=g.children(n.sidebar)},repaint:function(){y.verbose("Forcing repaint event"),v.style.display="none";v.offsetHeight;v.scrollTop=v.scrollTop,v.style.display=""},setup:{cache:function(){y.cache={width:m.outerWidth(),height:m.outerHeight()}},layout:function(){0===g.children(n.pusher).length&&(y.debug("Adding wrapper element for sidebar"),y.error(u.pusher),h=M('<div class="pusher" />'),g.children().not(n.omitted).not(p).wrapAll(h),y.refresh()),0!==m.nextAll(n.pusher).length&&m.nextAll(n.pusher)[0]===h[0]||(y.debug("Moved sidebar to correct parent element"),y.error(u.movedSidebar,v),m.detach().prependTo(g),y.refresh()),y.clear.cache(),y.set.pushable(),y.set.direction()}},attachEvents:function(e,t){var n=M(e);t=M.isFunction(y[t])?y[t]:y.toggle,0<n.length?(y.debug("Attaching sidebar events to element",e,t),n.on("click"+d,t)):y.error(u.notFound,e)},show:function(e){if(e=M.isFunction(e)?e:function(){},y.is.hidden()){if(y.refreshSidebars(),s.overlay&&(y.error(u.overlay),s.transition="overlay"),y.refresh(),y.othersActive())if(y.debug("Other sidebars currently visible"),s.exclusive){if("overlay"!=s.transition)return void y.hideOthers(y.show);y.hideOthers()}else s.transition="overlay";y.pushPage(function(){e.call(v),s.onShow.call(v)}),s.onChange.call(v),s.onVisible.call(v)}else y.debug("Sidebar is already visible")},hide:function(e){e=M.isFunction(e)?e:function(){},(y.is.visible()||y.is.animating())&&(y.debug("Hiding sidebar",e),y.refreshSidebars(),y.pullPage(function(){e.call(v),s.onHidden.call(v)}),s.onChange.call(v),s.onHide.call(v))},othersAnimating:function(){return 0<p.not(m).filter("."+l.animating).length},othersVisible:function(){return 0<p.not(m).filter("."+l.visible).length},othersActive:function(){return y.othersVisible()||y.othersAnimating()},hideOthers:function(e){var t=p.not(m).filter("."+l.visible),n=t.length,i=0;e=e||function(){},t.sidebar("hide",function(){++i==n&&e()})},toggle:function(){y.verbose("Determining toggled direction"),y.is.hidden()?y.show():y.hide()},pushPage:function(t){var e,n,i=y.get.transition(),o="overlay"===i||y.othersActive()?m:h;t=M.isFunction(t)?t:function(){},"scale down"==s.transition&&y.scrollToTop(),y.set.transition(i),y.repaint(),e=function(){y.bind.clickaway(),y.add.inlineCSS(),y.set.animating(),y.set.visible()},i=function(){y.set.dimmed()},n=function(e){e.target==o[0]&&(o.off(r+a,n),y.remove.animating(),y.bind.scrollLock(),t.call(v))},o.off(r+a),o.on(r+a,n),R(e),s.dimPage&&!y.othersVisible()&&R(i)},pullPage:function(t){var e,n,i=y.get.transition(),o="overlay"==i||y.othersActive()?m:h;t=M.isFunction(t)?t:function(){},y.verbose("Removing context push state",y.get.direction()),y.unbind.clickaway(),y.unbind.scrollLock(),e=function(){y.set.transition(i),y.set.animating(),y.remove.visible(),s.dimPage&&!y.othersVisible()&&h.removeClass(l.dimmed)},n=function(e){e.target==o[0]&&(o.off(r+a,n),y.remove.animating(),y.remove.transition(),y.remove.inlineCSS(),("scale down"==i||s.returnScroll&&y.is.mobile())&&y.scrollBack(),t.call(v))},o.off(r+a),o.on(r+a,n),R(e)},scrollToTop:function(){y.verbose("Scrolling to top of page to avoid animation issues"),t=M(I).scrollTop(),m.scrollTop(0),I.scrollTo(0,0)},scrollBack:function(){y.verbose("Scrolling back to original page position"),I.scrollTo(0,t)},clear:{cache:function(){y.verbose("Clearing cached dimensions"),y.cache={}}},set:{ios:function(){T.addClass(l.ios)},pushed:function(){g.addClass(l.pushed)},pushable:function(){g.addClass(l.pushable)},dimmed:function(){h.addClass(l.dimmed)},active:function(){m.addClass(l.active)},animating:function(){m.addClass(l.animating)},transition:function(e){e=e||y.get.transition(),m.addClass(e)},direction:function(e){e=e||y.get.direction(),m.addClass(l[e])},visible:function(){m.addClass(l.visible)},overlay:function(){m.addClass(l.overlay)}},remove:{inlineCSS:function(){y.debug("Removing inline css styles",o),o&&0<o.length&&o.remove()},ios:function(){T.removeClass(l.ios)},pushed:function(){g.removeClass(l.pushed)},pushable:function(){g.removeClass(l.pushable)},active:function(){m.removeClass(l.active)},animating:function(){m.removeClass(l.animating)},transition:function(e){e=e||y.get.transition(),m.removeClass(e)},direction:function(e){e=e||y.get.direction(),m.removeClass(l[e])},visible:function(){m.removeClass(l.visible)},overlay:function(){m.removeClass(l.overlay)}},get:{direction:function(){return m.hasClass(l.top)?l.top:m.hasClass(l.right)?l.right:m.hasClass(l.bottom)?l.bottom:l.left},transition:function(){var e=y.get.direction(),e=y.is.mobile()?"auto"==s.mobileTransition?s.defaultTransition.mobile[e]:s.mobileTransition:"auto"==s.transition?s.defaultTransition.computer[e]:s.transition;return y.verbose("Determined transition",e),e},transitionEvent:function(){var e,t=j.createElement("element"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in n)if(t.style[e]!==L)return n[e]}},is:{ie:function(){var e=!I.ActiveXObject&&"ActiveXObject"in I,t="ActiveXObject"in I;return e||t},ios:function(){var e=navigator.userAgent,t=e.match(c.ios),n=e.match(c.mobileChrome);return!(!t||n)&&(y.verbose("Browser was found to be iOS",e),!0)},mobile:function(){var e=navigator.userAgent;return e.match(c.mobile)?(y.verbose("Browser was found to be mobile",e),!0):(y.verbose("Browser is not mobile, using regular transition",e),!1)},hidden:function(){return!y.is.visible()},visible:function(){return m.hasClass(l.visible)},open:function(){return y.is.visible()},closed:function(){return y.is.hidden()},vertical:function(){return m.hasClass(l.top)},animating:function(){return g.hasClass(l.animating)},rtl:function(){return y.cache.rtl===L&&(y.cache.rtl="rtl"===m.attr("dir")||"rtl"===m.css("direction")),y.cache.rtl}},setting:function(e,t){if(y.debug("Changing setting",e,t),M.isPlainObject(e))M.extend(!0,s,e);else{if(t===L)return s[e];M.isPlainObject(s[e])?M.extend(!0,s[e],t):s[e]=t}},internal:function(e,t){if(M.isPlainObject(e))M.extend(!0,y,e);else{if(t===L)return y[e];y[e]=t}},debug:function(){!s.silent&&s.debug&&(s.performance?y.performance.log(arguments):(y.debug=Function.prototype.bind.call(console.info,console,s.name+":"),y.debug.apply(console,arguments)))},verbose:function(){!s.silent&&s.verbose&&s.debug&&(s.performance?y.performance.log(arguments):(y.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),y.verbose.apply(console,arguments)))},error:function(){s.silent||(y.error=Function.prototype.bind.call(console.error,console,s.name+":"),y.error.apply(console,arguments))},performance:{log:function(e){var t,n;s.performance&&(n=(t=(new Date).getTime())-(A||t),A=t,E.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:v,"Execution Time":n})),clearTimeout(y.performance.timer),y.performance.timer=setTimeout(y.performance.display,500)},display:function(){var e=s.name+":",n=0;A=!1,clearTimeout(y.performance.timer),M.each(E,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",D&&(e+=" '"+D+"'"),(console.group!==L||console.table!==L)&&0<E.length&&(console.groupCollapsed(e),console.table?console.table(E):M.each(E,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),E=[]}},invoke:function(i,e,t){var o,a,n,r=b;return e=e||O,t=v||t,"string"==typeof i&&r!==L&&(i=i.split(/[\. ]/),o=i.length-1,M.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(M.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==L)return a=r[n],!1;{if(!M.isPlainObject(r[t])||e==o)return r[t]!==L?a=r[t]:y.error(u.method,i),!1;r=r[t]}}})),M.isFunction(a)?n=a.apply(t,e):a!==L&&(n=a),Array.isArray(C)?C.push(n):C!==L?C=[C,n]:n!==L&&(C=n),a}};P?(b===L&&y.initialize(),y.invoke(F)):(b!==L&&y.invoke("destroy"),y.initialize())}),C!==L?C:this},M.fn.sidebar.settings={name:"Sidebar",namespace:"sidebar",silent:!1,debug:!1,verbose:!1,performance:!0,transition:"auto",mobileTransition:"auto",defaultTransition:{computer:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"},mobile:{left:"uncover",right:"uncover",top:"overlay",bottom:"overlay"}},context:"body",exclusive:!1,closable:!0,dimPage:!0,scrollLock:!1,returnScroll:!1,delaySetup:!1,duration:500,onChange:function(){},onShow:function(){},onHide:function(){},onHidden:function(){},onVisible:function(){},className:{active:"active",animating:"animating",dimmed:"dimmed",ios:"ios",pushable:"pushable",pushed:"pushed",right:"right",top:"top",left:"left",bottom:"bottom",visible:"visible"},selector:{fixed:".fixed",omitted:"script, link, style, .ui.modal, .ui.dimmer, .ui.nag, .ui.fixed",pusher:".pusher",sidebar:".ui.sidebar"},regExp:{ios:/(iPad|iPhone|iPod)/g,mobileChrome:/(CriOS)/g,mobile:/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g},error:{method:"The method you called is not defined.",pusher:"Had to add pusher element. For optimal performance make sure body content is inside a pusher element",movedSidebar:"Had to move sidebar. For optimal performance make sure sidebar and pusher are direct children of your body tag",overlay:"The overlay setting is no longer supported, use animation: overlay",notFound:"There were no elements that matched the specified selector"}}}(jQuery,window,document),function(S,D,A,E){"use strict";S.isFunction=S.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},D=void 0!==D&&D.Math==Math?D:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),S.fn.sticky=function(v){var b,e=S(this),y=e.selector||"",x=(new Date).getTime(),C=[],w=v,k="string"==typeof w,T=[].slice.call(arguments,1);return e.each(function(){var t,i,e,n,l=S.isPlainObject(v)?S.extend(!0,{},S.fn.sticky.settings,v):S.extend({},S.fn.sticky.settings),o=l.className,a=l.namespace,r=l.error,s="."+a,c="module-"+a,u=S(this),d=S(D),f=S(l.scrollContext),m=u.data(c),g=D.requestAnimationFrame||D.mozRequestAnimationFrame||D.webkitRequestAnimationFrame||D.msRequestAnimationFrame||function(e){setTimeout(e,0)},p=this,h={initialize:function(){h.determineContainer(),h.determineContext(),h.verbose("Initializing sticky",l,t),h.save.positions(),h.checkErrors(),h.bind.events(),l.observeChanges&&h.observeChanges(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),m=h,u.data(c,h)},destroy:function(){h.verbose("Destroying previous instance"),h.reset(),e&&e.disconnect(),n&&n.disconnect(),d.off("load"+s,h.event.load).off("resize"+s,h.event.resize),f.off("scrollchange"+s,h.event.scrollchange),u.removeData(c)},observeChanges:function(){"MutationObserver"in D&&(e=new MutationObserver(h.event.documentChanged),n=new MutationObserver(h.event.changed),e.observe(A,{childList:!0,subtree:!0}),n.observe(p,{childList:!0,subtree:!0}),n.observe(i[0],{childList:!0,subtree:!0}),h.debug("Setting up mutation observer",n))},determineContainer:function(){t=l.container?S(l.container):u.offsetParent()},determineContext:function(){0===(i=l.context?S(l.context):t).length&&h.error(r.invalidContext,l.context,u)},checkErrors:function(){h.is.hidden()&&h.error(r.visible,u),h.cache.element.height>h.cache.context.height&&(h.reset(),h.error(r.elementSize,u))},bind:{events:function(){d.on("load"+s,h.event.load).on("resize"+s,h.event.resize),f.off("scroll"+s).on("scroll"+s,h.event.scroll).on("scrollchange"+s,h.event.scrollchange)}},event:{changed:function(e){clearTimeout(h.timer),h.timer=setTimeout(function(){h.verbose("DOM tree modified, updating sticky menu",e),h.refresh()},100)},documentChanged:function(e){[].forEach.call(e,function(e){e.removedNodes&&[].forEach.call(e.removedNodes,function(e){(e==p||0<S(e).find(p).length)&&(h.debug("Element removed from DOM, tearing down events"),h.destroy())})})},load:function(){h.verbose("Page contents finished loading"),g(h.refresh)},resize:function(){h.verbose("Window resized"),g(h.refresh)},scroll:function(){g(function(){f.triggerHandler("scrollchange"+s,f.scrollTop())})},scrollchange:function(e,t){h.stick(t),l.onScroll.call(p)}},refresh:function(e){h.reset(),l.context||h.determineContext(),e&&h.determineContainer(),h.save.positions(),h.stick(),l.onReposition.call(p)},supports:{sticky:function(){var e=S("<div/>");return e.addClass(o.supported),e.css("position").match("sticky")}},save:{lastScroll:function(e){h.lastScroll=e},elementScroll:function(e){h.elementScroll=e},positions:function(){var e={height:f.height()},t={margin:{top:parseInt(u.css("margin-top"),10),bottom:parseInt(u.css("margin-bottom"),10)},offset:u.offset(),width:u.outerWidth(),height:u.outerHeight()},n={offset:i.offset(),height:i.outerHeight()};h.is.standardScroll()||(h.debug("Non-standard scroll. Removing scroll offset from element offset"),e.top=f.scrollTop(),e.left=f.scrollLeft(),t.offset.top+=e.top,n.offset.top+=e.top,t.offset.left+=e.left,n.offset.left+=e.left),h.cache={fits:t.height+l.offset<=e.height,sameHeight:t.height==n.height,scrollContext:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:n.offset.top,height:n.height,bottom:n.offset.top+n.height}},h.set.containerSize(),h.stick(),h.debug("Caching element positions",h.cache)}},get:{direction:function(e){var t="down";return e=e||f.scrollTop(),h.lastScroll!==E&&(h.lastScroll<e?t="down":h.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||f.scrollTop(),h.lastScroll?e-h.lastScroll:0},currentElementScroll:function(){return h.elementScroll||(h.is.top()?Math.abs(parseInt(u.css("top"),10))||0:Math.abs(parseInt(u.css("bottom"),10))||0)},elementScroll:function(e){e=e||f.scrollTop();var t=h.cache.element,n=h.cache.scrollContext,e=h.get.scrollChange(e),t=t.height-n.height+l.offset,n=h.get.currentElementScroll(),e=n+e;return n=h.cache.fits||e<0?0:t<e?t:e}},remove:{lastScroll:function(){delete h.lastScroll},elementScroll:function(e){delete h.elementScroll},minimumSize:function(){t.css("min-height","")},offset:function(){u.css("margin-top","")}},set:{offset:function(){h.verbose("Setting offset on element",l.offset),u.css("margin-top",l.offset)},containerSize:function(){var e=t.get(0).tagName;"HTML"===e||"body"==e?h.determineContainer():Math.abs(t.outerHeight()-h.cache.context.height)>l.jitter&&(h.debug("Context has padding, specifying exact height for container",h.cache.context.height),t.css({height:h.cache.context.height}))},minimumSize:function(){var e=h.cache.element;t.css("min-height",e.height)},scroll:function(e){h.debug("Setting scroll on element",e),h.elementScroll!=e&&(h.is.top()&&u.css("bottom","").css("top",-e),h.is.bottom()&&u.css("top","").css("bottom",e))},size:function(){0!==h.cache.element.height&&0!==h.cache.element.width&&(p.style.setProperty("width",h.cache.element.width+"px","important"),p.style.setProperty("height",h.cache.element.height+"px","important"))}},is:{standardScroll:function(){return f[0]==D},top:function(){return u.hasClass(o.top)},bottom:function(){return u.hasClass(o.bottom)},initialPosition:function(){return!h.is.fixed()&&!h.is.bound()},hidden:function(){return!u.is(":visible")},bound:function(){return u.hasClass(o.bound)},fixed:function(){return u.hasClass(o.fixed)}},stick:function(e){var t=e||f.scrollTop(),n=h.cache,i=n.fits,o=n.sameHeight,a=n.element,r=n.scrollContext,s=n.context,n=h.is.bottom()&&l.pushing?l.bottomOffset:l.offset,e={top:t+n,bottom:t+n+r.height},r=i?0:h.get.elementScroll(e.top),i=!i;0===a.height||o||(h.is.initialPosition()?e.top>=s.bottom?(h.debug("Initial element position is bottom of container"),h.bindBottom()):e.top>a.top&&(a.height+e.top-r>=s.bottom?(h.debug("Initial element position is bottom of container"),h.bindBottom()):(h.debug("Initial element position is fixed"),h.fixTop())):h.is.fixed()?h.is.top()?e.top<=a.top?(h.debug("Fixed element reached top of container"),h.setInitialPosition()):a.height+e.top-r>=s.bottom?(h.debug("Fixed element reached bottom of container"),h.bindBottom()):i&&(h.set.scroll(r),h.save.lastScroll(e.top),h.save.elementScroll(r)):h.is.bottom()&&(e.bottom-a.height<=a.top?(h.debug("Bottom fixed rail has reached top of container"),h.setInitialPosition()):e.bottom>=s.bottom?(h.debug("Bottom fixed rail has reached bottom of container"),h.bindBottom()):i&&(h.set.scroll(r),h.save.lastScroll(e.top),h.save.elementScroll(r))):h.is.bottom()&&(e.top<=a.top?(h.debug("Jumped from bottom fixed to top fixed, most likely used home/end button"),h.setInitialPosition()):l.pushing?h.is.bound()&&e.bottom<=s.bottom&&(h.debug("Fixing bottom attached element to bottom of browser."),h.fixBottom()):h.is.bound()&&e.top<=s.bottom-a.height&&(h.debug("Fixing bottom attached element to top of browser."),h.fixTop())))},bindTop:function(){h.debug("Binding element to top of parent container"),h.remove.offset(),u.css({left:"",top:"",marginBottom:""}).removeClass(o.fixed).removeClass(o.bottom).addClass(o.bound).addClass(o.top),l.onTop.call(p),l.onUnstick.call(p)},bindBottom:function(){h.debug("Binding element to bottom of parent container"),h.remove.offset(),u.css({left:"",top:""}).removeClass(o.fixed).removeClass(o.top).addClass(o.bound).addClass(o.bottom),l.onBottom.call(p),l.onUnstick.call(p)},setInitialPosition:function(){h.debug("Returning to initial position"),h.unfix(),h.unbind()},fixTop:function(){h.debug("Fixing element to top of page"),l.setSize&&h.set.size(),h.set.minimumSize(),h.set.offset(),u.css({left:h.cache.element.left,bottom:"",marginBottom:""}).removeClass(o.bound).removeClass(o.bottom).addClass(o.fixed).addClass(o.top),l.onStick.call(p)},fixBottom:function(){h.debug("Sticking element to bottom of page"),l.setSize&&h.set.size(),h.set.minimumSize(),h.set.offset(),u.css({left:h.cache.element.left,bottom:"",marginBottom:""}).removeClass(o.bound).removeClass(o.top).addClass(o.fixed).addClass(o.bottom),l.onStick.call(p)},unbind:function(){h.is.bound()&&(h.debug("Removing container bound position on element"),h.remove.offset(),u.removeClass(o.bound).removeClass(o.top).removeClass(o.bottom))},unfix:function(){h.is.fixed()&&(h.debug("Removing fixed position on element"),h.remove.minimumSize(),h.remove.offset(),u.removeClass(o.fixed).removeClass(o.top).removeClass(o.bottom),l.onUnstick.call(p))},reset:function(){h.debug("Resetting elements position"),h.unbind(),h.unfix(),h.resetCSS(),h.remove.offset(),h.remove.lastScroll()},resetCSS:function(){u.css({width:"",height:""}),t.css({height:""})},setting:function(e,t){if(S.isPlainObject(e))S.extend(!0,l,e);else{if(t===E)return l[e];l[e]=t}},internal:function(e,t){if(S.isPlainObject(e))S.extend(!0,h,e);else{if(t===E)return h[e];h[e]=t}},debug:function(){!l.silent&&l.debug&&(l.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,l.name+":"),h.debug.apply(console,arguments)))},verbose:function(){!l.silent&&l.verbose&&l.debug&&(l.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,l.name+":"),h.verbose.apply(console,arguments)))},error:function(){l.silent||(h.error=Function.prototype.bind.call(console.error,console,l.name+":"),h.error.apply(console,arguments))},performance:{log:function(e){var t,n;l.performance&&(n=(t=(new Date).getTime())-(x||t),x=t,C.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:p,"Execution Time":n})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,0)},display:function(){var e=l.name+":",n=0;x=!1,clearTimeout(h.performance.timer),S.each(C,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",y&&(e+=" '"+y+"'"),(console.group!==E||console.table!==E)&&0<C.length&&(console.groupCollapsed(e),console.table?console.table(C):S.each(C,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),C=[]}},invoke:function(i,e,t){var o,a,n,r=m;return e=e||T,t=p||t,"string"==typeof i&&r!==E&&(i=i.split(/[\. ]/),o=i.length-1,S.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(S.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==E)return a=r[n],!1;{if(!S.isPlainObject(r[t])||e==o)return r[t]!==E&&(a=r[t]),!1;r=r[t]}}})),S.isFunction(a)?n=a.apply(t,e):a!==E&&(n=a),Array.isArray(b)?b.push(n):b!==E?b=[b,n]:n!==E&&(b=n),a}};k?(m===E&&h.initialize(),h.invoke(w)):(m!==E&&m.invoke("destroy"),h.initialize())}),b!==E?b:this},S.fn.sticky.settings={name:"Sticky",namespace:"sticky",silent:!1,debug:!1,verbose:!0,performance:!0,pushing:!1,context:!1,container:!1,scrollContext:D,offset:0,bottomOffset:0,jitter:5,setSize:!0,observeChanges:!1,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible. Use silent setting to surpress this warning in production.",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document),function(P,O,R,M){"use strict";P.isWindow=P.isWindow||function(e){return null!=e&&e===e.window},P.isFunction=P.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},O=void 0!==O&&O.Math==Math?O:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),P.fn.tab=function(c){var u,d=P.isFunction(this)?P(O):P(this),f=d.selector||"",T=(new Date).getTime(),S=[],D=c,A="string"==typeof D,E=[].slice.call(arguments,1),F=!1;return d.each(function(){var m,o,g,p,h,v=P.isPlainObject(c)?P.extend(!0,{},P.fn.tab.settings,c):P.extend({},P.fn.tab.settings),b=v.className,y=v.metadata,t=v.selector,x=v.error,n=v.regExp,e="."+v.namespace,i="module-"+v.namespace,C=P(this),a={},w=!0,r=0,s=this,l=C.data(i),k={initialize:function(){k.debug("Initializing tab menu item",C),k.fix.callbacks(),k.determineTabs(),k.debug("Determining tabs",v.context,o),v.auto&&k.set.auto(),k.bind.events(),v.history&&!F&&(k.initializeHistory(),F=!0),v.autoTabActivation&&l===M&&null==k.determine.activeTab()&&(k.debug("No active tab detected, setting first tab active",k.get.initialPath()),k.changeTab(!0===v.autoTabActivation?k.get.initialPath():v.autoTabActivation)),k.instantiate()},instantiate:function(){k.verbose("Storing instance of module",k),l=k,C.data(i,k)},destroy:function(){k.debug("Destroying tabs",C),C.removeData(i).off(e)},bind:{events:function(){P.isWindow(s)||(k.debug("Attaching tab activation events to element",C),C.on("click"+e,k.event.click))}},determineTabs:function(){var e;"parent"===v.context?(0<C.closest(t.ui).length?(e=C.closest(t.ui),k.verbose("Using closest UI element as parent",e)):e=C,m=e.parent(),k.verbose("Determined parent element for creating context",m)):v.context?(m=P(v.context),k.verbose("Using selector for tab context",v.context,m)):m=P("body"),v.childrenOnly?(o=m.children(t.tabs),k.debug("Searching tab context children for tabs",m,o)):(o=m.find(t.tabs),k.debug("Searching tab context for tabs",m,o))},fix:{callbacks:function(){P.isPlainObject(c)&&(c.onTabLoad||c.onTabInit)&&(c.onTabLoad&&(c.onLoad=c.onTabLoad,delete c.onTabLoad,k.error(x.legacyLoad,c.onLoad)),c.onTabInit&&(c.onFirstLoad=c.onTabInit,delete c.onTabInit,k.error(x.legacyInit,c.onFirstLoad)),v=P.extend(!0,{},P.fn.tab.settings,c))}},initializeHistory:function(){if(k.debug("Initializing page state"),P.address===M)return k.error(x.state),!1;if("state"==v.historyType){if(k.debug("Using HTML5 to manage state"),!1===v.path)return k.error(x.path),!1;P.address.history(!0).state(v.path)}P.address.bind("change",k.event.history.change)},event:{click:function(e){var t=P(this).data(y.tab);t!==M?(v.history?(k.verbose("Updating page state",e),P.address.value(t)):(k.verbose("Changing tab",e),k.changeTab(t)),e.preventDefault()):k.debug("No tab specified")},history:{change:function(e){var t=e.pathNames.join("/")||k.get.initialPath(),n=v.templates.determineTitle(t)||!1;k.performance.display(),k.debug("History change event",t,e),h=e,t!==M&&k.changeTab(t),n&&P.address.title(n)}}},refresh:function(){g&&(k.debug("Refreshing tab",g),k.changeTab(g))},cache:{read:function(e){return e!==M&&a[e]},add:function(e,t){e=e||g,k.debug("Adding cached content for",e),a[e]=t},remove:function(e){e=e||g,k.debug("Removing cached content for",e),delete a[e]}},escape:{string:function(e){return(e=String(e)).replace(n.escape,"\\$&")}},set:{auto:function(){var e="string"==typeof v.path?v.path.replace(/\/$/,"")+"/{$tab}":"/{$tab}";k.verbose("Setting up automatic tab retrieval from server",e),P.isPlainObject(v.apiSettings)?v.apiSettings.url=e:v.apiSettings={url:e}},loading:function(e){var t=k.get.tabElement(e);t.hasClass(b.loading)||(k.verbose("Setting loading state for",t),t.addClass(b.loading).siblings(o).removeClass(b.active+" "+b.loading),0<t.length&&v.onRequest.call(t[0],e))},state:function(e){P.address.value(e)}},changeTab:function(c){var u=O.history&&O.history.pushState&&v.ignoreFirstLoad&&w,d=v.auto||P.isPlainObject(v.apiSettings),f=d&&!u?k.utilities.pathToArray(c):k.get.defaultPathArray(c);c=k.utilities.arrayToPath(f),P.each(f,function(e,t){var n,i,o=f.slice(0,e+1),a=k.utilities.arrayToPath(o),r=k.is.tab(a),s=e+1==f.length,l=k.get.tabElement(a);return k.verbose("Looking for tab",t),r?(k.verbose("Tab was found",t),g=a,p=k.utilities.filterArray(f,o),s?i=!0:(s=f.slice(0,e+2),e=k.utilities.arrayToPath(s),(i=!k.is.tab(e))&&k.verbose("Tab parameters found",s)),i&&d?(u?(k.debug("Ignoring remote content on first tab load",a),w=!1,k.cache.add(c,l.html()),k.activate.all(a),v.onFirstLoad.call(l[0],a,p,h),v.onLoad.call(l[0],a,p,h)):(k.activate.navigation(a),k.fetch.content(a,c)),!1):(k.debug("Opened local tab",a),k.activate.all(a),k.cache.read(a)||(k.cache.add(a,!0),k.debug("First time tab loaded calling tab init"),v.onFirstLoad.call(l[0],a,p,h)),void v.onLoad.call(l[0],a,p,h))):-1!=c.search("/")||""===c?(k.error(x.missingTab,C,m,a),!1):(c=k.escape.string(c),a=(n=P("#"+c+', a[name="'+c+'"]')).closest("[data-tab]").data(y.tab),l=k.get.tabElement(a),n&&0<n.length&&a?(k.debug("Anchor link used, opening parent tab",l,n),l.hasClass(b.active)||setTimeout(function(){k.scrollTo(n)},0),k.activate.all(a),k.cache.read(a)||(k.cache.add(a,!0),k.debug("First time tab loaded calling tab init"),v.onFirstLoad.call(l[0],a,p,h)),v.onLoad.call(l[0],a,p,h),!1):void 0)})},scrollTo:function(e){var t=!!(e&&0<e.length)&&e.offset().top;!1!==t&&(k.debug("Forcing scroll to an in-page link in a hidden tab",t,e),P(R).scrollTop(t))},update:{content:function(e,t,n){var i=k.get.tabElement(e),o=i[0];n=n!==M?n:v.evaluateScripts,"string"==typeof v.cacheType&&"dom"==v.cacheType.toLowerCase()&&"string"!=typeof t?i.empty().append(P(t).clone(!0)):n?(k.debug("Updating HTML and evaluating inline scripts",e,t),i.html(t)):(k.debug("Updating HTML",e,t),o.innerHTML=t)}},fetch:{content:function(t,n){var i=k.get.tabElement(t),e={dataType:"html",encodeParameters:!1,on:"now",cache:v.alwaysRefresh,headers:{"X-Remote":!0},onSuccess:function(e){"response"==v.cacheType&&k.cache.add(n,e),k.update.content(t,e),t==g?(k.debug("Content loaded",t),k.activate.tab(t)):k.debug("Content loaded in background",t),v.onFirstLoad.call(i[0],t,p,h),v.onLoad.call(i[0],t,p,h),v.loadOnce?k.cache.add(n,!0):"string"==typeof v.cacheType&&"dom"==v.cacheType.toLowerCase()&&0<i.children().length?setTimeout(function(){var e=(e=i.children().clone(!0)).not("script");k.cache.add(n,e)},0):k.cache.add(n,i.html())},urlData:{tab:n}},o=i.api("get request")||!1,a=o&&"pending"===o.state();n=n||t,o=k.cache.read(n),v.cache&&o?(k.activate.tab(t),k.debug("Adding cached content",n),v.loadOnce||("once"==v.evaluateScripts?k.update.content(t,o,!1):k.update.content(t,o)),v.onLoad.call(i[0],t,p,h)):a?(k.set.loading(t),k.debug("Content is already loading",n)):P.api!==M?(e=P.extend(!0,{},v.apiSettings,e),k.debug("Retrieving remote content",n,e),k.set.loading(t),i.api(e)):k.error(x.api)}},activate:{all:function(e){k.activate.tab(e),k.activate.navigation(e)},tab:function(e){var t=k.get.tabElement(e),n="siblings"==v.deactivate?t.siblings(o):o.not(t),i=t.hasClass(b.active);k.verbose("Showing tab content for",t),i||(t.addClass(b.active),n.removeClass(b.active+" "+b.loading),0<t.length&&v.onVisible.call(t[0],e))},navigation:function(e){var t=k.get.navElement(e),n="siblings"==v.deactivate?t.siblings(d):d.not(t),i=t.hasClass(b.active);k.verbose("Activating tab navigation for",t,e),i||(t.addClass(b.active),n.removeClass(b.active+" "+b.loading))}},deactivate:{all:function(){k.deactivate.navigation(),k.deactivate.tabs()},navigation:function(){d.removeClass(b.active)},tabs:function(){o.removeClass(b.active+" "+b.loading)}},is:{tab:function(e){return e!==M&&0<k.get.tabElement(e).length}},get:{initialPath:function(){return d.eq(0).data(y.tab)||o.eq(0).data(y.tab)},path:function(){return P.address.value()},defaultPathArray:function(e){return k.utilities.pathToArray(k.get.defaultPath(e))},defaultPath:function(e){var t=d.filter("[data-"+y.tab+'^="'+k.escape.string(e)+'/"]').eq(0).data(y.tab)||!1;if(t){if(k.debug("Found default tab",t),r<v.maxDepth)return r++,k.get.defaultPath(t);k.error(x.recursion)}else k.debug("No default tabs found for",e,o);return r=0,e},navElement:function(e){return e=e||g,d.filter("[data-"+y.tab+'="'+k.escape.string(e)+'"]')},tabElement:function(e){var t;return e=e||g,t=k.utilities.pathToArray(e),t=k.utilities.last(t),e=o.filter("[data-"+y.tab+'="'+k.escape.string(e)+'"]'),t=o.filter("[data-"+y.tab+'="'+k.escape.string(t)+'"]'),0<e.length?e:t},tab:function(){return g}},determine:{activeTab:function(){var n=null;return o.each(function(e,t){P(t).hasClass(b.active)&&(t=P(this).data(y.tab),d.filter("[data-"+y.tab+'="'+k.escape.string(t)+'"]').hasClass(b.active)&&(n=t))}),n}},utilities:{filterArray:function(e,t){return P.grep(e,function(e){return-1==P.inArray(e,t)})},last:function(e){return!!Array.isArray(e)&&e[e.length-1]},pathToArray:function(e){return"string"==typeof(e=e===M?g:e)?e.split("/"):[e]},arrayToPath:function(e){return!!Array.isArray(e)&&e.join("/")}},setting:function(e,t){if(k.debug("Changing setting",e,t),P.isPlainObject(e))P.extend(!0,v,e);else{if(t===M)return v[e];P.isPlainObject(v[e])?P.extend(!0,v[e],t):v[e]=t}},internal:function(e,t){if(P.isPlainObject(e))P.extend(!0,k,e);else{if(t===M)return k[e];k[e]=t}},debug:function(){!v.silent&&v.debug&&(v.performance?k.performance.log(arguments):(k.debug=Function.prototype.bind.call(console.info,console,v.name+":"),k.debug.apply(console,arguments)))},verbose:function(){!v.silent&&v.verbose&&v.debug&&(v.performance?k.performance.log(arguments):(k.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),k.verbose.apply(console,arguments)))},error:function(){v.silent||(k.error=Function.prototype.bind.call(console.error,console,v.name+":"),k.error.apply(console,arguments))},performance:{log:function(e){var t,n;v.performance&&(n=(t=(new Date).getTime())-(T||t),T=t,S.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:s,"Execution Time":n})),clearTimeout(k.performance.timer),k.performance.timer=setTimeout(k.performance.display,500)},display:function(){var e=v.name+":",n=0;T=!1,clearTimeout(k.performance.timer),P.each(S,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",f&&(e+=" '"+f+"'"),(console.group!==M||console.table!==M)&&0<S.length&&(console.groupCollapsed(e),console.table?console.table(S):P.each(S,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),S=[]}},invoke:function(i,e,t){var o,a,n,r=l;return e=e||E,t=s||t,"string"==typeof i&&r!==M&&(i=i.split(/[\. ]/),o=i.length-1,P.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(P.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==M)return a=r[n],!1;{if(!P.isPlainObject(r[t])||e==o)return r[t]!==M?a=r[t]:k.error(x.method,i),!1;r=r[t]}}})),P.isFunction(a)?n=a.apply(t,e):a!==M&&(n=a),Array.isArray(u)?u.push(n):u!==M?u=[u,n]:n!==M&&(u=n),a}};A?(l===M&&k.initialize(),k.invoke(D)):(l!==M&&l.invoke("destroy"),k.initialize())}),u!==M?u:this},P.tab=function(){P(O).tab.apply(this,arguments)},P.fn.tab.settings={name:"Tab",namespace:"tab",silent:!1,debug:!1,verbose:!1,performance:!0,auto:!1,history:!1,historyType:"hash",path:!1,context:!1,childrenOnly:!1,maxDepth:25,deactivate:"siblings",alwaysRefresh:!1,cache:!0,loadOnce:!1,cacheType:"response",ignoreFirstLoad:!1,apiSettings:!1,evaluateScripts:"once",autoTabActivation:!0,onFirstLoad:function(e,t,n){},onLoad:function(e,t,n){},onVisible:function(e,t,n){},onRequest:function(e,t,n){},templates:{determineTitle:function(e){}},error:{api:"You attempted to load content without API module",method:"The method you called is not defined",missingTab:"Activated tab cannot be found. Tabs are case-sensitive.",noContent:"The tab you specified is missing a content url.",path:"History enabled, but no path was specified",recursion:"Max recursive depth reached",legacyInit:"onTabInit has been renamed to onFirstLoad in 2.0, please adjust your code.",legacyLoad:"onTabLoad has been renamed to onLoad in 2.0. Please adjust your code",state:"History requires Asual's Address library <https://github.com/asual/jquery-address>"},regExp:{escape:/[-[\]{}()*+?.,\\^$|#\s:=@]/g},metadata:{tab:"tab",loaded:"loaded",promise:"promise"},className:{loading:"loading",active:"active"},selector:{tabs:".ui.tab",ui:".ui"}}}(jQuery,window,document),function(F,e,P){"use strict";F.isFunction=F.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),F.fn.toast=function(C){var w,e=F(this),k=e.selector||"",T=(new Date).getTime(),S=[],D=C,A="string"==typeof D,E=[].slice.call(arguments,1);return e.each(function(){var n,i,a,o,r,s,l,c=F.isPlainObject(C)?F.extend(!0,{},F.fn.toast.settings,C):F.extend({},F.fn.toast.settings),u=c.className,d=c.selector,f=c.error,e=c.namespace,m=c.fields,t="."+e,g=e+"-module",p=F(this),h=c.context?F(c.context):F("body"),v=p.hasClass("toast")||p.hasClass("message")||p.hasClass("card"),b=this,y=v?p.data(g):P,x={initialize:function(){x.verbose("Initializing element"),x.has.container()||x.create.container(),(v||""!==c.message||""!==c.title||""!==x.get.iconClass()||c.showImage||x.has.configActions())&&("string"==typeof c.showProgress&&-1!==[u.top,u.bottom].indexOf(c.showProgress)||(c.showProgress=!1),x.create.toast(),c.closeOnClick&&(c.closeIcon||0<F(i).find(d.input).length||x.has.configActions())&&(c.closeOnClick=!1),c.closeOnClick||n.addClass(u.unclickable),x.bind.events()),x.instantiate(),n&&x.show()},instantiate:function(){x.verbose("Storing instance of toast"),y=x,p.data(g,y)},destroy:function(){n&&(x.debug("Removing toast",n),x.unbind.events(),n.remove(),s=i=n=P,c.onRemove.call(n,b),l=r=o=P),p.removeData(g)},show:function(e){e=e||function(){},x.debug("Showing toast"),!1!==c.onShow.call(n,b)?x.animate.show(e):x.debug("onShow callback returned false, cancelling toast animation")},close:function(e){e=e||function(){},x.remove.visible(),x.unbind.events(),x.animate.close(e)},create:{container:function(){x.verbose("Creating container"),h.append(F("<div/>",{class:c.position+" "+u.container+" "+(c.horizontal?u.horizontal:"")}))},toast:function(){n=F("<div/>",{class:u.box});var e,t=x.get.iconClass();v?(i=c.cloneModule?p.clone().removeAttr("id"):p,l=i.find("> i"+x.helpers.toClass(u.close)),c.closeIcon=0<l.length,""!==t&&i.find(d.icon).attr("class",t+" "+u.icon),c.showImage&&i.find(d.image).attr("src",c.showImage),""!==c.title&&i.find(d.title).html(x.helpers.escape(c.title,c.preserveHTML)),""!==c.message&&i.find(d.message).html(x.helpers.escape(c.message,c.preserveHTML))):(x.verbose("Creating toast"),i=F("<div/>"),e=F("<div/>",{class:u.content}),""!==t&&i.append(F("<i/>",{class:t+" "+u.icon})),c.showImage&&i.append(F("<img>",{class:u.image+" "+c.classImage,src:c.showImage})),""!==c.title&&e.append(F("<div/>",{class:u.title,text:c.title})),e.append(F("<div/>",{class:u.message,html:x.helpers.escape(c.message,c.preserveHTML)})),i.addClass(c.class+" "+u.toast).append(e),i.css("opacity",c.opacity),c.closeIcon&&((l=F("<i/>",{class:u.close+" "+("string"==typeof c.closeIcon?c.closeIcon:"")})).hasClass(u.left)?i.prepend(l):i.append(l))),i.hasClass(u.compact)&&(c.compact=!0),i.hasClass("card")&&(c.compact=!1),a=i.find(".actions"),x.has.configActions()&&(0===a.length&&(a=F("<div/>",{class:u.actions+" "+(c.classActions||"")}).appendTo(i)),i.hasClass("card")&&!a.hasClass(u.attached)&&(a.addClass(u.extraContent),a.hasClass(u.vertical)&&(a.removeClass(u.vertical),x.error(f.verticalCard))),c.actions.forEach(function(e){var t=e[m.icon]?'<i class="'+x.helpers.deQuote(e[m.icon])+' icon"></i>':"",n=x.helpers.escape(e[m.text]||"",c.preserveHTML),i=x.helpers.deQuote(e[m.class]||""),o=e[m.click]&&F.isFunction(e[m.click])?e[m.click]:function(){};a.append(F("<button/>",{html:t+n,class:u.button+" "+i,click:function(){!1!==o.call(b,p)&&x.close()}}))})),a&&a.hasClass(u.vertical)&&i.addClass(u.vertical),0<a.length&&!a.hasClass(u.attached)&&(!a||a.hasClass(u.basic)&&!a.hasClass(u.left)||i.addClass(u.actions)),"auto"===c.displayTime&&(c.displayTime=Math.max(c.minDisplayTime,i.text().split(" ").length/c.wordsPerMinute*6e4)),n.append(i),0<a.length&&a.hasClass(u.attached)&&(a.addClass(u.buttons),a.detach(),i.addClass(u.attached),a.hasClass(u.vertical)?(i.wrap(F("<div/>",{class:u.vertical+" "+u.attached+" "+(c.compact?u.compact:"")})),a.hasClass(u.left)?i.addClass(u.left).parent().addClass(u.left).prepend(a):i.parent().append(a)):a.hasClass(u.top)?(n.prepend(a),i.addClass(u.bottom)):(n.append(a),i.addClass(u.top))),p!==i&&(b=(p=i)[0]),0<c.displayTime&&(e=u.progressing+" "+(c.pauseOnHover?u.pausable:""),c.showProgress&&(o=F("<div/>",{class:u.progress+" "+(c.classProgress||c.class),"data-percent":""}),c.classProgress||(i.hasClass("toast")&&!i.hasClass(u.inverted)?o.addClass(u.inverted):o.removeClass(u.inverted)),r=F("<div/>",{class:"bar "+(c.progressUp?"up ":"down ")+e}),o.addClass(c.showProgress).append(r),o.hasClass(u.top)?n.prepend(o):n.append(o),r.css("animation-duration",c.displayTime/1e3+"s")),(s=F("<span/>",{class:"wait "+e})).css("animation-duration",c.displayTime/1e3+"s"),s.appendTo(i)),c.compact&&(n.addClass(u.compact),i.addClass(u.compact),o&&o.addClass(u.compact)),c.newestOnTop?n.prependTo(x.get.container()):n.appendTo(x.get.container())}},bind:{events:function(){x.debug("Binding events to toast"),(c.closeOnClick||c.closeIcon)&&(c.closeIcon?l:i).on("click"+t,x.event.click),s&&s.on("animationend"+t,x.close),n.on("click"+t,d.approve,x.event.approve).on("click"+t,d.deny,x.event.deny)}},unbind:{events:function(){x.debug("Unbinding events to toast"),(c.closeOnClick||c.closeIcon)&&(c.closeIcon?l:i).off("click"+t),s&&s.off("animationend"+t),n.off("click"+t)}},animate:{show:function(e){e=F.isFunction(e)?e:function(){},c.transition&&x.can.useElement("transition")&&p.transition("is supported")&&(x.set.visible(),n.transition({animation:c.transition.showMethod+" in",queue:!1,debug:c.debug,verbose:c.verbose,duration:c.transition.showDuration,onComplete:function(){e.call(n,b),c.onVisible.call(n,b)}}))},close:function(e){e=F.isFunction(e)?e:function(){},x.debug("Closing toast"),!1!==c.onHide.call(n,b)?c.transition&&F.fn.transition!==P&&p.transition("is supported")?n.transition({animation:c.transition.hideMethod+" out",queue:!1,duration:c.transition.hideDuration,debug:c.debug,verbose:c.verbose,interval:50,onBeforeHide:function(e){e=F.isFunction(e)?e:function(){},""!==c.transition.closeEasing?n&&(n.css("opacity",0),n.wrap("<div/>").parent().hide(c.transition.closeDuration,c.transition.closeEasing,function(){n&&(n.parent().remove(),e.call(n))})):e.call(n)},onComplete:function(){e.call(n,b),c.onHidden.call(n,b),x.destroy()}}):x.error(f.noTransition):x.debug("onHide callback returned false, cancelling toast animation")},pause:function(){s.css("animationPlayState","paused"),r&&r.css("animationPlayState","paused")},continue:function(){s.css("animationPlayState","running"),r&&r.css("animationPlayState","running")}},has:{container:function(){return x.verbose("Determining if there is already a container"),0<h.find(x.helpers.toClass(c.position)+d.container+(c.horizontal?x.helpers.toClass(u.horizontal):"")).length},toast:function(){return!!x.get.toast()},toasts:function(){return 0<x.get.toasts().length},configActions:function(){return Array.isArray(c.actions)&&0<c.actions.length}},get:{container:function(){return h.find(x.helpers.toClass(c.position)+d.container)[0]},toastBox:function(){return n||null},toast:function(){return i||null},toasts:function(){return F(x.get.container()).find(d.box)},iconClass:function(){return"string"==typeof c.showIcon?c.showIcon:c.showIcon&&c.icons[c.class]?c.icons[c.class]:""},remainingTime:function(){return s?s.css("opacity")*c.displayTime:0}},set:{visible:function(){i.addClass(u.visible)}},remove:{visible:function(){i.removeClass(u.visible)}},event:{click:function(e){0===F(e.target).closest("a").length&&(c.onClick.call(n,b),x.close())},approve:function(){!1!==c.onApprove.call(b,p)?x.close():x.verbose("Approve callback returned false cancelling close")},deny:function(){!1!==c.onDeny.call(b,p)?x.close():x.verbose("Deny callback returned false cancelling close")}},helpers:{toClass:function(e){var e=e.split(" "),t="";return e.forEach(function(e){t+="."+e}),t},deQuote:function(e){return String(e).replace(/"/g,"")},escape:function(e,t){if(t)return e;var n={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};return/[&<>"'`]/.test(e)?(e=e.replace(/&(?![a-z0-9#]{1,6};)/,"&amp;")).replace(/[<>"'`]/g,function(e){return n[e]}):e}},can:{useElement:function(e){return F.fn[e]!==P||(x.error(f.noElement.replace("{element}",e)),!1)}},setting:function(e,t){if(x.debug("Changing setting",e,t),F.isPlainObject(e))F.extend(!0,c,e);else{if(t===P)return c[e];F.isPlainObject(c[e])?F.extend(!0,c[e],t):c[e]=t}},internal:function(e,t){if(F.isPlainObject(e))F.extend(!0,x,e);else{if(t===P)return x[e];x[e]=t}},debug:function(){!c.silent&&c.debug&&(c.performance?x.performance.log(arguments):(x.debug=Function.prototype.bind.call(console.info,console,c.name+":"),x.debug.apply(console,arguments)))},verbose:function(){!c.silent&&c.verbose&&c.debug&&(c.performance?x.performance.log(arguments):(x.verbose=Function.prototype.bind.call(console.info,console,c.name+":"),x.verbose.apply(console,arguments)))},error:function(){c.silent||(x.error=Function.prototype.bind.call(console.error,console,c.name+":"),x.error.apply(console,arguments))},performance:{log:function(e){var t,n;c.performance&&(n=(t=(new Date).getTime())-(T||t),T=t,S.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:b,"Execution Time":n})),clearTimeout(x.performance.timer),x.performance.timer=setTimeout(x.performance.display,500)},display:function(){var e=c.name+":",n=0;T=!1,clearTimeout(x.performance.timer),F.each(S,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",k&&(e+=" '"+k+"'"),(console.group!==P||console.table!==P)&&0<S.length&&(console.groupCollapsed(e),console.table?console.table(S):F.each(S,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),S=[]}},invoke:function(i,e,t){var o,a,n,r=y;return e=e||E,t=b||t,"string"==typeof i&&r!==P&&(i=i.split(/[\. ]/),o=i.length-1,F.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(F.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==P)return a=r[n],!1;{if(!F.isPlainObject(r[t])||e==o)return r[t]!==P?a=r[t]:x.error(f.method,i),!1;r=r[t]}}})),F.isFunction(a)?n=a.apply(t,e):a!==P&&(n=a),Array.isArray(w)?w.push(n):w!==P?w=[w,n]:n!==P&&(w=n),a}};A?(y===P&&x.initialize(),x.invoke(D)):(y!==P&&y.invoke("destroy"),x.initialize(),w=p)}),w!==P?w:this},F.fn.toast.settings={name:"Toast",namespace:"toast",silent:!1,debug:!1,verbose:!1,performance:!0,context:"body",position:"top right",horizontal:!1,class:"neutral",classProgress:!1,classActions:!1,classImage:"mini",title:"",message:"",displayTime:3e3,minDisplayTime:1e3,wordsPerMinute:120,showIcon:!1,newestOnTop:!1,showProgress:!1,pauseOnHover:!0,progressUp:!1,opacity:1,compact:!0,closeIcon:!1,closeOnClick:!0,cloneModule:!0,actions:!1,preserveHTML:!0,showImage:!1,transition:{showMethod:"scale",showDuration:500,hideMethod:"scale",hideDuration:500,closeEasing:"easeOutCubic",closeDuration:500},error:{method:"The method you called is not defined.",noElement:"This module requires ui {element}",verticalCard:"Vertical but not attached actions are not supported for card layout"},className:{container:"ui toast-container",box:"floating toast-box",progress:"ui attached active progress",toast:"ui toast",icon:"centered icon",visible:"visible",content:"content",title:"ui header",message:"message",actions:"actions",extraContent:"extra content",button:"ui button",buttons:"ui buttons",close:"close icon",image:"ui image",vertical:"vertical",horizontal:"horizontal",attached:"attached",inverted:"inverted",compact:"compact",pausable:"pausable",progressing:"progressing",top:"top",bottom:"bottom",left:"left",basic:"basic",unclickable:"unclickable"},icons:{info:"info",success:"checkmark",warning:"warning",error:"times"},selector:{container:".ui.toast-container",box:".toast-box",toast:".ui.toast",title:".header",message:".message:not(.ui)",image:"> img.image, > .image > img",icon:"> i.icon",input:'input:not([type="hidden"]), textarea, select, button, .ui.button, ui.dropdown',approve:".actions .positive, .actions .approve, .actions .ok",deny:".actions .negative, .actions .deny, .actions .cancel"},fields:{class:"class",text:"text",icon:"icon",click:"click"},onShow:function(){},onVisible:function(){},onClick:function(){},onHide:function(){},onHidden:function(){},onRemove:function(){},onApprove:function(){},onDeny:function(){}},F.extend(F.easing,{easeOutBounce:function(e,t,n,i,o){return(t/=o)<1/2.75?i*(7.5625*t*t)+n:t<2/2.75?i*(7.5625*(t-=1.5/2.75)*t+.75)+n:t<2.5/2.75?i*(7.5625*(t-=2.25/2.75)*t+.9375)+n:i*(7.5625*(t-=2.625/2.75)*t+.984375)+n},easeOutCubic:function(e){return--e*e*e+1}})}(jQuery,window,void document),function(C,e,w,k){"use strict";C.isFunction=C.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),C.fn.transition=function(){var m,r=C(this),g=r.selector||"",p=(new Date).getTime(),h=[],v=arguments,b=v[0],y=[].slice.call(arguments,1),x="string"==typeof b;return r.each(function(n){var l,s,t,c,i,o,e,a,u=C(this),d=this,f={initialize:function(){l=f.get.settings.apply(d,v),c=l.className,t=l.error,i=l.metadata,a="."+l.namespace,e="module-"+l.namespace,s=u.data(e)||f,o=f.get.animationEndEvent(),!1===(x=x&&f.invoke(b))&&(f.verbose("Converted arguments into settings object",l),l.interval?f.delay(l.animate):f.animate(),f.instantiate())},instantiate:function(){f.verbose("Storing instance of module",f),s=f,u.data(e,s)},destroy:function(){f.verbose("Destroying previous module for",d),u.removeData(e)},refresh:function(){f.verbose("Refreshing display type on next animation"),delete f.displayType},forceRepaint:function(){f.verbose("Forcing element repaint");var e=u.parent(),t=u.next();0===t.length?u.detach().appendTo(e):u.detach().insertBefore(t)},repaint:function(){f.verbose("Repainting element");d.offsetWidth},delay:function(e){var t=(t=f.get.animationDirection())||(f.can.transition()?f.get.direction():"static");e=e!==k?e:l.interval,t="auto"==l.reverse&&t==c.outward||1==l.reverse?(r.length-n)*l.interval:n*l.interval,f.debug("Delaying animation by",t),setTimeout(f.animate,t)},animate:function(e){if(l=e||l,!f.is.supported())return f.error(t.support),!1;if(f.debug("Preparing animation",l.animation),f.is.animating()){if(l.queue)return!l.allowRepeats&&f.has.direction()&&f.is.occurring()&&!0!==f.queuing?f.debug("Animation is currently occurring, preventing queueing same animation",l.animation):f.queue(l.animation),!1;if(!l.allowRepeats&&f.is.occurring())return f.debug("Animation is already occurring, will not execute repeated animation",l.animation),!1;f.debug("New animation started, completing previous early",l.animation),s.complete()}f.can.animate()?f.set.animating(l.animation):f.error(t.noAnimation,l.animation,d)},reset:function(){f.debug("Resetting animation to beginning conditions"),f.remove.animationCallbacks(),f.restore.conditions(),f.remove.animating()},queue:function(e){f.debug("Queueing animation of",e),f.queuing=!0,u.one(o+".queue"+a,function(){f.queuing=!1,f.repaint(),f.animate.apply(this,l)})},complete:function(e){e&&e.target===d&&e.stopPropagation(),f.debug("Animation complete",l.animation),f.remove.completeCallback(),f.remove.failSafe(),f.is.looping()||(f.is.outward()?(f.verbose("Animation is outward, hiding element"),f.restore.conditions(),f.hide()):f.is.inward()?(f.verbose("Animation is outward, showing element"),f.restore.conditions(),f.show()):(f.verbose("Static animation completed"),f.restore.conditions(),l.onComplete.call(d)))},force:{visible:function(){var e=u.attr("style"),t=f.get.userStyle(e),n=f.get.displayType(),e=t+"display: "+n+" !important;",t=u[0].style.display;return!n||"none"===t&&l.skipInlineHidden||u[0].tagName.match(/(script|link|style)/i)?(f.remove.transition(),!1):(f.verbose("Overriding default display to show element",n),u.attr("style",e),!0)},hidden:function(){var e=u.attr("style"),t=u.css("display"),e=e===k||""===e;"none"===t||f.is.hidden()?e&&u.removeAttr("style"):(f.verbose("Overriding default display to hide element"),u.css("display","none"))}},has:{direction:function(e){var n=!1;return"string"==typeof(e=e||l.animation)&&(e=e.split(" "),C.each(e,function(e,t){t!==c.inward&&t!==c.outward||(n=!0)})),n},inlineDisplay:function(){var e=u.attr("style")||"";return Array.isArray(e.match(/display.*?;/,""))}},set:{animating:function(e){f.remove.completeCallback(),e=e||l.animation;e=f.get.animationClass(e);f.save.animation(e),f.force.visible()&&(f.remove.hidden(),f.remove.direction(),f.start.animation(e))},duration:function(e,t){!(t="number"==typeof(t=t||l.duration)?t+"ms":t)&&0!==t||(f.verbose("Setting animation duration",t),u.css({"animation-duration":t}))},direction:function(e){(e=e||f.get.direction())==c.inward?f.set.inward():f.set.outward()},looping:function(){f.debug("Transition set to loop"),u.addClass(c.looping)},hidden:function(){u.addClass(c.transition).addClass(c.hidden)},inward:function(){f.debug("Setting direction to inward"),u.removeClass(c.outward).addClass(c.inward)},outward:function(){f.debug("Setting direction to outward"),u.removeClass(c.inward).addClass(c.outward)},visible:function(){u.addClass(c.transition).addClass(c.visible)}},start:{animation:function(e){e=e||f.get.animationClass(),f.debug("Starting tween",e),u.addClass(e).one(o+".complete"+a,f.complete),l.useFailSafe&&f.add.failSafe(),f.set.duration(l.duration),l.onStart.call(d)}},save:{animation:function(e){f.cache||(f.cache={}),f.cache.animation=e},displayType:function(e){"none"!==e&&u.data(i.displayType,e)},transitionExists:function(e,t){C.fn.transition.exists[e]=t,f.verbose("Saving existence of transition",e,t)}},restore:{conditions:function(){var e=f.get.currentAnimation();e&&(u.removeClass(e),f.verbose("Removing animation class",f.cache)),f.remove.duration()}},add:{failSafe:function(){var e=f.get.duration();f.timer=setTimeout(function(){u.triggerHandler(o)},e+l.failSafeDelay),f.verbose("Adding fail safe timer",f.timer)}},remove:{animating:function(){u.removeClass(c.animating)},animationCallbacks:function(){f.remove.queueCallback(),f.remove.completeCallback()},queueCallback:function(){u.off(".queue"+a)},completeCallback:function(){u.off(".complete"+a)},display:function(){u.css("display","")},direction:function(){u.removeClass(c.inward).removeClass(c.outward)},duration:function(){u.css("animation-duration","")},failSafe:function(){f.verbose("Removing fail safe timer",f.timer),f.timer&&clearTimeout(f.timer)},hidden:function(){u.removeClass(c.hidden)},visible:function(){u.removeClass(c.visible)},looping:function(){f.debug("Transitions are no longer looping"),f.is.looping()&&(f.reset(),u.removeClass(c.looping))},transition:function(){u.removeClass(c.transition).removeClass(c.visible).removeClass(c.hidden)}},get:{settings:function(e,t,n){return"object"==typeof e?C.extend(!0,{},C.fn.transition.settings,e):"function"==typeof n?C.extend({},C.fn.transition.settings,{animation:e,onComplete:n,duration:t}):"string"==typeof t||"number"==typeof t?C.extend({},C.fn.transition.settings,{animation:e,duration:t}):"object"==typeof t?C.extend({},C.fn.transition.settings,t,{animation:e}):"function"==typeof t?C.extend({},C.fn.transition.settings,{animation:e,onComplete:t}):C.extend({},C.fn.transition.settings,{animation:e})},animationClass:function(e){var t=e||l.animation,e=f.can.transition()&&!f.has.direction()?f.get.direction()+" ":"";return c.animating+" "+c.transition+" "+e+t},currentAnimation:function(){return!(!f.cache||f.cache.animation===k)&&f.cache.animation},currentDirection:function(){return f.is.inward()?c.inward:c.outward},direction:function(){return f.is.hidden()||!f.is.visible()?c.inward:c.outward},animationDirection:function(e){var n;return"string"==typeof(e=e||l.animation)&&(e=e.split(" "),C.each(e,function(e,t){t===c.inward?n=c.inward:t===c.outward&&(n=c.outward)})),n||!1},duration:function(e){return"string"==typeof(e=!1===(e=e||l.duration)?u.css("animation-duration")||0:e)?-1<e.indexOf("ms")?parseFloat(e):1e3*parseFloat(e):e},displayType:function(e){return l.displayType||((e=e===k||e)&&u.data(i.displayType)===k&&(""===(e=u.css("display"))||"none"===e?f.can.transition(!0):f.save.displayType(e)),u.data(i.displayType))},userStyle:function(e){return(e=e||u.attr("style")||"").replace(/display.*?;/,"")},transitionExists:function(e){return C.fn.transition.exists[e]},animationStartEvent:function(){var e,t=w.createElement("div"),n={animation:"animationstart",OAnimation:"oAnimationStart",MozAnimation:"mozAnimationStart",WebkitAnimation:"webkitAnimationStart"};for(e in n)if(t.style[e]!==k)return n[e];return!1},animationEndEvent:function(){var e,t=w.createElement("div"),n={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"mozAnimationEnd",WebkitAnimation:"webkitAnimationEnd"};for(e in n)if(t.style[e]!==k)return n[e];return!1}},can:{transition:function(e){var t,n,i,o,a=l.animation,r=f.get.transitionExists(a),s=f.get.displayType(!1);if(r===k||e){if(f.verbose("Determining whether animation exists"),t=u.attr("class"),i=u.prop("tagName"),e=(n=C("<"+i+" />").addClass(t).insertAfter(u)).addClass(a).removeClass(c.inward).removeClass(c.outward).addClass(c.animating).addClass(c.transition).css("animationName"),i=n.addClass(c.inward).css("animationName"),s||(s=n.attr("class",t).removeAttr("style").removeClass(c.hidden).removeClass(c.visible).show().css("display"),f.verbose("Determining final display state",s),f.save.displayType(s)),n.remove(),e!=i)f.debug("Direction exists for animation",a),o=!0;else{if("none"==e||!e)return void f.debug("No animation defined in css",a);f.debug("Static animation found",a,s),o=!1}f.save.transitionExists(a,o)}return r!==k?r:o},animate:function(){return f.can.transition()!==k}},is:{animating:function(){return u.hasClass(c.animating)},inward:function(){return u.hasClass(c.inward)},outward:function(){return u.hasClass(c.outward)},looping:function(){return u.hasClass(c.looping)},occurring:function(e){return e="."+(e=e||l.animation).replace(" ","."),0<u.filter(e).length},visible:function(){return u.is(":visible")},hidden:function(){return"hidden"===u.css("visibility")},supported:function(){return!1!==o}},hide:function(){f.verbose("Hiding element"),f.is.animating()&&f.reset(),d.blur(),f.remove.display(),f.remove.visible(),C.isFunction(l.onBeforeHide)?l.onBeforeHide.call(d,function(){f.hideNow()}):f.hideNow()},hideNow:function(){f.set.hidden(),f.force.hidden(),l.onHide.call(d),l.onComplete.call(d)},show:function(e){f.verbose("Showing element",e),f.force.visible()&&(f.remove.hidden(),f.set.visible(),l.onShow.call(d),l.onComplete.call(d))},toggle:function(){f.is.visible()?f.hide():f.show()},stop:function(){f.debug("Stopping current animation"),u.triggerHandler(o)},stopAll:function(){f.debug("Stopping all animation"),f.remove.queueCallback(),u.triggerHandler(o)},clear:{queue:function(){f.debug("Clearing animation queue"),f.remove.queueCallback()}},enable:function(){f.verbose("Starting animation"),u.removeClass(c.disabled)},disable:function(){f.debug("Stopping animation"),u.addClass(c.disabled)},setting:function(e,t){if(f.debug("Changing setting",e,t),C.isPlainObject(e))C.extend(!0,l,e);else{if(t===k)return l[e];C.isPlainObject(l[e])?C.extend(!0,l[e],t):l[e]=t}},internal:function(e,t){if(C.isPlainObject(e))C.extend(!0,f,e);else{if(t===k)return f[e];f[e]=t}},debug:function(){!l.silent&&l.debug&&(l.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,l.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!l.silent&&l.verbose&&l.debug&&(l.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,l.name+":"),f.verbose.apply(console,arguments)))},error:function(){l.silent||(f.error=Function.prototype.bind.call(console.error,console,l.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;l.performance&&(n=(t=(new Date).getTime())-(p||t),p=t,h.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:d,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var e=l.name+":",n=0;p=!1,clearTimeout(f.performance.timer),C.each(h,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",g&&(e+=" '"+g+"'"),1<r.length&&(e+=" ("+r.length+")"),(console.group!==k||console.table!==k)&&0<h.length&&(console.groupCollapsed(e),console.table?console.table(h):C.each(h,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),h=[]}},invoke:function(i,e,t){var o,a,n,r=s;return e=e||y,t=d||t,"string"==typeof i&&r!==k&&(i=i.split(/[\. ]/),o=i.length-1,C.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(C.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==k)return a=r[n],!1;{if(!C.isPlainObject(r[t])||e==o)return r[t]!==k&&(a=r[t]),!1;r=r[t]}}})),C.isFunction(a)?n=a.apply(t,e):a!==k&&(n=a),Array.isArray(m)?m.push(n):m!==k?m=[m,n]:n!==k&&(m=n),a!==k&&a}};f.initialize()}),m!==k?m:this},C.fn.transition.exists={},C.fn.transition.settings={name:"Transition",silent:!1,debug:!1,verbose:!1,performance:!0,namespace:"transition",interval:0,reverse:"auto",onStart:function(){},onComplete:function(){},onShow:function(){},onHide:function(){},useFailSafe:!0,failSafeDelay:100,allowRepeats:!1,displayType:!1,animation:"fade",duration:!1,queue:!0,skipInlineHidden:!1,metadata:{displayType:"display"},className:{animating:"animating",disabled:"disabled",hidden:"hidden",inward:"in",loading:"loading",looping:"looping",outward:"out",transition:"transition",visible:"visible"},error:{noAnimation:"Element is no longer attached to DOM. Unable to animate.  Use silent setting to surpress this warning in production.",repeated:"That animation is already occurring, cancelling repeated animation",method:"The method you called is not defined",support:"This browser does not support CSS animations"}}}(jQuery,window,document),function(E,F,P){"use strict";E.isWindow=E.isWindow||function(e){return null!=e&&e===e.window},F=void 0!==F&&F.Math==Math?F:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),E.api=E.fn.api=function(x){var C,e=E.isFunction(this)?E(F):E(this),w=e.selector||"",k=(new Date).getTime(),T=[],S=x,D="string"==typeof S,A=[].slice.call(arguments,1);return e.each(function(){var a,o,n,e,r,s=E.isPlainObject(x)?E.extend(!0,{},E.fn.api.settings,x):E.extend({},E.fn.api.settings),t=s.namespace,i=s.metadata,l=s.selector,c=s.error,u=s.className,d="."+t,f="module-"+t,m=E(this),g=m.closest(l.form),p=s.stateContext?E(s.stateContext):m,h=this,v=p[0],b=m.data(f),y={initialize:function(){D||y.bind.events(),y.instantiate()},instantiate:function(){y.verbose("Storing instance of module",y),b=y,m.data(f,b)},destroy:function(){y.verbose("Destroying previous module for",h),m.removeData(f).off(d)},bind:{events:function(){var e=y.get.event();e?(y.verbose("Attaching API events to element",e),m.on(e+d,y.event.trigger)):"now"==s.on&&(y.debug("Querying API endpoint immediately"),y.query())}},decode:{json:function(e){if(e!==P&&"string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}},read:{cachedResponse:function(e){var t;if(F.Storage!==P)return t=sessionStorage.getItem(e),y.debug("Using cached response",e,t),y.decode.json(t);y.error(c.noStorage)}},write:{cachedResponse:function(e,t){t&&""===t?y.debug("Response empty, not caching",t):F.Storage!==P?(E.isPlainObject(t)&&(t=JSON.stringify(t)),sessionStorage.setItem(e,t),y.verbose("Storing cached response for url",e,t)):y.error(c.noStorage)}},query:function(){if(y.is.disabled())y.debug("Element is disabled API request aborted");else{if(y.is.loading()){if(!s.interruptRequests)return void y.debug("Cancelling request, previous request is still pending");y.debug("Interrupting previous request"),y.abort()}if(s.defaultData&&E.extend(!0,s.urlData,y.get.defaultData()),s.serializeForm&&(s.data=y.add.formData(s.data)),!1===(o=y.get.settings()))return y.cancelled=!0,void y.error(c.beforeSend);if(y.cancelled=!1,(n=y.get.templatedURL())||y.is.mocked()){if((n=y.add.urlData(n))||y.is.mocked()){if(o.url=s.base+n,a=E.extend(!0,{},s,{type:s.method||s.type,data:e,url:s.base+n,beforeSend:s.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),y.debug("Querying URL",a.url),y.verbose("Using AJAX settings",a),"local"===s.cache&&y.read.cachedResponse(n))return y.debug("Response returned from local cache"),y.request=y.create.request(),void y.request.resolveWith(v,[y.read.cachedResponse(n)]);s.throttle?s.throttleFirstRequest||y.timer?(y.debug("Throttling request",s.throttle),clearTimeout(y.timer),y.timer=setTimeout(function(){y.timer&&delete y.timer,y.debug("Sending throttled request",e,a.method),y.send.request()},s.throttle)):(y.debug("Sending request",e,a.method),y.send.request(),y.timer=setTimeout(function(){},s.throttle)):(y.debug("Sending request",e,a.method),y.send.request())}}else y.error(c.missingURL)}},should:{removeError:function(){return!0===s.hideError||"auto"===s.hideError&&!y.is.form()}},is:{disabled:function(){return 0<m.filter(l.disabled).length},expectingJSON:function(){return"json"===s.dataType||"jsonp"===s.dataType},form:function(){return m.is("form")||p.is("form")},mocked:function(){return s.mockResponse||s.mockResponseAsync||s.response||s.responseAsync},input:function(){return m.is("input")},loading:function(){return!!y.request&&"pending"==y.request.state()},abortedRequest:function(e){return e&&e.readyState!==P&&0===e.readyState?(y.verbose("XHR request determined to be aborted"),!0):(y.verbose("XHR request was not aborted"),!1)},validResponse:function(e){return y.is.expectingJSON()&&E.isFunction(s.successTest)?(y.debug("Checking JSON returned success",s.successTest,e),s.successTest(e)?(y.debug("Response passed success test",e),!0):(y.debug("Response failed success test",e),!1)):(y.verbose("Response is not JSON, skipping validation",s.successTest,e),!0)}},was:{cancelled:function(){return y.cancelled||!1},succesful:function(){return y.verbose('This behavior will be deleted due to typo. Use "was successful" instead.'),y.was.successful()},successful:function(){return y.request&&"resolved"==y.request.state()},failure:function(){return y.request&&"rejected"==y.request.state()},complete:function(){return y.request&&("resolved"==y.request.state()||"rejected"==y.request.state())}},add:{urlData:function(o,a){var e,t;return o&&(e=o.match(s.regExp.required),t=o.match(s.regExp.optional),a=a||s.urlData,e&&(y.debug("Looking for required URL variables",e),E.each(e,function(e,t){var n=-1!==t.indexOf("$")?t.substr(2,t.length-3):t.substr(1,t.length-2),i=E.isPlainObject(a)&&a[n]!==P?a[n]:m.data(n)!==P?m.data(n):p.data(n)!==P?p.data(n):a[n];if(i===P)return y.error(c.requiredParameter,n,o),o=!1;y.verbose("Found required variable",n,i),i=s.encodeParameters?y.get.urlEncodedValue(i):i,o=o.replace(t,i)})),t&&(y.debug("Looking for optional URL variables",e),E.each(t,function(e,t){var n=-1!==t.indexOf("$")?t.substr(3,t.length-4):t.substr(2,t.length-3),i=E.isPlainObject(a)&&a[n]!==P?a[n]:m.data(n)!==P?m.data(n):p.data(n)!==P?p.data(n):a[n];o=i!==P?(y.verbose("Optional variable Found",n,i),o.replace(t,i)):(y.verbose("Optional variable not found",n),-1!==o.indexOf("/"+t)?o.replace("/"+t,""):o.replace(t,""))}))),o},formData:function(e){var t=E.fn.serializeObject!==P,n=t?g.serializeObject():g.serialize();return e=e||s.data,e=E.isPlainObject(e)?t?(y.debug("Extending existing data with form data",e,n),E.extend(!0,{},e,n)):(y.error(c.missingSerialize),y.debug("Cant extend data. Replacing data with form data",e,n),n):(y.debug("Adding form data",n),n)}},send:{request:function(){y.set.loading(),y.request=y.create.request(),y.is.mocked()?y.mockedXHR=y.create.mockedXHR():y.xhr=y.create.xhr(),s.onRequest.call(v,y.request,y.xhr)}},event:{trigger:function(e){y.query(),"submit"!=e.type&&"click"!=e.type||e.preventDefault()},xhr:{always:function(){},done:function(e,t,n){var i=this,o=(new Date).getTime()-r,a=s.loadingDuration-o,o=!!E.isFunction(s.onResponse)&&(y.is.expectingJSON()&&!s.rawResponse?s.onResponse.call(i,E.extend(!0,{},e)):s.onResponse.call(i,e)),a=0<a?a:0;o&&(y.debug("Modified API response in onResponse callback",s.onResponse,o,e),e=o),0<a&&y.debug("Response completed early delaying state change by",a),setTimeout(function(){y.is.validResponse(e)?y.request.resolveWith(i,[e,n]):y.request.rejectWith(i,[n,"invalid"])},a)},fail:function(e,t,n){var i=this,o=(new Date).getTime()-r,o=s.loadingDuration-o;0<(o=0<o?o:0)&&y.debug("Response completed early delaying state change by",o),setTimeout(function(){y.is.abortedRequest(e)?y.request.rejectWith(i,[e,"aborted",n]):y.request.rejectWith(i,[e,"error",t,n])},o)}},request:{done:function(e,t){y.debug("Successful API Response",e),"local"===s.cache&&n&&(y.write.cachedResponse(n,e),y.debug("Saving server response locally",y.cache)),s.onSuccess.call(v,e,m,t)},complete:function(e,t){var n,i;y.was.successful()?(i=e,n=t):i=y.get.responseFromXHR(n=e),y.remove.loading(),s.onComplete.call(v,i,m,n)},fail:function(e,t,n){var i=y.get.responseFromXHR(e),o=y.get.errorFromRequest(i,t,n);if("aborted"==t)return y.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)",t,n),s.onAbort.call(v,t,m,e),!0;"invalid"==t?y.debug("JSON did not pass success test. A server-side error has most likely occurred",i):"error"==t&&e!==P&&(y.debug("XHR produced a server error",t,n),(e.status<200||300<=e.status)&&n!==P&&""!==n&&y.error(c.statusMessage+n,a.url),s.onError.call(v,o,m,e)),s.errorDuration&&"aborted"!==t&&(y.debug("Adding error state"),y.set.error(),y.should.removeError()&&setTimeout(y.remove.error,s.errorDuration)),y.debug("API Request failed",o,e),s.onFailure.call(v,i,m,e)}}},create:{request:function(){return E.Deferred().always(y.event.request.complete).done(y.event.request.done).fail(y.event.request.fail)},mockedXHR:function(){var e,t=s.mockResponse||s.response,n=s.mockResponseAsync||s.responseAsync,i=E.Deferred().always(y.event.xhr.complete).done(y.event.xhr.done).fail(y.event.xhr.fail);return t?(e=E.isFunction(t)?(y.debug("Using specified synchronous callback",t),t.call(v,o)):(y.debug("Using settings specified response",t),t),i.resolveWith(v,[e,!1,{responseText:e}])):E.isFunction(n)&&(e=function(e){y.debug("Async callback returned response",e),e?i.resolveWith(v,[e,!1,{responseText:e}]):i.rejectWith(v,[{responseText:e},!1,!1])},y.debug("Using specified async response callback",n),n.call(v,o,e)),i},xhr:function(){var e=E.ajax(a).always(y.event.xhr.always).done(y.event.xhr.done).fail(y.event.xhr.fail);return y.verbose("Created server request",e,a),e}},set:{error:function(){y.verbose("Adding error state to element",p),p.addClass(u.error)},loading:function(){y.verbose("Adding loading state to element",p),p.addClass(u.loading),r=(new Date).getTime()}},remove:{error:function(){y.verbose("Removing error state from element",p),p.removeClass(u.error)},loading:function(){y.verbose("Removing loading state from element",p),p.removeClass(u.loading)}},get:{responseFromXHR:function(e){return!!E.isPlainObject(e)&&(y.is.expectingJSON()?y.decode.json(e.responseText):e.responseText)},errorFromRequest:function(e,t,n){return E.isPlainObject(e)&&e.error!==P?e.error:s.error[t]!==P?s.error[t]:n},request:function(){return y.request||!1},xhr:function(){return y.xhr||!1},settings:function(){var e=s.beforeSend.call(m,s);return e&&(e.success!==P&&(y.debug("Legacy success callback detected",e),y.error(c.legacyParameters,e.success),e.onSuccess=e.success),e.failure!==P&&(y.debug("Legacy failure callback detected",e),y.error(c.legacyParameters,e.failure),e.onFailure=e.failure),e.complete!==P&&(y.debug("Legacy complete callback detected",e),y.error(c.legacyParameters,e.complete),e.onComplete=e.complete)),e===P&&y.error(c.noReturnedValue),!1===e?e:e!==P?E.extend(!0,{},e):E.extend(!0,{},s)},urlEncodedValue:function(e){var t=F.decodeURIComponent(e),n=F.encodeURIComponent(e);return t!==e?(y.debug("URL value is already encoded, avoiding double encoding",e),e):(y.verbose("Encoding value using encodeURIComponent",e,n),n)},defaultData:function(){var e={};return E.isWindow(h)||(y.is.input()?e.value=m.val():y.is.form()||(e.text=m.text())),e},event:function(){return E.isWindow(h)||"now"==s.on?(y.debug("API called without element, no events attached"),!1):"auto"==s.on?m.is("input")?h.oninput!==P?"input":h.onpropertychange!==P?"propertychange":"keyup":m.is("form")?"submit":"click":s.on},templatedURL:function(e){if(e=e||m.data(i.action)||s.action||!1,n=m.data(i.url)||s.url||!1)return y.debug("Using specified url",n),n;if(e){if(y.debug("Looking up url for action",e,s.api),s.api[e]===P&&!y.is.mocked())return void y.error(c.missingAction,s.action,s.api);n=s.api[e]}else y.is.form()&&(n=m.attr("action")||p.attr("action")||!1,y.debug("No url or action specified, defaulting to form action",n));return n}},abort:function(){var e=y.get.xhr();e&&"resolved"!==e.state()&&(y.debug("Cancelling API request"),e.abort())},reset:function(){y.remove.error(),y.remove.loading()},setting:function(e,t){if(y.debug("Changing setting",e,t),E.isPlainObject(e))E.extend(!0,s,e);else{if(t===P)return s[e];E.isPlainObject(s[e])?E.extend(!0,s[e],t):s[e]=t}},internal:function(e,t){if(E.isPlainObject(e))E.extend(!0,y,e);else{if(t===P)return y[e];y[e]=t}},debug:function(){!s.silent&&s.debug&&(s.performance?y.performance.log(arguments):(y.debug=Function.prototype.bind.call(console.info,console,s.name+":"),y.debug.apply(console,arguments)))},verbose:function(){!s.silent&&s.verbose&&s.debug&&(s.performance?y.performance.log(arguments):(y.verbose=Function.prototype.bind.call(console.info,console,s.name+":"),y.verbose.apply(console,arguments)))},error:function(){s.silent||(y.error=Function.prototype.bind.call(console.error,console,s.name+":"),y.error.apply(console,arguments))},performance:{log:function(e){var t,n;s.performance&&(n=(t=(new Date).getTime())-(k||t),k=t,T.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":n})),clearTimeout(y.performance.timer),y.performance.timer=setTimeout(y.performance.display,500)},display:function(){var e=s.name+":",n=0;k=!1,clearTimeout(y.performance.timer),E.each(T,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",w&&(e+=" '"+w+"'"),(console.group!==P||console.table!==P)&&0<T.length&&(console.groupCollapsed(e),console.table?console.table(T):E.each(T,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),T=[]}},invoke:function(i,e,t){var o,a,n,r=b;return e=e||A,t=h||t,"string"==typeof i&&r!==P&&(i=i.split(/[\. ]/),o=i.length-1,E.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(E.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==P)return a=r[n],!1;{if(!E.isPlainObject(r[t])||e==o)return r[t]!==P?a=r[t]:y.error(c.method,i),!1;r=r[t]}}})),E.isFunction(a)?n=a.apply(t,e):a!==P&&(n=a),Array.isArray(C)?C.push(n):C!==P?C=[C,n]:n!==P&&(C=n),a}};D?(b===P&&y.initialize(),y.invoke(S)):(b!==P&&b.invoke("destroy"),y.initialize())}),C!==P?C:this},E.api.settings={name:"API",namespace:"api",debug:!1,verbose:!1,performance:!0,api:{},cache:!0,interruptRequests:!0,on:"auto",stateContext:!1,loadingDuration:0,hideError:"auto",errorDuration:2e3,encodeParameters:!0,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,throttleFirstRequest:!0,method:"get",data:{},dataType:"json",mockResponse:!1,mockResponseAsync:!1,response:!1,responseAsync:!1,rawResponse:!1,beforeSend:function(e){return e},beforeXHR:function(e){},onRequest:function(e,t){},onResponse:!1,onSuccess:function(e,t){},onComplete:function(e,t){},onFailure:function(e,t){},onError:function(e,t){},onAbort:function(e,t){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"jquery-serialize-object is required to add form data to an existing data object",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",noStorage:"Caching responses locally requires session storage",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{disabled:".disabled",form:"form"},metadata:{action:"action",url:"url"}}}(jQuery,window,void document),function(w,e,k){"use strict";w.isFunction=w.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},e=void 0!==e&&e.Math==Math?e:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),w.fn.state=function(m){var g,p=w(this),h=p.selector||"",v=(new Date).getTime(),b=[],y=m,x="string"==typeof y,C=[].slice.call(arguments,1);return p.each(function(){var o=w.isPlainObject(m)?w.extend(!0,{},w.fn.state.settings,m):w.extend({},w.fn.state.settings),s=o.error,n=o.metadata,t=o.className,e=o.namespace,i=o.states,a=o.text,r="."+e,l=e+"-module",c=w(this),u=this,d=c.data(l),f={initialize:function(){f.verbose("Initializing module"),o.automatic&&f.add.defaults(),o.context&&""!==h?w(o.context).on(h,"mouseenter"+r,f.change.text).on(h,"mouseleave"+r,f.reset.text).on(h,"click"+r,f.toggle.state):c.on("mouseenter"+r,f.change.text).on("mouseleave"+r,f.reset.text).on("click"+r,f.toggle.state),f.instantiate()},instantiate:function(){f.verbose("Storing instance of module",f),d=f,c.data(l,f)},destroy:function(){f.verbose("Destroying previous module",d),c.off(r).removeData(l)},refresh:function(){f.verbose("Refreshing selector cache"),c=w(u)},add:{defaults:function(){var n=m&&w.isPlainObject(m.states)?m.states:{};w.each(o.defaults,function(e,t){f.is[e]!==k&&f.is[e]()&&(f.verbose("Adding default states",e,u),w.extend(o.states,t,n))})}},is:{active:function(){return c.hasClass(t.active)},loading:function(){return c.hasClass(t.loading)},inactive:function(){return!c.hasClass(t.active)},state:function(e){return t[e]!==k&&c.hasClass(t[e])},enabled:function(){return!c.is(o.filter.active)},disabled:function(){return c.is(o.filter.active)},textEnabled:function(){return!c.is(o.filter.text)},button:function(){return c.is(".button:not(a, .submit)")},input:function(){return c.is("input")},progress:function(){return c.is(".ui.progress")}},allow:function(e){f.debug("Now allowing state",e),i[e]=!0},disallow:function(e){f.debug("No longer allowing",e),i[e]=!1},allows:function(e){return i[e]||!1},enable:function(){c.removeClass(t.disabled)},disable:function(){c.addClass(t.disabled)},setState:function(e){f.allows(e)&&c.addClass(t[e])},removeState:function(e){f.allows(e)&&c.removeClass(t[e])},toggle:{state:function(){var e;if(f.allows("active")&&f.is.enabled()){if(f.refresh(),w.fn.api!==k)if(e=c.api("get request"),c.api("was cancelled"))f.debug("API Request cancelled by beforesend"),o.activateTest=function(){return!1},o.deactivateTest=function(){return!1};else if(e)return void f.listenTo(e);f.change.state()}}},listenTo:function(e){f.debug("API request detected, waiting for state signal",e),e&&(a.loading&&f.update.text(a.loading),w.when(e).then(function(){"resolved"==e.state()?(f.debug("API request succeeded"),o.activateTest=function(){return!0},o.deactivateTest=function(){return!0}):(f.debug("API request failed"),o.activateTest=function(){return!1},o.deactivateTest=function(){return!1}),f.change.state()}))},change:{state:function(){f.debug("Determining state change direction"),f.is.inactive()?f.activate():f.deactivate(),o.sync&&f.sync(),o.onChange.call(u)},text:function(){f.is.textEnabled()&&(f.is.disabled()?(f.verbose("Changing text to disabled text",a.hover),f.update.text(a.disabled)):f.is.active()?a.hover?(f.verbose("Changing text to hover text",a.hover),f.update.text(a.hover)):a.deactivate&&(f.verbose("Changing text to deactivating text",a.deactivate),f.update.text(a.deactivate)):a.hover?(f.verbose("Changing text to hover text",a.hover),f.update.text(a.hover)):a.activate&&(f.verbose("Changing text to activating text",a.activate),f.update.text(a.activate)))}},activate:function(){o.activateTest.call(u)&&(f.debug("Setting state to active"),c.addClass(t.active),f.update.text(a.active),o.onActivate.call(u))},deactivate:function(){o.deactivateTest.call(u)&&(f.debug("Setting state to inactive"),c.removeClass(t.active),f.update.text(a.inactive),o.onDeactivate.call(u))},sync:function(){f.verbose("Syncing other buttons to current state"),f.is.active()?p.not(c).state("activate"):p.not(c).state("deactivate")},get:{text:function(){return o.selector.text?c.find(o.selector.text).text():c.html()},textFor:function(e){return a[e]||!1}},flash:{text:function(e,t,n){var i=f.get.text();f.debug("Flashing text message",e,t),e=e||o.text.flash,t=t||o.flashDuration,n=n||function(){},f.update.text(e),setTimeout(function(){f.update.text(i),n.call(u)},t)}},reset:{text:function(){var e=a.active||c.data(n.storedText),t=a.inactive||c.data(n.storedText);f.is.textEnabled()&&(f.is.active()&&e?(f.verbose("Resetting active text",e),f.update.text(e)):t&&(f.verbose("Resetting inactive text",e),f.update.text(t)))}},update:{text:function(e){var t=f.get.text();e&&e!==t?(f.debug("Updating text",e),o.selector.text?c.data(n.storedText,e).find(o.selector.text).text(e):c.data(n.storedText,e).html(e)):f.debug("Text is already set, ignoring update",e)}},setting:function(e,t){if(f.debug("Changing setting",e,t),w.isPlainObject(e))w.extend(!0,o,e);else{if(t===k)return o[e];w.isPlainObject(o[e])?w.extend(!0,o[e],t):o[e]=t}},internal:function(e,t){if(w.isPlainObject(e))w.extend(!0,f,e);else{if(t===k)return f[e];f[e]=t}},debug:function(){!o.silent&&o.debug&&(o.performance?f.performance.log(arguments):(f.debug=Function.prototype.bind.call(console.info,console,o.name+":"),f.debug.apply(console,arguments)))},verbose:function(){!o.silent&&o.verbose&&o.debug&&(o.performance?f.performance.log(arguments):(f.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),f.verbose.apply(console,arguments)))},error:function(){o.silent||(f.error=Function.prototype.bind.call(console.error,console,o.name+":"),f.error.apply(console,arguments))},performance:{log:function(e){var t,n;o.performance&&(n=(t=(new Date).getTime())-(v||t),v=t,b.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:u,"Execution Time":n})),clearTimeout(f.performance.timer),f.performance.timer=setTimeout(f.performance.display,500)},display:function(){var e=o.name+":",n=0;v=!1,clearTimeout(f.performance.timer),w.each(b,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",h&&(e+=" '"+h+"'"),(console.group!==k||console.table!==k)&&0<b.length&&(console.groupCollapsed(e),console.table?console.table(b):w.each(b,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),b=[]}},invoke:function(i,e,t){var o,a,n,r=d;return e=e||C,t=u||t,"string"==typeof i&&r!==k&&(i=i.split(/[\. ]/),o=i.length-1,w.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(w.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==k)return a=r[n],!1;{if(!w.isPlainObject(r[t])||e==o)return r[t]!==k?a=r[t]:f.error(s.method,i),!1;r=r[t]}}})),w.isFunction(a)?n=a.apply(t,e):a!==k&&(n=a),Array.isArray(g)?g.push(n):g!==k?g=[g,n]:n!==k&&(g=n),a}};x?(d===k&&f.initialize(),f.invoke(y)):(d!==k&&d.invoke("destroy"),f.initialize())}),g!==k?g:this},w.fn.state.settings={name:"State",debug:!1,verbose:!1,namespace:"state",performance:!0,onActivate:function(){},onDeactivate:function(){},onChange:function(){},activateTest:function(){return!0},deactivateTest:function(){return!0},automatic:!0,sync:!1,flashDuration:1e3,filter:{text:".loading, .disabled",active:".disabled"},context:!1,error:{beforeSend:"The before send function has cancelled state change",method:"The method you called is not defined."},metadata:{promise:"promise",storedText:"stored-text"},className:{active:"active",disabled:"disabled",error:"error",loading:"loading",success:"success",warning:"warning"},selector:{text:!1},defaults:{input:{disabled:!0,loading:!0,active:!0},button:{disabled:!0,loading:!0,active:!0},progress:{active:!0,success:!0,warning:!0,error:!0}},states:{active:!0,disabled:!0,error:!0,loading:!0,success:!0,warning:!0},text:{disabled:!1,flash:!1,hover:!1,active:!1,inactive:!1,activate:!1,deactivate:!1}}}(jQuery,window,void document),function(E,F,P,O){"use strict";E.isFunction=E.isFunction||function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},F=void 0!==F&&F.Math==Math?F:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")(),E.fn.visibility=function(b){var y,e=E(this),x=e.selector||"",C=(new Date).getTime(),w=[],k=b,T="string"==typeof k,S=[].slice.call(arguments,1),D=e.length,A=0;return e.each(function(){var e,t,n,o=E.isPlainObject(b)?E.extend(!0,{},E.fn.visibility.settings,b):E.extend({},E.fn.visibility.settings),i=o.className,a=o.namespace,s=o.error,r=o.metadata,l="."+a,c="module-"+a,u=E(F),d=E(this),f=E(o.context),m=d.data(c),g=F.requestAnimationFrame||F.mozRequestAnimationFrame||F.webkitRequestAnimationFrame||F.msRequestAnimationFrame||function(e){setTimeout(e,0)},p=this,h=!1,v={initialize:function(){v.debug("Initializing",o),v.setup.cache(),v.should.trackChanges()&&("image"==o.type&&v.setup.image(),"fixed"==o.type&&v.setup.fixed(),o.observeChanges&&v.observeChanges(),v.bind.events()),v.save.position(),v.is.visible()||v.error(s.visible,d),o.initialCheck&&v.checkVisibility(),v.instantiate()},instantiate:function(){v.debug("Storing instance",v),d.data(c,v),m=v},destroy:function(){v.verbose("Destroying previous module"),n&&n.disconnect(),t&&t.disconnect(),u.off("load"+l,v.event.load).off("resize"+l,v.event.resize),f.off("scroll"+l,v.event.scroll).off("scrollchange"+l,v.event.scrollchange),"fixed"==o.type&&(v.resetFixed(),v.remove.placeholder()),d.off(l).removeData(c)},observeChanges:function(){"MutationObserver"in F&&(t=new MutationObserver(v.event.contextChanged),n=new MutationObserver(v.event.changed),t.observe(P,{childList:!0,subtree:!0}),n.observe(p,{childList:!0,subtree:!0}),v.debug("Setting up mutation observer",n))},bind:{events:function(){v.verbose("Binding visibility events to scroll and resize"),o.refreshOnLoad&&u.on("load"+l,v.event.load),u.on("resize"+l,v.event.resize),f.off("scroll"+l).on("scroll"+l,v.event.scroll).on("scrollchange"+l,v.event.scrollchange)}},event:{changed:function(e){v.verbose("DOM tree modified, updating visibility calculations"),v.timer=setTimeout(function(){v.verbose("DOM tree modified, updating sticky menu"),v.refresh()},100)},contextChanged:function(e){[].forEach.call(e,function(e){e.removedNodes&&[].forEach.call(e.removedNodes,function(e){(e==p||0<E(e).find(p).length)&&(v.debug("Element removed from DOM, tearing down events"),v.destroy())})})},resize:function(){v.debug("Window resized"),o.refreshOnResize&&g(v.refresh)},load:function(){v.debug("Page finished loading"),g(v.refresh)},scroll:function(){o.throttle?(clearTimeout(v.timer),v.timer=setTimeout(function(){f.triggerHandler("scrollchange"+l,[f.scrollTop()])},o.throttle)):g(function(){f.triggerHandler("scrollchange"+l,[f.scrollTop()])})},scrollchange:function(e,t){v.checkVisibility(t)}},precache:function(e,t){for(var n=(e=!(e instanceof Array)?[e]:e).length,i=0,o=[],a=P.createElement("img"),r=function(){++i>=e.length&&E.isFunction(t)&&t()};n--;)(a=P.createElement("img")).onload=r,a.onerror=r,a.src=e[n],o.push(a)},enableCallbacks:function(){v.debug("Allowing callbacks to occur"),h=!1},disableCallbacks:function(){v.debug("Disabling all callbacks temporarily"),h=!0},should:{trackChanges:function(){return T?(v.debug("One time query, no need to bind events"),!1):(v.debug("Callbacks being attached"),!0)}},setup:{cache:function(){v.cache={occurred:{},screen:{},element:{}}},image:function(){var e=d.data(r.src);e&&(v.verbose("Lazy loading image",e),o.once=!0,o.observeChanges=!1,o.onOnScreen=function(){v.debug("Image on screen",p),v.precache(e,function(){v.set.image(e,function(){++A==D&&o.onAllLoaded.call(this),o.onLoad.call(this)})})})},fixed:function(){v.debug("Setting up fixed"),o.once=!1,o.observeChanges=!1,o.initialCheck=!0,o.refreshOnLoad=!0,b.transition||(o.transition=!1),v.create.placeholder(),v.debug("Added placeholder",e),o.onTopPassed=function(){v.debug("Element passed, adding fixed position",d),v.show.placeholder(),v.set.fixed(),o.transition&&E.fn.transition!==O&&d.transition(o.transition,o.duration)},o.onTopPassedReverse=function(){v.debug("Element returned to position, removing fixed",d),v.hide.placeholder(),v.remove.fixed()}}},create:{placeholder:function(){v.verbose("Creating fixed position placeholder"),e=d.clone(!1).css("display","none").addClass(i.placeholder).insertAfter(d)}},show:{placeholder:function(){v.verbose("Showing placeholder"),e.css("display","block").css("visibility","hidden")}},hide:{placeholder:function(){v.verbose("Hiding placeholder"),e.css("display","none").css("visibility","")}},set:{fixed:function(){v.verbose("Setting element to fixed position"),d.addClass(i.fixed).css({position:"fixed",top:o.offset+"px",left:"auto",zIndex:o.zIndex}),o.onFixed.call(p)},image:function(e,t){d.attr("src",e),o.transition?E.fn.transition!==O?d.hasClass(i.visible)?v.debug("Transition already occurred on this image, skipping animation"):d.transition(o.transition,o.duration,t):d.fadeIn(o.duration,t):d.show()}},is:{onScreen:function(){return v.get.elementCalculations().onScreen},offScreen:function(){return v.get.elementCalculations().offScreen},visible:function(){return!(!v.cache||!v.cache.element)&&!(0===v.cache.element.width&&0===v.cache.element.offset.top)},verticallyScrollableContext:function(){var e=f.get(0)!==F&&f.css("overflow-y");return"auto"==e||"scroll"==e},horizontallyScrollableContext:function(){var e=f.get(0)!==F&&f.css("overflow-x");return"auto"==e||"scroll"==e}},refresh:function(){v.debug("Refreshing constants (width/height)"),"fixed"==o.type&&v.resetFixed(),v.reset(),v.save.position(),o.checkOnRefresh&&v.checkVisibility(),o.onRefresh.call(p)},resetFixed:function(){v.remove.fixed(),v.remove.occurred()},reset:function(){v.verbose("Resetting all cached values"),E.isPlainObject(v.cache)&&(v.cache.screen={},v.cache.element={})},checkVisibility:function(e){v.verbose("Checking visibility of element",v.cache.element),!h&&v.is.visible()&&(v.save.scroll(e),v.save.calculations(),v.passed(),v.passingReverse(),v.topVisibleReverse(),v.bottomVisibleReverse(),v.topPassedReverse(),v.bottomPassedReverse(),v.onScreen(),v.offScreen(),v.passing(),v.topVisible(),v.bottomVisible(),v.topPassed(),v.bottomPassed(),o.onUpdate&&o.onUpdate.call(p,v.get.elementCalculations()))},passed:function(e,t){var n=v.get.elementCalculations();if(e&&t)o.onPassed[e]=t;else{if(e!==O)return v.get.pixelsPassed(e)>n.pixelsPassed;n.passing&&E.each(o.onPassed,function(e,t){n.bottomVisible||n.pixelsPassed>v.get.pixelsPassed(e)?v.execute(t,e):o.once||v.remove.occurred(t)})}},onScreen:function(e){var t=v.get.elementCalculations(),n=e||o.onOnScreen;if(e&&(v.debug("Adding callback for onScreen",e),o.onOnScreen=e),t.onScreen?v.execute(n,"onScreen"):o.once||v.remove.occurred("onScreen"),e!==O)return t.onOnScreen},offScreen:function(e){var t=v.get.elementCalculations(),n=e||o.onOffScreen;if(e&&(v.debug("Adding callback for offScreen",e),o.onOffScreen=e),t.offScreen?v.execute(n,"offScreen"):o.once||v.remove.occurred("offScreen"),e!==O)return t.onOffScreen},passing:function(e){var t=v.get.elementCalculations(),n=e||o.onPassing;if(e&&(v.debug("Adding callback for passing",e),o.onPassing=e),t.passing?v.execute(n,"passing"):o.once||v.remove.occurred("passing"),e!==O)return t.passing},topVisible:function(e){var t=v.get.elementCalculations(),n=e||o.onTopVisible,i="topVisible";if(e&&(v.debug("Adding callback for top visible",e),o.onTopVisible=e),t.topVisible?v.execute(n,i):o.once||v.remove.occurred(i),e===O)return t.topVisible},bottomVisible:function(e){var t=v.get.elementCalculations(),n=e||o.onBottomVisible,i="bottomVisible";if(e&&(v.debug("Adding callback for bottom visible",e),o.onBottomVisible=e),t.bottomVisible?v.execute(n,i):o.once||v.remove.occurred(i),e===O)return t.bottomVisible},topPassed:function(e){var t=v.get.elementCalculations(),n=e||o.onTopPassed;if(e&&(v.debug("Adding callback for top passed",e),o.onTopPassed=e),t.topPassed?v.execute(n,"topPassed"):o.once||v.remove.occurred("topPassed"),e===O)return t.topPassed},bottomPassed:function(e){var t=v.get.elementCalculations(),n=e||o.onBottomPassed,i="bottomPassed";if(e&&(v.debug("Adding callback for bottom passed",e),o.onBottomPassed=e),t.bottomPassed?v.execute(n,i):o.once||v.remove.occurred(i),e===O)return t.bottomPassed},passingReverse:function(e){var t=v.get.elementCalculations(),n=e||o.onPassingReverse,i="passingReverse";if(e&&(v.debug("Adding callback for passing reverse",e),o.onPassingReverse=e),t.passing?o.once||v.remove.occurred(i):v.get.occurred("passing")&&v.execute(n,i),e!==O)return!t.passing},topVisibleReverse:function(e){var t=v.get.elementCalculations(),n=e||o.onTopVisibleReverse,i="topVisibleReverse";if(e&&(v.debug("Adding callback for top visible reverse",e),o.onTopVisibleReverse=e),t.topVisible?o.once||v.remove.occurred(i):v.get.occurred("topVisible")&&v.execute(n,i),e===O)return!t.topVisible},bottomVisibleReverse:function(e){var t=v.get.elementCalculations(),n=e||o.onBottomVisibleReverse,i="bottomVisibleReverse";if(e&&(v.debug("Adding callback for bottom visible reverse",e),o.onBottomVisibleReverse=e),t.bottomVisible?o.once||v.remove.occurred(i):v.get.occurred("bottomVisible")&&v.execute(n,i),e===O)return!t.bottomVisible},topPassedReverse:function(e){var t=v.get.elementCalculations(),n=e||o.onTopPassedReverse,i="topPassedReverse";if(e&&(v.debug("Adding callback for top passed reverse",e),o.onTopPassedReverse=e),t.topPassed?o.once||v.remove.occurred(i):v.get.occurred("topPassed")&&v.execute(n,i),e===O)return!t.onTopPassed},bottomPassedReverse:function(e){var t=v.get.elementCalculations(),n=e||o.onBottomPassedReverse,i="bottomPassedReverse";if(e&&(v.debug("Adding callback for bottom passed reverse",e),o.onBottomPassedReverse=e),t.bottomPassed?o.once||v.remove.occurred(i):v.get.occurred("bottomPassed")&&v.execute(n,i),e===O)return!t.bottomPassed},execute:function(e,t){var n=v.get.elementCalculations(),i=v.get.screenCalculations();(e=e||!1)&&(o.continuous?(v.debug("Callback being called continuously",t,n),e.call(p,n,i)):v.get.occurred(t)||(v.debug("Conditions met",t,n),e.call(p,n,i))),v.save.occurred(t)},remove:{fixed:function(){v.debug("Removing fixed position"),d.removeClass(i.fixed).css({position:"",top:"",left:"",zIndex:""}),o.onUnfixed.call(p)},placeholder:function(){v.debug("Removing placeholder content"),e&&e.remove()},occurred:function(e){var t;e?(t=v.cache.occurred)[e]!==O&&!0===t[e]&&(v.debug("Callback can now be called again",e),v.cache.occurred[e]=!1):v.cache.occurred={}}},save:{calculations:function(){v.verbose("Saving all calculations necessary to determine positioning"),v.save.direction(),v.save.screenCalculations(),v.save.elementCalculations()},occurred:function(e){e&&(v.cache.occurred[e]!==O&&!0===v.cache.occurred[e]||(v.verbose("Saving callback occurred",e),v.cache.occurred[e]=!0))},scroll:function(e){e=e+o.offset||f.scrollTop()+o.offset,v.cache.scroll=e},direction:function(){var e=v.get.scroll(),t=v.get.lastScroll(),t=t<e&&t?"down":e<t&&t?"up":"static";return v.cache.direction=t,v.cache.direction},elementPosition:function(){var e=v.cache.element,t=v.get.screenSize();return v.verbose("Saving element position"),e.fits=e.height<t.height,e.offset=d.offset(),e.width=d.outerWidth(),e.height=d.outerHeight(),v.is.verticallyScrollableContext()&&(e.offset.top+=f.scrollTop()-f.offset().top),v.is.horizontallyScrollableContext()&&(e.offset.left+=f.scrollLeft()-f.offset().left),v.cache.element=e},elementCalculations:function(){var e=v.get.screenCalculations(),t=v.get.elementPosition();return o.includeMargin?(t.margin={},t.margin.top=parseInt(d.css("margin-top"),10),t.margin.bottom=parseInt(d.css("margin-bottom"),10),t.top=t.offset.top-t.margin.top,t.bottom=t.offset.top+t.height+t.margin.bottom):(t.top=t.offset.top,t.bottom=t.offset.top+t.height),t.topPassed=e.top>=t.top,t.bottomPassed=e.top>=t.bottom,t.topVisible=e.bottom>=t.top&&!t.topPassed,t.bottomVisible=e.bottom>=t.bottom&&!t.bottomPassed,t.pixelsPassed=0,t.percentagePassed=0,t.onScreen=(t.topVisible||t.passing)&&!t.bottomPassed,t.passing=t.topPassed&&!t.bottomPassed,t.offScreen=!t.onScreen,t.passing&&(t.pixelsPassed=e.top-t.top,t.percentagePassed=(e.top-t.top)/t.height),v.cache.element=t,v.verbose("Updated element calculations",t),t},screenCalculations:function(){var e=v.get.scroll();return v.save.direction(),v.cache.screen.top=e,v.cache.screen.bottom=e+v.cache.screen.height,v.cache.screen},screenSize:function(){v.verbose("Saving window position"),v.cache.screen={height:f.height()}},position:function(){v.save.screenSize(),v.save.elementPosition()}},get:{pixelsPassed:function(e){var t=v.get.elementCalculations();return-1<e.search("%")?t.height*(parseInt(e,10)/100):parseInt(e,10)},occurred:function(e){return v.cache.occurred!==O&&v.cache.occurred[e]||!1},direction:function(){return v.cache.direction===O&&v.save.direction(),v.cache.direction},elementPosition:function(){return v.cache.element===O&&v.save.elementPosition(),v.cache.element},elementCalculations:function(){return v.cache.element===O&&v.save.elementCalculations(),v.cache.element},screenCalculations:function(){return v.cache.screen===O&&v.save.screenCalculations(),v.cache.screen},screenSize:function(){return v.cache.screen===O&&v.save.screenSize(),v.cache.screen},scroll:function(){return v.cache.scroll===O&&v.save.scroll(),v.cache.scroll},lastScroll:function(){return v.cache.screen===O?(v.debug("First scroll event, no last scroll could be found"),!1):v.cache.screen.top}},setting:function(e,t){if(E.isPlainObject(e))E.extend(!0,o,e);else{if(t===O)return o[e];o[e]=t}},internal:function(e,t){if(E.isPlainObject(e))E.extend(!0,v,e);else{if(t===O)return v[e];v[e]=t}},debug:function(){!o.silent&&o.debug&&(o.performance?v.performance.log(arguments):(v.debug=Function.prototype.bind.call(console.info,console,o.name+":"),v.debug.apply(console,arguments)))},verbose:function(){!o.silent&&o.verbose&&o.debug&&(o.performance?v.performance.log(arguments):(v.verbose=Function.prototype.bind.call(console.info,console,o.name+":"),v.verbose.apply(console,arguments)))},error:function(){o.silent||(v.error=Function.prototype.bind.call(console.error,console,o.name+":"),v.error.apply(console,arguments))},performance:{log:function(e){var t,n;o.performance&&(n=(t=(new Date).getTime())-(C||t),C=t,w.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:p,"Execution Time":n})),clearTimeout(v.performance.timer),v.performance.timer=setTimeout(v.performance.display,500)},display:function(){var e=o.name+":",n=0;C=!1,clearTimeout(v.performance.timer),E.each(w,function(e,t){n+=t["Execution Time"]}),e+=" "+n+"ms",x&&(e+=" '"+x+"'"),(console.group!==O||console.table!==O)&&0<w.length&&(console.groupCollapsed(e),console.table?console.table(w):E.each(w,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),w=[]}},invoke:function(i,e,t){var o,a,n,r=m;return e=e||S,t=p||t,"string"==typeof i&&r!==O&&(i=i.split(/[\. ]/),o=i.length-1,E.each(i,function(e,t){var n=e!=o?t+i[e+1].charAt(0).toUpperCase()+i[e+1].slice(1):i;if(E.isPlainObject(r[n])&&e!=o)r=r[n];else{if(r[n]!==O)return a=r[n],!1;{if(!E.isPlainObject(r[t])||e==o)return r[t]!==O?a=r[t]:v.error(s.method,i),!1;r=r[t]}}})),E.isFunction(a)?n=a.apply(t,e):a!==O&&(n=a),Array.isArray(y)?y.push(n):y!==O?y=[y,n]:n!==O&&(y=n),a}};T?(m===O&&v.initialize(),m.save.scroll(),m.save.calculations(),v.invoke(k)):(m!==O&&m.invoke("destroy"),v.initialize())}),y!==O?y:this},E.fn.visibility.settings={name:"Visibility",namespace:"visibility",debug:!1,verbose:!1,performance:!0,observeChanges:!0,initialCheck:!0,refreshOnLoad:!0,refreshOnResize:!0,checkOnRefresh:!0,once:!0,continuous:!1,offset:0,includeMargin:!1,context:F,throttle:!1,type:!1,zIndex:"10",transition:"fade in",duration:1e3,onPassed:{},onOnScreen:!1,onOffScreen:!1,onPassing:!1,onTopVisible:!1,onBottomVisible:!1,onTopPassed:!1,onBottomPassed:!1,onPassingReverse:!1,onTopVisibleReverse:!1,onBottomVisibleReverse:!1,onTopPassedReverse:!1,onBottomPassedReverse:!1,onLoad:function(){},onAllLoaded:function(){},onFixed:function(){},onUnfixed:function(){},onUpdate:!1,onRefresh:function(){},metadata:{src:"src"},className:{fixed:"fixed",placeholder:"constraint",visible:"visible"},error:{method:"The method you called is not defined.",visible:"Element is hidden, you must call refresh after element becomes visible"}}}(jQuery,window,document);
;
//# sourceMappingURL=scripts.js.map