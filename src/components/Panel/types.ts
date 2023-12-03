export type PanelProps = {
  className?: string;
  children: JSX.Element;
};

export type PanelGroupProps = {
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  sidebar?: JSX.Element;
  children: JSX.Element | JSX.Element[];
};
