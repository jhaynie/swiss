/*!
 * Swiss - licensed under the Apache Public License 2
 * see LICENSE in the root folder for details on the license. 
 * Copyright (c) 2008 Appcelerator, Inc. All Rights Reserved.
 */
(function(swiss)
{
	//FIXME - can't figure out how to programatically get version
	swissRegister("dojo","_FIXME_",
	{
		find:function(scope,selector,context)
		{
			var results = dojo.query(selector);
		},
		attr:function(el,name,value)
		{
		},
		css:function(el,name,value)
		{
		},
		html:function(el,content)
		{
		}
	});
})(window.swiss);
