"use client"
import {DetailedHTMLProps, InputHTMLAttributes} from "react";
import {useFormState} from "./StyledForm";
import {ErrorMessage} from "../../err/ErrorMessage";
import ItemBackground from "~/ItemBackground";
import {sx} from "../../util";

export function StyledInput(
  {
    name,
    label,
    as="input", // デフォルトはinput
    className,
    ...props
  }: TextInputProps
) {
  const formState = useFormState()
  const Component = as === "textarea" ? "textarea" : "input";
  return (
      <div className="justify-center items-center ">
        <ItemBackground
            type={"label"}
            className={sx(
                "block m-0 p-0 w-7/12"
            )}
        >
          <p className={sx("block text-xl text-[#4E5861]")}>
              {label || name}
          </p>
          <Component
            {...props}
            name={name}
            className={sx(
                styles.inputBase
            )}
            style={{
                ...props.style, // 外部から渡されたスタイル適用
                position: "relative",
                outline: "none", // フォーカス時の枠線を削除
            }}
          />
          <ErrorMessage error={name && formState.err && formState.err[name]}/>
        </ItemBackground>
      </div>
  );
}

export interface TextInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLInputElement | HTMLTextAreaElement
    > {
  name: string
  label?: string
　as?: "input" | "textarea";
}

const styles = {
    inputBase: `
    block w-full rouded-lg px-3
    bg-transparent
    border border-gray-300
    focus:border-blue-500 focus:ring focus:ring-blue-200
    outline-none
    `,
};