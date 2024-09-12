import { LabeledText } from "../../../../../util/label/LabeledText";
import Main from "~/Main";

export default function Page() {
  return (
    <Main>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">ご注文完了</h1>
        <p className="mb-6">ご注文いただき、誠にありがとうございます。</p>

        <div className="flex items-center mb-6">
          <span className="text-blue-500 mr-2">✓</span>
          <span className="font-semibold">注文内容のご確認</span>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          お客様のご登録メールアドレスへ注文内容を確認メールをお送りいたしました。
          ご注文内容をお間違えがないかご確認ください。ご注文内容は、マイページからもご確認いただけます。
        </p>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <div className="flex justify-between mb-2">
            <span>注文No.</span>
            <span>12345678_001</span>
          </div>
          <div className="flex justify-between">
            <span>商品名</span>
            <span>イラストサンプル</span>
          </div>
        </div>

        <LabeledText text="イラストサンプル" label="購入作品" />
        <LabeledText text="クレジットカード" label="支払方法" />
        <LabeledText text="4,290円(税込)" label="合計価格" />

        <p className="mb-6">購入した商品はマイページよりダウンロードいただけます。</p>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md">
          続けて入荷する
        </button>
      </div>
    </Main>
  )
}