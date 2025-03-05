import {CreatorRes} from "~/res/reses";
import CreatorIconCard from "~/Icon/CreatorIconCard";


export default function CreatorSelectorItem(
    {
      creator,
      oneSelect,
    }: {
      creator: CreatorRes;
      oneSelect: () => void;
    }) {
  return (
      <div
          className="relative border border-transparent hover:border-gray-500
                 hover:shadow-md hover:shadow-gray-500/30 transition-all 
                 duration-300 cursor-pointer rounded-lg p-2"
          onClick={oneSelect}
      >
        <CreatorIconCard creator_id={creator.creator_id} isTransition={false}/>
      </div>
  );
}
