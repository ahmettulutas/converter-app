type ToggleProps = {
  open: boolean;
  toggle: () => void;
};
export const NavbarToggle: React.FC<ToggleProps> = ({ open, toggle }) => (
  <button
    onClick={toggle}
    aria-label="navbar-toggle"
    className="flex flex-col gap-1 h-full"
  >
    <div
      className={`${
        open
          ? "transform rotate-[45deg] translate-x-[-2px] translate-y-[10px]"
          : ""
      } bg-black h-0.5 w-6 transition-all duration-200 ease-in`}
    />
    <div
      className={`${
        open ? "w-0" : "w-full"
      } bg-black h-0.5 transition-all duration-200 ease-in`}
    />
    <div
      className={`${
        open
          ? "transform rotate-[-45deg] translate-x-[-2px] translate-y-[0px]"
          : ""
      } bg-black h-0.5 w-6 transition-all duration-200 ease-in`}
    />
  </button>
);
