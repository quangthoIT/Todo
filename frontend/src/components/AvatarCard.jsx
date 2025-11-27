import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, User, Upload, LinkIcon, ImagePlus } from "lucide-react";
import { Input } from "./ui/input";

const AvatarCard = ({ avatar, setAvatar, onUpdate, loading }) => {
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' | 'url'
  const [preview, setPreview] = useState(avatar);
  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef(null);

  // Sync preview khi avatar gốc thay đổi
  useEffect(() => {
    setPreview(avatar);
    setUrlInput(avatar || "");
  }, [avatar]);

  // Xử lý khi chọn File
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Preview ngay lập tức
    }
  };

  // Xử lý khi nhập URL
  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrlInput(val);
    if (val.trim()) {
      setPreview(val);
      setFile(null); // Reset file nếu dùng URL
    }
  };

  // Xử lý Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi File hoặc URL tùy theo tab đang chọn
    const dataToSubmit = activeTab === "upload" && file ? file : urlInput;
    onUpdate(dataToSubmit);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-blue-600 dark:text-gray-100" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Avatar
          </h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-200">
            {preview ? (
              <img
                src={preview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-18 h-18 text-gray-400" />
            )}
          </div>
        </div>

        <div className="flex bg-gray-100 rounded-lg">
          <Button
            type="button"
            onClick={() => setActiveTab("upload")}
            size="lg"
            variant={activeTab === "upload" ? "default" : "secondary"}
            className="w-1/2"
          >
            <Upload className="w-4 h-4" /> Upload
          </Button>
          <Button
            type="button"
            onClick={() => setActiveTab("url")}
            size="lg"
            variant={activeTab === "url" ? "default" : "secondary"}
            className="w-1/2"
          >
            <LinkIcon className="w-4 h-4" /> URL
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "upload" ? (
            <div
              className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer mt-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex items-center justify-center gap-2 text-gray-500 h-[21px]">
                <ImagePlus className="w-6 h-6 text-gray-400" />
                <span className="text-sm">
                  {file ? file.name : "Click to select image"}
                </span>
              </div>
            </div>
          ) : (
            <Input
              type="text"
              value={urlInput}
              onChange={handleUrlChange}
              placeholder="Enter avatar URL"
              className="mt-2"
            />
          )}

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            Update Avatar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AvatarCard;
