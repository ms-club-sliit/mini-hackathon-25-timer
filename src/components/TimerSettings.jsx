import React, { useState, useEffect } from "react";
import {
  SettingsIcon,
  CheckIcon,
  XIcon,
  UploadIcon,
  ClockIcon,
  ImageIcon,
} from "lucide-react";

export function TimerSettings({
  onSetTime,
  currentTime,
  isActive,
  onBackgroundChange,
  currentBackground,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(Math.floor(currentTime / 3600));
  const [minutes, setMinutes] = useState(Math.floor((currentTime % 3600) / 60));
  const [seconds, setSeconds] = useState(currentTime % 60);
  const [previewImage, setPreviewImage] = useState(null);

  // Update local state when currentTime changes
  useEffect(() => {
    setHours(Math.floor(currentTime / 3600));
    setMinutes(Math.floor((currentTime % 3600) / 60));
    setSeconds(currentTime % 60);
  }, [currentTime]);

  const handleApply = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      onSetTime(totalSeconds);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    // Reset to current time values
    setHours(Math.floor(currentTime / 3600));
    setMinutes(Math.floor((currentTime % 3600) / 60));
    setSeconds(currentTime % 60);
    setPreviewImage(null);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (setter, value, max) => {
    const numValue = parseInt(value) || 0;
    setter(Math.min(Math.max(0, numValue), max));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewImage(imageUrl);
        onBackgroundChange(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = () => {
    setPreviewImage(null);
    onBackgroundChange(null);
  };

  return (
    <>
      {/* Settings Toggle Button - Fixed Position */}
      <button
        onClick={toggleSidebar}
        disabled={isActive}
        className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all transform hover:scale-105
          ${
            isActive
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          }`}
      >
        <SettingsIcon size={20} />
        <span className="hidden sm:inline">Settings</span>
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCancel}
        onKeyDown={(e) => e.key === "Escape" && handleCancel()}
        role="button"
        tabIndex={0}
        aria-label="Close settings sidebar"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-gray-900 to-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Timer Settings</h2>
          <button
            onClick={handleCancel}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <XIcon size={20} className="text-white" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6 space-y-8 overflow-y-auto h-full pb-24">
          {/* Timer Duration Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <ClockIcon size={20} className="text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                Timer Duration
              </h3>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="hours-input"
                    className="block text-sm font-medium text-white/80"
                  >
                    Hours
                  </label>
                  <input
                    id="hours-input"
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) =>
                      handleInputChange(setHours, e.target.value, 23)
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="minutes-input"
                    className="block text-sm font-medium text-white/80"
                  >
                    Minutes
                  </label>
                  <input
                    id="minutes-input"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) =>
                      handleInputChange(setMinutes, e.target.value, 59)
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="seconds-input"
                    className="block text-sm font-medium text-white/80"
                  >
                    Seconds
                  </label>
                  <input
                    id="seconds-input"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) =>
                      handleInputChange(setSeconds, e.target.value, 59)
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-200 text-center">
                  Total: {String(hours).padStart(2, "0")}:
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>

          {/* Background Image Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon size={20} className="text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Background Image
              </h3>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
              {/* Current Background Preview */}
              {(previewImage || currentBackground) && (
                <div className="space-y-3">
                  <p className="text-sm text-white/70">Current Background:</p>
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/20">
                    <img
                      src={previewImage || currentBackground}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemoveBackground}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                    >
                      <XIcon size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="background-upload"
                />
                <label
                  htmlFor="background-upload"
                  className="flex items-center justify-center gap-3 w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all cursor-pointer border-2 border-dashed border-purple-300/50 hover:border-purple-300"
                >
                  <UploadIcon size={20} />
                  <span>Upload New Background</span>
                </label>
                <p className="text-xs text-white/50 mt-2 text-center">
                  Supports JPG, PNG, GIF files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
          <div className="flex gap-3">
            <button
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all font-medium"
            >
              <CheckIcon size={18} />
              Apply Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            >
              <XIcon size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

TimerSettings.propTypes = {
  onSetTime: function () {},
  currentTime: function () {},
  isActive: function () {},
  onBackgroundChange: function () {},
  currentBackground: function () {},
};
