import ApproverList from "./approver-list";

type ApproverParams = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ApproversPage({ searchParams }: ApproverParams) {
  const params = (await searchParams).page ?? "1";
  console.log("params", params);

  const page = Number(params) ? params : 1;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
      <ApproverList page={Number(page)} />
    </div>
  );
}
