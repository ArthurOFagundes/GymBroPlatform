export default function Footer() {
  return (
    <footer className="flex flex-col justify-center gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6  max-w-6xl mx-auto text-center">
      <p className="text-xs">
        &copy; {new Date().getFullYear()} GymBro AI. All Rights Reserved.
      </p>
    </footer>
  );
}
