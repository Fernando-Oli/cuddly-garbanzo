export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-red-500/50 text-white backdrop-blur-sm py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-lg font-semibold text-foreground">Fernando Oliveira</p>
          <p className="text-sm ">Web Dev</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a href="mailto:primoflro@gmail.com" className="text-primary hover:text-primary/80 transition-colors">
              primoflro@gmail.com
            </a>
            <span className="">•</span>
            <a
              href="https://linkedin.com/in/fernando1806"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              LinkedIn
            </a>
            <span className="">•</span>
            <a
              href="https://github.com/Fernando-Oli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
