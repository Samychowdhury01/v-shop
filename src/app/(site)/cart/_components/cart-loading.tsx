export function CartLoading() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="bg-gray-100 animate-pulse h-96 rounded-lg"></div>
      </div>
      <div className="lg:w-80">
        <div className="bg-gray-100 animate-pulse h-96 rounded-lg"></div>
      </div>
    </div>
  );
}