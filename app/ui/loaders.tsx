export function ThreeDotsLoader() {
  return (
    <div className="flex mx-auto my-auto gap-[2px]">
      <div className="h-2 w-2 bg-white rounded-full animate-pulse animate-duration-1000"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-pulse animate-duration-1000 animate-delay-150"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-pulse animate-duration-1000 animate-delay-300"></div>
    </div>
  );
}
