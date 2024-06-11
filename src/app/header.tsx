"use client"

import { authAtom, userInfoAtom } from "@/shared/state";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import { useAtomValue, useSetAtom } from "jotai";
import { Version } from "@/components/version";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useRouter } from "next/navigation";

export function Header() {
    const userInfo = useAtomValue(userInfoAtom)
    const pathname = usePathname();
    const setAuth = useSetAtom(authAtom)
    const setUserInfo = useSetAtom(userInfoAtom)
    const router = useRouter()

    function logout() {
        setAuth({ token: "" })
        setUserInfo({ loggedIn: false, username: "", iss: "" })
        router.push("/login")
    }

    return (
        <Navbar isBordered>
            <NavbarMenuToggle className="sm:hidden" />
            <NavbarBrand>
                <img alt="logo" src="/images/logo.png" width={32} height={32} className="mr-2" />
                <Version />
            </NavbarBrand>
            <NavbarItem isActive={pathname === "/projects"}>
                <Link href="/projects">
                    Projects
                </Link>
            </NavbarItem>
            <NavbarContent className="hidden sm:flex gap-4">
                <NavbarItem isActive={pathname === "/applications"}>
                    <Link href="/applications">
                        Applications
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={pathname === "/repositories"}>
                    <Link href="/repositories">
                        Repositories
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
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
                                <DropdownItem key="logout" color="danger" onClick={logout}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </> : <Link href="/login">Log in</Link>}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href="/applications">Applications</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/repositories">Repositories</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/projects">Repositories</Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>)
}