import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

interface NotificationProps {
  show: boolean;
  setShow: any;
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export default function Notification({
  show,
  setShow,
  title,
  message,
  icon = (
    <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
  ),
}: NotificationProps) {
  return (
    <div
      aria-live="assertive"
      className="mt-16 pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show={show}>
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="mt-1 text-sm text-gray-500">{message}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShow(false);
                    }}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
