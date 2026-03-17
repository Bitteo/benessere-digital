// App route group layout — nested inside root layout which provides html/body.
// This layout wraps public-facing pages only.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
