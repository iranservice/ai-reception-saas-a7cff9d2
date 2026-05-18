import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout, AuthCard, MockNotice } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Mail, MailCheck, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "waiting" | "sent" | "complete";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify email — AI Reception" }] }),
  component: VerifyPage,
});

const TABS: { id: State; label: string }[] = [
  { id: "waiting", label: "Waiting" },
  { id: "sent", label: "Sent" },
  { id: "complete", label: "Complete" },
];

function VerifyPage() {
  const [state, setState] = useState<State>("waiting");

  return (
    <AuthLayout>
      <AuthCard
        title="Verify your email"
        description="Check your inbox and confirm your email before continuing."
        footer={
          <Link to="/login" className="inline-flex items-center gap-1 text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
          </Link>
        }
      >
        <div className="rounded-md border border-border bg-surface-muted px-3 py-2 text-[12.5px] text-muted-foreground">
          Sent to <span className="font-medium text-foreground">you@clinic.com</span>
        </div>

        <div className="inline-flex w-full rounded-md border border-border bg-surface p-1 text-[12px]">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setState(t.id)}
              className={cn(
                "flex-1 rounded px-3 py-1.5 font-medium transition",
                state === t.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {state === "waiting" && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
              <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <p className="text-[13px] text-foreground">
                We're waiting for you to click the confirmation link.
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setState("sent")}>
              Resend verification
            </Button>
          </div>
        )}

        {state === "sent" && (
          <div className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3">
            <MailCheck className="mt-0.5 h-4 w-4 text-primary" />
            <p className="text-[13px] text-foreground">
              A new verification email has been sent. It may take a minute to arrive.
            </p>
          </div>
        )}

        {state === "complete" && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-success/30 bg-success/5 px-4 py-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
              <p className="text-[13px] text-foreground">Email verified. You can continue.</p>
            </div>
            <Button asChild className="w-full">
              <Link to="/">
                Continue <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        <MockNotice>Prototype only — verification states are mocked.</MockNotice>
      </AuthCard>
    </AuthLayout>
  );
}
