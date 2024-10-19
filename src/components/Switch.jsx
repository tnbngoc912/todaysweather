import { useTheme } from "../hook/useTheme";

export const Switch = () => {
  const [theme, handleChange] = useTheme("light");

  return (
    <div className="container-switch">
      <label className="switch">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={theme === "light"}
        />
        <span className="slider">
          <span className="icon-sun"></span>
          <span className="icon-moon"></span>
        </span>
      </label>
    </div>
  );
};
