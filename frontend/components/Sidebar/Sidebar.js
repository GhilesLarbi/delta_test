import React, {useState} from 'react';
import NavItems from "../../config/navItems";
import ActiveItem from './Items/ActiveItem'

const Sidebar = (props) => {
  const [opened, setOpened] = useState(false);
  return (
    <aside className="bg-violet-100 text-black w-64 min-h-screen p-4">
      {NavItems.main.map((item, index) => {
          return (
            <ActiveItem
              key={index}
              Icon={item.icon ? item.icon.Icon : null}
              item={item}
              index={index}
              setOpened={setOpened}
              opened={opened}
            />
          );
        })}
    </aside>
  );
};

export default Sidebar;