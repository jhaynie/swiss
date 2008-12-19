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

	swissRegister("prototype", Prototype.Version,
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
				return Element.readAttribute(el,name);
			}
			return Element.writeAttribute(el,name,value);
		},
		css:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return Element.getStyle(el,name);
			}
			var params = {};
			params[name]=value;
			Element.setStyle(el,params);
		},
		html:function(el,content)
		{
			if (typeof(content)=='undefined')
			{
				return el.innerHTML;
			}
			return Element.update(el,content);
		}
	});
})(window.swiss);
