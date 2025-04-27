import Navigation from "../components/Navigation"
export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <Navigation />
      {children}
    </div>
  )
}