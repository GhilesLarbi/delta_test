import Image from "next/image";
import { BarLoader } from "react-spinners";

function LoadingModal({}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          marginBottom: 35,
        }}
      >
        <Image
          alt={"logo"}
          src="/app.png"
          width={80}
          height={80}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <BarLoader width={150} color="#583981" loading={true} size={30} />
    </div>
  );
}

export default LoadingModal;