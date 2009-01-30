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
							return this.setResults([arg1]);
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
			attr: function(name,value)
			{
				if (typeof(value)=='undefined')
				{
					return adapter.attr(this.results[0],name,value);
				}
				adapter.attr(this.results[0],name,value);
				return this;
			},
			appendElement: function(el)
			{
				adapter.appendElement(this.results[0],el);
			},
			prependElement: function(el)
			{
				adapter.prependElement(this.results[0],el);
			},	
			appendHTML: function(html)
			{
				adapter.appendHTML(this.results[0],html);
			},
			prependHTML: function(html)
			{
				adapter.prependHTML(this.results[0],html);
			},
			insertHTMLBefore: function(html)
			{
				adapter.insertHTMLBefore(this.results[0],html);
			},
			insertHTMLAfter: function(html)
			{
				adapter.insertHTMLAfter(this.results[0],html);
			},
			remove: function()
			{
				this.results[0].parentNode.removeChild(this.results[0])
			},
			removeAttr: function(name)
			{
				adapter.removeAttr(this.results[0],name);
				return this;
			},
			hasAttr: function(name)
			{
				var value = adapter.attr(this.results[0],name);
				return (value && value!='');
			},
			css: function(name,value)
			{
				if (typeof(value)=='undefined')
				{
					return adapter.css(this.results[0], name);
				}
				adapter.css(this.results[0], name, value);
				return this;
			},
			height: function()
			{
				return adapter.height(this.results[0])
			},
			width: function()
			{
				return adapter.width(this.results[0])
			},
			hasClass: function(name)
			{
				return adapter.hasClass(this.results[0],name);
			},
			addClass: function(name)
			{
				if (this.results == null)return;
				adapter.addClass(this.results[0],name)
				return this;
			},
			removeClass: function(name)
			{
				adapter.removeClass(this.results[0],name)
				return this;
			},
			show: function()
			{
				adapter.css(this.results[0],'display','block');
				swiss(this.results[0]).fire('show');

				return this;
			},
			hide: function()
			{
				adapter.css(this.results[0],'display','none');
				swiss(this.results[0]).fire('hide');
				return this;
			},
			toggle: function()
			{
				swiss(this.results[0])[adapter.css(this.results[0], "display") == "none" ? "show" : "hide"]();
			},
			// --- SELECTOR
			find: function(selector,context)
			{
				var r = [];
				adapter.find(r,selector,context);
				return this.setResults(r);
			},
			each:function (object,callback)
			{
				adapter.each(object,callback);					
			},
			extend:function (defaults,arguments)
			{
				return adapter.extend(defaults,arguments);
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
			// -- HANDLES draggable, droppable, resizaable, selectable, and sortable
			interaction: function(type,options)
			{
				if (adapter[type](this.results[0],options)  == false)
				{
					return null;
				}
				else
				{
					return this;
				}
			},

			// --- ANIMATIONS
			effect: function(name,params)
			{
				if (this.results == null || adapter.effect(this.results[0],name,params) == false)
					return null;
				else	
					return this;
			},
			// --- AJAX
			ajax: function(params)
			{
			  swiss.extend({
			    method: 'GET',
			    url: '/',
			    headers: {},
			    data: null,
			    success: function(){},
			    error: function(){}
			  }, params);
				adapter.ajax(params);
				return this;
			},
		  
			interject: function(url, params, callback)
			{
				adapter.interject(this.results[0], url, params || {}, callback || function() {})
			},
		
			// --- JSON
			toJSON: function(value)
			{
				var object = value 
				if (this.results)
				{
					object = this.results[0];
				}
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

			unfilterJSON: function(str,filter) {
				var m = (filter ||  /^\/\*-secure-([\s\S]*)\*\/\s*$/).exec(str);
				return m ? m[1] : str;
		  	},

		  	isJSON: function(s) {
		    	var str = s.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		    	return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
		  	},

		  	evalJSON: function(str,sanitize) {
		    	var json = swiss.unfilterJSON(str);
		    	try {
		      		if (!sanitize || swiss.isJSON(json)) return eval('(' + json + ')');
		    	} catch (e) { }
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
				// changed - will only work for a single element selector
				//adapter.on(this.results[0],name,params,fn);
				if (this.results == null) return;
				adapter.on(this.results,name,params,fn);

				return this;
			},
			un: function(name,fn)
			{
				adapter.un(this.results[0],name,fn);
				return this;
			},
			toArray:function(value)
			{
				return adapter.toArray(value);
			},
			toString: function()
			{
				return '[swiss <'+(this.results ? this.results.length : 0)+'>]';
			},
			getMouseX: function(e)
			{
				return adapter.getMouseX(e)
			},
			getMouseY: function(e)
			{
				return adapter.getMouseY(e)
			}
		};
		swiss.knife.init.prototype = swiss.knife;
		var statics = ['version','toJSON','getMouseX','getMouseY','evalJSON','unfilterJSON','isJSON','each','extend','toArray','ajax','find','onload','onunload'];
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

