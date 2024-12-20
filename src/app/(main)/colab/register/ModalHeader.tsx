import CloseButton from "@/(main)/colab/register/CloseButton";

export default function ModalHeader(
  {
    onCloseRequest,
  }: {
    onCloseRequest: () => void,
  },
) {


  return (
    <div className={"flex justify-end"}>
      <CloseButton onClick={onCloseRequest}/>
    </div>
  )
}
