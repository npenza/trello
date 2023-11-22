"use client";

import { useBoardStore } from "@/store/BoardStore";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new task to be completed.",
    color: "bg-red-500",
  },
  {
    id: "inprogress",
    name: "In Progress",
    description: "A task that is currently being worked on.",
    color: "bg-orange-500",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed.",
    color: "bg-green-500",
  },
];

function TaskTypeRadioGroup() {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newTaskType}
          onChange={(e) => {
            setNewTaskType(e);
          }}
        >
          <div className="space-y-4">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  } ${
                    checked
                      ? `${type.color} bg-opacity-75 text-white rounded-md shadow-md`
                      : "bg-white"
                  }`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between py-2 px-3">
                      <div className="flex flex-col items-left">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium ${
                            checked ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {type.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${
                            checked ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {type.description}
                        </RadioGroup.Description>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default TaskTypeRadioGroup;
