/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function()
{
	var adapter, name, version;
	var knife = function(args)
	{
		this.version = "0.1";
		this.library = 
		{
			name: name,
			version: version
		};
		this.length = 0;
		var results = null;
		var self = this;
		function addResult(r)
		{
			if (!results) results=[];
			results.push(r);
			self.length = results.length;
		}
		this.get = function(idx)
		{
			return results ? results[idx] : null;
		};
		this.attr = function(name,value)
		{
			if (typeof(value)=='undefined')
			{
				return adapter.attr(results[0],name,value);
			}
			adapter.attr(results[0],name,value);
			return this;
		};
		this.css = function(name,value)
		{
			if (typeof(value)=='undefined')
			{
				return adapter.css(results[0],name,value);
			}
			adapter.css(results[0],name,value);
			return this;
		};
		this.find = function(selector,context)
		{
			adapter.find(addResult,selector,context);
			return this;
		};
		this.html = function(content)
		{
			if (typeof(content)=='undefined')
			{
				return adapter.html(results[0]);
			}
			adapter.html(results[0],content);
			return this;
		}
		this.toString = function()
		{
			return '[swiss <'+(results ? results.length : 0)+'>]';
		}
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
						addResult(arg1);
						return this;
					}
				}
			}
		}
		return this;
	};
	window.swiss = function()
	{
		if (adapter == null)
		{
			throw "swiss: no adapter registered, not very useful right now";
		}
		return new knife(arguments);
	}
	window.swissRegister = function(n,v,impl)
	{
		adapter = impl;
		name = n;
		version = v;
	};
})();

