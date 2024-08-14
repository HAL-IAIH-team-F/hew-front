import Image from "next/image";
import CustomHeader from '../app/_components/CustomHeader'

export default function Home()  {
  return (
      <main>
          背景色の設定
          <div>
              <CustomHeader title="This is component、こっちはデータを渡してあげてるかな？">
                  <p>お腹空いた、これはPタグ</p>
              </CustomHeader>
          </div>
      </main>
  )
}

// childrenとは？
