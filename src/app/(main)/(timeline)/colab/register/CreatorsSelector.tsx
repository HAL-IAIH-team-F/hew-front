import {Dispatch, SetStateAction, useState} from "react";
import CreatorSelectorModal from "@/(main)/(timeline)/colab/register/CreatorSelectorModal";

import "./s.css"
import {CreatorRes} from "~/res/reses";
import CreatorIconCard from "~/Icon/CreatorIconCard";

export default function CreatorsSelector(
    {
      creators, setCreators,
    }: {
      creators: CreatorRes[], setCreators: Dispatch<SetStateAction<CreatorRes[]>>
    },
) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
      <div>

        {creators.map(creator => <div
            key={creator.creator_id} className={"border-2 border-gray-100 p-4"}
        >
          <CreatorIconCard creator_id={creator.creator_id}/>
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
