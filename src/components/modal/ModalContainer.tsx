import {useModalState} from "~/modal/Modal";

export default function ModalContainer(
    {}: {},
) {
  const modalState = useModalState()

  return modalState.state == "opened" && (
      <div className={"z-50 fixed top-0 left-0 w-full h-full"}>
        <div
            className={"backdrop-blur absolute top-0 left-0 w-full h-full"}
            onClick={() => modalState.close()}
        />
        <div
            style={{width: modalState.opt.width ?? "500px", height: modalState.opt.height ?? "500px"}}
            className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}
        >
          {modalState.node}
        </div>
      </div>
  )
}
