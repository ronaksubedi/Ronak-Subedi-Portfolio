import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-bold text-lg hover:text-primary transition-colors"
        >
          Ronak Subedi
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Resume
          </Link>
          <Link
            to="/qa"
            className={`text-sm font-medium transition-colors ${
              isActive("/qa")
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Q&A
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
