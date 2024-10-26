export class Manager {
    private _sessionId: number;
    private _bbnum: number;
    private _fpshigh: number;
    private _fpslow: number;
    private _lastFrameTimeHigh: number;
    private _lastFrameTimeLow: number;
    private _riseSpeed: number;
    private _animstate: string;
    constructor(
        sessionId: number = 1, 
        bbnum: number = 20, 
        fpshigh: number = 60,
        fpslow: number = 0,
        lastFrameTimeHigh: number = 0,
        lastFrameTimeLow: number = 0,
        riseSpeed: number = 1,
        animstate: string = "init"
    ) {
        this._sessionId = sessionId;
        this._bbnum = bbnum;
        this._fpshigh = fpshigh;
        this._fpslow = fpslow;
        this._lastFrameTimeHigh = lastFrameTimeHigh;
        this._lastFrameTimeLow = lastFrameTimeLow;
        this._riseSpeed = riseSpeed;
        this._animstate = animstate;
        this.update = {
            sessionId: (value: number) => {
                this._sessionId = value;
            },
            bbnum: (value: number) => {
                this._bbnum = value;
            },
            fpshigh: (value: number) => {
                this._fpshigh = value;
            },
            fpslow: (value: number) => {
                this._fpslow = value;
            },
            lastFrameTimeHigh: (value: number) => {
                this._lastFrameTimeHigh = value;
            },
            lastFrameTimeLow: (value: number) => {
                this._lastFrameTimeLow = value;
            },
            riseSpeed: (value: number) => {
                this._riseSpeed = value;
            },
            animstate: (value: string) => {
                this._animstate = value;
            }
        };
    }
    get value() {
        
        return {
            sessionId: this._sessionId,
            bbnum: this._bbnum,
            fpshigh: this._fpshigh,
            fpslow: this._fpslow,
            lastFrameTimeHigh: this._lastFrameTimeHigh,
            lastFrameTimeLow: this._lastFrameTimeLow,
            riseSpeed: this._riseSpeed,
            animstate: this._animstate,
        };
        
    }
    public update: {
        sessionId: (value: number) => void;
        bbnum: (value: number) => void;
        fpshigh: (value: number) => void;
        fpslow: (value: number) => void;
        lastFrameTimeHigh: (value: number) => void;
        lastFrameTimeLow: (value: number) => void;
        riseSpeed: (value: number) => void;
        animstate: (value: string) => void;
    };
    public outputLog(): void {
        console.log(this.value);
    }
    
}

// // 初期化の例（引数なしでもデフォルト値が設定される）
// const manager = new Manager(); 
// manager.update.animstate("paused"); // animstate を "paused" に更新
// // 値の取得
// console.log(manager.value.sessionId); // 1（デフォルト値）
// console.log(manager.value.animstate); // 1（デフォルト値）
// // 値の更新
// manager.update.sessionId(2); // sessionId を 2 に更新

// // 更新後の値を確認
// console.log(manager.value.sessionId); // 2