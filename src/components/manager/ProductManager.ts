export class Productmanager {
    private _productId: string;
    private _isWindowOpen: boolean;
    
    constructor(
        productId: string = "none",
        isWindowOpen: boolean = false,
    ) {
        this._productId = productId;
        this._isWindowOpen = isWindowOpen;
        this.update = {
            productId: (value: string) => {
                this._productId = value;
            },
            isWindowOpen: (value: boolean) => {
                this._isWindowOpen = value;
            },
        };
    }

    // 値の取得
    get value() {
        return {
            productId: this._productId,
            isWindowOpen: this._isWindowOpen,
        };
    }

    // Update用のオブジェクト
    public update: {
        
        productId: (value: string) => void;
        isWindowOpen: (value: boolean) => void;
    };

    // ログ出力メソッド
    public outputLog(): void {
        console.log(this.value);
    }

    // 現在ウィンドウが開かれているかチェック
    public isWindowCurrentlyOpen(): boolean {
        return this._isWindowOpen;
    }

    // ウィンドウの状態を変更
    public toggleWindowState(): void {
        this._isWindowOpen = !this._isWindowOpen;
        console.log(`Window state toggled: ${this._isWindowOpen ? "Open" : "Closed"}`);
    }
}
