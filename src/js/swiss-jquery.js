/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function(swiss)
{
	swissRegister("jquery",jquery.jquery,
	{
		find:function(scope,selector,context)
		{
			var result = jQuery(selector,context);
			for (var c=0;c<result.length;c++)
			{
				scope(result.get(c));
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
		}
	});
})(window.swiss);
