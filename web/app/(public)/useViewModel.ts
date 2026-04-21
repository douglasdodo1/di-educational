import { useState } from "react";

export const useViewModel = () => {
  const [active, setActive] = useState<"login" | "register">("login");

  const handleSetSection = (section: "login" | "register") => {
    setActive(section);
  };

  return { active, handleSetSection };
};
