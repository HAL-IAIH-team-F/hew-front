import {FC, useState} from 'react'
import {Canvas} from '@react-three/fiber'

interface User {
  icon?: {
    strUrl: () => string;
  };
}

export const Header: FC<{ user: User | undefined }> = ({}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
      <Canvas
          style={{
            width: "calc(100% - 10px)", // 左右5pxずつの余白を考慮
            height: "200px",
            marginTop: "5px",
            marginRight: "5px",
            marginLeft: "5px",
            backgroundColor: "black",
            borderTopRightRadius: "28px",
            borderTopLeftRadius: "28px",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
            border: isHovered ? '2px solid turquoise' : '2px solid transparent',
            overflow: 'hidden', // ボーダー外の要素を隠す
            transition: 'border 0.3s ease',
            display: 'block', // 親要素に合わせる
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        {/* Three.js のシーンやオブジェクト */}
        <ambientLight intensity={0.5}/>
        <pointLight position={[10, 10, 10]}/>
        <mesh>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color="turquoise"/>
        </mesh>
      </Canvas>
  )
}
export default Header;