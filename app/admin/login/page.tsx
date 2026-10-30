export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "invalid";
  const hasServerError = params.error === "server";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <form action="/api/auth/login" method="post" className="bg-panel w-full rounded-[2rem] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Admin</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-stone-950">Login</h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">Only the authenticated admin can manage portfolio content.</p>
        {hasError ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            Email or password is incorrect.
          </p>
        ) : null}
        {hasServerError ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            Server configuration or database access failed.
          </p>
        ) : null}
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-stone-900">Email</span>
            <input name="email" type="email" autoComplete="email" className="min-h-12 rounded-2xl border border-stone-900/10 bg-white/80 px-4" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-stone-900">Password</span>
            <input name="password" type="password" autoComplete="current-password" className="min-h-12 rounded-2xl border border-stone-900/10 bg-white/80 px-4" />
          </label>
        </div>
        <button className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-stone-950 px-4 text-sm font-semibold text-white">
          Sign in
        </button>
      </form>
    </main>
  );
}
