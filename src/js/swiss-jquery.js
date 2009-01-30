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
		each: function(array,callback)
		{
			jQuery(array).each(callback);
		},
		extend: function(defaults,arguments)
		{
			return jQuery.extend(defaults,arguments);
		},
		appendElement: function(el,el2)
		{
			jQuery(el2).appendTo(el)
		},
		prependElement: function(el,el2)
		{
			jQuery(el2).prependTo(el)
		},
		appendHTML: function(el,html)
		{
			jQuery(el).append(html)
		},
		prependHTML: function(el,html)
		{
			jQuery(el).prepend(html)
		},
		insertHTMLAfter: function(el,html)
		{
			jQuery(el).after(html)
		},
		insertHTMLBefore: function(el,html)
		{
			jQuery(el).before(html)
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
		hasClass: function(el,name)
		{
			return jQuery(el).hasClass(name);
		},
		addClass: function(el,name)
		{
			return jQuery(el).addClass(name);
		},
		removeClass: function(el,name)
		{
			return jQuery(el).removeClass(name)
		},
		css:function(el,name,value)
		{
			if (typeof(value)=='undefined')
			{
				return jQuery(el).css(name);
			}
			if (name == 'display' || name == 'visibility')
			{
				if (value == 'hidden' || value == 'none')
				{
					jQuery(el).trigger('hide', [{'key':name,'value':value}])					
				}
				else
				{
					jQuery(el).trigger('show', [{'key':name,'value':value}])
				}
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
		ajax:function(params)
		{ 
			jQuery.ajax({
  		  type: params['method'],
  		  url: params['url'],
        beforeSend: function(xhr){
          for(var header in params['headers']){
            xhr.setRequestHeader(header, params['headers'][header]);
          }
        },
  		  data: params['data'],
  		  success: function(data, status){
  		    params['success'](data);
		    },
  		  error: function(xhr, status, errorMsg){
  		    params['error'](xhr);
		    }
			});
		},
		interject:function(el, url, params, callback)
		{
			return jQuery(el).load(url, params, callback);
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
		},
		toArray: function(value)
		{
			return jQuery.makeArray(value);
		},
		draggable: function(el,options)
		{
			if (!jQuery(el)['draggable'])
			{
				return false;
			}
			if (!options.start)
			{
				options.start = function(e,ui)
				{
					jQuery(el).trigger('dragstart',[{event:e,ui:ui}])
				}
			}
			if (!options.stop)
			{
				options.stop = function(e,ui)
				{
					jQuery(el).trigger('dragend',[{event:e,ui:ui}])
				}
			}
			if (!options.drag)
			{
				options.drag = function(e,ui)
				{
					jQuery(el).trigger('drag',[{event:e,ui:ui}])
				}
			}
			return jQuery(el)['draggable'](options);
		},
		sortable: function(el,options)
		{
			if (!jQuery(el)['sortable'])
			{
				return false;
			}
			if (!options.update)
			{
				options.update = function(e,ui)
				{
					jQuery(el).trigger('sortupdate',[{event:e,ui:ui}])
				}
			}
			if (!options.start)
			{
				options.start = function(e,ui)
				{
					jQuery(el).trigger('sortstart',[{event:e,ui:ui}])
				}
			}
			if (!options.end)
			{
				options.end = function(e,ui)
				{
					jQuery(el).trigger('sortend',[{event:e,ui:ui}])
				}
			}

			if (!options.change)
			{
				options.change = function(e,ui)
				{
					jQuery(el).trigger('sortchange',[{event:e,ui:ui}])
				}
			}

			jQuery(el)['sortable'](options);
		},

		droppable: function(el,options)
		{
			if (!jQuery(el)['droppable'])
			{
				return false;
			}
			if (!options.drop)
			{
				options.drop = function(e,ui)
				{
					jQuery(el).trigger('drop',[{event:e,ui:ui}])
				}
			}
			if (!options.out)
			{
				options.out = function(e,ui)
				{
					jQuery(el).trigger('dropout',[{event:e,ui:ui}])
				}				
			}
			if (!options.over)
			{
				options.over = function(e,ui)
				{
					jQuery(el).trigger('dropover',[{event:e,ui:ui}])
				}
			}
			jQuery(el)['droppable'](options);
		},
		selectable: function(el,options)
		{
			if (!jQuery(el)['selectable'])
			{
				return false;
			}
			if (!options.selecting)
			{
				options.selecting = function(e,ui)
				{
					if (ui.selecting)
						jQuery('#'+ui.selecting.id).trigger('selecting',[{event:e,ui:ui}])
				}				
			}
			if (!options.selected)
			{
				options.selected = function(e,ui)
				{
					if (ui.selected)
						jQuery('#'+ui.selected.id).trigger('selected',[{event:e,ui:ui}])
				}
			}
			if (!options.unselected)
			{
				options.unselected = function(e,ui)
				{
					if (ui.unselected)
						jQuery('#'+ui.unselected.id).trigger('unselected',[{event:e,ui:ui}])
				}				
			}
			jQuery(el)['selectable'](options);
		},

		resizable: function(el,options)
		{
			if (!jQuery(el)['resizable'])
			{
				return false;
			}
			if (!options.start)
			{
				options.start = function(e,ui)
				{
					jQuery(el).trigger('resizestart',[{event:e,ui:ui}])
				}
			}
			if (!options.stop)
			{
				options.stop = function(e,ui)
				{
					jQuery(el).trigger('resizeend',[{event:e,ui:ui}])
				}
			}
			if (!options.resize)
			{
				options.resize = function(e,ui)
				{
					jQuery(el).trigger('resize',[{event:e,ui:ui}])
				}
			}

			jQuery(el)['resizable'](options);
		},

		effect: function(el,effect,options)
		{
			var isHide = this.isHideEffect(effect);
			var isUI = this.isUIEffect(effect)
			if (isHide == true)
			{
				jQuery(el).trigger('hide');
			}
			// jQuery has 3 types of effects: core, effect and hide extensions
			if (!jQuery(el)[effect] && isHide == false && isUI == false)
			{
				return false;
			}

			var opts = this.formatEffectOptions(effect,options);
			
			// hide effects 
			if (isHide == true)
			{
				jQuery(el).hide(effect,opts[0],opts[1])				
			}
			// ui effects
			else if (isUI == true)
			{
				jQuery(el).effect(effect,opts[0],opts[1])
			}
			else if (effect == 'animate')
			{
				jQuery(el)[effect](opts[0],opts[1],opts[2])
			}
			else
			{
				jQuery(el)[effect](opts[0],opts[1])
			}
		},
		isUIEffect: function(effect)
		{
			var effects = ['scale','size','pulsate','bounce','highlight','shake','transfer']
			var valid = false
			jQuery.each(effects,function()
			{
				if (this == effect)
				{
					valid = true;
				}
			})
			return valid;
		},
		isHideEffect: function(effect)
		{
			var effects = ['blind','clip','drop','explode','fold','puff','slide'];
			var valid = false
			jQuery.each(effects,function()
			{
				if (this == effect)
				{
					valid = true;
				}
			})
			return valid;
		},
		formatEffectOptions: function(effect,options)
		{
			var opts = [];
			switch(effect)
			{
				// options  - need to do this first
				case 'blind':
				case 'clip':
				case 'drop':
				case 'explode':
				case 'fold':
				case 'puff':
				case 'slide':
				case 'scale':
				case 'size':
				case 'pulsate':
				case 'bounce':
				case 'hightlight':
				case 'shake':
				case 'transfer':
				case 'animate':
				{
					if (options.options)
					{
						var opt = {};
						// options=to:{foo:bar;foo:bar};foo:bar,
						var parts = options.options.split(';')
						for (var i=0;i<parts.length;i++)
						{
							var nvPairs = parts[i].split(':');
							opt[nvPairs[0]] = nvPairs[1]
						}
						opts.push(opt)
					}
				}
				
				// speed option - need to do this second
				case 'animate':
				case 'fadeOut':
				case 'fadeIn':
				case 'slideDown':
				case 'slideUp':
				case 'toggle' :
				case 'hide':
				case 'show':
				case 'slideToggle':
				case 'fadeTo':
				{
					if (options.speed)
					{
						if (isNaN(options.speed) == true)
						{
							options.speed = '"'+options.speed+'"';
						}
						opts.push(options.speed);
					}
				}
				//opacity option - need to do this third
				case 'fadeTo':
				{
					if (options.opacity)
					{
						opts.push(options.opacity)
					}
				}
				//easing option - need to this fourth
				case 'animate':
				{
					if (options.easing)
					{
						options.push('"'+options.easing+'"');
					}
				}

			}
			return opts;
		},
		height: function(el)
		{
			return jQuery(el).height();
		},
		width: function(el)
		{
			return jQuery(el).width();
		},
		getMouseY: function(ev)
		{
			return ev.pageY;
		},
		getMouseX: function(ev)
		{
			return ev.pageX;
		}

	});
})(window.swiss);
