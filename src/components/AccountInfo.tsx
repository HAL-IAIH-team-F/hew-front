import React from 'react';

interface AccountInfoProps {
  username: string;
  avatar: string; // アバター画像URL
}

const AccountInfo: React.FC<AccountInfoProps> = ({ username, avatar }) => {
  return (
    <div
      className="flex"
      style={{
        position: 'absolute', // 位置を絶対指定
        top: '20px', // 上からの距離
        right: '20px', // 右からの距離
        zIndex: 1000, // 重なり順序を最前面に設定
      }}
    >
      {/* Avatar Section */}
      <div className="flex flex-col items-center mr-4">
        <img
          src={avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-2 border-gray-600"
        />
      </div>
    </div>
  );
};

export default AccountInfo;
