//app/issues/[id]/DeleteButton.tsx
"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";


const DeleteButton = ({ issueId, session }: { issueId: string, session:boolean }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState (false)

  //delete button handler
  const HandleDeletion = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issue?id=${issueId}`);
      router.push("/issues");
    } catch (error) {
      setIsDeleting(false);
      setError(true);
      console.error("Error while deleting issue", error);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting || !session} size="3" color="red">
          <MdDeleteForever size='20' />
           Delete  {isDeleting && <Spinner size='3' />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? It will be permanently deleted.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={HandleDeletion}>
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      {error && (
        <AlertDialog.Root open={error}>
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title color="red">Error</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Something went wrong. Could not delete the issue.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Action>
                <Button variant="soft" color="gray" onClick={()=>setError(false)}>
                  Close
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      )}
    </>
  );
};

export default DeleteButton;
