
type GalleryProgressBarProps = {
  progress: number;
};

export function GalleryProgressBar({ progress }: GalleryProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-50">
      <div
        className="h-full bg-[#0FA0CE] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
