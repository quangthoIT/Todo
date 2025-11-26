import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

const DeleteAccountCard = ({ onRequestDelete }) => {
  return (
    <Card className="md:col-span-2 border-2 border-red-100">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-3">
            <Trash2 className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">
              Delete Account
            </h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Deleting your account will permanently delete all of your data. This
          action cannot be undone.
        </CardDescription>
        <Button
          onClick={onRequestDelete}
          variant="default"
          size="lg"
          className="bg-red-500 hover:bg-red-600 mt-4"
        >
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeleteAccountCard;
