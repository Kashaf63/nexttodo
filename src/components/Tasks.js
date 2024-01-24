"use client";

import { useRouter } from "next/navigation";

function Tasks({ item }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/list/${item}`);
  };

  return (
    <li className="text-lg text-gray-300 font-light flex gap-1 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="21"
        viewBox="0 -960 960 960"
        width="21"
      >
        <path
          d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 280q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
          fill="rgb(209 213 219)"
        />
      </svg>
      <p className="cursor-pointer break-all" onClick={handleClick}>
        {item}
      </p>
    </li>
  );
}

export default Tasks;
