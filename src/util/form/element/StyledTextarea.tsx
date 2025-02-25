// ============================
// util/form/StyledTextarea.tsx
// Author: injectxr
// Date: 2024-09-07
// Description: テキストエリアコンポーネント (ダークモード対応)
// ============================

"use client"
import {DetailedHTMLProps, Dispatch, SetStateAction, TextareaHTMLAttributes, useEffect, useRef, useState} from "react";
import ItemBackground from "~/ItemBackground";
import {sx} from "../../util";

export function StyledTextarea(
    {
      name,
      label,
      className,
      update,
      ...props
    }: TextareaProps
) {
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const invisibleTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!update) return
    update[1](false);
    setValue('');
  }, [update && update[0]]);

  useEffect(() => {
    if (invisibleTextAreaRef.current) {
      setHeight(invisibleTextAreaRef.current.scrollHeight);
    }
  }, [value]);

  function handleChangeValue(value: string) {
    setValue(value);
  }

  return (
      <ItemBackground type={"label"} className={sx("p-3 block my-6 bg-gray-900 rounded-lg", className)}>
        <p className={sx("px-4 mb-4 block text-xl text-white")}>{label || name}</p>
        <textarea
            ref={textAreaRef}
            value={value}
            onChange={(evt) => handleChangeValue(evt.target.value)}
            style={{height: height ? `${height}px` : 'auto'}}
            name={name}
            className={sx(
                "block w-full border-2 overflow-hidden resize-none border-gray-700 rounded-lg px-3 py-1 text-lg bg-gray-800 text-white",
                "placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 hover:bg-gray-700 transition"
            )}
            placeholder={props.maxLength ? `最大${props.maxLength}文字まで入力できます` : undefined}
            {...props}
        />
        <textarea
            ref={invisibleTextAreaRef}
            value={value}
            onChange={() => {
            }}
            tabIndex={-1}
            style={{position: 'fixed', top: -999, visibility: 'hidden'}}
            className={sx(
                "block w-full border-2 overflow-hidden resize-none border-gray-700 rounded-lg px-3 py-1 text-lg bg-gray-800 text-white"
            )}
        />
      </ItemBackground>
  );
}

export interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string;
  label?: string;
  maxLength?: number;
  update?: [boolean, Dispatch<SetStateAction<boolean>>]
}
