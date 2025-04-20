import { Spinner } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const Loader = ({ children }: Props) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export default Loader;
