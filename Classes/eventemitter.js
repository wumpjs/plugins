import EE from "node:events"



class EventEmitter extends EE{
    constructor(){
        super()
        this.emittedEventNames()
        this.eventNames()
    }
    /**
     * 
     * @returns {any[]}
     */
    emittedEventNames(){
        return []
    }
    /**
     * 
     * @returns {any[]}
     */
    emittedEvents(){
        return []
    }
    /**
     * 
     * @param {string | symbol} eventName 
     * @returns 
     */
    hasListener(eventName){
        return super.eventNames().some((e) => e === eventName)
    }
    /**
     * 
     * @param {string | symbol} eventName 
     * @returns 
     */
    emit(eventName, ...args){
        if(!eventName) throw new Error("Event Name is required for action.")
        this.emittedEventNames.push(event)
        this.emittedEvents.push({
            eventName,
            args: args
        })
        return super.emit(eventName, ...args)
    }
    /**
     * 
     * @param {string | symbol} eventName 
     * @returns 
     */
    hasEmit(eventName){
        return this.emittedEventNames.some(eName => eName === eventName)
    }
}

export default ExtendedEventEmitter
