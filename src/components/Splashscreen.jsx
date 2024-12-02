export default function Splashscreen({ error }) {
  return (
    <div className="flex flex-col items-center gap-y-8 pt-64">
      {error && (
        <>
          <p className="text-xl text-red-900">{error.message}</p>
          <p>Please try again later</p>
        </>
      )}
      {!error && (
        <>
          <p className="text-xl">Loading...</p>
          <div className="aspect-square w-14 animate-spin rounded-full border-8 border-slate-200 border-t-slate-800"></div>
        </>
      )}
    </div>
  );
}
