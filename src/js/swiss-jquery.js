/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function(swiss)
{
	swissRegister("jquery",jQuery(document).jquery,
	{
		find:function(results,selector,context)
		{
			var result = jQuery(selector,context);
			for (var c=0;c<result.length;c++)
			{
				results.push(result.get(c));
			}
			return this;
		},
		attr:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return jQuery(el).attr(name);
			}
			return jQuery(el).attr(name,value);
		},
		removeAttr: function(el,name)
		{
			return jQuery(el).removeAttr(name);
		},
		css:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return jQuery(el).css(name);
			}
			return jQuery(el).css(name,value);
		},
		html:function(el,content)
		{
			if (typeof(content)=='undefined')
			{
				return jQuery(el).html();
			}
			jQuery(el).html(content);
		},
		effect:function(el,name,params)
		{
		},
		ajax:function(params)
		{
		},
		onload:function(fn)
		{
			return jQuery(fn);
		},
		onunload:function(fn)
		{
			return jQuery(window).unload(fn);
		},
		fire:function(el,name,params)
		{
			return jQuery(el).trigger(name,params);
		},
		on:function(el,name,params,fn)
		{
			return jQuery(el).bind(name,params,fn);
		},
		un:function(el,name,fn)
		{
			return jQuery(el).unbind(name,fn);
		}
	});
})(window.swiss);
