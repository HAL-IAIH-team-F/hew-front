import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {FaSearch, FaTimes} from "react-icons/fa";
import SearchPage from "@/(main)/search/search";
import {gsap} from "gsap";

// ボタンのスタイル
const useButtonStyles = (isHovered: boolean) => {
  return useMemo(() => ({
    button: {
      position: "absolute" as const,
      top: 20,
      left: 20,
      zIndex: 1,
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: 8,
      borderRadius: "50%",
      transition: "transform 0.3s",
    },
    icon: {
      fontSize: 34,
      color: "#ffffff",
    },
    buttonHover: {
      transform: "scale(1.1)",
    },
  }), [isHovered]);
};

// オーバーレイと検索ページのスタイル
const useOverlayStyles = () => {
  return useMemo(() => ({
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      color: "#000",
    },
    searchPage: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column" as const,
      backgroundColor: "#000000",
      position: "absolute" as const,
      visibility: "hidden" as "hidden",
    },
  }), []);
};

// 検索ページのアニメーション処理
const useSearchPageAnimation = (
  isSearchOpen: boolean,
  searchPageRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (searchPageRef.current) {
      gsap.to(searchPageRef.current, {
        y: isSearchOpen ? "0%" : "-100%",
        opacity: isSearchOpen ? 1 : 0,
        duration: 0.8,
        ease: isSearchOpen ? "power3.out" : "power3.in",
        onComplete: () => {
          if (!isSearchOpen) {
            searchPageRef.current!.style.visibility = "hidden";
          }
        },
      });

      if (isSearchOpen) {
        searchPageRef.current.style.visibility = "visible";
      }
    }
  }, [isSearchOpen, searchPageRef]);
};

const SearchButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [icon, setIcon] = useState(<FaSearch />);
  const searchPageRef = useRef<HTMLDivElement | null>(null);

  const styles = useButtonStyles(isHovered);
  const overlayStyles = useOverlayStyles();

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((current) => {
      setIcon(current ? <FaSearch /> : <FaTimes />);
      return !current;
    });
  }, []);

  useSearchPageAnimation(isSearchOpen, searchPageRef);

  return (
    <>
      <button
        style={{
          ...styles.button,
          ...(isHovered ? styles.buttonHover : {}),
        }}
        onClick={toggleSearch}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.icon}>{icon}</div>
      </button>
      <div style={overlayStyles.overlay}>
        <div ref={searchPageRef} style={overlayStyles.searchPage}>
          <SearchPage />
        </div>
      </div>
    </>
  );
};

export default SearchButton;
