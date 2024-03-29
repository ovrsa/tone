## 目次

1. アプリURL
2. 概要
3. 機能紹介
4. 使用画面
5. インストール方法
6. 必須環境
7. 開発環境

## Tone
[Tone](https://tone-ovrsa.vercel.app/)

## 概要 
Google Workspaceの導入後、社員からのフィードバックにより、予定やタスクをもっと網羅的に把握したいというニーズがあることが明らかになりました。この課題を解決するため、社員が業務に必要な予定とタスクを簡単に把握し、効率的に管理できるアプリケーションを開発しました。

当アプリケーションは、社員が業務上の予定とタスクを一つの画面で網羅的に表示し、直感的な操作で予定を登録できるようにすることで、予定とタスクの把握を容易にし、業務効率の向上を実現します。また、本アプリケーションは、Google Workspaceとの連携ができるため、既存の業務環境とシームレスに連携し、業務効率の向上に大きく貢献します。
※Google Calenderとの連携は現在調整中

当アプリケーションを使用することで、社員は業務に必要な情報を簡単に把握できるため、迅速かつ正確な判断ができ、業務効率が大きく向上することが期待されます。

## 機能紹介
1. 認証機能
- サインアップ
- サインイン
- ログアウト

2. 予定管理機能
- 予定追加機能
- 日程による並び替え機能
- 重要度でフィルタリング機能
- 予定の編集/削除機能

3. カレンダー連携機能
- カレンダーから日程の登録機能

## 実装予定機能
- ダークモード ライトモード の対応
- Google Calendarとの連携
- カレンダーのみのページを用意

## 使用画面
| TOP | 新規登録 | ログイン |
| :---: | :---: | :---: |
| ![Top](public/images/Top.jpg) | ![Signup](public/images/Signup.jpg) | ![Signin](public/images/Signin.jpg) |
| こちらのページからSignupかSigninに遷移 | メールアドレスかGoogleアカウントでログイン | メールアドレスかGoogleアカウントで新規登録 |
| 予定追加 | フィルタリング1 | フィルタリング2 |
| ![addTask](public/images/addTasks.jpg) | ![Filter](public/images/Filter.jpg) | ![Sort](public/images/Sort.jpg) |
  | 予定のタイトルを入力してEnterキーを押すと下に追加される | 重要度によって並び替え | 日程よって並び替え |
| 編集 | 日程の登録 |  |
| ![Edit](public/images/Edit.jpg) | ![Calender](public/images/Calender.jpg) |  |
| 登録されたタイトルを押すと編集画面が表れる、左上：重要度選択、右上：日程選択、title：タイトルを入力、deital：予定の詳細を入力 | カレンダーから日程の登録 |  |

## インストール方法
### 必須環境のインストール方法
1. Node.jsのインストール
Node.jsがインストールされていない場合は、以下のサイトからダウンロードしてインストールします。
- https://nodejs.org/

2. Yarnのインストール
Node.jsがインストールされている場合は、以下のコマンドでyarnをinstallします。
`npm install -g yarn`

または、以下のサイトからダウンロードしてインストールします。
- https://classic.yarnpkg.com/en/docs/install/

### ローカル実行の手順
1. リポジトリのクローン
GitHubからリポジトリをクローンします。
`git clone https://github.com/ovrsa/reminder.git`

2. クローンしたリポジトリのディレクトリに移動する。
`cd your-repository`

3. 必要なパッケージをインストールする。
`yarn install`

4. アプリを起動する。
`yarn start`

5. ブラウザで http://localhost:3000/ を開く。

## 必須環境
node (v19.7.0 以上)

## 開発環境
### フロントエンド
- HTML
- CSS
- TypeScript
- React (v18.0.0)
- Next (v12.1.5)
- recoil
- recoil-persist
- uuid (v8.3.2)
- chakra-ui (v2.0.8)
- date-fns
- framer-motion

### バックエンド
- firebase (v9.14.0)
