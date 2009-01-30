/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function(swiss)
{
	swissRegister("dojo",dojo.version,
	{
		find:function(results,selector,context)
		{
			var result = dojo.query(selector);
			for (var c=0;c<result.length;c++)
			{
				results.push(result[c]);
			}
			return this;
		},
		attr:function(el,name,value)
		{
			if(value)
			{
				dojo.attr(node, name, value);
			}
			else
			{
				return dojo.attr(node, name);
			}
		},
		removeAttr: function(el,name)
		{
			dojo.removeAttr(el, name);
		},
		css:function(el,params1,params2)
		{
			if (typeof(params1)=='object')
			{
				dojo.style(el, params1);
			}
			else
			{
				dojo.style(el, params1, params2);
			}
		},
		html:function(el, content)
		{
			if (typeof(content)=='undefined')
			{
				return el.innerHTML;
			}
			dojo.query(el)[0].innerHTML = content;
		},
		effect:function(el,name,params)
		{
			dojo.style(name, params);
		},
		ajax:function(params)
		{
		  dojo.xhr(method: params['method'],
		      args: {
            url: params['url'],
            headers: params['headers'],
            content: params['data']
            load: function(data, ioArgs){
              params['success'](data);
            },
            error: function(data, ioArgs){
              params['error'](ioArgs.xhr);
            }
          },
          hasBody: (params['method'].toUpperCase() === 'POST'
              || params['method'].toUpperCase() === 'PUT')
      );
		},
		toJSON:function(o)
		{
			dojo.toJson(o);
		},
		onload:function(fn)
		{
			dojo.addOnLoad(fn);
		},
		onunload:function(fn)
		{
		},
		fire:function(el,name,params)
		{
		},
		on:function(el,name,params,fn)
		{
			dojo.event.connect(el, name, 'helloPressed')
		},
		un:function(el,name,fn)
		{
		}
	});
})(window.swiss);
