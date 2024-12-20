import CloseButton from "@/(main)/colab/register/CloseButton";
import ModalHeader from "@/(main)/colab/register/ModalHeader";

export default function CreatorSelectorModal(
  {
    onCloseRequest, isOpen,
  }: {
    onCloseRequest: () => void,
    isOpen: boolean
  },
) {


  return isOpen && (
    <>
      <div className={"fixed flex top-0 left-0 w-full h-full bg-[#0003] justify-center items-center"}
           onClick={onCloseRequest}>
        <div
          className={"w-96 h-56 bg-white opacity-100"} onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader onCloseRequest={onCloseRequest}/>

        </div>
      </div>
    </>
  )
}
