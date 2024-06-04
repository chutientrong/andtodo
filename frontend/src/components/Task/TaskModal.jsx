import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import tasksApi from "../../apis/taskApi";
import { capitalizeFirstLetter } from "../../utils/helper";

const TaskModal = ({ isOpen, setIsOpen, id }) => {
  const [taskData, setTaskData] = useState("");

  useEffect(() => {
    if (isOpen) {
      tasksApi
        .getTask(`${id}`)
        .then((data) => {
          console.log("data", data);
          setTaskData({ ...data.data });
          // console.log(taskData);
        })
        .catch((error) => {
          toast.error("something went wrong");
        });
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4 w-screen h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="rounded-md bg-white w-6/12 overflow-y-hidden">
                <Dialog.Title
                  as="div"
                  className={
                    "bg-white shadow px-6 py-4 rounded-t-md sticky top-0"
                  }
                >
                  <h1>Task details</h1>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-6 top-4 text-gray-500 hover:bg-gray-100 rounded focus:outline-none focus:ring focus:ring-offset-1 focus:ring-gray-500/30 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Dialog.Title>
                <div className="flex gap-4 h-[inherit]">
                  <div className="w-full px-8 space-y-3 py-4 min-h-max  overflow-y-auto">
                    <div className="mb-3">
                      <label htmlFor="title" className="block text-gray-600">
                        Title
                      </label>
                      <input
                        value={capitalizeFirstLetter(taskData.title)}
                        disabled
                        type="text"
                        className="rounded-md w-full text-sm py-2 px-2.5"
                        placeholder="Task title"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Description"
                        className="block text-gray-600"
                      >
                        Description
                      </label>
                      <textarea
                        value={capitalizeFirstLetter(taskData.description)}
                        disabled
                        className="min-h-[100px] rounded-md w-full text-sm py-2 px-2.5 "
                        rows="6"
                        placeholder="Task description"
                      ></textarea>
                    </div>
                    
                    {/* <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores modi error, voluptatibus ullam odio nemo culpa optio incidunt, soluta sunt eos laboriosam labore animi dolorum voluptas officiis fugit perspiciatis laborum.</p>
                    <div>
                      <h3 className="text-base text-gray-600 font-medium mt-3 mb-2">
                        Attachment
                      </h3>
                      <div className="flex items-center">
                        <img
                          className="aspect-video w-56 rounded"
                          src={Attachment}
                          alt=""
                        />
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="w-4/12 py-4 pr-4"></div> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskModal;
