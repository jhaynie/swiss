/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function(swiss)
{
	swissRegister("name", "version",
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
		each:function(array,callback)
		{
		},
		extend:function(defaults,arguments)
		{
		  return Object.extend(defaults, arguments);
		},
		appendElement:function(el,el2)
		{
		},
		prependElement:function(el,el2)
		{
		},
		appendHTML:function(el,html)
		{
		},
		prependHTML:function(el,html)
		{
		},
		insertHTMLAfter:function(el,html)
		{
		},
		insertHTMLBefore:function(el,html)
		{
		},
		attr:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return Element.readAttribute(el,name);
			}
			return Element.writeAttribute(el,name,value);
		},
		removeAttr:function(el,name)
		{
		},
		hasClass:function(el,name)
		{
		},
		addClass:function(el,name)
		{
		},
		removeClass:function(el,name)
		{
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
		},
		ajax:function(params)
		{ 
  		new Ajax.Request(params['url'], {
    		method: params['method'],
    		requestHeaders: params['headers'],
    		postBody: params['data'],
    		onSuccess: function(xhr){
      			params['success'](xhr.responseText);
    		},
    		onFailure: function(xhr){
      			params['error'](xhr);
    		}
  		});
		},
		toJSON:function(o)
		{
			Object.toJSON(o);
		},
		onload:function(fn)
		{
			document.observe('contentloaded', fn);
		},
		onunload:function(fn)
		{
			document.observe('beforeunload', fn);
		},
		fire:function(el,name,params)
		{
			$(el).fire(name, params);
		},
		on:function(el,name,params,fn)
		{	
			$(el).observe(name, fn);
		},
		un:function(el,name,fn)
		{
			$(el).stopObserving(name, fn);
		},
		toArray:function(value)
		{
		},
		draggable:function(el,options)
		{
		},
		sortable:function(el,options)
		{
		},
		droppable:function(el,options)
		{
		},
		selectable:function(el,options)
		{
		},
		resizable:function(el,options)
		{
		},
		effect:function(el,effect,options)
		{
		},
		isUIEffect:function(effect)
		{
		},
		isHideEffect:function(effect)
		{
		},
		formatEffectOptions:function(effect,options)
		{
		},
		height:function(el)
		{
		},
		width:function(el)
		{
		}
	});
})(window.swiss);
