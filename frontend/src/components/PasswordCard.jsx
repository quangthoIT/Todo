import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Lock, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const PasswordCard = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onChangePassword,
  loading,
}) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Change Password
            </h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={onChangePassword}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="space-y-2">
            <Label>Old Password</Label>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            ></Input>
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            ></Input>
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter confirm password"
            ></Input>
          </div>
          <div>
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading}
              className="w-full md:w-auto"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Change Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordCard;
