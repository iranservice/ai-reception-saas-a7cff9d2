# Visual regression — pills & badges

Lightweight, dependency-free snapshot guard for the project's pill / badge
family (`Pill`, `StatusChip`, `ChannelBadge`, `ChannelStateTag`).

Runs three checks per sample, across **mobile / tablet / desktop**:

1. **Universal Responsive Consistency** — semantic markup must be byte-identical
   across breakpoints. Any drift fails the run.
2. **Golden Contrast Rule** — flags any `bg-{c}/N` paired with `text-{c}`
   (soft pills must use `text-foreground`).
3. **Snapshot drift** — diffs current render against the committed golden in
   `__snapshots__/pills.snap.json`.

## Commands

```bash
bun run snapshot:pills          # verify
bun run snapshot:pills:update   # accept intentional changes
```

## Adding samples

Edit `buildSamples()` in `pills.snapshot.tsx` and run `:update`. Review the
diff in `__snapshots__/pills.snap.json` before committing.
