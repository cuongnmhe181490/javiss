import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import {
  outlineLinkButtonClass,
  primaryLinkButtonClass,
} from "@/lib/button-link-styles";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-4 py-12 sm:px-6">
      <GlassCard padding="lg" className="w-full">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
          <Sparkles className="size-6" />
        </div>
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Tao tai khoan
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Bat dau voi muc tieu, pantry, ngan sach va thiet bi cua ban.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Luong onboarding da duoc thiet ke san de luu vao Supabase sau nay. Hien tai, ban scaffold nay van mo phong day du route va domain logic bang du lieu mac dinh hop ly.
        </p>
        <div className="mt-8 grid gap-3">
          <Link href="/onboarding" className={primaryLinkButtonClass}>
            Bat dau thiet lap
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link href="/" className={outlineLinkButtonClass}>
            Quay lai trang chu
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
