import React from "react";
import { useInView } from "react-intersection-observer";

export const Header: React.FC = () => {
    const App: React.FC = () => {
        const { ref, inView } = useInView({
            threshold: 0, // Trigger when 0% of the ref is visible (can set 0 to 1)
            triggerOnce: false, // Set true to trigger only once
        });

        return (
            <div className="App">
                <div ref={ref}>
                    {/* トップビジュアルのコンポーネント */}
                </div>
                <div className="flex">
                    {/* ↓追従させたいヘッダー */}
                    <header className={inView ? "invisible" : "visible"}>
                        <div>...</div>
                    </header>
                    {/* ↑追従させたいヘッダー */}
                    {/* <コンポーネント/> */}
                    {/* <コンポーネント/> */}
                    {/* <コンポーネント/> */}
                </div>
            </div>
        );
    };

    return <App />;
};
