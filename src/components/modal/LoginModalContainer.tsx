import {useLoginModalState} from "~/modal/LoginModal";
import {sx} from "../../util/util";
import {AnimatePresence, motion} from "framer-motion";

export default function LoginModalContainer(
    {}: {},
) {
  const modalState = useLoginModalState()

  return <AnimatePresence>
    {modalState.state == "opened" && (
        <motion.div
            className={"z-50 fixed top-0 left-0 w-full h-full"}
            initial={{opacity: 0, backdropFilter: "blur(0px)"}}
            exit={{opacity: 0, backdropFilter: "blur(0px)"}}
            animate={{opacity: 1, backdropFilter: "blur(10px)"}}
            transition={{duration: 0.4}}
        >
          <div
              className={"absolute top-0 left-0 w-full h-full"}
              onClick={() => modalState.close()}
          />
          <div
              style={{width: modalState.opt.width ?? "500px", height: modalState.opt.height ?? "500px"}}
              className={sx(
                  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full",
                  "bg-[#2a2a2ca3] p-2 rounded-3xl"
              )}
          >
            <motion.div
                initial={{opacity: 0, backdropFilter: "blur(0px)"}}
                animate={{opacity: 1, backdropFilter: "blur(0px)"}}
                transition={{duration: 0.7}}
                className={"w-full h-full bg-[#2a2a2c] overflow-hidden rounded-2xl"}
            >
              {modalState.node}
            </motion.div>
          </div>
        </motion.div>
    )}
  </AnimatePresence>

}
