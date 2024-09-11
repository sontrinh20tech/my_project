import Breadcrumb from "@/components/common/Breadcrumb";
import Siderbar from "@/components/Siderbar";
import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

interface INavigationContex {
  pages: INavigation[];
  setPages: any;
}

export const useSidebarContext = () => {
  return useContext<INavigationContex>(SidebarContext);
};

export const SiderbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [pages, setPages] = useState<INavigation[]>([]);

  const navigation: INavigation[] = [
    { name: "Dashboard", href: "/", icon: HomeIcon, current: pathname === "/" },
    {
      name: "Products",
      href: "/product",
      icon: UsersIcon,
      current: /^\/product(\/\d+)*/.test(pathname),
    },
  ];

  const userNavigation: INavigation[] = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  return (
    <SidebarContext.Provider value={{ pages, setPages }}>
      <Siderbar navigation={navigation} userNavigation={userNavigation}>
        {children}
      </Siderbar>
    </SidebarContext.Provider>
  );
};
