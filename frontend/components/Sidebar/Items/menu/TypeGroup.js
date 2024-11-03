import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function TypeGroup({ item }) {
  const router = useRouter();

  const splited = router.asPath.split("/");
  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
      }}
    >
      <span
        className="lg:flex hidden"
        style={{
          color: "#444",
          marginBottom: 7,
          marginLeft: 7,
        }}
      >
        {item.label}
      </span>
      <div
        className="lg:w-[100%] flex flex-col bg-white rounded-lg overflow-hidden"
      >
        {item &&
          item.children &&
          item.children[0] &&
          item.children.map((child, index) => {
            let ICON = child.icon.Icon;
            const splitedHrefChild = child.path ? child.path.split("/") : null;

            const isCurrentPathChild = child.path
              ? splited[1] === splitedHrefChild[1]
              : null;

            return (
              <Link key={index} href={child.path}>
                <div className="flex items-center px-4 py-2 gap-3 hover:bg-violet-300">
                  <ICON
                    size={child.icon.size}
                    color={
                      isCurrentPathChild ? "#7c3aed" : "#222"
                    }
                  />
                  <span
                    className="lg:flex hidden"
                    style={{
                      fontWeight: 400,
                      color: isCurrentPathChild
                        ? "#7c3aed"
                        : "#222",
                      fontSize: 16,
                    }}
                  >
                    {child.label}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default TypeGroup;
