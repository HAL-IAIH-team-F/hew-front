import {Dispatch, SetStateAction, useState} from "react";
import CreatorSelectorModal from "@/(main)/colab/register/CreatorSelectorModal";
import {CreatorRes} from "@/(main)/colab/register/CreatorRes";

export default function CreatorsSelector(
  {
    creators, setCreators,
  }: {
    creators: CreatorRes[], setCreators: Dispatch<SetStateAction<CreatorRes[]>>,
  },
) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      {creators.map(creator => <div
        key={creator.creator_id} className={"border-2 border-gray-100 p-4"}
      >
        <p>creator: {creator.creator_id}</p>
        <p>contact: {creator.contact_address}</p>
        <p>user_id: {creator.user_id}</p>
      </div>)}
      <button
        type={"button"} className={"border-2 border-gray-400 rounded-xl px-5 py-1 hover:bg-gray-300"}
        onClick={() => setIsModalOpen(true)}
      >add
      </button>
      {isModalOpen && <CreatorSelectorModal
        onCloseRequest={() => setIsModalOpen(false)} oneSelect={creator => {
        setCreators(prevState => {
          if (prevState.find(v => v.creator_id === creator.creator_id)) return prevState
          return [...prevState, creator]
        })
      }}
      />}
    </div>
  )
}
