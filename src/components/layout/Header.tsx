import { Link, useLocation } from "react-router-dom";
import { Bell, User, LayoutGrid, Globe, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link to={to}>
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      className={cn(
        "gap-2 font-medium",
        isActive 
          ? "bg-secondary text-secondary-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {icon}
      {label}
    </Button>
  </Link>
);

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: <LayoutGrid className="h-4 w-4" />, label: "Dashboard" },
    { to: "/assets", icon: <Globe className="h-4 w-4" />, label: "Asset Management" },
    { to: "/quote", icon: <FileText className="h-4 w-4" />, label: "Generate Quote" },
    { to: "/settings", icon: <Settings className="h-4 w-4" />, label: "Account Settings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              Renewal Central
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
          >
            <User className="h-5 w-5 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
};
