import React, { createContext, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface StoreContextType {
  activeSidebar: boolean;
  setActiveSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StoreContext = createContext<StoreContextType>({
  activeSidebar: true,
  setActiveSidebar: () => {},
});

export const LayoutStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

  return (
    <StoreContext.Provider
      value={{
        activeSidebar,
        setActiveSidebar,
      }}
    >
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Navbar />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </StoreContext.Provider>
  );
};
