import Logo from "./Logo";

export default function Navbar() {
   return (
      <header>
         <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <Logo />
         </nav>
      </header>
   );
}
