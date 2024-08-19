import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-auto min-h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
