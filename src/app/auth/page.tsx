import Authentication from "./utils/authenticate";

const Page = ({
  searchParams,
}: {
  searchParams: { token: string; role: string; uid: string };
}) => {
  return (
    <div className="section container flex items-center justify-center">
      <Authentication data={searchParams} />
    </div>
  );
};

export default Page;
