import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { outlineLinkButtonClass, primaryLinkButtonClass } from "@/lib/button-link-styles";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg items-center px-4 py-12 sm:px-6">
      <GlassCard padding="lg" className="w-full">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm">
          <KeyRound className="size-6" />
        </div>
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          Đăng nhập
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Tiếp tục kế hoạch ăn uống và tập luyện của bạn.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Vào lại tổng quan để xem thực đơn, buổi tập và danh sách mua sắm trong tuần.
        </p>
        <div className="mt-8 grid gap-3">
          <Link href="/dashboard" className={primaryLinkButtonClass}>
            Vào ứng dụng
            <ArrowRight className="ml-2 size-4" />
          </Link>
          <Link href="/auth/sign-up" className={outlineLinkButtonClass}>
            Tạo tài khoản
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
