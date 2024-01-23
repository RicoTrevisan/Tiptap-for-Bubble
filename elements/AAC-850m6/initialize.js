function(instance, context) {
    
    // add display: flex to main element
    instance.canvas.css("display", "flex");
        

    // this boolean turns true after the setup has been done, but the editor might not yet be initialized.
    // if the setup runs twice, it can add double initial data, etc.
    instance.data.isEditorSetup = false;
    
    // this boolean turns true when the editor is initialized and ready.
	instance.data.editor_is_ready = false;


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

    instance.data.debounce = function(func, delay = 1000) {
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

    instance.data.returnAndReportErrorIfEditorNotReady = (errorFragment = "error") => {
        const message = `Tried to run ${errorFragment} before editor was ready. Crash prevented. Returning`
        console.log(message);
        context.reportDebugger(message);
        return
    }

      
}