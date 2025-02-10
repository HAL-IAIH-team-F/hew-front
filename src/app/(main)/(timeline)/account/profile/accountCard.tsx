import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import useProducts from '~/hooks/useProducts';
import Image from '../../../../../util/Image';
import useCreatorData from '~/hooks/useCreatorData';
import {useUserData} from '~/api/context/useUserData';
import ProductLayout from "~/products/layout/ProductLayout";

const ProductsGrid = () => {
    const {products} = useProducts();
    return (
        <ProductLayout products={products} className="w-full"/>
    );
};

const AccountCard = () => {
    const [activeTab, setActiveTab] = useState("商品");
    const tabs = ["商品", "コラボ", "Media", "Likes"];
    const tabRefs = useRef<{ [key: string]: React.RefObject<HTMLButtonElement> }>(
        Object.fromEntries(tabs.map((tab) => [tab, React.createRef<HTMLButtonElement>()]))
    );
    const {user} = useUserData();
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!contentRef.current) return;
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'translateY(10px)';

        requestAnimationFrame(() => {
            setTimeout(() => {
                if (!contentRef.current) return;
                contentRef.current.style.opacity = '1';
                contentRef.current.style.transform = 'translateY(0)';
            }, 50);
        });
    }, [activeTab]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            <div className="w-full h-48 bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="w-full h-full flex items-center justify-center">
                    {user && user.icon ? (
                        <Image
                            alt="User Icon"
                            src={user.icon.strUrl()}
                            className="object-cover"
                            style={styles.profileIcon}
                        />
                    ) : (
                        <Image
                            alt="Default Icon"
                            src="/icon.png"
                            className="object-cover"
                            style={styles.profileIcon}
                        />
                    )}
                </div>
            </div>

            <div className="border-b border-gray-700">
                <div className="flex justify-center space-x-5 px-4 pb-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            ref={tabRefs.current[tab]}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                px-6 py-3 text-sm rounded-lg transition-all duration-200
                                ${activeTab === tab
                                ? 'bg-gray-700 text-gray-100 font-medium'
                                : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700/50'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div
                ref={contentRef}
                className="flex-1 flex-grow overflow-y-auto transition-all duration-300 ease-out"
                style={{
                    height: "calc(100vh - 200px)",
                    maxHeight: "calc(100vh - 360px)",
                    boxSizing: "border-box",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {activeTab === "商品" && <ProductsGrid/>}
                {activeTab === "コラボ" && <div className="p-6">コラボ content...</div>}
                {activeTab === "Media" && <div className="p-6">Media content...</div>}
                {activeTab === "Likes" && <div className="p-6">Likes content...</div>}
            </div>
        </div>
    );
};

// CreatorData components remain the same
interface CreatorDataViewProps {
    iconUrl: string | null;
    screenId?: string;
}

interface CreatorDataProps {
    creator_id: string;
    showView?: boolean;
    onDataFetched?: (data: { iconUrl: string | null; screenId?: string }) => void;
}

export function CreatorData({creator_id, showView = true, onDataFetched}: CreatorDataProps) {
    const [_, user_data, __] = useCreatorData({creator_id});
    const iconUrl = user_data?.icon ? (user_data.icon as any).strUrl() : null;
    const screenId = user_data?.screen_id;

    useEffect(() => {
        if (onDataFetched) {
            onDataFetched({iconUrl, screenId});
        }
    }, [iconUrl, screenId, onDataFetched]);

    if (!showView) return null;

    return <CreatorDataView iconUrl={iconUrl} screenId={screenId}/>;
}

export function CreatorDataView({iconUrl, screenId}: CreatorDataViewProps) {
    return (
        <div>
            {iconUrl ? (
                <>
                    <Image
                        alt="User Icon"
                        src={iconUrl}
                        width={33}
                        height={33}
                        style={styles.userIcon}
                    />
                    <div style={{...styles.userName, color: 'rgba(255, 255, 255, 0.9)'}}>{screenId}</div>
                </>
            ) : (
                <div>No Icon</div>
            )}
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    userIcon: {
        borderRadius: '50%',
        width: '23px',
        height: '23px',
        objectFit: 'cover',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        border: '2px solid rgba(17, 24, 39, 0.8)',
        top: '60px',
        left: '30px',
    },
    userName: {
        position: 'absolute',
        top: '47px',
        left: '47px',
        color: "rgba(255, 255, 255, 0.9)",
    },
    icon: {
        fontSize: '27px',
        color: 'rgba(255, 255, 255, 0.9)',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
    },
    profileIcon: {
        borderRadius: '50%',
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        border: '2px solid rgba(17, 24, 39, 0.8)',
        top: "10%",
        left: "60%"
    },
    profileuserIcon: {
        borderRadius: '50%',
        width: '43px',
        height: '43px',
        objectFit: 'cover',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        top: '50%',
        left: '50%',
    },
};

export default AccountCard;