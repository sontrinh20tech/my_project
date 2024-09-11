import Notification from "@/components/common/Notification";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showNoti, setShowNoti] = useState(false);
  const [notiTitle, setNotiTitle] = useState("Success");
  const [notiMessage, setNotiMessage] = useState("Message");
  const [notiIcon, setNotiIcon] = useState<React.ReactNode>(
    <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
  );

  return (
    <NotificationContext.Provider
      value={{
        showNoti,
        setShowNoti,
        notiTitle,
        setNotiTitle,
        notiMessage,
        setNotiMessage,
        notiIcon,
        setNotiIcon,
      }}
    >
      {children}
      <Notification
        show={showNoti}
        setShow={setShowNoti}
        title={notiTitle}
        message={notiMessage}
        icon={notiIcon}
      />
    </NotificationContext.Provider>
  );
};
