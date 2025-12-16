import { Button } from "@/components/ui/button";
import { getList } from "./get-approvers-list";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ApproverListParams = {
  page: number;
};

export default async function ApproverList({ page }: ApproverListParams) {
  // console.log("pp", page);

  const allList = await getList(page);
  // console.log("allList", allList);

  const isPrevBtnDisabled = page <= 1;
  const isNextBtnDisaled = page >= Number(allList?.meta?.totalPages);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:py-20">
      {/* list */}
      <div>
        <Table>
          <TableCaption>A list of recent approving list.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>INDEX</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allList?.meta?.list?.map((el, idx) => {
              const globalIndex = (page - 1) * allList?.meta?.limit + idx + 1;
              return (
                <TableRow key={idx}>
                  <TableCell>{globalIndex}</TableCell>
                  <TableCell className="capitalize">{el.name}</TableCell>
                  <TableCell>{el.email}</TableCell>
                  <TableCell>
                    <Select defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue defaultValue="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reject">Reject</SelectItem>
                          <SelectItem value="reject">Reject</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button variant="outline" disabled={isPrevBtnDisabled} asChild>
          <Link href={`/approvers?page=${page - 1}`}>Previous</Link>
        </Button>

        <div className="flex items-center gap-2 px-4 py-2 rounded-md">
          <span className="text-sm text-muted-foreground">Page</span>
          <span className="font-semibold">{page}</span>
          <span className="text-sm text-muted-foreground">of</span>
          <span className="font-semibold">{allList?.meta?.totalPages}</span>
        </div>

        <Button variant="outline" disabled={isNextBtnDisaled} asChild>
          <Link href={`/approvers?page=${page + 1}`}>Next</Link>
        </Button>
      </div>
    </div>
  );
}
