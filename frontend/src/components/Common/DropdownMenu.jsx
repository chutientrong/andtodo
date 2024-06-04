import React, { useState } from "react";
import { Popover } from "@headlessui/react";
import AddTaskModal from "../Task/AddTaskModal";

const DropdownMenu = ({ taskId, handleDelete, todoId, setRenderChange }) => {
  const [isEditTaskModalOpen, setEditTaskModal] = useState(false);

  const refreshData = () => {
    setRenderChange(true);
  };
  const handleSetEditModal = (e) => {
    e.stopPropagation();
    setEditTaskModal(true);
  };

  return (
    <>
      <Popover className={`relative`}>
        <Popover.Button className="py-1 px-2 right-1.5 top-2 hover:bg-slate-200 rounded-sm focus:outline-none focus:ring focus:ring-indigo-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width={4}
            className="text-[#9ba8bc]"
            viewBox="0 0 128 512"
          >
            <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
          </svg>
        </Popover.Button>
        <Popover.Panel className="absolute z-10 left-0">
          <div className="w-40 bg-white rounded-md border shadow select-none p-1 divide-y">
            <div className="py-[3px]">
              <button
                onClick={(e) => handleSetEditModal(e)}
                className="transition-colors duration-75 flex w-full items-center rounded-md px-2.5 py-2 text-sm space-x-2.5 text-slate-500 hover:bg-indigo-500 hover:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  width={15}
                  viewBox="0 0 512 512"
                >
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
                <span className="leading-none text-sm ">Edit</span>
              </button>
            </div>
            <div className="py-[3px]">
              <button
                onClick={(e) => handleDelete(e, taskId)}
                className="transition-colors duration-75 flex w-full items-center rounded-md px-2.5 py-2 text-sm space-x-2 text-slate-500 hover:bg-red-500 hover:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width={17}
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>

                <span className="leading-none text-sm ">Delete</span>
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Popover>
      <AddTaskModal
        isAddTaskModalOpen={isEditTaskModalOpen}
        setAddTaskModal={setEditTaskModal}
        todoId={todoId}
        taskId={taskId}
        edit={true}
        refreshData={refreshData}
      />
    </>
  );
};

export default DropdownMenu;
