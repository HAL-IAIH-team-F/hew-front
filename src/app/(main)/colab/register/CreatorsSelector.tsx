import {useState} from "react";
import CreatorSelectorModal from "@/(main)/colab/register/CreatorSelectorModal";

export default function CreatorsSelector(
  {
    recruit,
  }: {
    recruit?: string
  },
) {
  const [creatorIds, setCreatorIds] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      {creatorIds.map(creatorId => <div key={creatorId}>
      </div>)}
      <button
        type={"button"} className={"border-2 border-gray-400 rounded-xl px-5 py-1 hover:bg-gray-300"}
        onClick={() => setIsModalOpen(true)}
      >add
      </button>
      <CreatorSelectorModal onCloseRequest={() => setIsModalOpen(false)} isOpen={isModalOpen}/>
    </div>
  )
}
