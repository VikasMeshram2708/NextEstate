"use server";

type ApproverListType = {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  phone: string;
  panNumber: string;
  address: string;
  role: string;
  isVerified: boolean;
  verficiationStatus: string;
  createdAt: string;
  updatedAt: string;
};

type GetListReturnType = {
  success: boolean;
  meta: {
    list: ApproverListType[];
    total: number;
    page: number;
    limit: number;
    offset: number;
    totalPages: number;
  };
};

export async function getList(
  currPage: number
): Promise<GetListReturnType | undefined> {
  const base_URL = "http://localhost:3000/api";

  const res = await fetch(`${base_URL}/approvers/get-all?page=${currPage}`);

  if (!res.ok) {
    return undefined;
  }

  return res.json();
}
