"use client";

import { WeatherMoon20Filled, WeatherSunny20Filled } from "@fluentui/react-icons";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button isIconOnly onClick={toggleTheme}>
      {theme === "dark" ?
        <WeatherSunny20Filled /> :
        <WeatherMoon20Filled />
      }
    </Button>
  )
};