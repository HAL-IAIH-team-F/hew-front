import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import ModalHeader from "@/(main)/(timeline)/colab/register/ModalHeader";
import { useClientState } from "~/api/context/ClientContextProvider";
import { Api } from "~/api/context/Api";
import { ErrorData } from "../../../../../util/err/err";
import { ErrorMessage } from "../../../../../util/err/ErrorMessage";
import CreatorSelectorItem from "@/(main)/(timeline)/colab/register/CreatorSelectorItem";
import { CreatorRes } from "~/hooks/useCreatorData";

export default function CreatorSelectorModal({
  onCloseRequest,
  oneSelect,
}: {
  onCloseRequest: () => void;
  oneSelect: (creator: CreatorRes) => void;
}) {
  const [creators, setCreators] = useState<CreatorRes[]>([]);
  const clientContext = useClientState();
  const [err, setErr] = useState<ErrorData>();

  useEffect(() => {
    if (clientContext.state === "loading") return;
    clientContext.client
      .unAuthOrAuth(Api.app.gcs_api_creator_get, {}, {})
      .then((value) => {
        if (value.error) return setErr(value.error);
        setCreators(value.success);
      });
  }, [clientContext.state]);

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onCloseRequest}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[450px] bg-gray-900 text-white shadow-xl rounded-xl border border-gray-800 overflow-hidden transform transition-all">
              <ModalHeader onCloseRequest={onCloseRequest} />
              <div className="p-4 space-y-2">
                <ErrorMessage error={err} />
                <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                  コラボ相手を選んでください
                </h1>
                <div className="space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
                  {creators.map((creator) => (
                    <CreatorSelectorItem
                      key={creator.creator_id}
                      creator={creator}
                      oneSelect={() => oneSelect(creator)}
                    />
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
