import { ReactNode } from "react";
import NavBar from "../NavBar/NavBar";

interface Props {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: Props) => {
  return (
    <div>
      <NavBar title={title} />
      {children}
    </div>
  );
};

export default Layout;
