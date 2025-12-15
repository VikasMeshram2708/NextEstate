import { formatDate } from "@/lib/format-date";
import { getApproverUsersList } from "./get-apprvers-list";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function ApproverList() {
  const result = await getApproverUsersList();

  // 🔒 Type narrowing (IMPORTANT)
  if (!result.success || !result.data) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Failed to load approvers
      </p>
    );
  }

  const { list, total } = result.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Pending Approvals</h2>
        <span className="text-sm text-muted-foreground">Total: {total}</span>
      </div>

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">INDEX</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="whitespace-nowrap">Created At</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No pending approvers
                </TableCell>
              </TableRow>
            ) : (
              list.map((user, idx) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>

                  <TableCell>{user.name}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Select defaultValue={user.verficiationStatus ?? undefined}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="APPROVED">Approved</SelectItem>
                        <SelectItem value="REJECTED">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="whitespace-nowrap">
                    {user.createdAt ? formatDate(user.createdAt) : "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
