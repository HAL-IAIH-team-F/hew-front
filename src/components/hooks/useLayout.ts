import {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";

const baseCardWidth = 370;
const baseCardHeight = 200;
const minCardWidth = 300;
export default function useLayout(): Layout {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    useEffect(() => {
        const updateWidth = () => {
            if (!containerRef.current) return;
            setContainerWidth(containerRef.current.offsetWidth);
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [containerRef.current]);
    return useMemo(() => {
        const columns = Math.max(1, Math.floor(containerWidth / baseCardWidth));
        const availableWidth = containerWidth - (20 * (columns - 1));
        const cardWidth = Math.max(minCardWidth, Math.min(baseCardWidth, availableWidth / columns));
        const cardHeight = (cardWidth * baseCardHeight) / baseCardWidth;
        return {
            columns,
            cardWidth,
            cardHeight,
            ref: containerRef,
        }
    }, [containerWidth])
}

export interface Layout {
    columns: number,
    cardWidth: number,
    cardHeight: number,
    ref: MutableRefObject<HTMLDivElement | null>
}