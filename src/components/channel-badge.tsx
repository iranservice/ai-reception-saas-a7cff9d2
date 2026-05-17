/**
 * Unified ChannelBadge — neutral pill carrying a brand-colored dot.
 * Use anywhere a channel needs an inline indicator: conversation lists,
 * inbox filters, customer cards, audit log entries.
 */
import { CHANNELS, resolveChannelKey, type ChannelKey, type ChannelState } from "@/lib/channels";

export function ChannelBadge({
  channel,
  state = "active",
  showLabel = true,
  size = "md",
}: {
  channel: ChannelKey | string;
  state?: ChannelState;
  showLabel?: boolean;
  size?: "sm" | "md";
}) {
  const def = CHANNELS[resolveChannelKey(channel)];
  const muted = state === "planned" || state === "not_connected";
  const heightCls = size === "sm" ? "h-[22px] px-2 text-[10px]" : "h-[26px] px-2 text-[11px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-muted font-medium text-foreground ${heightCls}`}
      data-channel={def.key}
      data-channel-state={state}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: `var(${def.cssVar})`, opacity: muted ? 0.7 : 1 }}
      />
      {showLabel && (
        <span className={muted ? "text-muted-foreground" : undefined}>{def.label}</span>
      )}
      {muted && showLabel && (
        <span className="ml-0.5 text-[9px] uppercase tracking-wider text-muted-foreground/70">
          {state === "planned" ? "soon" : "off"}
        </span>
      )}
    </span>
  );
}
