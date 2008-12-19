/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
;(function()
{
	try
	{
		var adapter;
		var swiss = window.swiss = function()
		{
			if (adapter == null && arguments.length > 0)
			{
				throw "swiss: no adapter registered, not very useful right now";
			}
			return new swiss.knife.init(arguments);
		};
		swiss.knife = swiss.prototype = 
		{
			version: "0.1",
			length:0,
			results:null,
			init: function(args)
			{
				if (args.length == 0) return this;
				var arg1 = args[0];
				if (arg1)
				{
					switch(typeof(arg1))
					{
						case 'string':
						{
							return this.find.apply(this,args);
						}
						case 'function':
						{
							return this.onload.apply(this,args);
						}
						case 'object':
						{
							// object is a DOM element
							if ( arg1.nodeType ) 
							{
								return this.setResults([arg1]);
							}
						}
					}
				}
				return this;
			},
			get: function(idx)
			{
				return this.results ? this.results[idx] : null;
			},
			setResults:function(r)
			{
				if (r && r.length > 0)
				{
					// faster push from jQuery
					this.length = 0;
					this.results = r;
				}
				return this;
			},
			// -- CSS/ATTRIBUTES
			attr: function(name,value)
			{
				if (typeof(value)=='undefined')
				{
					return adapter.attr(this.results[0],name,value);
				}
				adapter.attr(this.results[0],name,value);
				return this;
			},
			removeAttr: function(name)
			{
				adapter.removeAttr(this.results[0],name);
				return this;
			},
			hasAttr: function(name)
			{
				var value = adapter.attr(name);
				return (value && value!='');
			},
			css: function(name,value)
			{
				if (typeof(value)=='undefined')
				{
					return adapter.css(this.results[0],name,value);
				}
				adapter.css(this.results[0],name,value);
				return this;
			},
			hasClass: function(name)
			{
				var value = adapter.css('class');
				if (value)
				{
					var tokens = value.split(' ');
					for (var c=0;c<tokens.length;c++)
					{
						if (tokens[c]==name)
						{
							return true;
						}
					}
				}
				return false;
			},
			addClass: function(name)
			{
				var value = adapter.css('class');
				if (!value)
				{
					adapter.css('class',name);
					return this;
				}
				value = value + ' '+name;
				adapter.css('class',value);
				return this;
			},
			removeClass: function(name)
			{
				var value = adapter.css('class');
				if (value)
				{
					var newtokens = [];
					var tokens = value.split(' ');
					for (var c=0;c<tokens.length;c++)
					{
						if (tokens[c]!=name)
						{
							newtokens.push(tokens[c]);
						}
					}
					adapter.css('class',newtokens.join(' '));
				}
				return this;
			},
			show: function()
			{
				adapter.css(this.results[0],'display','');
				return this;
			},
			hide: function()
			{
				adapter.css(this.results[0],'display','none');
				return this;
			},
			// --- SELECTOR
			find: function(selector,context)
			{
				var r = [];
				adapter.find(r,selector,context);
				return this.setResults(r);
			},
			// --- HTML
			html: function(content)
			{
				if (typeof(content)=='undefined')
				{
					return adapter.html(this.results[0]);
				}
				adapter.html(this.results[0],content);
				return this;
			},
			// --- ANIMATIONS
			effect: function(name,params)
			{
				adapter.effect(this.results[0],name,params);
				return this;
			},
			// --- AJAX
			ajax: function(params)
			{
				adapter.ajax(params);
				return this;
			},
			// --- JSON
			toJSON: function(value)
			{
				var object = value || this.results[0];
				if (adapter.toJSON)
				{
					return adapter.toJSON(object);
				}
				var type = typeof object;
				switch (type) {
				  case 'undefined':
				  case 'function':
				  case 'unknown': return 'null';
				  case 'number':
				  case 'boolean': return value;
				  case 'string': return "\""+value+"\"";
				}

				if (object === null) return 'null';
				if (object.toJSON) return object.toJSON();
				if (object.nodeType == 1) return 'null';

				var objects = [];

				for (var property in object) 
				{
				   var value = object[property];
				   if (value !== undefined)
				   {
				   	  objects.push(this.toJSON(property) + ': ' + this.toJSON(value));
				   }
				}
				return '{' + objects.join(', ') + '}';
			},
			evalJSON: function(value)
			{
				var object = value || this.results[0];
				if (adapter.evalJSON)
				{
					return adapter.evalJSON(object);
				}
				try
				{
					return eval('(' + object + ')')
				}
				catch (E)
				{
					return null;
				}
			},
			// --- ONLOAD/UNLOAD
			onload: function(fn)
			{
				adapter.onload(fn);
				return this;
			},
			onunload: function(fn)
			{
				adapter.onunload(fn);
				return this;
			},
			// --- EVENTS 
			fire: function(evt,params)
			{
				adapter.fire(this.results[0],evt,params);
				return this;
			},
			on: function(name,params,fn)
			{
				adapter.on(this.results[0],name,params,fn);
				return this;
			},
			un: function(name,fn)
			{
				adapter.un(this.results[0],name,fn);
				return this;
			},
			toString: function()
			{
				return '[swiss <'+(this.results ? this.results.length : 0)+'>]';
			}
		};
		swiss.knife.init.prototype = swiss.knife;
		var statics = ['version','toJSON','evalJSON'];
		for (var c=0;c<statics.length;c++)
		{
			var name = statics[c];
			swiss[name]=swiss.knife[name];
		}
		window.swissRegister = function(n,v,impl)
		{
			adapter = impl;
			swiss.library = {name:n,version:v};
		};
	}
	catch (E)
	{
		alert("Error in Swiss: "+E);
	}
})();

