"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOptimistic, useState, useTransition } from "react";
import { updateUserOwnershipStatus } from "./get-approvers-list";
import { toast } from "sonner";

type Status = "APPROVE" | "REJECT" | "PENDING";

export default function ChangeStatus({ id }: { id: string }) {
  const [status, setStatus] = useState<Status>("PENDING");
  const [nextStatus, setNextStatus] = useState<Status | null>(null);
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  // ✅ Optimistic state
  const [optimisticStatus, setOptimisticStatus] = useOptimistic<Status, Status>(
    status,
    (_, newStatus) => newStatus
  );

  function handleSelectChange(value: Status) {
    if (value === status) return;

    setNextStatus(value);
    setOpen(true);
  }

  function handleConfirm() {
    if (!nextStatus) return;

    startTransition(async () => {
      //  Optimistic update INSIDE transition
      setOptimisticStatus(nextStatus);

      try {
        const res = await updateUserOwnershipStatus(nextStatus, id);

        if (!res.status) {
          throw new Error(res.message);
        }

        // persist actual state
        setStatus(nextStatus);
        toast.success(res.message ?? "Updated successfully");
      } catch (error) {
        console.error(error);

        // rollback
        setOptimisticStatus(status);
        toast.error("Failed to update. Reverted change.");
      } finally {
        setOpen(false);
        setNextStatus(null);
      }
    });
  }

  function handleCancel() {
    setOpen(false);
    setNextStatus(null);
  }

  return (
    <>
      {/* SELECT */}
      <Select
        value={optimisticStatus}
        onValueChange={handleSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="APPROVE">Approve</SelectItem>
            <SelectItem value="REJECT">Reject</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* CONFIRM DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm status change</DialogTitle>
            <DialogDescription>
              Change status to{" "}
              <span className="font-semibold">{nextStatus}</span>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button onClick={handleConfirm} disabled={isPending}>
              {isPending ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
