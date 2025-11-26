import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, User, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

const AvatarCard = ({ avatar, setAvatar, onUpdate, loading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Avatar</h2>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-200">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-18 h-18 text-gray-400" />
            )}
          </div>
        </div>

        <form onSubmit={onUpdate} className="space-y-4">
          <Input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter avatar URL"
          />
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Update Avatar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AvatarCard;
