import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { User, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ProfileInfoCard = ({
  userName,
  setUserName,
  email,
  onUpdate,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-blue-600 dark:text-gray-100" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Profile Info
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={onUpdate} className="space-y-6">
          <div className="space-y-2">
            <Label>User Name</Label>
            <Input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></Input>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} disabled></Input>
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed
            </p>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading}
            className="w-full cursor-not-allowed"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfoCard;
