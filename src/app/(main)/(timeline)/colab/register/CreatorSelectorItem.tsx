import {CreatorRes} from "../../../../../util/hook/useCreatorData";

export default function CreatorSelectorItem(
  {
    creator, oneSelect,
  }: {
    creator: CreatorRes,
    oneSelect: () => void,
  },
) {


  return (
    <div
      className={"border-2 border-gray-100 p-4 m-4 hover:bg-gray-300 cursor-pointer"} onClick={oneSelect}
    >
      <p>creator: {creator.creator_id}</p>
      <p>contact: {creator.contact_address}</p>
    </div>
  )
}
