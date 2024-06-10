"use client"

import { userInfoAtom } from "@/shared/state";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import { useAtomValue } from "jotai";
import { Version } from "@/components/version";

export function Header() {
    const userInfo = useAtomValue(userInfoAtom)

    return (<>
        <Navbar isBordered>
            <NavbarMenuToggle className="sm:hidden" />
            <NavbarBrand>
                <img alt="logo" src="/images/logo.png" width={32} height={32} className="mr-2"/>
                <Version/>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4">
                <NavbarItem isActive={window.location.pathname === "/dashboard"}>
                    <Link href="/dashboard">
                        Dashboard
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={window.location.pathname === "/repositories"}>
                    <Link href="/repositories">
                        Repositories
                    </Link>
                </NavbarItem>
                {/* <NavbarItem isActive>
                    <Link href="#" aria-current="page" color="warning">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem> */}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {userInfo.loggedIn ? <>
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    name={userInfo.username}
                                    size="sm"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" isReadOnly>
                                    <span className="">Welcome,&nbsp;</span>
                                    <span className="font-semibold">{userInfo.username}</span>
                                </DropdownItem>
                                <DropdownItem key="change_password">Change Password</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </> : <Link href="/login">Log in</Link>}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>

    </>)
}