import { Link } from "@tanstack/react-router";

export function RootNotFound() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="flex w-full max-w-md flex-col items-center gap-2 p-2 text-center">
        <p className="text-accent">404</p>
        <h3>This is awkward...</h3>
        <p className="text-muted">
          Looks like we couldn't find the page you're looking for. It might be best to just go{" "}
          <Link to="/" className="text-base">
            Home
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
