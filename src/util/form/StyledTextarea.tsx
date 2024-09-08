"use client"
import {DetailedHTMLProps, TextareaHTMLAttributes, useContext, useRef, useState, useEffect} from "react";
import {FormState} from "./StyledForm";
import {ErrorMessage} from "../err/ErrorMessage";
import ItemBackground from "~/ItemBackground";
import {sx} from "../util";

export function StyledTextarea(
  {
    name,
    label,
    className,
    ...props
  }: TextareaProps
) {
  const formState = useContext(FormState.Context);
  const [value, setValue] = useState('');
  const [height, setHeight] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const invisibleTextAreaRef = useRef<HTMLTextAreaElement>(null);
  

  useEffect(() => {
    if (invisibleTextAreaRef.current) {
      setHeight(invisibleTextAreaRef.current.scrollHeight);
    }
  }, [value]);

  function handleChangeValue(value: string) {
    setValue(value);
  }

  return (
    <ItemBackground type={"label"} className={sx("p-3 block my-6", className)}>
      <p className={sx("px-4 mb-4 block text-xl")}>{label || name}</p>
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(evt) => handleChangeValue(evt.target.value)}
        style={{ height: height ? `${height}px` : 'auto' }}
        name={name}
        className={sx("block w-full border-2 overflow-hidden resize-none border-borderDef rounded-lg px-3 py-1 text-lg")}
        placeholder ={ props.maxLength ? `最大${props.maxLength}文字まで入力できます`:undefined}
        {...props}
      />
      <textarea
        ref={invisibleTextAreaRef}
        value={value}
        onChange={() => {}}
        tabIndex={-1} // tabでフォーカスされないようにする
        style={{ position: 'fixed', top: -999, visibility: 'hidden' }} // 見えない範囲に配置
        className={sx("block w-full border-2 overflow-hidden resize-none border-borderDef rounded-lg px-3 py-1 text-lg")}
      />
      <ErrorMessage error={name && formState && formState[name]} />
    </ItemBackground>
  );
}

export interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string;
  label?: string;
  maxLength?: number;
}
