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
        aria-label="Open timer settings"
        className={`group fixed top-6 right-6 sm:top-8 sm:right-8 xl:top-10 xl:right-10 2xl:top-12 2xl:right-12 3xl:top-16 3xl:right-16 z-50 flex items-center gap-2.5 xl:gap-3 px-5 xl:px-7 2xl:px-8 3xl:px-10 py-2.5 xl:py-3.5 2xl:py-4 3xl:py-5 rounded-full font-bold text-sm sm:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl tracking-tight transition-all duration-200 select-none
          ${isActive
            ? "bg-slate-400/40 text-white/50 border border-white/20 cursor-not-allowed opacity-40 shadow-none backdrop-blur-sm"
            : "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white border border-blue-300/30 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.04] active:scale-[0.97]"
          }`}
      >
        <span className="p-1 xl:p-1.5 2xl:p-2 rounded-full bg-white/20 text-white group-hover:bg-white/30 group-hover:rotate-45 transition-all duration-300 flex items-center justify-center">
          <SettingsIcon size={17} className="stroke-[2.2] xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 3xl:w-7 3xl:h-7" />
        </span>
        <span className="text-white font-bold tracking-tight">Settings</span>
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/15 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleCancel}
        onKeyDown={(e) => e.key === "Escape" && handleCancel()}
        role="button"
        tabIndex={0}
        aria-label="Close settings sidebar"
      />

      {/* Sidebar - Transparent Translucent Glassmorphism */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white/20 backdrop-blur-2xl border-l border-white/40 shadow-2xl shadow-black/15 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30 bg-white/10">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Timer Settings</h2>
          <button
            onClick={handleCancel}
            aria-label="Close settings"
            className="p-2 rounded-full hover:bg-white/20 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 pb-28">
          {/* Timer Duration Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-800">
                <ClockIcon size={18} />
              </span>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Timer Duration
              </h3>
            </div>

            <div className="bg-white/25 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="hours-input"
                    className="block text-xs font-bold text-gray-700 text-center uppercase tracking-wider"
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
                    className="w-full px-2 py-2 bg-white/40 border border-white/60 rounded-xl text-gray-900 font-bold text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/70 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="minutes-input"
                    className="block text-xs font-bold text-gray-700 text-center uppercase tracking-wider"
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
                    className="w-full px-2 py-2 bg-white/40 border border-white/60 rounded-xl text-gray-900 font-bold text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/70 shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="seconds-input"
                    className="block text-xs font-bold text-gray-700 text-center uppercase tracking-wider"
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
                    className="w-full px-2 py-2 bg-white/40 border border-white/60 rounded-xl text-gray-900 font-bold text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/70 shadow-inner"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-blue-500/15 border border-blue-400/30 rounded-xl">
                <p className="text-xs font-bold text-blue-950 text-center tracking-wide">
                  Total: {String(hours).padStart(2, "0")}:
                  {String(minutes).padStart(2, "0")}:
                  {String(seconds).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>

          {/* Background Image Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-800">
                <ImageIcon size={18} />
              </span>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Background Image
              </h3>
            </div>

            <div className="bg-white/25 backdrop-blur-md rounded-2xl p-5 border border-white/40 shadow-sm space-y-4">
              {/* Current Background Preview */}
              {(previewImage || currentBackground) && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Current Preview:
                  </p>
                  <div className="relative w-full h-28 rounded-xl overflow-hidden border border-white/50 shadow-inner">
                    <img
                      src={previewImage || currentBackground}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={handleRemoveBackground}
                      aria-label="Remove background"
                      className="absolute top-2 right-2 p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-md transition-colors"
                    >
                      <XIcon size={13} />
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
                  className="flex items-center justify-center gap-2.5 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UploadIcon size={18} />
                  <span>Upload New Background</span>
                </label>
                <p className="text-[11px] text-gray-600 mt-2 text-center font-medium">
                  Supports JPG, PNG, GIF, WebP files
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/20 backdrop-blur-xl border-t border-white/30">
          <div className="flex gap-3">
            <button
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white rounded-xl transition-all font-bold border border-emerald-300/30 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <CheckIcon size={18} />
              Apply Changes
            </button>
            <button
              onClick={handleCancel}
              aria-label="Cancel"
              className="flex items-center justify-center px-4 py-3 bg-white/30 hover:bg-white/60 text-gray-800 border border-white/50 rounded-xl transition-all font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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
  onSetTime: function () { },
  currentTime: function () { },
  isActive: function () { },
  onBackgroundChange: function () { },
  currentBackground: function () { },
};
