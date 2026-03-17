import { ArrowArcLeftIcon } from "@phosphor-icons/react";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/article/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  return (
    <div className="mx-auto flex w-4xl max-w-full flex-col gap-6 p-6 md:p-10 lg:p-16">
      <button
        className="flex w-fit flex-row items-center gap-2 text-muted"
        onClick={() => router.history.back()}
      >
        <ArrowArcLeftIcon />
        Go Back
      </button>
      <Outlet />
    </div>
  );
}
