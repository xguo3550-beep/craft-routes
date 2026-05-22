import { Header } from "@/components/layout/Header";
import { HeaderNavAuth } from "@/components/layout/HeaderNavAuth";

export const dynamic = "force-dynamic";

export async function SiteHeader() {
  return (
    <Header
      authDesktop={<HeaderNavAuth variant="desktop" />}
      authMobile={<HeaderNavAuth variant="mobile" />}
    />
  );
}
