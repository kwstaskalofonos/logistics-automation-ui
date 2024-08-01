'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";

const Navbar: React.FunctionComponent = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-[60px] flex justify-end gap-2 pt-2">
      <a className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"><span><FontAwesomeIcon icon={faBell} /></span></a>
      <a className="text-sm font-semibold leading-6 text-indigo-600">{session?.user?.name}</a>
      <a className="cursor-pointer ext-sm font-semibold leading-6 text-gray-900" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Log out<span aria-hidden="true">&rarr;</span></a>
    </div>
  )
};

export default Navbar;