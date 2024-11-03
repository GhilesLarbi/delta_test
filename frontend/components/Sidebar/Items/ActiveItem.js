import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TypeGroup from "./menu/TypeGroup";
import TypeDropDown from "./menu/TypeDropDown";

function ActiveItem({ item, Icon, setOpened, index, opened }) {
  const router = useRouter();

  const splited = router.asPath.split("/");
  const splitedHref = item.path ? item.path.split("/") : null;

  const isCurrentPath = item.path ? splited[1] === splitedHref[1] : null;

  return (
    <>
      {item.type == "item" && (
        <Link href={item.path}>
          <div
            // className={`lg:w-[100%] w-[55px] h-[55px] bg-[#f5f5f5]
            //  hover:bg-violet-100 flex-row items-center px-[15px] rounded-lg`}
            className="flex items-center space-x-2 bg-white px-4 py-4 rounded-lg hover:bg-violet-300 text-black hover:text-white mb-2"
          >
            <Icon
              size={item.icon.size}
              color={isCurrentPath ? "#7c3aed" : "#555"}
            />
            <span
              className="lg:flex hidden"
              style={{
                fontWeight: 400,
                color: isCurrentPath ? "#7c3aed" : "#222",
                fontSize: 16,
              }}
            >
              {item.label}
            </span>
          </div>
        </Link>
      )}

      {item.type == "group" && <TypeGroup item={item} />}

      {item.type == "title" && (
        <span
          className="lg:flex hidden"
          style={{
            color: "#222",
            marginTop: 7,
            marginLeft: 7,
          }}
        >
          {item.label}
        </span>
      )}

      {item.type == "dropdown" && (
        <TypeDropDown
          opened={opened}
          setOpened={setOpened}
          index={index}
          item={item}
        />
      )}
    </>
  );
}

export default ActiveItem;