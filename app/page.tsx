import { TrackerApp } from '@/components/tracker-app'

export default function Page() {
  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Financial Independence Tracker
          </h1>
          <p className="mt-1 text-muted-foreground text-pretty">
            Track your income, expenses, and monthly balance.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <TrackerApp />
      </main>
      <footer className="mx-auto max-w-5xl px-4 pb-8 text-sm text-muted-foreground sm:px-6">
        No account needed. Data stays in your browser only.
      </footer>
    </div>
  )
}
