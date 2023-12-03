function(instance, context) {
    
    // add display: flex to main element
    instance.canvas.css("display", "flex");
        

    // this boolean turns true after the setup has been done, but the editor might not yet be initialized.
    // if the setup runs twice, it can add double initial data, etc.
    instance.data.isEditorSetup = false;
    
    // this boolean turns true when the editor is initialized and ready.
	instance.data.editor_is_ready = false;

    // autobinding can be overwhelmed by Tiptap. To handle that, this boolean turns true while setTimeout is running.
    instance.data.autobinding_processing = false;
    instance.publishState('is_ready', false);
    
//    instance.canvas.css({'overflow':'scroll'});
	
    instance.data.stylesheet = document.createElement('style');
    instance.canvas.append(instance.data.stylesheet);
    
     
    // function to find the nearest parent.
    // useful when Tiptap is used inside a repeating group
    instance.data.findElement = function (elementID) {
        let $parent = instance.canvas.parent();
        while ($parent.length > 0) {
            var $foundMenu = $parent.find('#' + elementID);

            if ($foundMenu.length > 0) {
                return $foundMenu[0];
            }

            $parent = $parent.parent();
        }

    };

    instance.data.debounce = function(func, delay) {
        let timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, arguments);
            }, delay);
        };
    }
    
    

    
    // throttle function: to take it easy on the autobinding.
    // 1. writes to autobinding
    // 2. then waits a certain delay
    // 3. then writes again if the user created more changes
    // source: from https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/code
    
    instance.data.throttle = (callback, delay = 1000) => {
 
        instance.data.shouldWait = false
        instance.data.timeoutFunc = () => {

            if (instance.data.waitingArgs == null) {
                instance.data.shouldWait = false

            } else {
                callback(...instance.data.waitingArgs)
                instance.data.waitingArgs = null
                setTimeout(instance.data.timeoutFunc, delay)
                
            }
        }

        return (...args) => {
            if (instance.data.shouldWait) {            
                instance.data.waitingArgs = args
                return
            }
            
            callback(...args)
            instance.data.shouldWait = true

            setTimeout(instance.data.timeoutFunc, delay)
        }
    }


    
    instance.data.writeToAutobinding = instance.data.throttle(() => {
        console.log("writing to autobinding, editor: " + instance.data.tiptapEditorID)
        instance.publishAutobinding(instance.data.editor.getHTML());

    }, 2000);

    
    // transform rgba to hex so that it can be used in the collab mode
   instance.data.rgbaToHex = (rgba) => {

       console.log("transforming rgba color", rgba);
       if (!rgba) {
           console.log("color is empty, returning");
           return
       }
        // Check if input is properly formatted
        if(!/^rgba?\([\d+,\s*]{3}(1|0?\.?\d*)\)?$/i.test(rgba)) {
            console.log("color is not rgba, returning color", rgba)            
            return rgba
        }

        let parts = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(1|0?.?\d*))?\)$/i);

        let r = parseInt(parts[1]).toString(16).padStart(2, '0'),
            g = parseInt(parts[2]).toString(16).padStart(2, '0'),
            b = parseInt(parts[3]).toString(16).padStart(2, '0'),
            a = (parts[4] === undefined) ? 'FF' : Math.round(parseFloat(parts[4]) * 255).toString(16).padStart(2, '0');

        let hex = '#' + r + g + b + a;

       console.log("hexed color", hex);
        return hex;
    }
    
/*    instance.data.rgbaToHex = (rgba) => {
        let parts = rgba.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(1|0?\.?\d*))?\)$/i
        );
        let r = (parts[1] | (1 << 8)).toString(16).slice(1),
            g = (parts[2] | (1 << 8)).toString(16).slice(1),
            b = (parts[3] | (1 << 8)).toString(16).slice(1),
            a = ((parts[4] || "") === "" ? 255 : parts[4] * 255)
        .toString(16)
        .slice(1 / 0.5),
            hex = "#" + r + g + b + a;
        return hex;
    };*/

      
}