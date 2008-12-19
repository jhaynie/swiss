/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function(swiss)
{
	/** 
	 * From HTML4 spec:
	 *
	 * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
	 * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
	 * underscores ("_"), colons (":"), and periods ("."). 
	 * 
	 * we loosely follow since a lot of people don't start with letter
	 */
	var idExpr = /^#([\w\.-\:_]+)$/;
	swissRegister("mootools",MooTools.version,
	{
		find:function(results,selector,context)
		{
			// prototype takes a normal string and uses
			// $ for element lookup, for selectors it uses
			// $$
			var match = idExpr.exec(selector);
			if (match && match.length == 2)
			{
				results.push($(match[1]));
				return;
			}
			//TODO: context
			var r = $$(selector);
			if (r)
			{
				for (var c=0;c<r.length;c++)
				{
					results.push(r[c]);
				}
			}
		},
		attr:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return $(el).getProperty(name);
			}
			$(el).setProperty(name,value);
		},
		css:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return $(el).getStyle(name);
			}
			$(el).setStyle(name,value);
		},
		html:function(el,content)
		{
			if (typeof(content)=='undefined')
			{
				return $(el).get('html');
			}
			$(el).set('html',content);
		}
	});
})(window.swiss);
