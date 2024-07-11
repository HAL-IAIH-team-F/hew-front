# front

## 使用するもの

### 必須

* git
* node
* npm
* Next.js
* tailwind
* docker

### 推奨

* `WebStorm`または`IntelliJ idea`

## setup

1. Gitのインストール
    * https://git-scm.com/downloads
2. Nodejsのインストール
    * https://nodejs.org/en/download/package-manager
3. Dockerのインストール
    * https://www.docker.com/ja-jp/
4. 依存ライブラリのインストール
    * ```shell
      npm install
      ```
5. 開発サーバーの実行
    * ```shell
      npm run dev
      ```

## コーディング規約

### git

1. `develop`ブランチから新しいブランチをディレクトリごとに作成する
    * docディレクトリ
        * ドキュメントに関する追加
    * featureディレクトリ
        * 機能に関する追加
    * fixディレクトリ
        * 修正に関する追加
2. `PullRequest`を作成し、レビューを依頼する
