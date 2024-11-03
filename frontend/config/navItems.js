import { RiAlignItemLeftLine, RiHome6Line } from "react-icons/ri";
import { IoShapesOutline } from "react-icons/io5";
import { MdOutlineGroupWork } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";

const NavItems = {
  main: [
    {
      type: "item",
      label: "Home",
      icon: {
        Icon: RiHome6Line,
        size: "24",
      },
      path: "/home",
    },
    {
      type: "group",
      label: "Inventory",
      children: [
        {
          label: "Items",
          icon: {
            Icon: RiAlignItemLeftLine,
            size: "24",
          },
          path: "/items",
        },
        {
          label: "Create Item",
          icon: {
            Icon: FaRegSquarePlus,
            size: "20",
          },
          path: "/items/new",
        },
        {
          label: "Packs",
          icon: {
            Icon: IoShapesOutline,
            size: "24",
          },
          path: "/packk",
        },
      ],
    },
    {
      type: "title",
      label: "Business",
    },
    {
      type: "dropdown",
      label: "Sales",
      icon: {
        Icon: RiHome6Line,
        size: "24",
      },
      children: [
        {
          label: "Items",
          icon: {
            Icon: RiAlignItemLeftLine,
            size: "24",
          },
          path: "/items_s",
        },
        {
          label: "Item groups",
          icon: {
            Icon: MdOutlineGroupWork,
            size: "24",
          },
          path: "/groups_s",
        },
        {
          label: "Packs",
          icon: {
            Icon: IoShapesOutline,
            size: "24",
          },
          path: "/packs_s",
        },
      ],
    },
    {
      type: "dropdown",
      label: "Purshases",
      icon: {
        Icon: RiHome6Line,
        size: "24",
      },
      children: [
        {
          label: "Items",
          icon: {
            Icon: RiAlignItemLeftLine,
            size: "24",
          },
          path: "/items_p",
        },
        {
          label: "Item groups",
          icon: {
            Icon: MdOutlineGroupWork,
            size: "24",
          },
          path: "/groups_p",
        },
        {
          label: "Packs",
          icon: {
            Icon: IoShapesOutline,
            size: "24",
          },
          path: "/packs_p",
        },
      ],
    },
  ],
};

export default NavItems;