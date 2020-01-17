
const debounceAndRetryMap: any = {}

export const debounce = ( func: (...args: any) => any, timeMs: number = 500) => {
    const fn: string = func.toString()
    if (debounceAndRetryMap[fn] === undefined) {
        debounceAndRetryMap[fn] = new DebounceAndRetry(func, timeMs)
    }
    debounceAndRetryMap[fn].debounce()
}

export const debounceAndRetry = (func: (...args: any) => any,  timeMs: number = 500, 
                                 retryCond: ((...args: any) => boolean)|boolean = false) => {
    const fn: string = func.toString()
    if (debounceAndRetryMap[fn] === undefined) {
        debounceAndRetryMap[fn] = new DebounceAndRetry(func, timeMs, retryCond)
    }
    debounceAndRetryMap[fn].debounceAndRetry(func, timeMs, retryCond)
}

export class DebounceAndRetry {
    private _timeMs: number = 500
    private _times: number = 0
    private _func: () => any
    private _debounceTimer: any = null
    private _retryTimer: any = null
    private _retryCond: (() => boolean) | null
    private _retryConditionMet: boolean = false
    private _retryLimit: number = 20

    constructor(func: () => any, timeMs: number = 500, retryCond: (() => boolean) | boolean = false) {
        this._func = func
        this._timeMs = timeMs
        this._retryCond = retryCond === true ? this.retryLimitFunc : retryCond ? retryCond : null
    }
    public setRetryLimit = (limit: number) => {
        this._retryLimit = limit
    }
    public debounce = () => {
        clearTimeout(this._debounceTimer)
        this._debounceTimer = setTimeout(() => {
            if (this._retryCond && this._retryConditionMet === false) {
                // do nothing
            } else {
                this._func()
            }
        }, this._timeMs)
    }
    public debounceAndRetry = () => {
        this._retryConditionMet = false
        this.debounce()
        this._retry()
    }
    public retryLimitFunc = () => {
        this._times++
        return this._times >= this._retryLimit
    }
    private _retry = () => {
        this._times = 0
        clearInterval(this._retryTimer)
        this._retryTimer = setInterval(() => {
            if (this._retryCond && this._retryCond()) {
                clearTimeout(this._debounceTimer)
                clearInterval(this._retryTimer)
                this._retryConditionMet = true
                this._func()
            }
        }, this._timeMs)
    }
}
