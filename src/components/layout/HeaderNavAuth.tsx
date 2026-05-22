import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/current-user";
import { HeaderSignOutButton } from "@/components/layout/HeaderSignOutButton";

type HeaderNavAuthProps = {
  variant?: "desktop" | "mobile";
};

export async function HeaderNavAuth({ variant = "desktop" }: HeaderNavAuthProps) {
  const user = await getCurrentUser();

  const rowLink =
    variant === "mobile"
      ? "rounded-lg px-3 py-2 text-sm font-medium text-ink hover:bg-cream"
      : "text-sm font-medium text-muted hover:text-ink";

  const primaryLink =
    variant === "mobile"
      ? "rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-cream"
      : "text-sm font-medium text-brand-600 hover:text-brand-700";

  if (!user) {
    if (variant === "mobile") {
      return (
        <>
          <Link href="/login" className={rowLink}>
            Sign in
          </Link>
          <Link href="/signup" className={primaryLink}>
            Sign up
          </Link>
        </>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <Link href="/login" className={rowLink}>
          Sign in
        </Link>
        <Link href="/signup" className={primaryLink}>
          Sign up
        </Link>
        <Link href="/workshops" className="btn-primary !rounded-lg !px-5 !py-2.5 text-sm">
          Book now
        </Link>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <>
        {user.role === "host" ? (
          <Link href="/host/dashboard" className={rowLink}>
            Host dashboard
          </Link>
        ) : (
          <Link href="/account" className={rowLink}>
            My bookings
          </Link>
        )}
        <HeaderSignOutButton className={`${rowLink} w-full text-left`} />
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {user.role === "host" ? (
        <Link href="/host/dashboard" className={rowLink}>
          Host dashboard
        </Link>
      ) : (
        <Link href="/account" className={rowLink}>
          My bookings
        </Link>
      )}
      <HeaderSignOutButton className={rowLink} />
      <Link href="/workshops" className="btn-primary !rounded-lg !px-5 !py-2.5 text-sm">
        Book now
      </Link>
    </div>
  );
}
