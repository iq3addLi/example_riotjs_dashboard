var self = this

riot.compile(function() {
    self.app = riot.mount("app")[0]
})

// global function json
var observers = []
global = {
    addObserver : function( observer, key, func ){
        riot.observable(observer)
        observer.on(key, func)
        observers.push( observer )
    },
    
    post : function( key, param ){
        for ( var index in observers ){
            observers[index].trigger(key,param)
        }
    },
    reload : function(){
        self.app = riot.mount("app")[0]
    },
    isLogin : function(){
        if (!localStorage["session"]) return false
            
        var session = JSON.parse(localStorage["session"])
        var expired = new Date( session.expired )
        var now     = new Date()
        
        // console.log("session.expired=" + session.expired + " expired=" + expired + " now=" + now )
        
        if ( expired.getTime() > now.getTime() ){
            return true
        }else{
            localStorage.removeItem("session")
            global.notify( "warning", "Session timeout." )
            return false
        }
    },
    
    notify : function( type, message ){
        $.notify({
            icon: type,
            message: message
        },
        {
            type: type,
            timer: 1500,
            placement: {
                from: "top",
                align: "right"
            }
        })
    }
}

